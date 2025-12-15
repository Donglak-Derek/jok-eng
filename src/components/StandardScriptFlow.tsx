"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Script } from "@/types";
import ProgressBar from "@/components/ProgressBar";
import SentenceCard from "@/components/SentenceCard";

type Props = { script: Script };

export default function StandardScriptFlow({ script }: Props) {
  const router = useRouter();
  const total = script.sentences.length;
  const storageKey = `jokeng:progress:${script.id}`;
  const repeatsKey = `jokeng:repeats:${script.id}`;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [heardSet, setHeardSet] = useState<Set<number>>(new Set());
  const [repeats, setRepeats] = useState<number>(0);

  // Load progress
  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        const arr: number[] = JSON.parse(raw);
        // If we have saved progress, restore it
        const set = new Set(arr);
        setHeardSet(set);
        
        // Optional: Jump to the first uncompleted card?
        // For now, let's start at 0 unless we want to be smart. 
        // User didn't explicitly ask for resume logic, but it's good UX.
        // Let's stick to 0 for simplicity or maybe finding the first missing index.
        // const firstUnheard = script.sentences.findIndex((_, i) => !set.has(i));
        // if (firstUnheard !== -1) setCurrentIndex(firstUnheard);
      } catch {
        setHeardSet(new Set());
      }
    }
  }, [storageKey]); // removed script.sentences dependency to avoid loop if it was unstable, though it should be stable.

  // Persist progress
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(Array.from(heardSet.values())));
  }, [heardSet, storageKey]);

  // Load repeats counter
  useEffect(() => {
    const v = localStorage.getItem(repeatsKey);
    setRepeats(v ? Number(v) || 0 : 0);
  }, [repeatsKey]);

  // Handle completion check logic (optional now as we drive it manually via Next button on last card)
  // We can update the repeats count when the user finishes the last card or clicks "Finish".

  const handleHeard = (index: number) => {
    setHeardSet((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    // Mark current card as heard
    setHeardSet((prev) => {
      const next = new Set(prev);
      next.add(currentIndex);
      return next;
    });

    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Last card action: "Next button change to previous page which is list of scenarios"
      
      // If all cards are heard (or just by finishing the flow), increment repeats? 
      // User didn't specify strict conditions for repeats, but let's assume finishing the deck counts.
      if (heardSet.size === total || currentIndex === total - 1) {
         const nextRepeats = repeats + 1;
         setRepeats(nextRepeats);
         localStorage.setItem(repeatsKey, String(nextRepeats));
         localStorage.setItem(storageKey, JSON.stringify([])); // Reset progress
      }
      
      router.push(`/category/${script.categorySlug}`);
    }
  };
  
  const handleStartOver = () => {
    setCurrentIndex(0);
  };

  const currentSentence = script.sentences[currentIndex];
  const isLast = currentIndex === total - 1;

  return (
    <div className="min-h-dvh text-foreground flex flex-col relative overflow-hidden">
      {/* Stage Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />
      
      <div className="flex-1 max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 flex flex-col gap-5 md:gap-6 w-full relative z-10">
        <header className="sticky top-0 z-20 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-3 md:py-4 backdrop-blur-xl bg-background/60 flex items-center gap-3 border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <Link href={`/category/${script.categorySlug}`} className="text-lg md:text-xl leading-none text-primary drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]">←</Link>
          <div className="flex-1 min-w-0">
            <h1 className="headline text-2xl md:text-3xl lg:text-4xl tracking-[0.05em] bg-gradient-to-r from-tertiary via-secondary to-primary text-transparent bg-clip-text truncate">
              {script.title}
            </h1>
            <div className="flex items-center gap-3">
              <p className="text-xs md:text-sm text-muted line-clamp-1">{script.cleanedEnglish}</p>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-between px-1">
          <div className="flex-1 mr-4">
             <ProgressBar total={total} completed={currentIndex + 1} />
          </div>
          <div className="text-xs md:text-sm text-muted ml-3 shrink-0">Repeats: {repeats}</div>
        </div>

        <div className="flex-1 flex flex-col justify-center min-h-[400px]">
           {currentSentence && (
            <SentenceCard
              key={currentSentence.id}
              sentence={currentSentence}
              index={currentIndex}
              heard={heardSet.has(currentIndex)}
              onHeard={() => {}} // No-op, handled by Next button now
            />
           )}
        </div>
      </div>
      
      {/* Bottom Action Bar */}
      <div className="sticky bottom-0 left-0 right-0 p-4 backdrop-blur-md bg-background/80 border-t border-secondary/30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20">
        <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto flex items-center gap-4">
           {/* Start Over Button (Left aligned or secondary) */}
           <button 
             onClick={handleStartOver}
             className="px-4 py-3 rounded-xl border border-secondary/30 text-muted bg-card/50 hover:bg-secondary/10 font-bold text-sm transition-colors"
           >
             ↻ <span className="hidden md:inline">Start Over</span>
           </button>
           
           <div className="flex-1 flex items-center gap-3">
             {/* Previous Button */}
             <button
               onClick={handlePrev}
               disabled={currentIndex === 0}
               className={`flex-1 px-3 py-3 rounded-xl border-2 font-bold text-xs md:text-sm tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(0,0,0,0)] ${
                 currentIndex === 0 
                   ? "border-secondary/20 text-muted/30 cursor-not-allowed" 
                   : "border-secondary text-secondary hover:bg-secondary/10 hover:shadow-[0_0_20px_var(--color-secondary)] active:scale-[0.98]"
               }`}
             >
               Prev
             </button>

             {/* Next / Finish Button (Primary) */}
             <button
               onClick={handleNext}
               className="flex-1 px-3 py-3 rounded-xl border-2 border-primary bg-primary/10 text-primary font-bold text-xs md:text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all hover:bg-primary/20 hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] active:scale-[0.98]"
             >
               {isLast ? "Back to List" : "Next"}
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
