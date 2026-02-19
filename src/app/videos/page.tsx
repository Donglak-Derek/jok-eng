"use client";

import { motion } from "framer-motion";
import VideoFeed from "@/components/content/VideoFeed";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function VideosPage() {
    return (
        <main className="min-h-screen bg-background">
            <Header />

            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="max-w-3xl space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Live Lessons
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-black italic tracking-tighter"
                        >
                            VIDEO <span className="text-primary italic">VAULT</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl"
                        >
                            Real social shortcuts extracted from Derek&apos;s latest videos. No textbook fluff, just calibrated communication.
                        </motion.p>
                    </div>

                    <VideoFeed />
                </div>
            </section>

            <Footer />
        </main>
    );
}
