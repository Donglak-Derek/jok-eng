"use client";

import { useState } from "react";
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        alert(`Error: ${error.message}`);
        setStep("input");
    }
  };

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
                    className="flex flex-col gap-6 md:gap-10"
                >
                    {/* Header: Minimal & Bold */}
                    <div className="flex items-center justify-between">
                         <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Cancel
                        </Link>
                        <h1 className="text-lg font-semibold tracking-tight text-foreground">
                            New Scene
                        </h1>
                        <div className="w-10" /> {/* Spacer for balance */}
                    </div>

                    {/* Hero Preview: Clean, no heavy shadows */}
                    <div className="w-full aspect-[2/1] sm:aspect-[2.5/1] rounded-2xl overflow-hidden bg-secondary/20 relative shadow-sm">
                        {inputs.context ? (
                            <GenerativeCover 
                                title={inputs.context} 
                                category="Studio" 
                                className="w-full h-full"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-secondary/10 text-muted-foreground/30 font-medium">
                                Preview
                            </div>
                        )}
                    </div>

                    {/* Inputs: Apple-style Grouped List or Clean Fields */}
                    <div className="space-y-6 md:space-y-8">
                        {/* The Big One */}
                        <div className="space-y-3">
                            <label className="text-xl md:text-2xl font-bold tracking-tight text-foreground block">
                                What&apos;s happening?
                            </label>
                            <textarea 
                                placeholder="Asking for a raise..."
                                className="w-full bg-transparent border-b border-border/60 focus:border-foreground text-xl md:text-3xl font-medium placeholder:text-muted-foreground/20 py-2 outline-none transition-colors resize-none leading-tight"
                                value={inputs.context}
                                onChange={(e) => setInputs({...inputs, context: e.target.value})}
                                autoFocus
                                rows={2}
                            />
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                             <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    My Role
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Employee"
                                    className="w-full bg-secondary/30 rounded-lg border-none px-4 py-3 text-base md:text-lg font-medium placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    value={inputs.myRole}
                                    onChange={(e) => setInputs({...inputs, myRole: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Their Role
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Boss"
                                    className="w-full bg-secondary/30 rounded-lg border-none px-4 py-3 text-base md:text-lg font-medium placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    value={inputs.otherRole}
                                    onChange={(e) => setInputs({...inputs, otherRole: e.target.value})}
                                />
                            </div>
                        </div>

                        {/* Plot Twist */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                The Specifics
                            </label>
                            <textarea 
                                placeholder="I need to argue why I deserve more money based on my recent project success, but they are cost-cutting."
                                className="w-full bg-secondary/30 rounded-xl border-none px-4 py-4 text-base md:text-lg font-medium placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-primary/20 outline-none transition-all h-28 md:h-32 resize-none leading-relaxed"
                                value={inputs.plot}
                                onChange={(e) => setInputs({...inputs, plot: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="pt-2 md:pt-4">
                        <Button 
                            onClick={handleGenerate}
                            disabled={!inputs.context || !inputs.plot}
                            variant="primary"
                            size="lg"
                            className="w-full h-12 md:h-14 rounded-full text-base md:text-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:opacity-90 active:scale-[0.98] transition-all"
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
                        <span className="font-semibold text-sm">Preview</span>
                        <Button 
                            onClick={handleSave} 
                            disabled={isSaving}
                            variant="ghost"
                            size="sm"
                            className="text-primary font-bold hover:bg-transparent p-0"
                        >
                            {isSaving ? "Saving..." : "Save"}
                        </Button>
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
                                isGlobalRevealed={true}
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
