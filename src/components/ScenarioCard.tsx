"use client";

import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";

import type { Script, UserScript } from "@/types";
import { motion } from "framer-motion";
import React from "react";
import { Lock, Trash2, Repeat, Shuffle, Sparkles } from "lucide-react";
import { GenerativeCover } from "./GenerativeCover";
import AudioStatusBadge from "./AudioStatusBadge";
import { getScriptAudioStatus } from "@/lib/utils";

type Props = {
  script: Script;
  index: number;
  onDelete?: (id: string, e: React.MouseEvent) => void;
  onTogglePublic?: (id: string, current: boolean, e: React.MouseEvent) => void;
  onRemix?: (id: string, e: React.MouseEvent) => void;
  onSmartRemix?: (id: string, e: React.MouseEvent) => void;
  onShare?: (id: string, e: React.MouseEvent) => void;
  isNew?: boolean;
};

export default function ScenarioCard({ 
    script, 
    index,
    onDelete, 
    onTogglePublic, 
    onRemix,
    onSmartRemix, 
    onShare,
    isNew
}: Props) {

  // ... (existing logic)
  const isUserScript = 'userId' in script;
  const isPublic = isUserScript && (script as UserScript).isPublic;
  const authorName = isUserScript ? (script as UserScript).authorName : undefined;

  
  const { getRepeats } = useProgress();
  const contextRepeats = getRepeats(script.id);
  const repeats = contextRepeats > 0 ? contextRepeats : ('repeats' in script ? (script as { repeats: number }).repeats : 0);

  const audioStatus = getScriptAudioStatus(script);

  const [mounted, setMounted] = React.useState(false);
  // ... useEffect

  const href = isUserScript ? `/scenario/${script.id}` : `/script/${script.id}`;

  return (
    <div className="h-full block">
      <motion.div
        // ... (motion props)
        className={`...`}
      >
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
                                   <AudioStatusBadge status={audioStatus} className="shadow-black/20 shadow-lg backdrop-blur-md bg-white/90" />
                               </div>
                           )}

                           {/* Floating Badge: Repeats */}
                           {mounted && repeats > 0 && (
                                <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-bold text-white bg-black/40 backdrop-blur-md px-2 py-1 rounded-full">
                                    <Repeat className="w-3 h-3" />
                                    {repeats}
                                </div>
                            )}
                      </div>
        
                     <div className="p-4 flex flex-col gap-1 flex-1 relative min-w-0">
                         {/* Title & Context */}
                        <div className="min-w-0">
                            <h3 className="font-bold text-lg text-foreground leading-tight group-hover:text-primary transition-colors mb-1">
                                {script.title}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed opacity-90">
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
                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                            💼 {(script as UserScript).authorOccupation}
                                        </span>
                                    )}
                                     {(script as UserScript).authorAgeGroup && (
                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-100">
                                            ⚡ {(script as UserScript).authorAgeGroup}
                                        </span>
                                    )}
                                     {(script as UserScript).authorCountry && (
                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                                            🌍 {(script as UserScript).authorCountry}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                        
                        <div className="flex-1" /> {/* Spacer */}
        
                        {/* Footer: Minimal & Clean */}
                        <div className="pt-4 mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {/* Author Name Only - No Icon */}
                                <span className="text-xs font-semibold text-muted-foreground/80">{authorName || "Jok-Eng"}</span>
                            </div>
        
                            <div className="flex items-center gap-5">
                                {/* Remix Count (Was Like) */}
                                {isUserScript && (script as UserScript).remixCount !== undefined && (script as UserScript).remixCount! > 0 && (
                                    <div className="flex items-center gap-1.5 text-muted-foreground" title="Remixes inspired">
                                        <Shuffle className="w-4 h-4" />
                                        <span className="text-xs font-medium">{(script as UserScript).remixCount}</span>
                                    </div>
                                )}
        
                                {/* Public Toggle */}
                                {onTogglePublic && !isPublic && (
                                     <button
                                         onClick={(e) => { e.preventDefault(); e.stopPropagation(); onTogglePublic(script.id, true, e); }}
                                         className="hover:text-foreground text-amber-500"
                                     >
                                         <Lock className="w-5 h-5" />
                                     </button>
                                )}
                                
                                {/* Edit/Delete */}
                                {onDelete && (
                                    <div className="flex gap-4 border-l border-border/30 pl-4">
                                        {onDelete && (
                                            <button onClick={(e) => onDelete(script.id, e)} className="text-muted-foreground hover:text-red-600 transition-colors">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        )}

                                    </div>
                                )}
                                     {onRemix && (
                                        <button 
                                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRemix(script.id, e); }}
                                            className="
                                                relative overflow-hidden group/btn px-4 py-1.5 rounded-full 
                                                bg-gradient-to-r from-violet-600 to-indigo-600 
                                                text-white shadow-md hover:shadow-lg hover:shadow-indigo-500/30 
                                                transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]
                                                ml-2 flex items-center gap-2
                                            "
                                            title="Customize this scenario for your situation"
                                        >
                                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 pointer-events-none" />
                                            <Sparkles className="w-3.5 h-3.5 fill-white/20 animate-pulse" />
                                            <span className="text-xs font-bold tracking-wide uppercase">Remix</span>
                                        </button>
                                     )}
                                     {onSmartRemix && (
                                         <button
                                             onClick={(e) => { e.preventDefault(); e.stopPropagation(); onSmartRemix(script.id, e); }}
                                             className="
                                                 p-2 rounded-full text-amber-500 bg-amber-50 hover:bg-amber-100 
                                                 hover:text-amber-700 hover:scale-105 transition-all ml-1
                                                 border border-amber-200/50
                                             "
                                             title="Adapt for my job (Smart Remix)"
                                         >
                                             <Sparkles className="w-4 h-4 fill-amber-500/10" />
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
