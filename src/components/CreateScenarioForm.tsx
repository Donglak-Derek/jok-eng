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

export default function CreateScenarioForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<"input" | "loading" | "preview">("input");
  
  // Input State
  const [inputs, setInputs] = useState({
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
     console.log("handleSave called");
     if (!user) {
         console.error("No user found in handleSave");
         alert("You must be logged in to save.");
         return;
     }
     if (!generatedScript) {
        console.error("No generated script to save");
        return;
     }
     
     setIsSaving(true);
     try {
         console.log("Preparing to save script for user:", user.uid);
         const userScript: Omit<UserScript, "id"> = {
             ...generatedScript,
             userId: user.uid,
             createdAt: Date.now(),
             authorName: user.displayName || user.email?.split('@')[0] || "Anonymous",
             authorPhotoURL: user.photoURL || undefined,
             originalPrompt: inputs,
             isPublic: true
         };

         // Sanitize function to remove undefined values
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const sanitize = (obj: any): any => {
           return JSON.parse(JSON.stringify(obj, (key, value) => {
             return value === undefined ? null : value;
           }));
         };

         const sanitizedScript = sanitize(userScript);
         
         console.log("Saving to Firestore path:", `users/${user.uid}/scenarios`);

         // Race against a timeout
         const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Firestore write timed out (5s)")), 5000)
         );

// ... imports including setDoc
// import { collection, setDoc, doc } from "firebase/firestore"; // Already at top now

// ... inside CreateScenarioForm

         const scenariosCollectionRef = collection(db, "users", user.uid, "scenarios");
         const newScriptRef = doc(scenariosCollectionRef); // Generate ID locally
         
         const finalScript = {
             ...sanitizedScript,
             id: newScriptRef.id // Store ID in doc
         };
         
         // 1. Save the Scenario with explicit ID
         await Promise.race([
            setDoc(newScriptRef, finalScript),
            timeoutPromise
         ]);
         
         const docRef = newScriptRef; // Keep variable name for below use

         // 2. Increment User Stats
         // Note: We don't block the UI for this stat update, but we do await it to ensure consistency if possible
         try {
            const { setDoc, increment } = await import("firebase/firestore"); // Dynamic import or use existing from top
            const userRef = doc(db, "users", user.uid);
            
            // Try updating first (if doc exists), else set it
            // Simple way: setDoc with merge: true handles both creation and update
            await setDoc(userRef, {
                totalScenariosCreated: increment(1)
            }, { merge: true });
         } catch (statErr) {
            console.error("Failed to update user stats:", statErr);
            // Don't fail the whole user flow just for stats
         }

         console.log("Document written with ID: ", docRef.id);
         
         // Redirect to Home
         console.log("Redirecting to home...");
         router.push("/");
         
     } catch (error) {
         console.error("Error saving scenario:", error);
         alert(`Failed to save scenario: ${error instanceof Error ? error.message : "Unknown error"}. Check console for details.`);
         setIsSaving(false);
     }
  };

  const handleBack = () => {
    if (step === "preview") setStep("input");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
            {step === "input" && (
                <motion.div 
                    key="input"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col gap-6"
                >
                    {/* Live Preview Header */}
                    <div className="w-full aspect-[2.5/1] rounded-3xl overflow-hidden shadow-2xl border border-border/50 relative group">
                        <GenerativeCover 
                            title={inputs.context || "New Scenario"} 
                            category="Custom" 
                            className="transition-all duration-700 hover:scale-105"
                        />
                         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="bg-black/20 backdrop-blur-md text-white/90 text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                                Live Preview
                            </span>
                        </div>
                    </div>

                    <div className="relative">
                        {/* Decorative Background Blur */}
                         <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-[2.5rem] blur-xl opacity-50 pointer-events-none" />

                        <div className="bg-card/80 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-sm relative z-10">
                            {/* Unified Header */}
                            <div className="flex items-center justify-between mb-8">
                                <Link href="/" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                                    <span>←</span> Back
                                </Link>
                                <h2 className="text-xl md:text-2xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                    Director Mode
                                </h2>
                            </div>
                            
                            <div className="space-y-6">
                                {/* Context Input - The most important one */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">
                                        The Setting
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Asking for a raise, Breaking up, Ordering Pizza"
                                        className="w-full bg-secondary/30 border border-transparent focus:border-primary/50 text-foreground text-lg font-medium rounded-2xl px-5 py-4 focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-muted/40"
                                        value={inputs.context}
                                        onChange={(e) => setInputs({...inputs, context: e.target.value})}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">
                                            My Role
                                        </label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. Employee"
                                            className="w-full bg-secondary/30 border border-transparent focus:border-primary/50 text-foreground rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-muted/40"
                                            value={inputs.myRole}
                                            onChange={(e) => setInputs({...inputs, myRole: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">
                                            Their Role
                                        </label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. Boss"
                                            className="w-full bg-secondary/30 border border-transparent focus:border-primary/50 text-foreground rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-muted/40"
                                            value={inputs.otherRole}
                                            onChange={(e) => setInputs({...inputs, otherRole: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">
                                        Plot Twist / Specifics
                                    </label>
                                    <textarea 
                                        placeholder="What exactly happens? e.g. I need to explain why I'm late without sounding defensive."
                                        className="w-full bg-secondary/30 border border-transparent focus:border-primary/50 text-foreground rounded-2xl px-5 py-4 focus:ring-4 focus:ring-primary/10 outline-none transition-all h-32 resize-none placeholder:text-muted/40 leading-relaxed"
                                        value={inputs.plot}
                                        onChange={(e) => setInputs({...inputs, plot: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="mt-10">
                                <Button 
                                    onClick={handleGenerate}
                                    disabled={!inputs.context || !inputs.plot}
                                    variant="primary"
                                    size="lg"
                                    className="w-full h-14 text-lg font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    ✨ Action!
                                </Button>
                                <p className="text-center text-xs text-muted-foreground mt-4">
                                    AI Director will cast actors and write the script in ~5s
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {step === "loading" && (
                <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-20 gap-6 text-center"
                >
                    <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                    <div>
                        <h3 className="text-2xl font-bold animate-pulse">Hiring Actors...</h3>
                        <p className="text-muted">Writing script and finding translations...</p>
                    </div>
                </motion.div>
            )}

            {step === "preview" && generatedScript && (
                <motion.div 
                    key="preview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-6"
                >
                     <div className="bg-card/50 backdrop-blur border border-secondary/30 rounded-3xl p-6 md:p-8 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <Button 
                                onClick={handleBack} 
                                variant="ghost" 
                                size="sm" 
                                leftIcon={<span>←</span>}
                                className="text-muted hover:text-foreground p-0"
                            >
                                Edit
                            </Button>
                            <h2 className="text-xl md:text-2xl font-bold">Preview Scenario</h2>
                            <div className="w-8" />
                        </div>

                     <div className="space-y-4">
                        {(generatedScript.sentences || []).map((sentence, idx) => (
                            <ClozeCard 
                                key={sentence.id} 
                                sentence={sentence} 
                                index={idx} 
                                // Preview mode props
                                heard={false} 
                                onHeard={() => {}} 
                                isGlobalRevealed={true} // In preview, let's just show it? Or maybe interactive? Interactive is better.
                                isAutoPlayEnabled={false}
                                mode="standard"
                            />
                        ))}

                        {generatedScript.culturalInsights && (
                            <CulturalNoteCard 
                                title={generatedScript.culturalInsights.title}
                                content={generatedScript.culturalInsights.content}
                                onNext={() => {}} // No-op in preview
                            />
                        )}

                        {generatedScript.quizItems && generatedScript.quizItems.length > 0 && (
                            <QuizCard 
                                items={generatedScript.quizItems}
                                onFinish={() => {}} // No-op in preview
                            />
                        )}
                     </div>

                     <div className="sticky bottom-4 pt-4 bg-gradient-to-t from-background via-background/90 to-transparent">
                        <Button 
                            onClick={handleSave}
                            disabled={isSaving}
                            variant="primary"
                            size="lg"
                            className="w-full bg-green-500 hover:bg-green-600 shadow-lg border-transparent"
                        >
                            {isSaving ? "Saving..." : "💾 Save to My Scenarios"}
                        </Button>
                        
                        <div className="flex items-center justify-center gap-2 mt-2">
                             <input 
                                 type="checkbox" 
                                 id="isPublic"
                                 checked={true} // Always forced to true for now based on requirement "make user can see... and make it public"
                                 readOnly // Making it read-only true to enforce it, or we can make it state. 
                                 // Let's make it state to be polite, but default true.
                                 className="w-4 h-4 accent-primary"
                             />
                             <label htmlFor="isPublic" className="text-sm text-muted">
                                 Make Public (Visible to Community)
                             </label>
                         </div>
                     </div>
                     </div> {/* End of unified card container */}
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
}
