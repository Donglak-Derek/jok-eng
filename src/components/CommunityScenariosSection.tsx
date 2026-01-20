import { useEffect, useState } from "react";
import { collectionGroup, query, where, orderBy, limit, getDocs, getDoc, updateDoc, doc, arrayUnion, arrayRemove, increment, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserScript, UserProfile } from "@/types";
import ScenarioCard from "./ScenarioCard";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
// import { scripts } from "@/data";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function CommunityScenariosSection() {
  const [scenarios, setScenarios] = useState<UserScript[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Trending");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null); // Use full type
  const { user } = useAuth();
  const router = useRouter();

  const FILTERS = ["Trending", "Professional", "Spicy", "Funny"];

  // Fetch User Profile on Mount
  useEffect(() => {
    if (!user) return;
    getDoc(doc(db, "users", user.uid)).then(snap => {
        if (snap.exists()) setUserProfile(snap.data() as UserProfile);
    });
  }, [user]);

  // ... (Like/Share/Remix handlers remain same) ...


  const handleRemix = async (scriptId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { alert("Please login to remix scenarios!"); return; }
    const script = scenarios.find(s => s.id === scriptId);
    if (!script) return;
    const params = new URLSearchParams();
    params.set("remixTitle", script.title);
    const contextToUse = script.context || script.cleanedEnglish || "";
    params.set("remixContext", contextToUse);
    router.push(`/create-scenario?${params.toString()}`);
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

  // Fetch Logic based on Active Filter
  useEffect(() => {
    const fetchScenarios = async () => {
      setLoading(true);
      try {
        // ALWAYS fetch by createdAt first to ensure we get results (legacy docs miss 'remixCount')
        // We will sort by remixCount client-side.
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
        // Fallback or empty state
        setScenarios([]);
      } finally {
        setLoading(false);
      }
    };

    fetchScenarios();
  }, [activeFilter]);

  // Client-Side Filter & Sort
  const displayScenarios = scenarios
    .filter(s => {
      if (activeFilter === "Trending") return true;
      
      // 1. Check direct Tag match
      if (s.tone && s.tone.toLowerCase() === activeFilter.toLowerCase()) return true;

      // 2. Keyword fallback
      const text = (s.title + " " + s.cleanedEnglish + " " + (s.context || "")).toLowerCase();
      
      if (activeFilter === "Professional") {
          return ["work", "boss", "office", "salary", "interview", "job", "career", "business", "colleague", "manager", "client"].some(k => text.includes(k));
      }
      if (activeFilter === "Spicy") {
          return ["date", "flirt", "romance", "crush", "sexy", "love", "partner", "hot", "kiss", "relationship"].some(k => text.includes(k));
      }
      if (activeFilter === "Funny") {
          return ["funny", "joke", "laugh", "comedy", "prank", "silly", "weird", "hilarious", "humor", "awkward"].some(k => text.includes(k));
      }
      return true;
  })
  .sort((a, b) => { // SMART SORT
       // 1. Trending: Sort by remixCount
       if (activeFilter === "Trending") {
           return (b.remixCount || 0) - (a.remixCount || 0);
       }

       if (activeFilter !== "Professional" || !userProfile?.occupation) return 0;

       // Score Logic for Professional Feed
       const getScore = (script: UserScript) => {
           if (script.authorOccupation === userProfile.occupation) return 10; // Exact Job Match (Golden)
           // Add fuzzier logic later if needed (e.g. Category group match)
           return 0;
       };

       const scoreA = getScore(a);
       const scoreB = getScore(b);

       return scoreB - scoreA; // High score first
  });

  const handleSmartRemix = async (scriptId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    
    // Determine Adaptation Context
    let adaptType = "generic";
    let adaptTarget = "";

    if (activeFilter === "Professional" && userProfile?.occupation) {
        adaptType = "job";
        adaptTarget = userProfile.occupation;
    } else if ((activeFilter === "Funny" || activeFilter === "Spicy") && userProfile?.ageGroup) {
        // Vibe = Age Only now
        adaptType = "vibe";
        adaptTarget = `${userProfile.ageGroup}`;
    }

    if (adaptType === "generic") return; // Should not trigger if no data

    const script = scenarios.find(s => s.id === scriptId);
    if (!script) return;

    localStorage.setItem('remixSource', JSON.stringify(script));

    const params = new URLSearchParams();
    params.set("mode", "remix");
    params.set("adaptType", adaptType); // "job" or "vibe"
    params.set("adaptTo", adaptTarget); // "Chef" or "20s in London"
    router.push(`/create-scenario?${params.toString()}`);
  };

  // Helper to determine if Smart Button should show
  const canSmartRemix = (script: UserScript) => {
      // 1. Professional Context
      if (activeFilter === "Professional" && userProfile?.occupation && script.authorOccupation !== userProfile.occupation) {
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
      {/* ... keeping header same ... */}
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
                    onClick={() => setActiveFilter(f)}
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
      ) : displayScenarios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayScenarios.map((script, index) => (
                <motion.div
                    key={script.id}
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
                    />
                </motion.div>
            ))}
          </div>
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
