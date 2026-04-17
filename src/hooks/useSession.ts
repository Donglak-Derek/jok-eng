import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { Session, SessionOption } from "@/types";
import { fixImagePath } from "@/lib/utils/image";

export type { Session, SessionOption };

export function useSession(dayId: number) {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchCurrentSession() {
            setLoading(true);
            setError(null);
            try {
                const docRef = doc(db, "missions", `day_${dayId}`);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    if (isMounted) {
                        const data = docSnap.data() as Session;
                        setSession({
                            ...data,
                            imageUrl: fixImagePath(data.imageUrl)
                        });
                    }
                } else {
                    if (isMounted) {
                        setError(`Session Day ${dayId} not found in database.`);
                    }
                }

                // Prefetch logic (background)
                if (dayId < 90) {
                    const nextDocRef = doc(db, "missions", `day_${dayId + 1}`);
                    getDoc(nextDocRef).catch(e => console.error("Prefetch failed:", e)); // Silent prefetch
                }
            } catch (err: any) {
                if (isMounted) {
                    setError(err.message || "Failed to fetch session.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchCurrentSession();

        return () => {
            isMounted = false;
        };
    }, [dayId]);

    return { session, loading, error };
}
