"use client";

import { useEffect, useMemo, useState } from "react";
import { scripts } from "@/data";
import SentenceCard from "@/components/SentenceCard";
import ProgressBar from "@/components/ProgressBar";
import Link from "next/link";

type Props = { params: Promise<{ id: string }> };

export default function ScriptPage({ params }: Props) {
  const [id, setId] = useState<string | null>(null);

  // Resolve route params in client component
  useEffect(() => {
    (async () => {
      const p = await params;
      setId(p.id);
    })();
  }, [params]);

  const script = useMemo(() => scripts.find((s) => s.id === id), [id]);
  const total = script?.sentences.length ?? 0;

  const storageKey = id ? `jokeng:progress:${id}` : null;
  const repeatsKey = id ? `jokeng:repeats:${id}` : null;
  const [heardSet, setHeardSet] = useState<Set<number>>(new Set());
  const [repeats, setRepeats] = useState<number>(0);

  useEffect(() => {
    if (!storageKey) return;
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        const arr: number[] = JSON.parse(raw);
        // If previous run was fully complete, reset for a fresh repeat attempt
        if (script && arr.length === script.sentences.length && script.sentences.length > 0) {
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
  }, [storageKey, script]);

  // Load repeats counter
  useEffect(() => {
    if (!repeatsKey) return;
    const v = localStorage.getItem(repeatsKey);
    setRepeats(v ? Number(v) || 0 : 0);
  }, [repeatsKey]);

  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(Array.from(heardSet.values())));
  }, [heardSet, storageKey]);

  useEffect(() => {
    if (total > 0 && heardSet.size === total && script && repeatsKey) {
      // Increment repeats count
      const cur = Number(localStorage.getItem(repeatsKey) || "0") || 0;
      const next = cur + 1;
      localStorage.setItem(repeatsKey, String(next));
      setRepeats(next);
      // Small delay then go back to category page
      const t = setTimeout(() => {
        window.location.href = `/category/${script.categorySlug}`;
      }, 800);
      return () => clearTimeout(t);
    }
  }, [heardSet.size, total, script, repeatsKey]);

  if (!script) {
    return (
      <div className="min-h-dvh bg-[var(--background)]">
        <div className="max-w-md mx-auto px-4 py-5">
          <Link href="/" className="text-sm hover:underline">← Back</Link>
          <div className="mt-4">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[var(--background)]">
      <div className="max-w-md mx-auto px-4 py-5 flex flex-col gap-5">
        <header className="sticky top-0 z-10 -mx-4 px-4 py-3 backdrop-blur bg-[var(--background)]/80 flex items-center gap-2 border-b border-black/5 dark:border-white/10">
          <Link href={`/category/${script.categorySlug}`} className="text-lg leading-none">←</Link>
          <div>
            <h1 className="text-xl font-semibold">{script.title}</h1>
            <div className="flex items-center gap-3">
              <p className="text-xs text-black/60 dark:text-white/60 line-clamp-2">{script.cleanedEnglish}</p>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-between">
          <ProgressBar total={total} completed={heardSet.size} />
          <div className="text-xs text-black/60 dark:text-white/60 ml-3 shrink-0">Repeats: {repeats}</div>
        </div>

        <div className="grid gap-3">
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
