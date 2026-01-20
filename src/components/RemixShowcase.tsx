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
    <section className="container-minimal py-24 border-t border-border/50">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-secondary mb-4">
            <Wand2 className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">The &quot;Smart Remix&quot; Engine.</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t see a scenario for your job? Click one button, and our AI rewrites it for your specific role.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Controls */}
        <div className="lg:col-span-4 flex flex-col gap-4">
            {(Object.keys(scenarios) as Array<keyof typeof scenarios>).map((key) => (
                <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`
                        text-left p-6 rounded-3xl border transition-all duration-300 relative overflow-hidden group
                        ${activeTab === key 
                            ? "bg-secondary border-primary/50 shadow-lg" 
                            : "bg-background border-border hover:border-primary/20"}
                    `}
                >
                    <div className="flex items-center gap-4 relative z-10">
                        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{scenarios[key].icon}</span>
                        <div>
                            <h3 className={`font-bold text-lg ${activeTab === key ? "text-foreground" : "text-muted-foreground"}`}>
                                I&apos;m a {scenarios[key].role}
                            </h3>
                        </div>
                         {activeTab === key && (
                            <motion.div 
                                layoutId="active-indicator"
                                className="absolute right-6 text-primary"
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
            <div className="relative bg-secondary/30 rounded-[3rem] p-8 md:p-12 border border-border/50 overflow-hidden">
                 <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-8"
                    >
                         {/* Card 1: Original */}
                         <div className="bg-background rounded-2xl p-6 shadow-sm border border-border/50 opacity-60 scale-95 origin-bottom-left">
                            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Original Scenario</div>
                            <p className="text-lg text-foreground/80">{scenarios[activeTab].original}</p>
                         </div>

                        {/* Arrow */}
                         <div className="flex justify-center -my-4 relative z-10">
                            <div className={`p-3 rounded-full bg-gradient-to-r ${scenarios[activeTab].color} text-white shadow-lg shadow-purple-500/20`}>
                                <RefreshCcw className="w-6 h-6 animate-spin-slow" />
                            </div>
                         </div>

                         {/* Card 2: Remixed */}
                         <div className="bg-background rounded-3xl p-8 shadow-xl border-2 border-primary/20 relative overflow-hidden">
                            <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${scenarios[activeTab].color}`} />
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-bold uppercase">Magically Adapted</span>
                            </div>
                            <p className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                                {scenarios[activeTab].remixed}
                            </p>
                         </div>
                    </motion.div>
                 </AnimatePresence>
                 
                 <div className="mt-8 text-center bg-background/50 rounded-xl p-4 backdrop-blur-sm">
                     <p className="mb-4 text-muted-foreground">Ready to remix your own?</p>
                     <Link href="/login" passHref>
                        <Button variant="outline" className="rounded-full px-8 border-primary/20 hover:bg-primary/5 hover:text-primary">
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
