"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { Sentence } from "@/types";

type Props = {
  sentence: Sentence;
  index: number;
  onHeard: (index: number) => void;
};

export default function SentenceCard({ sentence, index, onHeard }: Props) {
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback(() => {
    if (typeof window === "undefined") return;
    if (speaking) return; // avoid restarting while speaking
    const u = new SpeechSynthesisUtterance(sentence.en);
    u.lang = "en-US";
    u.rate = 1;
    u.onstart = () => setSpeaking(true);
    u.onend = () => {
      setSpeaking(false);
      onHeard(index);
    };
    utteranceRef.current = u;
    window.speechSynthesis.speak(u);
  }, [index, onHeard, sentence.en, speaking]);

  const keywords = useMemo(() => sentence.keywords, [sentence.keywords]);

  const onCardClick = useCallback(() => {
    speak();
  }, [speak]);

  return (
    <div
      className={
        "relative rounded-2xl shadow-md border border-black/5 dark:border-white/10 bg-[color:var(--card-bg)] p-4 flex flex-col gap-3 active:scale-[0.99] transition " +
        (speaking ? "ring-1 ring-black/20 dark:ring-white/30" : "")
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
        <div className="text-lg font-medium">{sentence.en}</div>
        <div className="text-sm text-black/70 dark:text-white/70">{sentence.ko}</div>
      </div>

      <div className="flex flex-wrap gap-2 mt-1">
        {keywords.map((k) => (
          <span key={k.word} className="text-xs px-2 py-1 rounded bg-black/5 dark:bg-white/5">
            <span className="font-semibold">{k.word}</span>: {k.meaningKo}
          </span>
        ))}
      </div>

      {/* Decorative play icon in bottom-right */}
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="pointer-events-none absolute bottom-3 right-3 w-8 h-8 text-black/15 dark:text-white/20"
        fill="currentColor"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  );
}
