"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import type { Sentence } from "@/types";
import { Button } from "@/components/Button";
import { Volume2 } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  sentence: Sentence;
  index: number;
  onHeard: (index: number) => void;
  isAutoPlayEnabled?: boolean;
  mode?: "standard" | "cloze";
  isGlobalRevealed?: boolean;
};

// Helper to visualize audio playing
const AudioVisualizer = () => (
  <div className="flex items-center justify-center gap-1 h-4">
    <div className="w-0.5 bg-current animate-[pulse_0.5s_infinite] h-2"></div>
    <div className="w-0.5 bg-current animate-[pulse_0.7s_infinite] h-4"></div>
    <div className="w-0.5 bg-current animate-[pulse_0.6s_infinite] h-3"></div>
    <div className="w-0.5 bg-current animate-[pulse_0.8s_infinite] h-2"></div>
  </div>
);

export default function ComparisonCard({ 
  sentence, 
  index, 
  onHeard, 
  isAutoPlayEnabled,
  mode = "standard",
  isGlobalRevealed = false
}: Props) {
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [localRevealed, setLocalRevealed] = useState<Set<string>>(new Set());
  const [showRisk, setShowRisk] = useState(false); // New state for Bad Response interaction

  // Reset risk reveal when index changes
  useEffect(() => {
    setShowRisk(false);
  }, [index]);

  // Clean text helper (for TTS) - Updated to also strip "You: " prefix
  const cleanTextForTTS = (text: string) => {
    let clean = text.replace(/\[|\]/g, ""); // Remove brackets
    // Remove "You: " or "You:" prefix (case insensitive)
    clean = clean.replace(/^You:\s*/i, ""); 
    return clean;
  };

  // Derived State
  const isEffectiveGlobalReveal = mode === "standard" || isGlobalRevealed;

  // Extract all hidden words for "Reveal All" behavior (from the Good Response or fallback)
  const textForCloze = sentence.goodResponse?.text || sentence.en;
  
  const allHiddenWords = useMemo(() => {
     return (textForCloze.match(/\[(.*?)\]/g) || []).map(m => m.slice(1, -1));
  }, [textForCloze]);


  // Render Cloze Text Helper
  const renderClozeText = (text: string) => {
    const parts = text.split(/(\[.*?\])/g);
    
    if (parts.length === 1) {
        return <>{text.replace(/\[|\]/g, "")}</>;
    }

    return (
      <span>
        {parts.map((part, i) => {
          if (part.startsWith("[") && part.endsWith("]")) {
            const content = part.slice(1, -1);
            const isRevealed = isEffectiveGlobalReveal || localRevealed.has(content);
            
            return (
              <motion.span 
                key={i}
                initial={false}
                onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    // Toggle Logic: 
                    // If this word is revealed (or all are revealed), we hide all to let user "cover back".
                    // If it is hidden, we reveal all.
                    // This satisfies "reveal once" -> "cover back again".
                    if (isRevealed) {
                        setLocalRevealed(new Set());
                    } else {
                        setLocalRevealed(new Set(allHiddenWords));
                    }
                }}
                className={`
                  inline-block rounded mx-1 px-1.5 border-b-2 transition-all duration-300 align-baseline
                  ${isRevealed 
                    ? "bg-teal-100 border-teal-300 text-teal-950 cursor-pointer hover:bg-teal-200" 
                    : "bg-teal-50 border-teal-200 text-transparent cursor-pointer hover:bg-teal-100 select-none min-w-[3ch] text-center"
                  }
                  ${!isRevealed ? "active:scale-95" : ""}
                `}
                animate={{ 
                    backgroundColor: isRevealed ? "#ccfbf1" : "#f0fdfa",
                    borderColor: isRevealed ? "#5eead4" : "#99f6e4",
                    color: isRevealed ? "#042f2e" : "transparent"
                }}
              >
                {content}
              </motion.span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </span>
    );
  };
  
  const handlePlay = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (speaking) return;

    onHeard(index);
    
    // Always speak the "Good Response"
    const rawText = sentence.goodResponse?.text || sentence.en;
    const textToSpeak = cleanTextForTTS(rawText);
    
    setLoading(true);
    setSpeaking(true);

    try {
      const params = new URLSearchParams({
        text: textToSpeak,
        voice: "en-US-AriaNeural", 
      });
      
      const audio = new Audio(`/api/tts?${params}`);
      audioRef.current = audio;
      
      await new Promise<void>((resolve, reject) => {
        audio.oncanplay = () => setLoading(false);
        audio.onended = () => {
          setSpeaking(false);
          resolve();
        };
        audio.onerror = (e) => {
          setSpeaking(false);
          reject(e);
        };
        audio.play().catch((e) => {
           setSpeaking(false);
           reject(e);
        });
      });
      
    } catch (error) {
       console.warn("TTS fallback", error);
       if (window.speechSynthesis) {
           const u = new SpeechSynthesisUtterance(textToSpeak);
           setLoading(false);
           u.onend = () => setSpeaking(false);
           window.speechSynthesis.speak(u);
       } else {
           setSpeaking(false);
           setLoading(false);
       }
    } finally {
        setLoading(false);
    }
  }, [index, onHeard, sentence, speaking]);

  // Auto-play logic
  const hasAutoPlayedRef = useRef(false);
  useEffect(() => {
     hasAutoPlayedRef.current = false;
  }, [index]);

  useEffect(() => {
      const timer = setTimeout(() => {
          // Only auto-play if global reveal is ON (standard mode) or user enabled it explicitly
          // For Cloze mode, usually we wait for user interaction, but sticking to prop for now.
          if (isAutoPlayEnabled && !hasAutoPlayedRef.current) {
              hasAutoPlayedRef.current = true;
              handlePlay();
          }
      }, 500);
      return () => clearTimeout(timer);
  }, [isAutoPlayEnabled, index, handlePlay]);

  // Cleanup
  useEffect(() => {
      return () => {
          if (audioRef.current) audioRef.current.pause();
      };
  }, []);

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm transition-all hover:shadow-md flex flex-col h-full">
      
      {/* 1. SCENARIO / CONTEXT (Made more visible) */}
      <div className="p-6 md:p-8 pb-6 text-center border-b border-border/40 bg-slate-50/50">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
              The Situation
          </div>
          <div className="text-2xl md:text-3xl font-semibold text-foreground leading-snug">
              {sentence.scenario}
          </div>
      </div>

      <div className="p-4 md:p-8 pt-6 flex flex-col gap-6">

           {/* 2. BAD RESPONSE (What to avoid) - MOVED TO TOP */}
          {sentence.badResponse && (
            <div className="relative pl-4 border-l-4 border-red-200 bg-red-50/30 p-5 rounded-r-xl transition-all">
                <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border border-red-300 flex items-center justify-center text-[8px] text-red-400">✕</span>
                    Avoid Saying
                </div>
                <div className="text-lg text-muted-foreground/80 line-through decoration-red-300/60 decoration-2 mb-2 font-medium">
                    &quot;{sentence.badResponse.text}&quot;
                </div>
                
                {/* INTERACTIVE TOGGLE */}
                <div className="mt-2">
                    {!showRisk ? (
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowRisk(true);
                            }}
                            className="text-xs font-bold text-red-500 hover:text-red-700 underline decoration-dotted transition-colors flex items-center gap-1"
                        >
                           <span>⚠️ Analyze Risk: Why is this bad?</span>
                        </button>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="text-sm text-red-600/90 italic p-2 bg-red-100/50 rounded-md"
                        >
                            <span className="font-semibold not-italic">Risk:</span> {sentence.badResponse.why}
                        </motion.div>
                    )}
                </div>
            </div>
          )}
          
          {/* 3. GOOD RESPONSE (The Solution) - Cloze Enabled */}
          {sentence.goodResponse && (
            <div className={`relative bg-teal-50/50 p-6 rounded-2xl border border-teal-100 shadow-sm transition-all duration-500 ${!showRisk ? 'opacity-90 grayscale-[0.3]' : 'opacity-100 grayscale-0'}`}>
                 <div className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="bg-teal-100 px-2 py-0.5 rounded text-[10px]">Star Answer</span>
                    <span>Better Approach</span>
                </div>
                
                <div className="text-2xl md:text-3xl font-bold leading-relaxed text-teal-950 text-left">
                     {renderClozeText(sentence.goodResponse.text)}
                </div>
                
                <div className="mt-4 flex gap-3 items-start opacity-90">
                    <div className="mt-1 text-lg">💡</div>
                    <div className="text-base font-medium text-teal-800/80 leading-normal">
                        {sentence.goodResponse.why}
                    </div>
                </div>
            </div>
          )}

          {/* 4. KEYWORDS (Hidden by default, reveal with cloze) */}
           {(isEffectiveGlobalReveal || localRevealed.size > 0) && sentence.keywords && sentence.keywords.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  {sentence.keywords.map((k) => {
                      // Only show if revealed
                      const isWordRevealed = isEffectiveGlobalReveal || localRevealed.has(k.word);
                      if (!isWordRevealed) return null;

                      return (
                        <span key={k.word} className="text-sm px-3 py-1 bg-white text-teal-900 rounded-full border border-teal-200 shadow-sm">
                            <span className="font-bold">{k.word}</span>: {k.definition}
                        </span>
                      );
                  })}
              </div>
          )}

          {/* 5. PLAY BUTTON */}
          <Button
            onClick={(e) => {
                e.stopPropagation();
                handlePlay();
            }}
            variant={speaking ? "outline" : "primary"}
            size="lg"
            isLoading={loading}
            className="w-full h-14 text-lg font-medium rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.99]"
          >
              {speaking ? <AudioVisualizer /> : <span className="flex items-center gap-2"><Volume2 className="w-5 h-5" /> Listen to Native Speaker</span>}
          </Button>

      </div>
    </div>
  );
}
