import { useEffect, useState } from "react";
import { collectionGroup, query, where, orderBy, limit, getDocs, updateDoc, doc, arrayUnion, arrayRemove, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserScript } from "@/types";
import ScenarioCard from "./ScenarioCard";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { scripts } from "@/data";

import { useRouter } from "next/navigation";

export default function CommunityScenariosSection() {
  const [scenarios, setScenarios] = useState<UserScript[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  // Helper to shuffle array
  const shuffleArray = (array: UserScript[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleToggleLike = async (id: string) => {
    if (id.startsWith("sys-")) return; // Cannot like system scripts for now (or handle differently)
    if (!user) {
        alert("Please login to like scenarios.");
        return;
    }
    
    // ... (rest of logic same)
    
    // Optimistic Update
    setScenarios(prev => prev.map(s => {
        if (s.id !== id) return s;
        const isLiked = s.likedBy?.includes(user.uid);
        const newLikes = (s.likes || 0) + (isLiked ? -1 : 1);
        const newLikedBy = isLiked 
            ? s.likedBy?.filter(uid => uid !== user.uid) 
            : [...(s.likedBy || []), user.uid];
        return { ...s, likes: newLikes, likedBy: newLikedBy };
    }));

    try {
        const script = scenarios.find(s => s.id === id);
        if (!script) return;
        
        const scriptRef = doc(db, "users", script.userId, "scenarios", id);
        const isLiked = script.likedBy?.includes(user.uid);
        
        if (isLiked) {
             await updateDoc(scriptRef, {
                 likes: increment(-1),
                 likedBy: arrayRemove(user.uid)
             });
             const authorRef = doc(db, "users", script.userId);
             await updateDoc(authorRef, {
                 totalLikesReceived: increment(-1)
             });
        } else {
             await updateDoc(scriptRef, {
                 likes: increment(1),
                 likedBy: arrayUnion(user.uid)
             });
             const authorRef = doc(db, "users", script.userId);
             await updateDoc(authorRef, {
                 totalLikesReceived: increment(1)
             });
        }
    } catch (err) {
        console.error("Error toggling like:", err);
    }
  };

  // Feature 2: REMIX (Viral Growth) replacing Save
  const handleRemix = async (scriptId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
        alert("Please login to remix scenarios!");
        return;
    }

    const script = scenarios.find(s => s.id === scriptId);
    if (!script) return;

    // Use URL params to pass data to the Creator
    const params = new URLSearchParams();
    
    // Pass Title
    params.set("remixTitle", script.title);
    
    // Pass Context (Context for user scenarios is often just the context string)
    // For System scripts (Daily Vibe etc), it might be cleanedEnglish or context.
    const contextToUse = script.context || script.cleanedEnglish || "";
    params.set("remixContext", contextToUse);

    // Navigate to Creator
    router.push(`/create-scenario?${params.toString()}`);
  };

  const handleShare = async (id: string) => {
     if (id.startsWith("sys-")) return;
     setScenarios(prev => prev.map(s => s.id === id ? { ...s, shares: (s.shares || 0) + 1 } : s));
     try {
         const script = scenarios.find(s => s.id === id);
         if (!script) return;
         
         const scriptRef = doc(db, "users", script.userId, "scenarios", id);
         await updateDoc(scriptRef, {
             shares: increment(1)
         });
     } catch (err) {
         console.error("Error incrementing share count:", err);
     }
  };

  useEffect(() => {
    const fetchCommunityScenarios = async () => {
      try {
        const q = query(
            collectionGroup(db, "scenarios"),
            where("isPublic", "==", true),
             orderBy("createdAt", "desc"),
             limit(10)
        );

        const snapshot = await getDocs(q);
        const communityDocs = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        })) as UserScript[];
        
        // --- MIX LOGIC ---
        // Pick 5 random system scripts to mix in
        const systemScripts = scripts
            .sort(() => 0.5 - Math.random())
            .slice(0, 5)
            .map(s => ({
                ...s,
                id: `sys-${s.id}`, // Custom ID prefix
                userId: "jok-eng-official",
                authorName: "Jok-Eng Official",
                createdAt: Date.now(), // Fake timestamp for sorting interaction if needed
                isPublic: true,
                likes: 99, // Fake likes for clout?
                likedBy: [],
                originalPrompt: { context: s.cleanedEnglish, myRole: "You", otherRole: "Someone", plot: "Official Scenario" },
                imageUrl: s.imageUrl || "" // Ensure image url if available
            } as UserScript)); // Cast to conform
        
        const combined = [...communityDocs, ...systemScripts];
        // Shuffle the mixed results
        setScenarios(shuffleArray(combined));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Error fetching community scenarios:", err);
        // Fallback logic
        try {
            const fallbackQ = query(
                collectionGroup(db, "scenarios"),
                where("isPublic", "==", true),
                limit(10)
            );
            const fallbackSnap = await getDocs(fallbackQ);
            const fallbackDocs = fallbackSnap.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            })) as UserScript[];
            
             // Fallback Mix
             const systemScripts = scripts.slice(0, 5).map(s => ({
                ...s,
                id: `sys-${s.id}`,
                userId: "jok-eng-official",
                authorName: "Jok-Eng Official",
                createdAt: Date.now(),
                isPublic: true,
                likes: 42,
                likedBy: [],
                originalPrompt: { context: s.cleanedEnglish, myRole: "You", otherRole: "Someone", plot: "Official Scenario" }
            } as UserScript));
            
            const combined = [...fallbackDocs, ...systemScripts];
            setScenarios(shuffleArray(combined));

        } catch (e2) {
            console.error("Fallback failed too", e2);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityScenarios();
  }, []);

  /* Feature 3: Smart Chips (Feed Filtering) */
  const [activeFilter, setActiveFilter] = useState("Trending");
  const FILTERS = ["Trending", "Professional", "Spicy", "Funny"];

  const filteredScenarios = scenarios.filter(s => {
      if (activeFilter === "Trending") return true;
      const text = (s.title + " " + s.cleanedEnglish + " " + (s.context || "") + " " + (s.originalPrompt?.context || "")).toLowerCase();
      
      if (activeFilter === "Professional") {
          return ["work", "boss", "office", "salary", "interview", "professional", "job", "career", "client"].some(k => text.includes(k));
      }
      if (activeFilter === "Spicy") {
          return ["date", "flirt", "love", "romance", "crush", "break up", "partner", "sexy", "spicy"].some(k => text.includes(k));
      }
      if (activeFilter === "Funny") {
          return ["funny", "joke", "laugh", "comedy", "prank", "awkward", "silly"].some(k => text.includes(k));
      }
      return true;
  });

  if (loading) return null;
  // if (scenarios.length === 0) return null; // Don't return null here, empty state might be better, or just let filtered handle it.

  return (
    <section className="w-full mx-auto">
      {/* Header: Clean & Simple */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">
                Story Feed
            </h2>
            <p className="text-muted-foreground text-lg">Latest from the community</p>
        </div>
        
        {/* Smart Chips */}
        <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
                <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`
                        px-4 py-1.5 rounded-full text-sm font-semibold transition-all
                        ${activeFilter === f
                            ? "bg-foreground text-background shadow-md scale-105"
                            : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                        }
                    `}
                >
                    {f}
                </button>
            ))}
        </div>
      </div>

       {/* FEATURE 1: Daily Vibe Challenge - REMOVED (Moved to page.tsx) */}

      {filteredScenarios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredScenarios.map((script, index) => (
                <motion.div
                    key={script.id}
                    layout // Animate layout changes when filtering
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                >
                    <ScenarioCard 
                        script={script} 
                        index={index} 
                        onLike={handleToggleLike}
                        onRemix={handleRemix}
                        onShare={handleShare}
                        isLiked={user ? script.likedBy?.includes(user.uid) : false}
                    />
                </motion.div>
            ))}
          </div>
      ) : (
          <div className="text-center py-20 text-muted-foreground">
              <p>No {activeFilter.toLowerCase()} vibes found. Be the first to create one!</p>
          </div>
      )}
    </section>
  );
}
