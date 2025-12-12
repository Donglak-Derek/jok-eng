"use client";

import Link from "next/link";
import type { Script } from "@/types";
import StoryFlow from "@/components/StoryFlow";
import StandardScriptFlow from "@/components/StandardScriptFlow";

type Props = { script: Script };

export default function ScriptClient({ script }: Props) {
  if (script.type === "story_flow") {
    return (
      <div className="min-h-dvh text-foreground">
        <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 flex flex-col gap-5 md:gap-6">
          <header className="sticky top-0 z-10 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-3 md:py-4 backdrop-blur bg-background/70 flex items-center gap-3 border-b border-secondary/30 shadow-[0_10px_40px_rgba(34,19,74,0.7)]">
            <Link
              href={`/category/${script.categorySlug}`}
              className="text-lg md:text-xl leading-none text-primary drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]"
            >
              ←
            </Link>
            <div>
              <h1 className="headline text-2xl md:text-3xl lg:text-4xl tracking-[0.05em] bg-gradient-to-r from-tertiary via-secondary to-primary text-transparent bg-clip-text">
                {script.title}
              </h1>
            </div>
          </header>
          <StoryFlow script={script} />
          <div className="pt-2">
            <Link
              href={`/category/${script.categorySlug}`}
              className="inline-flex w-full items-center justify-center px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-secondary/40 bg-card/80 text-sm md:text-base active:scale-[0.99] transition shadow-[0_10px_40px_rgba(124,58,237,0.18)] hover:border-tertiary/50"
            >
               ← Back to {script.categoryName}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <StandardScriptFlow script={script} />;
}
