"use client";

import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import type { Sentence, Script } from "@/types";
import { Button } from "@/components/Button";
import { User, Mic, Bot, Gem } from "lucide-react";
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
  heard: boolean;
  onHeard: (index: number) => void;
  mode?: "standard" | "cloze";
  isGlobalRevealed?: boolean;
  isAutoPlayEnabled?: boolean;
  script?: Script;
  onAudioGenerated?: (url: string) => void;
};

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

const AudioVisualizer = () => (
  <div className="flex items-center justify-center gap-1 h-4">
    <div className="w-0.5 bg-current animate-[pulse_0.5s_infinite] h-2"></div>
    <div className="w-0.5 bg-current animate-[pulse_0.7s_infinite] h-4"></div>
    <div className="w-0.5 bg-current animate-[pulse_0.6s_infinite] h-3"></div>
    <div className="w-0.5 bg-current animate-[pulse_0.8s_infinite] h-2"></div>
  </div>
);

export default function StoryCard({
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

  const cleanText = (text: string) => text.replace(/\[|\]/g, "");
  const keywords = useMemo(() => sentence.keywords || [], [sentence.keywords]);
  const isEffectiveGlobalReveal = mode === "standard" || isGlobalRevealed;
  const anyRevealed = isEffectiveGlobalReveal || localRevealed.size > 0;
  const textToDisplay = sentence.en;

  const allHiddenWords = useMemo(() => {
    const matches = textToDisplay.match(/\[(.*?)\]/g);
    return matches ? matches.map(m => m.slice(1, -1)) : [];
  }, [textToDisplay]);

  const { userProfile } = useAuth();

  const handlePlay = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (!heard) onHeard(index);
    setLoading(true);
    setSpeaking(true);

    if (script) {
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
  }, [heard, index, onHeard, textToDisplay, userProfile, script, sentence.id, onAudioGenerated]);

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

  useEffect(() => {
    return () => { if (audioRef.current) audioRef.current.pause(); };
  }, []);

  const renderClozeText = () => {
    const parts = textToDisplay.split(/(\[.*?\])/g);
    const isLongText = textToDisplay.length > 80;
    const dynamicFontSize = isLongText ? "text-xl md:text-2xl" : "text-2xl md:text-4xl";

    if (parts.length === 1) {
      return <span className={`${dynamicFontSize} font-bold leading-relaxed text-foreground`}>{cleanText(textToDisplay)}</span>;
    }

    return (
      <motion.p
        className={`${dynamicFontSize} font-black leading-tight text-white italic tracking-tight leading-snug`}
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
                  if (mode === "standard") return;
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

  // Determine Visual Style based on Section or Speaker
  const isSkit = !!sentence.speaker;

  // Skit Alignment
  // Safe cast for roles
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userScript = script as any;
  const myRole = userScript?.originalPrompt?.myRole || 'A';
  const otherRole = userScript?.originalPrompt?.otherRole || 'B';

  const isSpeakerA = sentence.speaker === 'A';
  const alignClass = isSkit ? (isSpeakerA ? 'text-left items-start' : 'text-right items-end') : 'text-center items-center';
  const bubbleClass = isSkit
    ? (isSpeakerA
      ? "bg-blue-500/10 border-blue-500/20 rounded-tr-[40px] rounded-bl-[40px] rounded-br-[40px]"
      : "bg-purple-500/10 border-purple-500/20 rounded-tl-[40px] rounded-bl-[40px] rounded-br-[40px]")
    : "bg-zinc-900/50 rounded-3xl border-white/5"; // Default

  return (
    <div className={`
        relative flex flex-col gap-6 p-8 md:p-12 border shadow-2xl transition-all hover:shadow-primary/5 h-full backdrop-blur-xl overflow-hidden
        ${bubbleClass}
    `}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

      {/* HEADER: Section or Speaker Badge */}
      <div className={`flex w-full ${isSkit ? (isSpeakerA ? 'justify-start' : 'justify-end') : 'justify-center'}`}>
        {sentence.section && (
          <span className="px-3 py-1 bg-zinc-950 text-zinc-500 border border-white/5 text-[9px] font-black uppercase tracking-[0.2em] rounded-sm">
            {sentence.section}
          </span>
        )}
        {sentence.speaker && (
          <span className={`flex items-center gap-2 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm border ${isSpeakerA ? "bg-blue-500/20 text-blue-400 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]" : "bg-purple-500/20 text-purple-400 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]"}`}>
            <User className="w-3.5 h-3.5" /> {sentence.speaker === 'A' ? myRole : otherRole}
          </span>
        )}
      </div>

      {/* Mood Badge (Optional) */}
      {sentence.mood && (
        <div className={`text-[10px] font-black uppercase tracking-widest text-zinc-500/60 w-full ${isSkit ? (isSpeakerA ? 'text-left' : 'text-right') : 'text-center'}`}>
          [ Tactical Intensity: {sentence.mood} ]
        </div>
      )}

      {/* Main Text Area */}
      <div className={`flex-1 flex flex-col justify-center min-h-[100px] ${alignClass}`}>
        <div className="relative max-w-full">
          {renderClozeText()}
        </div>
      </div>

      {/* Info / Feedback Section */}
      <div className="min-h-[24px] flex flex-col items-center gap-4">
        {mode === "cloze" && !anyRevealed && (
          <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest animate-pulse">
            Click hidden descriptors to reveal
          </div>
        )}
        {anyRevealed && keywords.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {keywords.map((k) => (
              <span
                key={k.word}
                className="text-xs font-bold px-4 py-3 bg-zinc-950/80 text-zinc-300 rounded-xl border border-white/5 text-left leading-snug break-words shadow-inner"
              >
                <span className="font-black text-primary uppercase tracking-wider">{k.word}</span>
                <span className="text-zinc-500 ml-1.5 opacity-60">: {k.definition.replace(/^Hidden:\s*/, "")}</span>
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
        className="w-full h-16 text-sm font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-primary/20 hover:scale-[1.01] transition-all active:scale-[0.99] mt-auto"
      >
        {speaking ? <AudioVisualizer /> : <span className="flex items-center gap-2">{sentence.audioUrl ? <Gem className="w-5 h-5 text-teal-400" /> : <Bot className="w-5 h-5 text-zinc-400" />} Listen To Audio</span>}
      </Button>

    </div>
  );
}
