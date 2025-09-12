"use client";

import { useEffect, useMemo, useState } from "react";
import { scripts } from "@/data/sample";
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
  const [heardSet, setHeardSet] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!storageKey) return;
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        const arr: number[] = JSON.parse(raw);
        setHeardSet(new Set(arr));
      } catch {}
    }
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(Array.from(heardSet.values())));
  }, [heardSet, storageKey]);

  useEffect(() => {
    if (total > 0 && heardSet.size === total && script) {
      // Small delay then go back to category page
      const t = setTimeout(() => {
        window.location.href = `/category/${script.categorySlug}`;
      }, 800);
      return () => clearTimeout(t);
    }
  }, [heardSet.size, total, script]);

  if (!script) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <Link href="/" className="text-sm hover:underline">← Back</Link>
        <div className="mt-4">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto flex flex-col gap-6">
      <Link href={`/category/${script.categorySlug}`} className="text-sm hover:underline">← Back</Link>
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">{script.title}</h1>
        <p className="text-sm text-black/60 dark:text-white/60">{script.cleanedEnglish}</p>
      </header>

      <ProgressBar total={total} completed={heardSet.size} />

      <div className="grid gap-4">
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
  );
}

