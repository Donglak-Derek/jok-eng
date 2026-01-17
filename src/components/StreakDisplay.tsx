"use client";

import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

export default function StreakDisplay() {
    const { user } = useAuth();
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        if (!user) return;
        const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
            setStreak(doc.data()?.currentStreak || 0);
        });
        return () => unsub();
    }, [user]);

    if (!user) return null;

    return (
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full border ${streak > 0 ? "bg-orange-50 border-orange-100" : "bg-gray-100 border-gray-200"}`}>
            <span className={`text-base ${streak === 0 ? "grayscale opacity-50" : ""}`}>🔥</span>
            <span className={`text-sm font-bold ${streak > 0 ? "text-orange-600" : "text-gray-500"}`}>{streak}</span>
        </div>
    );
}
