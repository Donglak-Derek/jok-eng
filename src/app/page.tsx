"use client";

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
import DemoBanner from "@/components/DemoBanner";
import GuestWelcome from "@/components/GuestWelcome";
import UpgradeModal from "@/components/subscription/UpgradeModal";
import Footer from "@/components/Footer";
import VideoFeed from "@/components/content/VideoFeed";
import BlogFeed from "@/components/content/BlogFeed";
import NewsletterSignup from "@/components/subscription/NewsletterSignup";

type Tab = "home" | "my_scenarios";

function HomeContent() {
    const { user, loading } = useAuth();
    const searchParams = useSearchParams();
    const initialTab = (searchParams.get("tab") as Tab) || "home";
    const [activeTab, setActiveTab] = useState<Tab>(initialTab);
    const [isDemoMode, setIsDemoMode] = useState(false);
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

    useEffect(() => {
        const tab = searchParams.get("tab") as Tab;
        if (tab === "home" || tab === "my_scenarios") {
            setActiveTab(tab);
        }

        if (searchParams.get("upgrade") === "true") {
            setIsUpgradeModalOpen(true);
        }
    }, [searchParams]);

    if (loading) return null;

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-black selection:text-white">

            <div className="flex min-h-screen bg-background relative flex-col md:flex-row">
                {/* FAB (Mobile Only) */}
                <FloatingCreateButton />

                {/* 1. DESKTOP SIDEBAR (Spotify Style) */}
                <div>
                    <DesktopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
                </div>

                {/* 2. MAIN CONTENT AREA */}
                <div className={`flex-1 md:pl-64 flex flex-col min-h-0 overflow-y-auto w-full max-w-[100vw] overflow-x-hidden pt-20 md:pt-12`}>
                    {/* Mobile Header (Hidden on Desktop) */}
                    <div className="md:hidden">
                        <Header />
                    </div>

                    <div className="container-minimal pt-0 md:pt-8 pb-8 flex flex-col gap-8 md:gap-10 max-w-7xl mx-auto px-4 md:px-12">

                        {user ? <StreakWidget /> : <GuestWelcome />}
                        {isDemoMode && <DemoBanner />}


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
                                        {/* 1. Youtube Shorts Feed */}
                                        <VideoFeed />

                                        {/* 2. Blog Feed */}
                                        <BlogFeed />

                                        {/* 3. Daily Challenge */}
                                        <div>
                                            <div className="mb-4 md:mb-6">
                                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-1 md:mb-2">Daily Quiz</h2>
                                                <p className="text-muted-foreground text-base md:text-lg">Test your knowledge from our latest videos.</p>
                                            </div>
                                            <DailyChallengeCard />
                                        </div>

                                        {/* 4. Pick your vibe */}
                                        <div>
                                            <div className="mb-4 md:mb-6">
                                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-1 md:mb-2">All Scenarios</h2>
                                                <p className="text-muted-foreground text-base md:text-lg">Explore our full library of curated roleplays.</p>
                                            </div>
                                            <CategoryCarousel />
                                        </div>

                                        {/* 5. Community Feed */}
                                        <CommunityScenariosSection />

                                        {/* 6. Newsletter Signup */}
                                        <NewsletterSignup />
                                    </div>
                                )}

                                {activeTab === "my_scenarios" && (
                                    <div className="md:max-w-5xl md:mx-auto">
                                        {user ? (
                                            <MyScenariosSection />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                                                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                                                    <motion.div
                                                        animate={{ rotate: [0, 10, -10, 0] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                    >
                                                        🔒
                                                    </motion.div>
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold">Personal Library</h3>
                                                    <p className="text-muted-foreground max-w-sm mx-auto">Sign in to save scenarios and track your progress across devices.</p>
                                                </div>
                                                <button
                                                    onClick={() => window.location.href = "/login"}
                                                    className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold shadow-lg shadow-primary/20"
                                                >
                                                    Sign In to Unlock
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <Footer />
                </div>
            </div>

            <UpgradeModal
                isOpen={isUpgradeModalOpen}
                onClose={() => setIsUpgradeModalOpen(false)}
            />
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


