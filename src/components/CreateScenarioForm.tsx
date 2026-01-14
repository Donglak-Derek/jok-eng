"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Script, UserScript } from "@/types";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
// For preview, we want to see sentences.
import ClozeCard from "./ClozeCard";
import { Button } from "@/components/Button";
import { GenerativeCover } from "./GenerativeCover";
import CulturalNoteCard from "./CulturalNoteCard";
import QuizCard from "./QuizCard";

interface CreateScenarioFormProps {
  initialValues?: {
    context: string;
    myRole: string;
    otherRole: string;
    plot: string;
  }
}

export default function CreateScenarioForm({ initialValues }: CreateScenarioFormProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<"input" | "loading" | "preview">("input");
  
  // Input State
  const [inputs, setInputs] = useState(initialValues || {
    context: "", // Where
    myRole: "",  // Who am I
    otherRole: "", // Who is other
    plot: "",    // What happens
  });
  const [tone, setTone] = useState("Polite");
  const [format, setFormat] = useState("Social Dojo"); // New Format State
  const [isStudyMode, setIsStudyMode] = useState(false); // New Study Mode State

  const [generatedScript, setGeneratedScript] = useState<Script | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleGenerate = async () => {
    if (!inputs.context || !inputs.plot) return;
    
    setStep("loading");
    try {
        const res = await fetch("/api/generate-scenario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...inputs,
                tone,
                format, // Pass format
                userName: user?.displayName || user?.email?.split('@')[0] || "User"
            }),
        });
        
        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.details || errData.error || "Failed to generate");
        }
        
        const data = await res.json();
        setGeneratedScript(data.script);
        setStep("preview");
        setIsStudyMode(false); // Reset to review mode on new generation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        alert(`Error: ${error.message}`);
        setStep("input");
    }
  };

  // ... (handleSave remains same) ...
  const handleSave = async () => {
     if (!user || !generatedScript) return;
     
     setIsSaving(true);
     try {
         // Sanitize function to remove undefined values
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const sanitize = (obj: any): any => {
           return JSON.parse(JSON.stringify(obj, (key, value) => {
             return value === undefined ? null : value;
           }));
         };

         const scenariosCollectionRef = collection(db, "users", user.uid, "scenarios");
         const newScriptRef = doc(scenariosCollectionRef);
         
         const userScript: Omit<UserScript, "id"> = {
             ...generatedScript,
             userId: user.uid,
             createdAt: Date.now(),
             authorName: user.displayName || user.email?.split('@')[0] || "Anonymous",
             authorPhotoURL: user.photoURL || undefined,
             originalPrompt: inputs,
             isPublic: true
         };
         
         const finalScript = {
             ...sanitize(userScript),
             id: newScriptRef.id 
         };
         
         // 1. Save the Scenario
         await setDoc(newScriptRef, finalScript);
         
         // 2. Increment User Stats (Optimistic)
         try {
            const { increment } = await import("firebase/firestore"); 
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                totalScenariosCreated: increment(1)
            }, { merge: true });
         } catch (statErr) {
            console.error("Failed to update user stats:", statErr);
         }

         router.push("/");
         
     } catch (error) {
         console.error("Error saving scenario:", error);
         alert(`Failed to save scenario.`);
         setIsSaving(false);
     }
  };

  const handleBack = () => {
    if (step === "preview") setStep("input");
  };

  // Random Placeholder
  const [placeholder, setPlaceholder] = useState("Asking my boss for a raise...");
  
  useEffect(() => {
     const prompts = [
         "Asking my boss for a raise...",
         "Breaking up with a clingy partner...",
         "Ordering a complicated coffee...",
         "Explaining a mistake to a client...",
         "Returning a meal at a restaurant...",
         "Negotiating rent with a landlord...",
         "Small talk with a stranger in an elevator..."
     ];
     setPlaceholder(prompts[Math.floor(Math.random() * prompts.length)]);
  }, []);

  const TONES = ["Polite", "Direct", "Funny", "Flirty", "Professional"];
  const FORMATS = ["Social Dojo", "Classic Script", "Rapid Fire"];

  return (
    <div className="w-full max-w-xl mx-auto py-6 px-4 md:py-10">
        <AnimatePresence mode="wait">
            {step === "input" && (
                <motion.div 
                    key="input"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex flex-col gap-6"
                >
                    {/* Inputs */}
                    <div className="space-y-6">
                        {/* The Big One - Now Standard Size */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                    What&rsquo;s happening?
                                </label>
                                <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 -mr-2">
                                    Cancel
                                </Link>
                            </div>
                            <textarea 
                                placeholder={placeholder}
                                className="w-full bg-secondary/80 hover:bg-secondary focus:bg-background border border-transparent focus:border-primary/20 rounded-lg px-4 py-3 text-base md:text-lg font-medium placeholder:text-muted-foreground/40 outline-none transition-all resize-none leading-relaxed min-h-[5rem]"
                                value={inputs.context}
                                onChange={(e) => setInputs({...inputs, context: e.target.value})}
                                autoFocus
                                rows={2}
                            />
                        </div>

                        {/* Tone Selector */}
                        <div className="space-y-2">
                             <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
                                Vibe Check
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {TONES.map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setTone(t)}
                                        className={`
                                            px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border
                                            ${tone === t 
                                                ? "bg-primary text-primary-foreground border-primary shadow-md scale-100" 
                                                : "bg-secondary/50 text-muted-foreground border-transparent hover:bg-secondary hover:text-foreground hover:border-border/50"
                                            }
                                        `}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Format Selector (New) */}
                        <div className="space-y-2">
                             <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
                                Training Style
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {FORMATS.map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setFormat(f)}
                                        className={`
                                            px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border
                                            ${format === f 
                                                ? "bg-foreground text-background border-foreground shadow-md scale-100" 
                                                : "bg-secondary/50 text-muted-foreground border-transparent hover:bg-secondary hover:text-foreground hover:border-border/50"
                                            }
                                        `}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
                                    Who are you?
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Employee"
                                    className="w-full bg-secondary/80 hover:bg-secondary focus:bg-background border border-transparent focus:border-primary/20 rounded-lg px-4 py-3 text-base font-medium placeholder:text-muted-foreground/40 outline-none transition-all"
                                    value={inputs.myRole}
                                    onChange={(e) => setInputs({...inputs, myRole: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
                                    Who are they?
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Boss"
                                    className="w-full bg-secondary/80 hover:bg-secondary focus:bg-background border border-transparent focus:border-primary/20 rounded-lg px-4 py-3 text-base font-medium placeholder:text-muted-foreground/40 outline-none transition-all"
                                    value={inputs.otherRole}
                                    onChange={(e) => setInputs({...inputs, otherRole: e.target.value})}
                                />
                            </div>
                        </div>

                        {/* Plot Twist */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
                                The Plot Twist
                            </label>
                            <textarea 
                                placeholder="I need to argue why I deserve more money..."
                                className="w-full bg-secondary/80 hover:bg-secondary focus:bg-background border border-transparent focus:border-primary/20 rounded-lg px-4 py-3 text-base font-medium placeholder:text-muted-foreground/40 outline-none transition-all h-24 resize-none leading-relaxed"
                                value={inputs.plot}
                                onChange={(e) => setInputs({...inputs, plot: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="pt-6">
                        <Button 
                            onClick={handleGenerate}
                            disabled={!inputs.context || !inputs.plot}
                            variant="primary"
                            size="lg"
                            className="w-full h-14 rounded-full text-lg font-bold shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 hover:opacity-90 active:scale-[0.98] transition-all"
                        >
                            Create Scene
                        </Button>
                    </div>
                </motion.div>
            )}

            {step === "loading" && (
                <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6"
                >
                    <div className="w-16 h-16 border-4 border-secondary border-t-foreground rounded-full animate-spin" />
                    <div>
                        <h3 className="text-xl font-medium">Directing Scene...</h3>
                        <p className="text-muted-foreground mt-2">Writing dialogue & casting roles</p>
                    </div>
                </motion.div>
            )}

            {step === "preview" && generatedScript && (
                <motion.div 
                    key="preview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    {/* Minimal Nav */}
                    <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md py-4 border-b border-border/40 -mx-4 px-4 flex items-center justify-between mb-6">
                        <Button 
                            onClick={handleBack} 
                            variant="ghost" 
                            size="sm" 
                            className="text-primary font-medium hover:bg-transparent p-0"
                        >
                            Back
                        </Button>
                        <div className="flex items-center gap-2">
                             {/* Study Mode Toggle */}
                             <button
                                onClick={() => setIsStudyMode(!isStudyMode)}
                                className={`
                                    text-xs font-semibold px-3 py-1.5 rounded-full border transition-all
                                    ${isStudyMode 
                                        ? "bg-primary text-primary-foreground border-primary" 
                                        : "bg-secondary text-muted-foreground border-transparent hover:bg-secondary/80"
                                    }
                                `}
                            >
                                {isStudyMode ? "Study Mode" : "Review Mode"}
                            </button>
                            <Button 
                                onClick={handleSave} 
                                disabled={isSaving}
                                variant="ghost"
                                size="sm"
                                className="text-primary font-bold hover:bg-transparent p-0 ml-2"
                            >
                                {isSaving ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-6 pb-20">
                         {/* Title Card */}
                         <div className="text-center space-y-2 mb-8">
                             <h2 className="text-3xl font-bold tracking-tight">{generatedScript.title}</h2>
                             <p className="text-muted-foreground">{generatedScript.cleanedEnglish}</p>
                         </div>

                        {(generatedScript.sentences || []).map((sentence, idx) => (
                            <ClozeCard 
                                key={sentence.id} 
                                sentence={sentence} 
                                index={idx} 
                                heard={false} 
                                onHeard={() => {}} 
                                isGlobalRevealed={!isStudyMode} // If Study Mode is ON, GlobalReveal is OFF (so they are hidden)
                                mode="standard"
                            />
                        ))}

                        {generatedScript.culturalInsights && (
                            <CulturalNoteCard 
                                title={generatedScript.culturalInsights.title}
                                content={generatedScript.culturalInsights.content}
                                onNext={() => {}}
                            />
                        )}

                        {generatedScript.quizItems && generatedScript.quizItems.length > 0 && (
                            <QuizCard 
                                items={generatedScript.quizItems}
                                onFinish={() => {}}
                            />
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
}
