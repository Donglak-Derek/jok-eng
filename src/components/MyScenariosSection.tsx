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
      <section className="relative overflow-hidden rounded-xl border-2 border-black bg-yellow-100 shadow-[8px_8px_0px_rgba(0,0,0,1)] px-5 md:px-8 py-8 md:py-10 mt-6 group transform rotate-1 transition-transform hover:rotate-0">
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>
        
        <div className="relative flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-1">
             <div className="bg-black text-white px-2 py-0.5 text-xs font-bold uppercase tracking-widest transform -rotate-2">
                Personalize
             </div>
          </div>
          
          <h2 className="font-sans font-black text-3xl md:text-5xl lg:text-6xl tracking-tight text-black leading-none">
             Create scenarios for <span className="text-secondary underline decoration-4 decoration-black/10">your</span> life.
          </h2>
          
          <p className="font-hand text-lg md:text-2xl text-gray-700 max-w-2xl leading-relaxed">
             From awkward tinder dates to answering &quot;What do you do?&quot;—build custom practice decks tailored to your exact situations.
          </p>
          
          <div className="pt-4">
            <Button
              onClick={() => router.push("/login")}
              className="px-8 py-6 text-xl border-2 border-black hard-shadow font-black bg-white text-black hover:bg-secondary hover:text-white"
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
    <section className="mt-4 flex flex-col gap-6">
        <div className="flex items-center justify-between border-b-2 border-black/10 pb-4">
            <h2 className="font-sans font-black text-xl md:text-3xl text-black leading-none">
                My Scenarios
            </h2>
            <Link 
                href="/create-scenario"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-black bg-white text-black text-xs font-bold hover:bg-primary hover:text-black transition-all shadow-[2px_2px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]"
            >
                <span className="text-sm leading-none font-black">＋</span> Create
            </Link>
        </div>

        {scenarios.length === 0 ? (
            <div className="p-10 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center text-center gap-4 transition-colors hover:bg-white hover:border-primary">
                <div className="w-20 h-20 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-4xl mb-1 shadow-sm">
                    📝
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-sans font-bold text-2xl text-black">Write your first script</h3>
                    <p className="font-hand text-xl text-gray-500 max-w-md mx-auto">
                        Turn your real-life awkward moments into practice gold.
                    </p>
                </div>
                <Button
                    onClick={() => router.push("/create-scenario")}
                    variant="primary"
                    size="lg"
                    className="mt-4 text-lg border-2 border-black hard-shadow font-bold"
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
