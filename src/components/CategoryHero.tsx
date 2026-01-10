"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Trophy, Star } from "lucide-react";
import type { Script } from "@/types";
import { Button } from "@/components/Button";

type CategoryHeroProps = {
  categoryName: string;
  // categorySlug removed
  scripts: Script[];
  colorName?: string;
  description?: string;
  // No changes needed to props, script has section
};

// Map color names to Tailwind style objects/classes
const THEME_MAP: Record<string, { bg: string; text: string; accent: string; gradient: string }> = {
  orange: { 
    bg: "bg-orange-50", text: "text-orange-900", accent: "bg-orange-500", 
    gradient: "from-orange-500/10 to-transparent" 
  },
  pink: { 
    bg: "bg-pink-50", text: "text-pink-900", accent: "bg-pink-500", 
    gradient: "from-pink-500/10 to-transparent" 
  },
  blue: { 
    bg: "bg-blue-50", text: "text-blue-900", accent: "bg-blue-500", 
    gradient: "from-blue-500/10 to-transparent" 
  },
  emerald: { 
    bg: "bg-emerald-50", text: "text-emerald-900", accent: "bg-emerald-500", 
    gradient: "from-emerald-500/10 to-transparent" 
  },
  purple: { 
    bg: "bg-purple-50", text: "text-purple-900", accent: "bg-purple-500", 
    gradient: "from-purple-500/10 to-transparent" 
  },
  indigo: { 
    bg: "bg-indigo-50", text: "text-indigo-900", accent: "bg-indigo-500", 
    gradient: "from-indigo-500/10 to-transparent" 
  },
  cyan: { 
    bg: "bg-cyan-50", text: "text-cyan-900", accent: "bg-cyan-500", 
    gradient: "from-cyan-500/10 to-transparent" 
  },
};

export default function CategoryHero({ 
  categoryName, 
  // categorySlug removed
  scripts, 
  colorName = "blue",
  description 
}: CategoryHeroProps) {
  const theme = THEME_MAP[colorName] || THEME_MAP.blue;
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  // Load progress on mount
  useEffect(() => {
    setMounted(true);
    const completed = new Set<string>();
    const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD local
    
    scripts.forEach(script => {
      // Check Daily Key
      const dailyKey = `jokeng:daily:${today}:${script.id}`;
      const isDoneToday = localStorage.getItem(dailyKey) === "true";
      
      if (isDoneToday) {
        completed.add(script.id);
      }
    });
    
    setCompletedIds(completed);
  }, [scripts]);

  // Determine "Up Next"
  const nextUpScript = useMemo(() => {
    return scripts.find(s => !completedIds.has(s.id)) || scripts[0];
  }, [scripts, completedIds]);

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
                <h1 className={`text-4xl md:text-5xl font-black tracking-tight ${theme.text}`}>
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
                        <Trophy className="w-4 h-4" />
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
                    <Button className={`w-full ${theme.accent} hover:opacity-90 border-transparent text-white shadow-md shadow-orange-500/20`}>
                        <Play className="w-4 h-4 mr-2" fill="currentColor" />
                        Start Training
                    </Button>
                </Link>
            </motion.div>
        )}
      </div>
    </div>
  );
}
