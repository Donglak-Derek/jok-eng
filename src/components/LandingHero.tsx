"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/Button";
import InteractiveGridBackground from "@/components/Effects/InteractiveGrid";
import { motion } from "framer-motion";

export default function LandingHero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-12 md:pt-32 md:pb-20">
      <InteractiveGridBackground />
      
      <div className="container-minimal relative z-10 text-center space-y-8 px-4">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4"
        >
            {/* Brand Mark (Hero Image) */}
            <div className="flex justify-center mb-6">
                <div className="relative w-24 h-24 md:w-36 md:h-36 animate-in fade-in zoom-in duration-1000">
                     <Image 
                        src="/logo-v2.png" 
                        alt="Jok-Eng Crown" 
                        fill
                        sizes="(max-width: 768px) 96px, 128px"
                        className="object-contain drop-shadow-2xl"
                        priority
                     />
                </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/50 backdrop-blur-sm border border-border/50 text-sm font-medium text-muted-foreground mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                AI-Powered • Cultural Nuance • Totally Free
            </div>

            <h1 className="text-5xl xs:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-balance leading-[0.9]">
                Speak <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-blue-600 animate-gradient-x">
                    Like You Belong.
                </span>
            </h1>
        </motion.div>
        
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto text-balance leading-relaxed px-4 text-left md:text-center mt-6"
        >
            As an immigrant, the English I learned in school wasn&apos;t the English Americans actually use. 
            I created this app to bridge that gap—mastering the <strong>nuance, wit, and stamina</strong> of real conversation. 
            <br/><br/>
            <span className="text-foreground font-bold">Free to join. Open source your confidence.</span>
        </motion.p>
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="pt-8 flex flex-col md:flex-row items-center justify-center gap-4"
        >
            <Link href="/#vibe-check" passHref>
                <Button className="rounded-full px-10 py-8 text-xl font-bold bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40">
                    Try it Now (Free)
                </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-4 md:mt-0">
                No credit card required.
            </p>
        </motion.div>

         {/* Floating Elements / Decor - Floating Alphabets */}
         <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-10 opacity-10 pointer-events-none font-black text-primary"
         >
            <div className="text-6xl md:text-9xl drop-shadow-xl">Aa</div>
         </motion.div>
         
         <motion.div 
            animate={{ y: [0, 25, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-10 opacity-10 pointer-events-none font-serif text-blue-500"
         >
            <div className="text-7xl md:text-[10rem] drop-shadow-xl">?</div>
         </motion.div>
         
         <motion.div 
            animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/3 left-20 hidden md:block opacity-10 pointer-events-none font-mono text-purple-500"
         >
            <div className="text-8xl drop-shadow-xl">Bb</div>
         </motion.div>
         
         <motion.div 
             animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
             transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
             className="absolute top-1/3 right-20 hidden md:block opacity-10 pointer-events-none font-black text-pink-500"
         >
             <div className="text-9xl drop-shadow-xl">Cc</div>
         </motion.div>

        <motion.div 
             animate={{ y: [0, -25, 0] }}
             transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
             className="absolute top-20 left-1/3 opacity-5 pointer-events-none font-serif"
         >
             <div className="text-5xl md:text-8xl">Hey</div>
         </motion.div>
      </div>
    </section>
  );
}
