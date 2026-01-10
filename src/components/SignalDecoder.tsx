"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
// Image removed
import { useRouter } from "next/navigation";
import type { Script, UserScript } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "@/components/Confetti";
import { Button } from "@/components/Button";
import { ChevronLeft, Volume2, ArrowRight, RotateCcw, CheckCircle2, FileText, PlayCircle, PauseCircle } from "lucide-react";
import SignalFullView from "./SignalFullView";
import SignalSummaryCard from "@/components/SignalSummaryCard";
import ContextConversation from "@/components/ContextConversation";
import QuizCard from "@/components/QuizCard";
import { useProgress } from "@/context/ProgressContext";
import { useAuth } from "@/context/AuthContext";
import { doc, updateDoc, setDoc, increment, serverTimestamp } from "firebase/firestore"; // Import directly for use
import { db } from "@/lib/firebase";
import { useDailyProgress } from "@/hooks/useDailyProgress";

type Props = {
  script: Script;
};

export default function SignalDecoder({ script }: Props) {
  const router = useRouter();
  const { user } = useAuth();
  const { getRepeats } = useProgress();
  const databaseRepeats = getRepeats(script.id);
  const { markComplete } = useDailyProgress();

  const items = script.decoderItems || [];
  const itemsCount = items.length;
  
  // Script Features
  const hasQuiz = !!script.quizItems && script.quizItems.length > 0;

  /* 
    Flow Logic:
    1. Items (0 to itemsCount-1)
       For each item, substeps: [Guess -> Reveal -> Context]
    2. Summary (itemsCount)
    3. Quiz (itemsCount + 1, if exists)
    4. Completion (Last Index)
  */
  
  const summaryIndex = itemsCount;
  const quizIndex = hasQuiz ? itemsCount + 1 : -1;
  // If quiz exists, completion is quizIndex + 1, else summaryIndex + 1
  const completionIndex = hasQuiz ? quizIndex + 1 : summaryIndex + 1;
  const totalMainSteps = completionIndex + 1; 

  // Global State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"flow" | "full">("flow");
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);

  // Item Sub-state
  const [stepPhase, setStepPhase] = useState<"guess" | "reveal" | "context">("guess");
  const [userGuess, setUserGuess] = useState<number | null>(null); // 0 (Safe) to 100 (Danger)
  
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const hasAutoPlayedRef = useRef(false);
  const hasSavedRef = useRef(false);

  // Access current item safely
  const currentItem = currentIndex < itemsCount ? items[currentIndex] : null; // null if in summary/quiz/completion

  // Helper to normalize danger levels
  const getDangerValue = (level: string): number => {
    const l = level.toLowerCase();
    if (l.includes("critical") || l.includes("run") || l.includes("red flag") || l.includes("high")) return 90;
    if (l.includes("medium") || l.includes("caution") || l.includes("flake") || l.includes("yellow")) return 50;
    return 15; // Low/Safe
  };

  const speak = useCallback(async (text: string) => {
      if (typeof window === "undefined") return;
      if (speaking || loading) return;
  
      setLoading(true);
      try {
        const params = new URLSearchParams({
          text: text,
          voice: "en-US-AriaNeural",
        });
        
        const audio = new Audio(`/api/tts?${params}`);
        
        await new Promise<void>((resolve, reject) => {
          audio.oncanplay = () => {
             setLoading(false);
             setSpeaking(true);
          };
          audio.onended = () => resolve();
          audio.onerror = (e) => reject(e);
          audio.play().catch(reject);
        });
      } catch (error) {
         console.warn("TTS failed", error);
         setLoading(false);
         setSpeaking(true);
         const u = new SpeechSynthesisUtterance(text);
         u.lang = "en-US";
         u.onend = () => setSpeaking(false);
         window.speechSynthesis.speak(u);
      } finally {
        setSpeaking(false);
        setLoading(false);
      }
    }, [speaking, loading]);


  // Auto-play effect
  useEffect(() => {
    if (isAutoPlayEnabled && currentItem && stepPhase === "guess" && !hasAutoPlayedRef.current) {
        hasAutoPlayedRef.current = true;
        // Small delay to allow UI to settle
        const timer = setTimeout(() => {
            speak(currentItem.phrase);
        }, 500);
        return () => clearTimeout(timer);
    }
  }, [currentIndex, stepPhase, isAutoPlayEnabled, currentItem, speak]);

  // Reset auto-play flag on index change
  useEffect(() => {
      hasAutoPlayedRef.current = false;
      setStepPhase("guess");
      setUserGuess(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentIndex]);


  const handleGuess = (guessValue: number) => {
    setUserGuess(guessValue);
    setStepPhase("reveal");
  };

  const handleNextPhase = () => {
      if (stepPhase === "reveal") {
          // If conversation exists, go to context. Else next item.
          if (currentItem?.conversation) {
              setStepPhase("context");
          } else {
              handleNextItem();
          }
      } else if (stepPhase === "context") {
          handleNextItem();
      }
  };

  const handleNextItem = () => {
      if (currentIndex < completionIndex) {
          setCurrentIndex(current => current + 1);
      }
  };

  // handlePrev removed as it is not used in the UI

  
  const handleRepeat = () => {
    setCurrentIndex(0);
    setStepPhase("guess");
    setUserGuess(null);
    hasSavedRef.current = false;
  };

  const saveProgress = async () => {
     if (hasSavedRef.current) return;
     hasSavedRef.current = true;

     // Increment repeat count in DB
     if (user) {
        try {
            const progressRef = doc(db, "users", user.uid, "progress", script.id);
            await setDoc(progressRef, {
                repeats: increment(1),
                lastPracticedAt: serverTimestamp()
            }, { merge: true });

            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                totalPractices: increment(1)
            });
            
            // Legacy sync for user created scripts
            if ('userId' in script && (script as UserScript).userId === user.uid) {
                 await updateDoc(doc(db, "users", user.uid, "scenarios", script.id), {
                   repeats: increment(1)
                 }).catch(e => console.error("Legacy sync error", e));
            }

        } catch (err) {
            console.error("Failed to save progress", err);
            hasSavedRef.current = false; // Retry on failure? Or just fail silently.
        }
     } else {
         // Guest fallback
         if (typeof window !== 'undefined') {
            const key = `jokeng:repeats:${script.id}`;
            const current = Number(localStorage.getItem(key) || 0);
            localStorage.setItem(key, String(current + 1));
            // Force re-render or context update if needed, but guest mode is local
         }
     }
      
      // Save Daily Progress (Local only, for "Daily Session" tracking)
      markComplete(script.id);
  };

  const handleExit = () => {
      router.push(`/category/${script.categorySlug}`);
  };

  // Feedback Logic
  const getFeedback = () => {
    if (!currentItem || userGuess === null) return null;
    const actual = getDangerValue(currentItem.dangerLevel);
    
    // Simple logic for 3-button system
    // 15 (Safe), 50 (Caution), 90 (Danger)
    const diff = Math.abs(userGuess - actual);
    
    if (diff < 30) {
      return { msg: "Spot on! 🎯", color: "text-green-700", bg: "bg-green-100" };
    }
    // Safe (15) vs Danger (90) = 75 diff -> Way off
    if (diff > 60) {
       return { msg: "Oof. Complete opposite.", color: "text-red-700", bg: "bg-red-100" };
    }
    return { msg: "Not quite.", color: "text-orange-700", bg: "bg-orange-100" };
  };

  // Helper to visualize risk results
  const getResultButtonStyle = (val: number, label: string, emoji: string) => {
    if (!currentItem) return null;
    const correctVal = getDangerValue(currentItem.dangerLevel);
    const isCorrect = val === correctVal;
    const isSelected = userGuess === val;
    
    let borderClass = "border-transparent";
    let bgClass = "bg-secondary/30";
    let opacityClass = "opacity-50";
    
    if (isCorrect) {
        borderClass = "border-green-500 ring-2 ring-green-200";
        bgClass = "bg-green-50";
        opacityClass = "opacity-100";
    } else if (isSelected) {
        // Selected but wrong
        borderClass = "border-red-300";
        bgClass = "bg-red-50";
        opacityClass = "opacity-100";
    }

    return (
        <div key={val} className={`flex flex-col items-center gap-1 p-2 rounded-lg border-2 ${borderClass} ${bgClass} ${opacityClass}`}>
            <div className="text-xl">{emoji}</div>
            <span className="text-xs font-bold text-foreground">{label}</span>
            {isCorrect && <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Correct</span>}
            {isSelected && !isCorrect && <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">You</span>}
        </div>
    );
 };

  // Render content
  let content = null;
  const isCompletion = currentIndex === completionIndex;
  
  // Save progress on completion
  useEffect(() => {
    if (isCompletion) {
        saveProgress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompletion]);
  
  if (viewMode === "full") {
      return <SignalFullView script={script} onBack={() => setViewMode("flow")} />;
  }

  if (isCompletion) {
       content = (
           <motion.div
               key="completion"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="w-full text-center"
           >
               <div className="bg-white rounded-lg border border-border shadow-sm p-8 md:p-12 flex flex-col items-center gap-6">
                   <Confetti />
                   <div className="text-6xl mb-2">🎉</div>
                   
                   <div className="space-y-2">
                     <h2 className="text-3xl font-bold text-foreground">
                       Mission Accomplished!
                     </h2>
                     <p className="text-lg text-muted-foreground">You have decoded all the signals.</p>
                   </div>
                   
                    <div className="bg-secondary/30 p-4 rounded-lg min-w-[150px]">
                         <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Total Runs</span>
                         <div className="text-3xl font-black text-primary">{databaseRepeats}</div> 
                    </div>

                   <div className="w-full max-w-sm flex flex-col gap-3 mt-4">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={handleRepeat}
                        className="w-full"
                      >
                        Repeat Training
                      </Button>

                      <Button 
                        variant="ghost"
                        size="md"
                        onClick={handleExit}
                        className="w-full text-muted-foreground"
                      >
                        Finish & Return
                      </Button>
                   </div>
               </div>
           </motion.div>
       );
  } else if (currentIndex === quizIndex) {
      content = (
          <QuizCard 
             items={script.quizItems || []}
             onFinish={() => setCurrentIndex(prev => prev + 1)}
          />
      );
  } else if (currentIndex === summaryIndex) {
       content = (
           <SignalSummaryCard 
               items={script.decoderItems || []}
               summaryPoints={script.summaryPoints}
               onFinish={() => setCurrentIndex(prev => prev + 1)}
           />
       );
  } else if (currentItem) {
       // Regular Item Logic
       if (stepPhase === "context" && currentItem.conversation) {
           content = (
               <ContextConversation 
                  conversation={currentItem.conversation}
                  onNext={handleNextItem}
               />
           );
       } else {
           // Guess or Reveal Phase
           content = (
               <motion.div
                    key={`item-${currentItem.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full"
                >
                    <div className="bg-white rounded-lg border border-border shadow-sm p-6 md:p-12 flex flex-col gap-8 relative overflow-hidden">
                        
                        {/* The Signal */}
                        <div className="flex flex-col gap-4 text-center items-center">
                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-1">
                                The Signal
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-foreground tracking-tight">
                                &quot;{currentItem.phrase}&quot;
                            </h2>
                            
                             <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => speak(currentItem.phrase)}
                                isLoading={loading}
                                className="text-muted-foreground hover:text-primary transition-colors"
                                leftIcon={speaking ? <Volume2 className="w-5 h-5 animate-pulse text-primary" /> : <Volume2 className="w-5 h-5" />}
                             >
                                {speaking ? "Listening..." : "Listen"}
                             </Button>
                        </div>

                        <hr className="border-border border-dashed" />

                        {stepPhase === "guess" ? (
                             <div className="flex flex-col items-center justify-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="text-center space-y-1">
                                    <h3 className="text-lg font-bold text-foreground">What&apos;s the vibe?</h3>
                                    <p className="text-muted-foreground text-sm">Select the risk level to reveal the truth.</p>
                                </div>

                                <div className="grid grid-cols-3 gap-2 w-full max-w-xl">
                                    <button 
                                        onClick={() => handleGuess(15)}
                                        className="group flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-green-100 bg-green-50/30 hover:bg-green-100 hover:border-green-300 transition-all hover:-translate-y-1 shadow-sm"
                                    >
                                        <div className="text-2xl group-hover:scale-110 transition-transform">🟢</div>
                                        <div className="flex flex-col items-center">
                                            <span className="font-bold text-green-800 text-sm">Safe</span>
                                            <span className="text-[10px] text-green-600 font-medium leading-tight">No worries</span>
                                        </div>
                                    </button>

                                    <button 
                                        onClick={() => handleGuess(50)}
                                        className="group flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-yellow-100 bg-yellow-50/30 hover:bg-yellow-100 hover:border-yellow-300 transition-all hover:-translate-y-1 shadow-sm"
                                    >
                                        <div className="text-2xl group-hover:scale-110 transition-transform">🟡</div>
                                        <div className="flex flex-col items-center">
                                            <span className="font-bold text-yellow-800 text-sm">Caution</span>
                                            <span className="text-[10px] text-yellow-600 font-medium leading-tight">Be careful</span>
                                        </div>
                                    </button>

                                    <button 
                                        onClick={() => handleGuess(90)}
                                        className="group flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-red-100 bg-red-50/30 hover:bg-red-100 hover:border-red-300 transition-all hover:-translate-y-1 shadow-sm"
                                    >
                                        <div className="text-2xl group-hover:scale-110 transition-transform">🔴</div>
                                        <div className="flex flex-col items-center">
                                            <span className="font-bold text-red-800 text-sm">Danger</span>
                                            <span className="text-[10px] text-red-600 font-medium leading-tight">Red flag!</span>
                                        </div>
                                    </button>
                                </div>
                             </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col gap-6"
                            >
                                {/* Feedback Banner */}
                                {/* Feedback Banner */}
                                {(() => {
                                    const fb = getFeedback();
                                    if (fb) {
                                        return (
                                            <div className={`py-3 px-4 rounded-lg flex items-center justify-center text-center ${fb.bg} ${fb.color} font-bold`}>
                                                {fb.msg}
                                            </div>
                                        );
                                    }
                                    return null;
                                })()}

                                {/* Visual Answer Key */}
                                <div className="grid grid-cols-3 gap-2 w-full">
                                    {getResultButtonStyle(15, "Safe", "🟢")}
                                    {getResultButtonStyle(50, "Caution", "🟡")}
                                    {getResultButtonStyle(90, "Danger", "🔴")}
                                </div>

                                {/* Meanings Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <div className="p-5 rounded-lg bg-secondary/30 flex flex-col gap-2">
                                         <span className="text-xs font-bold text-muted-foreground uppercase">Literal Meaning</span>
                                         <p className="text-base text-foreground">{currentItem.literalMeaning}</p>
                                     </div>
                                     <div className="p-5 rounded-lg bg-indigo-50/50 border border-indigo-100 flex flex-col gap-2">
                                         <span className="text-xs font-bold text-indigo-700 uppercase">Actual Meaning</span>
                                         <p className="text-lg font-bold text-indigo-950">{currentItem.actualMeaning}</p>
                                     </div>
                                </div>

                                {/* Survival Tip */}
                                <div className="p-5 rounded-lg bg-green-50/50 border border-green-100 flex flex-col gap-2">
                                     <h3 className="text-xs font-bold text-green-700 uppercase flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4" /> Pro Tip
                                     </h3>
                                     <p className="text-base font-medium text-green-900">{currentItem.survivalTip}</p>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        onClick={handleNextPhase}
                                        rightIcon={<ArrowRight className="w-4 h-4" />}
                                        className="w-full md:w-auto"
                                    >
                                        {currentItem.conversation ? "See Context" : "Next Signal"}
                                    </Button>
                                </div>

                            </motion.div>
                        )}

                    </div>
               </motion.div>
           );
       }
  }


 
   return (
    <div className="min-h-screen text-foreground flex flex-col bg-background">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border">
         <div className="max-w-3xl mx-auto px-4 py-3 md:px-6 md:py-4 flex flex-col gap-4">
             <div className="flex items-center gap-4">
                 <Link href={`/category/${script.categorySlug}`} className="text-muted-foreground hover:text-foreground transition-colors">
                     <ChevronLeft className="w-6 h-6" />
                 </Link>
                 <div className="flex-1 min-w-0">
                     <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground truncate">
                       {script.title}
                     </h1>
                 </div>

                 <div className="flex items-center gap-2">
                     {/* Auto-Play Toggle */}
                     <button
                        onClick={() => setIsAutoPlayEnabled(!isAutoPlayEnabled)}
                        className={`p-2 rounded-full transition-colors flex items-center gap-2 text-xs font-bold px-3 py-1.5 ${isAutoPlayEnabled ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}
                     >
                        {isAutoPlayEnabled ? <PlayCircle className="w-4 h-4" /> : <PauseCircle className="w-4 h-4" />}
                        <span className="hidden md:inline">Auto-Play</span>
                     </button>
                    
                     {/* Training Count Bubble */}
                     <div className="hidden md:flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full text-xs font-bold text-muted-foreground">
                        <RotateCcw className="w-3 h-3" />
                        <span>{databaseRepeats} Runs</span>
                     </div>

                     {/* Full View Toggle */}
                     <button 
                       onClick={() => setViewMode("full")}
                       className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors"
                     >
                         <FileText className="w-6 h-6" />
                     </button>
                 </div>
            </div>

            {/* Progress Line */}
             <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                <div 
                    className="h-full bg-primary transition-all duration-300 ease-out" 
                    style={{ width: `${(currentIndex / totalMainSteps) * 100}%` }} 
                />
             </div>
         </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-1 max-w-3xl mx-auto px-4 py-8 md:px-6 md:py-12 flex flex-col w-full h-full">
         <div className="flex-1 flex flex-col justify-start md:justify-center min-h-[400px]">
            <AnimatePresence mode="wait">
                {content}
            </AnimatePresence>
         </div>

         {/* Navigation - Bottom Logic */}
         {!isCompletion && currentIndex !== quizIndex && currentIndex !== summaryIndex && (
             <div className="mt-8 flex justify-center pb-8 sticky bottom-0 pointer-events-none">
                 <div className="pointer-events-auto"> 
                    {/* Controls are inside the cards predominantly now, but we can add a restart global here if needed */}
                 </div>
             </div>
         )}
      </div>
    </div>
  );
}
