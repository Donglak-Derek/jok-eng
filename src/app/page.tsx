"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RoadmapPath from "@/components/roadmap/RoadmapPath";
import { useMissions } from "@/hooks/useMissions";
import { Suspense, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import StreakWidget from "@/components/StreakWidget";
import { Loader2 } from "lucide-react";

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

            <main className="flex-1 w-full pt-24 pb-20">
                {/* User Stats/Streak Area */}
                {user && (
                    <div className="max-w-2xl mx-auto px-4 md:px-0 mb-6 w-full">
                        <StreakWidget />
                    </div>
                )}

                <div className="max-w-md mx-auto px-4 w-full">
                    {/* Header Section */}
                    <div className="text-center mb-12 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm h-32 bg-primary/20 blur-[80px] rounded-full pointer-events-none -z-10" />
                        <h1 className="text-6xl md:text-7xl font-black tracking-tighter italic uppercase mb-4">
                            <span className="text-foreground drop-shadow-sm">90-Day</span> <br className="md:hidden" />
                            <span className="bg-gradient-to-br from-primary to-purple-600 bg-clip-text text-transparent drop-shadow-sm">Roadmap</span>
                        </h1>
                        <p className="text-muted-foreground font-medium text-lg text-balance">
                            Your definitive path to social mastery. <br className="md:hidden" />Complete one node a day.
                        </p>
                    </div>

                    {/* The Path */}
                    <RoadmapPath missions={missions} />
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function Home() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <RoadmapDashboard />
        </Suspense>
    );
}
