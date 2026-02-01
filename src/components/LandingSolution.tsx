"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Sliders, BrainCircuit, Globe } from "lucide-react";

export default function LandingSolution() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden space-y-32">
             <div className="container-minimal px-4 relative z-10">
                
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                        The Solution
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
                        The <span className="text-primary">Secret Code</span> manual for immigrants who want to be themselves.
                    </h2>
                    <p className="text-xl text-muted-foreground text-balance leading-relaxed">
                        We don't change who you are; we bring out the <strong className="font-bold">best</strong> parts of your leadership.
                    </p>
                </div>

                {/* FEATURE 1: VOICE CONTROL */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <Sliders className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold">Voice Control</h3>
                             <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">Working on it</span>
                        </div>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Adjust your <strong className="font-bold">speed</strong> and <strong className="font-bold">tone</strong>. Sound warm or serious instantly. Stop sounding unsure when you are actually the expert.
                        </p>
                    </motion.div>

                    {/* VISUAL 1 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative flex justify-center"
                    >
                        <ComparisonCard 
                            title="Confidence"
                            badLabel="Beginner"
                            badText='"I don&apos;t know."'
                            goodLabel="Leader"
                            goodText='"Let me look into that."'
                        />
                    </motion.div>
                </div>

                {/* FEATURE 2: CULTURE GUIDE */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:order-last"
                    >
                         <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <BrainCircuit className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold">Culture Guide</h3>
                        </div>
                         <p className="text-xl text-muted-foreground leading-relaxed">
                            Understanding the <strong className="font-bold">vibes</strong>. Know why a joke is funny before you laugh. Learn how to disagree without making enemies.
                        </p>
                    </motion.div>

                     <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative flex justify-center lg:order-first"
                    >
                         <ComparisonCard 
                            title="Disagreement"
                            badLabel="Too Direct"
                            badText='"That is wrong."'
                            goodLabel="Nuanced"
                            goodText='"I see your point, but have we considered..."'
                        />
                    </motion.div>
                </div>


                {/* FEATURE 3: TRUE STYLE */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                         <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <Globe className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold">Your True Style</h3>
                        </div>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                             Don't sound like a robot. Sound like <strong className="font-bold">YOU</strong>, but stronger. Move beyond "Fine, thanks" into real connections.
                        </p>
                    </motion.div>

                    {/* VISUAL 3 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative flex justify-center"
                    >
                        <ComparisonCard 
                            title="Small Talk"
                            badLabel="Scripted"
                            badText='"I am fine, thank you."'
                            goodLabel="Authentic"
                            goodText='"Actually, it&apos;s been a crazy week!"'
                        />
                    </motion.div>
                </div>

             </div>
        </section>
    );
}

function ComparisonCard({ title, badLabel, badText, goodLabel, goodText }: { title: string, badLabel: string, badText: string, goodLabel: string, goodText: string }) {
    return (
        <div className="bg-background/80 backdrop-blur-xl border border-border/50 p-6 rounded-2xl shadow-2xl relative overflow-hidden max-w-sm w-full">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            
            <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-mono text-primary uppercase tracking-widest">Decoded: {title}</span>
            </div>

            <div className="space-y-4">
                {/* BAD EXAMPLE */}
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex gap-3 items-center opacity-60 grayscale-[0.5]">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-red-500">✕</span>
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{badLabel}</div>
                        <p className="font-medium text-foreground line-through decoration-red-500/50">{badText}</p>
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
                        <div className="text-xs text-primary font-bold uppercase tracking-wider mb-1">{goodLabel}</div>
                        <p className="font-bold text-lg text-foreground">{goodText}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
