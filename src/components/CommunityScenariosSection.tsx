"use client";

import { useEffect, useState, useMemo } from "react";
import { collectionGroup, query, where, orderBy, limit, getDocs, getDoc, updateDoc, doc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserScript, UserProfile, Script } from "@/types";
import ScenarioCard from "./ScenarioCard";
import { motion } from "framer-motion";
import { useSaved } from "@/hooks/useSaved";
import { useAuth } from "@/context/AuthContext";
import { scripts as originalScripts } from "@/data";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function CommunityScenariosSection() {
  const [scenarios, setScenarios] = useState<UserScript[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Trending");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [visibleCount, setVisibleCount] = useState(12); // P1: Pagination Limit
  const { user } = useAuth();
  const router = useRouter();
  const { savedSet, toggleSave } = useSaved();

  const FILTERS = ["Trending", "Professional", "Spicy", "Funny"];

  // Fetch User Profile on Mount
  useEffect(() => {
    if (!user) return;
    getDoc(doc(db, "users", user.uid)).then(snap => {
        if (snap.exists()) setUserProfile(snap.data() as UserProfile);
    });
  }, [user]);

  const handleRemix = async (scriptId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { 
        // Force login for guests trying to remix
        router.push("/login?redirect=/create-scenario");
        return; 
    }
    
    // Check both lists
    const allScenarios = [...scenarios, ...(originalScripts as UserScript[])];
    const script = allScenarios.find(s => s.id === scriptId);
    
    if (!script) return;

    // Use LocalStorage method for reliable pre-filling (matches CreateScenarioForm logic)
    localStorage.setItem('remixSource', JSON.stringify(script));
    router.push('/create-scenario?mode=remix');
  };

  const handleShare = async (id: string) => {
     if (id.startsWith("sys-")) return;
     setScenarios(prev => prev.map(s => s.id === id ? { ...s, shares: (s.shares || 0) + 1 } : s));
     try {
         const script = scenarios.find(s => s.id === id);
         if (!script) return;
         await updateDoc(doc(db, "users", script.userId, "scenarios", id), { shares: increment(1) });
     } catch (err) { console.error("Error incrementing share:", err); }
  };

  const handleToggleSave = (scriptId: string, e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const script = displayScenarios.find(s => s.id === scriptId);
      if (script) toggleSave(script);
  };

  // Fetch Logic based on Active Filter
  useEffect(() => {
    const fetchScenarios = async () => {
      setLoading(true);
      try {
        const q = query(
            collectionGroup(db, "scenarios"),
            where("isPublic", "==", true),
            orderBy("createdAt", "desc"),
            limit(50) 
        );

        const snapshot = await getDocs(q);
        const communityDocs = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        })) as UserScript[];
        
        setScenarios(communityDocs);

      } catch (err) {
        console.error("Error fetching scenarios:", err);
        setScenarios([]);
      } finally {
        setLoading(false);
      }
    };

    fetchScenarios();
  }, [activeFilter]);

  // Client-Side Filter Logic
  const filterScript = (s: UserScript, filter: string) => {
      if (filter === "Trending") return true;
      if (s.tone && s.tone.toLowerCase() === filter.toLowerCase()) return true;

      const text = (s.title + " " + s.cleanedEnglish + " " + (s.context || "")).toLowerCase();
      
      if (filter === "Professional") {
          return ["work", "boss", "office", "salary", "interview", "job", "career", "business", "colleague", "manager", "client"].some(k => text.includes(k));
      }
      if (filter === "Spicy") {
          return ["date", "flirt", "romance", "crush", "sexy", "love", "partner", "hot", "kiss", "relationship"].some(k => text.includes(k));
      }
      if (filter === "Funny") {
          return ["funny", "joke", "laugh", "comedy", "prank", "silly", "weird", "hilarious", "humor", "awkward"].some(k => text.includes(k));
      }
      return true;
  };

  // Client-Side Sort & MIX
  const displayScenarios = useMemo(() => {
      // 1. Filter Custom Scenarios
      const filteredCustom = scenarios.filter(s => filterScript(s, activeFilter));
      
      // 2. Filter Original Scenarios
      const filteredOriginal = originalScripts.filter(s => filterScript({ ...s, authorName: "Jok-Eng Official" } as UserScript, activeFilter))
          .map(s => ({ ...s, authorName: "Jok-Eng Team" } as UserScript));

      // 3. Combine
      const combined = [...filteredCustom, ...filteredOriginal];
      
      // 4. Shuffle (Deterministic based on ID to avoid jitter, or simple seeded)
      // For now, we use a simple shuffle but since it's in useMemo it won't re-run unless dependencies change.
      // activeFilter or scenarios change -> re-shuffle.
      return combined.sort(() => Math.random() - 0.5); 
  }, [scenarios, activeFilter]);




  const visibleScenarios = displayScenarios.slice(0, visibleCount);

  const handleSmartRemix = async (scriptId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
        router.push("/login"); // Redirect to login for guests
        return;
    }
    
    let adaptType = "generic";
    let adaptTarget = "";

    if (activeFilter === "Professional" && userProfile?.occupation) {
        adaptType = "job";
        adaptTarget = userProfile.occupation;
    } else if ((activeFilter === "Funny" || activeFilter === "Spicy") && userProfile?.ageGroup) {
        adaptType = "vibe";
        adaptTarget = `${userProfile.ageGroup}`;
    }

    if (adaptType === "generic") return;

    // Find in visible list which now has both
    const script = displayScenarios.find(s => s.id === scriptId);
    if (!script) return;

    localStorage.setItem('remixSource', JSON.stringify(script));

    const params = new URLSearchParams();
    params.set("mode", "remix");
    params.set("adaptType", adaptType); 
    params.set("adaptTo", adaptTarget);
    router.push(`/create-scenario?${params.toString()}`);
  };

  // Helper to determine if Smart Button should show
  const canSmartRemix = (script: UserScript | Script) => {
      const userScript = script as UserScript;
      // 1. Professional Context
      if (activeFilter === "Professional" && userProfile?.occupation && userScript.authorOccupation !== userProfile.occupation) {
          return true;
      }
      // 2. Vibe Context (Social)
      // If user has Vibe Data (Age/Loc) and viewing Social content
      if ((activeFilter === "Funny" || activeFilter === "Spicy") && userProfile?.ageGroup) {
          return true;
      }
      return false;
  };

  return (
    <section className="w-full mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Story Feed</h2>
            <p className="text-muted-foreground text-lg">
                {activeFilter === "Trending" ? "Top rated content" : `Best in ${activeFilter}`}
                {activeFilter === "Professional" && userProfile?.occupation && (
                    <span className="ml-2 text-sm bg-primary/10 text-primary px-2 py-1 rounded-full animate-pulse">
                         ✨ Tailored for {userProfile.occupation}s
                    </span>
                )}
            </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
                <button
                    key={f}
                    onClick={() => { setActiveFilter(f); setVisibleCount(12); }}
                    className={`
                        px-4 py-1.5 rounded-full text-sm font-semibold transition-all
                        ${activeFilter === f ? "bg-foreground text-background shadow-md scale-105" : "bg-secondary text-muted-foreground hover:bg-secondary/80"}
                    `}
                >
                    {f}
                </button>
            ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : visibleScenarios.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleScenarios.map((script, index) => (
                    <motion.div
                        key={script.id + index}
                        layout 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                    >
                        <ScenarioCard 
                            script={script} 
                            index={index} 
                            onRemix={handleRemix}
                            onSmartRemix={canSmartRemix(script) ? handleSmartRemix : undefined}
                            onShare={handleShare}
                            onToggleSave={handleToggleSave}
                            isSaved={savedSet.has(script.id)}
                        />
                    </motion.div>
                ))}
            </div>
            
            {/* Load More Button */}
            {visibleCount < displayScenarios.length && (
                <div className="flex justify-center mt-12">
                    <button
                        onClick={() => setVisibleCount(prev => prev + 12)}
                        className="px-8 py-3 rounded-full bg-secondary hover:bg-secondary/80 text-foreground font-semibold transition-all shadow-sm active:scale-95"
                    >
                        Load More Stories
                    </button>
                </div>
            )}
          </>
      ) : (
          <div className="text-center py-20 bg-secondary/20 rounded-3xl border border-dashed border-border">
              <p className="text-muted-foreground text-lg">No {activeFilter.toLowerCase()} stories found yet.</p>
              <button 
                onClick={() => router.push("/create-scenario")}
                className="mt-4 text-primary font-bold hover:underline"
              >
                  Be the first to write one!
              </button>
          </div>
      )}
    </section>
  );
}
