"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Sparkles, TrendingUp } from "lucide-react";
import { scripts } from "@/data";
import { Button } from "@/components/Button";
import { useDailyProgress } from "@/hooks/useDailyProgress";
import { useAuth } from "@/context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import THEME_MAP from "@/lib/themeMap"; // We will extract the Theme Map from CategoryHero so both can use it

export default function DailyScenarioCard() {
    const { user } = useAuth();
    const scriptIds = useMemo(() => scripts.map(s => s.id), []);
    const { completedIds } = useDailyProgress(scriptIds);
    const [progressMap, setProgressMap] = useState<Record<string, { repeats: number, lastPlayed: number }>>({});
    const [mounted, setMounted] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // 1. Fetch Global/Personal Progress
    useEffect(() => {
        if (!user) return;

        const fetchProgress = async () => {
            try {
                const progressRef = collection(db, "users", user.uid, "progress");
                const snapshot = await getDocs(progressRef);

                const map: Record<string, { repeats: number, lastPlayed: number }> = {};
                snapshot.docs.forEach(doc => {
                    map[doc.id] = {
                        repeats: doc.data().repeats || 0,
                        lastPlayed: doc.data().lastPracticeTimestamp || 0
                    };
                });
                setProgressMap(map);
            } catch (e) {
                console.error("Daily Scenario sort failed", e);
            }
        };
        fetchProgress();
    }, [user]);

    // 2. Determine "Daily Scenario" (Spaced Repetition Logic)
    const dailyScript = useMemo(() => {
        // Only run logic if we have scripts
        if (scripts.length === 0) return null;

        // If the user isn't logged in, just return a random highly-rated scenario as a hook
        // Temporarily exclude 'american_culture' as it's under construction
        if (!user) {
            const featuredCandidates = scripts.filter(s => s.categorySlug !== 'american_culture').slice(0, 10); // Pick from top 10
            return featuredCandidates[Math.floor(Math.random() * featuredCandidates.length)];
        }

        // Candidates: Scenarios the user has NOT completed today, and exclude 'american_culture'
        const candidates = scripts.filter(s => !completedIds.has(s.id) && s.categorySlug !== 'american_culture');

        // If they have somehow completed EVERY scenario today, return null (card hides)
        if (candidates.length === 0) return null;

        // Sort candidates based on Mastery/Neglect
        return candidates.sort((a, b) => {
            const statsA = progressMap[a.id] || { repeats: 0, lastPlayed: 0 };
            const statsB = progressMap[b.id] || { repeats: 0, lastPlayed: 0 };

            // Primary: Lowest reps first (New scenarios)
            if (statsA.repeats !== statsB.repeats) {
                return statsA.repeats - statsB.repeats;
            }

            // Secondary: Oldest played first (Spaced Repetition)
            return statsA.lastPlayed - statsB.lastPlayed;
        })[0];
    }, [scripts, completedIds, progressMap, user]);

    if (!mounted) {
        return <div className="w-full h-48 bg-zinc-900/50 rounded-3xl animate-pulse mb-8" />;
    }

    // Hide card if no script found or user dismissed it
    if (!dailyScript || isDismissed) return null;

    // We can pull the theme color based on the category slug, or default to a cool blue/indigo for the "Daily" vibe
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full rounded-[40px] overflow-hidden mb-12 border border-white/5 shadow-2xl bg-zinc-900/50 backdrop-blur-xl"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center justify-between">

                    {/* Left: Content */}
                    <div className="flex-1 w-full max-w-xl">
                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">
                            <Sparkles className="w-4 h-4" />
                            Daily Mission Briefing
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white uppercase mb-4 leading-none">
                            {dailyScript.title}
                        </h2>

                        {dailyScript.cleanedEnglish && (
                            <p className="text-sm md:text-lg text-zinc-400 font-bold italic line-clamp-2 md:line-clamp-3 mb-8 max-w-lg leading-relaxed">
                                {dailyScript.cleanedEnglish}
                            </p>
                        )}

                        <div className="flex items-center gap-4 flex-wrap">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-zinc-950 text-[10px] font-black uppercase tracking-widest text-primary shadow-inner border border-white/5">
                                <TrendingUp className="w-3.5 h-3.5" />
                                Review Protocol
                            </span>
                            {dailyScript.difficulty && (
                                <span className="inline-flex px-4 py-1.5 rounded-lg bg-zinc-950 text-[10px] font-black uppercase tracking-widest text-zinc-500 shadow-inner border border-white/5">
                                    {dailyScript.difficulty}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Right: Graphic & Action */}
                    <div className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row md:flex-col items-center gap-4">
                        {dailyScript.imageUrl ? (
                            <div className="relative w-full sm:w-40 md:w-48 aspect-video sm:aspect-square rounded-3xl overflow-hidden bg-zinc-950 shadow-2xl border border-white/10 group">
                                <Image
                                    src={dailyScript.imageUrl}
                                    alt={dailyScript.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                            </div>
                        ) : (
                            <div className="w-full sm:w-40 md:w-48 aspect-video sm:aspect-square rounded-3xl bg-zinc-950 shadow-2xl border border-white/5 flex items-center justify-center text-5xl">
                                🚀
                            </div>
                        )}

                        <div className="flex gap-2 w-full">
                            <Link href={`/script/${dailyScript.id}`} className="flex-1">
                                <Button className="w-full bg-primary hover:opacity-90 text-white border-transparent shadow-[0_0_30px_rgba(var(--primary),0.3)] py-8 text-sm font-black uppercase tracking-[0.2em] rounded-2xl transition-all hover:scale-[1.02]">
                                    <Play className="w-5 h-5 mr-3" fill="currentColor" />
                                    Initiate Training
                                </Button>
                            </Link>
                        </div>
                    </div>

                </div>
            </motion.div>
        </AnimatePresence>
    );
}
