"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { ChevronLeft, ChevronRight, RotateCcw, FileText, Eye, EyeOff, ArrowLeft, Volume2, VolumeX, Share2, Bot, Diamond } from "lucide-react";
import { Button } from "@/components/Button";

type Props = {
    // Content Props
    title: string;
    categorySlug: string;
    imageUrl?: string;

    // Progress Props
    currentStep: number;
    totalSteps: number;
    hasFinished: boolean;

    // Gamification Props
    audioStatus?: 'premium' | 'robot';

    // Control Props
    isAutoPlayEnabled?: boolean;
    onToggleAutoPlay?: () => void;
    // Global Reveal Logic merged into Study Mode Toggle

    // Study Mode Props
    mode?: "standard" | "cloze";
    onToggleMode?: () => void;

    // Navigation Handlers
    onNext?: () => void;
    onPrev?: () => void;
    onRestart?: () => void;
    onBackToMenu?: () => void;
    onViewFull?: () => void;

    // Slots
    children: React.ReactNode;

    // Series Props
    series?: {
        current: number;
        total: number;
        next?: { id: string; title: string };
        prev?: { id: string; title: string };
    };

    // UI Controls
    hideFooter?: boolean;
};

export default function ScriptPlayerShell({
    title,
    categorySlug,
    imageUrl,
    currentStep,
    totalSteps,
    hasFinished,
    isAutoPlayEnabled,
    onToggleAutoPlay,
    mode,
    onToggleMode,
    onNext,
    onPrev,
    onRestart,
    onViewFull,
    children,
    series, // Destructure series
    hideFooter, // New Prop
    ...props // Capture audioStatus etc
}: Props) {
    const [isSharing, setIsSharing] = useState(false);

    useEffect(() => {
        if (title) {
            localStorage.setItem("amly_last_visit", JSON.stringify({
                path: window.location.pathname,
                title: title,
                type: "Scenario"
            }));
        }
    }, [title, categorySlug]);

    return (
        <div className="fixed inset-0 z-[100] flex flex-col bg-zinc-950 text-foreground overflow-hidden">

            {/* --- HEADER --- */}
            {/* --- HEADER --- */}
            {/* --- HEADER --- */}
            <header className="flex-none w-full bg-zinc-950/80 backdrop-blur-md border-b border-white/5 z-10">
                <div className="max-w-3xl mx-auto px-4 py-3 md:px-6 md:py-4">
                    <div className="flex items-center justify-between w-full">
                        {/* 1. Back Button (Bracket Style) */}
                        <Link
                            href={`/category/${categorySlug}`}
                            className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
                            title="Back"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </Link>

                        {/* 2. Audio Badge */}
                        {props.audioStatus === 'premium' ? (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-sm bg-primary/10 border border-primary/20 shadow-[0_0_10px_rgba(var(--primary),0.1)]">
                                <Diamond className="w-3.5 h-3.5 text-primary" />
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hidden md:inline ml-1">Tactical Audio</span>
                            </div>
                        ) : props.audioStatus === 'robot' ? (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-sm bg-zinc-900 border border-white/5">
                                <Bot className="w-3.5 h-3.5 text-zinc-500" />
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] hidden md:inline ml-1">Synthesized Voice</span>
                            </div>
                        ) : null}

                        {/* 3. Sound Toggle (Line Icon) */}
                        {onToggleAutoPlay && (
                            <button
                                onClick={onToggleAutoPlay}
                                className={`
                           transition-colors
                           ${isAutoPlayEnabled
                                        ? 'text-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }
                       `}
                                title={isAutoPlayEnabled ? "Sound On" : "Sound Off"}
                            >
                                {isAutoPlayEnabled ? <Volume2 className="w-6 h-6 stroke-[1.5]" /> : <VolumeX className="w-6 h-6 stroke-[1.5]" />}
                            </button>
                        )}

                        {/* 4. Study Toggle (Line Icon) */}
                        {onToggleMode && mode && (
                            <button
                                onClick={onToggleMode}
                                className={`
                             transition-colors
                             ${mode === 'cloze'
                                        ? 'text-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }
                         `}
                                title={mode === 'standard' ? "Switch to Study Mode" : "Review Mode"}
                            >
                                {mode === 'standard' ? <EyeOff className="w-6 h-6 stroke-[1.5]" /> : <Eye className="w-6 h-6 stroke-[1.5]" />}
                            </button>
                        )}

                        {/* 5. Doc (Line Icon) */}
                        {onViewFull && (
                            <button
                                onClick={onViewFull}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                title="Read Full Script"
                            >
                                <FileText className="w-6 h-6 stroke-[1.5]" />
                            </button>
                        )}

                        {/* 6. Share (Line Icon) */}
                        <button
                            disabled={isSharing}
                            onClick={async () => {
                                if (isSharing) return;

                                const shareData = {
                                    title: `Jok-Eng: ${title}`,
                                    text: "Practice this scenario with me on Jok-Eng! 🎙️",
                                    url: window.location.href
                                };

                                if (navigator.share) {
                                    try {
                                        setIsSharing(true);
                                        await navigator.share(shareData);
                                    } catch (error) {
                                        if ((error as any).name !== 'AbortError') {
                                            console.error("Share failed:", error);
                                        }
                                    } finally {
                                        setIsSharing(false);
                                    }
                                } else {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert("Link copied!");
                                }
                            }}
                            className={`text-muted-foreground hover:text-foreground transition-colors p-2 -mr-2 ${isSharing ? "opacity-50 cursor-wait" : ""}`}
                            title="Share"
                        >
                            <Share2 className="w-6 h-6 stroke-[1.5]" />
                        </button>
                    </div>

                    {/* Hidden Title for Accessibility/SEO only (if needed), or just removed visually */}
                    <h1 className="sr-only">{title}</h1>

                    {/* Optional Scenario Image (Desktop only) */}
                    {imageUrl && (
                        <div className="hidden md:block w-12 h-12 absolute left-1/2 -translate-x-1/2 -z-10 opacity-0 pointer-events-none">
                            {/* Placeholder if we want fancy image effects in header later */}
                        </div>
                    )}

                    {/* Series Indicator */}
                    {series && (
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] uppercase font-black tracking-[0.2em] text-zinc-500 bg-zinc-900/80 px-3 py-1 rounded-sm shadow-xl backdrop-blur-sm border border-white/5">
                            Mission Sector: {series.current} <span className="mx-1 text-zinc-500 opacity-30">/</span> {series.total}
                        </div>
                    )}
                </div>

                {/* Progress Line */}
                <div className="w-full h-1 bg-zinc-950">
                    <div
                        className="h-full bg-primary transition-all duration-300 ease-out shadow-[0_0_8px_rgba(var(--primary),0.5)]"
                        style={{ width: `${Math.min((currentStep / totalSteps) * 100, 100)}%` }}
                    />
                </div>
            </header>

            {/* --- CONTENT BODY --- */}
            <main className="flex-1 w-full overflow-y-auto overscroll-contain pb-8">
                <div className="max-w-3xl mx-auto px-4 py-8 md:px-6 md:py-12 flex flex-col justify-center min-h-full">
                    {children}
                </div>
            </main>

            {/* --- FOOTER (Navigation) --- */}
            {!hasFinished && !hideFooter && (
                <div className="flex-none bg-zinc-950 border-t border-white/5 z-10 pb-safe shadow-[0_-4px_30px_rgba(0,0,0,0.4)]">
                    <div className="max-w-3xl mx-auto px-4 py-4 md:px-6 md:py-6 flex items-center justify-between gap-4">

                        {/* Restart (Subtle, Left) */}
                        <Button
                            variant="ghost"
                            onClick={onRestart}
                            className="text-zinc-500 hover:text-white shrink-0 w-16 h-16 rounded-2xl p-0 flex items-center justify-center bg-zinc-900 border border-white/5 hover:border-white/10 transition-all active:scale-95"
                            title="Restart Mission"
                        >
                            <RotateCcw className="w-7 h-7" />
                        </Button>

                        {/* Navigation Group (Right) */}
                        <div className="flex items-center gap-2 md:gap-3 flex-1 justify-end max-w-sm ml-auto">

                            {/* Prev (Secondary) */}
                            <Button
                                variant="ghost"
                                onClick={onPrev}
                                disabled={!onPrev || currentStep === 0}
                                className={`shrink-0 px-5 md:px-8 h-16 rounded-2xl text-sm font-black uppercase tracking-widest transition-all bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white active:scale-95 ${(!onPrev || currentStep === 0) ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                            >
                                Prev
                            </Button>

                            {/* Next (Primary, Dominant) */}
                            <Button
                                variant="primary"
                                onClick={onNext}
                                className="flex-1 h-16 px-5 md:px-8 shadow-2xl shadow-primary/20 transition-all active:scale-[0.98] text-sm font-black uppercase tracking-[0.2em] min-w-[110px] md:min-w-[140px] rounded-2xl flex justify-center items-center gap-2"
                                rightIcon={<ChevronRight className="w-5 h-5" />}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
