import { useState, useEffect } from "react";
import { collectionGroup, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Script } from "@/types";

export function useSeries(seriesId?: string, currentScriptId?: string) {
    const [episodes, setEpisodes] = useState<Script[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!seriesId) return;

        const fetchEpisodes = async () => {
            setLoading(true);
            try {
                // Query ALL scenarios with this seriesId
                // Note: This requires a composite index on [seriesId, createdAt] usually.
                // For now, clientside sorting might be safer if dataset is small, 
                // but seriesId equality is key.
                const q = query(
                    collectionGroup(db, "scenarios"),
                    where("seriesId", "==", seriesId),
                    // orderBy("createdAt", "asc") // Risk of index error. Let's sort client side for now.
                );

                const snapshot = await getDocs(q);
                const fetched: Script[] = [];
                snapshot.forEach(doc => {
                    fetched.push(doc.data() as Script);
                });

                // Sort by createdAt (assuming it exists on UserScript, or default to title?)
                // UserScript has createdAt. Public Script might not? 
                // Let's assume UserScript for now as Series are likely user-generated mainly?
                // Or just sort by title if no date.
                fetched.sort((a: any, b: any) => (a.createdAt || 0) - (b.createdAt || 0));

                setEpisodes(fetched);
            } catch (err) {
                console.error("Failed to fetch series episodes", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEpisodes();
    }, [seriesId]);

    const currentIndex = episodes.findIndex(e => e.id === currentScriptId);
    const nextEpisode = currentIndex !== -1 && currentIndex < episodes.length - 1 ? episodes[currentIndex + 1] : null;
    const prevEpisode = currentIndex > 0 ? episodes[currentIndex - 1] : null;

    return { episodes, nextEpisode, prevEpisode, loading };
}
