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
            {/* Brand Mark */}
            <div className="flex justify-center mb-6">
                <div className="relative w-24 h-24 md:w-32 md:h-32 animate-in fade-in zoom-in duration-1000">
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
                AI-Powered English Scenarios
            </div>

            <h1 className="text-5xl xs:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-balance leading-[0.9]">
                English that knows <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-blue-600 animate-gradient-x">
                    your context.
                </span>
            </h1>
        </motion.div>
        
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-muted-foreground font-medium max-w-3xl mx-auto text-balance leading-relaxed"
        >
            Stop practicing &quot;The cat is on the table.&quot; <br/>
            Start practicing &quot;My PR was merged&quot; or &quot;This latte is too hot.&quot;
        </motion.p>
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="pt-8 flex flex-col md:flex-row items-center justify-center gap-4"
        >
            <Link href="/login" passHref>
                <Button className="rounded-full px-10 py-8 text-xl font-bold bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40">
                    Get Your Personal Script
                </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-4 md:mt-0">
                No credit card required.
            </p>
        </motion.div>

         {/* Floating Elements / Decor */}
         <div className="absolute top-1/2 left-10 hidden lg:block opacity-20 pointer-events-none">
            <div className="text-6xl rotate-12">🍳</div>
         </div>
         <div className="absolute top-1/3 right-10 hidden lg:block opacity-20 pointer-events-none">
            <div className="text-6xl -rotate-12">👔</div>
         </div>
      </div>
    </section>
  );
}
