"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Category } from "@/types";
import { categories as defaultCategories } from "@/data";

export function useCategories() {
    // Start with the default hardcoded categories to eliminate loading time flashes and layout shifts
    const [categories, setCategories] = useState<Category[]>(defaultCategories);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const q = query(collection(db, "categories"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedCategories: Category[] = [];
            snapshot.forEach((doc) => {
                fetchedCategories.push({
                    slug: doc.id,
                    ...doc.data()
                } as Category);
            });

            // If empty, keep the fallback defaults intact
            if (fetchedCategories.length > 0) {
                // Sort to keep American Culture at the end
                fetchedCategories.sort((a, b) => {
                    if (a.slug === "american_culture") return 1;
                    if (b.slug === "american_culture") return -1;
                    return 0; // Keep original order for the rest
                });
                setCategories(fetchedCategories);
            }
            setLoading(false);
        }, (err) => {
            console.error("Error fetching categories:", err);
            setError(err);
            setLoading(false);
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, []);

    return { categories, loading, error };
}
