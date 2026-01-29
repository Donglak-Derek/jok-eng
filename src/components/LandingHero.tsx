"use client";

import Link from "next/link";
import { Button } from "@/components/Button";
import LiveGradientBackground from "@/components/Effects/LiveGradientBackground";
import { motion } from "framer-motion";

interface LandingHeroProps {
    onStartDemo: () => void;
}

export default function LandingHero({ onStartDemo }: LandingHeroProps) {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-12 md:pt-32 md:pb-20 bg-background">
      <LiveGradientBackground />
      
      <div className="container-minimal relative z-10 text-center space-y-10 px-4 max-w-5xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Custom ease for premium feel
            className="space-y-6"
        >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 backdrop-blur-md border border-border/40 text-sm font-medium text-muted-foreground/80 mb-6 tracking-wide uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Jok-Eng.com &bull; Executive Presence
            </div>

            <h1 className="text-5xl xs:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-balance leading-[1.05] text-foreground">
                You heard every word, <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-foreground to-muted-foreground/70">
                   but you still didn't get the joke.
                </span>
            </h1>
        </motion.div>
        
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto text-balance leading-relaxed px-4"
        >
            The frustration of being a smart professional who sounds like a beginner because of a language barrier.
        </motion.p>
        
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
            <Button 
                onClick={onStartDemo}
                className="h-auto rounded-full px-12 py-6 text-xl font-bold bg-foreground text-background hover:bg-foreground/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-foreground/10"
            >
                Try it Now (Free)
            </Button>
             <p className="text-sm text-muted-foreground/60 font-medium">
                No credit card required.
            </p>
        </motion.div>
      </div>
    </section>
  );
}
