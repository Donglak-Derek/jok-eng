"use client";

import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Script, DecoderItem, UserScript } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "@/components/Confetti";
import { Button } from "@/components/Button";
import ScriptPlayerShell from "@/components/ScriptPlayerShell";
import DecoderFullView from "@/components/DecoderFullView";
import QuizCard from "@/components/QuizCard";
import { useAuth } from "@/context/AuthContext";
import { updateDoc, doc, increment, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useDailyProgress } from "@/hooks/useDailyProgress";
import { useProgress } from "@/context/ProgressContext";

import { Volume2, AlertTriangle, ShieldCheck, PartyPopper } from "lucide-react";

type Props = {
  script: Script;
};

// specialized card for Signal Decoder
function SignalCard({ 
  item, 
  onHeard, 
  isAutoPlayEnabled,
  isGlobalRevealed
}: { 
  item: DecoderItem, 
  onHeard: () => void,
  isAutoPlayEnabled: boolean,
  isGlobalRevealed: boolean
}) {
    const [isRevealed, setIsRevealed] = useState(false);
    const [speaking, setSpeaking] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const hasAutoPlayedRef = useRef(false);
    const [localRevealedWords, setLocalRevealedWords] = useState<Set<string>>(new Set());

    const cleanText = (text: string) => text.replace(/\[|\]/g, "");

    // Get active keywords if any
    const keywords = useMemo(() => item.keywords || [], [item.keywords]);

    const renderClozeText = (text: string) => {
        const parts = text.split(/(\[.*?\])/g);
        if (parts.length === 1) return <>{cleanText(text)}</>;

        return (
            <span>
                {parts.map((part, i) => {
                    if (part.startsWith("[") && part.endsWith("]")) {
                        const content = part.slice(1, -1);
                        const isWordRevealed = isGlobalRevealed || localRevealedWords.has(content);
                        return (
                            <span
                                key={i}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLocalRevealedWords(prev => {
                                        const next = new Set(prev);
                                        if (next.has(content)) next.delete(content);
                                        else next.add(content);
                                        return next;
                                    });
                                }}
                                className={`
                                    inline-block rounded mx-1 px-1.5 border-b-2 transition-all duration-300 align-baseline
                                    ${isWordRevealed 
                                        ? "bg-indigo-100 border-indigo-300 text-indigo-900 cursor-default" 
                                        : "bg-indigo-50 border-indigo-200 text-transparent cursor-pointer hover:bg-indigo-100 select-none min-w-[3ch] text-center"
                                    }
                                `}
                            >
                                {content}
                            </span>
                        );
                    }
                    return <span key={i}>{part}</span>;
                })}
            </span>
        );
    };

    // Effect: If global revealed changes to true, reveal local
    useEffect(() => {
        if (isGlobalRevealed) setIsRevealed(true);
    }, [isGlobalRevealed]);

    const handlePlay = useCallback(async () => {
        if (speaking) return;
        
        onHeard();
        setSpeaking(true);

        const textToSpeak = item.phrase; // Speak the signal
        
        try {
            const params = new URLSearchParams({
                text: textToSpeak,
                voice: "en-US-AriaNeural", 
            });
            const audio = new Audio(`/api/tts?${params}`);
            audioRef.current = audio;
            
            await new Promise<void>((resolve) => {
                audio.onended = () => resolve();
                audio.play();
            });
        } catch (e) {
            console.error(e);
            // Fallback
            const u = new SpeechSynthesisUtterance(textToSpeak);
            u.onend = () => setSpeaking(false);
            window.speechSynthesis.speak(u);
            return; 
        } finally {
            setSpeaking(false);
        }
    }, [item.phrase, speaking, onHeard]);

    // Auto-Play
    useEffect(() => {
        if (isAutoPlayEnabled && !hasAutoPlayedRef.current) {
            const t = setTimeout(() => {
                handlePlay();
                hasAutoPlayedRef.current = true;
            }, 500);
            return () => clearTimeout(t);
        }
    }, [isAutoPlayEnabled, handlePlay]); 

    // Cleanup
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    // Helper: Is any word revealed?
    const anyWordRevealed = isGlobalRevealed || localRevealedWords.size > 0;

    return (
        <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden flex flex-col h-full">
             {/* THE SIGNAL (Top) */}
             <div className="p-8 md:p-10 bg-slate-50 border-b border-border text-center flex flex-col items-center gap-4 relative">
                 <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground">The Signal</div>
                 <div className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
                     &quot;{renderClozeText(item.phrase)}&quot;
                 </div>
                 
                 {/* REVEALED DEFINITIONS */}
                 <div className="min-h-[24px] flex flex-col items-center justify-center w-full mt-2">
                    {anyWordRevealed && keywords.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                             {keywords.map((k) => {
                                 const isWordActive = isGlobalRevealed || localRevealedWords.has(k.word);
                                 if (!isWordActive) return null;
                                 
                                 return (
                                     <span key={k.word} className="text-sm px-3 py-1 bg-indigo-100 text-indigo-900 rounded-full border border-indigo-200 shadow-sm">
                                         <span className="font-bold">{k.word}</span>: {k.definition}
                                     </span>
                                 );
                             })}
                        </div>
                    ) : (
                        <div className="text-xs text-muted-foreground italic h-[24px] flex items-center">
                           {!isGlobalRevealed && "Tap hidden words to limit-break"}
                        </div>
                    )}
                 </div>

                 <Button
                    onClick={handlePlay}
                    variant="ghost"
                    size="sm"
                    className={`mt-2 ${speaking ? "text-primary animate-pulse" : "text-muted-foreground"}`}
                    leftIcon={<Volume2 className="w-4 h-4" />}
                 >
                    {speaking ? "Playing..." : "Listen"}
                 </Button>
             </div>

             {/* THE DECODE (Bottom - Revealed) */}
             <div className="flex-1 p-8 md:p-10 flex flex-col items-center justify-center relative bg-white">
                 <AnimatePresence>
                     {!isRevealed && !isGlobalRevealed ? (
                         <motion.button
                             initial={{ opacity: 0, scale: 0.9 }}
                             animate={{ opacity: 1, scale: 1 }}
                             exit={{ opacity: 0, scale: 0.95 }}
                             onClick={() => setIsRevealed(true)}
                             className="group flex flex-col items-center gap-3 p-6 rounded-2xl hover:bg-secondary/50 transition-colors cursor-pointer"
                         >
                             <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                                 🕵️‍♂️
                             </div>
                             <span className="font-bold text-muted-foreground group-hover:text-foreground">Tap to Decode</span>
                         </motion.button>
                     ) : (
                         <motion.div
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             className="w-full space-y-8"
                         >
                             {/* The Risk */}
                             <div className="flex gap-4 items-start">
                                 <div className="p-2 bg-red-100 text-red-600 rounded-lg shrink-0">
                                     <AlertTriangle className="w-6 h-6" />
                                 </div>
                                 <div>
                                     <h4 className="font-bold text-red-700 mb-1 text-lg">Hidden Risk</h4>
                                     <p className="text-foreground/80 leading-relaxed text-lg">{item.actualMeaning}</p>
                                 </div>
                             </div>

                             {/* The Safe Move */}
                             <div className="flex gap-4 items-start">
                                 <div className="p-2 bg-green-100 text-green-600 rounded-lg shrink-0">
                                     <ShieldCheck className="w-6 h-6" />
                                 </div>
                                 <div>
                                     <h4 className="font-bold text-green-700 mb-1 text-lg">Smart Move</h4>
                                     <p className="text-foreground/80 leading-relaxed text-lg">{item.survivalTip}</p>
                                 </div>
                             </div>
                         </motion.div>
                     )}
                 </AnimatePresence>
             </div>
        </div>
    );
}


export default function SignalDecoder({ script }: Props) {
  const router = useRouter();
  const items = useMemo(() => script.decoderItems || [], [script.decoderItems]);
  const hasQuiz = !!script.quizItems && script.quizItems.length > 0;
  const itemsCount = items.length;
  
  const quizIndex = hasQuiz ? itemsCount : -1;
  const totalSteps = itemsCount + (hasQuiz ? 1 : 0);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);
  const [isGlobalRevealed, setIsGlobalRevealed] = useState(false); 
  const [viewMode, setViewMode] = useState<"flow" | "full">("flow");
  const hasSavedRef = useState(false);

  // Hooks
  const { user } = useAuth();
  const { markComplete } = useDailyProgress();
  const { getRepeats } = useProgress();
  const databaseRepeats = getRepeats(script.id); 

  const isOwner = user && 'userId' in script && (script as UserScript).userId === user.uid;
  const isCompletion = currentStep >= totalSteps;

  const saveProgress = async () => {
      // If already saved this session, skip
      if (hasSavedRef[0]) return;
      hasSavedRef[1](true);

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
  };

  // Auto-save on completion
  useEffect(() => {
    if (isCompletion) {
      saveProgress();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompletion]);


  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      // Reset reveal state logic handled by component key
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handlePracticeAgain = () => {
      hasSavedRef[1](false);
      setCurrentStep(0);
  };

  const toggleAutoPlay = () => setIsAutoPlayEnabled(prev => !prev);
  const toggleGlobalReveal = () => setIsGlobalRevealed(prev => !prev);


  if (viewMode === "full") {
      return <DecoderFullView script={script} onBack={() => setViewMode("flow")} />;
  }

  // Render content
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
              
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-200 to-indigo-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(99,102,241,0.4)] animate-in zoom-in-50 duration-500">
                 <PartyPopper className="w-12 h-12 text-white drop-shadow-md" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Decoding Complete!</h2>
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
                         onClick={() => router.push(`/category/${script.categorySlug}`)}
                         className="w-full h-12 text-muted-foreground hover:text-foreground"
                    >
                         Back to Menu
                    </Button>
               </div>
           </motion.div>
      );
  } else if (currentStep === quizIndex && script.quizItems) {
      content = (
          <QuizCard 
             items={script.quizItems}
             onFinish={handleNext}
          />
      );
  } else {
      const currentItem = items[currentStep];
      content = (
          <motion.div
             key={currentStep}
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -20 }}
             transition={{ duration: 0.3 }}
             className="w-full h-full min-h-[500px]"
          >
              <SignalCard 
                  item={currentItem}
                  onHeard={() => {}} 
                  isAutoPlayEnabled={isAutoPlayEnabled}
                  isGlobalRevealed={isGlobalRevealed}
              />
          </motion.div>
      );
  }

  return (
    <ScriptPlayerShell
        title={script.title}
        categorySlug={script.categorySlug}
        imageUrl={script.imageUrl}
        currentStep={currentStep}
        totalSteps={totalSteps}
        hasFinished={isCompletion || currentStep === quizIndex}

        // Controls
        isAutoPlayEnabled={isAutoPlayEnabled}
        onToggleAutoPlay={toggleAutoPlay}
        isGlobalRevealed={isGlobalRevealed}
        onToggleGlobalReveal={toggleGlobalReveal}
        
        // Navigation
        onNext={handleNext}
        onPrev={handlePrev}
        onRestart={handlePracticeAgain}
        // Full View
        onViewFull={() => setViewMode("full")}
        onBackToMenu={() => router.push(`/category/${script.categorySlug}`)}
    >
        <AnimatePresence mode="wait">
             {content}
        </AnimatePresence>
    </ScriptPlayerShell>
  );
}
