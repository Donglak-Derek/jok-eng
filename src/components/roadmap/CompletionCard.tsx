"use client";

import { motion } from "framer-motion";
import { Trophy, RotateCcw, Star, Medal, Lock } from "lucide-react";

interface CompletionCardProps {
    onReset: () => void;
    completions: number;
    isLocked: boolean;
}

export default function CompletionCard({ onReset, completions, isLocked }: CompletionCardProps) {
    return (
        <section className="w-full max-w-md mx-auto px-4 py-12">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`relative border-2 p-8 rounded-sm text-center space-y-6 overflow-hidden transition-all duration-700 ${
                    isLocked 
                    ? 'bg-zinc-900 border-zinc-800 grayscale-[0.5]' 
                    : 'bg-zinc-950 border-primary/50 shadow-[0_0_40px_rgba(var(--primary),0.1)]'
                }`}
            >
                {/* Visual Glow */}
                {!isLocked && <div className="absolute inset-0 bg-primary/5 blur-[100px] pointer-events-none" />}

                <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className={`p-4 rounded-full border transition-all duration-700 ${
                        isLocked ? 'bg-zinc-800 border-zinc-700' : 'bg-primary/10 border-primary/30'
                    }`}>
                        <Trophy className={`w-12 h-12 transition-all duration-700 ${
                            isLocked ? 'text-zinc-600' : 'text-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]'
                        }`} />
                    </div>
                    
                    <div className="space-y-2">
                        <h2 className={`text-3xl font-black italic tracking-tighter uppercase leading-tight transition-colors duration-700 ${
                            isLocked ? 'text-zinc-600' : 'text-white'
                        }`}>
                            {isLocked ? "The Final Frontier." : "Excellent Work, Soldier."}
                        </h2>
                        <p className="text-zinc-500 text-sm font-bold uppercase tracking-wide leading-relaxed max-w-[300px] mx-auto">
                            {isLocked 
                                ? "Complete the full 90-day mission tree to earn your legendary Social Master badge and restart the cycle."
                                : "The mission is complete, but the training never stops. If you're not 100% confident yet, hit it again."
                            }
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-3 py-6 bg-zinc-900/50 w-full border-y border-zinc-800/50">
                        <div className="flex items-center gap-2">
                             <Medal className={`w-5 h-5 ${isLocked ? 'text-zinc-700' : 'text-primary'}`} />
                             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                                {isLocked ? "Mission Tracking Active" : "Tactical Achievement Status"}
                             </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            {[...Array(5)].map((_, i) => (
                                <Star 
                                    key={i} 
                                    className={`w-6 h-6 transition-all duration-700 ${i < completions ? 'text-primary fill-primary scale-110' : 'text-zinc-800'}`} 
                                />
                            ))}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-700">
                            Roadmap Cycles: {completions}
                        </span>
                    </div>

                    <button 
                        onClick={onReset}
                        disabled={isLocked}
                        className={`group w-full flex items-center justify-center gap-3 px-8 py-5 font-black uppercase tracking-widest text-xs rounded-sm transition-all duration-500 shadow-xl ${
                            isLocked 
                            ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-700' 
                            : 'bg-primary text-primary-foreground hover:opacity-90 active:scale-95 shadow-primary/20'
                        }`}
                    >
                        {isLocked ? (
                            <Lock className="w-4 h-4" />
                        ) : (
                            <RotateCcw className="w-4 h-4 group-hover:rotate-[-180deg] transition-transform duration-700" />
                        )}
                        {isLocked ? "Complete Day 90 to Claim Badge" : "Claim Badge & Restart Mission"}
                    </button>
                    
                    {!isLocked && (
                        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-tighter">
                            Note: This will reset your current progress to Day 1 but keep your completion badges.
                        </p>
                    )}
                </div>

                {/* Industrial Corner Accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-primary/30" />
                <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-primary/30" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-primary/30" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-primary/30" />
            </motion.div>
        </section>
    );
}
