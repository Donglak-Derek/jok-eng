"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ShieldCheck, Youtube, Instagram, ChevronLeft, ChevronRight } from "lucide-react";

const PAIN_POINTS = [
    {
        id: "isolated",
        label: "Isolated",
        quote: "I was in the room, but I wasn't in the conversation.",
        story: "They were joking and laughing. I just stood there smiling, hoping no one would ask me a question. I felt miles away."
    },
    {
        id: "stupid",
        label: "Stupid",
        quote: "I have a PhD, but I sounded like a child.",
        story: "I knew the answer. But by the time I constructed the sentence in my head, the topic had changed. I felt slow."
    },
    {
        id: "invisible",
        label: "Invisible",
        quote: "I spoke up, but they moved on like I said nothing.",
        story: "Five minutes later, a native speaker said the exact same thing content and everyone nodded. I felt like a ghost."
    },
    {
        id: "misunderstood",
        label: "Misunderstood",
        quote: "I tried to be direct, they thought I was angry.",
        story: "I didn't know the 'softeners' they use. My feedback came off as rude, but I was just trying to be clear."
    },
    {
        id: "frustrated",
        label: "Frustrated",
        quote: "I'm a senior manager, but I feel stuck.",
        story: "I can't show my real personality. My team respects my title, but they don't connect with *me*."
    },
    {
        id: "lonely",
        label: "Lonely",
        quote: "Lunch breaks were the hardest part of the day.",
        story: "Work is fine. It's the small talk, the happy hours, the casual chats. That's when I realize I'm alone."
    }
];

export default function LandingTrust() {
  const [activeId, setActiveId] = useState(PAIN_POINTS[0].id);
  const [isPaused, setIsPaused] = useState(false);
  const activePoint = PAIN_POINTS.find(p => p.id === activeId) || PAIN_POINTS[0];
  const activeIndex = PAIN_POINTS.findIndex(p => p.id === activeId);

  const handleNext = useCallback(() => {
      const nextIndex = (activeIndex + 1) % PAIN_POINTS.length;
      setActiveId(PAIN_POINTS[nextIndex].id);
  }, [activeIndex]);

  const handlePrev = useCallback(() => {
      const prevIndex = (activeIndex - 1 + PAIN_POINTS.length) % PAIN_POINTS.length;
      setActiveId(PAIN_POINTS[prevIndex].id);
  }, [activeIndex]);

  // Auto-play (5s)
  useEffect(() => {
      if (isPaused) return;
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  return (
    <section className="py-20 border-t border-border/40 bg-secondary/5">
      <div className="container-minimal px-4">
        
        {/* 1. Interactive Tags */}
        <div className="text-center mb-12">
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-8">
                Designed for everyone who has ever felt...
            </p>
            <div className="flex flex-wrap justify-center gap-3">
                {PAIN_POINTS.map((point) => {
                    const isActive = activeId === point.id;
                    return (
                        <button 
                            key={point.id}
                            onClick={() => setActiveId(point.id)}
                            className={`px-6 py-2 rounded-full border text-sm font-bold transition-all duration-300 ${
                                isActive 
                                ? "bg-primary text-primary-foreground border-primary scale-105 shadow-md" 
                                : "bg-background border-border/60 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                            }`}
                        >
                            {point.label}
                        </button>
                    );
                })}
            </div>
        </div>

        {/* 2. Dynamic Card - The Story with Carousel Controls */}
        <div 
            className="max-w-4xl mx-auto mb-20 min-h-[300px] flex items-center justify-center relative group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
             {/* LEFT ARROW */}
             <button 
                onClick={handlePrev}
                className="hidden md:flex absolute -left-12 lg:-left-16 z-20 w-10 h-10 items-center justify-center rounded-full bg-background border border-border/50 text-muted-foreground hover:scale-110 hover:border-foreground/50 hover:text-foreground transition-all shadow-sm"
            >
                <ChevronLeft className="w-6 h-6" />
             </button>

             {/* RIGHT ARROW */}
             <button 
                onClick={handleNext}
                className="hidden md:flex absolute -right-12 lg:-right-16 z-20 w-10 h-10 items-center justify-center rounded-full bg-background border border-border/50 text-muted-foreground hover:scale-110 hover:border-foreground/50 hover:text-foreground transition-all shadow-sm"
            >
                <ChevronRight className="w-6 h-6" />
             </button>

             <div className="w-full bg-background border border-border/50 rounded-2xl p-8 md:p-12 text-center relative shadow-xl overflow-hidden">
                <div className="text-6xl text-primary/10 absolute top-4 left-6 font-serif select-none">❝</div>
                 
                 <AnimatePresence mode="wait">
                    <motion.div
                        key={activePoint.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="relative z-10"
                    >
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif leading-tight italic text-foreground mb-6">
                            "{activePoint.quote}"
                        </h3>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            {activePoint.story}
                        </p>
                    </motion.div>
                 </AnimatePresence>

                 {/* Mobile Arrows (Bottom controls) */}
                 <div className="flex md:hidden justify-center gap-4 mt-8 pb-4">
                     <button onClick={handlePrev} className="p-2 bg-secondary/50 rounded-full"><ChevronLeft className="w-5 h-5"/></button>
                     <button onClick={handleNext} className="p-2 bg-secondary/50 rounded-full"><ChevronRight className="w-5 h-5"/></button>
                 </div>

                 <div className="mt-8 pt-8 border-t border-border/30 flex flex-col items-center animate-in fade-in duration-1000 delay-500">
                     <div className="font-bold text-lg">Sound familiar?</div>
                     <div className="text-sm text-muted-foreground mt-1">We built this to fix that.</div>
                 </div>
             </div>
        </div>

      </div>
    </section>
  );
}
