"use client";

import { Eye, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import { useAuth } from "@/context/AuthContext";
import { useUserProgress } from "@/hooks/useUserProgress";
import SessionCardSwiper from "./SessionCardSwiper";
import { SessionOption } from "@/types";

type SessionState = "STRATEGY" | "SCENARIO" | "RESULT" | "REVIEW";

export default function SessionPlayer({ dayId }: { dayId: number }) {
    const router = useRouter();
    const { session, loading, error } = useSession(dayId);
    const { user } = useAuth();
    const { progress, loading: progressLoading, recordSessionSuccess } = useUserProgress(user?.uid);

    if (loading || progressLoading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-8 space-y-4">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-zinc-500 font-black uppercase tracking-widest text-xs animate-pulse">Initializing Session...</p>
            </div>
        );
    }

    if (error || !session) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950">
                <div className="text-center space-y-6">
                    <p className="text-primary font-black text-2xl uppercase italic tracking-tighter">{error || "Session Not Found"}</p>
                    <button onClick={() => router.back()} className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl">Return to Studio</button>
                </div>
            </div>
        );
    }

    let isLocked = progress && dayId > progress.currentDay;
    if (!user && dayId > 3) isLocked = true;

    if (isLocked) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-zinc-950 text-white space-y-8">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                    <div className="relative w-24 h-24 rounded-full bg-zinc-900 border-2 border-white/10 flex items-center justify-center shadow-2xl">
                        <Eye className="w-10 h-10 text-primary" />
                    </div>
                </div>
                <div className="space-y-4">
                    <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none">Access Restricted</h1>
                    <p className="text-zinc-500 font-medium text-lg max-w-sm mx-auto">
                        {!user && dayId > 3 
                            ? `Daily training capped. Create an account to unlock Day ${dayId}.` 
                            : `Session Day ${dayId} is beyond your current level. Complete prior stages first.`}
                    </p>
                </div>
                <button onClick={() => router.push("/")} className="px-10 py-5 bg-primary text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                    Return to Dashboard
                </button>
            </div>
        );
    }

    const handleSessionComplete = (option: SessionOption) => {
        recordSessionSuccess(dayId, 10, option.vibe_score);
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-primary/20">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
                <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-white/5 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-zinc-400" />
                </button>
                <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Session Active</span>
                    <span className="text-xs font-bold text-zinc-500 italic">Day {dayId}</span>
                </div>
                <div className="w-9 h-9" /> 
            </header>

            <main className="h-[100dvh] pt-20 pb-4 px-4 flex flex-col items-center justify-center">
                {session && (
                    <SessionCardSwiper 
                        session={session} 
                        onComplete={handleSessionComplete}
                        onNext={dayId < 90 ? () => router.push(`/session/${dayId + 1}`) : undefined}
                        onRetry={() => {}}
                    />
                )}
            </main>
        </div>
    );
}
