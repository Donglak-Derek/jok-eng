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
        <section className="relative w-full py-20 flex flex-col items-center justify-center overflow-hidden bg-background">
            {/* Background Military Accents */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-20">
                <div className="absolute top-10 left-10 w-32 h-32 border-l-4 border-t-4 border-primary" />
                <div className="absolute bottom-10 right-10 w-32 h-32 border-r-4 border-b-4 border-primary" />
            </div>

            <div className="container-minimal flex flex-col items-center text-center space-y-8">
                {/* Military Serial Number / Tag */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-sm text-[10px] font-black tracking-[0.3em] uppercase text-primary mb-4"
                >
                    Mission: Amly // Social Engine Upgrade
                </motion.div>

                {/* The Main Animation */}
                <div className="relative flex items-center justify-center text-4xl xs:text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tighter uppercase leading-none w-full px-4">
                    <span className="text-primary italic shrink-0">Am</span>
                    
                    <motion.div
                        animate={{ 
                            width: isShrunk ? 0 : "auto",
                            opacity: isShrunk ? 0 : 1,
                            marginRight: isShrunk ? 0 : "0.15em",
                            marginLeft: isShrunk ? 0 : "0.1em",
                            scaleX: isShrunk ? 0.5 : 1
                        }}
                        transition={{ 
                            duration: 0.8, 
                            ease: [0.16, 1, 0.3, 1] 
                        }}
                        className="overflow-hidden whitespace-nowrap text-muted-foreground/40 origin-left"
                    >
                        erican +
                    </motion.div>

                    <span className="text-primary italic shrink-0">ly</span>
                </div>

                {/* Motivational Copy */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4 max-w-2xl"
                >
                    <h2 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase italic leading-tight">
                        Do this! <br className="sm:hidden" /> For your <span className="text-primary">English!</span>
                    </h2>
                    <p className="text-muted-foreground font-medium text-lg md:text-xl">
                        Do this 2 min everyday for 90 days if you want to be <span className="font-bold text-foreground underline decoration-primary decoration-4">Amly</span>.
                    </p>
                </motion.div>

                {/* Action Indicator */}
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="pt-10 flex flex-col items-center gap-2"
                >
                    <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
                    <span className="text-[10px] font-black tracking-widest uppercase text-muted-foreground/60">Scroll to Deploy</span>
                </motion.div>
            </div>
        </section>
    );
}
