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
    const u = new SpeechSynthesisUtterance(sentence.en);
    u.lang = "en-US";
    u.rate = 1;
    u.onstart = () => setSpeaking(true);
    u.onend = () => {
      setSpeaking(false);
      onHeard(index);
    };
    utteranceRef.current = u;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }, [index, onHeard, sentence.en]);

  const stop = useCallback(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const keywords = useMemo(() => sentence.keywords, [sentence.keywords]);

  return (
    <div className="border rounded p-4 flex flex-col gap-3">
      <div className="text-lg font-medium">{sentence.en}</div>
      <div className="text-sm text-black/70 dark:text-white/70">{sentence.ko}</div>

      <div className="flex flex-wrap gap-2 mt-1">
        {keywords.map((k) => (
          <span key={k.word} className="text-xs px-2 py-1 rounded bg-black/5 dark:bg-white/10">
            <span className="font-semibold">{k.word}</span>: {k.meaningKo}
          </span>
        ))}
      </div>

      <div className="flex gap-2 mt-2">
        <button
          className="px-3 py-1 rounded bg-foreground text-background text-sm disabled:opacity-50"
          onClick={speak}
          disabled={speaking}
          aria-label="Play English audio"
        >
          {speaking ? "Playing..." : "Play"}
        </button>
        {speaking && (
          <button
            className="px-3 py-1 rounded border text-sm"
            onClick={stop}
            aria-label="Stop audio"
          >
            Stop
          </button>
        )}
      </div>
    </div>
  );
}

