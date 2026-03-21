"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function PracticeCTA() {
    return (
        <section className="w-full max-w-md mx-auto px-4 pb-20">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative bg-zinc-900 border-2 border-primary/30 p-8 rounded-sm overflow-hidden group hover:border-primary transition-all duration-500 shadow-2xl"
            >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rotate-12 translate-x-10 -translate-y-10 group-hover:translate-x-5 group-hover:-translate-y-5 duration-700">
                    <Zap className="w-64 h-64 text-primary" strokeWidth={3} />
                </div>

                <div className="relative z-10 space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <div className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">Advanced Training Unlocked</div>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase text-white leading-tight">
                            Beyond <br /> the Path.
                        </h2>
                        <p className="text-zinc-500 text-sm font-bold uppercase tracking-wide leading-relaxed max-w-[280px]">
                            Mastered the daily essentials? Enter the <span className="text-zinc-300 underline decoration-primary decoration-2 underline-offset-4">Arena</span> for specialized deep-dives.
                        </p>
                    </div>

                    <Link 
                        href="/practice"
                        className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 font-black uppercase tracking-widest text-xs rounded-sm hover:opacity-95 active:scale-95 transition-all shadow-xl shadow-primary/20"
                    >
                        Enter Practice Arena <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Industrial Corner Accents */}
                <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-primary/40" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-primary/40" />
                
                {/* Tactical serial number */}
                <div className="absolute bottom-4 left-8 text-[8px] font-black text-zinc-800 tracking-[0.4em] uppercase">
                    ARENA-REF-09-ALPHA
                </div>
            </motion.div>
        </section>
    );
}
