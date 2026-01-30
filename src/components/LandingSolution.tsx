"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Sliders, BrainCircuit, Globe } from "lucide-react";

export default function LandingSolution() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden">
             <div className="container-minimal px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                            The Solution
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
                            The <span className="text-primary">Secret Code</span> manual for immigrants who want to be themselves.
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8 text-balance">
                           We don't change who you are; we bring out the best and most authentic parts of your leadership. It's not your English; it's that no one ever taught you how to lead in English.
                        </p>

                        <div className="space-y-6">
                            {[
                                {
                                    icon: Sliders,
                                    title: "The Soundboard Framework",
                                    desc: "Adjust your vocal pace, assertiveness, and warmth for any scenario—from negotiation to networking."
                                },
                                {
                                    icon: BrainCircuit,
                                    title: "Cultural Intelligence (CQ)",
                                    desc: "Decode the 'vibes' and context. Understand why the joke is funny before you even hear it."
                                },
                                {
                                    icon: Globe,
                                    title: "Authentic Executive Presence",
                                    desc: "Stop trying to sound 'native'. Start sounding powerful. Turn your accent into your signature."
                                }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <item.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold">{item.title}</h4>
                                        <p className="text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                     {/* Visual/Image Side - Abstract Representation of "The Code" */}
                     <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                         whileInView={{ opacity: 1, scale: 1 }}
                         viewport={{ once: true }}
                         transition={{ delay: 0.2 }}
                         className="relative h-full min-h-[400px] flex items-center justify-center"
                     >
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-indigo-500/10 to-transparent rounded-full blur-[100px]" />
                        
                        {/* The "Decoder" Visual */}
                        <div className="relative z-10 w-full max-w-sm">
                            {/* 1. The Confusion (Noise) */}
                            <div className="space-y-4 mb-4 opacity-30 mx-auto w-[90%] scale-95 blur-[2px]">
                                 <div className="h-3 w-3/4 bg-foreground/20 rounded-full" />
                                 <div className="h-3 w-full bg-foreground/20 rounded-full" />
                                 <div className="h-3 w-5/6 bg-foreground/20 rounded-full" />
                            </div>

                            {/* 2. The Clarity (Signal) - The "Secret Code" */}
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="bg-background/80 backdrop-blur-xl border border-primary/40 p-6 rounded-2xl shadow-2xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                                
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-xs font-mono text-primary uppercase tracking-widest">Decoded</span>
                                </div>
                                <h3 className="text-xl font-bold leading-relaxed">
                                    "It's not about being <span className="text-primary decoration-wavy underline decoration-primary/30">polite</span>.<br/> It's about being <span className="text-foreground bg-primary/20 px-1 rounded">understood</span>."
                                </h3>
                                <div className="mt-4 flex gap-2">
                                    <span className="text-[10px] px-2 py-1 rounded bg-secondary text-secondary-foreground font-mono">Tone: Assertive</span>
                                    <span className="text-[10px] px-2 py-1 rounded bg-secondary text-secondary-foreground font-mono">Context: High</span>
                                </div>
                            </motion.div>

                            {/* 3. More Noise */}
                            <div className="space-y-4 mt-4 opacity-30 mx-auto w-[90%] scale-95 blur-[2px]">
                                 <div className="h-3 w-5/6 bg-foreground/20 rounded-full" />
                                 <div className="h-3 w-2/3 bg-foreground/20 rounded-full" />
                            </div>
                        </div>
                     </motion.div>

                </div>
             </div>
        </section>
    );
}
