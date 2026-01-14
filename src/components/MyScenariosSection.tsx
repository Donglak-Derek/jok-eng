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
import { Plus, Bookmark } from "lucide-react";
import { useSaved } from "@/hooks/useSaved";


  /* ... imports ... */

  export default function MyScenariosSection() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [scenarios, setScenarios] = useState<UserScript[]>([]);
    const { savedScenarios } = useSaved(); // Use the hook
    const [activeTab, setActiveTab] = useState<'created' | 'saved'>('created');

    useEffect(() => {
        /* ... existing created fetch logic ... */
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

    /* ... handlers ... */
    // Handlers need to be defined here from original file
    const handleEdit = (id: string, e: React.MouseEvent) => {
      e.preventDefault();
      router.push(`/scenario/${id}/edit`);
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
    
    // Toggle public logic only works for created scenarios usually.
    // For saved scenarios, user can't toggle public/edit/delete usually (unless remix).
    const handleTogglePublic = async (id: string, currentStatus: boolean, e: React.MouseEvent) => {
      e.preventDefault();
      if (!user) return;
      
      const script = scenarios.find(s => s.id === id);
      if (!script) return;

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

    if (!user) {
        /* ... guest view ... */
        return (
            <section className="bg-secondary/30 rounded-xl p-8 md:p-12 text-center flex flex-col items-center gap-6 border border-border">
                {/* Same Guest code */}
                 <div className="max-w-2xl space-y-4">
                     <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                         Create scenarios for <span className="text-primary italic">your</span> life.
                     </h2>
                     <p className="text-lg text-muted-foreground leading-relaxed">
                         From awkward tinder dates to answering &quot;What do you do?&quot;—build custom practice decks tailored to your exact situations.
                     </p>
                 </div>
                 <Button
                     onClick={() => router.push("/login")}
                     className="px-8 py-6 text-lg rounded-full"
                     variant="primary"
                     size="lg"
                 >
                     Get Started
                 </Button>
            </section>
        );
    }
    
    const displayScenarios = activeTab === 'created' ? scenarios : savedScenarios;

    return (
        <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex gap-6">
                     <button 
                        onClick={() => setActiveTab('created')}
                        className={`text-xl md:text-2xl font-bold transition-colors ${activeTab === 'created' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                     >
                         My Scenarios
                     </button>
                     <button 
                        onClick={() => setActiveTab('saved')}
                        className={`text-xl md:text-2xl font-bold transition-colors ${activeTab === 'saved' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                     >
                         Saved
                     </button>
                </div>
                
                {activeTab === 'created' && (
                    <Link href="/create-scenario">
                        <Button size="sm" className="gap-2">
                            <Plus className="w-4 h-4" /> Create
                        </Button>
                    </Link>
                )}
            </div>

            {displayScenarios.length === 0 ? (
                <div className="py-16 text-center text-muted-foreground flex flex-col items-center gap-4 border-dashed border-2 border-border rounded-lg bg-secondary/10">
                    <div className="p-4 bg-background rounded-full border border-border">
                       {activeTab === 'created' ? <Plus className="w-8 h-8 text-primary" /> : <Bookmark className="w-8 h-8 text-primary" />}
                    </div>
                    <div>
                       <h3 className="text-lg font-semibold text-foreground">
                           {activeTab === 'created' ? 'No scenarios yet' : 'No saved scenarios'}
                       </h3>
                       <p className="max-w-xs mx-auto">
                           {activeTab === 'created' ? 'Create your first custom script to start practicing.' : 'Save scenarios from the community to practice later.'}
                       </p>
                    </div>
                    {activeTab === 'created' && (
                        <Button
                            onClick={() => router.push("/create-scenario")}
                            variant="primary"
                            className="mt-2"
                        >
                            Create Scenario
                        </Button>
                    )}
                </div>
            ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayScenarios.map((script, index) => (
                        <motion.div 
                            key={script.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <ScenarioCard 
                                script={script} 
                                index={index}
                                // Only pass edit/delete handlers if it's CREATED tab
                                onTogglePublic={activeTab === 'created' ? handleTogglePublic : undefined}
                                onEdit={activeTab === 'created' ? handleEdit : undefined}
                                onDelete={activeTab === 'created' ? handleDelete : undefined}
                                // Enable Save functionality everywhere? Yes.
                                onSave={ undefined /* ScenarioCard likely uses hook or parent, but wait, ScenarioCard uses onSave prop */ }
                                // Actually, ScenarioCard doesn't self-manage save state unless passed IS_LIKED. 
                                // But implementing save toggle inside MyScenarios list is tricky if logic is in card.
                                // I'll leave onSave undefined here for now, assuming cards in "Saved" are already saved.
                                // Users can unsave by going to the card detail.
                            />
                        </motion.div>
                    ))}
                </div>
            )}
        </section>
    );
  }
