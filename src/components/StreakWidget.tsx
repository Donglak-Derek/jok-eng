"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Dumbbell, AlertTriangle, Zap, Swords } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getStreakStatus } from "@/lib/gamification";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function StreakWidget() {
    const { user } = useAuth();
    const { progress, loading } = useUserProgress(user?.uid);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Only run dismissal logic on mount
        const dismissed = localStorage.getItem("jokeng:streak-widget-dismissed");
        const today = new Date().toDateString();
        if (dismissed === today) {
            setIsVisible(false);
        }
    }, []);

    if (!user || loading || !isVisible || !progress) return null;

    const streak = progress.streak || 0;
    const lastPractice = progress.lastPracticeTimestamp || 0;

    const status = getStreakStatus(lastPractice);
    
    // Config based on status (Gym/Grit Rebrand)
    let title = "Training Gaining! 💪";
    let message = `You've held your grit for ${streak} days. Keep the momentum!`;
    let bgClass = "bg-gradient-to-r from-zinc-900 to-zinc-800 border-zinc-700 text-zinc-100 shadow-xl";
    let icon = <Dumbbell className="w-6 h-6 text-indigo-400 fill-indigo-400/20" />;

    if (status === "at_risk") {
        title = "Grit Fading? ⏳";
        message = "You missed a session! Train NOW to protect your consistency.";
        bgClass = "bg-gradient-to-r from-slate-900 to-indigo-950 border-indigo-500/30 text-indigo-50 shadow-2xl ring-1 ring-indigo-500/20";
        icon = <AlertTriangle className="w-6 h-6 text-yellow-500" />;
    } else if (status === "lost" && streak > 0) {
        title = "Training Interrupted 🛑";
        message = " Consistency lost. Let's restart the grind today!";
        bgClass = "bg-gradient-to-r from-zinc-950 to-slate-900 border-zinc-800 text-zinc-400 shadow-sm";
        icon = <Swords className="w-6 h-6 text-zinc-600" />;
    } else if (streak === 0) {
        title = "Initiate Training! 🚀";
        message = "Ready to build your social muscle? Start your first session.";
        bgClass = "bg-gradient-to-r from-zinc-900 to-indigo-900 border-indigo-500/20 text-indigo-100 shadow-lg";
        icon = <Zap className="w-6 h-6 text-indigo-300 fill-indigo-300/10" />;
    } else if (streak === 1) {
         title = "First Rep Done! ✨";
         message = "You started the log! Train tomorrow to cement your consistency.";
         bgClass = "bg-gradient-to-r from-indigo-900/40 to-zinc-900 border-indigo-500/20 text-indigo-50";
         icon = <Dumbbell className="w-6 h-6 text-indigo-400" />;
    } else if (streak % 10 === 0) {
        title = "Elite Status! 💎";
        message = `${streak} days of pure grit. You're becoming a social athlete.`;
        bgClass = "bg-gradient-to-r from-indigo-600 to-blue-700 border-indigo-400 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]";
        icon = <Dumbbell className="w-6 h-6 text-white fill-white/20 animate-pulse" />;
    }

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem("jokeng:streak-widget-dismissed", new Date().toDateString());
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`relative w-full rounded-2xl border p-3 md:p-4 flex items-center justify-between shadow-sm mb-0 md:mb-0 ${bgClass}`}
                >
                    <div className="flex items-center gap-4">
                        <div className="p-2 md:p-3 bg-zinc-950/40 backdrop-blur-md rounded-xl border border-white/10 shadow-inner">
                            {icon}
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm uppercase tracking-wide opacity-90">{title}</h3>
                            <p className="text-sm font-medium text-white/80">{message}</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleDismiss}
                        className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white/80"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
