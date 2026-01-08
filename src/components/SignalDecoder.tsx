"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Script } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "@/components/Confetti";
import { Button } from "@/components/Button";
import { ChevronLeft, Volume2, ArrowRight, RotateCcw, CheckCircle2, FileText } from "lucide-react";
import SignalFullView from "./SignalFullView";
import SignalSummaryCard from "@/components/SignalSummaryCard";

type Props = {
  script: Script;
};

export default function SignalDecoder({ script }: Props) {
  const router = useRouter();
  const items = script.decoderItems || [];
  const itemsCount = items.length;
  // Summary card is the last step before completion
  const summaryIndex = itemsCount; 
  // Total active steps = Items + Summary
  const total = itemsCount + 1;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"flow" | "full">("flow");
  
  // Game State
  const [isRevealed, setIsRevealed] = useState(false);
  const [userGuess, setUserGuess] = useState(50); // 0 (Safe) to 100 (Danger)
  
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);

  // Completion State: When index reaches total (which is N+1), we are done with all active cards (inc summary)
  const isCompletion = currentIndex === total;

  // Use currentItem only if we are in items range
  const currentItem = currentIndex < itemsCount ? items[currentIndex] : items[itemsCount - 1];
  
  // isLastItem refers to the actual last item card OR the summary card
  // Actually, "Next" on the last item should go to Summary. "Next" on Summary should go to Completion.
  const isLastActiveStep = currentIndex === total - 1;

  // Helper to normalize danger levels from data strings to 0-100
  const getDangerValue = (level: string): number => {
    const l = level.toLowerCase();
    if (l.includes("critical") || l.includes("run") || l.includes("red flag") || l.includes("high")) return 90;
    if (l.includes("medium") || l.includes("caution") || l.includes("flake")) return 50;
    if (l.includes("low") || l.includes("safe")) return 15;
    if (l.includes("rejection")) return 80;
    return 50;
  };

  const resetCard = () => {
    setIsRevealed(false);
    setUserGuess(50);
  };

  const handleNext = () => {
    // If we are at the last item, next goes to completion (index = total)
    if (currentIndex < total) {
      setCurrentIndex((prev) => prev + 1);
      resetCard();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      resetCard();
    }
  };
  
  const handleRepeat = () => {
    setCurrentIndex(0);
    resetCard();
  };

  const handleFinish = () => {
     // Increment repeat count
     if (typeof window !== 'undefined') {
       const key = `jokeng:repeats:${script.id}`;
       const current = Number(localStorage.getItem(key) || 0);
       localStorage.setItem(key, String(current + 1));
     }
     router.push(`/category/${script.categorySlug}`);
  };

  const handleLockInGuess = () => {
    setIsRevealed(true);
  };
  
  // Get feedback based on guess accuracy
  const getFeedback = () => {
    if (!currentItem) return null;
    const actual = getDangerValue(currentItem.dangerLevel);
    const diff = Math.abs(userGuess - actual);
    
    if (diff <= 25) {
      return { msg: "Spot on! 🎯", color: "text-green-600", bg: "bg-green-50" };
    }
    if (actual >= 70 && userGuess < 50) {
      return { msg: "Missed the Red Flag completely.", color: "text-red-600", bg: "bg-red-50" };
    }
    if (actual < 40 && userGuess >= 60) {
       return { msg: "You're overthinking it.", color: "text-blue-600", bg: "bg-blue-50" };
    }
    return { msg: "Not quite, look closer.", color: "text-orange-600", bg: "bg-orange-50" };
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


  // Scroll to top on slide change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentIndex]);


  // If no items, show error or return null
  if (itemsCount === 0) return <div>No items found.</div>;

  if (viewMode === "full") {
      return <SignalFullView script={script} onBack={() => setViewMode("flow")} />;
  }
  
  let content = null;
  const showControls = !isCompletion && currentIndex !== summaryIndex;
  
  if (isCompletion) {
       content = (
           <motion.div
               key="completion"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               transition={{ duration: 0.4 }}
               className="w-full"
           >
               <div className="bg-white rounded-lg border border-border shadow-sm p-8 md:p-12 flex flex-col items-center text-center gap-6">
                   <Confetti />
                   <div className="text-6xl mb-2">🎉</div>
                   
                   <div className="space-y-2">
                     <h2 className="text-3xl font-bold text-foreground">
                       Mission Accomplished!
                     </h2>
                     <p className="text-lg text-muted-foreground">You have decoded all the signals.</p>
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
                        onClick={handleFinish}
                        className="w-full text-muted-foreground"
                      >
                        Finish & Return
                      </Button>
                   </div>
               </div>
           </motion.div>
       );
  } else if (currentIndex === summaryIndex) {
       // Summary Card
       content = (
           <SignalSummaryCard 
               items={script.decoderItems || []}
               summaryPoints={script.summaryPoints}
               onFinish={handleNext}
           />
       );
  } else {
       // Regular Item Card
       content = (
           <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full"
            >
                <div className="bg-white rounded-lg border border-border shadow-sm p-6 md:p-12 flex flex-col gap-6 md:gap-8 relative overflow-hidden">
                    
                    {/* The Signal (Phrase) */}
                    <div className="flex flex-col gap-4 text-center items-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-1">
                            The Signal
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">
                            &quot;{currentItem.phrase}&quot;
                        </h2>
                        
                        {/* Audio Button */}
                         <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => speak(currentItem.phrase)}
                            isLoading={loading}
                            className="text-muted-foreground"
                            leftIcon={<Volume2 className="w-4 h-4" />}
                         >
                            Listen
                         </Button>
                    </div>

                    <hr className="border-border border-dashed" />

                    {/* Game / Reveal Section */}
                    <div className="flex flex-col gap-6">
                        {!isRevealed ? (
                            <div className="flex flex-col items-center justify-center py-6 gap-8">
                                <div className="text-center space-y-2">
                                    <h3 className="text-xl font-bold uppercase tracking-tight text-foreground">Danger Check</h3>
                                    <p className="text-muted-foreground">How dangerous is this phrase?</p>
                                </div>

                                {/* Danger Slider Game - Minimalist */}
                                <div className="w-full max-w-md px-4">
                                    <div className="flex justify-between text-xs font-bold uppercase mb-4 text-muted-foreground">
                                        <span className="text-green-600">Safe</span>
                                        <span className="text-red-600">Run</span>
                                    </div>
                                    
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="100" 
                                        value={userGuess} 
                                        onChange={(e) => setUserGuess(Number(e.target.value))}
                                        className="w-full h-2 bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    />
                                    
                                    <div className="text-center mt-6">
                                         <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground font-mono text-sm font-bold">
                                            {userGuess < 33 ? "Safe" : userGuess < 66 ? "Caution" : "Danger"} ({userGuess}%)
                                         </span>
                                    </div>
                                </div>

                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={handleLockInGuess}
                                    className="w-full md:w-auto px-8"
                                >
                                    Lock In Guess
                                </Button>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col gap-6"
                            >
                                {/* Feedback Banner */}
                                {(() => {
                                    const fb = getFeedback();
                                    if (!fb) return null;
                                    return (
                                        <div className={`p-4 rounded-lg flex items-center justify-center text-center ${fb.bg} ${fb.color} font-bold text-lg`}>
                                            {fb.msg}
                                        </div>
                                    );
                                })()}

                                {/* Comparison Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 rounded-lg bg-secondary/30">
                                        <h3 className="text-xs font-bold text-muted-foreground uppercase mb-2">Literal Meaning</h3>
                                        <p className="text-lg font-medium text-foreground leading-relaxed">{currentItem.literalMeaning}</p>
                                    </div>
                                    <div className="p-6 rounded-lg bg-yellow-50/80 border border-yellow-100">
                                        <h3 className="text-xs font-bold text-yellow-700 uppercase mb-2">Actual Meaning (Subtext)</h3>
                                        <p className="text-lg font-bold text-yellow-950 leading-relaxed">{currentItem.actualMeaning}</p>
                                    </div>
                                </div>
                                
                                {/* Danger Level Visual */}
                                <div className="flex flex-col gap-3 p-6 rounded-lg bg-red-50/50 border border-red-100">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-red-700 uppercase">Actual Danger Level</span>
                                        <span className="font-bold text-red-700 text-xl">{currentItem.dangerLevel}</span>
                                    </div>
                                    
                                    {/* Comparison Bar */}
                                    <div className="relative h-2 bg-gray-200 rounded-full w-full mt-2">
                                        {/* Markers */}
                                        <div 
                                          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-sm z-10"
                                          style={{ left: `${getDangerValue(currentItem.dangerLevel)}%`, marginLeft: '-8px' }}
                                          title="Actual"
                                        />
                                        <div 
                                          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-sm z-10 opacity-70"
                                          style={{ left: `${userGuess}%`, marginLeft: '-6px' }}
                                          title="Your Guess"
                                        />
                                    </div>
                                    
                                    <div className="flex justify-between text-xs font-medium text-muted-foreground mt-1">
                                        <span className="text-blue-600">You: {userGuess}%</span>
                                        <span className="text-red-600">Actual: {getDangerValue(currentItem.dangerLevel)}%</span>
                                    </div>
                                </div>

                                <div className="p-6 rounded-lg bg-green-50/50 border border-green-100">
                                     <h3 className="text-xs font-bold text-green-700 uppercase mb-2 flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4" /> Survival Tip
                                     </h3>
                                     <p className="text-lg font-medium text-green-900 leading-relaxed">{currentItem.survivalTip}</p>
                                </div>
                            </motion.div>
                        )}
                    </div>

                </div>
            </motion.div>
       );
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

            {/* Progress Line */}
             <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                <div 
                    className="h-full bg-red-500 transition-all duration-300 ease-out" 
                    style={{ width: `${(currentIndex / total) * 100}%` }} 
                />
             </div>
         </div>
      </header>

      <div className="flex-1 max-w-3xl mx-auto px-4 py-8 md:px-6 md:py-12 flex flex-col gap-6 md:gap-8 w-full">

        {/* Decoder Card Area */}
        <div className="flex-1 flex flex-col justify-center min-h-[400px]">
            <AnimatePresence mode="wait">
                {content}
            </AnimatePresence>
        </div>

        {/* Navigation - Bottom Bar */}
        {showControls && (
            <div className="sticky bottom-0 left-0 right-0 p-6 bg-background border-t border-border z-20">
              <div className="max-w-3xl mx-auto flex items-center justify-between">
                 <Button 
                   variant="ghost"
                   size="sm"
                   onClick={handleRepeat}
                   className="text-muted-foreground hover:text-foreground"
                   leftIcon={<RotateCcw className="w-4 h-4" />}
                 >
                   Restart
                 </Button>
                 
                 <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      onClick={handlePrev}
                      disabled={currentIndex === 0}
                      className={currentIndex === 0 ? "invisible" : ""}
                      leftIcon={<ChevronLeft className="w-4 h-4" />}
                    >
                      Prev
                    </Button>

                    {/* Only show Next if revealed */}
                    {isRevealed && (
                      <Button
                        variant="primary"
                        onClick={handleNext}
                        rightIcon={isLastActiveStep ? undefined : <ArrowRight className="w-4 h-4" />}
                      >
                         {/* Text based on step */}
                         {isLastActiveStep ? "Review Mission" : "Next"}
                      </Button>
                    )}
                 </div>
              </div>
            </div>
        )}

      </div>
    </div>
  );
}
