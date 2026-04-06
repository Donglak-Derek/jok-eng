"use client";

import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import type { Sentence, Script } from "@/types";
import { Button } from "@/components/Button";
import { Bot, Gem } from "lucide-react";
import { motion } from "framer-motion";
import { playScenarioAudio } from "@/lib/tts"; // Centralized TTS
import { useAuth } from "@/context/AuthContext"; // For profile/limits
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { UserScript } from "@/types";
import { getAuth } from "firebase/auth";

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
  // Context
  script?: Script;
  onAudioGenerated?: (url: string) => void;
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
  script,
  onAudioGenerated,
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

  const { userProfile } = useAuth();

  // --- TTS Handling ---
  const handlePlay = useCallback(async () => {
    if (typeof window === "undefined") return;

    // Stop any current audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (!heard) onHeard(index);

    setLoading(true);
    setSpeaking(true);

    if (script) {
      // Centralized Service
      playScenarioAudio(userProfile, script, {
        text: textToDisplay,
        sentenceId: sentence.id,
        onStart: () => setSpeaking(true),
        onEnd: () => {
          setSpeaking(false);
          setLoading(false);
        },
        onError: (err) => {
          console.error(err);
          setSpeaking(false);
          setLoading(false);
        },
        onAudioGenerated: (url) => {
          if (onAudioGenerated) onAudioGenerated(url);
          
          if (!script) return;
          const newSentences = [...(script.sentences || [])];
          const targetIndex = newSentences.findIndex(s => s.id === sentence.id);
          if (targetIndex !== -1) {
            newSentences[targetIndex] = { ...newSentences[targetIndex], audioUrl: url };

            // Background persistence for User Scripts (Owner Only)
            if ('userId' in script && userProfile?.uid && (script as UserScript).userId === userProfile.uid) {
                const scriptRef = doc(db, `users/${userProfile.uid}/scenarios`, script.id);
                updateDoc(scriptRef, { sentences: newSentences }).then(() => {
                    toast.success("💎 Audio saved to your mission!", {
                        duration: 4000,
                        position: "bottom-center"
                    });
                }).catch(e => console.error("Audio save error:", e));
            }
          }
        }
      });
    } else {
      // Fallback for Preview (No Script Object)
      try {
        const token = await getAuth().currentUser?.getIdToken();
        const params = new URLSearchParams({ text: cleanText(textToDisplay), voice: "en-US-AriaNeural" });
        if (token) params.append("token", token);
        const audio = new Audio(`/api/tts?${params}`);
        audioRef.current = audio;

        audio.oncanplay = () => setLoading(false);
        audio.onended = () => {
          setSpeaking(false);
          audioRef.current = null;
        };
        audio.play().catch(e => console.error(e));
      } catch (e) {
        console.error("Preview TTS failed", e);
        setSpeaking(false);
        setLoading(false);
      }
    }
  }, [heard, index, onHeard, textToDisplay, userProfile, script, sentence.id]);

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

    const isLongText = textToDisplay.length > 80;
    const dynamicFontSize = isLongText ? "text-xl md:text-2xl" : "text-2xl md:text-4xl";

    if (parts.length === 1) {
      return <span className={`${dynamicFontSize} font-bold leading-relaxed text-foreground`}>{cleanText(textToDisplay)}</span>;
    }



    return (
      <motion.p
        className={`${dynamicFontSize} font-bold leading-relaxed text-foreground leading-snug`}
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
                  inline-block rounded px-2.5 mx-1 border-b-2 transition-all duration-300 relative
                  ${isRevealed
                    ? "bg-primary/10 border-primary/30 text-white cursor-default"
                    : "bg-zinc-800 border-white/10 text-transparent cursor-pointer hover:bg-zinc-700/50 select-none min-w-[4ch] text-center"
                  }
                  ${mode !== "standard" && !isRevealed ? "active:scale-95" : ""}
                `}
                animate={{
                  scale: isRevealed ? [1, 1.05, 1] : 1,
                  backgroundColor: isRevealed ? "rgba(var(--primary-rgb), 0.1)" : "rgba(39, 39, 42, 1)",
                  borderColor: isRevealed ? "rgba(var(--primary-rgb), 0.3)" : "rgba(255, 255, 255, 0.1)",
                  color: isRevealed ? "#ffffff" : "rgba(255, 255, 255, 0)"
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
    <div className="bg-zinc-900/50 rounded-3xl border border-white/5 p-8 md:p-14 flex flex-col gap-8 shadow-2xl transition-all text-center h-full relative overflow-hidden backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />



      {/* Scenario / Context (if any) - Shifted down or kept as is */}
      {sentence.scenario && (
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 mb-2">
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
          <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest animate-pulse">
            Click hidden indicators to initiate reveal
          </div>
        )}

        {/* Keywords (if standard or revealed) */}
        {anyRevealed && keywords.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {keywords.map((k) => (
              <span
                key={k.word}
                className="text-xs font-bold px-4 py-3 bg-zinc-950/80 text-zinc-300 rounded-xl border border-white/5 text-left leading-snug max-w-full whitespace-normal break-words h-auto shadow-inner"
              >
                <span className="font-black text-primary uppercase tracking-wider">{k.word}</span>
                <span className="text-zinc-500 ml-1.5 opacity-80">
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
        className="w-full h-14 text-lg font-medium rounded-md mt-auto shadow-2xl shadow-primary/20 hover:scale-[1.01] transition-all active:scale-[0.99]"
      >
        {speaking ? <AudioVisualizer /> : <span className="flex items-center gap-2">{sentence.audioUrl ? <Gem className="w-5 h-5 text-teal-400" /> : <Bot className="w-5 h-5 text-zinc-400" />} Listen To Audio</span>}
      </Button>

    </div>
  );
}
