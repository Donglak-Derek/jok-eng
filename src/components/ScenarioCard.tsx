"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Script } from "@/types";
import { motion } from "framer-motion";

type Props = {
  script: Script;
  index: number;
  onEdit?: (id: string, e: React.MouseEvent) => void;
  onDelete?: (id: string, e: React.MouseEvent) => void;
};

export default function ScenarioCard({ script, index, onEdit, onDelete, onTogglePublic }: Props & { onTogglePublic?: (id: string, current: boolean, e: React.MouseEvent) => void }) {
  // Prefer DB repeats if available, otherwise localStorage
  const dbRepeats = 'repeats' in script ? (script as any).repeats : 0;
  const [repeats, setRepeats] = useState<number>(dbRepeats || 0);
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
  const isPublic = isUserScript && (script as any).isPublic;

  // Determine correct link path
  const href = isUserScript ? `/scenario/${script.id}` : `/script/${script.id}`;

  return (
    <Link href={href} className="block h-full">
      <motion.div
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={`relative h-full rounded-2xl border bg-card/60 backdrop-blur-md p-5 flex flex-col justify-between shadow-sm ${theme} group`}
      >
        {/* Top Row: Index Number and Action Buttons */}
        <div className="flex justify-between items-start mb-4">
           {/* 1. Number of card instead of icon */}
           <div className="text-4xl font-black text-white/10 font-mono leading-none select-none">
             #{String(index + 1).padStart(2, '0')}
           </div>

           <div className="flex items-center gap-2">
               {/* 4. Share/Private Toggle */}
               {isUserScript && onTogglePublic && (
                 <button 
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onTogglePublic(script.id, !!isPublic, e);
                    }}
                    className={`p-2 rounded-full border transition-all ${isPublic ? "bg-primary/20 border-primary text-primary" : "bg-black/40 border-white/10 text-muted"}`}
                    title={isPublic ? "Public: Click to make private" : "Private: Click to share"}
                 >
                    {isPublic ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    )}
                 </button>
               )}
               
               {/* Edit/Delete Buttons */}
               {(onEdit || onDelete) && (
                 <div className="flex items-center gap-1">
                     {onEdit && (
                         <button 
                           onClick={(e) => onEdit(script.id, e)}
                           className="p-2 rounded-full bg-black/40 border border-white/10 text-secondary hover:text-primary hover:bg-white/10 hover:scale-110 active:scale-95 transition-all"
                           title="Edit"
                         >
                             ✏️
                         </button>
                     )}
                     {onDelete && (
                         <button 
                           onClick={(e) => onDelete(script.id, e)}
                           className="p-2 rounded-full bg-black/40 border border-white/10 text-destructive/70 hover:text-destructive hover:bg-white/10 hover:scale-110 active:scale-95 transition-all"
                           title="Delete"
                         >
                             🗑️
                         </button>
                     )}
                 </div>
               )}
           </div>
        </div>

        <div className="flex-1 flex flex-col gap-3">
          <h3 className="text-2xl md:text-3xl font-bold leading-tight text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
            {script.title}
          </h3>

          {/* 2. Move "SCENARIO" under title, left of items count */}
          <div className="flex items-center gap-3">
              <div className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest border bg-black/40 ${typeColor}`}>
                {typeLabel}
              </div>

              {/* Item Count Badge */}
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-white/5 text-muted-foreground border-white/10 whitespace-nowrap">
                 <span>
                   {script.decoderItems?.length || script.segments?.length || script.sentences?.length || 0}
                 </span>
                 <span className="opacity-70">items</span>
              </div>
          </div>
          
          {/* 3. Full Explanation (no line clamp) */}
          <p className="text-sm md:text-base text-gray-300 leading-relaxed mt-2 opacity-90">
            {script.cleanedEnglish || script.context}
          </p>
        </div>

        {/* Bottom Actions Row */}
        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
            <div className="flex items-center gap-2">
                 {/* Repeats Badge */}
                 <div className="flex items-center gap-1 text-[10px] font-bold text-primary uppercase tracking-wider">
                    <span className="text-base">{repeats}</span>
                    <span className="opacity-70">Reps</span>
                 </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-medium text-white/50 uppercase tracking-widest group-hover:text-primary transition-colors">
              <span>Practice</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
        </div>
      </motion.div>
    </Link>
  );
}
