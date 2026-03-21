import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Mission } from "@/types";

import { missions as mockMissionData } from "@/data/missions";

// Mock data generator for testing if Firestore is empty
const generateMockMissions = (): Mission[] => {
    return mockMissionData;
};

export function useMissions() {
    const [missions, setMissions] = useState<Mission[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMissions() {
            try {
                // Try fetching from Firestore
                const q = query(
                    collection(db, "missions"),
                    orderBy("day", "asc")
                );
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    console.log("No missions found in DB. Loading mock missions.");
                    setMissions(generateMockMissions());
                } else {
                    const fetchedMissions = querySnapshot.docs.map(doc => {
                        const data = doc.data() as Mission;
                        return {
                            ...data,
                            // Ensure numeric fields are preserved
                            day: data.day,
                        };
                    }) as Mission[];
                    setMissions(fetchedMissions);
                }
            } catch (error) {
                console.error("Error fetching missions, falling back to mock:", error);
                setMissions(generateMockMissions());
            } finally {
                setLoading(false);
            }
        }

        fetchMissions();
    }, []);

    return { missions, loading };
}
