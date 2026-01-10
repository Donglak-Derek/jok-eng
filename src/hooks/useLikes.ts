"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  deleteDoc, 
  increment, 
  updateDoc 
} from "firebase/firestore";

export function useLikes() {
  const { user } = useAuth();
  const [likedSet, setLikedSet] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Subscribe to user's likes
  useEffect(() => {
    if (!user) {
      setLikedSet(new Set());
      setLoading(false);
      return;
    }

    const likesRef = collection(db, "users", user.uid, "likes");
    const unsubscribe = onSnapshot(likesRef, (snapshot) => {
      const newSet = new Set<string>();
      snapshot.forEach((doc) => {
        newSet.add(doc.id); // The doc ID is the scenario ID
      });
      setLikedSet(newSet);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching likes:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const toggleLike = async (scenarioId: string, isUserScript: boolean = false, authorId?: string) => {
    if (!user) {
      // Prompt login or handle unauth
      alert("Please sign in to like scenarios.");
      return;
    }

    // Since we are using optimistic UI updates usually, handled by components or snapshot
    // But here we perform the toggle logic
    const isLiked = likedSet.has(scenarioId);
    
    // Optimistic update (optional, but snapshot is fast usually)

    const userLikeRef = doc(db, "users", user.uid, "likes", scenarioId);

    try {
        if (isLiked) {
            // UNLIKE
            await deleteDoc(userLikeRef);

            // If it's a shared community script, decrement counter
            // We assume public scripts are under users/{authorId}/scenarios/{scenarioId}
            if (isUserScript && authorId) {
                const scenarioRef = doc(db, "users", authorId, "scenarios", scenarioId);
                await updateDoc(scenarioRef, {
                    likes: increment(-1)
                });
            }
        } else {
            // LIKE
            await setDoc(userLikeRef, {
                likedAt: new Date()
            });

            // If it's a shared community script, increment counter
            if (isUserScript && authorId) {
                const scenarioRef = doc(db, "users", authorId, "scenarios", scenarioId);
                await updateDoc(scenarioRef, {
                    likes: increment(1)
                });
            }
        }
    } catch (err) {
        console.error("Failed to toggle like", err);
        // Revert UI? Snapshot will handle it eventually, but error notification is good.
    }
  };

  return { likedSet, toggleLike, loading };
}
