"use client";

import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import type { Sentence } from "@/types";
import { Button } from "@/components/Button";
import { Play, Volume2, CheckCircle2, AlertCircle, Eye, EyeOff, AudioLines, Headphones } from "lucide-react";
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

  const keywords = useMemo(() => sentence.keywords || [], [sentence.keywords]);

  // Helper to render text with clickable cloze gaps
  const renderClozeText = () => {
    // Regex to find content inside square brackets, e.g., [hello world]
    const parts = sentence.en.split(/(\[.*?\])/g);
    
    // Animation variants for the container (stagger effect)
    const containerVariants = {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05, // Rapid ripple
          delayChildren: 0.1
        }
      }
    };
    
    // Variants for individual words
    const wordVariants = {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0 }
    };

    return (
      <motion.p 
        className="text-xl md:text-2xl font-medium leading-relaxed text-slate-700"
        variants={containerVariants}
        initial="hidden"
        animate={isGlobalRevealed ? "visible" : "hidden"}
      >
        {parts.map((part, i) => {
          if (part.startsWith("[") && part.endsWith("]")) {
            const content = part.slice(1, -1); // Remove []
            const isRevealed = isGlobalRevealed || localRevealed.has(content);
            
            return (
              <motion.span 
                key={i}
                variants={wordVariants}  // Part of stagger if global
                onClick={(e) => {
                    e.stopPropagation();
                    const next = new Set(localRevealed);
                    if (next.has(content)) next.delete(content); else next.add(content);
                    setLocalRevealed(next);
                }}
                className={`
                  inline-block cursor-pointer px-1 rounded mx-0.5 border-b-2
                  ${isRevealed 
                    ? "bg-yellow-200 border-yellow-400 text-slate-900" 
                    : "bg-slate-200 border-slate-300 text-transparent select-none hover:bg-slate-300 transition-all duration-300"
                  }
                `}
                // Pop animation on reveal
                animate={{ 
                    scale: isRevealed ? [1, 1.1, 1] : 1,
                    backgroundColor: isRevealed ? "#fef08a" : "#e2e8f0",
                    borderColor: isRevealed ? "#facc15" : "#cbd5e1",
                    color: isRevealed ? "#0f172a" : "transparent"
                }}
                transition={{ duration: 0.2 }}
              >
                {content}
              </motion.span>
            );
          }
          return <span key={i}>{part}</span>;
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
  useEffect(() => {
      // Small timeout to allow transition to settle
      const timer = setTimeout(() => {
          if (isAutoPlayEnabled && !speaking && !loading) {
              handlePlay();
          }
      }, 500);
      return () => clearTimeout(timer);
  }, [isAutoPlayEnabled, index]); // Trigger on mount (index change) or toggle

  const isClozeMode = mode === "cloze";
  const anyRevealed = isGlobalRevealed || localRevealed.size > 0;

  // Audio Visualizer Component - Minimalist Lines
  const AudioVisualizer = () => (
    <div className="flex items-center justify-center gap-1 h-4">
      <div className="w-0.5 bg-current animate-[pulse_0.5s_infinite] h-2"></div>
      <div className="w-0.5 bg-current animate-[pulse_0.7s_infinite] h-4"></div>
      <div className="w-0.5 bg-current animate-[pulse_0.6s_infinite] h-3"></div>
      <div className="w-0.5 bg-current animate-[pulse_0.8s_infinite] h-2"></div>
    </div>
  );

  // New "Mistake -> Fix" Layout (Minimalist)
  if (sentence.scenario && sentence.badResponse && sentence.goodResponse) {
    return (
      <div className="bg-white rounded-lg border border-border p-6 md:p-8 flex flex-col gap-8 shadow-sm transition-shadow hover:shadow-md">
        {/* Scenario Header */}
        <div className="pb-4 border-b border-border">
          <div className="text-xs font-semibold tracking-wider text-muted uppercase mb-2">
            Scenario
          </div>
          <div className="text-xl md:text-2xl font-semibold text-foreground">
            {sentence.scenario}
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col gap-6">
          {/* Bad Response (Mistake) */}
          <div className="p-5 rounded-md bg-secondary/50">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
              Don&apos;t say
            </div>
            <div className="text-lg md:text-xl text-muted-foreground mb-2 line-through decoration-muted-foreground/30">
              &quot;{sentence.badResponse.text}&quot;
            </div>
            <div className="text-sm text-muted-foreground">
              {sentence.badResponse.why}
            </div>
          </div>

          {/* Good Response (Fix) */}
          <div className="p-5 rounded-md bg-primary/5 border-l-2 border-primary">
            <div className="text-xs font-bold text-primary uppercase tracking-wide mb-2">
              Better
            </div>
            <div className="text-xl md:text-2xl font-bold text-foreground mb-2">
              &quot;{sentence.goodResponse.text}&quot;
            </div>
            <div className="text-base text-foreground/80">
              {sentence.goodResponse.why}
            </div>
          </div>
        </div>

        {/* Keywords hint */}
        {keywords.length > 0 && (
           <div className="flex flex-wrap gap-2 mt-2">
            {keywords.map((k) => (
                <span
                  key={k.word}
                  className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground"
                >
                <span className="font-semibold">{k.word}</span>
                <span className="opacity-70">: {k.definition}</span>
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
          className="w-full mt-2 h-12 text-base font-medium rounded-md"
          variant="primary"
          isLoading={loading}
        >
            {speaking ? <AudioVisualizer /> : <span className="flex items-center gap-2">Play Audio</span>}
        </Button>
      </div>
    );
  }

  // Original Layout (Flashcard Fallback) modified for Cloze
  return (
    <div className="bg-white rounded-lg border border-border p-8 md:p-12 flex flex-col gap-8 shadow-sm transition-all hover:shadow-md text-center">
      
      <div className="relative flex items-center justify-center w-full mb-2 md:mb-6 min-h-[32px]">
         {/* Global Reveal Toggle (Eye) - Left aligned absolute */}
         {isClozeMode && onToggleGlobalReveal && (
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
         {/* Main Sentence */}
         <div className="relative">
            <div className="text-2xl md:text-4xl font-bold leading-relaxed text-foreground">
              {isClozeMode ? renderClozeText() : `"${sentence.en}"`}
            </div>
         </div>
      </div>

      {isClozeMode ? (
          <div className="min-h-[24px] flex flex-col items-center gap-4">
              <AnimatePresence>
                {index < 3 && !anyRevealed && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm text-muted-foreground italic overflow-hidden"
                    >
                        Click the boxes to reveal the punchline.
                    </motion.div>
                )}
                {anyRevealed && (
                    <motion.div
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         className="text-sm text-muted-foreground italic"
                    >
                        Nice work! Here&apos;s the breakdown:
                    </motion.div>
                )}
              </AnimatePresence>
              
              {/* Show keywords if any revealed or global reveal */}
              {anyRevealed && keywords.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {keywords.map((k) => (
                      <span
                        key={k.word}
                        className="text-sm px-3 py-1 bg-yellow-200 text-foreground rounded-full border border-yellow-300"
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
      ) : (
          <div className="flex flex-wrap justify-center gap-2">
            {keywords.map((k) => (
              <span
                key={k.word}
                className="text-sm px-3 py-1 bg-secondary text-secondary-foreground rounded-full"
              >
                <span className="font-semibold">{k.word}</span>
                <span className="text-muted-foreground ml-1">{k.definition}</span>
              </span>
            ))}
          </div>
      )}

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
