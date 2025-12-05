"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Script } from "@/types";
import ProgressBar from "@/components/ProgressBar";
import SentenceCard from "@/components/SentenceCard";

type Props = { script: Script };

export default function ScriptClient({ script }: Props) {
  const total = script.sentences.length;
  const storageKey = `jokeng:progress:${script.id}`;
  const repeatsKey = `jokeng:repeats:${script.id}`;
  const [heardSet, setHeardSet] = useState<Set<number>>(new Set());
  const [repeats, setRepeats] = useState<number>(0);

  // Load progress, reset if previous run was complete
  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        const arr: number[] = JSON.parse(raw);
        if (arr.length === total && total > 0) {
          setHeardSet(new Set());
          localStorage.setItem(storageKey, JSON.stringify([]));
        } else {
          setHeardSet(new Set(arr));
        }
      } catch {
        setHeardSet(new Set());
      }
    } else {
      setHeardSet(new Set());
    }
  }, [storageKey, total]);

  // Persist progress
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(Array.from(heardSet.values())));
  }, [heardSet, storageKey]);

  // Load repeats counter
  useEffect(() => {
    const v = localStorage.getItem(repeatsKey);
    setRepeats(v ? Number(v) || 0 : 0);
  }, [repeatsKey]);

  // On completion, increment repeats and navigate back
  useEffect(() => {
    if (total > 0 && heardSet.size === total) {
      const cur = Number(localStorage.getItem(repeatsKey) || "0") || 0;
      const next = cur + 1;
      localStorage.setItem(repeatsKey, String(next));
      setRepeats(next);
      // Reset progress immediately so cards return to original color
      localStorage.setItem(storageKey, JSON.stringify([]));
      setHeardSet(new Set());
      const t = setTimeout(() => {
        window.location.href = `/category/${script.categorySlug}`;
      }, 800);
      return () => clearTimeout(t);
    }
  }, [heardSet.size, repeatsKey, storageKey, script.categorySlug, total]);

  return (
    <div className="min-h-dvh text-[color:var(--foreground)]">
      <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 flex flex-col gap-5 md:gap-6">
        <header className="sticky top-0 z-10 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-3 md:py-4 backdrop-blur bg-[color:var(--background)]/70 flex items-center gap-3 border-b border-[color:var(--accent-purple)]/30 shadow-[0_10px_40px_rgba(34,19,74,0.7)]">
          <Link href={`/category/${script.categorySlug}`} className="text-lg md:text-xl leading-none text-[color:var(--accent-blue)] drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]">←</Link>
          <div>
            <h1 className="headline text-2xl md:text-3xl lg:text-4xl tracking-[0.05em] bg-gradient-to-r from-[color:var(--accent-pink)] via-[color:var(--accent-purple)] to-[color:var(--accent-blue)] text-transparent bg-clip-text">
              {script.title}
            </h1>
            <div className="flex items-center gap-3">
              <p className="text-xs md:text-sm text-[color:var(--muted)] line-clamp-2">{script.cleanedEnglish}</p>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-between">
          <ProgressBar total={total} completed={heardSet.size} />
          <div className="text-xs md:text-sm text-[color:var(--muted)] ml-3 shrink-0">Repeats: {repeats}</div>
        </div>

        <div className="grid gap-3 md:gap-4">
          {script.sentences.map((sen, i) => (
            <SentenceCard
              key={sen.id}
              sentence={sen}
              index={i}
              heard={heardSet.has(i)}
              onHeard={(idx) => setHeardSet((s) => new Set(s).add(idx))}
            />
          ))}
        </div>

        <div className="pt-2">
          <Link
            href={`/category/${script.categorySlug}`}
            className="inline-flex w-full items-center justify-center px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-[color:var(--accent-purple)]/40 bg-[color:var(--card-bg)]/80 text-sm md:text-base active:scale-[0.99] transition shadow-[0_10px_40px_rgba(124,58,237,0.18)] hover:border-[color:var(--accent-pink)]/50"
          >
            ← Back to {script.categoryName}
          </Link>
        </div>
      </div>
    </div>
  );
}
