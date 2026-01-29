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
                         className="relative"
                     >
                        <div className="aspect-square relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-border/20 shadow-2xl">
                             {/* Abstract UI Mockup */}
                             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                             <div className="absolute inset-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm p-6 flex flex-col justify-between">
                                 <div className="space-y-4">
                                     <div className="h-2 w-1/3 bg-white/20 rounded-full" />
                                     <div className="space-y-2">
                                         <div className="h-2 w-full bg-white/10 rounded-full" />
                                         <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                                     </div>
                                 </div>
                                 
                                 <div className="p-4 rounded-xl bg-primary/20 border border-primary/30">
                                     <div className="text-sm font-mono text-primary mb-2">Analyzing Tone...</div>
                                     <div className="flex justify-between items-center text-xs text-white/70">
                                         <span>Aggressive</span>
                                         <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                                             <div className="h-full w-2/3 bg-primary" />
                                         </div>
                                         <span>Assertive</span>
                                     </div>
                                 </div>
                             </div>
                        </div>
                        
                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary rounded-full blur-3xl opacity-20" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary rounded-full blur-3xl opacity-20" />
                     </motion.div>

                </div>
             </div>
        </section>
    );
}
