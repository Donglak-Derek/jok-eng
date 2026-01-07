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
import { ArrowRight, RotateCcw, Volume2, ArrowLeft, Lightbulb, ChevronLeft } from "lucide-react";

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
    <div className="min-h-screen text-foreground flex flex-col bg-background">
      <div className="flex-1 max-w-3xl mx-auto px-4 py-8 md:px-6 md:py-12 flex flex-col gap-6 md:gap-8 w-full">
        {/* Header */}
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <Link href={`/category/${script.categorySlug}`} className="text-muted-foreground hover:text-foreground transition-colors">
                  <ChevronLeft className="w-6 h-6" />
              </Link>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold tracking-tight text-foreground truncate">
                  {script.title}
                </h1>
                <p className="text-sm text-muted-foreground truncate">{script.context}</p>
              </div>
            </div>
            
             {/* Progress Bar */}
             <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                 <div 
                   className="h-full bg-primary transition-all duration-300 ease-out"
                   style={{ width: `${(currentStep / total) * 100}%` }}
                 />
            </div>
        </div>

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
                <div className="bg-white rounded-lg border border-border shadow-sm p-6 md:p-12 flex flex-col gap-6 md:gap-8">
                  <div className="flex flex-col gap-6 text-center items-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground border border-border px-3 py-1 rounded-full bg-secondary/50">
                      Step {currentSegment.step}
                    </span>
                    
                    {/* Main English Text */}
                    <div className="text-2xl md:text-3xl font-bold leading-relaxed text-foreground">
                       &quot;{currentSegment.text}&quot;
                    </div>

                    {/* Coaching Note */}
                    <div className="w-full text-foreground/80 italic text-lg bg-secondary/20 px-6 py-4 rounded-lg border border-secondary flex gap-3 items-start justify-center">
                       <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                       <span className="font-medium">{currentSegment.note}</span>
                    </div>
                  </div>

                  {/* Keywords (Heads Up) */}
                  {currentSegment.keywords && currentSegment.keywords.length > 0 && (
                     <div className="flex flex-wrap justify-center gap-2 pt-6 border-t border-border border-dashed">
                      {currentSegment.keywords.map((k) => (
                        <span
                          key={k.word}
                          className="text-sm px-3 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100"
                        >
                          <span className="font-semibold">{k.word}</span>
                          <span className="opacity-75">: {k.definition}</span>
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
                     size="lg"
                     isLoading={loading}
                     className="mt-2 w-full md:w-auto self-center"
                     leftIcon={<Volume2 className="w-5 h-5" />}
                  >
                      Play Audio
                  </Button>
                </div>
             </motion.div>
           ) : (
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
                        Story Complete!
                      </h2>
                      <p className="text-lg text-muted-foreground">You&apos;ve mastered this flow.</p>
                    </div>

                    <div className="w-full max-w-sm flex flex-col gap-3 mt-4">
                       <Button
                         variant="primary"
                         size="lg"
                         onClick={handleRepeat}
                         className="w-full"
                       >
                         Repeat
                       </Button>

                       <Button 
                         variant="ghost"
                         size="md"
                         onClick={handleFinishTraining}
                         className="w-full text-muted-foreground"
                         rightIcon={<ArrowRight className="w-4 h-4" />}
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
      {!isCompletion && (
        <div className="sticky bottom-0 left-0 right-0 p-6 bg-background border-t border-border z-20">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
             {/* Start Over Button */}
             <Button 
               variant="ghost"
               size="sm"
               onClick={handleStartOver}
               className="text-muted-foreground hover:text-foreground"
               leftIcon={<RotateCcw className="w-4 h-4" />}
             >
               Restart
             </Button>
             
             <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className={currentStep === 0 ? "invisible" : ""}
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  Prev
                </Button>

                <Button
                  variant="primary"
                  onClick={handleNext}
                  rightIcon={isLastSegment ? undefined : <ArrowRight className="w-4 h-4" />}
                >
                  {isLastSegment ? "Finish" : "Next"}
                </Button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
