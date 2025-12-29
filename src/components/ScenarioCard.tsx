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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // Design Theme - Neon Comedy Club Vibe
  const gradients = [
    "from-purple-900/40 to-black border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.4)]",
    "from-pink-900/40 to-black border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.4)]",
    "from-blue-900/40 to-black border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.4)]",
  ];
  const theme = gradients[index % gradients.length];
  
  // Type Label Logic
  const isStoryFlow = script.type === "story_flow";
  const isDecoder = script.type === "decoder";
  
  let typeLabel = "SCENARIO";
  if (isStoryFlow) typeLabel = "STORY BUILD";
  if (isDecoder) typeLabel = "SIGNAL DECODER";

  const typeColor = isStoryFlow 
      ? "text-pink-400 border-pink-500/40" 
      : isDecoder 
          ? "text-green-400 border-green-500/40" 
          : "text-cyan-400 border-cyan-500/40";

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
        className={`relative rounded-2xl border bg-card/60 backdrop-blur-md p-5 flex flex-col shadow-sm ${theme} group`}
        // Remove direct onClick here to allow children to handle events
      >
        <Link href={href} className="absolute inset-0 z-0" aria-label="View Scenario" />

        {/* TOP ROW: Author (Left) & Index (Right) -> z-10 for interactivity */}
        <div className="flex justify-between items-start mb-4 z-10 relative pointer-events-none">
           {/* LEFT: Author Info */}
           <div className="flex items-center gap-2 pointer-events-auto">
                {authorName ? (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-secondary to-primary p-[1px] shadow-lg">
                            <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
                                {authorPhotoURL ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={authorPhotoURL} alt={authorName} className="w-full h-full object-cover" /> 
                                ) : (
                                    <span className="text-[10px] font-bold text-white">{authorName[0]?.toUpperCase()}</span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-white leading-none shadow-black drop-shadow-md">{authorName}</span>
                            <span className="text-[10px] text-muted leading-none mt-0.5">Creator</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col opacity-80">
                        <span className="text-xs font-bold text-white leading-none">Jok-Eng</span>
                        <span className="text-[10px] text-muted italic leading-none mt-0.5">Community</span>
                    </div>
                )}
           </div>

           {/* RIGHT: Index */}
           <div className="text-4xl font-black text-white/10 font-mono leading-none select-none">
             #{String(index + 1).padStart(2, '0')}
           </div>
        </div>

        {/* MIDDLE CONTENT: Title & Desc */}
        {/* Removed flex-1 to let content stack naturally without filling height (Fixes 'empty space') */}
        <div className="flex flex-col gap-3 z-10 relative pointer-events-none mb-4">
           {/* Header Group */}
           <div>
             <h3 className="text-2xl md:text-3xl font-bold leading-tight text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] mb-2">
                {script.title}
             </h3>

             <div className="flex items-center gap-3">
                 <div className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest border bg-black/40 ${typeColor}`}>
                   {typeLabel}
                 </div>

                 <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-white/5 text-muted-foreground border-white/10 whitespace-nowrap">
                    <span>
                      {script.decoderItems?.length || script.segments?.length || script.sentences?.length || 0}
                    </span>
                    <span className="opacity-70">items</span>
                 </div>
             </div>
           </div>
           
           <p className="text-sm md:text-base text-gray-300 leading-relaxed opacity-90 line-clamp-3">
             {script.cleanedEnglish || script.context}
           </p>
        </div>

        {/* STATS ROW (Between Description and Footer) */}
        {/* Aligned to the right as requested */}
        {/* STATS ROW (Between Description and Footer) */}
        {/* Aligned to the right as requested */}
        <div className="flex items-center justify-end gap-4 text-xs font-medium text-white/40 mb-4 px-1">
             <div className="flex items-center gap-1.5" title="Likes">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                <span>{likeCount}</span>
             </div>
             <div className="flex items-center gap-1.5" title="Comments">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                <span>{isUserScript ? ((script as UserScript).commentsCount || 0) : 0}</span>
             </div>
             <div className="flex items-center gap-1.5" title="Shares">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                <span>{isUserScript ? ((script as UserScript).shares || 0) : 0}</span>
             </div>
             <div className="flex items-center gap-1.5" title="Saves">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                <span>{isUserScript ? ((script as UserScript).saves || 0) : 0}</span>
             </div>
        </div>

        {/* BOTTOM FOOTER: Practice (Left) & Controls (Right) */}
        {/* Removed mt-auto so it sits naturally below the content, eliminating the 'empty space' gap */}
        {/* BOTTOM FOOTER: Practice (Left) & Controls (Right) */}
        {/* Removed mt-auto so it sits naturally below the content, eliminating the 'empty space' gap */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4 z-10 relative">
           {/* LEFT: Practice Link */}
           <div className="flex items-center gap-2 text-[10px] font-medium text-white/50 uppercase tracking-widest group-hover:text-primary transition-colors">
              <span>Practice</span>
           </div>

           {/* RIGHT: Action Icons */}
           <div className="flex items-center gap-2 pointer-events-auto">
               {/* LIKE BUTTON */}
               {onLike && (
                   <button 
                       onClick={(e) => {
                           e.preventDefault();
                           e.stopPropagation();
                           onLike(script.id, e);
                       }}
                       className={`p-2 rounded-full border transition-all ${isLiked ? "bg-pink-500/20 border-pink-500 text-pink-500" : "bg-black/40 border-white/10 text-muted hover:text-pink-400 hover:bg-black/60"}`}
                       title={isLiked ? "Unlike" : "Like"}
                   >
                       <svg className={`w-4 h-4 ${isLiked ? "fill-current" : "fill-none stroke-current"}`} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                   </button>
               )}

               {/* COMMENT BUTTON */}
               {isUserScript && (
                   <button 
                       onClick={(e) => {
                           e.preventDefault();
                           e.stopPropagation();
                           setShowComments(!showComments);
                       }}
                       className={`p-2 rounded-full border transition-all ${showComments ? "bg-blue-500/20 border-blue-500 text-blue-500" : "bg-black/40 border-white/10 text-muted hover:text-blue-400 hover:bg-black/60"}`}
                       title="Comments"
                   >
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                   </button>
               )}
               
               {/* SHARE BUTTON: Hide if private */}
               {(!isUserScript || isPublic) && (
                   <button 
                       onClick={(e) => {
                           e.preventDefault();
                           e.stopPropagation();
                           const url = window.location.origin + href;
                           navigator.clipboard.writeText(url);
                           alert("Link copied to clipboard!"); 
                       }}
                       className="p-2 rounded-full bg-black/40 border border-white/10 text-muted hover:text-green-400 hover:bg-black/60 transition-all"
                       title="Share Scenario"
                   >
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                   </button>
               )}

               {/* SAVE BUTTON */}
               {onSave && (
                   <button 
                       onClick={(e) => {
                           e.preventDefault();
                           e.stopPropagation();
                           onSave(script.id, e);
                       }}
                       className="p-2 rounded-full bg-black/40 border border-white/10 text-cyan-400 hover:bg-cyan-400/20 hover:scale-110 active:scale-95 transition-all"
                       title="Save to My Scenarios"
                   >
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                   </button>
               )}

               {/* PUBLIC TOGGLE */}
               {isUserScript && onTogglePublic && (
                 <button 
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onTogglePublic(script.id, !!isPublic, e);
                    }}
                    className={`p-2 rounded-full border transition-all ${isPublic ? "bg-primary/20 border-primary text-primary" : "bg-black/40 border-white/10 text-muted hover:text-primary hover:bg-black/60"}`}
                    title={isPublic ? "Public: Click to make private" : "Private: Click to share"}
                 >
                    {isPublic ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    )}
                 </button>
               )}
               
               {/* EDIT/DELETE */}
               {(onEdit || onDelete) && (
                 <div className="flex items-center gap-1">
                     {onEdit && (
                         <button 
                           onClick={(e) => onEdit(script.id, e)}
                           className="p-2 rounded-full bg-black/40 border border-white/10 text-secondary hover:text-primary hover:bg-white/10 hover:scale-110 active:scale-95 transition-all"
                           title="Edit"
                         >
                             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                         </button>
                     )}
                     {onDelete && (
                         <button 
                           onClick={(e) => onDelete(script.id, e)}
                           className="p-2 rounded-full bg-black/40 border border-white/10 text-destructive/70 hover:text-red-500 hover:bg-white/10 hover:scale-110 active:scale-95 transition-all"
                           title="Delete"
                         >
                             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                         </button>
                     )}
                 </div>
               )}
           </div>
        </div>

        {/* COMMENTS SECTION - NOW AT THE VERY BOTTOM */}
        {showComments && isUserScript && (
          <div className="relative z-20 pointer-events-auto mt-4 pt-4 border-t border-white/5" onClick={(e) => {
             e.preventDefault(); 
             e.stopPropagation(); // Explicitly stop propagation for clicks inside comments
          }}>
             <h4 className="text-xs font-bold text-muted mb-3 uppercase tracking-wider">Comments</h4>
             <CommentsSection scenario={script as UserScript} />
          </div>
        )}      </motion.div>
    </div>
  );
}
