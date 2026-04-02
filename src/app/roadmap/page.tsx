"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RoadmapPath from "@/components/roadmap/RoadmapPath";
import { useMissions } from "@/hooks/useMissions";
import { Suspense, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import StreakWidget from "@/components/StreakWidget";
import { Loader2 } from "lucide-react";
import PracticeCTA from "@/components/roadmap/PracticeCTA";

function RoadmapDashboard() {
    const { user, loading: authLoading } = useAuth();
    const { missions, loading: missionsLoading } = useMissions();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || authLoading || missionsLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground pb-20 overflow-x-hidden">
            <Header />

            <main className="flex-1 w-full pt-28 pb-20">
                <div className="max-w-md mx-auto px-4 w-full text-center mb-8">
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">90-Day Challenge</h1>
                    <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Foundation Training</p>
                </div>

                {/* User Stats/Streak Area */}
                {user && (
                    <div className="max-w-2xl mx-auto px-4 md:px-0 mb-6 w-full">
                        <StreakWidget />
                    </div>
                )}

                <div className="max-w-md mx-auto px-4 w-full">
                    <RoadmapPath missions={missions} />
                </div>

                <PracticeCTA />
            </main>

            <Footer />
        </div>
    );
}

export default function RoadmapPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <RoadmapDashboard />
        </Suspense>
    );
}
