"use client";

import { Suspense, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Shield, Zap, Lock, Unlock, PlayCircle, Target } from "lucide-react";
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
            title: "90-Day Social Master Roadmap",
            description: "The definitive, step-by-step psychological training system to completely rebuild your social engine from the ground up.",
            price: "Free",
            icon: <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />,
            color: "from-yellow-500 to-orange-600",
            glow: "bg-yellow-500/20",
            bgPattern: "bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.15)_0%,transparent_60%)]",
            link: "/roadmap", // Routes directly to the actual feature
            isOwned: true, // For MVP, assume they own it / it's the core feature
            buttonText: "Start Training",
            popular: true
        },
    ];

    const paidItems = [
        {
            id: "dating-kit",
            title: "The Dating Blueprint",
            description: "A 14-day rapid-fire course on flirtation, subtext, and building romantic tension without being weird.",
            price: "$49",
            icon: <Zap className="w-8 h-8 text-rose-400 fill-rose-400" />,
            color: "from-rose-500 to-pink-600",
            glow: "bg-rose-500/20",
            bgPattern: "bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.15)_0%,transparent_60%)]",
            link: "/shop/dating-kit",
            isOwned: false,
            buttonText: "Unlock Course",
            popular: false
        },
        {
            id: "corporate-power",
            title: "Corporate Power Player",
            description: "Navigate office politics, lead high-stakes meetings, and negotiate raises using tactical empathy.",
            price: "$79",
            icon: <Shield className="w-8 h-8 text-blue-400 fill-blue-400" />,
            color: "from-blue-500 to-indigo-600",
            glow: "bg-blue-500/20",
            bgPattern: "bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15)_0%,transparent_60%)]",
            link: "/shop/corporate-power",
            isOwned: false,
            buttonText: "Unlock Course",
            popular: false
        }
    ];

    if (!mounted) return null;

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground pb-20 overflow-x-hidden">
            <Header />

            <main className="flex-1 w-full pt-28 pb-20">
                {/* 1. The Guest Welcome / Login Alert Banner */}
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
                                    <h3 className="font-bold text-foreground tracking-tight text-lg">Save Your Progress</h3>
                                    <p className="text-sm text-muted-foreground font-medium">Create a free account to permanently save your Roadmap phase and XP.</p>
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
                    
                    {/* Hero Storefront Header */}
                    <div className="text-center mb-16 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-40 bg-primary/20 blur-[100px] rounded-full pointer-events-none -z-10" />
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-black uppercase tracking-[0.2em] mb-6">
                                The Amly Academy
                            </span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase mb-6 leading-[0.9]"
                        >
                            <span className="text-foreground drop-shadow-sm">Master Your</span> <br />
                            <span className="bg-gradient-to-br from-primary to-purple-600 bg-clip-text text-transparent drop-shadow-sm">Social Engine</span>
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-muted-foreground font-medium text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                        >
                            Premium interactive courses designed to rewire how you communicate, connect, and influence. 
                        </motion.p>
                    </div>

                    {/* Premium Product Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        {storeItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + (index * 0.1), duration: 0.4 }}
                                className={`group relative rounded-[32px] overflow-hidden border ${item.popular ? 'border-primary/50 md:col-span-2' : 'border-border'} bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
                            >
                                {/* Glowing Background Blur */}
                                <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -z-10 ${item.glow} opacity-50 group-hover:opacity-100 transition-opacity`} />
                                
                                {/* Inner Card Container */}
                                <div className={`relative h-full p-8 flex flex-col ${item.bgPattern}`}>
                                    
                                    {/* Top Section: Icon & Badges */}
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="w-16 h-16 rounded-2xl bg-zinc-900 shadow-xl flex items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                                            <div className="relative z-10">{item.icon}</div>
                                        </div>
                                        
                                        <div className="flex flex-col items-end gap-2">
                                            {item.popular && (
                                                <span className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                                                    Flagship Course
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

                                    {/* Content Section */}
                                    <div className="flex-1">
                                        <h2 className={`text-2xl md:text-3xl font-black italic tracking-tight mb-3 ${item.popular ? 'md:text-4xl' : ''}`}>
                                            {item.title}
                                        </h2>
                                        <p className="text-muted-foreground font-medium leading-relaxed mb-8 max-w-xl">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Action Button */}
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

                                    {/* Roadmap Progress specific inject (if owned and is flagship) */}
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

                    {/* Free / Open Categories (Moved from Arena) */}
                    <div className="mt-20 border-t border-border/50 pt-16 relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase mb-4">
                                Practice Category Library
                            </h2>
                            <p className="text-muted-foreground font-medium text-lg max-w-2xl mx-auto">
                                Free situational training modules. Jump in and start building your social muscles.
                            </p>
                        </div>
                        <TrainingPacks />
                    </div>

                    {/* Paid Modules Section */}
                    <div className="mt-20 border-t border-border/50 pt-16 relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase mb-4">
                                Premium Action Packs
                            </h2>
                            <p className="text-muted-foreground font-medium text-lg max-w-2xl mx-auto">
                                Deep dive into specialized psychological playbooks.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                            {paidItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + (index * 0.1), duration: 0.4 }}
                                    className={`group relative rounded-[32px] overflow-hidden border ${item.popular ? 'border-primary/50 md:col-span-2' : 'border-border'} bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
                                >
                                    {/* Glowing Background Blur */}
                                    <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -z-10 ${item.glow} opacity-50 group-hover:opacity-100 transition-opacity`} />
                                    
                                    {/* Inner Card Container */}
                                    <div className={`relative h-full p-8 flex flex-col ${item.bgPattern}`}>
                                        
                                        {/* Top Section: Icon & Badges */}
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="w-16 h-16 rounded-2xl bg-zinc-900 shadow-xl flex items-center justify-center relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                                                <div className="relative z-10">{item.icon}</div>
                                            </div>
                                            
                                            <div className="flex flex-col items-end gap-2">
                                                {item.popular && (
                                                    <span className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                                                        Flagship Course
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

                                        {/* Content Section */}
                                        <div className="flex-1">
                                            <h2 className={`text-2xl md:text-3xl font-black italic tracking-tight mb-3 ${item.popular ? 'md:text-4xl' : ''}`}>
                                                {item.title}
                                            </h2>
                                            <p className="text-muted-foreground font-medium leading-relaxed mb-8 max-w-xl">
                                                {item.description}
                                            </p>
                                        </div>

                                        {/* Action Button */}
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

export default function Home() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Storefront />
        </Suspense>
    );
}
