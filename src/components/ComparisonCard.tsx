"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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

  // Clean text helper (for TTS)
  const cleanText = (text: string) => text.replace(/\[|\]/g, "");

  // Derived State
  const isEffectiveGlobalReveal = mode === "standard" || isGlobalRevealed;

  // Extract all hidden words for "Reveal All" behavior (from the Good Response or fallback)
  // We use useMemo to avoid re-calculating on every render
  const textForCloze = sentence.goodResponse?.text || sentence.en;
  // Note: ComparisonCard usually behaves differently, but for consistency if we are using cloze mode in comparison
  // we likely want to reveal all words in the text we are rendering.
  // The renderClozeText function is called with specific text. 
  // However, usually we only render cloze for the Good Response in this card.
  
  const allHiddenWords =  (textForCloze.match(/\[(.*?)\]/g) || []).map(m => m.slice(1, -1));

  // Render Cloze Text Helper
  const renderClozeText = (text: string) => {
    const parts = text.split(/(\[.*?\])/g);
    
    if (parts.length === 1) {
        return <>{cleanText(text)}</>;
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
                    // Reveal ALL words
                    setLocalRevealed(new Set(allHiddenWords));
                }}
                className={`
                  inline-block rounded mx-1 px-1.5 border-b-2 transition-all duration-300 align-baseline
                  ${isRevealed 
                    ? "bg-teal-100 border-teal-300 text-teal-950 cursor-default" 
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
    const textToSpeak = cleanText(sentence.goodResponse?.text || sentence.en);
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
      
      {/* 1. SCENARIO / CONTEXT */}
      <div className="p-6 md:p-8 pb-4 text-center border-b border-border/40 bg-slate-50/30">
          <div className="text-xl md:text-2xl font-medium text-foreground/90 leading-snug">
              {sentence.scenario}
          </div>
      </div>

      <div className="p-4 md:p-8 flex flex-col gap-6">
          
          {/* 2. GOOD RESPONSE (The Solution) */}
          {sentence.goodResponse && (
            <div className="relative bg-teal-100/30 p-6 rounded-xl border border-teal-200/50">
                 <div className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span>Better Approach</span>
                    <div className="h-px bg-teal-200 flex-1"></div>
                </div>
                
                <div className="text-2xl md:text-3xl font-bold leading-relaxed text-teal-950 text-left">
                     {renderClozeText(sentence.goodResponse.text)}
                </div>
                
                <div className="mt-4 flex gap-3 items-start">
                    <div className="mt-1 text-lg">💡</div>
                    <div className="text-base font-medium text-teal-800/90 leading-normal">
                        {sentence.goodResponse.why}
                    </div>
                </div>
            </div>
          )}

          {/* 3. BAD RESPONSE (What to avoid) */}
          {sentence.badResponse && (
            <div className="relative pl-4 border-l-4 border-red-300 bg-red-100/40 p-5 rounded-r-xl">
                <div className="absolute -left-[10px] top-4 bg-white text-red-500">
                    <div className="w-5 h-5 rounded-full border-2 border-red-300 flex items-center justify-center text-[10px] font-bold shadow-sm">✕</div>
                </div>
                <div className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2">
                    Avoid Saying
                </div>
                <div className="text-lg text-muted-foreground/90 line-through decoration-red-300/60 decoration-2 mb-2 font-medium">
                    &quot;{sentence.badResponse.text}&quot;
                </div>
                <div className="text-sm text-red-600/90 italic">
                    Why: {sentence.badResponse.why}
                </div>
            </div>
          )}

          {/* KEYWORDS REVEAL SECTION */}
           {(isEffectiveGlobalReveal || localRevealed.size > 0) && sentence.keywords && sentence.keywords.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {sentence.keywords.map((k) => {
                      // Only show if revealed
                      const isWordRevealed = isEffectiveGlobalReveal || localRevealed.has(k.word);
                      if (!isWordRevealed) return null;

                      return (
                        <span key={k.word} className="text-sm px-3 py-1 bg-teal-50 text-teal-900 rounded-full border border-teal-200 shadow-sm">
                            <span className="font-bold">{k.word}</span>: {k.definition}
                        </span>
                      );
                  })}
              </div>
          )}
          
          <div className="flex-1" />

          {/* 4. PLAY BUTTON */}
          <Button
            onClick={(e) => {
                e.stopPropagation();
                handlePlay();
            }}
            variant={speaking ? "outline" : "primary"}
            size="lg"
            isLoading={loading}
            className="w-full h-14 text-lg font-medium rounded-xl mt-2"
          >
              {speaking ? <AudioVisualizer /> : <span className="flex items-center gap-2"><Volume2 className="w-5 h-5" /> Listen to Better Response</span>}
          </Button>

      </div>
    </div>
  );
}
