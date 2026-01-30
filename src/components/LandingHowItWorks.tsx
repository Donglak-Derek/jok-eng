"use client";

import { motion } from "framer-motion";
import { ScanSearch, Sparkles, TrendingUp } from "lucide-react";

export default function LandingHowItWorks() {
    const steps = [
        {
            icon: ScanSearch,
            step: "01",
            title: "Find Your Situation",
            desc: "Stop studying generic grammar. Search our library for the exact moment that stresses you out—like 'Disagreeing with a Boss' or 'Pub Talk'."
        },
        {
            icon: Sparkles,
            step: "02",
            title: "Remix with AI",
            desc: "One size doesn't fit all. Hit Remix to let AI rewrite the script for your specific context. Make it funny, serious, or urgent instantly."
        },
        {
            icon: TrendingUp,
            step: "03",
            title: "Lead with Impact",
            desc: "Practice until it feels natural. Walk into your next meeting with the 'Secret Code' already downloaded into your brain."
        }
    ];

    return (
        <section className="py-24 bg-background">
            <div className="container-minimal px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                     <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                        The Plan
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        How to bridge the gap in 3 simple steps.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((item, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                            <div className="relative bg-secondary/5 border border-border/50 rounded-2xl p-8 h-full">
                                <div className="text-6xl font-black text-border/40 absolute top-4 right-6 pointer-events-none">
                                    {item.step}
                                </div>
                                <div className="w-14 h-14 bg-background border border-border rounded-xl flex items-center justify-center mb-6 shadow-sm">
                                    <item.icon className="w-6 h-6 text-foreground" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
