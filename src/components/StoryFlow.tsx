"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Script } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "@/components/Confetti";
import { Button } from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserScript } from "@/types";

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

  const { user } = useAuth();
  const isOwner = user && 'userId' in script && (script as UserScript).userId === user.uid;

  const handleFinishTraining = async () => {
     // Save repeats
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





  const isLastSegment = currentStep === total - 1;
  const currentSegment = segments[currentStep];



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
                    <div className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed my-2 md:my-4 px-4">
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
                  <Button
                     onClick={(e) => {
                       e.stopPropagation();
                       speak();
                     }}
                     variant="outline"
                     size="md"
                     isLoading={loading}
                     className="mt-2 w-full border-primary bg-primary/5 text-primary tracking-widest uppercase hover:bg-primary/10"
                     leftIcon={
                       !loading && (
                         <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                           <path d="M8 5v14l11-7z" />
                         </svg>
                       )
                     }
                  >
                      Play Audio
                  </Button>
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
                      <p className="text-lg text-muted">You finished this story flow.</p>
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
                         onClick={handleFinishTraining}
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
      </div>
      
      {/* Bottom Action Bar */}
      <div className="sticky bottom-0 left-0 right-0 p-4 backdrop-blur-md bg-background/80 border-t border-secondary/30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20">
        <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto flex items-center gap-4">
           {/* Start Over Button */}
           <Button 
             variant="ghost"
             size="sm"
             onClick={handleStartOver}
             className="border border-secondary/30 bg-card/50 text-muted hover:bg-secondary/10"
           >
             ↻ <span className="hidden md:inline">Start Over</span>
           </Button>
           
           <div className="flex-1 flex items-center gap-3">
              {/* Previous Button */}
              {!isCompletion && (
              <Button
                variant="outline"
                size="md"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex-1 text-secondary border-secondary/30 hover:bg-secondary/10"
              >
                Prev
              </Button>
              )}

              {/* Next / Finish Button */}
              {!isCompletion && (
              <Button
                variant="primary"
                size="md"
                onClick={handleNext}
                className="flex-1"
              >
                {isLastSegment ? "Next" : "Next"}
              </Button>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
