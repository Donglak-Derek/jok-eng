"use client";

import { useState, useEffect } from "react";
import type { Script } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import ClozeCard from "@/components/ClozeCard";
import ComparisonCard from "@/components/ComparisonCard";
import QuizCard from "@/components/QuizCard";
import CulturalNoteCard from "@/components/CulturalNoteCard";
import { PartyPopper, RotateCcw, ChevronRight, Volume2, VolumeX } from "lucide-react";
import Confetti from "@/components/Confetti";
import { Button } from "@/components/Button";

interface InlineScenarioProps {
    script: Script;
    isActive: boolean; // From FeedSlide
    onComplete?: () => void;
    onLockChange?: (locked: boolean) => void;
}

export default function InlineScenario({ script, isActive, onComplete, onLockChange }: InlineScenarioProps) {
    const sentences = script.sentences || [];
    const hasCulturalInsight = !!script.culturalInsights;
    const hasQuiz = !!script.quizItems && script.quizItems.length > 0;

    // In InlineScenario, the quiz is handled as a single step that internalizes its own sub-steps.
    const culturalInsightIndex = hasCulturalInsight ? sentences.length : -1;
    const quizIndex = hasQuiz ? (sentences.length + (hasCulturalInsight ? 1 : 0)) : -1;
    const totalSteps = sentences.length + (hasCulturalInsight ? 1 : 0) + (hasQuiz ? 1 : 0);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [heardSet, setHeardSet] = useState<Set<number>>(new Set());
    const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);

    const isCompletion = currentIndex >= totalSteps;

    // Ensure the feed locks/unlocks based on completion status
    useEffect(() => {
        if (onLockChange) {
            onLockChange(!isCompletion);
        }
    }, [isCompletion, onLockChange]);

    const handleNext = () => {
        if (currentIndex < totalSteps) {
            setCurrentIndex(prev => prev + 1);
        }
        if (currentIndex + 1 >= totalSteps && onComplete) {
            onComplete();
        }
    };

    const handlePrev = () => {
        setCurrentIndex(prev => Math.max(0, prev - 1));
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setHeardSet(new Set());
    };

    const toggleAutoPlay = () => setIsAutoPlayEnabled(!isAutoPlayEnabled);

    // Rendering Logic
    let currentContent;

    if (isCompletion) {
        currentContent = (
            <motion.div
                key="completion"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center space-y-6 px-6"
            >
                {isActive && <Confetti />}
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500">
                    <PartyPopper className="w-10 h-10" />
                </div>
                <div>
                    <h2 className="text-3xl font-black italic tracking-tighter text-white">LOCKED IN</h2>
                    <p className="text-neutral-400 font-medium">You nailed the phrase. Swipe up to keep going.</p>
                </div>
            </motion.div>
        );
    } else if (currentIndex === culturalInsightIndex) {
        currentContent = (
            <motion.div key={`insight-${currentIndex}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col p-6 overflow-y-auto">
                <CulturalNoteCard
                    title={script.culturalInsights!.title}
                    content={script.culturalInsights!.content}
                    vocabulary={script.culturalInsights!.vocabulary}
                    onNext={handleNext}
                />
                <button
                    onClick={handleNext}
                    className="mt-auto w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl"
                >
                    Got It
                </button>
            </motion.div>
        );
    } else if (hasQuiz && currentIndex >= quizIndex) {
        if (script.quizItems) {
            currentContent = (
                <motion.div key={`quiz`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col p-6 overflow-y-auto">
                    <QuizCard
                        items={script.quizItems}
                        onFinish={handleNext}
                    />
                </motion.div>
            );
        } else {
            // Failsafe push to completion
            handleNext();
        }
    } else {
        // Render Sentence (Cloze or Chat)
        const currentSentence = sentences[currentIndex];

        let CardComponent;
        if (script.mode === "cloze" && currentSentence.keywords && currentSentence.keywords.length > 0) {
            CardComponent = (
                <ClozeCard
                    sentence={currentSentence}
                    index={currentIndex}
                    heard={heardSet.has(currentIndex)}
                    onHeard={(idx) => {
                        setHeardSet(prev => {
                            const next = new Set(prev);
                            next.add(idx);
                            return next;
                        });
                    }}
                    mode="cloze"
                    script={script}
                    isAutoPlayEnabled={isAutoPlayEnabled && isActive}
                />
            );
        } else {
            CardComponent = (
                <ComparisonCard
                    sentence={currentSentence}
                    index={currentIndex}
                    onHeard={(idx) => {
                        setHeardSet(prev => {
                            const next = new Set(prev);
                            next.add(idx);
                            return next;
                        });
                    }}
                    mode="standard"
                    script={script}
                    isAutoPlayEnabled={isAutoPlayEnabled && isActive}
                />
            );
        }

        currentContent = (
            <motion.div key={`sentence-${currentIndex}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col p-4 md:p-6 overflow-y-auto pb-32">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                            {script.categoryName || "Scenario"}
                        </div>
                        <span className="text-neutral-700">•</span>
                        <div className="text-xs font-mono text-neutral-400">
                            {currentIndex + 1} / {totalSteps}
                        </div>
                    </div>
                    {/* Auto Play Toggle */}
                    <button
                        onClick={toggleAutoPlay}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${isAutoPlayEnabled
                            ? "bg-amber-500/20 text-amber-500 border-amber-500/30"
                            : "bg-neutral-800 text-neutral-400 border-neutral-700"
                            }`}
                        title={isAutoPlayEnabled ? "Auto-play: ON" : "Auto-play: OFF"}
                    >
                        {isAutoPlayEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                        AUTO PLAY
                    </button>
                </div>
                {CardComponent}
            </motion.div>
        );
    }

    return (
        <div className="w-full h-full bg-neutral-950 flex flex-col relative">
            {/* Header / Progress Bar */}
            <div className="h-1 bg-neutral-900 w-full absolute top-0 left-0 z-50">
                <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentIndex / totalSteps) * 100}%` }}
                />
            </div>

            <div className="flex-1 overflow-y-auto w-full max-w-md mx-auto relative">
                <AnimatePresence mode="wait">
                    {currentContent}
                </AnimatePresence>
            </div>

            {/* --- FOOTER (Navigation) --- */}
            {!isCompletion && (
                <div className="flex-none bg-neutral-900 border-t border-neutral-800 z-10 w-full mt-auto">
                    <div className="max-w-md mx-auto px-4 pt-3 pb-10 md:pb-4 flex items-center justify-between gap-4">
                        {/* Restart (Subtle, Left) */}
                        <Button
                            variant="ghost"
                            onClick={handleRestart}
                            size="md"
                            className="text-neutral-400 hover:text-white shrink-0 w-14 h-14 rounded-full p-0"
                            title="Restart from beginning"
                        >
                            <RotateCcw className="w-8 h-8" />
                        </Button>

                        {/* Navigation Group (Right) */}
                        <div className="flex items-center gap-3 flex-1 justify-end ml-auto">
                            {/* Prev */}
                            <Button
                                variant="ghost"
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                                className={`shrink-0 px-4 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-opacity ${currentIndex === 0 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                            >
                                Prev
                            </Button>

                            {/* Next (Primary, Dominant) */}
                            <Button
                                variant="primary"
                                onClick={handleNext}
                                size="lg"
                                className="flex-1 shadow-lg shadow-indigo-500/20 active:scale-[0.98] text-base font-bold min-w-[120px]"
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
