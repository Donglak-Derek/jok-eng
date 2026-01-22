"use client";

import { useEffect, useState, use } from "react";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, getDocs, collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ScriptClient from "@/app/script/[id]/ScriptClient";
import { UserScript } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { scripts } from "@/data";

type Props = { params: Promise<{ id: string }> };

export default function ScenarioPage({ params }: Props) {
  const { id } = use(params);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
    const [script, setScript] = useState<UserScript | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (authLoading) return;

        let unsubscribe: () => void;

        async function setupScenarioListener() {
            setLoading(true);
            try {
                // 0. Check Static Scripts first (Fastest) - No listener needed for static
                const staticScript = scripts.find((s) => s.id === id);
                if (staticScript) {
                    setScript({ 
                        ...staticScript, 
                        userId: "system", 
                        isPublic: true, 
                        likes: 0, 
                        createdAt: Date.now() 
                    } as unknown as UserScript);
                    setLoading(false);
                    return;
                }

                // 1. If logged in, try finding in own collection (User Custom)
                if (user) {
                    const docRef = doc(db, "users", user.uid, "scenarios", id);
                    const docSnap = await getDoc(docRef); // Check existence first to decide path
                    
                    if (docSnap.exists()) {
                        const { onSnapshot } = await import("firebase/firestore");
                        unsubscribe = onSnapshot(docRef, (snap) => {
                            if (snap.exists()) {
                                setScript({ id: snap.id, ...snap.data() } as UserScript);
                            } else {
                                // If deleted while viewing
                                setError("Scenario was deleted.");
                            }
                            setLoading(false);
                        });
                        return;
                    }
                }

                // 2. If not found yet (or guest), try searching globally (Community/Public)
                // Since community scripts are in subcollections, we need to find the specific path first
                // or continue using a query listener.
                const q = query(
                    collectionGroup(db, "scenarios"), 
                    where("id", "==", id),
                    where("isPublic", "==", true)
                );
                
                const { onSnapshot } = await import("firebase/firestore");
                unsubscribe = onSnapshot(q, (snapshot) => {
                    if (!snapshot.empty) {
                        const docSnap = snapshot.docs[0];
                        setScript({ id: docSnap.id, ...docSnap.data() } as UserScript);
                    } else {
                        // Only set error if we haven't found a script yet (and not loading initial static)
                        if (!script) setError("Scenario not found or you don't have permission.");
                    }
                    setLoading(false);
                });

            } catch (err) {
                console.error("Error setting up scenario listener:", err);
                setError("Failed to load scenario.");
                setLoading(false);
            }
        }

        setupScenarioListener();

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [user, authLoading, id]);

  if (authLoading || loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      );
  }

  // Removed the "Please Log In" block here to allow guests to view public scenarios

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
    <div className="min-h-dvh bg-background">
      <ScriptClient script={script} />
    </div>
  );
}
