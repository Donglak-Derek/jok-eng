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
import { Script, UserScript } from "@/types";

  export function useSaved() {
  const { user } = useAuth();
  const [savedSet, setSavedSet] = useState<Set<string>>(new Set());
  const [savedScenarios, setSavedScenarios] = useState<UserScript[]>([]); // New state
  const [loading, setLoading] = useState(true);

  // Subscribe to user's saved items
  useEffect(() => {
    if (!user) {
      setSavedSet(new Set());
      setSavedScenarios([]);
      setLoading(false);
      return;
    }

    const savedRef = collection(db, "users", user.uid, "saved");
    // Order by savedAt if possible, need index? Or just client sort. 
    // Let's rely on default order or client sort for now to avoid index hassle.
    // Actually, "orderBy('savedAt', 'desc')" is better.
    // I'll try without orderBy first to avoid "Precondition failed" index error until I can warn user.
    // Or just simple fetch.
    const unsubscribe = onSnapshot(savedRef, (snapshot) => {
      const newSet = new Set<string>();
      const newList: UserScript[] = [];
      
      snapshot.forEach((doc) => {
        newSet.add(doc.id);
        newList.push({ id: doc.id, ...doc.data() } as UserScript);
      });
      
      // Client-side sort by savedAt descending
      newList.sort((a, b) => {
         const tA = (a as any).savedAt?.seconds || 0;
         const tB = (b as any).savedAt?.seconds || 0;
         return tB - tA;
      });

      setSavedSet(newSet);
      setSavedScenarios(newList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching saved:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const toggleSave = async (script: Script) => {
    if (!user) {
      alert("Please sign in to save scenarios.");
      return;
    }

    const scenarioId = script.id;
    const isSaved = savedSet.has(scenarioId);
    const userSavedRef = doc(db, "users", user.uid, "saved", scenarioId);

    try {
        if (isSaved) {
            // UNSAVE
            await deleteDoc(userSavedRef);

            // Decrement global save count if it's a user script
            if ('userId' in script && (script as UserScript).userId) {
                const authorId = (script as UserScript).userId;
                const scenarioRef = doc(db, "users", authorId, "scenarios", scenarioId);
                await updateDoc(scenarioRef, {
                    saves: increment(-1)
                }).catch(e => console.log("Could not update analytics", e));
            }
        } else {
            // SAVE
            // We store the BASIC script info (snapshot) so we can render the card in "Saved" tab
            // without fetching the original again.
            await setDoc(userSavedRef, {
                ...script,
                savedAt: new Date(),
                originalAuthorId: 'userId' in script ? (script as UserScript).userId : 'official'
            });

            // Increment global save count
            if ('userId' in script && (script as UserScript).userId) {
                const authorId = (script as UserScript).userId;
                const scenarioRef = doc(db, "users", authorId, "scenarios", scenarioId);
                await updateDoc(scenarioRef, {
                    saves: increment(1)
                }).catch(e => console.log("Could not update analytics", e));
            }
        }
    } catch (err) {
        console.error("Failed to toggle save", err);
    }
  };

  return { savedSet, savedScenarios, toggleSave, loading };
}
