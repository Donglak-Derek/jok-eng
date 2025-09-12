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
      <div className="text-sm mb-1">Progress: {completed}/{total} ({pct}%)</div>
      <div className="h-2 bg-black/10 dark:bg-white/15 rounded">
        <div className="h-2 bg-foreground rounded" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
