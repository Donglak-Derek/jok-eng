"use client";

import Header from "@/components/Header";
import CategoryCarousel from "@/components/CategoryCarousel";
import DailyScenarioCard from "@/components/DailyScenarioCard";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import StreakWidget from "@/components/StreakWidget";
import DemoBanner from "@/components/DemoBanner";
import UpgradeModal from "@/components/subscription/UpgradeModal";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/subscription/NewsletterSignup";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

function HomeContent() {
    const { user, loading } = useAuth();
    const searchParams = useSearchParams();
    const [isDemoMode, setIsDemoMode] = useState(false);
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (searchParams.get("upgrade") === "true") {
            setIsUpgradeModalOpen(true);
        }
    }, [searchParams]);

    if (loading) return null;

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-black selection:text-white pb-20 overflow-x-hidden">
            <Header />

            <main className="flex-1 w-full pt-24 pb-20">
                {/* User Utility area */}
                {user && (
                    <div className="max-w-2xl mx-auto px-4 md:px-0 mb-6 w-full">
                        <div className="w-full">
                            <StreakWidget />
                            {isDemoMode && <DemoBanner />}
                        </div>
                    </div>
                )}

                <div className="max-w-2xl mx-auto px-4 md:px-0 space-y-16 md:space-y-24 w-full">


                    {/* GUEST HERO HOOK */}
                    {!user && (
                        <section className="mb-4 text-center mt-4 md:mt-12 px-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-6">
                                <Sparkles className="w-3.5 h-3.5" />
                                Stop Memorizing. Start Speaking.
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] mb-6 text-foreground">
                                Master English <br />
                                Through <span className="text-primary italic">Context.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8 font-medium">
                                Practice real-life conversations from the boardroom to the bar. Learn the exact phrases native speakers use.
                            </p>
                            <Link href="/login" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/30">
                                Start Free Training <ArrowRight className="w-5 h-5" />
                            </Link>
                        </section>
                    )}

                    {/* 1. Daily Scenario Dashboard */}
                    <section id="daily-scenario">
                        {user && (
                            <div className="mb-8 md:mb-12 text-center">
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase text-primary mb-4">
                                    <span className="text-foreground">Daily</span> Path
                                </h2>
                                <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl mx-auto">
                                    Your personalized training recommendation for today.
                                </p>
                            </div>
                        )}
                        <DailyScenarioCard />
                    </section>

                    {/* 2. Library & Categories */}
                    <section id="scenarios">
                        <div className="mb-8 md:mb-12 text-center">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase text-primary mb-4">
                                <span className="text-foreground">Browse</span> Library
                            </h2>
                            <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl mx-auto">
                                Explore full curated roleplays. From the boardroom to the bar, find your scenario.
                            </p>
                        </div>
                        <CategoryCarousel />
                    </section>

                    {/* 3. Newsletter Signup */}
                    <NewsletterSignup />

                </div>
            </main>

            <Footer />

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
