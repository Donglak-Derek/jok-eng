import { useEffect, useState } from "react";
import { collectionGroup, query, where, orderBy, limit, getDocs, updateDoc, doc, arrayUnion, arrayRemove, increment, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserScript } from "@/types";
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
  const { user } = useAuth();
  const router = useRouter();

  const FILTERS = ["Trending", "Professional", "Spicy", "Funny"];

  const handleToggleLike = async (id: string) => {
    if (id.startsWith("sys-")) return; 
    if (!user) {
        alert("Please login to like scenarios.");
        return;
    }
    
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
        const userLikesRef = doc(db, "users", user.uid, "likes", id); // PERSONAL COLLECTION SYNC
        const isLiked = script.likedBy?.includes(user.uid);
        
        if (isLiked) {
             // Unlike
             await updateDoc(scriptRef, {
                 likes: increment(-1),
                 likedBy: arrayRemove(user.uid)
             });
             await updateDoc(doc(db, "users", script.userId), {
                 totalLikesReceived: increment(-1)
             });
             // Remove from personal likes
             await deleteDoc(userLikesRef);

        } else {
             // Like
             await updateDoc(scriptRef, {
                 likes: increment(1),
                 likedBy: arrayUnion(user.uid)
             });
             await updateDoc(doc(db, "users", script.userId), {
                 totalLikesReceived: increment(1)
             });
             // Add to personal likes
             await setDoc(userLikesRef, { 
                likedAt: Date.now(),
                scenarioId: id
             });
        }
    } catch (err) {
        console.error("Error toggling like:", err);
    }
  };

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
        let q;
        
        // "Trending" -> Sort by Likes
        if (activeFilter === "Trending") {
            q = query(
                collectionGroup(db, "scenarios"),
                where("isPublic", "==", true),
                orderBy("likes", "desc"), // Requires Index!
                // TEMPORARY FIX: Switch to 'createdAt' while 'likes' index builds
                // orderBy("createdAt", "desc"), 
                limit(20)
            );
        } 
        // Others -> Sort by Latest (then filter locally)
        else {
            q = query(
                collectionGroup(db, "scenarios"),
                where("isPublic", "==", true),
                orderBy("createdAt", "desc"),
                limit(50) // Fetch more to ensuring filtering works
            );
        }

        const snapshot = await getDocs(q);
        const communityDocs = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        })) as UserScript[];
        
        // No more mixing! Pure DB data.
        setScenarios(communityDocs);

      } catch (err) {
        console.error("Error fetching scenarios:", err);
        // Fallback for missing index
        const fallbackQ = query(collectionGroup(db, "scenarios"), where("isPublic", "==", true), limit(10));
        const snap = await getDocs(fallbackQ);
        setScenarios(snap.docs.map(d => ({ ...d.data(), id: d.id } as UserScript)));
      } finally {
        setLoading(false);
      }
    };

    fetchScenarios();
  }, [activeFilter]);

  // Client-Side Filter for Categories (until Tags are in DB)
  const displayScenarios = scenarios.filter(s => {
      if (activeFilter === "Trending") return true;
      const text = (s.title + " " + s.cleanedEnglish + " " + (s.context || "")).toLowerCase();
      
      if (activeFilter === "Professional") return ["work", "boss", "office", "salary", "interview", "job", "career", "business"].some(k => text.includes(k));
      if (activeFilter === "Spicy") return ["date", "flirt", "romance", "crush", "sexy", "love", "partner"].some(k => text.includes(k));
      if (activeFilter === "Funny") return ["funny", "joke", "laugh", "comedy", "prank", "silly", "weird"].some(k => text.includes(k));
      return true;
  });

  return (
    <section className="w-full mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Story Feed</h2>
            <p className="text-muted-foreground text-lg">
                {activeFilter === "Trending" ? "Top rated content" : `Best in ${activeFilter}`}
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
                        onLike={handleToggleLike}
                        onRemix={handleRemix}
                        onShare={handleShare}
                        isLiked={user ? script.likedBy?.includes(user.uid) : false}
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
