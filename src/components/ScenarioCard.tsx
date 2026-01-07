"use client";

import Link from "next/link";

import type { Script, UserScript } from "@/types";
import { motion } from "framer-motion";
import React from "react";
import { Heart, Bookmark, Lock, Globe, Edit2, Trash2, User } from "lucide-react";

type Props = {
  script: Script;
  index: number;
  onEdit?: (id: string, e: React.MouseEvent) => void;
  onDelete?: (id: string, e: React.MouseEvent) => void;
  onTogglePublic?: (id: string, current: boolean, e: React.MouseEvent) => void;
  onLike?: (id: string, e: React.MouseEvent) => void;
  onSave?: (id: string, e: React.MouseEvent) => void;
  onShare?: (id: string, e: React.MouseEvent) => void; // Keeping onShare prop but icon was unused? Actually Share2 was unused.
  isLiked?: boolean;
};

export default function ScenarioCard({ 
    script, 
    index, 
    onEdit, 
    onDelete, 
    onTogglePublic, 
    onLike,
    onSave, 
    isLiked 
}: Props) {




  const isStoryFlow = script.type === "story_flow";
  const isDecoder = script.type === "decoder";
  
  let typeLabel = "Scenario";
  let typeColor = "bg-secondary text-secondary-foreground"; 

  if (isStoryFlow) {
      typeLabel = "Story";
      typeColor = "bg-pink-50 text-pink-700 border-pink-100";
  }
  if (isDecoder) {
      typeLabel = "Decoder";
      typeColor = "bg-emerald-50 text-emerald-700 border-emerald-100";
  }

  const isUserScript = 'userId' in script;
  const isPublic = isUserScript && (script as UserScript).isPublic;
  const authorName = isUserScript ? (script as UserScript).authorName : undefined;
  const authorPhotoURL = isUserScript ? (script as UserScript).authorPhotoURL : undefined;
  const likeCount = isUserScript ? (script as UserScript).likes || 0 : 0;

  const href = isUserScript ? `/scenario/${script.id}` : `/script/${script.id}`;

  return (
    <div className="h-full block">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="group h-full flex flex-col bg-white rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden"
      >
        <Link href={href} className="flex-1 p-5 flex flex-col gap-3">
             {/* Header */}
            <div className="flex justify-between items-start">
                <span className="text-xs font-mono text-muted-foreground/60">
                    #{String(index + 1).padStart(2, '0')}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${typeColor}`}>
                    {typeLabel}
                </span>
            </div>

            {/* Title & Context */}
            <div>
                <h3 className="font-sans font-bold text-lg md:text-xl text-foreground mb-1 leading-tight group-hover:underline decoration-1 underline-offset-4">
                    {script.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                    {script.cleanedEnglish || script.context}
                </p>
            </div>
            
            <div className="flex-1" /> {/* Spacer */}
        </Link>
            
        {/* Footer */}
        <div className="bg-secondary/30 border-t border-border p-3 px-4 flex items-center justify-between text-sm">
            {/* Author */}
             <div className="flex items-center gap-2">
                {authorName ? (
                    <>
                        <div className="w-5 h-5 rounded-full overflow-hidden bg-secondary">
                            {authorPhotoURL ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={authorPhotoURL} alt={authorName} className="w-full h-full object-cover" /> 
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                                    <User className="w-3 h-3" />
                                </div>
                            )}
                        </div>
                        <span className="text-xs font-medium text-foreground/80 truncate max-w-[80px]">{authorName}</span>
                    </>
                ) : (
                   <span className="text-xs font-medium text-muted-foreground">Official</span>
                )}
             </div>

             {/* Actions */}
             <div className="flex items-center gap-3 text-muted-foreground">
                  {/* Likes */}
                  <div className="flex items-center gap-1 text-xs">
                      {onLike ? (
                        <button 
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onLike(script.id, e); }}
                            className={`flex items-center gap-1 hover:text-foreground transition-colors ${isLiked ? "text-primary fill-primary" : ""}`}
                        >
                            <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-current" : ""}`} />
                            <span>{likeCount}</span>
                        </button>
                      ) : (
                        <>
                            <Heart className="w-3.5 h-3.5" />
                            <span>{likeCount}</span>
                        </>
                      )}
                  </div>
                 
                 {/* Public Toggle */}
                 {onTogglePublic && (
                      <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onTogglePublic(script.id, isPublic || false, e); }}
                          className={`hover:text-foreground transition-colors ${isPublic ? "text-blue-600" : ""}`}
                          title={isPublic ? "Public" : "Private"}
                      >
                          {isPublic ? <Globe className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                      </button>
                 )}

                 {/* Edit/Delete */}
                 {(onEdit || onDelete) && (
                     <div className="flex gap-2 ml-1 pl-2 border-l border-border">
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
                 
                 {/* Save (Community) */}
                  {onSave && (
                        <button 
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onSave(script.id, e); }}
                            className="hover:text-foreground transition-colors"
                        >
                            <Bookmark className="w-3.5 h-3.5" />
                        </button>
                   )}
             </div>
        </div>
      </motion.div>
    </div>
  );
}
