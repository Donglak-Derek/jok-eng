"use client";

import { useState } from "react";
import { scripts } from "@/data";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Button } from "@/components/Button";
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react";

export default function SeedPage() {
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [log, setLog] = useState<string[]>([]);

  const handleSeed = async () => {
    setStatus("uploading");
    setLog([]);
    
    try {
        const adminId = "jok-eng-official";
        
        for (const script of scripts) {
             const docRef = doc(db, "users", adminId, "scenarios", `sys-${script.id}`);
             
             // Convert static script to UserScript format
             const data = {
                 ...script,
                 id: `sys-${script.id}`, // Maintain sys- prefix for easy ID
                 userId: adminId,
                 authorName: "Jok-Eng Official",
                 authorPhoto: "https://api.dicebear.com/9.x/notionists/svg?seed=JokEngOfficial", 
                 isPublic: true,
                 likes: 0, // Start fresh!
                 shares: 0,
                 likedBy: [],
                 createdAt: Date.now(),
                 updatedAt: Date.now(),
                 // Ensure search fields present
                 cleanTitle: script.title.toLowerCase(),
                 tags: ["official", ...(script.category.split(" "))] 
             };

             await setDoc(docRef, data, { merge: true });
             setLog(prev => [...prev, `✅ Uploaded: ${script.title}`]);
        }
        
        // Also create the User Profile for the bot
        await setDoc(doc(db, "users", adminId), {
            displayName: "Jok-Eng Official",
            photoURL: "https://api.dicebear.com/9.x/notionists/svg?seed=JokEngOfficial",
            email: "official@jokeng.com",
            totalScenariosCreated: scripts.length
        }, { merge: true });

        setStatus("done");

    } catch (err: any) {
        console.error(err);
        setStatus("error");
        setLog(prev => [...prev, `❌ Error: ${err.message}`]);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-12 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8">Database Migration Tool</h1>
        
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl w-full max-w-2xl space-y-6">
            <div className="space-y-2">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                    <AlertTriangle className="text-yellow-500" />
                    Admin Zone
                </h3>
                <p className="text-neutral-400">
                    This will upload {scripts.length} static scenarios to Firestore under the user ID <code>jok-eng-official</code>.
                </p>
            </div>

            <Button 
                onClick={handleSeed} 
                disabled={status === "uploading" || status === "done"}
                className="w-full h-12 text-lg"
            >
                {status === "uploading" ? (
                    <><Loader2 className="animate-spin mr-2" /> Uploading...</>
                ) : status === "done" ? (
                    <><CheckCircle className="mr-2" /> Upload Complete</>
                ) : (
                    "Start Migration"
                )}
            </Button>

            <div className="bg-black/50 rounded-lg p-4 h-64 overflow-y-auto font-mono text-xs text-green-400 border border-white/10">
                {log.length === 0 ? <span className="text-neutral-600">Waiting to start...</span> : log.map((l, i) => (
                    <div key={i}>{l}</div>
                ))}
            </div>
        </div>
    </div>
  );
}
