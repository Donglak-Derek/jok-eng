"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import type { Sentence, Script } from "@/types";
import { Button } from "@/components/Button";
import { Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { playScenarioAudio } from "@/lib/tts";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { UserScript } from "@/types";

type Props = {
  sentence: Sentence;
  index: number;
  onHeard: (index: number) => void;
  isAutoPlayEnabled?: boolean;
  mode?: "standard" | "cloze";
  isGlobalRevealed?: boolean;
  script?: Script;
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
  mode = "standard",
  isGlobalRevealed = false,
  isAutoPlayEnabled = true,
  script,
}: Props) {
  const { userProfile } = useAuth();
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [localRevealed, setLocalRevealed] = useState<Set<string>>(new Set());
  // Progressive Reveal State: 0 (Situation) -> 1 (Trap) -> 2 (Solution)
  const [step, setStep] = useState<0 | 1 | 2>(0);

  // Reset state when index changes
  useEffect(() => {
    setStep(0);
    setLocalRevealed(new Set());
  }, [index]);

  // Clean text helper (for TTS)
  const cleanTextForTTS = (text: string) => {
    let clean = text.replace(/\[|\]/g, "");
    clean = clean.replace(/^You:\s*/i, "");
    return clean;
  };

  // Derived State
  const isEffectiveGlobalReveal = mode === "standard" || isGlobalRevealed;

  // Extract all hidden words for "Reveal All" behavior
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

    const rawText = sentence.goodResponse?.text || sentence.en;
    const textToSpeak = cleanTextForTTS(rawText);

    setLoading(true);
    setSpeaking(true);

    if (script) {
      playScenarioAudio(userProfile, script, {
        text: textToSpeak,
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
          if (!script) return;
          const newSentences = [...(script.sentences || [])];
          const targetIndex = newSentences.findIndex(s => s.id === sentence.id);
          if (targetIndex !== -1) {
            newSentences[targetIndex] = { ...newSentences[targetIndex], audioUrl: url };

            let scriptRef;
            if ('userId' in script) {
              scriptRef = doc(db, `users/${(script as UserScript).userId}/scenarios`, script.id);
            } else {
              scriptRef = doc(db, `users/jok-eng-official/scenarios`, script.id);
            }

            updateDoc(scriptRef, { sentences: newSentences }).catch(e => console.error(e));

            toast.success("💎 You just sponsored this audio for the community!", {
              duration: 4000,
              position: "bottom-center"
            });
          }
        }
      });
    } else {
      // Fallback
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
    }
  }, [index, onHeard, sentence, speaking, userProfile, script]);

  // Auto-play logic attached to Step 2
  const hasAutoPlayedRef = useRef(false);

  // Reset auto-play flag when index changes
  useEffect(() => {
    hasAutoPlayedRef.current = false;
  }, [index]);

  // Trigger when entering Step 2 AND (standard mode OR user explicitly navigated)
  useEffect(() => {
    // Check if script exists, if so check if we have cached audio?
    // Not directly available here, but playScenarioAudio handles it silently.

    if (step === 2 && !hasAutoPlayedRef.current && isAutoPlayEnabled) {
      hasAutoPlayedRef.current = true;
      // Small delay to let animation settle
      setTimeout(() => {
        handlePlay();
      }, 300);
    }
  }, [step, handlePlay, isAutoPlayEnabled]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  // Helper to validate content
  const isValidContent = (text?: string) => {
    if (!text) return false;
    const lower = text.toLowerCase().trim();
    return lower !== "n/a" && lower !== "n/a." && lower !== "none";
  };

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm transition-all hover:shadow-md flex flex-col h-full relative">



      {/* 1. SCENARIO / CONTEXT */}
      <motion.div
        className={`p-6 md:p-8 pb-6 text-center border-b border-border/40 bg-slate-50/50 transition-all duration-500
            ${step > 0 ? "opacity-100" : "opacity-100"} 
        `}
      >
        <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
          The Situation
        </div>
        <div className="text-2xl md:text-3xl font-semibold text-foreground leading-snug">
          {sentence.scenario}
        </div>
      </motion.div>

      <div className="flex-1 p-4 md:p-8 pt-6 flex flex-col gap-6 relative">

        {/* STEP 0 ACTION: Reveal Options */}
        {step === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center min-h-[200px] animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-3xl md:text-4xl font-bold text-center mb-8 bg-[linear-gradient(110deg,#9333ea,45%,#ec4899,55%,#9333ea)] bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_3s_infinite] leading-tight drop-shadow-sm">
              How would you respond?
            </p>
            <Button
              onClick={() => setStep(1)}
              className="rounded-full px-10 py-7 text-xl font-bold bg-foreground text-background hover:scale-105 transition-all shadow-xl shadow-purple-500/20"
            >
              Reveal Options
            </Button>
          </div>
        )}

        {/* 2. BAD RESPONSE (The Trap) */}
        {step >= 1 && sentence.badResponse && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: step === 2 ? 0.6 : 1, scale: 1, y: 0 }}
            className={`relative bg-red-50/50 p-6 rounded-2xl border border-red-100 shadow-lg shadow-red-100/50`}
          >
            <div className="text-xs font-bold text-red-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="bg-red-100 px-2 py-0.5 rounded text-[10px] border border-red-200">Avoid</span>
              <span>Common Suggestion</span>
            </div>

            <div className="text-2xl md:text-3xl font-bold leading-relaxed text-red-950/60 text-left line-through decoration-red-900/40">
              &quot;{sentence.badResponse.text}&quot;
            </div>

            <div className="mt-4 pt-4 border-t border-red-200/50">
              <div className="flex gap-3 items-start opacity-90">
                <div className="mt-0.5 text-lg shrink-0">⚠️</div>
                <div className="text-sm md:text-base font-medium text-red-800/80 leading-relaxed">
                  <span className="font-bold mr-1 text-red-900">Risk:</span>{sentence.badResponse.why}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 1 ACTION: See Better Way */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center pt-8"
          >
            <Button
              onClick={() => setStep(2)}
              className="rounded-full px-8 py-6 text-lg bg-teal-600 text-white hover:bg-teal-700 hover:scale-105 transition-all shadow-xl shadow-teal-200"
            >
              See Better Approach ✨
            </Button>
          </motion.div>
        )}

        {/* 3. GOOD RESPONSE (The Solution) */}
        {step === 2 && sentence.goodResponse && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className={`relative bg-teal-50/50 p-6 rounded-2xl border border-teal-100 shadow-lg shadow-teal-100/50`}
          >
            <div className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="bg-teal-100 px-2 py-0.5 rounded text-[10px] border border-teal-200">Star Answer</span>
              <span>Better Approach</span>
            </div>

            <div className="text-2xl md:text-3xl font-bold leading-relaxed text-teal-950 text-left">
              {renderClozeText(sentence.goodResponse.text)}
            </div>

            <div className="mt-4 pt-4 border-t border-teal-200/50">
              <div className="flex gap-3 items-start opacity-90">
                <div className="mt-0.5 text-lg shrink-0">💡</div>
                <div className="text-sm md:text-base font-medium text-teal-800/80 leading-relaxed">
                  <span className="font-bold mr-1 text-teal-900">Why it works:</span>{sentence.goodResponse.why}
                </div>
              </div>
            </div>

            {/* KEYWORDS */}
            {(isEffectiveGlobalReveal || localRevealed.size > 0) && sentence.keywords && sentence.keywords.length > 0 && (
              <div className="flex flex-wrap justify-start gap-2 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                {sentence.keywords.map((k) => {
                  // Check for case-insensitive match (e.g. "seamless" in text vs "Seamless" in definitions)
                  const isWordRevealed = isEffectiveGlobalReveal ||
                    Array.from(localRevealed).some(r => r.toLowerCase() === k.word.toLowerCase());

                  if (!isWordRevealed) return null;
                  return (
                    <span key={k.word} className="text-sm px-3 py-1.5 bg-white text-teal-900 rounded-md border border-teal-200 shadow-sm leading-snug">
                      <span className="font-bold">{k.word}</span>: {k.definition}
                    </span>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* 5. PLAY BUTTON (Always visible in Step 2) */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-auto pt-4"
          >
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
              {speaking ? <AudioVisualizer /> : <span className="flex items-center gap-2"><Volume2 className="w-5 h-5" /> Listen Again</span>}
            </Button>
          </motion.div>
        )}

      </div>
    </div>
  );
}
