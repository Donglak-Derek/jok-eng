"use client";

import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import type { Sentence, Script } from "@/types";
import { Button } from "@/components/Button";
import { AudioLines, User, Mic } from "lucide-react";
import { motion } from "framer-motion";
import { playScenarioAudio } from "@/lib/tts";
import { useAuth } from "@/context/AuthContext";
import PremiumVoiceUpsell from "@/components/subscription/PremiumVoiceUpsell";

type Props = {
  sentence: Sentence;
  index: number;
  heard: boolean;
  onHeard: (index: number) => void;
  mode?: "standard" | "cloze";
  isGlobalRevealed?: boolean;
  isAutoPlayEnabled?: boolean;
  script?: Script;
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
            }
         });
    } else {
       try {
           const params = new URLSearchParams({ text: cleanText(textToDisplay), voice: "en-US-AriaNeural" });
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
                    if (mode === "standard") return;
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
                    color: isRevealed ? "#0f172a" : "rgba(15, 23, 42, 0)"
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
        ? 'bg-blue-50 border-blue-100 rounded-tr-3xl rounded-bl-3xl rounded-br-3xl' 
        : 'bg-purple-50 border-purple-100 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl')
    : 'bg-white rounded-lg'; // Default

  return (
    <div className={`
        relative flex flex-col gap-4 p-6 md:p-10 border shadow-sm transition-all hover:shadow-md h-full
        ${bubbleClass}
        ${!isSkit && 'border-border'}
    `}>
      
      {/* HEADER: Section or Speaker Badge */}
      <div className={`flex w-full ${isSkit ? (isSpeakerA ? 'justify-start' : 'justify-end') : 'justify-center'}`}>
          {sentence.section && (
              <span className="px-3 py-1 bg-black text-white text-xs font-black uppercase tracking-widest rounded-full">
                  {sentence.section}
              </span>
          )}
          {sentence.speaker && (
              <span className={`flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full ${isSpeakerA ? 'bg-blue-200 text-blue-800' : 'bg-purple-200 text-purple-800'}`}>
                  <User className="w-3 h-3" /> {sentence.speaker === 'A' ? myRole : otherRole}
              </span>
          )}
      </div>

      {/* Mood Badge (Optional) */}
      {sentence.mood && (
          <div className={`text-xs font-medium italic text-muted-foreground w-full ${isSkit ? (isSpeakerA ? 'text-left' : 'text-right') : 'text-center'}`}>
              (Mood: {sentence.mood})
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
             <div className="text-sm text-muted-foreground italic animate-pulse">
                Click hidden boxes to reveal
             </div>
          )}
          {anyRevealed && keywords.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {keywords.map((k) => (
                  <span
                    key={k.word}
                    className="text-sm px-4 py-2 bg-secondary text-secondary-foreground rounded-lg border border-border text-left leading-snug break-words"
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
      <PremiumVoiceUpsell show={!script?.audioUrl && !sentence.audioUrl} />
    </div>
  );
}
