"use client";

import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

// ... imports

interface StreakDisplayProps {
    className?: string;
}

export default function StreakDisplay({ className = "" }: StreakDisplayProps) {
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

    const baseClasses = "flex items-center gap-1 px-2 py-1 rounded-full border";
    // Default light mode styles if no className provided, but that's messy.
    // Let's use logic: if active, orange. if frozen, etc.
    // But for Sidebar, we might want "text-orange-400" instead of 600.
    
    // Simplest approach: Keep core logic, append className.
    const defaultStyle = streak > 0 ? "bg-orange-50 border-orange-100" : "bg-gray-100 border-gray-200";
    
    return (
        <div className={`${baseClasses} ${className ? className : defaultStyle}`}>
            <span className={`text-base ${streak === 0 ? "grayscale opacity-50" : ""}`}>🔥</span>
            <span className={`text-sm font-bold ${streak > 0 ? (className ? "text-orange-400" : "text-orange-600") : "text-muted-foreground"}`}>{streak}</span>
        </div>
    );
}
