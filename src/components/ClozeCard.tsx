"use client";

import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import type { Sentence } from "@/types";
import { Button } from "@/components/Button";
import { AudioLines } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  sentence: Sentence;
  index: number;
  heard: boolean;
  onHeard: (index: number) => void;
  // Mode: "standard" means all revealed by default (but still interactive if we want), "cloze" means hidden
  mode?: "standard" | "cloze";
  isGlobalRevealed?: boolean;
  // External Controls
  isAutoPlayEnabled?: boolean;
};

// --- Animations ---
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
};

const wordVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 }
};

// --- Audio Visualizer ---
const AudioVisualizer = () => (
    <div className="flex items-center justify-center gap-1 h-4">
      <div className="w-0.5 bg-current animate-[pulse_0.5s_infinite] h-2"></div>
      <div className="w-0.5 bg-current animate-[pulse_0.7s_infinite] h-4"></div>
      <div className="w-0.5 bg-current animate-[pulse_0.6s_infinite] h-3"></div>
      <div className="w-0.5 bg-current animate-[pulse_0.8s_infinite] h-2"></div>
    </div>
);

export default function ClozeCard({
  sentence,
  index,
  heard,
  onHeard,
  mode = "standard",
  isGlobalRevealed = false,
  isAutoPlayEnabled = false,
}: Props) {
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localRevealed, setLocalRevealed] = useState<Set<string>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Clean text helper
  const cleanText = (text: string) => text.replace(/\[|\]/g, "");

  const keywords = useMemo(() => sentence.keywords || [], [sentence.keywords]);

  // Derived State
  // "Standard" mode effectively behaves like "Cloze" but everything is revealed globally by default (unless specifically un-revealed, but usually standard = read mode)
  // Actually, standard mode usually just shows text. But to keep code unified, we can just say isEffectiveGlobalReveal = true if mode === standard.
  const isEffectiveGlobalReveal = mode === "standard" || isGlobalRevealed;
  const anyRevealed = isEffectiveGlobalReveal || localRevealed.size > 0;

  // Determine the primary text to display (Support for Small Talk structure where 'en' is title)
  const textToDisplay = sentence.goodResponse?.text || sentence.en;

  // Extract all hidden words for "Reveal All" behavior
  const allHiddenWords = useMemo(() => {
      const matches = textToDisplay.match(/\[(.*?)\]/g);
      return matches ? matches.map(m => m.slice(1, -1)) : [];
  }, [textToDisplay]);

  // --- TTS Handling ---
  const handlePlay = useCallback(async () => {
    if (typeof window === "undefined") return;
    
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
    }

    if (!heard) onHeard(index);

    const textToSpeak = cleanText(textToDisplay);
    setLoading(true);
    setSpeaking(true);

    try {
      const params = new URLSearchParams({ text: textToSpeak, voice: "en-US-AriaNeural" });
      const audio = new Audio(`/api/tts?${params}`);
      audioRef.current = audio;
      
      await new Promise<void>((resolve, reject) => {
        audio.oncanplay = () => setLoading(false);
        audio.onended = () => {
            setSpeaking(false);
            audioRef.current = null;
            resolve();
        };
        audio.onerror = (e) => reject(e);
        audio.play().catch(reject);
      });
      
    } catch (error) {
       console.warn("TTS fallback", error);
       if (window.speechSynthesis) {
         window.speechSynthesis.cancel();
         const u = new SpeechSynthesisUtterance(textToSpeak);
         u.onend = () => setSpeaking(false);
         setLoading(false);
         window.speechSynthesis.speak(u);
       } else {
           setSpeaking(false);
           setLoading(false);
       }
    } finally {
        setLoading(false);
        if (audioRef.current === null) setSpeaking(false);
    }
  }, [heard, index, onHeard, setLoading, setSpeaking, textToDisplay]);

  // --- Auto-Play ---
  const hasAutoPlayedRef = useRef(false);
  useEffect(() => { hasAutoPlayedRef.current = false; }, [index]);

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
    return () => { if (audioRef.current) audioRef.current.pause(); };
  }, []);


  // --- Render Helpers ---
  const renderClozeText = () => {
    const parts = textToDisplay.split(/(\[.*?\])/g);
    
    if (parts.length === 1) {
        return <span className="text-2xl md:text-4xl font-bold leading-relaxed text-foreground">{cleanText(textToDisplay)}</span>;
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
            const content = part.slice(1, -1);
            const isRevealed = isEffectiveGlobalReveal || localRevealed.has(content);
            
            return (
              <motion.span 
                key={i}
                variants={wordVariants}
                onClick={(e) => {
                    e.stopPropagation();
                    if (mode === "standard") return; // No interaction in standard mode
                    
                    // Toggle Logic: If all are revealed, hide them. Otherwise, reveal all.
                    if (localRevealed.size === allHiddenWords.length) {
                        setLocalRevealed(new Set());
                    } else {
                        setLocalRevealed(new Set(allHiddenWords));
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

  return (
    <div className="bg-white rounded-lg border border-border p-8 md:p-12 flex flex-col gap-8 shadow-sm transition-all hover:shadow-md text-center h-full">
      
      {/* Scenario / Context (if any) */}
      {sentence.scenario && (
          <div className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wider mb-2">
              {sentence.scenario}
          </div>
      )}

      {/* Main Text Area */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[120px]">
         <div className="relative w-full">
            {renderClozeText()}
         </div>
      </div>

      {/* Info / Feedback Section */}
      <div className="min-h-[24px] flex flex-col items-center gap-4">
          
          {/* Instructions for Cloze */}
          {mode === "cloze" && !anyRevealed && (
             <div className="text-sm text-muted-foreground italic animate-pulse">
                Click hidden boxes to reveal
             </div>
          )}
          
          {/* Keywords (if standard or revealed) */}
          {anyRevealed && keywords.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {keywords.map((k) => (
                  <span
                    key={k.word}
                    className="text-sm px-3 py-1 bg-secondary text-secondary-foreground rounded-full border border-border"
                  >
                    <span className="font-semibold">{k.word}</span>
                    <span className="text-muted-foreground ml-1 opacity-70">
                        : {k.definition.replace(/^Hidden:\s*/, "")}
                    </span>
                  </span>
                ))}
              </div>
          )}
      </div>

      {/* Footer Controls */}
      <Button
         onClick={(e) => {
           e.stopPropagation();
           handlePlay();
         }}
         variant={speaking ? "outline" : "primary"}
         size="lg"
         isLoading={loading}
         className="w-full h-14 text-lg font-medium rounded-md mt-auto"
      >
          {speaking ? <AudioVisualizer /> : <span className="flex items-center gap-2"><AudioLines className="w-5 h-5" /> Play Audio</span>}
      </Button>
    </div>
  );
}
