"use client";


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
      
      {/* Floating Background Letters - The "Live" Element */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
         {['A', 'b', 'C', 'd', 'E', 'f', 'G', 'h'].map((char, i) => (
             <motion.div
                key={i}
                className="absolute text-primary/40 font-black font-serif opacity-0"
                initial={{ 
                    x: Math.random() * 100 - 50, 
                    y: Math.random() * 100 + 100,
                    opacity: 0,
                    scale: 0.5
                }}
                animate={{ 
                    y: [0, -200, 0],
                    x: [0, (i % 2 === 0 ? 100 : -100), 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 20, -20, 0]
                }}
                transition={{ 
                    duration: 20 + Math.random() * 10, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: i * 2 
                }}
                style={{
                    left: `${(i + 1) * 12}%`,
                    top: `${40 + (i * 10)}%`,
                    fontSize: `${4 + i}rem`, // Dynamic size: 4rem quite big
                }}
             >
                 {char}
             </motion.div>
         ))}
      </div>
      
      <div className="container-minimal relative z-10 text-center space-y-10 px-4 max-w-5xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Custom ease for premium feel
            className="space-y-6"
        >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 backdrop-blur-md border border-border/40 text-sm font-medium text-muted-foreground/80 mb-6 tracking-wide uppercase group cursor-default hover:bg-secondary/50 transition-colors">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Jok-Eng.com &bull; Speak Like a Leader
            </div>

            <h1 className="text-5xl xs:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-balance leading-[1.05] text-foreground">
                You heard every word, <br className="hidden md:block"/>
                <motion.span 
                    className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground bg-[length:200%_auto]"
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                   but you still didn't get the joke.
                </motion.span>
            </h1>
        </motion.div>
        
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto text-balance leading-relaxed px-4"
        >
            You are an <strong className="font-bold">expert</strong> in your job. But in English, you feel like a <strong className="font-bold">beginner</strong>. We help you <strong className="font-bold">sound like yourself</strong> again.
        </motion.p>
        
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                    boxShadow: ["0 0 0 rgba(0,0,0,0)", "0 20px 50px -12px rgba(0,0,0,0.3)", "0 0 0 rgba(0,0,0,0)"] 
                }}
            >
                <Button 
                    onClick={onStartDemo}
                    className="h-auto rounded-full px-12 py-6 text-xl font-bold bg-foreground text-background hover:bg-foreground/90 transition-all shadow-2xl shadow-foreground/10"
                >
                    Try it Now (Free)
                </Button>
            </motion.div>
             <p className="text-sm text-muted-foreground/60 font-medium animate-pulse">
                No credit card required.
            </p>
        </motion.div>
      </div>
    </section>
  );
}
