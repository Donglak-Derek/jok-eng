"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Script, UserScript } from "@/types";
import { motion } from "framer-motion";
import CommentsSection from "./CommentsSection";
import React from "react";

type Props = {
  script: Script;
  index: number;
  onEdit?: (id: string, e: React.MouseEvent) => void;
  onDelete?: (id: string, e: React.MouseEvent) => void;
  onTogglePublic?: (id: string, current: boolean, e: React.MouseEvent) => void;
  onLike?: (id: string, e: React.MouseEvent) => void;
  onSave?: (id: string, e: React.MouseEvent) => void;
  onShare?: (id: string, e: React.MouseEvent) => void;
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
  // Prefer DB repeats if available, otherwise localStorage
  const dbRepeats = 'repeats' in script ? (script as UserScript).repeats : 0;
  const [repeats, setRepeats] = useState<number>(dbRepeats || 0);
  const [showComments, setShowComments] = useState(false);
  const repeatsKey = `jokeng:repeats:${script.id}`;

  useEffect(() => {
    // Only use local storage if DB repeats is missing (e.g. for static scripts or sync lag)
    if (dbRepeats) {
        setRepeats(dbRepeats);
        return;
    }
    const v = localStorage.getItem(repeatsKey);
    setRepeats(v ? Number(v) || 0 : 0);
  }, [repeatsKey, dbRepeats]);

  // Comic/Polaroid Theme
  // We use a clean white card for everything, leveraging the global 'hard-shadow' or 'sticker-shadow'
  // The 'index' might change the rotation slightly for a "pile of photos" feel if we wanted, 
  // but for now we keep it clean grid.

  // Type Label Logic - Stamped Look
  const isStoryFlow = script.type === "story_flow";
  const isDecoder = script.type === "decoder";
  
  let typeLabel = "SCENARIO";
  let typeColor = "text-gray-500 border-gray-300 bg-gray-50"; 
  let rotateClass = "-rotate-2";

  if (isStoryFlow) {
      typeLabel = "STORY BUILD";
      typeColor = "text-pink-600 border-pink-200 bg-pink-50";
      rotateClass = "rotate-1";
  }
  if (isDecoder) {
      typeLabel = "DECODER";
      typeColor = "text-emerald-600 border-emerald-200 bg-emerald-50";
      rotateClass = "-rotate-1";
  }

  // Check if it's a user script for public toggling
  const isUserScript = 'userId' in script;
  const isPublic = isUserScript && (script as UserScript).isPublic;
  const authorName = isUserScript ? (script as UserScript).authorName : undefined;
  const authorPhotoURL = isUserScript ? (script as UserScript).authorPhotoURL : undefined;
  const likeCount = isUserScript ? (script as UserScript).likes || 0 : 0;

  // Determine correct link path
  const href = isUserScript ? `/scenario/${script.id}` : `/script/${script.id}`;

  return (
    <div className="h-full block">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={`relative group h-full flex flex-col`}
      >
        <div className="absolute inset-0 bg-white border-2 border-black rounded-xl hard-shadow z-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        
        <div className="relative z-10 bg-white border-2 border-black rounded-xl p-0 flex flex-col h-full overflow-hidden">
            <Link href={href} className="absolute inset-0 z-0" aria-label="View Scenario" />

            {/* CARD HEADER (Photo Area) */}
            <div className="p-5 pb-2 flex-1 flex flex-col min-h-[160px]">
                {/* Top Row: Index & Type Stamp */}
                <div className="flex justify-between items-start mb-3 pointer-events-none relative z-10">
                    <span className="font-mono font-bold text-gray-400 text-3xl opacity-70 select-none">
                        #{String(index + 1).padStart(2, '0')}
                    </span>
                    <div className={`px-2 py-1 border-2 font-hand font-bold text-xs uppercase tracking-wider transform ${rotateClass} ${typeColor} shadow-sm`}>
                        {typeLabel}
                    </div>
                </div>

                {/* Title & Context */}
                <div className="relative z-10 pointer-events-none mb-4">
                    <h3 className="font-sans font-black text-2xl md:text-3xl leading-tight text-black mb-2">
                        {script.title}
                    </h3>
                    <p className="font-hand text-gray-700 font-medium text-sm md:text-base leading-snug line-clamp-3 -rotate-1">
                        {script.cleanedEnglish || script.context}
                    </p>
                </div>
            </div>

            {/* POLAROID FOOTER (Meta & Actions) */}
            <div className="bg-gray-50 border-t-2 border-black p-3 px-4 flex flex-col gap-3 relative z-20">
                {/* Author & Stats Row */}
                <div className="flex items-center justify-between">
                    {/* Author */}
                     <div className="flex items-center gap-2">
                        {authorName ? (
                            <>
                                <div className="w-6 h-6 rounded-full border border-black overflow-hidden bg-white">
                                    {authorPhotoURL ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={authorPhotoURL} alt={authorName} className="w-full h-full object-cover" /> 
                                    ) : (
                                        <div className="w-full h-full bg-primary flex items-center justify-center text-[10px] font-bold">
                                            {authorName[0]?.toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <span className="text-xs font-bold text-gray-800 truncate max-w-[80px]">{authorName}</span>
                            </>
                        ) : (
                            <span className="text-xs font-bold text-gray-600">Official</span>
                        )}
                     </div>

                    {/* Stats Icons */}
                    <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                         {/* Likes */}
                         <div className="flex items-center gap-1">
                             <span className={likeCount > 0 ? "text-primary-600" : ""}>❤️</span>
                             <span>{likeCount}</span>
                         </div>
                         {/* Repeats */}
                         {repeats > 0 && (
                            <div className="flex items-center gap-1" title="Practices">
                                <span>🔁</span>
                                <span>{repeats}</span>
                            </div>
                         )}
                    </div>
                </div>

                {/* Action Buttons Row */}
                <div className="flex items-center justify-between pt-1">
                     <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowComments(!showComments); }}
                        className="font-hand text-xs text-gray-500 hover:text-black transition-colors flex items-center gap-1 group/comments"
                     >
                        <span className="text-base group-hover/comments:scale-110 transition-transform">💬</span>
                        <span>{isUserScript ? (script as UserScript).commentsCount || 0 : 0} Comments</span>
                     </button>

                     <div className="flex items-center gap-1 pointer-events-auto">
                        {/* Public Toggle (My Scenarios) */}
                        {onTogglePublic && (
                             <button
                                 onClick={(e) => { e.preventDefault(); e.stopPropagation(); onTogglePublic(script.id, isPublic || false, e); }}
                                 className={`p-1.5 rounded-md border-2 border-transparent hover:border-black active:scale-95 transition-all ${isPublic ? "text-primary-600" : "text-gray-400"}`}
                                 title={isPublic ? "Public (Everyone can see)" : "Private (Only you)"}
                             >
                                 <span className="text-lg leading-none">{isPublic ? "🌍" : "🔒"}</span>
                             </button>
                        )}

                        {/* Like Action */}
                        {onLike && (
                            <button 
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onLike(script.id, e); }}
                                className={`p-1.5 rounded-md border-2 border-transparent hover:border-black active:scale-95 transition-all ${isLiked ? "scale-110 drop-shadow-sm" : "opacity-50 hover:opacity-100"}`}
                                title={isLiked ? "Unlike" : "Like"}
                            >
                                <span className="text-lg leading-none">{isLiked ? "❤️" : "🤍"}</span>
                            </button>
                        )}

                        {/* Save Action (Community) */}
                        {onSave && (
                            <button 
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onSave(script.id, e); }}
                                className="p-1.5 rounded-md border-2 border-transparent hover:border-black active:scale-95 transition-all opacity-50 hover:opacity-100"
                                title="Save to My Scenarios"
                            >
                                <span className="text-lg leading-none">💾</span>
                            </button>
                        )}
                        
                        {/* More Actions (Edit/Delete) */}
                         {(onEdit || onDelete) && (
                             <div className="flex gap-1 border-l-2 border-gray-200 pl-1 ml-1">
                                 {onEdit && (
                                     <button onClick={(e) => onEdit(script.id, e)} className="p-1 hover:bg-primary/20 rounded">✏️</button>
                                 )}
                                 {onDelete && (
                                     <button onClick={(e) => onDelete(script.id, e)} className="p-1 hover:bg-red-100 rounded">🗑️</button>
                                 )}
                             </div>
                         )}
                     </div>
                </div>

                {/* Comments Section */}
                {showComments && isUserScript && (
                    <div className="mt-2 pt-2 border-t border-gray-200" onClick={(e) => e.stopPropagation()}>
                        <CommentsSection scenario={script as UserScript} />
                    </div>
                )}
            </div>
        </div>
      </motion.div>
    </div>
  );
}
