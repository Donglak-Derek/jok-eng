"use client";

import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";

import type { Script, UserScript } from "@/types";
import { motion } from "framer-motion";
import React from "react";
import { Lock, Trash2, Repeat, Shuffle, Sparkles, Bookmark } from "lucide-react";
import { GenerativeCover } from "./GenerativeCover";

type Props = {
    script: Script;
    index: number;
    onDelete?: (id: string, e: React.MouseEvent) => void;
    onTogglePublic?: (id: string, current: boolean, e: React.MouseEvent) => void;
    onShare?: (id: string, e: React.MouseEvent) => void;
    onToggleSave?: (id: string, e: React.MouseEvent) => void;
    isSaved?: boolean;
    isNew?: boolean;
    className?: string;
};

export default function ScenarioCard({
    script,
    index,
    onDelete,
    onTogglePublic,
    onShare,
    onToggleSave,
    isSaved,
    isNew,
    className
}: Props) {

    // ... (existing logic)
    const isUserScript = 'userId' in script;
    const isPublic = isUserScript && (script as UserScript).isPublic;
    const authorName = isUserScript ? (script as UserScript).authorName : undefined;


    const { getRepeats } = useProgress();
    const contextRepeats = getRepeats(script.id);
    const repeats = contextRepeats > 0 ? contextRepeats : ('repeats' in script ? (script as { repeats: number }).repeats : 0);

    const [mounted, setMounted] = React.useState(false);
    // ... useEffect

    const href = isUserScript ? `/scenario/${script.id}` : `/script/${script.id}`;

    return (
        <div className="h-full block">
            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`group relative h-full flex flex-col bg-zinc-900/50 rounded-2xl border border-white/5 hover:border-primary/20 transition-all duration-500 overflow-hidden shadow-2xl hover:-translate-y-1 ${className}`}
            >
                {/* Horizontal Accent (Grit Theme) */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
                <Link href={href} className="flex-1 flex flex-col min-w-0">
                    {/* Cover Image */}
                    <div className="relative w-full aspect-[4/3] md:aspect-[1.8/1] bg-secondary/10 overflow-hidden shrink-0">
                        {script.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={script.imageUrl}
                                alt={script.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        ) : (
                            <GenerativeCover title={script.title} category={script.categoryName || "Custom"} />
                        )}

                        {/* Floating Badge: Audio Status - Only show for User/Remixed scripts, keep official clean */}
                        {isUserScript && (
                            <div className="absolute top-2 left-2 z-10">
                            </div>
                        )}

                        {/* Floating Badge: Repeats */}
                        {mounted && repeats > 0 && (
                            <div className="absolute top-2 right-2 flex items-center gap-1.5 text-[9px] font-black italic uppercase tracking-widest text-white bg-zinc-950/80 backdrop-blur-md px-2.5 py-1.5 rounded-sm border border-white/10 shadow-xl">
                                <Repeat className="w-3 h-3 text-primary" />
                                <span className="text-zinc-300">{repeats}</span> <span className="opacity-40">REPS</span>
                            </div>
                        )}
                    </div>

                    <div className="p-5 flex flex-col gap-1 flex-1 relative min-w-0">
                        {/* Title & Context */}
                        <div className="min-w-0">
                            <h3 className="font-black text-xl text-white italic uppercase tracking-tighter group-hover:text-primary transition-colors mb-2 leading-none">
                                {script.title}
                            </h3>
                            {script.categoryName && (
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4 opacity-80">
                                    {script.categoryName}
                                </p>
                            )}
                            <p className="text-zinc-500 text-sm line-clamp-2 leading-relaxed font-bold italic">
                                {script.cleanedEnglish || script.context}
                            </p>

                            {/* Context Badges (Vibe/Job) */}
                            {(isUserScript && (
                                (script as UserScript).authorOccupation ||
                                (script as UserScript).authorAgeGroup ||
                                (script as UserScript).authorCountry
                            )) && (
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                        {(script as UserScript).authorOccupation && (
                                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                💼 {(script as UserScript).authorOccupation}
                                            </span>
                                        )}
                                        {(script as UserScript).authorAgeGroup && (
                                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                                ⚡ {(script as UserScript).authorAgeGroup}
                                            </span>
                                        )}
                                        {(script as UserScript).authorCountry && (
                                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                🌍 {(script as UserScript).authorCountry}
                                            </span>
                                        )}

                                        {/* Difficulty Badge */}
                                        {script.difficulty && (
                                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border
                                            ${script.difficulty === "Beginner" || script.difficulty.includes("Mild") ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : ""}
                                            ${script.difficulty === "Normal" || script.difficulty.includes("Medium") ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : ""}
                                            ${script.difficulty === "Native" || script.difficulty.includes("Spicy") ? "bg-rose-500/10 text-rose-400 border-rose-500/20" : ""}
                                            ${!["Beginner", "Normal", "Native"].some(d => script.difficulty?.includes(d)) && !script.difficulty.includes("Mild") && !script.difficulty.includes("Medium") && !script.difficulty.includes("Spicy") ? "bg-zinc-800 text-zinc-400 border-white/5" : ""}
                                        `}>
                                                🔥 {script.difficulty}
                                            </span>
                                        )}

                                        {/* Format Badge (Script Only) */}
                                        {script.format && (
                                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-violet-500/10 text-violet-400 border border-violet-500/20">
                                                {script.format === "Social Dojo" ? "🥋" : script.format === "Rapid Fire" ? "⚡" : "📜"} {script.format}
                                            </span>
                                        )}
                                    </div>
                                )}
                        </div>

                        <div className="flex-1" /> {/* Spacer */}

                        {/* Footer: Minimal & Clean */}
                        <div className="pt-4 mt-2 flex items-center justify-between border-t border-white/5">
                            <div className="flex items-center gap-2">
                                {/* Author Name Only - No Icon */}
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 group-hover:text-zinc-400 transition-colors">{authorName || "SYSTEM OFFICIAL"}</span>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Remix Count (Was Like) */}
                                {isUserScript && (script as UserScript).remixCount !== undefined && (script as UserScript).remixCount! > 0 && (
                                    <div className="flex items-center gap-1.5 text-zinc-500" title="Remixes inspired">
                                        <Shuffle className="w-3.5 h-3.5" />
                                        <span className="text-[10px] font-black">{(script as UserScript).remixCount}</span>
                                    </div>
                                )}

                                {/* Public Toggle */}
                                {onTogglePublic && !isPublic && (
                                    <button
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onTogglePublic(script.id, true, e); }}
                                        className="text-amber-500/50 hover:text-amber-500 transition-colors"
                                    >
                                        <Lock className="w-4 h-4" />
                                    </button>
                                )}

                                {/* Delete */}
                                {onDelete && (
                                    <button 
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(script.id, e); }}
                                        className="text-zinc-500 hover:text-red-500/80 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}

                                {/* Save Button */}
                                {onToggleSave && (
                                    <button
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleSave(script.id, e); }}
                                        className={`
                                                 transition-all active:scale-90
                                                 ${isSaved
                                                ? "text-primary shadow-[0_0_10px_rgba(var(--primary),0.3)]"
                                                : "text-zinc-600 hover:text-primary"
                                            }
                                             `}
                                        title={isSaved ? "Unsave" : "Save for later"}
                                    >
                                        <Bookmark className={`w-4 h-4 ${isSaved ? "fill-primary" : ""}`} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </Link>
            </motion.div>
        </div>
    );
}
