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
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback(() => {
    if (typeof window === "undefined") return;
    if (speaking) return; // avoid restarting while speaking
    if (!heard) {
      onHeard(index);
    }
    const u = new SpeechSynthesisUtterance(sentence.en);
    u.lang = "en-US";
    u.rate = 1;
    u.onstart = () => setSpeaking(true);
    u.onend = () => {
      setSpeaking(false);
    };
    utteranceRef.current = u;
    window.speechSynthesis.speak(u);
  }, [heard, index, onHeard, sentence.en, speaking]);

  const keywords = useMemo(() => sentence.keywords, [sentence.keywords]);

  const onCardClick = useCallback(() => {
    speak();
  }, [speak]);

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
