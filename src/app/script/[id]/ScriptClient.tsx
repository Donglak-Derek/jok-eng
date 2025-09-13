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
      const t = setTimeout(() => {
        window.location.href = `/category/${script.categorySlug}`;
      }, 800);
      return () => clearTimeout(t);
    }
  }, [heardSet.size, repeatsKey, script.categorySlug, total]);

  return (
    <div className="min-h-dvh bg-[var(--background)]">
      <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 flex flex-col gap-5 md:gap-6">
        <header className="sticky top-0 z-10 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-3 md:py-4 backdrop-blur bg-[var(--background)]/80 flex items-center gap-2 border-b border-black/5 dark:border-white/10">
          <Link href={`/category/${script.categorySlug}`} className="text-lg md:text-xl leading-none">←</Link>
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">{script.title}</h1>
            <div className="flex items-center gap-3">
              <p className="text-xs md:text-sm text-black/60 dark:text-white/60 line-clamp-2">{script.cleanedEnglish}</p>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-between">
          <ProgressBar total={total} completed={heardSet.size} />
          <div className="text-xs md:text-sm text-black/60 dark:text-white/60 ml-3 shrink-0">Repeats: {repeats}</div>
        </div>

        <div className="grid gap-3 md:gap-4">
          {script.sentences.map((sen, i) => (
            <SentenceCard
              key={sen.id}
              sentence={sen}
              index={i}
              onHeard={(idx) => setHeardSet((s) => new Set(s).add(idx))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
