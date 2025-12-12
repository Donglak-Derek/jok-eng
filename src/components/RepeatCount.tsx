"use client";

import { useEffect, useState } from "react";

type Props = { id: string; className?: string };

const key = (id: string) => `jokeng:repeats:${id}`;

export default function RepeatCount({ id, className = "" }: Props) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const read = () => {
      try {
        const v = localStorage.getItem(key(id));
        setCount(v ? Number(v) || 0 : 0);
      } catch {
        setCount(0);
      }
    };
    read();
    const onStorage = (e: StorageEvent) => {
      if (!e.key || !e.key.startsWith("jokeng:repeats:")) return;
      if (e.key === key(id)) read();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [id]);

  return <span className={"text-xs text-muted " + className}>Repeats: {count}</span>;
}
