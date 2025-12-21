"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Script, UserScript } from "@/types";
import { useAuth } from "@/context/AuthContext";
import ScenarioCard from "./ScenarioCard"; // Reusing existing card for preview? Or maybe simpler list.
// Actually lets reuse ScenarioList or simplified card list.
// For preview, we want to see sentences.
import SentenceCard from "./SentenceCard";

export default function CreateScenarioForm() {
  const { user } = useAuth();
  const [step, setStep] = useState<"input" | "loading" | "preview">("input");
  
  // Input State
  const [inputs, setInputs] = useState({
    context: "", // Where
    myRole: "",  // Who am I
    otherRole: "", // Who is other
    plot: "",    // What happens
  });

  const [generatedScript, setGeneratedScript] = useState<Script | null>(null);

  const handleGenerate = async () => {
    if (!inputs.context || !inputs.plot) return;
    
    setStep("loading");
    try {
        const res = await fetch("/api/generate-scenario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs),
        });
        
        if (!res.ok) throw new Error("Failed to generate");
        
        const data = await res.json();
        setGeneratedScript(data.script);
        setStep("preview");
    } catch (error) {
        console.error(error);
        setStep("input");
        // Show error toast
    }
  };

  const handleSave = async () => {
     // TODO: Save to Firestore
     console.log("Saving...", generatedScript);
     alert("Scenario Saved! (Mock)");
     // Redirect to /my-scenarios or /
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
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col gap-6"
                >
                    <div className="bg-card/50 backdrop-blur border border-secondary/30 rounded-3xl p-6 md:p-8 shadow-xl">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            🎬 <span className="bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text">Director Mode</span>
                        </h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-muted mb-1 uppercase tracking-wider">Where does it take place?</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Starbucks in New York, Business Meeting"
                                    className="w-full bg-background/50 border border-secondary/20 rounded-xl px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted/30"
                                    value={inputs.context}
                                    onChange={(e) => setInputs({...inputs, context: e.target.value})}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-muted mb-1 uppercase tracking-wider">I am...</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Angry Customer"
                                        className="w-full bg-background/50 border border-secondary/20 rounded-xl px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted/30"
                                        value={inputs.myRole}
                                        onChange={(e) => setInputs({...inputs, myRole: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-muted mb-1 uppercase tracking-wider">Other person is...</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Rude Barista"
                                        className="w-full bg-background/50 border border-secondary/20 rounded-xl px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted/30"
                                        value={inputs.otherRole}
                                        onChange={(e) => setInputs({...inputs, otherRole: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-muted mb-1 uppercase tracking-wider">The Plot (What happens?)</label>
                                <textarea 
                                    placeholder="Describe the situation in English or your language. e.g. I ordered iced coffee but got hot. I want to ask for a remake politely."
                                    className="w-full bg-background/50 border border-secondary/20 rounded-xl px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all h-32 resize-none placeholder:text-muted/30"
                                    value={inputs.plot}
                                    onChange={(e) => setInputs({...inputs, plot: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="mt-8">
                            <button 
                                onClick={handleGenerate}
                                disabled={!inputs.context || !inputs.plot}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-secondary to-primary text-white font-black text-lg tracking-widest uppercase shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ✨ Generate Scenario
                            </button>
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
                     <div className="flex items-center justify-between mb-4">
                        <button onClick={handleBack} className="text-muted hover:text-foreground transition-colors">← Edit Details</button>
                        <h2 className="text-xl font-bold">Preview</h2>
                     </div>

                     <div className="space-y-4">
                        {generatedScript.sentences.map((sentence, idx) => (
                            <SentenceCard 
                                key={sentence.id} 
                                sentence={sentence} 
                                index={idx} 
                                heard={false} 
                                onHeard={() => {}} 
                            />
                        ))}
                     </div>

                     <div className="sticky bottom-4 pt-4">
                        <button 
                            onClick={handleSave}
                            className="w-full py-4 rounded-xl bg-green-500 text-white font-black text-lg tracking-widest uppercase shadow-lg hover:bg-green-600 transition-all hover:scale-[1.01]"
                        >
                            💾 Save to My Scenarios
                        </button>
                     </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
}
