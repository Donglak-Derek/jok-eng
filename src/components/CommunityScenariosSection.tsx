"use client";

import { useEffect, useState } from "react";
import { collectionGroup, query, where, orderBy, limit, getDocs, collection, updateDoc, doc, arrayUnion, arrayRemove, increment, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserScript } from "@/types";
import ScenarioCard from "./ScenarioCard";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Flame } from "lucide-react";

export default function CommunityScenariosSection() {
  const [scenarios, setScenarios] = useState<UserScript[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const handleToggleLike = async (id: string) => {
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

  const handleSave = async (id: string) => {
      if (!user) {
          alert("Please login to save scenarios.");
          return;
      }
      const scriptToSave = scenarios.find(s => s.id === id);
      if (!scriptToSave) return;

      if (confirm(`Save "${scriptToSave.title}" to your library?`)) {
          try {
              const scenariosRef = collection(db, "users", user.uid, "scenarios");
              const newDocRef = doc(scenariosRef);

              const newScript = {
                  ...scriptToSave,
                  id: newDocRef.id,
                  userId: user.uid,
                  createdAt: Date.now(),
                  isPublic: false,
                  originalAuthor: scriptToSave.authorName || "Unknown", 
                  originalScenarioId: scriptToSave.id,
                  likes: 0,
                  likedBy: [],
                  shares: 0,
                  saves: 0,
                  commentsCount: 0,
              };
              
              await setDoc(newDocRef, newScript);
              
              try {
                 const originalRef = doc(db, "users", scriptToSave.userId, "scenarios", scriptToSave.id);
                 await updateDoc(originalRef, {
                     saves: increment(1)
                 });
                 setScenarios(prev => prev.map(s => s.id === id ? { ...s, saves: (s.saves || 0) + 1 } : s));
              } catch (updateErr) {
                  console.warn("Could not increment save count (likely permission)", updateErr);
              }

              alert("Saved to your scenarios!");
          } catch (err) {
              console.error("Error saving:", err);
              alert("Failed to save.");
          }
      }
  };

  const handleShare = async (id: string) => {
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
        const docs = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        })) as UserScript[];

        setScenarios(docs);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Error fetching community scenarios:", err);
        if (err?.code === 'permission-denied') {
             console.warn("Permission denied. Check Firestore Security Rules.");
        }
        
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
            fallbackDocs.sort((a,b) => (b.createdAt || 0) - (a.createdAt || 0));
            setScenarios(fallbackDocs);
        } catch (e2) {
            console.error("Fallback failed too", e2);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityScenarios();
  }, []);

  if (loading) return null;
  if (scenarios.length === 0) return null;

  return (
    <section className="w-full mx-auto py-4">
      <div className="flex flex-row items-center justify-between gap-3 mb-6 px-1">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Story Feed
        </h2>
        <div className="flex items-center gap-1 bg-red-50 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
            <Flame className="w-3.5 h-3.5" />
            Trending
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenarios.map((script, index) => (
            <motion.div
                key={script.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full"
            >
                <ScenarioCard 
                    script={script} 
                    index={index} 
                    onLike={handleToggleLike}
                    onSave={handleSave}
                    onShare={handleShare}
                    isLiked={user ? script.likedBy?.includes(user.uid) : false}
                />
            </motion.div>
        ))}
      </div>
    </section>
  );
}
