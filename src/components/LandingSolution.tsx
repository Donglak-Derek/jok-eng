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
                        <p className="text-xl text-muted-foreground mb-8 text-balance leading-relaxed">
                           We don't change who you are; we bring out the <strong className="font-bold">best</strong> and most <strong className="font-bold">authentic</strong> parts of your leadership. It's not your English; it's that no one ever taught you <strong className="font-bold">how to lead</strong> in English.
                        </p>

                        <div className="space-y-6">
                            {[
                                {
                                    icon: Sliders,
                                    title: "Voice Control",
                                    desc: <span>Adjust your <strong className="font-bold">speed</strong> and <strong className="font-bold">tone</strong>. Sound warm or serious instantly.</span>,
                                    badge: "Working on it"
                                },
                                {
                                    icon: BrainCircuit,
                                    title: "Culture Guide",
                                    desc: <span>Understanding the <strong className="font-bold">vibes</strong>. Know why a joke is funny before you laugh.</span>
                                },
                                {
                                    icon: Globe,
                                    title: "Your True Style",
                                    desc: <span>Don't sound like a robot. Sound like <strong className="font-bold">YOU</strong>, but stronger.</span>
                                }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <item.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-lg font-bold">{item.title}</h4>
                                            {item.badge && (
                                                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                     {/* Visual/Image Side - Abstract Representation of "The Code" */}
                     {/* Visual/Image Side - Abstract Representation of "The Code" */}
                     <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                         whileInView={{ opacity: 1, scale: 1 }}
                         viewport={{ once: true }}
                         transition={{ delay: 0.2 }}
                         className="relative h-full min-h-[400px] flex items-center justify-center"
                     >
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-indigo-500/10 to-transparent rounded-full blur-[100px]" />
                        
                        {/* The "Decoder" Visual -> Good/Bad Comparison */}
                        <div className="relative z-10 w-full max-w-sm">
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="bg-background/80 backdrop-blur-xl border border-border/50 p-6 rounded-2xl shadow-2xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                                
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-xs font-mono text-primary uppercase tracking-widest">Decoded</span>
                                </div>

                                <div className="space-y-4">
                                    {/* BAD EXAMPLE */}
                                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex gap-3 items-center opacity-60 grayscale-[0.5]">
                                        <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs font-bold text-red-500">✕</span>
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Beginner</div>
                                            <p className="font-medium text-foreground line-through decoration-red-500/50">"I don't know."</p>
                                        </div>
                                    </div>

                                    {/* ARROW */}
                                    <div className="flex justify-center -my-2 opacity-50 relative z-10">
                                        <div className="p-1 rounded-full bg-background border border-border">
                                            <span className="text-xs text-muted-foreground">vs</span>
                                        </div>
                                    </div>

                                    {/* GOOD EXAMPLE */}
                                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 flex gap-4 items-center shadow-lg scale-105 origin-center">
                                         <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 animate-pulse">
                                            <CheckCircle2 className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-primary font-bold uppercase tracking-wider mb-1">Professional (Leader)</div>
                                            <p className="font-bold text-lg text-foreground">"Let me look into that."</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                     </motion.div>

                </div>
             </div>
        </section>
    );
}
