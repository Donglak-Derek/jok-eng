"use client";

import { useAuth } from "@/context/AuthContext";
import { useUserProgress } from "@/hooks/useUserProgress";

interface StreakDisplayProps {
    className?: string;
}

export default function StreakDisplay({ className = "" }: StreakDisplayProps) {
    const { user } = useAuth();
    const { progress, loading } = useUserProgress(user?.uid);

    if (!user || loading || !progress) return null;

    const streak = progress.streak || 0;

    const baseClasses = "flex items-center gap-1 px-2 py-1 rounded-full border";
    // Default light mode styles if no className provided, but that's messy.
    // Let's use logic: if active, orange. if frozen, etc.
    // But for Sidebar, we might want "text-orange-400" instead of 600.
    
    // Simplest approach: Keep core logic, append className.
    const defaultStyle = streak > 0 ? "bg-indigo-50 border-indigo-100" : "bg-gray-100 border-gray-200";
    
    return (
        <div className={`${baseClasses} ${className ? className : defaultStyle}`}>
            <span className={`text-base ${streak === 0 ? "grayscale opacity-50" : ""}`}>🏋️</span>
            <span className={`text-sm font-bold ${streak > 0 ? (className ? "text-indigo-400" : "text-indigo-600") : "text-muted-foreground"}`}>{streak}</span>
        </div>
    );
}
