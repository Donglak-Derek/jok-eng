"use client";

import { useEffect, useState, use } from "react";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserScript, Sentence } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import Link from "next/link";

type Props = { params: Promise<{ id: string }> };

export default function EditScenarioPage({ params }: Props) {
  const { id } = use(params);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [script, setScript] = useState<UserScript | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load Scenario
  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
        setLoading(false);
        return;
    }

    async function fetchScenario() {
        try {
            const docRef = doc(db, "users", user!.uid, "scenarios", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setScript({ id: docSnap.id, ...docSnap.data() } as UserScript);
            } else {
                setError("Scenario not found.");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to load scenario.");
        } finally {
            setLoading(false);
        }
    }

    fetchScenario();
  }, [user, authLoading, id]);

  // Handle Updates
  const handleSentenceChange = (index: number, field: keyof Sentence, value: string) => {
    if (!script) return;
    const newSentences = [...script.sentences];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (newSentences[index] as any)[field] = value;
    setScript({ ...script, sentences: newSentences });
  };

  const handleSave = async () => {
    if (!script || !user) return;
    setSaving(true);
    try {
        const docRef = doc(db, "users", user.uid, "scenarios", id);
        await updateDoc(docRef, {
            sentences: script.sentences
        });
        router.push(`/scenario/${id}`);
    } catch (err) {
        console.error("Error saving:", err);
        alert("Failed to save changes.");
    } finally {
        setSaving(false);
    }
  };


  if (authLoading || loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      );
  }

  if (!user) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center p-4">
              <h1 className="text-2xl font-bold">Please Log In</h1>
              <p>You need to be logged in to edit scenarios.</p>
              <Button onClick={() => router.push("/login")} variant="primary">Log In</Button>
          </div>
      );
  }

  if (error || !script) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center p-4">
              <h1 className="text-2xl font-bold">⚠️ Oops!</h1>
              <p className="text-muted">{error || "Something went wrong."}</p>
              <Button onClick={() => router.push("/")} variant="secondary">Go Home</Button>
          </div>
      );
  }

  return (
    <div className="min-h-dvh bg-background text-foreground pb-20">
      
      {/* Header */}
      <header className="sticky top-0 z-20 px-4 py-4 backdrop-blur-xl bg-background/80 flex items-center justify-between border-b border-white/5">
         <div className="flex items-center gap-4">
             <Link href={`/scenario/${id}`} className="text-primary hover:text-primary/80">← Cancel</Link>
             <h1 className="text-xl font-bold truncate max-w-[200px] md:max-w-md">Edit: {script.title}</h1>
         </div>
         <Button onClick={handleSave} variant="primary" disabled={saving}>
             {saving ? "Saving..." : "Save Changes"}
         </Button>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
         {script.sentences.map((sentence, index) => (
             <div key={sentence.id} className="p-4 rounded-xl border border-secondary/20 bg-card/40 flex flex-col gap-3">
                 <div className="flex justify-between items-center text-sm text-muted">
                    <span>Card {index + 1}</span>
                    <span className="bg-secondary/10 px-2 py-0.5 rounded text-xs">{sentence.scenario || "Dialogue"}</span>
                 </div>
                 
                 <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-primary uppercase tracking-wider">English Line</label>
                    <textarea 
                        value={sentence.en}
                        onChange={(e) => handleSentenceChange(index, "en", e.target.value)}
                        className="w-full bg-background/50 border border-secondary/30 rounded-lg p-3 text-lg focus:ring-2 focus:ring-primary outline-none"
                        rows={2}
                    />
                 </div>

                 {/* Optional: Add editing for definitions if really needed later, but sticking to basics first */}
             </div>
         ))}
      </div>

    </div>
  );
}
