"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import BlogFeed from "@/components/content/BlogFeed";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { ADMIN_UID } from "@/lib/constants";

export default function BlogsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || user.uid !== ADMIN_UID)) {
            router.replace('/scenarios');
        }
    }, [user, loading, router]);

    if (loading || (!user || user.uid !== ADMIN_UID)) return null;

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
                            Cultural Insights
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-black italic tracking-tighter"
                        >
                            THE <span className="text-primary italic">BLOG</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl"
                        >
                            Deep dives into social calibration, cultural nuances, and Derek&apos;s &quot;Secret Sauce&quot; for sounding like a local.
                        </motion.p>
                    </div>

                    <BlogFeed />
                </div>
            </section>

            <Footer />
        </main>
    );
}
