"use client";

// import Image from "next/image";
// import { categories, scripts } from "@/data";
import Header from "@/components/Header";
import CategoryCarousel from "@/components/CategoryCarousel";
import DesktopNavigation from "@/components/DesktopNavigation";
import CommunityScenariosSection from "@/components/CommunityScenariosSection";
import FloatingCreateButton from "@/components/FloatingCreateButton";
import MyScenariosSection from "@/components/MyScenariosSection";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import DailyChallengeCard from "@/components/DailyChallengeCard";
import StreakWidget from "@/components/StreakWidget";

import QuickStartInput from "@/components/QuickStartInput";
import LandingHero from "@/components/LandingHero";
import RemixShowcase from "@/components/RemixShowcase";
import ModeCards from "@/components/ModeCards";
import MemberBenefits from "@/components/MemberBenefits";

type Tab = "home" | "my_scenarios";

function HomeContent() {
  const { user, loading } = useAuth();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as Tab) || "home";
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  useEffect(() => {
    const tab = searchParams.get("tab") as Tab;
    if (tab === "home" || tab === "my_scenarios") {
        setActiveTab(tab);
    }
  }, [searchParams]);

  if (loading) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-black selection:text-white">
      
      {/* LOGGED IN VIEW: Dashboard Mode */}
      {user ? (
        <div className="flex min-h-screen bg-background relative">
            {/* FAB (Mobile Only) */}
            <FloatingCreateButton />

            {/* 1. DESKTOP SIDEBAR (Spotify Style) */}
            <DesktopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
            
            {/* 2. MAIN CONTENT AREA */}
            <div className="flex-1 md:pl-64 flex flex-col min-h-0 overflow-y-auto w-full max-w-[100vw] overflow-x-hidden">
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

                    <StreakWidget />

                    {/* MOBILE ONLY: Tabs (Segmented Control) - Pushed down, subtle */}
                    <div className="md:hidden flex justify-center sticky top-0 z-10 py-0 bg-background/80 backdrop-blur-lg -mx-4 px-4 border-b border-border/50">
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
                                <div className="space-y-8 md:space-y-20">
                                    {/* 1. Daily Challenge (Now First) */}
                                    <div>
                                        <div className="mb-4 md:mb-6">
                                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-1 md:mb-2">Today&apos;s Challenge</h2>
                                            <p className="text-muted-foreground text-base md:text-lg">Daily practice to keep your streak alive.</p>
                                        </div>
                                        <DailyChallengeCard />
                                    </div>

                                    {/* 2. Categories */}
                                     <div>
                                         <div className="mb-4 md:mb-6">
                                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-1 md:mb-2">Pick your vibe</h2>
                                            <p className="text-muted-foreground text-base md:text-lg">Explore curated scenarios.</p>
                                        </div>
                                        <CategoryCarousel />
                                    </div>

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
            <Header />

           <div className="flex flex-col gap-0 pb-12">
                {/* 1. HERO */}
                <LandingHero />

                {/* 2. MODE CARDS (The How) */}
                <ModeCards />

                {/* VISUAL SEPARATOR */}
                <div className="w-full h-px bg-border/40 my-8" />

                {/* 3. SHOWCASE REMIX (Feature Explained First) */}
                <RemixShowcase />
                
                {/* 3.5 MEMBER BENEFITS (Why Sign In) */}
                <MemberBenefits />

                {/* 4. CONTENT PREVIEW (The What - Last Step) */}
                <section id="vibe-check" className="container-minimal py-12 md:py-16 bg-secondary/20 rounded-3xl my-8">
                     <div className="mb-8 text-center px-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70 mb-2 block animate-pulse">
                            ▼ Try it now
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Explore the Library</h2>
                        <p className="text-muted-foreground text-lg">
                            Real scenarios generated by users like you. Click to analyze.
                        </p>
                     </div>
                     <CategoryCarousel />
                </section>

                {/* 4. COMMUNITY FEED (Preview) */}
                <section className="container-minimal py-16">
                     {/* <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-center">Community Stories</h2> */}
                     <CommunityScenariosSection />
                </section>

                {/* FOOTER REMOVED (Global in Layout) */}
           </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
    return (
        <Suspense fallback={null}>
            <HomeContent />
        </Suspense>
    );
}


