"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { collection, query, orderBy, onSnapshot, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserScript, Script } from "@/types";
import Link from "next/link";
import ScenarioList from "@/components/ScenarioList";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

export default function CustomCategoryPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [scenarios, setScenarios] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
        setLoading(false);
        return;
    }

    const q = query(
        collection(db, "users", user.uid, "scenarios"), 
        orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id 
        })) as UserScript[];
        setScenarios(docs);
        setLoading(false);
    }, (error) => {
        console.error("Error fetching custom scenarios:", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, [user, authLoading]);

  // Loading State
  if (authLoading || loading) {
      return (
        <div className="min-h-dvh flex items-center justify-center">
             <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      );
  }

  // Not Logged In State
  if (!user) {
    return (
        <div className="min-h-dvh flex flex-col items-center justify-center gap-6 p-4 text-center">
            <h1 className="text-3xl font-bold">Custom Scenarios</h1>
            <p className="text-muted max-w-md">Please log in to view your saved scenarios.</p>
            <Button onClick={() => router.push("/login")} variant="primary">Log In</Button>
        </div>
    );
  }

  return (
    <div className="min-h-dvh text-foreground">
      <div className="max-w-md md:max-w-3xl lg:max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 flex flex-col gap-5 md:gap-6">
        
        {/* Header */}
        <header className="sticky top-0 z-10 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-3 md:py-6 lg:py-8 backdrop-blur bg-background/70 flex items-center gap-4 md:gap-6 border-b border-secondary/30 shadow-[0_10px_40px_rgba(34,19,74,0.7)]">
          <Link href="/" className="text-lg md:text-3xl lg:text-4xl leading-none text-primary drop-shadow-[0_0_18px_rgba(34,211,238,0.35)] transition-transform hover:scale-110">←</Link>
          <h1 className="headline text-2xl md:text-5xl lg:text-6xl tracking-[0.05em] bg-gradient-to-r from-tertiary via-secondary to-primary text-transparent bg-clip-text">
            My Scenarios
          </h1>
        </header>

        {/* Content */}
        {scenarios.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-6 py-20 text-center border border-dashed border-secondary/30 rounded-3xl bg-card/40">
                <div className="text-6xl">📝</div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">No scenarios yet</h2>
                    <p className="text-muted">Create your first custom scenario to see it here.</p>
                </div>
                <Button onClick={() => router.push("/create-scenario")} variant="primary">Create Scenario</Button>
            </div>
        ) : (
            <ScenarioList 
              scripts={scenarios} 
              onEdit={(id, e) => {
                e.preventDefault();
                router.push(`/scenario/${id}/edit`);
              }}
              onDelete={async (id, e) => {
                e.preventDefault();
                if (!confirm("Are you sure you want to delete this scenario?")) return;
                try {
                  await deleteDoc(doc(db, "users", user.uid, "scenarios", id));
                } catch (err) {
                  console.error("Error deleting scenario:", err);
                  alert("Failed to delete.");
                }
              }}
              onTogglePublic={async (id, current, e) => {
                e.preventDefault();
                try {
                  await updateDoc(doc(db, "users", user.uid, "scenarios", id), {
                    isPublic: !current
                  });
                } catch (err) {
                  console.error("Error toggling visibility:", err);
                  alert("Failed to update visibility.");
                }
              }}
            />
        )}
      </div>
    </div>
  );
}
