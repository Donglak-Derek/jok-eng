"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResumeBanner() {
    const [lastVisit, setLastVisit] = useState<{title: string, path: string, type: string} | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("jokeng_last_visit");
        if (stored) {
            try {
                setLastVisit(JSON.parse(stored));
            } catch (e) {}
        }
    }, []);

    // Only show if it matches expected format
    if (!lastVisit || !lastVisit.path || !lastVisit.title) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl mx-auto px-4 md:px-0 mb-8"
            >
                <Link href={lastVisit.path} className="block group outline-none">
                    <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center justify-between transition-all duration-300 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0 relative overflow-hidden">
                                <div className="absolute inset-0 bg-primary/10 group-hover:scale-110 transition-transform duration-500" />
                                <PlayCircle className="w-6 h-6 relative z-10" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-black tracking-widest text-primary/80 mb-1">
                                    Resume Session • {lastVisit.type}
                                </p>
                                <p className="text-base font-bold text-white group-hover:text-primary transition-colors">
                                    {lastVisit.title}
                                </p>
                            </div>
                        </div>
                        <div className="text-primary font-black text-xl opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all mr-2">
                            &rarr;
                        </div>
                    </div>
                </Link>
            </motion.div>
        </AnimatePresence>
    );
}
