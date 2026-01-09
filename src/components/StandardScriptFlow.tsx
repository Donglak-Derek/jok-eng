"use client";

import Link from "next/link";
import Image from "next/image";
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
import { ChevronLeft, ChevronRight, PartyPopper, FileText } from "lucide-react";
import StandardFullView from "./StandardFullView";
import CulturalNoteCard from "@/components/CulturalNoteCard";
import QuizCard from "@/components/QuizCard";

type Props = { 
  script: Script;
};

export default function StandardScriptFlow({ script }: Props) {
  const router = useRouter();
  const { user } = useAuth();
  
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
  const repeatsKey = `jokeng:repeats:${script.id}`;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"flow" | "full">("flow");
  const [isGlobalRevealed, setIsGlobalRevealed] = useState(false); // Default hidden

  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(false); // Default off
  const toggleAutoPlay = () => setIsAutoPlayEnabled(prev => !prev);

  // Toggle for the whole deck
  const toggleGlobalReveal = () => setIsGlobalRevealed(prev => !prev);
  const [heardSet, setHeardSet] = useState<Set<number>>(new Set());
  const [repeats, setRepeats] = useState<number>(0);

  // ... (existing code)


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

  // Load repeats counter
  useEffect(() => {
    const v = localStorage.getItem(repeatsKey);
    setRepeats(v ? Number(v) || 0 : 0);
  }, [repeatsKey]);

  const isCompletion = currentIndex >= totalSteps;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    // Mark current sentence as heard if we are in sentence range
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

  // Render content based on current index
  let content = null;
  let showControls = true;

  if (isCompletion) {
      showControls = false;
      content = (
         <motion.div
             key="completion"
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="w-full py-16 text-center flex flex-col items-center"
         >
             <Confetti />
             <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                <PartyPopper className="w-10 h-10 text-primary" />
             </div>
             <h2 className="text-3xl font-bold mb-2">Training Complete</h2>
             <p className="text-muted-foreground text-lg mb-8">You&apos;ve drilled this scenario {repeats + 1} times.</p>
             
             <div className="flex flex-col w-full max-w-xs gap-3">
                  <Button onClick={handleFinishTraining} className="w-full h-12 text-base font-medium rounded-md">
                      Finish & Save
                  </Button>
                  <Link href={`/category/${script.categorySlug}`} className="w-full">
                      <Button variant="ghost" className="w-full h-12 text-muted-foreground hover:text-foreground">
                         Back to Menu
                      </Button>
                  </Link>
             </div>
         </motion.div>
      );
  } else if (currentIndex === culturalNoteIndex && script.culturalNote) {
      showControls = false; // Hide bottom controls, card has its own button
      content = (
          <CulturalNoteCard 
             title={script.culturalNote.title}
             content={script.culturalNote.content}
             onNext={handleNext}
          />
      );
  } else if (currentIndex === quizIndex && script.quizItems) {
      showControls = false; // Quiz has its own flow
      content = (
          <QuizCard 
             items={script.quizItems}
             onFinish={handleNext}
          />
      );
  } else {
      // Sentence Card
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
                          {repeats} runs
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
       {/* Progress Line - Locked to bottom of sticky header */}
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
