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
        <header className="sticky top-0 z-10 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-3 md:py-4 bg-white flex items-center gap-3 border-b-2 border-black shadow-sm relative">
          <Link href={`/category/${script.categorySlug}`} className="text-lg md:text-xl leading-none text-black hover:text-primary transition-colors font-black">←</Link>
          <div className="flex-1 min-w-0">
            <h1 className="headline text-2xl md:text-3xl lg:text-4xl tracking-tight text-black truncate leading-none font-black">
              {script.title}
            </h1>
            <div className="flex items-center gap-3">
              <p className="text-xs md:text-sm text-gray-600 font-bold line-clamp-1">{script.context}</p>
            </div>
          </div>
          
          {/* Full Width Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-100">
             <div 
               className="h-full bg-primary border-r-2 border-black transition-all duration-300 ease-out"
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
                    "relative rounded-3xl border-2 border-black p-6 md:p-8 lg:p-10 flex flex-col gap-6 md:gap-8 transition duration-200 bg-white hard-shadow " +
                    (speaking
                      ? "ring-4 ring-primary "
                      : "")
                  }
                >
                  <div className="flex flex-col gap-4 text-center items-center">
                    <div className="text-sm md:text-base font-black uppercase tracking-widest text-black border-2 border-black px-3 py-1 rounded-full bg-yellow-300">
                      Step {currentSegment.step}
                    </div>
                    
                    {/* Main English Text */}
                    <div className="text-xl md:text-2xl lg:text-3xl font-black leading-relaxed my-2 md:my-4 px-4 text-black">
                       &quot;{currentSegment.text}&quot;
                    </div>

                    {/* Coaching Note */}
                    <div className="w-full text-black italic text-sm md:text-lg lg:text-xl bg-gray-50 px-4 md:px-6 py-3 md:py-4 rounded-xl border-2 border-black/10 flex gap-3 items-start justify-center">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-500 flex-shrink-0">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-1.946l-.318-.08a5.972 5.972 0 01-3.606-4.996C8.076 7.376 9.924 5 12 5c2.076 0 3.924 2.376 3.924 5.979 0 2.226-1.503 4.15-3.606 4.996L12 16.054V18zm0 0v2.054a2.977 2.977 0 01-2 2.898 2.977 2.977 0 01-2-2.898V18m4 0h-4" />
                       </svg>
                       <span className="font-medium">{currentSegment.note}</span>
                    </div>
                  </div>

                  {/* Keywords (Heads Up) */}
                  {currentSegment.keywords && currentSegment.keywords.length > 0 && (
                     <div className="flex flex-wrap justify-center gap-2 mt-2 pt-4 border-t-2 border-black/5 border-dashed">
                      {currentSegment.keywords.map((k) => (
                        <span
                          key={k.word}
                          className="text-xs md:text-base px-3 md:px-4 py-1.5 rounded-xl bg-sky-100 border border-sky-200 text-sky-900 shadow-sm"
                        >
                          <span className="font-bold">{k.word}</span>
                          <span className="opacity-80 font-medium">: {k.definition}</span>
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
                     variant="primary"
                     size="md"
                     isLoading={loading}
                     className="mt-4 w-full md:w-auto self-center px-8"
                     leftIcon={
                       !loading && (
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                           <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.328l5.603 3.113z" />
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
                <div className="relative rounded-3xl border-2 border-black p-6 md:p-8 lg:p-10 flex flex-col gap-6 md:gap-8 transition duration-200 bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)] text-center items-center">
                    <Confetti />
                    <div className="text-6xl md:text-7xl animate-bounce mb-2">🎉</div>
                    
                    <div className="flex flex-col gap-2">
                      <h2 className="text-3xl md:text-4xl font-black text-black">
                        Story Complete!
                      </h2>
                      <p className="text-lg text-gray-500 font-medium">You&apos;ve mastered this flow.</p>
                    </div>

                    <div className="w-full flex flex-col gap-3 mt-4">
                       <Button
                         variant="primary"
                         size="xl"
                         onClick={handleRepeat}
                         className="w-full text-xl"
                       >
                         Repeat
                       </Button>

                       <Button 
                         variant="ghost"
                         size="md"
                         onClick={handleFinishTraining}
                         className="w-full text-sm text-gray-400 hover:text-black font-bold"
                       >
                         Finish & Return
                       </Button>
                    </div>
                </div>
             </motion.div>
           )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Bottom Action Bar */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-20">
        <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto flex items-center gap-4">
           {/* Start Over Button */}
           <Button 
             variant="ghost"
             size="sm"
             onClick={handleStartOver}
             className="text-black font-bold opacity-50 hover:opacity-100"
           >
             ↻ <span className="hidden md:inline">Restart</span>
           </Button>
           
           <div className="flex-1 flex items-center justify-end gap-3">
              {/* Previous Button */}
              {!isCompletion && (
              <Button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={`flex-1 md:flex-none border-2 transition-all font-bold ${currentStep === 0 ? 'border-transparent text-gray-300' : 'border-black text-black bg-white'}`}
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
                className="flex-1 md:flex-none md:min-w-[120px] font-bold"
              >
                {isLastSegment ? "Finish" : "Next →"}
              </Button>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
