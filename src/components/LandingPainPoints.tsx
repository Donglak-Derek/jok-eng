"use client";

import { motion } from "framer-motion";
import { Frown, UserX } from "lucide-react";

export default function LandingPainPoints() {
    return (
        <section className="py-24 bg-secondary/10 relative overflow-hidden">
            {/* Background decorative blob */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-background to-transparent opacity-80 z-0" />

            <div className="container-minimal relative z-10 px-4">
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
                    >
                        The fear that one mistake could destroy everything you&apos;ve worked for.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-muted-foreground leading-relaxed"
                    >
                        For the high-functioning professional, &quot;less than perfect&quot; is the difference between leading a department and being sidelined.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Card 1: Loss of Authority */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-background border border-border/50 rounded-2xl p-8 hover:border-red-500/30 transition-colors group"
                    >
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Frown className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">The &quot;Fake Smile&quot; in Meetings</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            You aren&apos;t just losing the joke; you&apos;re losing the room. When you hesitate to speak up, your expertise is invisible. You are being paid less and promoted less than people with half your skill but double your &quot;banter&quot; fluency.
                        </p>
                    </motion.div>

                    {/* Card 2: Social Exclusion */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bg-background border border-border/50 rounded-2xl p-8 hover:border-red-500/30 transition-colors group"
                    >
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <UserX className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">The &quot;Secret Code&quot; Barrier</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Without the &quot;secret code,&quot; you lose meaningful connections. The language barrier isn&apos;t just about work; it&apos;s about your quality of life. Even after years in the country, you still feel like an &quot;intruder.&quot;
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
