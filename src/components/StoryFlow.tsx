"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Script } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  script: Script;
};

export default function StoryFlow({ script }: Props) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const segments = useMemo(() => script.segments || [], [script.segments]);
  const total = segments.length;
  const repeatsKey = `jokeng:repeats:${script.id}`;
  
  const [repeats, setRepeats] = useState<number>(0);

  // Load repeats
  useEffect(() => {
    const v = localStorage.getItem(repeatsKey);
    setRepeats(v ? Number(v) || 0 : 0);
  }, [repeatsKey]);
  
  // TTS State
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);

  // Completion State
  const isCompletion = currentStep === total;

  const handleNext = () => {
    if (currentStep < total) {
      setCurrentStep((prev) => prev + 1);
    } else {
       // Finish action (from Completion Card)
       // Go back to category
       router.push(`/category/${script.categorySlug}`);
    }
  };

  const handleFinishTraining = () => {
     // Save repeats
     const nextRepeats = repeats + 1;
     setRepeats(nextRepeats);
     localStorage.setItem(repeatsKey, String(nextRepeats));
     
     // Go to next
     handleNext();
  };
  
  const handleRepeat = () => {
     setCurrentStep(0);
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStartOver = () => {
    setCurrentStep(0);
  };
  
  // TTS Logic (Adapted from SentenceCard)
  const speak = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (speaking || loading) return; 

    // Speak the main text of the current segment
    const textToSpeak = segments[currentStep].text;
    setLoading(true);

    try {
      const params = new URLSearchParams({
        text: textToSpeak,
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
        
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(reject);
        }
      });
      
    } catch (error) {
       console.warn("High-quality TTS failed, falling back:", error);
       await new Promise<void>((resolve) => {
         setLoading(false);
         setSpeaking(true);
         const u = new SpeechSynthesisUtterance(textToSpeak);
         u.lang = "en-US";
         u.onend = () => resolve();
         u.onerror = () => resolve(); 
         window.speechSynthesis.speak(u);
       });
    } finally {
      setSpeaking(false);
      setLoading(false);
    }
  }, [segments, currentStep, speaking, loading]);


  // Congratulation Sound Effect
  useEffect(() => {
    if (isCompletion) {
      const audio = new Audio("/sounds/good_job.mp3");
      audio.volume = 0.5;
      audio.play().catch(e => console.log("Audio play failed (user interaction needed likely)", e));
    }
  }, [isCompletion]);


  const isLastSegment = currentStep === total - 1;
  const currentSegment = segments[currentStep];

  // Spinner Icon
  const Spinner = () => (
    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <div className="min-h-dvh text-foreground flex flex-col">
      <div className="flex-1 max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 flex flex-col gap-5 md:gap-6 w-full">
        {/* Header - Matching StandardScriptFlow */}
        <header className="sticky top-0 z-10 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-3 md:py-4 backdrop-blur bg-background/70 flex items-center gap-3 border-b border-secondary/30 shadow-[0_10px_40px_rgba(34,19,74,0.7)] relative">
          <Link href={`/category/${script.categorySlug}`} className="text-lg md:text-xl leading-none text-primary drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]">←</Link>
          <div className="flex-1 min-w-0">
            <h1 className="headline text-2xl md:text-3xl lg:text-4xl tracking-[0.05em] bg-gradient-to-r from-tertiary via-secondary to-primary text-transparent bg-clip-text truncate">
              {script.title}
            </h1>
            <div className="flex items-center gap-3">
              <p className="text-xs md:text-sm text-muted line-clamp-1">{script.context}</p>
            </div>
          </div>
          
          {/* Full Width Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary/20">
             <div 
               className="h-full bg-primary shadow-[0_0_10px_rgba(34,211,238,0.6)] transition-all duration-300 ease-out"
               style={{ width: `${(currentStep / total) * 100}%` }}
             />
          </div>
        </header>

        {/* Card Area */}
        <div className="flex-1 flex flex-col justify-center min-h-[400px]">
          <AnimatePresence mode="wait">
            {!isCompletion ? (
             <motion.div
               key={currentStep}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.3 }}
               className="w-full"
             >
                <div 
                  className={
                    "relative rounded-3xl border border-secondary/35 p-6 md:p-8 lg:p-10 flex flex-col gap-6 md:gap-8 transition duration-200 bg-card/80 shadow-[0_10px_60px_rgba(34,19,74,0.7)] " +
                    (speaking
                      ? "ring-2 ring-primary/60 shadow-[0_0_25px_rgba(34,211,238,0.35)] "
                      : "hover:border-tertiary/45 hover:shadow-[0_10px_80px_rgba(236,72,153,0.22)] ")
                  }
                >
                  <div className="flex flex-col gap-4 text-center items-center">
                    <div className="text-sm md:text-base font-bold uppercase tracking-widest text-tertiary border border-tertiary/30 px-3 py-1 rounded-full bg-tertiary/10">
                      {currentSegment.step}
                    </div>
                    
                    {/* Main English Text */}
                    <div className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed my-2 md:my-4">
                       &quot;{currentSegment.text}&quot;
                    </div>

                    {/* Coaching Note */}
                    <div className="w-full text-muted italic text-sm md:text-lg lg:text-xl bg-background/50 px-4 md:px-6 py-3 md:py-4 rounded-xl border border-primary/20 flex gap-2 items-start justify-center">
                       <span>💡</span>
                       <span>{currentSegment.note}</span>
                    </div>
                  </div>

                  {/* Keywords (Heads Up) */}
                  {currentSegment.keywords && currentSegment.keywords.length > 0 && (
                     <div className="flex flex-wrap justify-center gap-2 mt-2 pt-4 border-t border-secondary/20">
                      {currentSegment.keywords.map((k) => (
                        <span
                          key={k.word}
                          className="text-xs md:text-base px-2.5 md:px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/35 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                        >
                          <span className="font-semibold text-secondary">{k.word}</span>
                          <span className="opacity-70">: {k.definition}</span>
                        </span>
                      ))}
                     </div>
                  )}

                  {/* TTS Play Button */}
                  <button
                     onClick={(e) => {
                       e.stopPropagation();
                       speak();
                     }}
                     className="mt-2 w-full py-3 rounded-xl border-2 border-primary bg-primary/5 text-primary font-bold text-base tracking-widest uppercase shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all hover:bg-primary/10 hover:shadow-[0_0_30px_rgba(34,211,238,0.45)] active:scale-[0.98] outline-none flex justify-center items-center gap-2"
                  >
                      {loading ? <Spinner /> : (
                        <>
                           <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                             <path d="M8 5v14l11-7z" />
                           </svg>
                           <span>Play Audio</span>
                        </>
                      )}
                  </button>
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
                    <div className="text-6xl md:text-7xl animate-bounce mb-2">🎉</div>
                    
                    <div className="flex flex-col gap-2">
                      <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-secondary animate-pulse">
                        Congratulation!
                      </h2>
                      <p className="text-lg text-muted">You finished this story flow.</p>
                    </div>

                    <div className="w-full flex flex-col gap-3 mt-4">
                       <button
                         onClick={handleRepeat}
                         className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-black text-xl tracking-widest uppercase shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] active:scale-[0.98]"
                       >
                         Repeat
                       </button>

                       <button 
                         onClick={handleFinishTraining}
                         className="w-full py-3 rounded-xl border-2 border-primary/30 text-primary font-bold text-sm tracking-wider uppercase hover:bg-primary/10 hover:border-primary transition-colors"
                       >
                         Finish
                       </button>
                    </div>
                </div>
             </motion.div>
           )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Bottom Action Bar */}
      <div className="sticky bottom-0 left-0 right-0 p-4 backdrop-blur-md bg-background/80 border-t border-secondary/30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20">
        <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto flex items-center gap-4">
           {/* Start Over Button */}
           <button 
             onClick={handleStartOver}
             className="px-4 py-3 rounded-xl border border-secondary/30 text-muted bg-card/50 hover:bg-secondary/10 font-bold text-sm transition-colors"
           >
             ↻ <span className="hidden md:inline">Start Over</span>
           </button>
           
           <div className="flex-1 flex items-center gap-3">
              {/* Previous Button */}
              {!isCompletion && (
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
               className={`flex-1 px-3 py-3 rounded-xl border-2 font-bold text-xs md:text-sm tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(0,0,0,0)] ${
                 currentStep === 0 
                   ? "border-secondary/20 text-muted/30 cursor-not-allowed" 
                   : "border-secondary text-secondary hover:bg-secondary/10 hover:shadow-[0_0_20px_var(--color-secondary)] active:scale-[0.98]"
               }`}
             >
                Prev
              </button>
              )}

              {/* Next / Finish Button */}
              {!isCompletion && (
              <button
                onClick={handleNext}
                className="flex-1 px-3 py-3 rounded-xl border-2 border-primary bg-primary/10 text-primary font-bold text-xs md:text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all hover:bg-primary/20 hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] active:scale-[0.98]"
              >
                {isLastSegment ? "Next" : "Next"}
              </button>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
