import { useState, useEffect } from "react";
import { doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserProgress } from "@/types";
import { calculatePersona } from "@/lib/persona";
import { calculateNewStreak } from "@/lib/gamification";

export function useUserProgress(uid: string | undefined) {
    const [progress, setProgress] = useState<UserProgress | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!uid) {
            // Guest mode: load from localStorage
            try {
                const stored = localStorage.getItem("amly_guest_progress");
                if (stored) {
                    setProgress(JSON.parse(stored));
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
                setProgress(docSnap.data() as UserProgress);
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
    }, [uid]);

    const recordMissionSuccess = async (dayId: number, xpGained: number, vibeScore: number) => {
        if (!progress) return;

        // Guest mode update
        if (!uid || progress.uid === "guest") {
            try {
                const newCompletedDays = Array.from(new Set([...progress.completedDays, dayId]));
                const newTotalXP = progress.totalXP + xpGained;
                const newCurrentDay = progress.currentDay === dayId ? dayId + 1 : progress.currentDay;
                const today = new Date().toISOString().split('T')[0];
                const currentLog = progress.activityLog || {};
                const newLog = { 
                    ...currentLog,
                    [today]: (currentLog[today] || 0) + 1
                };

                const newPersona = calculatePersona(vibeScore, progress.personaType);
                const { newStreak } = calculateNewStreak(progress.streak, progress.lastPracticeTimestamp || 0);
                const updatedProgress: UserProgress = {
                    ...progress,
                    currentDay: newCurrentDay,
                    completedDays: newCompletedDays,
                    totalXP: newTotalXP,
                    personaType: newPersona,
                    streak: newStreak,
                    lastPracticeTimestamp: Date.now(),
                    lastCompletedDate: new Date().toISOString(),
                    activityLog: newLog
                };

                localStorage.setItem("amly_guest_progress", JSON.stringify(updatedProgress));
                setProgress(updatedProgress);
            } catch (e) {
                console.error("Failed to update guest progress in localStorage", e);
            }
            return;
        }

        try {
            const today = new Date().toISOString().split('T')[0];
            const currentLog = progress.activityLog || {};
            const newLog = { 
                ...currentLog,
                [today]: (currentLog[today] || 0) + 1
            };

            const docRef = doc(db, "userProgress", uid);
            
            // Calculate new values
            const newCompletedDays = Array.from(new Set([...progress.completedDays, dayId]));
            const newTotalXP = progress.totalXP + xpGained;
            const newCurrentDay = progress.currentDay === dayId ? dayId + 1 : progress.currentDay;
            
            const newPersona = calculatePersona(vibeScore, progress.personaType);
            const { newStreak } = calculateNewStreak(progress.streak, progress.lastPracticeTimestamp || 0);

            const updates: Partial<UserProgress> = {
                currentDay: newCurrentDay,
                completedDays: newCompletedDays,
                totalXP: newTotalXP,
                personaType: newPersona,
                streak: newStreak,
                lastPracticeTimestamp: Date.now(),
                lastCompletedDate: new Date().toISOString(),
                activityLog: newLog
            };

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

    return { progress, loading, recordMissionSuccess, resetRoadmap };
}
