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

  // Generate a deterministic gradient based on index/id for variety
  const gradients = [
    "from-pink-500/20 to-rose-500/20 border-rose-500/20 hover:border-rose-500/40",
    "from-purple-500/20 to-indigo-500/20 border-indigo-500/20 hover:border-indigo-500/40",
    "from-blue-500/20 to-cyan-500/20 border-cyan-500/20 hover:border-cyan-500/40",
    "from-emerald-500/20 to-teal-500/20 border-teal-500/20 hover:border-teal-500/40",
    "from-amber-500/20 to-orange-500/20 border-orange-500/20 hover:border-orange-500/40",
  ];
  const theme = gradients[index % gradients.length];
  
  // Icon patterns (simple SVG paths)
  const icons = [
    <path key="bolt" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />, // Bolt
    <path key="star" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />, // Star
    <path key="cube" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />, // Cube
    <path key="shield" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />, // Shield
    <path key="circle" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />, // Circle
  ];
  const icon = icons[index % icons.length];
  
  // Custom icon check (emoji or text)
  const customIcon = script.icon;

  return (
    <Link href={`/script/${script.id}`} className="block group">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`relative overflow-hidden rounded-3xl p-6 h-full flex flex-col justify-between border bg-gradient-to-br backdrop-blur-sm shadow-lg transition-all ${theme}`}
      >
        {/* Background Pattern */}
        <div className="absolute -right-8 -top-8 opacity-10 text-foreground rotate-12 group-hover:rotate-45 transition-transform duration-700">
           {customIcon ? (
             <span className="text-[100px] leading-none grayscale opacity-50">{customIcon}</span>
           ) : (
             <svg width="128" height="128" viewBox="0 0 24 24" fill="currentColor">{icon}</svg>
           )}
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-2xl bg-background/40 backdrop-blur border border-white/10 shadow-sm text-foreground flex items-center justify-center min-w-[48px] min-h-[48px]">
                {customIcon ? (
                  <span className="text-2xl">{customIcon}</span>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">{icon}</svg>
                )}
              </div>
             {repeats > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/60 text-xs font-bold text-primary border border-primary/20 shadow-sm">
                  <span>↻</span>
                  <span>{repeats}</span>
                </div>
             )}
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight group-hover:text-primary transition-colors">
            {script.title}
          </h3>
          <p className="text-sm md:text-base text-muted line-clamp-3 leading-relaxed">
            {script.cleanedEnglish}
          </p>
        </div>

        <div className="relative z-10 mt-6 md:mt-8 flex justify-end">
           <span className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background font-bold text-sm shadow-lg group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all transform translate-x-1 group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
             Start Training →
           </span>
           <span className="absolute right-0 bottom-1 flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-foreground/10 text-foreground font-bold text-sm transition-all group-hover:opacity-0 group-hover:scale-90">
             Start
           </span>
        </div>
      </motion.div>
    </Link>
  );
}
