"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import StreakWidget from "@/components/StreakWidget";
import { Loader2, Star, Shield, Zap, Lock, Unlock, PlayCircle } from "lucide-react";
import HeroSection from "@/components/roadmap/HeroSection";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCategories } from "@/hooks/useCategories";
import ResumeBanner from "@/components/ResumeBanner";

function LandingDashboard() {
    const { user, loading: authLoading } = useAuth();
    const { categories, loading: categoriesLoading } = useCategories();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || authLoading || categoriesLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    // Mock paid items
    const paidItems = [
        {
            id: "dating-kit",
            title: "Dating & Flirting",
            description: "Learn how to be comfortable and charming on dates without trying too hard.",
            price: "$49",
            icon: <Zap className="w-8 h-8 text-rose-500 fill-rose-500/20" />,
            color: "from-zinc-950 to-rose-950/20",
            glow: "bg-rose-500/10",
            bgPattern: "bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.08)_0%,transparent_60%)]",
            link: "/shop/dating-kit",
            isOwned: false,
            buttonText: "Unlock Module",
        },
        {
            id: "corporate-power",
            title: "Office Power",
            description: "How to speak up in meetings and win respect from your boss.",
            price: "$79",
            icon: <Shield className="w-8 h-8 text-indigo-400 fill-indigo-400/20" />,
            color: "from-zinc-950 to-indigo-950/20",
            glow: "bg-indigo-500/10",
            bgPattern: "bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.08)_0%,transparent_60%)]",
            link: "/shop/corporate-power",
            isOwned: false,
            buttonText: "Unlock Module",
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground pb-20 overflow-x-hidden">
            <Header />

            <main className="flex-1 w-full pt-12 pb-20">
                <HeroSection />
                <ResumeBanner />

                {/* User Stats/Streak Area */}
                {user && (
                    <div className="max-w-4xl mx-auto px-4 md:px-0 mb-12 w-full">
                        <StreakWidget />
                    </div>
                )}

                <div className="max-w-4xl mx-auto px-4 w-full space-y-24">
                    
                    {/* Base Training */}
                    <section>
                        <div className="mb-8 pl-4 border-l-4 border-primary">
                            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-white">Base Training</h2>
                            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mt-2">The essential foundation for bulletproof social fluency.</p>
                        </div>

                        <Link href="/roadmap" className="block group">
                            <div className={`relative rounded-[32px] overflow-hidden border border-primary/50 bg-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20`}>
                                <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -z-10 bg-primary/20 opacity-50 group-hover:opacity-100 transition-opacity`} />
                                <div className={`relative h-full p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 bg-[radial-gradient(circle_at_bottom_right,rgba(var(--primary-rgb),0.05)_0%,transparent_60%)]`}>
                                    <div className="w-24 h-24 rounded-3xl bg-zinc-900 shadow-2xl flex items-center justify-center relative overflow-hidden shrink-0 border border-white/5">
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                                        <Star className="w-12 h-12 text-primary fill-primary/20 relative z-10" />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <span className="inline-block bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-sm shadow-sm ring-1 ring-primary/50 mb-4">
                                            Start Here
                                        </span>
                                        <h3 className={`text-3xl md:text-5xl font-black italic tracking-tight mb-4 text-white`}>
                                            90-Day Challenge
                                        </h3>
                                        <p className="text-zinc-400 font-medium leading-relaxed max-w-xl text-lg">
                                            Do this 2 minutes everyday for 90 days if you want to rebuild your social engine from the ground up.
                                        </p>
                                    </div>
                                    <div className="md:ml-auto w-full md:w-auto shrink-0">
                                        <div className="w-full py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
                                            <PlayCircle className="w-5 h-5" />
                                            Enter Arena
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </section>

                    {/* Sequential Curriculum */}
                    <section>
                        <div className="mb-8 pl-4 border-l-4 border-emerald-500">
                            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-white">The Curriculum</h2>
                            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mt-2">Logical progression from basic encounters to high-stakes environments.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                            {categories.map((c, i) => (
                                <motion.div
                                    key={c.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: i * 0.1 }}
                                    className="h-full"
                                >
                                    <Link href={`/category/${c.slug}`} className="block w-full h-full group outline-none">
                                        <div className="flex flex-col w-full h-full bg-zinc-900/50 rounded-[32px] shadow-2xl border border-white/5 overflow-hidden group-hover:border-emerald-500/30 transition-all duration-500 group-hover:-translate-y-1">
                                            <div className="relative w-full aspect-video bg-zinc-950 overflow-hidden">
                                                <Image
                                                    src={c.image || "/images/categories/small_talk.png"}
                                                    alt={c.name}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 400px"
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                                />
                                                
                                                <div className="absolute top-4 left-4">
                                                    <div className="bg-zinc-950/80 backdrop-blur-md text-emerald-500 border border-emerald-500/20 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm flex items-center gap-2">
                                                        <span>Phase {i + 1}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-zinc-950">
                                                <div className="mb-6">
                                                    <h3 className="font-black text-2xl md:text-3xl tracking-tight leading-tight italic uppercase text-white mb-4">
                                                        {c.name}
                                                    </h3>
                                                    <p className="text-base text-zinc-400 font-medium leading-relaxed">
                                                        {c.description}
                                                    </p>
                                                </div>
                                                <div className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500 group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                                                    Initialize Training <span className="text-lg opacity-50">&rarr;</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Paid Modules */}
                    <section>
                        <div className="mb-8 pl-4 border-l-4 border-rose-500">
                            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-white">Pro Modules</h2>
                            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mt-2">Advanced elite-level programs to push your limits.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                            {paidItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.4 }}
                                    className={`group relative rounded-[32px] overflow-hidden border border-white/5 bg-zinc-950 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-rose-500/30`}
                                >
                                    <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -z-10 ${item.glow} opacity-30 group-hover:opacity-60 transition-opacity`} />
                                    <div className={`relative h-full p-8 md:p-10 flex flex-col ${item.bgPattern}`}>
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="w-16 h-16 rounded-2xl bg-zinc-900 shadow-xl flex items-center justify-center relative overflow-hidden border border-white/5">
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                                                <div className="relative z-10">{item.icon}</div>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                {!item.isOwned ? (
                                                    <span className="bg-zinc-900 text-white text-sm font-black px-4 py-1.5 rounded-full border border-white/10">
                                                        {item.price}
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-500 text-sm font-black px-4 py-1.5 rounded-full border border-emerald-500/20">
                                                        <Unlock className="w-4 h-4" /> Purchased
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-2xl md:text-3xl font-black italic tracking-tight mb-4 uppercase text-white">
                                                {item.title}
                                            </h2>
                                            <p className="text-zinc-500 font-medium leading-relaxed mb-8 max-w-xl text-lg">
                                                {item.description}
                                            </p>
                                        </div>
                                        <Link 
                                            href={item.link}
                                            className="mt-auto w-full py-5 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 bg-zinc-900 text-white hover:bg-zinc-800 border border-white/5 transition-all active:scale-[0.98]"
                                        >
                                            <Lock className="w-5 h-5" />
                                            {item.buttonText}
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function Home() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <LandingDashboard />
        </Suspense>
    );
}
