"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Script } from "@/types";
import SentenceCard from "@/components/SentenceCard";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "@/components/Confetti";
import { Button } from "@/components/Button";

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
      } catch {
        setHeardSet(new Set());
      }
    }
  }, [storageKey]);

  // Persist progress
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(Array.from(heardSet.values())));
  }, [heardSet, storageKey]);

  // Load repeats counter
  useEffect(() => {
    const v = localStorage.getItem(repeatsKey);
    setRepeats(v ? Number(v) || 0 : 0);
  }, [repeatsKey]);

  const isCompletion = currentIndex === total;



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

    if (currentIndex < total) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleFinishTraining = () => {
      // Increment Repeats
      const nextRepeats = repeats + 1;
      setRepeats(nextRepeats);
      localStorage.setItem(repeatsKey, String(nextRepeats));
      
      // Clear progress
      setHeardSet(new Set());
      localStorage.setItem(storageKey, JSON.stringify([]));

      // Go to category page
      router.push(`/category/${script.categorySlug}`);
  };
  
  const handleRepeat = () => {
    setCurrentIndex(0);
  };

  const handleStartOver = () => {
    setCurrentIndex(0);
  };

  const currentSentence = script.sentences[currentIndex];
  // Calculate progress percent (0 to 100)
  // When at completion (currentIndex === total), it should be 100%
  const progressPercent = (currentIndex / total) * 100;

  return (
    <div className="min-h-dvh text-foreground flex flex-col relative overflow-hidden">
      {/* Stage Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />
      
      <div className="flex-1 max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 flex flex-col gap-5 md:gap-6 w-full relative z-10">
        {/* Header - Matching StoryFlow */}
        <header className="sticky top-0 z-20 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-3 md:py-4 backdrop-blur-xl bg-background/60 flex items-center gap-3 border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative">
          <Link href={`/category/${script.categorySlug}`} className="text-lg md:text-xl leading-none text-primary drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]">←</Link>
          <div className="flex-1 min-w-0">
            <h1 className="headline text-2xl md:text-5xl lg:text-6xl tracking-[0.05em] bg-gradient-to-r from-tertiary via-secondary to-primary text-transparent bg-clip-text truncate">
              {script.title}
            </h1>
            <div className="flex items-center gap-3">
              <p className="text-xs md:text-sm text-muted line-clamp-1">{script.cleanedEnglish}</p>
            </div>
          </div>
          
          {/* Full Width Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary/20">
             <div 
               className="h-full bg-primary shadow-[0_0_10px_rgba(34,211,238,0.6)] transition-all duration-300 ease-out"
               style={{ width: `${progressPercent}%` }}
             />
          </div>
        </header>

        {/* Card Area */}
        <div className="flex-1 flex flex-col justify-center min-h-[400px]">
           <AnimatePresence mode="wait">
             {!isCompletion ? (
               <motion.div
                 key={currentIndex}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 transition={{ duration: 0.3 }}
                 className="w-full"
               >
                 {currentSentence && (
                  <SentenceCard
                    key={currentSentence.id}
                    sentence={currentSentence}
                    index={currentIndex}
                    heard={heardSet.has(currentIndex)}
                    onHeard={() => {}} // No-op, handled by Next button now
                  />
                 )}
               </motion.div>
             ) : (
               <motion.div
                 key="completion"
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                 transition={{ duration: 0.4 }}
                 className="w-full"
               >
                 <div className="relative rounded-3xl border border-primary/50 p-6 md:p-8 lg:p-10 flex flex-col gap-6 md:gap-8 transition duration-200 bg-card/90 shadow-[0_0_60px_rgba(34,211,238,0.3)] text-center items-center">
                     <div className="text-6xl md:text-7xl animate-bounce mb-2">🎉</div>
                     
                     <div className="flex flex-col gap-2">
                       <Confetti />
                       <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-secondary animate-pulse">
                         Congratulation!
                       </h2>
                       <p className="text-lg text-muted">You finished this scenario.</p>
                     </div>

                     <div className="w-full flex flex-col gap-3 mt-4">
                        <Button
                          variant="primary"
                          size="xl"
                          onClick={handleRepeat}
                          className="w-full text-xl shadow-[0_0_25px_rgba(34,211,238,0.4)]"
                        >
                          Repeat
                        </Button>

                        <Button 
                          variant="outline"
                          size="md"
                          onClick={handleFinishTraining}
                          className="w-full"
                        >
                          Finish
                        </Button>
                     </div>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
      
      {/* Bottom Action Bar */}
      <div className="sticky bottom-0 left-0 right-0 p-4 backdrop-blur-md bg-background/80 border-t border-secondary/30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20">
        <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto flex items-center gap-4">
           {/* Start Over Button */}
           <Button 
             variant="ghost"
             size="sm"
             onClick={handleStartOver}
             className="border border-secondary/30 bg-card/50 text-muted hover:bg-secondary/10"
           >
             ↻ <span className="hidden md:inline">Start Over</span>
           </Button>
           
           <div className="flex-1 flex items-center gap-3">
             {/* Previous Button */}
             {!isCompletion && (
             <Button
               variant="outline"
               size="md"
               onClick={handlePrev}
               disabled={currentIndex === 0}
               className="flex-1 border-secondary text-secondary hover:bg-secondary/10"
             >
               Prev
             </Button>
             )}

             {/* Next Button */}
             {!isCompletion && (
             <Button
               variant="primary"
               size="md"
               onClick={handleNext}
               className="flex-1"
             >
               Next
             </Button>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}
