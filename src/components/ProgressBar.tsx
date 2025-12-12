"use client";

import { useMemo } from "react";

type Props = {
  total: number;
  completed: number;
};

export default function ProgressBar({ total, completed }: Props) {
  const pct = useMemo(() => (total === 0 ? 0 : Math.round((completed / total) * 100)), [total, completed]);
  return (
    <div className="w-full">
      <div className="text-sm md:text-base mb-1 text-muted">Progress: {completed}/{total} ({pct}%)</div>
      <div className="h-2.5 md:h-3 bg-card/80 border border-secondary/25 rounded-full shadow-[inset_0_0_12px_rgba(0,0,0,0.35)]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-tertiary via-secondary to-primary shadow-[0_0_25px_rgba(168,85,247,0.45)] transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
