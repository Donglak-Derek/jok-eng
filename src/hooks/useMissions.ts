import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Mission } from "@/types";

import { mockMissionData } from "@/data/missionsMock";

// Mock data generator for testing if Firestore is empty
const generateMockMissions = (): Mission[] => {
    return Array.from({ length: 90 }).map((_, i) => {
        const dayNumber = i + 1;

        const actualData = mockMissionData.find(m => m.day === dayNumber);
        if (actualData) {
            return {
                id: `mission-${dayNumber}`,
                dayNumber,
                title: actualData.title,
                description: actualData.strategic_brief,
                phase: actualData.phase as any,
                isPremium: actualData.phase === 3,
            };
        }

        let phase: 1 | 2 | 3 = 1;
        if (dayNumber > 60) phase = 3;
        else if (dayNumber > 30) phase = 2;

        return {
            id: `mission-${dayNumber}`,
            dayNumber,
            title: phase === 1 ? `Mock Mission Day ${dayNumber}` : phase === 2 ? `Vibe Builder Day ${dayNumber}` : `Power Player Day ${dayNumber}`,
            description: "Complete this scenario to build your social muscles.",
            phase,
            isPremium: phase === 3,
            scriptId: `script-placeholder-${dayNumber}`
        };
    });
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
                    orderBy("dayNumber", "asc")
                );
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    console.log("No missions found in DB. Loading mock missions.");
                    setMissions(generateMockMissions());
                } else {
                    const fetchedMissions = querySnapshot.docs.map(doc => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            dayNumber: data.dayNumber || data.day,
                            title: data.title,
                            description: data.strategic_brief || "",
                            phase: data.phase || 1,
                            isPremium: data.phase === 3,
                            ...data
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
