import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Reflecting the exact JSON structure we uploaded for the 90 days
export interface MissionOption {
    id: string;
    text: string;
    vibe_score: number;
    feedback: string;
    // We can infer allow_retry or rely purely on vibe_score < 80 in UI
    allow_retry?: boolean; 
}

export interface DetailedMissionData {
    day: number;
    phase: number;
    module: string;
    title: string;
    image_description?: string;
    strategic_brief: string;
    cloze_setup: string;
    cloze_keywords: string[];
    scenario_text: string;
    options: MissionOption[];
    x_ray: string;
    imageUrl?: string;
    // Optionally might have these in older mock data formats, keep for safety
    character?: string;
    cloze_dialogue?: string;
}

export function useMission(dayId: number) {
    const [mission, setMission] = useState<DetailedMissionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchCurrentMission() {
            setLoading(true);
            setError(null);
            try {
                const docRef = doc(db, "missions", `day_${dayId}`);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    if (isMounted) {
                        setMission(docSnap.data() as DetailedMissionData);
                    }
                } else {
                    if (isMounted) {
                        setError(`Mission Day ${dayId} not found in database.`);
                    }
                }

                // Prefetch logic (background)
                if (dayId < 90) {
                    const nextDocRef = doc(db, "missions", `day_${dayId + 1}`);
                    getDoc(nextDocRef).catch(e => console.error("Prefetch failed:", e)); // Silent prefetch
                }
            } catch (err: any) {
                if (isMounted) {
                    setError(err.message || "Failed to fetch mission.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchCurrentMission();

        return () => {
            isMounted = false;
        };
    }, [dayId]);

    return { mission, loading, error };
}
