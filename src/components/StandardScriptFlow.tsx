"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Script, UserScript } from "@/types";
import SentenceCard from "@/components/SentenceCard";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "@/components/Confetti";
import { Button } from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ChevronLeft, ChevronRight, PartyPopper, FileText } from "lucide-react";
import StandardFullView from "./StandardFullView";
import CulturalNoteCard from "@/components/CulturalNoteCard";
import QuizCard from "@/components/QuizCard";
import { useProgress } from "@/context/ProgressContext";

type Props = { 
  script: Script;
};

export default function StandardScriptFlow({ script }: Props) {
  const router = useRouter();
  const { user } = useAuth();
  const { getRepeats } = useProgress(); 
  
  // Script structure logic
  const sentences = script.sentences || [];
  const sentencesCount = sentences.length;
  const hasCulturalNote = !!script.culturalNote;
  const hasQuiz = !!script.quizItems && script.quizItems.length > 0;
  
  // Step indices
  const culturalNoteIndex = hasCulturalNote ? sentencesCount : -1;
  const quizIndex = hasQuiz ? (sentencesCount + (hasCulturalNote ? 1 : 0)) : -1;
  const totalSteps = sentencesCount + (hasCulturalNote ? 1 : 0) + (hasQuiz ? 1 : 0);

  const storageKey = `jokeng:progress:${script.id}`;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"flow" | "full">("flow");
  const [isGlobalRevealed, setIsGlobalRevealed] = useState(false);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);
  
  const toggleAutoPlay = () => setIsAutoPlayEnabled(prev => !prev);
  const toggleGlobalReveal = () => setIsGlobalRevealed(prev => !prev);
  const [heardSet, setHeardSet] = useState<Set<number>>(new Set());
  
  const hasSavedRef = useState(false);
  
  // Connect to real data
  const databaseRepeats = getRepeats(script.id); 

  // Load progress
  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        const arr: number[] = JSON.parse(raw);
        setHeardSet(new Set(arr));
      } catch {
        setHeardSet(new Set());
      }
    }
  }, [storageKey]);

  // Persist progress
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(Array.from(heardSet.values())));
  }, [heardSet, storageKey]);

  const isCompletion = currentIndex >= totalSteps;
  const isOwner = user && 'userId' in script && (script as UserScript).userId === user.uid;

  const saveProgress = async () => {
      if (user) {
        try {
            const { doc, setDoc, serverTimestamp, increment } = await import("firebase/firestore");
            const progressRef = doc(db, "users", user.uid, "progress", script.id);
            
            await setDoc(progressRef, {
                repeats: increment(1),
                lastPracticedAt: serverTimestamp()
            }, { merge: true });

            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                totalPractices: increment(1)
            });
            
            if (isOwner) {
                 await updateDoc(doc(db, "users", user.uid, "scenarios", script.id), {
                   repeats: increment(1)
                 }).catch(e => console.error("Legacy sync error", e));
            }

        } catch (practiceErr) {
            console.error("Failed to update user progress stats", practiceErr);
        }
      } else {
         const key = `jokeng:repeats:${script.id}`;
         const current = parseInt(localStorage.getItem(key) || "0");
         localStorage.setItem(key, String(current + 1));
      }
      
      setHeardSet(new Set());
      localStorage.setItem(storageKey, JSON.stringify([]));
  };

  // Auto-save progress on completion
  useEffect(() => {
    if (isCompletion && !hasSavedRef[0]) {
      saveProgress();
      hasSavedRef[1](true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompletion]);


  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < sentencesCount) {
        setHeardSet((prev) => {
            const next = new Set(prev);
            next.add(currentIndex);
            return next;
        });
    }

    if (currentIndex < totalSteps) {
      setCurrentIndex((prev) => prev + 1);
    }
  };
  
  const handlePracticeAgain = async () => {
      hasSavedRef[1](false); 
      setCurrentIndex(0);
  };

  const handleBackToMenu = async () => {
      router.push(`/category/${script.categorySlug}`);
  };
  
  const handleStartOver = () => {
    setCurrentIndex(0);
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

        switch (e.code) {
            case "ArrowRight":
                e.preventDefault();
                handleNext();
                break;
            case "ArrowLeft":
                e.preventDefault();
                handlePrev();
                break;
            case "ArrowUp":
            case "ArrowDown":
                e.preventDefault();
                toggleGlobalReveal();
                break;
            case "Space":
                e.preventDefault();
                const playBtn = document.querySelector('button[data-action="play-sentence"]');
                if (playBtn instanceof HTMLElement) playBtn.click();
                break;
        }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isGlobalRevealed]); 

  // Render content based on current index
  let content = null;
  let showControls = true;

  if (isCompletion) {
      showControls = false;
      
      const currentReps = databaseRepeats; 
      let encouragement = "Good start!";
      if (currentReps >= 3) encouragement = "Muscle memory building...";
      if (currentReps >= 5) encouragement = "You're mastering this!";
      if (currentReps >= 10) encouragement = "Unstoppable!";

      content = (
         <motion.div
             key="completion"
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="w-full py-10 md:py-16 text-center flex flex-col items-center"
         >
             <Confetti />
             
             <div className="w-24 h-24 bg-gradient-to-br from-yellow-200 to-amber-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(251,191,36,0.4)] animate-in zoom-in-50 duration-500">
                <PartyPopper className="w-12 h-12 text-white drop-shadow-md" />
             </div>
             
             <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Training Complete!</h2>
             <p className="text-muted-foreground text-lg mb-8">{encouragement}</p>
             
             <div className="bg-secondary/30 border border-secondary p-6 rounded-2xl mb-8 flex flex-col items-center min-w-[200px]">
                 <span className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-1">Total Reps</span>
                 <div className="text-5xl font-black text-primary tabular-nums">
                    {currentReps}
                 </div>
             </div>
             
             <div className="flex flex-col w-full max-w-xs gap-3">
                   <Button 
                       onClick={handlePracticeAgain} 
                       className="w-full h-14 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                       variant="primary"
                   >
                       Practice Again (Rep {currentReps + 1})
                   </Button>
                   <Button 
                        variant="ghost" 
                        onClick={handleBackToMenu}
                        className="w-full h-12 text-muted-foreground hover:text-foreground"
                   >
                        Back to Menu
                   </Button>
              </div>
         </motion.div>
      );
  } else if (currentIndex === culturalNoteIndex && script.culturalNote) {
      showControls = false; 
      content = (
          <CulturalNoteCard 
             title={script.culturalNote.title}
             content={script.culturalNote.content}
             onNext={handleNext}
          />
      );
  } else if (currentIndex === quizIndex && script.quizItems) {
      showControls = false; 
      content = (
          <QuizCard 
             items={script.quizItems}
             onFinish={handleNext}
          />
      );
  } else {
      const currentSentence = sentences[currentIndex];
      content = (
          <motion.div
             key={currentIndex} 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             transition={{ duration: 0.2 }}
             className="w-full"
         >
             <SentenceCard 
                sentence={currentSentence} 
                index={currentIndex}
                heard={heardSet.has(currentIndex)}
                mode={script.mode || "standard"} 
                isGlobalRevealed={isGlobalRevealed}
                onToggleGlobalReveal={toggleGlobalReveal}
                isAutoPlayEnabled={isAutoPlayEnabled}
                onToggleAutoPlay={toggleAutoPlay}
                onHeard={() => {
                    setHeardSet(prev => {
                        const next = new Set(prev);
                        next.add(currentIndex);
                        return next;
                    });
                }}
             />
         </motion.div>
      );
  }

  if (viewMode === "full") {
      return <StandardFullView script={script} onBack={() => setViewMode("flow")} />;
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-background text-foreground">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border">
         <div className="max-w-3xl mx-auto px-4 py-3 md:px-6 md:py-4 flex flex-col gap-4">
             <div className="flex items-center gap-4">
                 <Link href={`/category/${script.categorySlug}`} className="text-muted-foreground hover:text-foreground transition-colors">
                     <ChevronLeft className="w-6 h-6" />
                 </Link>
                 <div className="flex-1 min-w-0">
                     <h1 className="text-xl md:text-2xl font-bold tracking-tight truncate">
                       {script.title}
                     </h1>
                 </div>
                  {/* Optional Scenario Image */}
                  {script.imageUrl && (
                      <div className="w-12 h-12 relative rounded-md overflow-hidden border border-border hidden md:block">
                          <Image 
                              src={script.imageUrl} 
                              alt={script.title}
                              fill
                              className="object-cover"
                          />
                      </div>
                  )}

                  {/* Difficulty Badge */}
                   {script.difficulty && (
                      <div className="bg-secondary/50 px-3 py-1 rounded-full text-xs font-bold border border-secondary text-secondary-foreground hidden md:block">
                          {script.difficulty}
                      </div>
                   )}
                 
                 <div className="flex items-center gap-3">
                     {/* Repeats Badge - Compact */}
                      <div className="bg-secondary px-3 py-1 rounded-full text-xs font-medium text-secondary-foreground hidden md:block">
                          {databaseRepeats} runs
                      </div>

                     {/* Full View Toggle */}
                      <button 
                        onClick={() => setViewMode("full")}
                        className="p-2 -mr-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors"
                        title="View Full Content"
                        aria-label="View Full Content"
                      >
                          <FileText className="w-6 h-6" />
                      </button>
                 </div>
            </div>

          </div>
       {/* Progress Line */}
       <div className="w-full h-1 bg-secondary">
           <div 
               className="h-full bg-primary transition-all duration-300 ease-out" 
               style={{ width: `${(currentIndex / totalSteps) * 100}%` }} 
           />
       </div>
    </header>

      <div className="flex-1 max-w-3xl mx-auto px-4 py-8 md:px-6 md:py-12 flex flex-col w-full">

        {/* Content Area */}
        <div className="flex-1 flex flex-col justify-center min-h-[400px]">
             <AnimatePresence mode="wait">
                 {content}
             </AnimatePresence>
        </div>

        {/* Bottom Action Bar */}
        {showControls && (
            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                <Button 
                    variant="ghost"
                    onClick={handleStartOver}
                    className="text-muted-foreground hover:text-foreground text-sm"
                >
                    Restart
                </Button>
                
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="text-base font-medium"
                        leftIcon={<ChevronLeft className="w-4 h-4" />}
                    >
                        Prev
                    </Button>

                    <Button
                        variant="primary"
                        onClick={handleNext}
                        className="px-6"
                        rightIcon={<ChevronRight className="w-4 h-4" />}
                    >
                        Next
                    </Button>
                </div>
            </div>
        )}
        
      </div>
    </div>
  );
}
