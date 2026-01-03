"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Script } from "@/types";
import SentenceCard from "@/components/SentenceCard";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "@/components/Confetti";
import { Button } from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserScript } from "@/types";

type Props = { 
  script: Script;
};

export default function StandardScriptFlow({ script }: Props) {
  const router = useRouter();
  const { user } = useAuth();
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

  const isOwner = user && 'userId' in script && (script as UserScript).userId === user.uid;

  const handleFinishTraining = async () => {
      // Increment Repeats
      const nextRepeats = repeats + 1;
      setRepeats(nextRepeats);
      localStorage.setItem(repeatsKey, String(nextRepeats));
      
      // Save for user script (Firestore persistence)
      if (isOwner && user) {
         try {
           await updateDoc(doc(db, "users", user.uid, "scenarios", script.id), {
             repeats: nextRepeats
           });
         } catch(e) { 
           console.error("Failed to sync repeats", e); 
         }
      }

      // Increment Global 'Rehearsals Done' (totalPractices) for the User
      if (user) {
        try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                totalPractices: increment(1)
            });
        } catch (practiceErr) {
            console.error("Failed to update user rehearsals stats", practiceErr);
        }
      }
      
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
    <div className="min-h-dvh flex flex-col relative overflow-hidden bg-background">
      
      <div className="flex-1 max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 flex flex-col gap-5 md:gap-6 w-full relative z-10">
        {/* Header - Notebook Style */}
        <header className="sticky top-0 z-20 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-3 md:py-4 bg-white/90 backdrop-blur-md flex items-center gap-3 border-b-2 border-black/5 shadow-sm relative">
          <Link href={`/category/${script.categorySlug}`} className="text-lg md:text-xl leading-none text-black hover:text-primary transition-colors font-bold">←</Link>
          <div className="flex-1 min-w-0">
            <h1 className="font-sans font-black text-2xl md:text-4xl tracking-tight text-black truncate leading-none">
              {script.title}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <p className="font-hand text-sm md:text-base text-gray-500 line-clamp-1 -rotate-1">{script.cleanedEnglish}</p>
            </div>
          </div>

          {/* Highlighter Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-100">
             <div 
               className="h-full bg-primary transition-all duration-300 ease-out border-r-2 border-white"
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
                 initial={{ opacity: 0, x: 20, rotate: 2 }}
                 animate={{ opacity: 1, x: 0, rotate: 0 }}
                 exit={{ opacity: 0, x: -20, rotate: -2 }}
                 transition={{ duration: 0.3, type: "spring" }}
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
                 initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                 animate={{ opacity: 1, scale: 1, rotate: 0 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                 transition={{ duration: 0.4, type: "spring" }}
                 className="w-full"
               >
                 <div className="relative rounded-xl border-2 border-black bg-white p-6 md:p-10 flex flex-col gap-6 md:gap-8 hard-shadow text-center items-center transform rotate-1">
                     <div className="absolute -top-6 -right-6 text-6xl md:text-7xl animate-bounce">🏆</div>
                     
                     <div className="flex flex-col gap-2">
                       <Confetti />
                       <h2 className="font-sans font-black text-4xl md:text-5xl text-black">
                         Nailed It!
                       </h2>
                       <p className="font-hand text-xl text-gray-500 rotate-1">You finished this scenario.</p>
                     </div>

                     <div className="w-full flex flex-col gap-3 mt-4">
                        <Button
                          variant="primary"
                          size="xl"
                          onClick={handleRepeat}
                          className="w-full text-xl border-2 border-black hard-shadow font-bold hover:-translate-y-1 hover:shadow-lg transition-transform active:translate-y-0 active:shadow-none"
                        >
                          Repeat Training
                        </Button>

                        <Button 
                          variant="outline"
                          size="md"
                          onClick={handleFinishTraining}
                          className="w-full border-2 border-gray-200 text-gray-500 hover:text-black hover:border-black font-bold"
                        >
                          Finish & Exit
                        </Button>
                     </div>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
      
      {/* Bottom Action Bar */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t-2 border-black/5 z-20">
        <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto flex items-center gap-4">
           {/* Start Over Button */}
           <Button 
             variant="ghost"
             size="sm"
             onClick={handleStartOver}
             className="text-gray-400 hover:text-black font-bold"
           >
             ↻ <span className="hidden md:inline">Restart</span>
           </Button>
           
           <div className="flex-1 flex items-center gap-3">
             {/* Previous Button */}
             {!isCompletion && (
             <Button
               variant="outline"
               size="md"
               onClick={handlePrev}
               disabled={currentIndex === 0}
               className="flex-1 border-2 border-gray-200 text-gray-400 hover:text-black hover:border-black font-bold"
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
               className="flex-1 border-2 border-black hard-shadow font-black text-lg hover:-translate-y-0.5 active:translate-y-0 shadow-none"
             >
               Next →
             </Button>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}
