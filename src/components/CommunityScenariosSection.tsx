"use client";

import { useEffect, useState } from "react";
import { collectionGroup, query, where, orderBy, limit, getDocs, collection, updateDoc, doc, arrayUnion, arrayRemove, increment, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserScript } from "@/types";
import ScenarioCard from "./ScenarioCard";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

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
        // Find the scenario to get its reference path.
        // Since we did a collectionGroup query, we don't know the exact path easily without storing 'path' or iterating.
        // BUT, we know user ID is usually in the data? OR we need the reference.
        // The `doc` object from `getDocs` has the ref. We should have stored it?
        // Wait, for `collectionGroup`, the `doc.ref` is essential.
        // I didn't store doc.ref in state. I stored data + id.
        // To update, I need the full path `users/{userId}/scenarios/{scenarioId}`.
        // Since `UserScript` has `userId`, I can construct the path!
        
        const script = scenarios.find(s => s.id === id);
        if (!script) return;
        
        const scriptRef = doc(db, "users", script.userId, "scenarios", id);
        const isLiked = script.likedBy?.includes(user.uid);
        
        if (isLiked) {
             await updateDoc(scriptRef, {
                 likes: increment(-1),
                 likedBy: arrayRemove(user.uid)
             });
             // Decrease Author's Total Likes
             const authorRef = doc(db, "users", script.userId);
             await updateDoc(authorRef, {
                 totalLikesReceived: increment(-1)
             });
        } else {
             await updateDoc(scriptRef, {
                 likes: increment(1),
                 likedBy: arrayUnion(user.uid)
             });
             // Increase Author's Total Likes
             const authorRef = doc(db, "users", script.userId);
             await updateDoc(authorRef, {
                 totalLikesReceived: increment(1)
             });
        }
    } catch (err) {
        console.error("Error toggling like:", err);
        // Revert on error? For now just log.
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
              // Create a reference for the new copy
              const scenariosRef = collection(db, "users", user.uid, "scenarios");
              const newDocRef = doc(scenariosRef);

              // Create a copy for the current user
              const newScript = {
                  ...scriptToSave,
                  id: newDocRef.id, // Store key ID in document
                  userId: user.uid,
                  createdAt: Date.now(),
                  isPublic: false, // Saved copies are private by default
                  originalAuthor: scriptToSave.authorName || "Unknown", 
                  originalScenarioId: scriptToSave.id, // Track source
                  likes: 0, // Reset likes for the copy
                  likedBy: [], // Reset likedBy
                  shares: 0,
                  saves: 0,
                  commentsCount: 0,
              };
              
              await setDoc(newDocRef, newScript);
              
              // Increment 'saves' on the ORIGINAL script
              try {
                 const originalRef = doc(db, "users", scriptToSave.userId, "scenarios", scriptToSave.id);
                 await updateDoc(originalRef, {
                     saves: increment(1)
                 });
                 // Optimistic update locally
                 setScenarios(prev => prev.map(s => s.id === id ? { ...s, saves: (s.saves || 0) + 1 } : s));
              } catch (updateErr) {
                  console.warn("Could not increment save count (likely permission)", updateErr);
              }

              alert("Saved to your scenarios!");
              // Optional: Refresh My Scenarios if valid, or just let user see it next time.
              // window.location.reload(); 
          } catch (err) {
              console.error("Error saving:", err);
              alert("Failed to save.");
          }
      }
  };

  const handleShare = async (id: string) => {
     // Optimistic update
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
        // Query across all 'scenarios' subcollections where isPublic is true
        // Note: This requires a composite index on Firestore: isPublic ASC, createdAt DESC
        // If not created, console will show a link to create it.
        const q = query(
            collectionGroup(db, "scenarios"),
            where("isPublic", "==", true),
            // We want latest first. 
            // orderBy("createdAt", "desc"), // Keeping it simple to avoid index requirement for now if possible? 
            // actually, 'where' + 'orderBy' different fields usually requires index.
            // Let's try just getting them and sorting client side if list is small, 
            // OR risking the index error (which provides a helpful link).
            // User asked to "create the section", so I'll try to do it right.
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
        // Check for permission error specifically
        if (err?.code === 'permission-denied') {
             console.warn("Permission denied. Check Firestore Security Rules.");
        }
        
        // Fallback: simple query if index is missing (often just one field works without index)
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
            // Sort client side
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

  if (loading) return null; // Or a skeleton
  if (scenarios.length === 0) return null;

  return (
    <section className="w-full max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 border-t-2 border-dashed border-black/10">
      <div className="flex items-center gap-4 mb-6 md:mb-8">
        <h2 className="font-sans font-black text-2xl md:text-4xl text-black">
            Community Scenarios
        </h2>
        <div className="bg-primary border-2 border-black text-black text-xs font-black px-3 py-1 transform -rotate-2 hard-shadow">
            HOT & NEW
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {scenarios.map((script, index) => (
            <motion.div
                key={script.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
            >
                {/* Minimal Card Render */}
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
