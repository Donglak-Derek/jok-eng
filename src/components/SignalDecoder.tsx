"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Script, DecoderItem } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  script: Script;
};

export default function SignalDecoder({ script }: Props) {
  const router = useRouter();
  const items = script.decoderItems || [];
  const total = items.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);

  // If no items, show error or return null
  if (total === 0) return <div>No items found.</div>;

  const currentItem = items[currentIndex];
  const isLastItem = currentIndex === total - 1;

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsRevealed(false);
    } else {
        // Finish flow - for now back to category or stay
        router.push(`/category/${script.categorySlug}`);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsRevealed(false);
    }
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


  const Spinner = () => (
    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <div className="min-h-dvh text-foreground flex flex-col bg-background">
      <div className="flex-1 max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6 w-full">
        
        {/* Header */}
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
                    style={{ width: `${((currentIndex + 1) / total) * 100}%` }} 
                />
             </div>
        </header>

        {/* Decoder Card */}
        <div className="flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentItem.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full"
                >
                    <div className="border border-secondary/30 bg-card/80 backdrop-blur rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl relative overflow-hidden">
                        
                        {/* Progress Indicator removed from here */}

                        {/* The Phrase */}
                        <div className="flex flex-col gap-3 text-center pt-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                                The Signal
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                                "{currentItem.phrase}"
                            </h2>
                            {currentItem.phraseKo && (
                                <p className="text-lg text-muted">{currentItem.phraseKo}</p>
                            )}
                            
                            {/* Audio Button */}
                             <button
                                onClick={() => speak(currentItem.phrase)}
                                className="self-center mt-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
                             >
                                {loading ? <Spinner /> : "🔊 Play Audio"}
                             </button>
                        </div>

                        <hr className="border-secondary/20" />

                        {/* Reveal Section */}
                        <div className="min-h-[300px] flex flex-col">
                            {!isRevealed ? (
                                <div className="flex-1 flex items-center justify-center py-10">
                                    <button
                                        onClick={() => setIsRevealed(true)}
                                        className="px-8 py-4 rounded-xl bg-gradient-to-r from-secondary to-primary text-white font-black text-xl uppercase tracking-widest shadow-lg hover:shadow-xl hover:scale-105 transition-all w-full md:w-auto"
                                    >
                                        🕵️ Reveal Truth
                                    </button>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col gap-6"
                                >
                                    {/* Comparison Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl bg-background/50 border border-secondary/20">
                                            <h3 className="text-sm font-bold text-muted uppercase mb-2">Literal Meaning</h3>
                                            <p className="text-lg">{currentItem.literalMeaning}</p>
                                            {currentItem.literalMeaningKo && <p className="text-sm text-muted mt-1">{currentItem.literalMeaningKo}</p>}
                                        </div>
                                        <div className="p-4 rounded-xl bg-tertiary/10 border border-tertiary/30">
                                            <h3 className="text-sm font-bold text-tertiary uppercase mb-2">Actual Meaning (Subtext)</h3>
                                            <p className="text-lg font-semibold">{currentItem.actualMeaning}</p>
                                            {currentItem.actualMeaningKo && <p className="text-sm text-muted/80 mt-1">{currentItem.actualMeaningKo}</p>}
                                        </div>
                                    </div>
                                    
                                    {/* Danger Level & Tip */}
                                    <div className="flex flex-col gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-red-400">DANGER LEVEL</span>
                                            <span className="font-black text-red-500">{currentItem.dangerLevel}</span>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                                         <h3 className="text-sm font-bold text-green-500 uppercase mb-1">Survival Tip</h3>
                                         <p className="text-md md:text-lg">{currentItem.survivalTip}</p>
                                         {currentItem.survivalTipKo && <p className="text-sm text-muted mt-1">{currentItem.survivalTipKo}</p>}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                    </div>
                </motion.div>
            </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-4">
             <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-6 py-3 rounded-xl border border-secondary/30 text-secondary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-secondary/10 transition-colors font-bold uppercase tracking-wider"
             >
                 Prev
             </button>
             
             {isRevealed && (
                 <button
                    onClick={handleNext}
                    className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold uppercase tracking-widest shadow-lg hover:shadow-cyan-500/20 hover:scale-105 transition-all"
                 >
                     {isLastItem ? "Finish" : "Next Signal →"}
                 </button>
             )}
        </div>

      </div>
    </div>
  );
}
