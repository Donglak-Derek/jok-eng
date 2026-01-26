"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/Button";
import Link from "next/link";
import { Script } from "@/types";

const TARGET_ID = "XIsLU5VXnUYkCaPv5KxO";

export default function FixScenarioPage() {
    const { user } = useAuth();
    const [status, setStatus] = useState("Idle");
    const [log, setLog] = useState<string[]>([]);
    const [script, setScript] = useState<Script | null>(null);

    const addLog = (msg: string) => setLog(prev => [...prev, msg]);

    const runFix = async () => {
        if (!user) {
            addLog("❌ No user logged in.");
            return;
        }

        setStatus("Running...");
        addLog(`🔍 Looking for scenario: ${TARGET_ID}`);

        try {
            const docRef = doc(db, "users", user.uid, "scenarios", TARGET_ID);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                addLog("❌ Scenario not found! Are you logged in as the correct user?");
                setStatus("Error");
                return;
            }

            const data = docSnap.data() as Script;
            setScript(data);
            addLog(`✅ Found scenario: "${data.title}"`);

            // PREPARE UPDATES
            const updatedSentences = (data.sentences || []).map(s => {
                let updated = { ...s };
                let modified = false;

                // FIX 1: The Waiter Specific Fix
                // Identify by scenario context or just generic "N/A" check?
                // The user mentioned "The Waiter interrupts..."
                
                const isWaiterScenario = s.scenario?.includes("Waiter") || s.scenario?.includes("interrupts");
                
                // FIX 1: The Waiter Specific Fix (Force Apply)
                if (isWaiterScenario) {
                     addLog(`🛠 Force-Fixing text & keywords for: "${s.scenario}"`);
                     updated.badResponse = {
                         text: "Can't you see I'm busy? Come back later.",
                         why: "It's too aggressive. While the waiter was rude, escalating the conflict makes you the 'difficult customer' and creates an awkward atmosphere."
                     };
                     updated.goodResponse = {
                         text: "I'm actually in the middle of something [urgent]. Could you give me [five minutes], please?",
                         why: "It sets a firm boundary but remains polite. Giving a specific time frame is more professional than a vague 'later'."
                     };
                     updated.keywords = [
                         { 
                             word: "urgent", 
                             definition: "Something requiring immediate attention. Using this word validates why you cannot talk right now." 
                         },
                         { 
                             word: "five minutes", 
                             definition: "A concrete time strategy. Giving a specific time (even if approximate) is much more polite than a vague 'later'." 
                         }
                     ];
                     modified = true;
                } 
                // FIX 2: Generic N/A Cleanup
                else if (s.badResponse?.text?.toLowerCase().includes("n/a") || s.goodResponse?.text?.toLowerCase().includes("n/a")) {
                    addLog(`🛠 Fixing N/A in sentence: "${s.scenario}"`);
                    if (s.badResponse?.text?.toLowerCase().includes("n/a")) {
                        updated.badResponse = {
                            text: "(Silence / Awkward Glare)",
                            why: "Responding with silence can be seen as passive-aggressive or confuse the other person."
                        };
                        modified = true;
                    }
                }
                
                // Clear Audio for all to force regen
                if (s.audioUrl) {
                    delete updated.audioUrl;
                    modified = true;
                }

                return updated;
            });

            // Perform Update
            await updateDoc(docRef, {
                sentences: updatedSentences,
                audioUrl: deleteField() // Force global audio regen
            });

            addLog("✅ Updates saved to Firestore!");
            addLog("✅ Audio links cleared (will auto-regenerate on next play).");
            setStatus("Done");

        } catch (e: any) {
            console.error(e);
            addLog(`❌ Error: ${e.message}`);
            setStatus("Error");
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold">🛠️ Scenario Fixer</h1>
            
            <div className="p-4 bg-slate-100 rounded-xl space-y-4">
                <p>Target ID: <code className="bg-slate-200 px-2 py-1 rounded">{TARGET_ID}</code></p>
                <div className="flex gap-4">
                    <Button onClick={runFix} disabled={status === "Running" || !user}>
                        {status === "Running" ? "Fixing..." : "Run Fix Script"}
                    </Button>
                    <Link href={`/scenario/${TARGET_ID}`}>
                        <Button variant="outline">View Scenario</Button>
                    </Link>
                </div>
            </div>

            <div className="bg-black text-green-400 p-4 rounded-xl font-mono text-sm min-h-[200px]">
                {log.map((l, i) => <div key={i}>{l}</div>)}
                {log.length === 0 && <span className="opacity-50">Waiting to start...</span>}
            </div>
        </div>
    );
}
