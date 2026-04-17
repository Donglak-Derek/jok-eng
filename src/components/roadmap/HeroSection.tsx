"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroSection() {
    const [isShrunk, setIsShrunk] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setIsShrunk((prev) => !prev);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full py-24 flex flex-col items-center justify-center overflow-hidden bg-background">
            {/* Background Accents - Premium Glow */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-30">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="container-minimal flex flex-col items-center text-center space-y-10">
                {/* Premium Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 py-1.5 bg-zinc-950/50 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black tracking-[0.4em] uppercase text-zinc-400 mb-2 shadow-xl"
                >
                    Learn American English through Play
                </motion.div>

                {/* The Main Title */}
                <div className="relative flex flex-col items-center justify-center space-y-2 px-4">
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl font-black italic tracking-tighter uppercase text-white leading-none drop-shadow-2xl"
                    >
                        Jok<span className="text-primary">Eng</span>
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="h-1 w-32 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"
                    />
                </div>

                {/* New Slogan */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-6 max-w-2xl px-4"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground uppercase italic leading-[1.1]">
                        Master English, <br className="sm:hidden" /> the <span className="text-primary italic">Fun</span> Way.
                    </h2>
                    <p className="text-muted-foreground font-medium text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
                        Say goodbye to boring textbooks. 2-minute daily sessions that make you sound like a local.
                    </p>
                </motion.div>

                {/* Action Indicator */}
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="pt-12 flex flex-col items-center gap-3"
                >
                    <div className="w-px h-16 bg-gradient-to-b from-primary/50 to-transparent" />
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-500">Scroll to Explore</span>
                </motion.div>
            </div>
        </section>
    );
}
