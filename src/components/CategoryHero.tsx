"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Trophy, Star } from "lucide-react";
import type { Script } from "@/types";
import { Button } from "@/components/Button";
import { useDailyProgress } from "@/hooks/useDailyProgress";
import { useAuth } from "@/context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import THEME_MAP from "@/lib/themeMap";

type CategoryHeroProps = {
  categoryName: string;
  // categorySlug removed
  scripts: Script[];
  colorName?: string;
  description?: string;
  // No changes needed to props, script has section
};

export default function CategoryHero({
  categoryName,
  // categorySlug removed
  scripts,
  colorName = "blue",
  description
}: CategoryHeroProps) {
  const theme = THEME_MAP[colorName] || THEME_MAP.blue;
  const scriptIds = useMemo(() => scripts.map(s => s.id), [scripts]);
  const { completedIds } = useDailyProgress(scriptIds);
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [progressMap, setProgressMap] = useState<Record<string, { repeats: number, lastPlayed: number }>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch Global Progress for Smart Sort
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
        console.error("Hero smart sort failed", e);
      }
    };
    fetchProgress();
  }, [user]);

  // Determine "Up Next" - Logic (Spaced Repetition / Mastery):
  // 1. Filter out scenarios completed TODAY (completedIds)
  // 2. Sort by Mastery: Prioritize scenarios with 0 repeats.
  // 3. Tie-breaker: If all have been played, prioritize the one played the *longest* ago.
  const nextUpScript = useMemo(() => {
    // Candidates: Not completed today
    const candidates = scripts.filter(s => !completedIds.has(s.id));

    if (candidates.length === 0) return null;

    return candidates.sort((a, b) => {
      const statsA = progressMap[a.id] || { repeats: 0, lastPlayed: 0 };
      const statsB = progressMap[b.id] || { repeats: 0, lastPlayed: 0 };

      // Primary Sort: Least amount of repeats first
      if (statsA.repeats !== statsB.repeats) {
        return statsA.repeats - statsB.repeats;
      }

      // Secondary Sort: If they have the same amount of repeats, sort by oldest played
      return statsA.lastPlayed - statsB.lastPlayed;
    })[0];
  }, [scripts, completedIds, progressMap]);

  const progressPercentage = Math.round((completedIds.size / scripts.length) * 100) || 0;
  const isAllComplete = completedIds.size === scripts.length && scripts.length > 0;

  if (!mounted) {
    // Skeletal loading state
    return (
      <div className={`w-full rounded-3xl p-8 md:p-12 mb-10 bg-slate-50 animate-pulse min-h-[300px]`}></div>
    );
  }

  return (
    <div className={`relative w-full rounded-3xl overflow-hidden mb-10 border border-slate-100 shadow-sm ${theme.bg}`}>
      {/* Background Decor */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-50`} />
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">

        {/* Left Column: Title & Stats */}
        <div className="flex-1 max-w-xl space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider opacity-60">
              <span className={`w-2 h-2 rounded-full ${theme.accent}`} />
              Training Module
            </div>
            <h1 className={`text-3xl md:text-5xl lg:text-6xl font-black tracking-tight ${theme.text} drop-shadow-sm`}>
              {categoryName}
            </h1>
            {description && (
              <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-md">
                {description}
              </p>
            )}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2 max-w-sm">
            <div className="flex justify-between text-sm font-semibold text-slate-600">
              <span>Daily Progress</span>
              <span>{completedIds.size} / {scripts.length}</span>
            </div>
            <div className="h-3 w-full bg-white rounded-full overflow-hidden shadow-inner border border-slate-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full ${theme.accent}`}
              />
            </div>
            {isAllComplete && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm font-bold text-emerald-600 mt-1"
              >
                <Trophy className="w-5 h-5" />
                Category Mastered!
              </motion.div>
            )}
            {isAllComplete && (
              <div className="text-xs text-slate-500 font-medium">
                All trainings complete for today. Great job!
              </div>
            )}
          </div>
        </div>

        {/* Right Column: "Up Next" Card */}
        {nextUpScript && !isAllComplete && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-[380px] bg-white rounded-2xl p-5 shadow-lg border border-slate-100/50 hover:shadow-xl transition-shadow"
          >
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Star className={`w-3 h-3 ${theme.text}`} fill="currentColor" />
              Up Next
            </div>

            <div className="flex gap-4 items-start mb-4">
              {nextUpScript.imageUrl ? (
                <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                  <Image
                    src={nextUpScript.imageUrl}
                    alt={nextUpScript.title}
                    fill
                    sizes="(max-width: 768px) 96px, 96px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className={`w-24 h-24 rounded-lg shrink-0 ${theme.bg} flex items-center justify-center`}>
                  <span className="text-2xl">🔥</span>
                </div>
              )}

              <div>
                <h3 className="font-bold text-lg leading-tight mb-1 line-clamp-2">
                  {nextUpScript.title}
                </h3>
                {nextUpScript.difficulty && (
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-slate-100 text-slate-500">
                    {nextUpScript.difficulty}
                  </span>
                )}
                <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                  {nextUpScript.cleanedEnglish}
                </p>
              </div>
            </div>

            <Link href={`/script/${nextUpScript.id}`} className="block">
              <Button className={`w-full ${theme.accent} hover:opacity-90 border-transparent text-white shadow-md shadow-orange-500/20 py-6 text-base`}>
                <Play className="w-5 h-5 mr-2" fill="currentColor" />
                Start Training
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
