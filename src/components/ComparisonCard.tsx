"use client";

import { useRef, useEffect, useCallback, useMemo, useState } from "react";
import type { Sentence, Script } from "@/types";
import { Button } from "@/components/Button";
import { Bot, Gem } from "lucide-react";
import { motion } from "framer-motion";
import { playScenarioAudio } from "@/lib/tts";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { UserScript } from "@/types";
import { getAuth } from "firebase/auth";

type Props = {
  sentence: Sentence;
  index: number;
  subStep: 0 | 1 | 2; // Passed from StandardScriptFlow
  onHeard: (index: number) => void;
  isAutoPlayEnabled?: boolean;
  mode?: "standard" | "cloze";
  isGlobalRevealed?: boolean;
  script?: Script;
  onAudioGenerated?: (url: string) => void;
};

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
  subStep = 0,
  onHeard,
  mode = "standard",
  isGlobalRevealed = false,
  isAutoPlayEnabled = true,
  script,
  onAudioGenerated,
}: Props) {
  const { userProfile } = useAuth();
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [localRevealed, setLocalRevealed] = useState<Set<string>>(new Set());

  useEffect(() => {
    setLocalRevealed(new Set());
  }, [index]);

  const cleanTextForTTS = (text: string) => {
    let clean = text.replace(/\[|\]/g, "");
    clean = clean.replace(/^You:\s*/i, "");
    return clean;
  };

  const isEffectiveGlobalReveal = mode === "standard" || isGlobalRevealed;
  const textForCloze = sentence.goodResponse?.text || sentence.en;

  const allHiddenWords = useMemo(() => {
    return (textForCloze.match(/\[(.*?)\]/g) || []).map(m => m.slice(1, -1));
  }, [textForCloze]);

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
                  inline-block rounded px-2 mx-1 border-b-2 transition-all duration-300 align-baseline relative
                  ${isRevealed
                    ? "bg-primary/10 border-primary/30 text-white cursor-pointer hover:bg-primary/20"
                    : "bg-zinc-800 border-white/10 text-transparent cursor-pointer hover:bg-zinc-700 select-none min-w-[3ch] text-center"
                  }
                  ${!isRevealed ? "active:scale-95" : ""}
                `}
                animate={{
                  backgroundColor: isRevealed ? "rgba(var(--primary-rgb), 0.1)" : "rgba(39, 39, 42, 1)",
                  borderColor: isRevealed ? "rgba(var(--primary-rgb), 0.3)" : "rgba(255, 255, 255, 0.1)",
                  color: isRevealed ? "#ffffff" : "transparent"
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
      try {
        const token = await getAuth().currentUser?.getIdToken();
        const params = new URLSearchParams({
          text: textToSpeak,
          voice: "en-US-AriaNeural",
        });
        if (token) params.append("token", token);

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
  }, [index, onHeard, sentence, speaking, userProfile, script, onAudioGenerated]);

  const hasAutoPlayedRef = useRef(false);

  useEffect(() => {
    hasAutoPlayedRef.current = false;
  }, [index]);

  useEffect(() => {
    if (subStep === 2 && !hasAutoPlayedRef.current && isAutoPlayEnabled) {
      hasAutoPlayedRef.current = true;
      setTimeout(() => {
        handlePlay();
      }, 300);
    }
  }, [subStep, handlePlay, isAutoPlayEnabled]);

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  return (
    <div className="bg-zinc-900/50 rounded-3xl border border-white/5 overflow-hidden shadow-2xl transition-all flex flex-col h-full relative backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

      {/* 1. SCENARIO / CONTEXT */}
      <motion.div
        className={`p-6 md:p-10 pb-8 text-center border-b border-white/5 bg-zinc-950/30 transition-all duration-500`}
        animate={{ opacity: 1 }}
      >
        <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4">
          Mission Context
        </div>
        <div className="text-2xl md:text-4xl font-black text-white leading-tight italic tracking-tight">
          {sentence.scenario}
        </div>
      </motion.div>

      <div className="flex-1 p-4 md:p-8 pt-6 flex flex-col gap-6 relative">
        
        {/* STEP 0: DECISION REQUIRED */}
        {subStep === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center min-h-[200px] animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="w-16 h-16 rounded-full border border-zinc-700 flex items-center justify-center mb-8 relative">
                 <div className="absolute inset-0 rounded-full border border-primary/30 animate-[ping_2.5s_infinite]" />
                 <div className="w-2 h-2 rounded-full bg-primary" />
             </div>
             <p className="text-xs font-black tracking-[0.3em] uppercase text-zinc-500 mb-2">
                 [ TACTICAL PAUSE ]
             </p>
             <p className="text-2xl md:text-3xl font-black italic text-center text-white uppercase tracking-tight">
                 Analyze Subtext
             </p>
          </div>
        )}

        {/* STEP 1: BAD RESPONSE (The Trap) */}
        {subStep === 1 && sentence.badResponse && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className={`relative bg-rose-500/5 p-6 md:p-8 rounded-3xl border border-rose-500/20 shadow-2xl overflow-hidden shadow-rose-500/10`}
          >
            <div className="absolute top-0 left-0 w-12 h-12 bg-rose-500/10 blur-xl" />
            <div className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <span className="bg-rose-500/20 px-2 py-0.5 rounded-sm border border-rose-500/30">WARNING</span>
              <span>Potential Trap</span>
            </div>

            <div className="text-2xl md:text-3xl font-black leading-tight text-white/50 text-left italic line-through decoration-rose-500/50 decoration-2">
              &quot;{sentence.badResponse.text}&quot;
            </div>

            <div className="mt-6 pt-6 border-t border-rose-500/10">
              <div className="flex gap-4 items-start">
                <div className="mt-1 text-rose-500 scale-125 shrink-0 opacity-80">⚠️</div>
                <div className="text-sm md:text-base font-medium text-rose-200/60 leading-relaxed">
                  <span className="font-black text-rose-400 uppercase tracking-widest text-[10px] mr-2">Risk Factor:</span>{sentence.badResponse.why}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2: GOOD RESPONSE (The Solution) */}
        {subStep === 2 && sentence.goodResponse && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className={`relative bg-teal-500/5 p-6 rounded-2xl border border-teal-500/20 shadow-lg shadow-teal-500/10 flex-1 flex flex-col`}
          >
            <div className="text-xs font-bold text-teal-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="bg-teal-500/10 px-2 py-0.5 rounded text-[10px] border border-teal-500/20">Star Answer</span>
              <span>Better Approach</span>
            </div>

            <div className="text-2xl md:text-3xl font-bold leading-relaxed text-white text-left">
              {renderClozeText(sentence.goodResponse.text)}
            </div>

            <div className="mt-4 pt-4 border-t border-teal-500/10">
              <div className="flex gap-3 items-start opacity-90">
                <div className="mt-0.5 text-lg shrink-0">💡</div>
                <div className="text-sm md:text-base font-medium text-teal-100/80 leading-relaxed">
                  <span className="font-bold mr-1 text-teal-400">Why it works:</span>{sentence.goodResponse.why}
                </div>
              </div>
            </div>

            {/* KEYWORDS */}
            {(isEffectiveGlobalReveal || localRevealed.size > 0) && sentence.keywords && sentence.keywords.length > 0 && (
              <div className="flex flex-wrap justify-start gap-2 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                {sentence.keywords.map((k) => {
                  const isWordRevealed = isEffectiveGlobalReveal ||
                    Array.from(localRevealed).some(r => r.toLowerCase() === k.word.toLowerCase());

                  if (!isWordRevealed) return null;
                  return (
                    <span key={k.word} className="text-[11px] font-black uppercase tracking-wider px-4 py-2 bg-zinc-950 text-zinc-300 rounded-lg border border-white/5 shadow-inner leading-snug">
                      <span className="text-primary mr-1.5">{k.word}</span> <span className="text-zinc-500 font-medium normal-case tracking-normal opacity-60">:</span> {k.definition}
                    </span>
                  );
                })}
              </div>
            )}
             {/* PLAY BUTTON (Always visible in Step 2) */}
            <div className="mt-auto pt-6">
                <Button
                onClick={(e) => {
                    e.stopPropagation();
                    handlePlay();
                }}
                variant={speaking ? "outline" : "primary"}
                size="lg"
                isLoading={loading}
                className="w-full h-16 text-sm font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-primary/20 hover:scale-[1.01] transition-all active:scale-[0.99]"
                >
                {speaking ? <AudioVisualizer /> : <span className="flex items-center gap-2">{sentence.audioUrl ? <Gem className="w-5 h-5 text-teal-400" /> : <Bot className="w-5 h-5 text-zinc-400" />} Listen To Audio</span>}
                </Button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
