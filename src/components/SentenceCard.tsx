"use client";

import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import type { Sentence } from "@/types";
import { Button } from "@/components/Button";
import { Eye, EyeOff, AudioLines, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  sentence: Sentence;
  index: number;
  heard: boolean;
  onHeard: (index: number) => void;
  mode?: "standard" | "cloze";
  isGlobalRevealed?: boolean;
  onToggleGlobalReveal?: () => void;
  isAutoPlayEnabled?: boolean;
  onToggleAutoPlay?: () => void;
};

export default function SentenceCard(props: Props) {
  const { sentence, index, heard, onHeard, mode, isGlobalRevealed, onToggleGlobalReveal, isAutoPlayEnabled, onToggleAutoPlay } = props;
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localRevealed, setLocalRevealed] = useState<Set<string>>(new Set());

  // Clean text helper: remove [...] brackets for TTS and clean display
  const cleanText = (text: string) => text.replace(/\[|\]/g, "");

  // Unified Logic: Standard mode is just Cloze mode with everything revealed by default
  // EXCEPT if it is a "Comparison Card" (has goodResponse), we want it to behave like a Cloze card (interactive)
  const isComparison = !!(sentence.goodResponse && sentence.badResponse);
  const isEffectiveGlobalReveal = (mode === "standard" && !isComparison) || isGlobalRevealed;
  const anyRevealed = isEffectiveGlobalReveal || localRevealed.size > 0;

  const keywords = useMemo(() => sentence.keywords || [], [sentence.keywords]);

  // Constants for iterations
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };
  
  const wordVariants = { // ... (unchanged)
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 }
  };

  // Helper to render text with clickable cloze gaps


  // Helper to render text with clickable cloze gaps
  const renderClozeText = () => {
    // Regex to find content inside square brackets, e.g., [hello world]
    const parts = sentence.en.split(/(\[.*?\])/g);
    
    // If no brackets found (standard text), just render it
    if (parts.length === 1) {
        return <span className="text-2xl md:text-4xl font-bold leading-relaxed text-foreground">{cleanText(sentence.en)}</span>;
    }

    return (
      <motion.p 
        className="text-2xl md:text-4xl font-bold leading-relaxed text-foreground leading-snug"
        variants={containerVariants}
        initial="hidden"
        animate={isEffectiveGlobalReveal ? "visible" : "hidden"}
      >
        {parts.map((part, i) => {
          if (part.startsWith("[") && part.endsWith("]")) {
            const content = part.slice(1, -1); // Remove []
            const isRevealed = isEffectiveGlobalReveal || localRevealed.has(content);
            
            return (
              <motion.span 
                key={i}
                variants={wordVariants}
                onClick={(e) => {
                    e.stopPropagation();
                    // Allow toggling only if NOT in forced standard mode (optional, but good for interaction)
                    if (mode === "standard") return;
                    
                    // User requested "Group Toggle" behavior: Clicking any box toggles ALL
                    if (onToggleGlobalReveal) {
                        onToggleGlobalReveal();
                    }
                }}
                className={`
                  inline-block rounded mx-1 px-1.5 border-b-4 transition-all duration-300
                  ${isRevealed 
                    ? "bg-yellow-100 border-yellow-300 text-foreground cursor-default" 
                    : "bg-slate-100 border-slate-300 text-transparent cursor-pointer hover:bg-slate-200 select-none min-w-[3ch] text-center"
                  }
                  ${mode !== "standard" && !isRevealed ? "active:scale-95" : ""}
                `}
                animate={{ 
                    scale: isRevealed ? [1, 1.05, 1] : 1,
                    backgroundColor: isRevealed ? "#fef9c3" : "#f1f5f9",
                    borderColor: isRevealed ? "#fde047" : "#cbd5e1",
                    color: isRevealed ? "#0f172a" : "transparent"
                }}
                transition={{ 
                    duration: 0.3, 
                    // Use tween for scale keyframes to avoid "2 keyframes" error with spring
                    scale: { type: "tween", duration: 0.2 },
                    default: { type: "spring", stiffness: 300 } 
                }}
              >
                {content}
              </motion.span>
            );
          }
          return <span key={i} className="mx-0.5">{part}</span>;
        })}
      </motion.p>
    );
  };

  // Ref to track the current audio instance
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount or re-run
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handlePlay = useCallback(async () => {
    if (typeof window === "undefined") return;
    
    // Stop any currently playing audio
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
    }

    if (!heard) {
      onHeard(index);
    }
    
    // Use goodResponse text or English text, stripped of brackets
    const textToSpeak = cleanText(sentence.goodResponse ? sentence.goodResponse.text : sentence.en);
    setLoading(true);
    setSpeaking(true); // Optimistically set speaking

    try {
      // Direct stream URL - starts playing immediately (no waiting for blob download)
      const params = new URLSearchParams({
        text: textToSpeak,
        voice: "en-US-AriaNeural", 
      });
      
      const audio = new Audio(`/api/tts?${params}`);
      audioRef.current = audio;
      
      await new Promise<void>((resolve, reject) => {
        // Event listeners before play
        audio.oncanplay = () => {
             setLoading(false);
        };
        audio.onended = () => {
            setSpeaking(false);
            audioRef.current = null;
            resolve();
        };
        audio.onerror = (e) => {
            setSpeaking(false);
            reject(e);
        };
        
        // .play() returns a promise that rejects if autoplay is blocked
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((e) => {
              setSpeaking(false);
              reject(e);
          });
        }
      });
      
    } catch (error) {
       console.warn("High-quality TTS failed/blocked, falling back to system voice:", error);
       
       // Fallback to Web Speech API
       if (window.speechSynthesis) {
         window.speechSynthesis.cancel(); // Stop any existing speech
         
         await new Promise<void>((resolve) => {
             setLoading(false);
             setSpeaking(true);
             
             const u = new SpeechSynthesisUtterance(textToSpeak);
             u.lang = "en-US";
             u.rate = 1;
             u.onend = () => {
                 setSpeaking(false);
                 resolve();
             };
             u.onerror = () => {
                 setSpeaking(false);
                 resolve();
             }; 
             window.speechSynthesis.speak(u);
         });
       } else {
           setSpeaking(false);
           setLoading(false);
       }
    } finally {
      // Safety check in case component unmounted
      if (audioRef.current === null) {
          setSpeaking(false);
      }
      setLoading(false);
    }
  }, [heard, index, onHeard, sentence, setLoading, setSpeaking]);

  // Auto-play effect
  // We use a ref to prevent re-triggering when playback state changes
  const hasAutoPlayedRef = useRef(false);

  useEffect(() => {
      hasAutoPlayedRef.current = false;
  }, [index]);

  useEffect(() => {
      // Only play if enabled and we haven't played for this index yet
      // We purposefully DO NOT include speaking/loading/handlePlay to avoid infinite loops
      const timer = setTimeout(() => {
          if (isAutoPlayEnabled && !hasAutoPlayedRef.current) {
               hasAutoPlayedRef.current = true;
               handlePlay();
          }
      }, 500);
      return () => clearTimeout(timer);
  }, [isAutoPlayEnabled, index, handlePlay]); // Trigger on mount (index change) or toggle

  // Audio Visualizer Component - Minimalist Lines
  const AudioVisualizer = () => (
    <div className="flex items-center justify-center gap-1 h-4">
      <div className="w-0.5 bg-current animate-[pulse_0.5s_infinite] h-2"></div>
      <div className="w-0.5 bg-current animate-[pulse_0.7s_infinite] h-4"></div>
      <div className="w-0.5 bg-current animate-[pulse_0.6s_infinite] h-3"></div>
      <div className="w-0.5 bg-current animate-[pulse_0.8s_infinite] h-2"></div>
    </div>
  );

  // New "Mistake -> Fix" Layout (Cleaner & Integrated Cloze)
  if (sentence.scenario && sentence.badResponse && sentence.goodResponse) {
    // We override the renderer to use the good response text for cloze logic
    // Temporarily swap sentence.en with goodResponse for the renderer
    const originalEn = sentence.en;
    // We need to mutate the object structure slightly for the helper or just pass strict text
    // But renderClozeText uses `sentence.en`. simpler to create a derived renderer or mock it.
    // actually, let's keep it simple: we want the GOOD response to be clozable.
    // So we will render the Cloze logic MANUALLY here for the good response.
    
    return (
      <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm transition-all hover:shadow-md flex flex-col">
        {/* Header: Controls & Scenario (Single Row) */}
        <div className="bg-slate-50/50 p-3 h-14 border-b border-border flex items-center justify-between gap-2">
             {/* Left: Eye Icon (Reveal All) */}
             <div className="flex-shrink-0 w-10">
                 {(mode === "cloze" || isComparison) && onToggleGlobalReveal && (
                    <button 
                        onClick={(e) => { e.stopPropagation(); onToggleGlobalReveal(); }}
                        className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-full transition-colors flex items-center justify-center"
                        title={isGlobalRevealed ? "Hide Answers" : "Reveal All"}
                    >
                        {isGlobalRevealed ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                 )}
             </div>

             {/* Center: Scenario Text (Smaller) */}
             {/* Spacer to keep layout balanced if needed, or just let justify-between handle it */}
             <div className="flex-1" />

             {/* Right: Auto-Play Toggle (Icon) */}
             <div className="flex-shrink-0 w-10 flex justify-end">
                 {onToggleAutoPlay && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); onToggleAutoPlay(); }}
                      className="flex items-center gap-2 group"
                      title="Toggle Auto-Play"
                    >
                        {/* Sound Icon */}
                        <div className={`transition-colors ${isAutoPlayEnabled ? "text-teal-600" : "text-slate-300"}`}>
                            {isAutoPlayEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                        </div>
                        
                        <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${isAutoPlayEnabled ? "bg-teal-500" : "bg-slate-300"}`}>
                            <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${isAutoPlayEnabled ? "translate-x-4" : "translate-x-0"}`} />
                        </div>
                    </button>
                 )}
             </div>
        </div>

        <div className="p-4 md:p-6 flex flex-col gap-4">
            {/* The Situation (Scenario) - Moved from Header */}
            <div className="text-lg md:text-xl font-medium text-center text-foreground/90 leading-snug mb-2">
                {sentence.scenario}
            </div>

            {/* The Mistake (Bad Response) - Visually Receded */}
            <div className="relative pl-4 border-l-4 border-red-300 bg-red-100/40 p-5 rounded-r-xl">
                <div className="absolute -left-[10px] top-4 bg-white text-red-500">
                    <div className="w-5 h-5 rounded-full border-2 border-red-300 flex items-center justify-center text-[10px] font-bold shadow-sm">✕</div>
                </div>
                <div className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2">
                    Avoid Saying
                </div>
                <div className="text-base text-muted-foreground/90 line-through decoration-red-300/60 decoration-2 mb-2">
                    &quot;{sentence.badResponse.text}&quot;
                </div>
                <div className="text-xs text-red-600/90 italic font-medium">
                    Why: {sentence.badResponse.why}
                </div>
            </div>

            {/* The Fix (Good Response) - Hero Status */}
            <div className="relative bg-teal-100/30 p-6 rounded-xl border border-teal-200/50">
                 <div className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span>Better Approach</span>
                    <div className="h-px bg-teal-200 flex-1"></div>
                </div>
                
                {/* Render Good Response with Cloze Logic */}
                {/* We treat the goodResponse.text as the source for the cloze renderer */}
                <div className="relative w-full text-left">
                     {(() => {
                        const text = sentence.goodResponse?.text || "";
                        const parts = text.split(/(\[.*?\])/g);
                        
                        if (parts.length === 1) {
                            return <div className="text-xl md:text-3xl font-bold leading-relaxed text-foreground text-left">{cleanText(text)}</div>;
                        }

                        return (
                            <motion.p 
                                className="text-xl md:text-3xl font-bold leading-relaxed text-foreground leading-snug text-left"
                                variants={containerVariants}
                                initial="hidden"
                                animate={isEffectiveGlobalReveal ? "visible" : "hidden"}
                            >
                                {parts.map((part, i) => {
                                if (part.startsWith("[") && part.endsWith("]")) {
                                    const content = part.slice(1, -1);
                                    const isRevealed = isEffectiveGlobalReveal || localRevealed.has(content);
                                    
                                    return (
                                    <motion.span 
                                        key={i}
                                        variants={wordVariants}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Allow toggling only if NOT in forced standard mode (unless it's a comparison card)
                                            if (mode === "standard" && !isComparison) return;
                                            
                                            // User requested "Group Toggle" behavior: Clicking any box toggles ALL
                                            if (onToggleGlobalReveal) {
                                                onToggleGlobalReveal();
                                            }
                                        }}
                                        className={`
                                        inline-block rounded mx-1 px-1.5 border-b-4 transition-all duration-300 mb-2
                                        ${isRevealed 
                                            ? "bg-teal-50 border-teal-200 text-teal-900 cursor-default" 
                                            : "bg-slate-100 border-slate-300 text-transparent cursor-pointer hover:bg-slate-200 select-none min-w-[3ch] text-center"
                                        }
                                        ${mode !== "standard" && !isRevealed ? "active:scale-95" : ""}
                                        `}
                                        animate={{ 
                                            scale: isRevealed ? [1, 1.05, 1] : 1,
                                            backgroundColor: isRevealed ? "#f0fdfa" : "#f1f5f9",
                                            borderColor: isRevealed ? "#99f6e4" : "#cbd5e1",
                                            color: isRevealed ? "#134e4a" : "transparent"
                                        }}
                                    >
                                        {content}
                                    </motion.span>
                                    );
                                }
                                return <span key={i} className="mx-0.5">{part}</span>;
                                })}
                            </motion.p>
                        );
                     })()}
                </div>
                
                <div className="mt-3 text-sm font-medium text-teal-700/80 bg-teal-50/50 p-2 rounded border border-teal-100 inline-block">
                    💡 {sentence.goodResponse.why}
                </div>
            </div>

            {/* Keywords hint */}
            {keywords.length > 0 && anyRevealed && (
            <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {keywords.map((k) => (
                    <span
                    key={k.word}
                    className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground border border-secondary"
                    >
                    <span className="font-semibold">{k.word}</span>
                    <span className="opacity-70">: {k.definition.replace(/^Hidden:\s*/, "")}</span>
                </span>
                ))}
            </div>
            )}

            <Button
            onClick={(e) => {
                e.stopPropagation();
                handlePlay();
            }}
            data-action="play-sentence"
            className="w-full h-12 text-base font-medium rounded-lg shadow-none border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10"
            variant="ghost"
            isLoading={loading}
            >
                {speaking ? <AudioVisualizer /> : <span className="flex items-center gap-2 font-bold">Listen to Better Response</span>}
            </Button>
        </div>
      </div>
    );
  }

  // UNIFIED CARD LAYOUT (Standard + Cloze)
  return (
    <div className="bg-white rounded-lg border border-border p-8 md:p-12 flex flex-col gap-8 shadow-sm transition-all hover:shadow-md text-center">
      
      <div className="relative flex items-center justify-center w-full mb-2 md:mb-6 min-h-[32px]">
         {/* Global Reveal Toggle (Eye) - Only in Cloze mode */}
         {mode === "cloze" && onToggleGlobalReveal && (
            <button 
                onClick={onToggleGlobalReveal}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-full transition-colors"
                title={isGlobalRevealed ? "Hide Highlighting" : "Reveal All"}
            >
                {isGlobalRevealed ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
         )}

         {/* Auto-Play Toggle Switch - Softer & Smaller */}
         {onToggleAutoPlay && (
            <div 
                className="flex items-center gap-2 px-2 py-1 transition-opacity duration-300"
                title="Toggle Auto-Play"
            >
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Auto-Play
                </span>
                
                <button
                    onClick={onToggleAutoPlay}
                    className={`
                        relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none 
                        ${isAutoPlayEnabled ? "bg-slate-400" : "bg-slate-200"}
                    `}
                >
                    <span className="sr-only">Toggle Auto-Play</span>
                    <motion.span
                        layout
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className={`
                            inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm ring-0 
                            ${isAutoPlayEnabled ? "translate-x-4.5" : "translate-x-1"}
                        `}
                    />
                </button>
            </div>
         )}
      </div>

      <div className="flex flex-col gap-6 items-center mt-4 md:mt-8">
         {/* Main Sentence - Unified Renderer */}
         <div className="relative w-full">
            {renderClozeText()}
         </div>
      </div>

      {/* Unified Bottom Section */}
      <div className="min-h-[24px] flex flex-col items-center gap-4">
          {/* Instructions: Only for Cloze mode and early index */}
          <AnimatePresence>
            {mode === "cloze" && index < 3 && !anyRevealed && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm text-muted-foreground italic overflow-hidden"
                >
                    Click the boxes to reveal the punchline.
                </motion.div>
            )}
            
            {/* Praise: Only show in Cloze mode when solved to avoid Standard mode clutter */}
            {mode === "cloze" && anyRevealed && (
                <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="text-sm text-muted-foreground italic"
                >
                    Nice work! Here&apos;s the breakdown:
                </motion.div>
            )}
          </AnimatePresence>
          
          {/* Keywords: Show if revealed (Standard = always revealed) */}
          {anyRevealed && keywords.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {keywords.map((k) => (
                  <span
                    key={k.word}
                    className="text-sm px-3 py-1 bg-yellow-100/50 text-foreground rounded-full border border-yellow-200/50"
                  >
                    <span className="font-semibold">{k.word}</span>
                    <span className="text-muted-foreground ml-1">
                        {/* Strip 'Hidden:' prefix for clean display */}
                        {k.definition.replace(/^Hidden:\s*/, "")}
                    </span>
                  </span>
                ))}
              </div>
          )}
      </div>

      {/* Full width play button */}
      <Button
         onClick={(e) => {
           e.stopPropagation();
           handlePlay();
         }}
         data-action="play-sentence"
         variant={speaking ? "outline" : "primary"}
         size="lg"
         isLoading={loading}
         className="w-full h-14 text-lg font-medium rounded-md mt-4"
      >
          {speaking ? <AudioVisualizer /> : <span className="flex items-center gap-2"><AudioLines className="w-5 h-5" /> Play Audio</span>}
      </Button>
    </div>
  );
}
