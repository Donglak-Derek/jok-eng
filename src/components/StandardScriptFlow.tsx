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
  


  const handleStartOver = () => {
    setCurrentIndex(0);
  };

  const currentSentence = script.sentences[currentIndex];
  // Calculate progress percent (0 to 100)
  // When at completion (currentIndex === total), it should be 100%






  return (
    <div className="min-h-dvh flex flex-col relative overflow-hidden bg-background">
      
      <div className="flex-1 max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6 w-full">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-3 md:py-4 bg-white flex items-center gap-3 border-b-2 border-black shadow-sm mb-4">
             <Link href={`/category/${script.categorySlug}`} className="text-xl text-black font-black hover:scale-110 transition-transform">←</Link>
             <div className="flex-1">
                 <h1 className="text-xl md:text-3xl font-black text-black leading-none">
                   {script.title}
                 </h1>
                 <p className="text-xs md:text-sm text-gray-600 font-bold line-clamp-1">{script.context || script.cleanedEnglish}</p>
             </div>
             
             {/* Simple Repeats Badges */}
             <div className="flex items-center gap-2">
                 <div className="px-3 py-1 bg-black text-white text-xs font-bold rounded-full border-2 border-black transform rotate-2">
                     {repeats} 🔄
                 </div>
                 {/* <div className="w-12 text-right font-black text-black">
                     {currentIndex}/{total}
                 </div> */}
             </div>
             
             {/* Progress Bar absolute bottom */}
             <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-100">
                <div 
                    className="h-full bg-primary border-r-2 border-black transition-all duration-300" 
                    style={{ width: `${(currentIndex / total) * 100}%` }} 
                />
             </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col justify-center min-h-[400px]">
             <AnimatePresence mode="wait">
                 {!isCompletion ? (
                     <motion.div
                         key={currentIndex} 
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         exit={{ opacity: 0, x: -20 }}
                         transition={{ duration: 0.2 }}
                         className="w-full"
                     >
                         <SentenceCard 
                            sentence={currentSentence} 
                            index={currentIndex}
                            heard={heardSet.has(currentIndex)}
                            onHeard={() => {
                                setHeardSet(prev => {
                                    const next = new Set(prev);
                                    next.add(currentIndex);
                                    return next;
                                });
                            }}
                         />
                     </motion.div>
                 ) : (
                     <motion.div
                         key="completion"
                         initial={{ opacity: 0, scale: 0.9 }}
                         animate={{ opacity: 1, scale: 1 }}
                         className="w-full p-8 rounded-3xl border-4 border-black bg-white hard-shadow text-center flex flex-col gap-6 items-center"
                     >
                         <Confetti />
                         <div className="text-6xl animate-bounce">🎉</div>
                         <div>
                             <h2 className="text-3xl font-black text-black mb-2">Training Complete!</h2>
                             <p className="text-gray-600 font-medium">You&apos;ve drilled this scenario {repeats + 1} times.</p>
                         </div>
                         <div className="flex flex-col w-full gap-3">
                              <Button onClick={handleFinishTraining} className="w-full py-4 text-xl font-black rounded-2xl">
                                  Complete & Repeat
                              </Button>
                              <Link href={`/category/${script.categorySlug}`} className="w-full flex justify-center">
                                  <button className="py-2 px-4 text-sm font-bold text-gray-400 hover:text-black transition-colors">
                                     Back to Menu
                                  </button>
                              </Link>
                         </div>
                     </motion.div>
                 )}
             </AnimatePresence>
        </div>
      {/* Bottom Action Bar */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-20">
        <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto flex items-center gap-4">
           {/* Start Over Button */}
           <Button 
             variant="ghost"
             onClick={handleStartOver}
             className="text-black font-bold opacity-50 hover:opacity-100"
           >
             ↻ <span className="hidden md:inline">Restart</span>
           </Button>
           
           <div className="flex-1 flex items-center justify-end gap-3">
             {/* Previous Button */}
             {!isCompletion && (
             <Button
                variant="ghost"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`flex-1 md:flex-none border-2 transition-all font-bold ${currentIndex === 0 ? 'border-transparent text-gray-300' : 'border-black text-black bg-white'}`}
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
               className="flex-1 md:flex-none md:min-w-[120px] font-bold"
             >
               Next →
             </Button>
             )}
           </div>
        </div>
      </div>
      </div>
    </div>
  );
}
