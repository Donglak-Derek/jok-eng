"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import CategoryCarousel from "@/components/CategoryCarousel";
import ScenarioList from "@/components/ScenarioList";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search } from "lucide-react";
import { scripts } from "@/data";

export default function ScenariosPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredScripts = scripts.filter(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.context || s.cleanedEnglish || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-background">
            <Header />

            <section className="pt-32 pb-20 px-4 md:px-0">
                <div className="max-w-2xl mx-auto space-y-12 w-full">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
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
                                Scenario Library
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl font-black italic tracking-tighter"
                            >
                                SOCIAL <span className="text-primary italic">PLAYBOOK</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl"
                            >
                                Browse hundreds of real-world scenarios. Filter by workplace, social life, or custom situations.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative w-full md:w-80"
                        >
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search situations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                            />
                        </motion.div>
                    </div>

                    <div className="space-y-20">
                        <section>
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold tracking-tight">Browse by Vibe</h2>
                                <p className="text-muted-foreground">Pick a category to start your rehearsal.</p>
                            </div>
                            <CategoryCarousel />
                        </section>

                        <section>
                            <div className="mb-8">
                                <h2 className="text-3xl font-black tracking-tighter italic uppercase">
                                    Story <span className="text-primary italic">Feed</span>
                                </h2>
                                <p className="text-muted-foreground text-lg">Browse our complete library of social playbooks.</p>
                            </div>
                            <Suspense fallback={<div className="text-muted-foreground animate-pulse">Loading scenarios...</div>}>
                                <ScenarioList scripts={filteredScripts} />
                            </Suspense>
                        </section>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
