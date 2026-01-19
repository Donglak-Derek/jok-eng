"use client";

import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";

import type { Script, UserScript } from "@/types";
import { motion } from "framer-motion";
import React from "react";
import { Heart, Lock, Edit2, Trash2, User, Repeat, Shuffle, Sparkles } from "lucide-react";
import { GenerativeCover } from "./GenerativeCover";

type Props = {
  script: Script;
  index: number;
  onEdit?: (id: string, e: React.MouseEvent) => void;
  onDelete?: (id: string, e: React.MouseEvent) => void;
  onTogglePublic?: (id: string, current: boolean, e: React.MouseEvent) => void;
  onLike?: (id: string, e: React.MouseEvent) => void;
  onRemix?: (id: string, e: React.MouseEvent) => void;
  onSmartRemix?: (id: string, e: React.MouseEvent) => void;
  onShare?: (id: string, e: React.MouseEvent) => void;
  isLiked?: boolean;
};

export default function ScenarioCard({ 
    script, 
    onEdit, 
    onDelete, 
    onTogglePublic, 
    onLike,
    onRemix,
    onSmartRemix, 
    isLiked 
}: Props) {

  const isUserScript = 'userId' in script;
  const isPublic = isUserScript && (script as UserScript).isPublic;
  const authorName = isUserScript ? (script as UserScript).authorName : undefined;
  const likeCount = isUserScript ? (script as UserScript).likes || 0 : 0;
  
  const { getRepeats } = useProgress();
  const contextRepeats = getRepeats(script.id);
  const repeats = contextRepeats > 0 ? contextRepeats : ('repeats' in script ? (script as { repeats: number }).repeats : 0);

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const href = isUserScript ? `/scenario/${script.id}` : `/script/${script.id}`;

  return (
    <div className="h-full block">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="group h-full flex flex-col bg-white rounded-xl border border-border/40 overflow-hidden transition-all duration-300 hover:border-border/80 hover:shadow-sm"
      >
        <Link href={href} className="flex-1 flex flex-col min-w-0">
              {/* Cover Image: Instagram Style (Big & Visual) */}
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
              </div>

             <div className="p-4 md:p-5 flex flex-col gap-2 flex-1 relative min-w-0">
                 {/* Title & Context */}
                <div className="min-w-0">
                     {/* Simpler Type Label or just removed for minimalism? Keeping it tiny. */}
                     <div className="flex items-center justify-between mb-2">
                         <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
                             {script.categoryName || "Scenario"}
                         </span>
                         {mounted && repeats > 0 && (
                            <span className="flex items-center gap-1 text-[10px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                <Repeat className="w-3 h-3" />
                                {repeats}
                            </span>
                        )}
                     </div>
                    <h3 className="font-semibold text-lg text-foreground leading-tight group-hover:text-primary transition-colors">
                        {script.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mt-1 leading-relaxed">
                        {script.cleanedEnglish || script.context}
                    </p>
                </div>
                
                <div className="flex-1" /> {/* Spacer */}

                {/* Footer: Minimal & Clean */}
                <div className="pt-4 mt-2 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 opacity-50" />
                        <span className="font-medium opacity-80">{authorName || "Jok-Eng"}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Interactive Like */}
                        {isUserScript && (
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (onLike) onLike(script.id, e);
                                }}
                                className="flex items-center gap-1 hover:text-red-500 transition-colors"
                            >
                                <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                                <span className={isLiked ? "text-red-500 font-medium" : ""}>{likeCount}</span>
                            </button>
                        )}

                        {/* Public Toggle (Only show lock if private) */}
                        {onTogglePublic && !isPublic && (
                             <button
                                 onClick={(e) => { e.preventDefault(); e.stopPropagation(); onTogglePublic(script.id, true, e); }}
                                 className="hover:text-foreground text-amber-500 flex items-center gap-1"
                             >
                                 <Lock className="w-3.5 h-3.5" />
                                 <span>Private</span>
                             </button>
                        )}
                        
                        {/* Edit/Delete (Minimal Icons) */}
                        {(onEdit || onDelete) && (
                            <div className="flex gap-3 pl-2 border-l border-border/30">
                                {onEdit && (
                                    <button onClick={(e) => onEdit(script.id, e)} className="hover:text-foreground transition-colors">
                                        <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                )}
                                {onDelete && (
                                    <button onClick={(e) => onDelete(script.id, e)} className="hover:text-red-600 transition-colors">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>
                        )}
                         {onRemix && (
                            <button 
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRemix(script.id, e); }}
                                className="flex items-center gap-1 hover:text-purple-500 transition-colors ml-2"
                                title="Remix this scenario"
                            >
                                <span className="text-[10px] font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 hidden sm:inline-block">Remix</span>
                                <Shuffle className="w-3.5 h-3.5" />
                            </button>
                         )}
                         {onSmartRemix && (
                             <button
                                 onClick={(e) => { e.preventDefault(); e.stopPropagation(); onSmartRemix(script.id, e); }}
                                 className="flex items-center gap-1 hover:text-amber-500 transition-colors ml-2"
                                 title="Adapt for my job"
                             >
                                  <span className="text-[10px] font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 hidden sm:inline-block text-amber-500">Adapt</span>
                                 <Sparkles className="w-3.5 h-3.5 text-amber-500" />
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
