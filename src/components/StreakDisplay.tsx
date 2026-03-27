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
    const baseClasses = "flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-all duration-300";
    
    // Grit Tactical Style
    const activeStyle = "bg-primary/10 border-primary/20 shadow-[0_0_10px_rgba(var(--primary),0.1)]";
    const inactiveStyle = "bg-zinc-900 border-white/5 opacity-60";
    
    return (
        <div className={`${baseClasses} ${streak > 0 ? activeStyle : inactiveStyle} ${className}`}>
            <span className={`text-xs ${streak === 0 ? "grayscale opacity-50" : ""}`}>🏋️</span>
            <span className={`text-[11px] font-black uppercase tracking-wider ${streak > 0 ? "text-primary flex items-center gap-1" : "text-zinc-500"}`}>
                {streak}
                {streak > 0 && <span className="text-[8px] opacity-70">Day</span>}
            </span>
        </div>
    );
}
