import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { Mission, MissionOption } from "@/types";

export type { Mission, MissionOption };

export function useMission(dayId: number) {
    const [mission, setMission] = useState<Mission | null>(null);
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
                        setMission(docSnap.data() as Mission);
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
