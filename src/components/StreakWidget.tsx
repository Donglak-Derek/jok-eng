"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Flame, AlertTriangle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getStreakStatus } from "@/lib/gamification";

export default function StreakWidget() {
    const { user } = useAuth();
    const [isVisible, setIsVisible] = useState(true);
    const [streak, setStreak] = useState(0);
    const [lastPractice, setLastPractice] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || !user.uid) return;
        
        async function fetchStreak() {
            if (!user) return; // double check for type safety within async
            try {
                const ref = doc(db, "users", user.uid);
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    const data = snap.data();
                    setStreak(data.currentStreak || 0);
                    setLastPractice(data.lastPracticeTimestamp || 0);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }

        // Check local dismissal
        const dismissed = localStorage.getItem("jokeng:streak-widget-dismissed");
        const today = new Date().toDateString();
        
        // If dismissed today, don't show. If dismissed yesterday, show again.
        // Logic: "Once a day"
        if (dismissed === today) {
            setIsVisible(false);
        }
        // Implicitly: if dismissed !== today (e.g. was null or yesterday), isVisible stays true.

        fetchStreak();
    }, [user]);

    if (!user || loading || !isVisible) return null;

    const status = getStreakStatus(lastPractice);
    
    // Config based on status
    let title = "Keep the flame alive! 🔥";
    let message = `You're on a ${streak} day streak. Practice today to keep it going!`;
    let bgClass = "bg-gradient-to-r from-orange-100 to-red-50 border-orange-200";
    let icon = <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />;

    if (status === "at_risk") {
        title = "Streak Frozen! ❄️";
        message = "You missed yesterday! Practice NOW to save your streak.";
        bgClass = "bg-gradient-to-r from-blue-100 to-cyan-50 border-blue-200";
        icon = <AlertTriangle className="w-6 h-6 text-blue-500" />;
    } else if (status === "lost" && streak > 0) {
        title = "Streak Extinguished 💨";
        message = "It's been over 48h. Practice to start a fresh fire!";
        bgClass = "bg-gradient-to-r from-gray-100 to-slate-50 border-gray-200";
        icon = <Flame className="w-6 h-6 text-gray-400" />;
    } else if (streak === 0) {
        title = "Start a Streak! 🚀";
        message = "Practice today to light the fire!";
        bgClass = "bg-gradient-to-r from-yellow-50 to-orange-50 border-orange-100";
        icon = <Flame className="w-6 h-6 text-gray-300" />;
    } else if (streak === 1) {
         title = "Flame Ignited! 🔥";
         message = "You started! Practice tomorrow (within 24h) to build the fire.";
         bgClass = "bg-gradient-to-r from-orange-100 to-red-50 border-orange-200";
         icon = <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />;
    } else if (streak % 10 === 0) {
        title = "Milestone Reached! 🎉";
        message = `${streak} days of fire! You are unstoppable.`;
        bgClass = "bg-gradient-to-r from-purple-100 to-pink-50 border-purple-200";
        icon = <Flame className="w-6 h-6 text-purple-500 fill-purple-500 animate-pulse" />;
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
                        <div className="p-2 md:p-3 bg-white/80 backdrop-blur rounded-full shadow-sm">
                            {icon}
                        </div>
                        <div>
                            <h3 className="font-bold text-foreground text-sm uppercase tracking-wide opacity-90">{title}</h3>
                            <p className="text-sm font-medium text-foreground">{message}</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleDismiss}
                        className="p-1.5 hover:bg-black/5 rounded-full transition-colors text-muted-foreground"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
