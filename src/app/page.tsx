"use client";

import Header from "@/components/Header";
import CategoryCarousel from "@/components/CategoryCarousel";
import FloatingCreateButton from "@/components/FloatingCreateButton";
import ScenarioList from "@/components/ScenarioList";
import { scripts } from "@/data";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { ADMIN_UID } from "@/lib/constants";
import DailyChallengeCard from "@/components/DailyChallengeCard";
import StreakWidget from "@/components/StreakWidget";
import DemoBanner from "@/components/DemoBanner";
import UpgradeModal from "@/components/subscription/UpgradeModal";
import Footer from "@/components/Footer";
import VideoFeed from "@/components/content/VideoFeed";
import BlogFeed from "@/components/content/BlogFeed";
import NewsletterSignup from "@/components/subscription/NewsletterSignup";
import { Zap, ArrowRight } from "lucide-react";

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

    useEffect(() => {
        if (!loading && (!user || user.uid !== ADMIN_UID)) {
            router.replace('/scenarios');
        }
    }, [user, loading, router]);

    if (loading || (!user || user.uid !== ADMIN_UID)) return null;

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

                <div className="max-w-2xl mx-auto px-4 md:px-0 space-y-16 md:space-y-32 w-full">

                    {/* NEW MAGAZINE HERO */}
                    <section className="relative w-full rounded-[3rem] bg-gradient-to-br from-primary/10 via-background to-secondary/30 border border-border/50 p-8 pb-12 md:p-16 mb-16 overflow-hidden">
                        <div className="max-w-4xl relative z-10">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8">
                                <Zap className="w-4 h-4 text-primary" /> The Daily Rehearsal
                            </span>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter italic mb-6">
                                MASTER THE <br className="hidden md:block" />
                                <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">UNSPOKEN</span> RULES.
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mb-10 leading-relaxed">
                                Your playbook for social calibration, cultural nuance, and the real-world English they don't teach in textbooks.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                {!user ? (
                                    <>
                                        <button
                                            onClick={() => document.getElementById('scenarios')?.scrollIntoView({ behavior: 'smooth' })}
                                            className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                        >
                                            Start Rehearsing <ArrowRight className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => document.getElementById('scenarios')?.scrollIntoView({ behavior: 'smooth' })}
                                            className="w-full sm:w-auto px-8 py-4 bg-secondary border border-border text-foreground rounded-full text-lg font-bold hover:bg-secondary/80 transition-colors hidden"
                                        >
                                            Explore Library
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => document.getElementById('scenarios')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                    >
                                        Jump to Scenarios <ArrowRight className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] translate-y-1/2 pointer-events-none" />
                    </section>

                    {/* Editorial Content Hub Layout */}

                    {/* 1. Youtube Shorts Feed */}
                    <section>
                        <VideoFeed />
                    </section>

                    {/* 2. Blog Feed */}
                    <section>
                        <BlogFeed />
                    </section>

                    {/* 3. Daily Challenge */}
                    <section className="max-w-5xl mx-auto">
                        <div className="mb-8 md:mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-black tracking-tighter italic uppercase mb-2">
                                    The Daily <span className="text-primary">Rehearsal</span>
                                </h2>
                                <p className="text-muted-foreground text-lg md:text-xl font-medium">Test your knowledge from our latest videos.</p>
                            </div>
                        </div>
                        <DailyChallengeCard />
                    </section>

                    {/* 4. Pick your vibe */}
                    <section id="scenarios">
                        <div className="mb-8 md:mb-12 text-center">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase text-primary mb-4">
                                <span className="text-foreground">Social</span> Playbook
                            </h2>
                            <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl mx-auto">
                                Explore our full library of curated roleplays. From the boardroom to the bar, we have a scenario for you.
                            </p>
                        </div>
                        <CategoryCarousel />
                    </section>

                    {/* 5. Story Feed */}
                    <section>
                        <div className="mb-8 md:mb-12 text-center">
                            <h2 className="text-3xl md:text-5xl font-black tracking-tighter italic uppercase mb-2">
                                Story <span className="text-primary italic">Feed</span>
                            </h2>
                            <p className="text-muted-foreground text-lg md:text-xl font-medium">Dive into our curated social playbooks.</p>
                        </div>
                        <ScenarioList scripts={scripts.slice(0, 6)} />
                    </section>

                    {/* 6. Newsletter Signup */}
                    <NewsletterSignup />

                </div>
            </main>

            <FloatingCreateButton />
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
