"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Script, UserScript } from "@/types";
import ClozeCard from "@/components/ClozeCard"; // Replaces SentenceCard
import ComparisonCard from "@/components/ComparisonCard"; 
import ScriptPlayerShell from "@/components/ScriptPlayerShell";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "@/components/Confetti";
import { Button } from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useDailyProgress } from "@/hooks/useDailyProgress";
import { PartyPopper } from "lucide-react";
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
  // ... (auth/progress hooks unchanged)
  const { markComplete } = useDailyProgress();
  const { getRepeats } = useProgress(); 
  
  // Script structure logic
  const sentences = script.sentences || [];
  const sentencesCount = sentences.length;
  // ... (indices logic unchanged)
  const hasCulturalNote = !!script.culturalNote;
  const hasQuiz = !!script.quizItems && script.quizItems.length > 0;
  
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
  const databaseRepeats = getRepeats(script.id); 

  // ... (useEffect for Progress Loading/Saving unchanged)
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
      // ... (Same save logic as before)
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
      // Save Daily Progress
      markComplete(script.id);
      
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

  // Keyboard Shortcuts (Same as before)
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
                // We might need a better way to target play button, but this works for now
                const playBtn = document.querySelector('button[data-action="play-sentence"]');
                if (playBtn instanceof HTMLElement) playBtn.click();
                break;
        }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isGlobalRevealed]); 

  // Full View handling
  if (viewMode === "full") {
      return <StandardFullView script={script} onBack={() => setViewMode("flow")} />;
  }

  // Determine current content
  let content = null;

  if (isCompletion) {
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
      content = (
          <CulturalNoteCard 
             title={script.culturalNote.title}
             content={script.culturalNote.content}
             onNext={handleNext}
          />
      );
  } else if (currentIndex === quizIndex && script.quizItems) {
      content = (
          <QuizCard 
             items={script.quizItems}
             onFinish={handleNext}
          />
      );
  } else {
      const currentSentence = sentences[currentIndex];
      
      // DISPATCHER LOGIC: Choose the right card
      const isComparison = !!(currentSentence.badResponse && currentSentence.goodResponse);
      const CardComponent = isComparison ? ComparisonCard : ClozeCard;

      content = (
          <motion.div
             key={currentIndex} 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             transition={{ duration: 0.2 }}
             className="w-full h-full"
         >
             <CardComponent
                sentence={currentSentence} 
                index={currentIndex}
                heard={heardSet.has(currentIndex)}
                // ClozeCard specific props (ComparisonCard ignores mode, but ClozeCard needs it)
                mode={script.mode || "standard"} 
                isGlobalRevealed={isGlobalRevealed}
                // Shared Props
                isAutoPlayEnabled={isAutoPlayEnabled}
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

  // --- RENDER SHELL ---
  return (
    <ScriptPlayerShell
        title={script.title}
        categorySlug={script.categorySlug}
        imageUrl={script.imageUrl}
        currentStep={currentIndex}
        totalSteps={totalSteps}
        hasFinished={isCompletion || currentIndex === culturalNoteIndex || currentIndex === quizIndex}
        
        // Controls
        isAutoPlayEnabled={isAutoPlayEnabled}
        onToggleAutoPlay={toggleAutoPlay}
        isGlobalRevealed={isGlobalRevealed}
        onToggleGlobalReveal={toggleGlobalReveal}
        
        // Navigation
        onNext={handleNext}
        onPrev={handlePrev}
        onRestart={handlePracticeAgain}
        onViewFull={() => setViewMode("full")}
        onBackToMenu={handleBackToMenu}
    >
        <AnimatePresence mode="wait">
             {content}
        </AnimatePresence>
    </ScriptPlayerShell>
  );
}
