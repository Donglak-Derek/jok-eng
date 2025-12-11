"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { Sentence } from "@/types";

type Props = {
  sentence: Sentence;
  index: number;
  heard: boolean;
  onHeard: (index: number) => void;
};

export default function SentenceCard({ sentence, index, heard, onHeard }: Props) {
  const [speaking, setSpeaking] = useState(false);

  const speak = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (speaking) return; // avoid restarting while speaking
    if (!heard) {
      onHeard(index);
    }
    
    const textToSpeak = sentence.goodResponse ? sentence.goodResponse.text : sentence.en;
    setSpeaking(true);

    try {
      // Direct stream URL - starts playing immediately (no waiting for blob download)
      const params = new URLSearchParams({
        text: textToSpeak,
        voice: "en-US-AriaNeural", 
      });
      
      const audio = new Audio(`/api/tts?${params}`);
      
      await new Promise<void>((resolve, reject) => {
        audio.onended = () => resolve();
        audio.onerror = (e) => reject(e);
        // .play() returns a promise that rejects if autoplay is blocked
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(reject);
        }
      });
      
    } catch (error) {
       console.warn("High-quality TTS failed/blocked, falling back to system voice:", error);
       
       // Fallback to Web Speech API
       await new Promise<void>((resolve) => {
         const u = new SpeechSynthesisUtterance(textToSpeak);
         u.lang = "en-US";
         u.rate = 1;
         u.onend = () => resolve();
         u.onerror = () => resolve(); 
         window.speechSynthesis.speak(u);
       });
    } finally {
      setSpeaking(false);
    }
  }, [heard, index, onHeard, sentence.en, sentence.goodResponse, speaking]);

  const keywords = useMemo(() => sentence.keywords, [sentence.keywords]);

  const onCardClick = useCallback(() => {
    speak();
  }, [speak]);

  // New "Mistake -> Fix" Layout
  if (sentence.scenario && sentence.badResponse && sentence.goodResponse) {
    return (
      <div
        className={
          "relative rounded-3xl border border-[color:var(--accent-purple)]/35 p-5 md:p-6 lg:p-7 flex flex-col gap-5 active:scale-[0.99] transition duration-200 bg-[color:var(--card-bg)]/80 shadow-[0_10px_60px_rgba(34,19,74,0.7)] " +
          (speaking
            ? "ring-2 ring-[color:var(--accent-blue)]/60 shadow-[0_0_25px_rgba(34,211,238,0.35)] "
            : "hover:border-[color:var(--accent-pink)]/45 hover:shadow-[0_10px_80px_rgba(236,72,153,0.22)] ") +
          (heard ? "border-[color:var(--accent-blue)]/50 bg-[color:var(--card-bg)]/40" : "")
        }
        onClick={onCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            speak();
          }
        }}
        aria-label="Play correct response"
      >
        {/* Scenario Header */}
        <div className="pb-3 border-b border-[color:var(--accent-purple)]/20">
          <div className="text-xs font-bold tracking-widest text-[color:var(--accent-blue)] uppercase mb-1">
            Scenario
          </div>
          <div className="text-base md:text-lg font-medium text-[color:var(--foreground)]">
            {sentence.scenario}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {/* Bad Response (Mistake) */}
          <div className="relative p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
            <div className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 backdrop-blur text-[10px] font-bold text-red-300 uppercase tracking-wider">
              Mistake
            </div>
            <div className="text-lg md:text-xl font-bold text-red-300 mb-2 font-mono">
              &quot;{sentence.badResponse.text}&quot;
            </div>
            <div className="text-xs md:text-sm text-red-200/70 leading-relaxed">
              {sentence.badResponse.why}
            </div>
          </div>

          {/* Good Response (Fix) */}
          <div className="relative p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
              Better Fix
            </div>
            <div className="text-lg md:text-xl font-bold text-emerald-300 mb-2 font-mono">
              &quot;{sentence.goodResponse.text}&quot;
            </div>
            <div className="text-xs md:text-sm text-emerald-200/70 leading-relaxed">
              {sentence.goodResponse.why}
            </div>
          </div>
        </div>

        {/* Play Hint */}
        {keywords.length > 0 && (
           <div className="flex flex-wrap gap-2 mt-1 pt-3 border-t border-[color:var(--accent-purple)]/20">
            {keywords.map((k) => (
              <span
                key={k.word}
                className="text-xs md:text-sm px-2.5 md:px-3 py-1 rounded-full bg-[color:var(--accent-purple)]/10 border border-[color:var(--accent-purple)]/35"
              >
                <span className="font-semibold text-[color:var(--accent-purple)]">{k.word}</span>
                <span className="opacity-70">: {k.meaningKo}</span>
              </span>
            ))}
           </div>
        )}

        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="pointer-events-none absolute bottom-4 right-4 w-6 h-6 text-[color:var(--accent-blue)]/50"
          fill="currentColor"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    );
  }

  // Original Layout (Fallback)
  return (
    <div
      className={
        "relative rounded-3xl border border-[color:var(--accent-purple)]/35 p-4 md:p-5 lg:p-6 flex flex-col gap-3 md:gap-4 active:scale-[0.99] transition duration-200 bg-[color:var(--card-bg)]/80 shadow-[0_10px_60px_rgba(34,19,74,0.7)] " +
        (speaking
          ? "ring-2 ring-[color:var(--accent-blue)]/60 shadow-[0_0_25px_rgba(34,211,238,0.35)] "
          : "hover:border-[color:var(--accent-pink)]/45 hover:shadow-[0_10px_80px_rgba(236,72,153,0.22)] ") +
        (heard ? "border-[color:var(--accent-blue)]/50 bg-[color:var(--card-bg)]/40" : "")
      }
      onClick={onCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          speak();
        }
      }}
      aria-label="Play sentence"
    >
      <div className="min-w-0 pr-10">
        <div className="text-lg md:text-xl lg:text-2xl font-semibold drop-shadow-[0_0_15px_rgba(168,85,247,0.25)]">
          {sentence.en}
        </div>
        <div className="text-sm md:text-base text-[color:var(--muted)]">{sentence.ko}</div>
      </div>

      <div className="flex flex-wrap gap-2 md:gap-2.5 mt-1">
        {keywords.map((k) => (
          <span
            key={k.word}
            className="text-xs md:text-sm px-2.5 md:px-3 py-1 rounded-full bg-[color:var(--accent-purple)]/10 border border-[color:var(--accent-purple)]/35 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          >
            <span className="font-semibold">{k.word}</span>: {k.meaningKo}
          </span>
        ))}
      </div>

      {/* Decorative play icon in bottom-right */}
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="pointer-events-none absolute bottom-3 right-3 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[color:var(--accent-blue)]/50"
        fill="currentColor"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  );
}
