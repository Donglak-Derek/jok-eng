"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function NewsletterSignup() {
    return (
        <section className="w-full py-12 md:py-20">
            <div className="relative overflow-hidden bg-primary rounded-[2.5rem] p-8 md:p-16 text-primary-foreground text-center">
                {/* Decorative backgrounds */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

                <div className="relative z-10 max-w-2xl mx-auto space-y-6 md:space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Join the Club</h2>
                        <p className="text-lg md:text-xl opacity-90 font-medium">
                            Get weekly scenarios, slang updates, and cultural tips delivered straight to your inbox.
                        </p>
                    </motion.div>

                    <form
                        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 rounded-full bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all backdrop-blur-sm"
                        />
                        <button
                            type="submit"
                            className="bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 group"
                        >
                            Sign Up
                            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </button>
                    </form>

                    <p className="text-xs opacity-70">
                        No spam. Just English that doesn&apos;t suck. Unsubscribe anytime.
                    </p>
                </div>
            </div>
        </section>
    );
}
