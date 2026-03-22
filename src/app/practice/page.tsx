"use client";

import { Suspense, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Shield, Zap, Lock, Unlock, PlayCircle } from "lucide-react";
import { useUserProgress } from "@/hooks/useUserProgress";
import TrainingPacks from "@/components/practice/TrainingPacks";

function Storefront() {
    const { user } = useAuth();
    const { progress } = useUserProgress(user?.uid);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Placeholder data for future storefront expansions
    const storeItems = [
        {
            id: "90-day-roadmap",
            title: "Daily Social Grit",
            description: "The essential 2-minute daily foundation for bulletproof social fluency.",
            price: "Free",
            icon: <Star className="w-8 h-8 text-yellow-500 fill-yellow-500/20" />,
            color: "from-zinc-900 to-zinc-800",
            glow: "bg-indigo-500/10",
            bgPattern: "bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08)_0%,transparent_60%)]",
            link: "/", 
            isOwned: true, 
            buttonText: "Resume Training",
            popular: true
        },
    ];

    const paidItems = [
        {
            id: "dating-kit",
            title: "Flirtation Drills",
            description: "Master the art of calibrated attraction and high-stakes charisma.",
            price: "$49",
            icon: <Zap className="w-8 h-8 text-rose-500 fill-rose-500/20" />,
            color: "from-zinc-950 to-rose-950/20",
            glow: "bg-rose-500/10",
            bgPattern: "bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.08)_0%,transparent_60%)]",
            link: "/shop/dating-kit",
            isOwned: false,
            buttonText: "Unlock Module",
            popular: false
        },
        {
            id: "corporate-power",
            title: "Executive Presence",
            description: "Command the boardroom and navigate complex corporate politics with ease.",
            price: "$79",
            icon: <Shield className="w-8 h-8 text-indigo-400 fill-indigo-400/20" />,
            color: "from-zinc-950 to-indigo-950/20",
            glow: "bg-indigo-500/10",
            bgPattern: "bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.08)_0%,transparent_60%)]",
            link: "/shop/corporate-power",
            isOwned: false,
            buttonText: "Unlock Module",
            popular: false
        }
    ];

    if (!mounted) return null;

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground pb-20 overflow-x-hidden">
            <Header />

            <main className="flex-1 w-full pt-28 pb-20">
                {!user && (
                    <div className="max-w-4xl mx-auto px-4 mb-10 w-full">
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-secondary/40 border border-primary/20 backdrop-blur-md rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            <div className="flex items-center gap-4 z-10 w-full sm:w-auto text-center sm:text-left">
                                <div className="hidden sm:flex w-12 h-12 rounded-full bg-primary/10 items-center justify-center shrink-0">
                                    <Star className="w-6 h-6 text-primary shrink-0" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground tracking-tight text-lg">Lock In Your Gains!</h3>
                                    <p className="text-sm text-muted-foreground font-medium">Create a free account to permanently save your reps and XP.</p>
                                </div>
                            </div>
                            <Link 
                                href="/login" 
                                className="w-full sm:w-auto shrink-0 bg-foreground text-background px-6 py-2.5 rounded-xl font-bold text-sm tracking-wide hover:opacity-90 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 z-10 whitespace-nowrap"
                            >
                                Sign Up Free <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>
                )}

                <div className="max-w-4xl mx-auto px-4 w-full">
                    <div className="text-center mb-10 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-32 bg-primary/10 blur-[80px] rounded-full pointer-events-none -z-10" />
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="inline-block px-4 py-1.5 rounded-sm bg-primary/20 text-primary border border-primary/50 text-xs font-black uppercase tracking-[0.2em] mb-4">
                                Practice Arena
                            </span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter italic uppercase mb-4 leading-none"
                        >
                            <span className="text-foreground drop-shadow-sm">Training</span> <br />
                            <span className="text-primary drop-shadow-sm">Modules</span>
                        </motion.h1>
                    </div>

                    <div className="mt-12 relative z-10">
                        <TrainingPacks />
                    </div>

                    <div className="mt-20 border-t border-border/50 pt-12 relative z-10">
                        <div className="text-left mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                            <div>
                                <h2 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase text-foreground">
                                    Base Training
                                </h2>
                                <p className="text-muted-foreground font-medium text-sm mt-1">Foundational social conditioning for the long-term grind.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                            {storeItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + (index * 0.1), duration: 0.4 }}
                                    className={`group relative rounded-[32px] overflow-hidden border ${item.popular ? 'border-primary/50 md:col-span-2' : 'border-border'} bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
                                >
                                    <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -z-10 ${item.glow} opacity-50 group-hover:opacity-100 transition-opacity`} />
                                    <div className={`relative h-full p-8 flex flex-col ${item.bgPattern}`}>
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="w-16 h-16 rounded-2xl bg-zinc-900 shadow-xl flex items-center justify-center relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                                                <div className="relative z-10">{item.icon}</div>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                {item.popular && (
                                                    <span className="bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-sm shadow-sm ring-1 ring-primary/50">
                                                        90-Day Challenge
                                                    </span>
                                                )}
                                                {!item.isOwned ? (
                                                    <span className="bg-secondary text-secondary-foreground text-sm font-black px-4 py-1.5 rounded-full">
                                                        {item.price}
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-500 text-sm font-black px-4 py-1.5 rounded-full border border-emerald-500/20">
                                                        <Unlock className="w-4 h-4" /> {item.price === 'Free' ? 'Free' : 'Purchased'}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h2 className={`text-2xl md:text-3xl font-black italic tracking-tight mb-3 ${item.popular ? 'md:text-4xl' : ''}`}>
                                                {item.title}
                                            </h2>
                                            <p className="text-muted-foreground font-medium leading-relaxed mb-8 max-w-xl">
                                                {item.description}
                                            </p>
                                        </div>
                                        <Link 
                                            href={item.link}
                                            className={`mt-auto w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]
                                                ${item.isOwned 
                                                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20' 
                                                    : 'bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-800'
                                                }`}
                                        >
                                            {item.isOwned ? <PlayCircle className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                                            {item.buttonText}
                                        </Link>
                                        {item.popular && progress && (
                                            <div className="mt-4 flex items-center justify-between text-sm font-medium pt-4 border-t border-border/50">
                                                <span className="text-muted-foreground">Current Progress</span>
                                                <span className="text-primary font-black">Day {progress.currentDay} / 90</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-20 border-t border-border/50 pt-12 relative z-10">
                        <div className="text-left mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                            <div>
                                <h2 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase text-foreground">
                                    Premium Modules
                                </h2>
                                <p className="text-muted-foreground font-medium text-sm mt-1">Advanced elite-level programs to push your limits.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                            {paidItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + (index * 0.1), duration: 0.4 }}
                                    className={`group relative rounded-[32px] overflow-hidden border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
                                >
                                    <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -z-10 ${item.glow} opacity-50 group-hover:opacity-100 transition-opacity`} />
                                    <div className={`relative h-full p-8 flex flex-col ${item.bgPattern}`}>
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="w-16 h-16 rounded-2xl bg-zinc-900 shadow-xl flex items-center justify-center relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                                                <div className="relative z-10">{item.icon}</div>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                {!item.isOwned ? (
                                                    <span className="bg-secondary text-secondary-foreground text-sm font-black px-4 py-1.5 rounded-full">
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
                                            <h2 className="text-2xl md:text-3xl font-black italic tracking-tight mb-3">
                                                {item.title}
                                            </h2>
                                            <p className="text-muted-foreground font-medium leading-relaxed mb-8 max-w-xl">
                                                {item.description}
                                            </p>
                                        </div>
                                        <Link 
                                            href={item.link}
                                            className="mt-auto w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-800 transition-all active:scale-[0.98]"
                                        >
                                            <Lock className="w-5 h-5" />
                                            {item.buttonText}
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default function PracticePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Storefront />
        </Suspense>
    );
}
