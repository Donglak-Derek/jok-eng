"use client";

import Link from "next/link";
import Image from "next/image";
import { categories, scripts } from "@/data";
import Header from "@/components/Header";
import CategoryCarousel from "@/components/CategoryCarousel";
import DesktopNavigation from "@/components/DesktopNavigation";
import CommunityScenariosSection from "@/components/CommunityScenariosSection";
import FloatingCreateButton from "@/components/FloatingCreateButton";
import MyScenariosSection from "@/components/MyScenariosSection";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import DailyChallengeCard from "@/components/DailyChallengeCard";
import { Button } from "@/components/Button";

import QuickStartInput from "@/components/QuickStartInput";
import InteractiveGridBackground from "@/components/Effects/InteractiveGrid";

type Tab = "home" | "my_scenarios";

export default function Home() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("home");

  if (loading) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-black selection:text-white">
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-black selection:text-white">
      
      {/* LOGGED IN VIEW: Dashboard Mode */}
      {user ? (
        <div className="flex min-h-screen bg-background relative">
            {/* FAB (Mobile Only) */}
            <FloatingCreateButton />

            {/* 1. DESKTOP SIDEBAR (Spotify Style) */}
            <DesktopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
            
            {/* 2. MAIN CONTENT AREA */}
            <div className="flex-1 md:pl-64 flex flex-col min-h-0 overflow-y-auto">
                {/* Mobile Header (Hidden on Desktop) */}
                <div className="md:hidden">
                    <Header />
                </div>
                
                <div className="container-minimal pt-4 md:pt-8 pb-8 flex flex-col gap-8 md:gap-10 max-w-7xl mx-auto px-4 md:px-12">
                   
                    {/* Desktop Header / Greeting - could go here, or just inline inputs */}
                    {/* Quick Start Input - Prominent HERO */}
                    <div className="max-w-3xl mx-auto w-full md:mt-4 relative z-20">
                        <QuickStartInput />
                    </div>

                    {/* MOBILE ONLY: Tabs (Segmented Control) - Pushed down, subtle */}
                    <div className="md:hidden flex justify-center sticky top-0 z-10 py-2 bg-background/80 backdrop-blur-lg -mx-4 px-4 border-b border-border/50">
                        <div className="inline-flex bg-secondary/50 p-1 rounded-full relative shadow-sm border border-border/50 w-full max-w-[300px]">
                            {(["home", "my_scenarios"] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`
                                        relative flex-1 px-4 py-1.5 rounded-full text-xs font-bold transition-colors duration-200 z-10 uppercase tracking-wide
                                        ${activeTab === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
                                    `}
                                >
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="activeTabMobile"
                                            className="absolute inset-0 bg-background rounded-full shadow-sm border border-border/10"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-20">
                                        {tab === "home" && "Discover"}
                                        {tab === "my_scenarios" && "Library"}
                                    </span>
                                </button>
                            ))}
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
                            {activeTab === "home" && (
                                <div className="space-y-16 md:space-y-20">
                                    {/* 1. Categories (Mobile: Carousel, Desktop: Grid) */}
                                    <CategoryCarousel />

                                    {/* 1.5 Daily Challenge */}
                                    <DailyChallengeCard />

                                    {/* 2. Community Feed */}
                                    <CommunityScenariosSection />
                                </div>
                            )}

                            {activeTab === "my_scenarios" && (
                                <div className="md:max-w-5xl md:mx-auto">
                                    <MyScenariosSection />
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
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


