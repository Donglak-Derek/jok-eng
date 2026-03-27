import { useState, useEffect, useCallback } from "react";
import { doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserProgress } from "@/types";
import { calculatePersona } from "@/lib/persona";
import { calculateNewStreak, getStreakStatus } from "@/lib/gamification";

export function useUserProgress(uid: string | undefined) {
    const [progress, setProgress] = useState<UserProgress | null>(null);
    const [loading, setLoading] = useState(true);

    const checkStreakReset = useCallback(async (currentProgress: UserProgress) => {
        if (!currentProgress.lastPracticeTimestamp) return currentProgress;
        
        const status = getStreakStatus(currentProgress.lastPracticeTimestamp);
        if (status === "lost" && currentProgress.streak > 0) {
            const updates: Partial<UserProgress> = { streak: 0 };
            
            // Update local state
            const updated = { ...currentProgress, ...updates };
            
            // Persistent update
            if (!uid || uid === "guest") {
                localStorage.setItem("amly_guest_progress", JSON.stringify(updated));
            } else {
                try {
                    await updateDoc(doc(db, "userProgress", uid), updates);
                } catch (e) {
                    console.error("Failed to reset expired streak in DB", e);
                }
            }
            return updated;
        }
        return currentProgress;
    }, [uid]);

    useEffect(() => {
        if (!uid) {
            // Guest mode: load from localStorage
            try {
                const stored = localStorage.getItem("amly_guest_progress");
                if (stored) {
                    const parsed = JSON.parse(stored) as UserProgress;
                    checkStreakReset(parsed).then(setProgress);
                } else {
                    const defaultGuestProgress: UserProgress = {
                        uid: "guest",
                        currentDay: 1,
                        completedDays: [],
                        totalXP: 0,
                        streak: 0,
                        badges: [],
                        completions: 0,
                    };
                    localStorage.setItem("amly_guest_progress", JSON.stringify(defaultGuestProgress));
                    setProgress(defaultGuestProgress);
                }
            } catch (e) {
                console.error("Failed to access localStorage for guest progress", e);
            }
            setLoading(false);
            return;
        }

        const docRef = doc(db, "userProgress", uid);
        setLoading(true);

        const unsubscribe = onSnapshot(docRef, async (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data() as UserProgress;
                const validated = await checkStreakReset(data);
                setProgress(validated);
                setLoading(false);
            } else {
                // Initialize if it doesn't exist
                const newProgress: UserProgress = {
                    uid: uid,
                    currentDay: 1,
                    completedDays: [],
                    totalXP: 0,
                    streak: 0,
                    badges: [],
                    completions: 0,
                };
                try {
                    await setDoc(docRef, newProgress);
                    setProgress(newProgress);
                } catch (e) {
                    console.error("Failed to init progress", e);
                }
                setLoading(false);
            }
        }, (error) => {
            console.error("Error listening to user progress:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [uid, checkStreakReset]);

    const recordPractice = async (xpGained: number, vibeScore: number, dayId?: number) => {
        if (!progress) return;

        const today = new Date().toISOString().split('T')[0];
        const currentLog = progress.activityLog || {};
        const newLog = { 
            ...currentLog,
            [today]: (currentLog[today] || 0) + 1
        };

        const newPersona = calculatePersona(vibeScore, progress.personaType);
        const { newStreak } = calculateNewStreak(progress.streak, progress.lastPracticeTimestamp || 0);

        const updates: Partial<UserProgress> = {
            totalXP: progress.totalXP + xpGained,
            personaType: newPersona,
            streak: newStreak,
            lastPracticeTimestamp: Date.now(),
            lastCompletedDate: new Date().toISOString(),
            activityLog: newLog
        };

        if (dayId !== undefined) {
            updates.completedDays = Array.from(new Set([...progress.completedDays, dayId]));
            updates.currentDay = progress.currentDay === dayId ? dayId + 1 : progress.currentDay;
        }

        // Guest mode update
        if (!uid || progress.uid === "guest") {
            try {
                const updatedProgress: UserProgress = {
                    ...progress,
                    ...updates
                } as UserProgress;

                localStorage.setItem("amly_guest_progress", JSON.stringify(updatedProgress));
                setProgress(updatedProgress);
            } catch (e) {
                console.error("Failed to update guest progress in localStorage", e);
            }
            return;
        }

        try {
            const docRef = doc(db, "userProgress", uid);
            await updateDoc(docRef, updates);
            setProgress({
                ...progress,
                ...updates
            } as UserProgress);
        } catch (error) {
            console.error("Failed to update mission progress", error);
        }
    };

    const resetRoadmap = async () => {
        if (!progress) return;

        const newCompletions = (progress.completions || 0) + 1;
        const updates: Partial<UserProgress> = {
            currentDay: 1,
            completedDays: [],
            completions: newCompletions
        };

        if (!uid || progress.uid === "guest") {
            const updatedProgress: UserProgress = {
                ...progress,
                ...updates
            } as UserProgress;
            localStorage.setItem("amly_guest_progress", JSON.stringify(updatedProgress));
            setProgress(updatedProgress);
            return;
        }

        try {
            const docRef = doc(db, "userProgress", uid);
            await updateDoc(docRef, updates);
            setProgress({
                ...progress,
                ...updates
            } as UserProgress);
        } catch (error) {
            console.error("Failed to reset roadmap", error);
        }
    };

    return { 
        progress, 
        loading, 
        recordPractice, 
        recordMissionSuccess: (dayId: number, xp: number, vibe: number) => recordPractice(xp, vibe, dayId),
        resetRoadmap 
    };
}
