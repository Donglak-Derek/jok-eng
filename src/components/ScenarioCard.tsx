"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Script } from "@/types";
import { motion } from "framer-motion";

type Props = {
  script: Script;
  index: number;
};

export default function ScenarioCard({ script, index }: Props) {
  const [repeats, setRepeats] = useState<number>(0);
  const repeatsKey = `jokeng:repeats:${script.id}`;

  useEffect(() => {
    const v = localStorage.getItem(repeatsKey);
    setRepeats(v ? Number(v) || 0 : 0);
  }, [repeatsKey]);

  // Mastery / Progress Logic (Simple Ring visualization)
  const getMasteryColor = (count: number) => {
    if (count >= 10) return "text-yellow-400";
    if (count >= 5) return "text-cyan-400";
    if (count >= 1) return "text-pink-400";
    return "text-muted/30";
  };
  const masteryColor = getMasteryColor(repeats);

  // Design Theme - Neon Comedy Club Vibe
  const gradients = [
    "from-purple-900/40 to-black border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.4)]",
    "from-pink-900/40 to-black border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.4)]",
    "from-blue-900/40 to-black border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.4)]",
  ];
  const theme = gradients[index % gradients.length];
  
  const icon = script.icon || "📝";

  // Type Label Logic
  const isStoryFlow = script.type === "story_flow";
  const typeLabel = isStoryFlow ? "Story Build" : "Scenario";
  const typeColor = isStoryFlow ? "text-pink-400 border-pink-500/40" : "text-cyan-400 border-cyan-500/40"; // Different neon colors for types

  return (
    <Link href={`/script/${script.id}`} className="block h-full">
      <motion.div
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={`relative h-full rounded-2xl border bg-card/60 backdrop-blur-md p-5 flex flex-col justify-between shadow-sm ${theme}`}
      >
        <div className="flex justify-between items-start mb-3">
           {/* Icon with Mastery Ring */}
           <div className="relative">
             <div className={`absolute inset-0 rounded-full border-2 border-current opacity-30 ${masteryColor}`} />
             {repeats > 0 && <div className={`absolute inset-0 rounded-full border-2 border-current border-t-transparent animate-[spin_3s_linear_infinite] ${masteryColor}`} />}
             
             <div className="w-12 h-12 rounded-full bg-background/50 flex items-center justify-center text-2xl shadow-sm relative z-10 m-1">
               {icon}
             </div>
           </div>

           <div className="flex flex-col items-end gap-1.5">
             {/* Type Badge */}
             <div className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border bg-black/40 shadow-[0_0_8px_rgba(0,0,0,0.5)] ${typeColor}`}>
               {typeLabel}
             </div>

             {/* Simple Counter Badge - Neon Style */}
             {repeats > 0 && (
               <div className="flex items-center gap-1 px-2 py-1 bg-black/60 rounded-md text-[10px] font-bold text-primary uppercase tracking-wider border border-primary/40 shadow-[0_0_8px_rgba(34,211,238,0.3)]">
                  <span>{repeats}</span>
                  <span className="text-[8px] opacity-80">Reps</span>
               </div>
             )}

             {/* Item Count Badge */}
             <div className="flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider border bg-black/40 text-muted-foreground border-white/10">
                <span>
                  {script.decoderItems?.length || script.segments?.length || script.sentences?.length || 0}
                </span>
                <span className="opacity-70">Items</span>
             </div>
           </div>
        </div>

        <div className="flex-1 min-h-[80px]">
          <h3 className="text-lg font-bold mb-1.5 leading-tight text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
            {script.title}
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed line-clamp-2 mb-1">
            {script.cleanedEnglish}
          </p>
          {script.cleanedKorean && (
            <p className="text-xs text-muted leading-relaxed line-clamp-2">
              {script.cleanedKorean}
            </p>
          )}
        </div>

        {/* Always Visible Action Button - Neon */}
        <div className="mt-4 flex items-center justify-between">
            <span className="text-[10px] font-medium text-white/50 uppercase tracking-widest pl-1">
              Tap to practice
            </span>
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/50 text-primary flex items-center justify-center shadow-[0_0_10px_rgba(34,211,238,0.4)]">
              <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
        </div>
      </motion.div>
    </Link>
  );
}
