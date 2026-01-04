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
        <header className="sticky top-0 z-10 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-3 md:py-4 bg-white flex items-center gap-3 border-b-2 border-black shadow-sm relative mb-6">
             <Link href={`/category/${script.categorySlug}`} className="text-xl text-black font-black hover:scale-110 transition-transform">←</Link>
             <div className="flex-1">
                 <h1 className="text-2xl md:text-3xl font-black text-black leading-none">
                   {script.title}
                 </h1>
                 <p className="text-sm text-gray-600 font-bold">{script.context || script.cleanedEnglish}</p>
             </div>

             {/* Progress Bar moved to bottom of header */}
             <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-100">
                <div 
                    className="h-full bg-red-500 border-r-2 border-black transition-all duration-300" 
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
                        <div className="border-4 border-black bg-white rounded-3xl p-6 md:p-8 flex flex-col gap-6 hard-shadow relative overflow-hidden">
                            
                            {/* The Phrase */}
                            <div className="flex flex-col gap-3 text-center pt-4">
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 md:text-sm lg:text-base border-b-2 border-gray-200 self-center pb-1">
                                    The Signal
                                </span>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-black">
                                    &quot;{currentItem.phrase}&quot;
                                </h2>
                                
                                {/* Audio Button */}
                                 <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => speak(currentItem.phrase)}
                                    isLoading={loading}
                                     className="self-center mt-2 px-8 py-6 text-lg border-2 border-black bg-primary text-black hover:bg-black hover:text-white rounded-full font-black transition-all hard-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                                 >
                                    {!loading && "🔊 Play Audio"}
                                 </Button>
                            </div>

                            <hr className="border-black/10 border-dashed" />

                            {/* Game / Reveal Section */}
                            <div className="min-h-[300px] flex flex-col">
                                {!isRevealed ? (
                                    <div className="flex-1 flex flex-col items-center justify-center py-6 gap-8">
                                        <div className="text-center space-y-2">
                                            <h3 className="text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-black">Danger Check</h3>
                                            <p className="text-gray-600 font-bold text-sm md:text-lg lg:text-xl">How dangerous is this phrase?</p>
                                        </div>

                                        {/* Danger Slider Game */}
                                        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg px-4">
                                            <div className="flex justify-between text-xs md:text-sm font-black uppercase mb-2">
                                                <span className="text-green-600">Green Flag (Safe)</span>
                                                <span className="text-red-600">Red Flag (Run)</span>
                                            </div>
                                            <input 
                                                type="range" 
                                                min="0" 
                                                max="100" 
                                                value={userGuess} 
                                                onChange={(e) => setUserGuess(Number(e.target.value))}
                                                className="w-full h-4 bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 rounded-lg appearance-none cursor-pointer accent-black border-2 border-black hard-shadow"
                                            />
                                            <div className="text-center mt-4 font-mono text-xl md:text-3xl font-black text-black bg-gray-100 border-2 border-black px-4 py-2 rounded-lg inline-block transform -rotate-1">
                                                {userGuess < 33 ? "Safe" : userGuess < 66 ? "Caution" : "Danger!"} ({userGuess}%)
                                            </div>
                                        </div>

                                        <Button
                                            variant="primary"
                                            size="lg"
                                            onClick={handleLockInGuess}
                                            className="w-full md:w-auto text-xl md:text-2xl border-4 border-black hard-shadow bg-blue-500 text-white hover:bg-blue-600 hover:-translate-y-1 hover:shadow-[6px_6px_0px_black] transition-all"
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
                                                <div className={`p-4 rounded-xl border-4 border-black ${fb.bg} flex items-center justify-center text-center hard-shadow transform -rotate-1 bg-white`}>
                                                    <h3 className={`text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight ${fb.color}`}>
                                                        {fb.msg}
                                                    </h3>
                                                </div>
                                            );
                                        })()}

                                        {/* Comparison Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                            <div className="p-4 md:p-6 rounded-xl bg-white border-2 border-black hard-shadow-sm">
                                                <h3 className="text-sm md:text-base lg:text-lg font-black text-gray-500 uppercase mb-2">Literal Meaning</h3>
                                                <p className="text-lg md:text-xl lg:text-2xl leading-snug font-medium text-black">{currentItem.literalMeaning}</p>
                                            </div>
                                            <div className="p-4 md:p-6 rounded-xl bg-yellow-50 border-2 border-black hard-shadow-sm">
                                                <h3 className="text-sm md:text-base lg:text-lg font-black text-black uppercase mb-2">Actual Meaning (Subtext)</h3>
                                                <p className="text-lg md:text-xl lg:text-2xl font-black leading-snug transform -rotate-1 text-black">{currentItem.actualMeaning}</p>
                                            </div>
                                        </div>
                                        
                                        {/* Danger Level & Tip */}
                                        <div className="flex flex-col gap-2 p-4 md:p-6 rounded-xl bg-red-50 border-2 border-black hard-shadow-sm">
                                            <div className="flex items-center justify-between">
                                                <span className="font-black text-red-600 md:text-lg lg:text-xl uppercase">ACTUAL DANGER LEVEL</span>
                                                <span className="font-black text-red-600 text-lg md:text-2xl lg:text-3xl">{currentItem.dangerLevel}</span>
                                            </div>
                                            {/* Show comparison bar */}
                                            <div className="w-full h-4 md:h-5 bg-white border-2 border-black rounded-full overflow-hidden mt-1 relative">
                                                {/* Actual Marker */}
                                                <div 
                                                    className="absolute top-0 bottom-0 w-1 md:w-2 bg-red-600 z-10" 
                                                    style={{ left: `${getDangerValue(currentItem.dangerLevel)}%` }} 
                                                />
                                                {/* User Guess Marker */}
                                                <div 
                                                    className="absolute top-0 bottom-0 w-1 md:w-2 bg-blue-500 z-10 opacity-70" 
                                                    style={{ left: `${userGuess}%` }} 
                                                />
                                                <div className="w-full h-full bg-gradient-to-r from-green-500/50 via-yellow-400/50 to-red-500/50" />
                                            </div>
                                            <div className="flex justify-between text-[10px] md:text-sm text-black uppercase font-bold mt-1">
                                                <span className="text-blue-600">Your Guess: {userGuess}%</span>
                                                <span className="text-red-600">Actual: {getDangerValue(currentItem.dangerLevel)}%</span>
                                            </div>
                                        </div>

                                        <div className="p-4 md:p-6 rounded-xl bg-green-50 border-2 border-black hard-shadow-sm">
                                             <h3 className="text-sm md:text-base lg:text-lg font-black text-green-700 uppercase mb-2">Survival Tip</h3>
                                             <p className="text-md md:text-xl lg:text-2xl leading-relaxed font-medium text-black">{currentItem.survivalTip}</p>
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
                         <div className="relative rounded-3xl border-4 border-black p-6 md:p-8 lg:p-10 flex flex-col gap-6 md:gap-8 transition duration-200 bg-white hard-shadow text-center items-center">
                             <Confetti />
                             <div className="text-6xl md:text-7xl animate-bounce mb-2">🎉</div>
                             
                             <div className="flex flex-col gap-2">
                               <h2 className="text-3xl md:text-4xl font-black text-black animate-pulse">
                                 Congratulation!
                               </h2>
                               <p className="text-lg text-gray-600 font-bold">You have decoded all the signals.</p>
                             </div>

                             <div className="w-full flex flex-col gap-3 mt-4">
                                <Button
                                  variant="primary"
                                  size="xl"
                                  onClick={handleRepeat}
                                  className="w-full text-xl bg-black text-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                                >
                                  Repeat
                                </Button>

                                <Button 
                                  variant="outline"
                                  size="md"
                                  onClick={handleFinish}
                                  className="w-full border-4 border-black font-black text-lg hover:bg-gray-100"
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
            <div className="grid grid-cols-2 gap-4 mt-6 pb-6">
                 <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className={`
                        py-3 px-4 rounded-xl font-bold text-lg border-2 transition-all
                        ${currentIndex === 0 
                            ? "border-transparent text-gray-300 cursor-not-allowed" 
                            : "border-black text-black bg-white hover:bg-gray-50"
                        }
                    `}
                 >
                     <div className="flex items-center gap-2 justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Prev
                     </div>
                 </button>
                 
                 {isRevealed && (
                     <button
                        onClick={handleNext}
                        className="py-3 px-4 rounded-xl font-bold text-lg border-2 border-black bg-black text-white shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                     >
                         {isLastItem ? (
                             "Finish"
                         ) : (
                             <>
                                Next 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                             </>
                         )}
                     </button>
                 )}
            </div>
        )}

      </div>
    </div>
  );
}
