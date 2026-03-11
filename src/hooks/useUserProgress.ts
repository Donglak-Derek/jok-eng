import { useState, useEffect } from "react";
import { doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserProgress } from "@/types";
import { calculatePersona } from "@/lib/persona";

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
                const newPersona = calculatePersona(vibeScore, progress.personaType);

                const updatedProgress: UserProgress = {
                    ...progress,
                    currentDay: newCurrentDay,
                    completedDays: newCompletedDays,
                    totalXP: newTotalXP,
                    personaType: newPersona
                };

                localStorage.setItem("amly_guest_progress", JSON.stringify(updatedProgress));
                setProgress(updatedProgress);
            } catch (e) {
                console.error("Failed to update guest progress in localStorage", e);
            }
            return;
        }

        try {
            const docRef = doc(db, "userProgress", uid);
            
            // Calculate new values
            const newCompletedDays = Array.from(new Set([...progress.completedDays, dayId]));
            const newTotalXP = progress.totalXP + xpGained;
            const newCurrentDay = progress.currentDay === dayId ? dayId + 1 : progress.currentDay;
            
            // Recalculate persona - pass the history of vibe scores (for MVP, we'll store vibe history here soon or derive it, 
            // but for now we just pass the new one as a mock history array or update persona separately.
            // Actually, calculatePersona can just take an average. For now let's just use the current vibeScore to nudge the persona.
            const newPersona = calculatePersona(vibeScore, progress.personaType);

            const updates: Partial<UserProgress> = {
                currentDay: newCurrentDay,
                completedDays: newCompletedDays,
                totalXP: newTotalXP,
                personaType: newPersona
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

    return { progress, loading, recordMissionSuccess };
}
