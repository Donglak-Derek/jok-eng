"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/Button";
import Link from "next/link";
import { ArrowRight, Wand2, RefreshCcw } from "lucide-react";

export default function RemixShowcase() {
  const [activeTab, setActiveTab] = useState<"chef" | "tech" | "social">("chef");

  const scenarios = {
    chef: {
      icon: "🍳",
      role: "Chef",
      original: "You need to explain a software bug to a client.",
      remixed: "You need to explain a burnt steak to a VIP guest.",
      color: "from-orange-500 to-red-500"
    },
    tech: {
      icon: "💻",
      role: "Developer",
      original: "You are asking for a refund at a coffee shop.",
      remixed: "You are asking for a resource increase from DevOps.",
        color: "from-blue-500 to-cyan-500"
    },
    social: {
      icon: "🥂",
      role: "Social",
      original: "You are negotiating a salary raise.",
      remixed: "You are negotiating who pays the dinner bill.",
        color: "from-pink-500 to-purple-500"
    }
  };

  return (
    <section className="container-minimal py-12 md:py-24 border-t border-border/50">
      <div className="text-center mb-8 md:mb-16 space-y-4">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-secondary mb-2 md:mb-4">
            <Wand2 className="w-6 h-6 md:w-8 md:h-8 text-primary" />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">The &quot;Smart Remix&quot; Engine.</h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Adapt scenarios not just for your job, but for your culture. Explain kimchi to a westerner? Done.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
        {/* Left: Controls */}
        <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 lg:gap-4 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide snap-x px-1">
            {(Object.keys(scenarios) as Array<keyof typeof scenarios>).map((key) => (
                <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`
                        text-left p-4 lg:p-6 rounded-2xl lg:rounded-3xl border transition-all duration-300 relative overflow-hidden group flex-shrink-0 snap-center min-w-[140px] lg:min-w-0 flex-1
                        ${activeTab === key 
                            ? "bg-secondary border-primary/50 shadow-lg" 
                            : "bg-background border-border hover:border-primary/20"}
                    `}
                >
                    <div className="flex flex-col lg:flex-row items-center lg:items-center gap-2 lg:gap-4 relative z-10 justify-center lg:justify-start">
                        <span className="text-3xl lg:text-4xl group-hover:scale-110 transition-transform duration-300">{scenarios[key].icon}</span>
                        <div className="text-center lg:text-left">
                            <h3 className={`font-bold text-sm md:text-lg ${activeTab === key ? "text-foreground" : "text-muted-foreground"}`}>
                                {scenarios[key].role}
                            </h3>
                        </div>
                         {activeTab === key && (
                            <motion.div 
                                layoutId="active-indicator"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hidden lg:block"
                            >
                                <ArrowRight className="w-6 h-6" />
                            </motion.div>
                        )}
                    </div>
                </button>
            ))}
        </div>

        {/* Right: Demo Area */}
        <div className="lg:col-span-8">
            <div className="relative bg-secondary/30 rounded-3xl lg:rounded-[3rem] p-5 md:p-12 border border-border/50 overflow-hidden">
                 <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-4 md:gap-8"
                    >
                         {/* Card 1: Original */}
                         <div className="bg-background rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-border/50 opacity-60 scale-95 origin-bottom-left">
                            <div className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 md:mb-2">Original Scenario</div>
                            <p className="text-base md:text-lg text-foreground/80 leading-snug">{scenarios[activeTab].original}</p>
                         </div>

                        {/* Arrow */}
                         <div className="flex justify-center -my-6 md:-my-4 relative z-10">
                            <div className={`p-2 md:p-3 rounded-full bg-gradient-to-r ${scenarios[activeTab].color} text-white shadow-lg shadow-purple-500/20`}>
                                <RefreshCcw className="w-5 h-5 md:w-6 md:h-6 animate-spin-slow" />
                            </div>
                         </div>

                         {/* Card 2: Remixed */}
                         <div className="bg-background rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border-2 border-primary/20 relative overflow-hidden mt-2 md:mt-0">
                            <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${scenarios[activeTab].color}`} />
                            <div className="flex items-center gap-2 mb-2 md:mb-3">
                                <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] md:text-xs font-bold uppercase">Magically Adapted</span>
                            </div>
                            <p className="text-xl md:text-3xl font-bold text-foreground leading-tight">
                                {scenarios[activeTab].remixed}
                            </p>
                         </div>
                    </motion.div>
                 </AnimatePresence>
                 
                 <div className="mt-6 md:mt-8 text-center bg-background/50 rounded-xl p-4 backdrop-blur-sm">
                     <p className="mb-3 md:mb-4 text-sm md:text-base text-muted-foreground">Ready to remix your own?</p>
                     <Link href="/login" passHref>
                        <Button variant="outline" className="w-full md:w-auto rounded-full px-8 border-primary/20 hover:bg-primary/5 hover:text-primary">
                            Try Smart Remix Now
                        </Button>
                     </Link>
                 </div>
            </div>
        </div>
      </div>
    </section>
  );
}
