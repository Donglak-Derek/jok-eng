import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Session } from "@/types";

import { sessions as mockSessionData } from "@/data/sessions";
import { fixImagePath } from "@/lib/utils/image";

// Mock data generator for testing if Firestore is empty
const generateMockSessions = (): Session[] => {
    return mockSessionData.map(s => ({
        ...s,
        imageUrl: fixImagePath(s.imageUrl)
    })) as unknown as Session[];
};

export function useSessions() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSessions() {
            try {
                // Try fetching from Firestore
                const q = query(
                    collection(db, "missions"),
                    orderBy("day", "asc")
                );
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    console.log("No sessions found in DB. Loading mock data.");
                    setSessions(generateMockSessions());
                } else {
                    const fetchedSessions = querySnapshot.docs.map(doc => {
                        const data = doc.data() as Session;
                        return {
                            ...data,
                            day: data.day,
                            imageUrl: fixImagePath(data.imageUrl)
                        };
                    }) as Session[];
                    setSessions(fetchedSessions);
                }
            } catch (error) {
                console.error("Error fetching sessions, falling back to mock:", error);
                setSessions(generateMockSessions());
            } finally {
                setLoading(false);
            }
        }

        fetchSessions();
    }, []);

    return { sessions, loading };
}
