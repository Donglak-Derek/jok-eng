"use client";

import Header from "@/components/Header";
import CategoryCarousel from "@/components/CategoryCarousel";
import FloatingCreateButton from "@/components/FloatingCreateButton";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import StreakWidget from "@/components/StreakWidget";
import DemoBanner from "@/components/DemoBanner";
import UpgradeModal from "@/components/subscription/UpgradeModal";
import Footer from "@/components/Footer";

import NewsletterSignup from "@/components/subscription/NewsletterSignup";

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

                <div className="max-w-2xl mx-auto px-4 md:px-0 space-y-16 md:space-y-32 w-full">


                    {/* 2. Library & Categories */}
                    <section id="scenarios">
                        <div className="mb-8 md:mb-12 text-center">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase text-primary mb-4">
                                <span className="text-foreground">My</span> Library
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
