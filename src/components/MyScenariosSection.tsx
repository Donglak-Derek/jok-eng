"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import { UserScript } from "@/types";
import { collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ScenarioCard from "./ScenarioCard";
import { motion } from "framer-motion";

export default function MyScenariosSection() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [scenarios, setScenarios] = useState<UserScript[]>([]);

  useEffect(() => {
    if (!user) {
        setScenarios([]);
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
    }, (error) => {
        console.error("Error fetching scenarios:", error);
    });

    return () => unsubscribe();
  }, [user]);

  const handleEdit = (id: string, e: React.MouseEvent) => {
      e.preventDefault();
      router.push(`/scenario/${id}/edit`); // Redirect to edit page (if exists) or just alert for now
      // Note: User hasn't implemented full edit page yet, but let's keep the route clean.
      // If page doesn't exist, Next.js 404s. 
      // Safe fallback:
      // alert("Edit feature coming soon!");
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
      e.preventDefault();
      if (!user) return;
      if (confirm("Are you sure you want to delete this scenario?")) {
          try {
              await deleteDoc(doc(db, "users", user.uid, "scenarios", id));
          } catch (err) {
              console.error("Error deleting:", err);
              alert("Failed to delete.");
          }
      }
  };

  const handleTogglePublic = async (id: string, currentStatus: boolean, e: React.MouseEvent) => {
      e.preventDefault();
      if (!user) return;
      
      const script = scenarios.find(s => s.id === id);
      if (!script) return;

      // Duplicate Prevention Logic
      if (!currentStatus && script.originalScenarioId && !script.isRemix) {
          alert("🚫 Original Copy Detected\n\nTo prevent duplicates in the community, you cannot publish an exact copy of another user's scenario.\n\nPlease 'Like' the original to support the creator, or Edit this scenario to create a unique Remix!");
          return;
      }

      try {
          await updateDoc(doc(db, "users", user.uid, "scenarios", id), {
              isPublic: !currentStatus
          });
      } catch (err) {
          console.error("Error toggling public:", err);
          alert("Failed to update visibility.");
      }
  };

  if (loading) return null;

  // Guest View
  if (!user) {
    return (
      <section className="relative overflow-hidden rounded-3xl border border-secondary/40 bg-gradient-to-br from-card/90 to-background shadow-[0_10px_60px_rgba(34,19,74,0.5)] px-5 md:px-7 lg:px-8 py-7 md:py-9 mt-6 group">
        <div className="absolute inset-0 pointer-events-none opacity-50">
           <div className="absolute top-0 rights-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="relative flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-1">
             <span className="text-2xl md:text-4xl">✨</span>
             <p className="text-xs md:text-lg font-bold uppercase tracking-widest text-primary">
                Personalize & Practice
             </p>
          </div>
          
          <h2 className="headline text-2xl md:text-5xl lg:text-6xl tracking-wide">
             Create scenarios for <span className="text-primary italic">your</span> life.
          </h2>
          
          <p className="text-sm md:text-xl lg:text-2xl text-muted max-w-2xl leading-relaxed">
             From awkward tinder dates to answering &quot;What do you do?&quot;—build custom practice decks tailored to your exact situations.
          </p>
          
          <div className="pt-2">
            <Button
              onClick={() => router.push("/login")}
              className="px-6 md:px-8"
              variant="secondary"
              size="lg"
            >
               <span>Get Started for Free</span>
               <span className="ml-2">→</span>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Logged In View
  return (
    <section className="mt-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <Link href="/category/custom" className="group flex items-center gap-2 md:gap-4 hover:opacity-90 transition-all">
                <h2 className="headline text-xl md:text-4xl lg:text-5xl bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text cursor-pointer">
                    My Scenarios
                </h2>
                <div className="flex items-center gap-1 text-xs md:text-sm font-bold text-muted uppercase tracking-wider group-hover:text-primary transition-colors">
                    <span className="hidden md:inline opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">View All</span>
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary group-hover:bg-primary group-hover:border-primary group-hover:text-white group-active:scale-95 transition-all duration-300">
                        <svg className="w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </Link>
            <Link 
                href="/create-scenario"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs md:text-sm font-bold hover:bg-secondary/20 hover:border-secondary/50 transition-all active:scale-[0.98]"
            >
                <span className="text-base leading-none">＋</span> Create New
            </Link>
        </div>

        {scenarios.length === 0 ? (
            <div className="p-8 rounded-3xl border border-dashed border-secondary/30 bg-card/40 flex flex-col items-center justify-center text-center gap-4 transition-colors hover:bg-card/60">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-secondary/10 flex items-center justify-center text-3xl md:text-5xl mb-1">
                    📝
                </div>
                <div className="flex flex-col gap-1 md:gap-2">
                    <h3 className="text-lg md:text-3xl font-bold text-foreground">Write your first script</h3>
                    <p className="text-sm md:text-xl text-muted max-w-md mx-auto">
                        Turn your real-life awkward moments into practice gold.
                    </p>
                </div>
                <Button
                    onClick={() => router.push("/create-scenario")}
                    variant="primary"
                    size="lg"
                    className="mt-2 text-sm md:text-lg shadow-lg"
                >
                    Create Scenario
                </Button>
            </div>
        ) : (
             <div className="grid grid-cols-1 gap-4">
                {scenarios.map((script, index) => (
                    <motion.div 
                        key={script.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <ScenarioCard 
                            script={script} 
                            index={index}
                            onTogglePublic={handleTogglePublic}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </motion.div>
                ))}
            </div>
        )}
    </section>
  );
}
