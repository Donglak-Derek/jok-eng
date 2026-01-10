"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export type UserProgressItem = {
  repeats: number;
  lastPracticedAt: unknown; // Flexible for Date or Timestamp
};

interface ProgressContextType {
  progress: Record<string, UserProgressItem>;
  loading: boolean;
  getRepeats: (scenarioId: string) => number;
}

const ProgressContext = createContext<ProgressContextType>({
  progress: {},
  loading: true,
  getRepeats: () => 0,
});

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<Record<string, UserProgressItem>>({});
  const [loading, setLoading] = useState(true);

  // Subscribe to user's progress collection
  useEffect(() => {
    if (!user) {
      setProgress({});
      setLoading(false);
      return;
    }

    const progressRef = collection(db, "users", user.uid, "progress");
    
    // Using onSnapshot for real-time updates (important for immediate UI reflection after practice)
    const unsubscribe = onSnapshot(progressRef, (snapshot) => {
      const newProgress: Record<string, UserProgressItem> = {};
      snapshot.forEach((doc) => {
        newProgress[doc.id] = doc.data() as UserProgressItem;
      });
      setProgress(newProgress);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching progress:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const getRepeats = (scenarioId: string) => {
    // If we have firestore data, use it
    if (progress[scenarioId]) {
        return progress[scenarioId].repeats;
    }
    // Fallback to localStorage for guest or mixed usage (optional, but good for UX)
    if (typeof window !== 'undefined') {
       const key = `jokeng:repeats:${scenarioId}`;
       const local = localStorage.getItem(key);
       if (local) return parseInt(local, 10);
    }
    return 0;
  };

  return (
    <ProgressContext.Provider value={{ progress, loading, getRepeats }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => useContext(ProgressContext);
