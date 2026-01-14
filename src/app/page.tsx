"use client";

import Link from "next/link";
import Image from "next/image";
import { categories, scripts } from "@/data";
import Header from "@/components/Header";
import CommunityScenariosSection from "@/components/CommunityScenariosSection";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/Button";

import QuickStartInput from "@/components/QuickStartInput";
import InteractiveGridBackground from "@/components/Effects/InteractiveGrid";

type Tab = "categories" | "community";

export default function Home() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("categories");

  if (loading) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-black selection:text-white">
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-black selection:text-white">
      
      {/* LOGGED IN VIEW: Dashboard Mode */}
      {user ? (
        <div className="container-minimal pt-0 pb-8 flex flex-col gap-6">
            <Header />
            {/* Dashboard Controller Card */}
            <div className="bg-secondary/20 rounded-3xl px-3 py-4 md:p-6 mb-4 border border-border/50 flex flex-col gap-6">
                {/* Quick Start Input */}
                <QuickStartInput />

                {/* Premium Segmented Control */}
                <div className="flex justify-center">
                    <div className="inline-flex bg-background/50 p-1.5 rounded-full relative shadow-sm border border-border/50 w-full md:w-auto">
                        {(["categories", "community"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`
                                    relative flex-1 md:flex-initial px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 z-10
                                    ${activeTab === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
                                `}
                            >
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-background rounded-full shadow-md border border-border/20"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-20">
                                    {tab === "categories" && "Categories"}
                                    {tab === "community" && "Community"}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="min-h-[400px]"
                >
                    {activeTab === "categories" && (
                        <div>
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold tracking-tight mb-2">
                                    Pick your vibe
                                </h2>
                                <p className="text-muted text-lg">Choose a context to start practicing.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categories.map((c) => (
                            <Link
                                key={c.slug}
                                href={`/category/${c.slug}`}
                                className="group block"
                            >
                                <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-secondary mb-4">
                                    <Image
                                        src={c.image}
                                        alt={c.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-xl font-semibold group-hover:underline decoration-1 underline-offset-4">
                                        {c.name}
                                    </h3>
                                    <span className="text-sm text-muted">
                                        {scripts.filter((s) => s.categorySlug === c.slug).length} scripts
                                    </span>
                                </div>
                                <p className="text-muted mt-1 leading-relaxed">
                                    {c.description}
                                </p>
                            </Link>
                            ))}
                        </div>
                        </div>
                    )}

                    {activeTab === "community" && (
                        <CommunityScenariosSection />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
      ) : (
        /* GUEST VIEW: Marketing & Info */
        <div className="flex flex-col">
           <div className="container-minimal pt-0">
                <Header />
           </div>

           <div className="flex flex-col gap-24 pb-12">
                {/* HERO SECTION - Full Width */}
                <section className="relative w-full py-20 md:py-32 overflow-hidden">
                    <InteractiveGridBackground />
                    
                    <div className="container-minimal relative z-10 text-center space-y-8">
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-balance leading-[0.9]">
                            Don&apos;t just learn English. <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-blue-600 block sm:inline">Live it.</span>
                        </h1>
                        
                        <p className="text-xl md:text-3xl text-muted font-medium max-w-3xl mx-auto text-balance leading-relaxed">
                            The AI Director puts <span className="text-foreground font-bold underline decoration-primary/50 underline-offset-4">YOU</span> in the scene. Practice the exact conversations you need for your actual life.
                        </p>
                        
                        <div className="pt-8">
                            <Link href="/login" passHref>
                            <Button className="rounded-full px-10 py-8 text-xl font-bold bg-primary text-white hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
                                Start Being Funny
                            </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* WHY IT'S FUN (Scenario Showcase) */}
                <section className="container-minimal py-16 border-t border-border">
                    <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Stop studying. Start rehearsing.</h2>
                    <p className="text-xl text-muted max-w-2xl mx-auto">
                        Textbooks don&apos;t teach you how to ask for a raise or flirt at a bar. We do.
                    </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { 
                                emoji: "😰",
                                title: "The Situation", 
                                desc: "You have a super awkward conflict coming up at work.",
                                bg: "bg-orange-500/10 border-orange-500/20 text-orange-700" 
                            },
                            { 
                                emoji: "🤖",
                                title: "The Director", 
                                desc: "Tells the AI: 'I need to politely disagree with my boss about the budget.'",
                                bg: "bg-blue-500/10 border-blue-500/20 text-blue-700"
                            },
                            { 
                                emoji: "🎭",
                                title: "The Rehearsal", 
                                desc: "You get a custom script to practice until you're confident.",
                                bg: "bg-green-500/10 border-green-500/20 text-green-700"
                            }
                        ].map((step, i) => (
                            <div key={i} className={`relative p-8 rounded-3xl border ${step.bg} flex flex-col items-center text-center gap-4 transition-transform hover:-translate-y-1 duration-300`}>
                                <div className="text-6xl mb-2">{step.emoji}</div>
                                <h3 className="text-2xl font-bold">{step.title}</h3>
                                <p className="text-lg font-medium opacity-90 leading-relaxed">{step.desc}</p>
                                
                                {/* Connector Line (Desktop) */}
                                {i < 2 && (
                                    <div className="hidden md:block absolute top-1/2 -right-6 w-4 h-0.5 bg-border z-10" />
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* FEATURES */}
                <section className="container-minimal py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Everything you need to sound local.</h2>
                            <p className="text-xl text-muted leading-relaxed">
                                Forget generic phrases. Our curated packs cover the actual conversations that happen in offices, bars, and awkward dates.
                            </p>
                            <ul className="space-y-6 text-xl font-medium">
                                <li className="flex items-center gap-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary">✨</span>
                                    Curated &quot;Vibe&quot; Packs
                                </li>
                                <li className="flex items-center gap-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary">🔥</span>
                                    Community Scenarios
                                </li>
                                <li className="flex items-center gap-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary">🎬</span>
                                    AI Scenario Director
                                </li>
                            </ul>
                        </div>
                        <div className="aspect-square bg-secondary/30 rounded-[3rem] p-12 flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="text-9xl opacity-20 group-hover:scale-110 transition-transform duration-500">🎙️</div>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="container-minimal border-t border-border pt-16 pb-8 text-center text-sm text-muted">
                    <div className="flex justify-center gap-8 mb-8 font-medium text-foreground">
                        <Link href="#">About</Link>
                        <Link href="#">Pricing</Link>
                        <Link href="#">Terms</Link>
                    </div>
                    <p>
                        © {new Date().getFullYear()} JOK-ENG. Built for the cool late starters.
                    </p>
                </footer>
           </div>
        </div>
      )}
    </div>
    </div>
  );
}


