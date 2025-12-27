"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Script } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "@/components/Confetti";
import { Button } from "@/components/Button";

type Props = {
  script: Script;
};

export default function SignalDecoder({ script }: Props) {
  const router = useRouter();
  const items = script.decoderItems || [];
  const total = items.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Game State
  const [isRevealed, setIsRevealed] = useState(false);
  const [userGuess, setUserGuess] = useState(50); // 0 (Safe) to 100 (Danger)
  
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);

  // Completion State
  const isCompletion = currentIndex === total;

  // Use currentItem only if not completed
  const currentItem = items[currentIndex];
  // isLastItem refers to the last actual content card
  const isLastItem = currentIndex === total - 1;

  // Helper to normalize danger levels from data strings to 0-100
  const getDangerValue = (level: string): number => {
    const l = level.toLowerCase();
    if (l.includes("critical") || l.includes("run") || l.includes("red flag") || l.includes("high")) return 90;
    if (l.includes("medium") || l.includes("caution") || l.includes("flake")) return 50;
    if (l.includes("low") || l.includes("safe")) return 15;
    if (l.includes("rejection")) return 80; // High but distinct
    return 50; // Default fallback
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
    
    // Logic: 
    // If actual is HIGH (>=70) and user guessed LOW (<40) -> "You Died"
    // If actual is LOW (<40) and user guessed HIGH (>=70) -> "Overthinking"
    // If within 25 points -> "Nailed it"
    
    if (diff <= 25) {
      return { msg: "Nailed it! 🎯", color: "text-green-500", bg: "bg-green-500/10" };
    }
    if (actual >= 70 && userGuess < 50) {
      return { msg: "RIP. You missed the Red Flag. 💀", color: "text-red-500", bg: "bg-red-500/10" };
    }
    if (actual < 40 && userGuess >= 60) {
       return { msg: "Relax, it's not that deep. 😅", color: "text-blue-500", bg: "bg-blue-500/10" };
    }
    return { msg: "Not quite... look closer. 🤔", color: "text-yellow-500", bg: "bg-yellow-500/10" };
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
  if (total === 0) return <div>No items found.</div>;



  return (
    <div className="min-h-dvh text-foreground flex flex-col bg-background">
      <div className="flex-1 max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6 w-full">
        
        {/* Sticky Header */}
        <header className="sticky top-0 z-10 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-3 md:py-4 backdrop-blur bg-background/70 flex items-center gap-3 border-b border-secondary/30 shadow-[0_10px_40px_rgba(34,19,74,0.7)] relative mb-6">
             <Link href={`/category/${script.categorySlug}`} className="text-xl text-primary font-bold">←</Link>
             <div className="flex-1">
                 <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-tertiary via-secondary to-primary text-transparent bg-clip-text">
                   {script.title}
                 </h1>
                 <p className="text-sm text-muted">{script.context || script.cleanedEnglish}</p>
             </div>

             {/* Progress Bar moved to bottom of header */}
             <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary/10">
                <div 
                    className="h-full bg-primary transition-all duration-300" 
                    style={{ width: `${(currentIndex / total) * 100}%` }} 
                />
             </div>
        </header>

        {/* Decoder Card Area */}
        <div className="flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
                {!isCompletion ? (
                    <motion.div
                        key={currentItem.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="w-full"
                    >
                        <div className="border border-secondary/30 bg-card/80 backdrop-blur rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl relative overflow-hidden">
                            
                            {/* The Phrase */}
                            <div className="flex flex-col gap-3 text-center pt-4">
                                <span className="text-xs font-bold uppercase tracking-widest text-secondary md:text-sm lg:text-base">
                                    The Signal
                                </span>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                    &quot;{currentItem.phrase}&quot;
                                </h2>
                                
                                {/* Audio Button */}
                                 <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => speak(currentItem.phrase)}
                                    isLoading={loading}
                                    className="self-center mt-2 border-primary/20 bg-primary/10 text-primary hover:bg-primary/20"
                                 >
                                    {!loading && "🔊 Play Audio"}
                                 </Button>
                            </div>

                            <hr className="border-secondary/20" />

                            {/* Game / Reveal Section */}
                            <div className="min-h-[300px] flex flex-col">
                                {!isRevealed ? (
                                    <div className="flex-1 flex flex-col items-center justify-center py-6 gap-8">
                                        <div className="text-center space-y-2">
                                            <h3 className="text-xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight">Danger Check</h3>
                                            <p className="text-muted text-sm md:text-lg lg:text-xl">How dangerous is this phrase?</p>
                                        </div>

                                        {/* Danger Slider Game */}
                                        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg px-4">
                                            <div className="flex justify-between text-xs md:text-sm font-bold uppercase mb-2">
                                                <span className="text-green-500">Green Flag (Safe)</span>
                                                <span className="text-red-500">Red Flag (Run)</span>
                                            </div>
                                            <input 
                                                type="range" 
                                                min="0" 
                                                max="100" 
                                                value={userGuess} 
                                                onChange={(e) => setUserGuess(Number(e.target.value))}
                                                className="w-full h-4 bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 rounded-lg appearance-none cursor-pointer accent-white shadow-inner"
                                            />
                                            <div className="text-center mt-2 font-mono text-xl md:text-3xl font-bold text-primary">
                                                {userGuess < 33 ? "Safe" : userGuess < 66 ? "Caution" : "Danger!"} ({userGuess}%)
                                            </div>
                                        </div>

                                        <Button
                                            variant="primary"
                                            size="lg"
                                            onClick={handleLockInGuess}
                                            className="w-full md:w-auto text-xl md:text-2xl shadow-lg"
                                        >
                                            🕵️ Lock In Guess
                                        </Button>
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col gap-6"
                                    >
                                        {/* Feedback Banner */}
                                        {(() => {
                                            const fb = getFeedback();
                                            if (!fb) return null;
                                            return (
                                                <div className={`p-4 rounded-xl border-l-4 ${fb.bg} border-l-[${fb.color.replace('text-', '')}] flex items-center justify-center text-center shadow-lg transform -rotate-1`}>
                                                    <h3 className={`text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight ${fb.color}`}>
                                                        {fb.msg}
                                                    </h3>
                                                </div>
                                            );
                                        })()}

                                        {/* Comparison Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                            <div className="p-4 md:p-6 rounded-xl bg-background/50 border border-secondary/20">
                                                <h3 className="text-sm md:text-base lg:text-lg font-bold text-muted uppercase mb-2">Literal Meaning</h3>
                                                <p className="text-lg md:text-xl lg:text-2xl leading-snug">{currentItem.literalMeaning}</p>
                                            </div>
                                            <div className="p-4 md:p-6 rounded-xl bg-tertiary/10 border border-tertiary/30">
                                                <h3 className="text-sm md:text-base lg:text-lg font-bold text-tertiary uppercase mb-2">Actual Meaning (Subtext)</h3>
                                                <p className="text-lg md:text-xl lg:text-2xl font-semibold leading-snug">{currentItem.actualMeaning}</p>
                                            </div>
                                        </div>
                                        
                                        {/* Danger Level & Tip */}
                                        <div className="flex flex-col gap-2 p-4 md:p-6 rounded-xl bg-red-500/10 border border-red-500/30">
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-red-400 md:text-lg lg:text-xl">ACTUAL DANGER LEVEL</span>
                                                <span className="font-black text-red-500 text-lg md:text-2xl lg:text-3xl">{currentItem.dangerLevel}</span>
                                            </div>
                                            {/* Show comparison bar */}
                                            <div className="w-full h-2 md:h-3 bg-background rounded-full overflow-hidden mt-1 relative">
                                                {/* Actual Marker */}
                                                <div 
                                                    className="absolute top-0 bottom-0 w-1 md:w-2 bg-red-500 z-10" 
                                                    style={{ left: `${getDangerValue(currentItem.dangerLevel)}%` }} 
                                                />
                                                {/* User Guess Marker */}
                                                <div 
                                                    className="absolute top-0 bottom-0 w-1 md:w-2 bg-primary z-10 opacity-70" 
                                                    style={{ left: `${userGuess}%` }} 
                                                />
                                                <div className="w-full h-full bg-gradient-to-r from-green-500/20 via-yellow-400/20 to-red-500/20" />
                                            </div>
                                            <div className="flex justify-between text-[10px] md:text-sm text-muted uppercase font-bold mt-1">
                                                <span className="text-primary">Your Guess: {userGuess}%</span>
                                                <span className="text-red-500">Actual: {getDangerValue(currentItem.dangerLevel)}%</span>
                                            </div>
                                        </div>

                                        <div className="p-4 md:p-6 rounded-xl bg-green-500/10 border border-green-500/30">
                                             <h3 className="text-sm md:text-base lg:text-lg font-bold text-green-500 uppercase mb-2">Survival Tip</h3>
                                             <p className="text-md md:text-xl lg:text-2xl leading-relaxed">{currentItem.survivalTip}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                        </div>
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
                             <Confetti />
                             <div className="text-6xl md:text-7xl animate-bounce mb-2">🎉</div>
                             
                             <div className="flex flex-col gap-2">
                               <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-secondary animate-pulse">
                                 Congratulation!
                               </h2>
                               <p className="text-lg text-muted">You have decoded all the signals.</p>
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
                                  onClick={handleFinish}
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

        {/* Navigation - Hide on completion or handle logic */}
        {!isCompletion && (
            <div className="flex justify-between items-center mt-4">
                 <Button
                    variant="outline"
                    size="md"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="text-secondary border-secondary/30 hover:bg-secondary/10"
                 >
                     Prev
                 </Button>
                 
                 {isRevealed && (
                     <Button
                        variant="primary"
                        size="lg"
                        onClick={handleNext}
                        className="shadow-lg hover:shadow-cyan-500/20"
                     >
                         {isLastItem ? "Next" : "Next Signal →"}
                     </Button>
                 )}
            </div>
        )}

      </div>
    </div>
  );
}
