"use client";

import { useState } from "react";

import Link from "next/link";
import { ChevronLeft, ChevronRight, RotateCcw, FileText, Eye, EyeOff, ArrowLeft, Volume2, VolumeX, Share2, Bot, Gem } from "lucide-react";
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

    // Gamification Props (audioStatus removed since TTS is free global cache now)

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
    ...props // Capture audioStatus etc
}: Props) {
    const [isSharing, setIsSharing] = useState(false);

    return (
        <div className="fixed inset-0 z-[100] flex flex-col bg-background text-foreground overflow-hidden">

            {/* --- HEADER --- */}
            {/* --- HEADER --- */}
            {/* --- HEADER --- */}
            <header className="flex-none w-full bg-white/80 backdrop-blur-md border-b border-border z-10">
                <div className="max-w-3xl mx-auto px-4 py-4 md:px-6 md:py-5">
                    <div className="flex items-center justify-between w-full">
                        {/* 1. Back Button (Bracket Style) */}
                        <Link
                            href={`/category/${categorySlug}`}
                            className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
                            title="Back"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </Link>

                        {/* 2. Audio Badge (Removed) */}

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
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] uppercase font-bold tracking-widest text-muted-foreground/70 bg-secondary/50 px-2 py-0.5 rounded-full backdrop-blur-sm border border-border/50">
                            Series: Ep {series.current} / {series.total}
                        </div>
                    )}
                </div>

                {/* Progress Line */}
                <div className="w-full h-1 bg-secondary">
                    <div
                        className="h-full bg-primary transition-all duration-300 ease-out"
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
            {!hasFinished && (
                <div className="flex-none bg-white border-t border-border z-10 pb-safe">
                    <div className="max-w-3xl mx-auto px-4 py-3 md:px-6 md:py-4 flex items-center justify-between gap-4">

                        {/* Restart (Subtle, Left) */}
                        <Button
                            variant="ghost"
                            onClick={onRestart}
                            size="md"
                            className="text-muted-foreground hover:text-foreground shrink-0 w-12 h-12 rounded-full p-0"
                            title="Restart from beginning"
                        >
                            <RotateCcw className="w-9 h-9" />
                        </Button>

                        {/* Navigation Group (Right) */}
                        <div className="flex items-center gap-3 flex-1 justify-end max-w-sm ml-auto">

                            {/* Prev (Secondary) */}
                            <Button
                                variant="ghost"
                                onClick={onPrev}
                                disabled={!onPrev || currentStep === 0}
                                className={`shrink-0 px-4 transition-opacity ${(!onPrev || currentStep === 0) ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                            >
                                Prev
                            </Button>

                            {/* Next (Primary, Dominant) */}
                            <Button
                                variant="primary"
                                onClick={onNext}
                                size="lg"
                                className="flex-1 shadow-lg shadow-indigo-200 hover:shadow-xl transition-all active:scale-[0.98] text-base font-bold min-w-[120px]"
                                rightIcon={<ChevronRight className="w-5 h-5 ml-1" />}
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
