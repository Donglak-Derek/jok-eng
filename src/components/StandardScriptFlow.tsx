"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Script, UserScript, Sentence } from "@/types";
import ClozeCard from "@/components/ClozeCard";
import ComparisonCard from "@/components/ComparisonCard";
import ScriptPlayerShell from "@/components/ScriptPlayerShell";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "@/components/Confetti";
import { Button } from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { updateDoc, onSnapshot, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useDailyProgress } from "@/hooks/useDailyProgress";
import { useUserProgress } from "@/hooks/useUserProgress";
import { Trophy, ChevronRight } from "lucide-react";
import StandardFullView from "./StandardFullView";
import CulturalNoteCard from "@/components/CulturalNoteCard";
import QuizCard from "@/components/QuizCard";
import StoryCard from "@/components/StoryCard";
import { useProgress } from "@/context/ProgressContext";
import { getScriptAudioStatus } from "@/lib/utils";
import { useSeries } from "@/hooks/useSeries";
import { toast } from "react-hot-toast";

type Props = {
    script: Script;
    nextScenarioId?: string;
};

type FlowStep =
    | { type: 'sentence'; sentence: Sentence; originalIndex: number; subStep?: 0 | 1 | 2 }
    | { type: 'culturalInsight' }
    | { type: 'quiz' };

export default function StandardScriptFlow({ script, nextScenarioId }: Props) {
    const router = useRouter();
    const { user, userProfile } = useAuth();
    const [localScript, setLocalScript] = useState<Script>(script);

    useEffect(() => {
        let scriptRef;
        if ('userId' in script) {
            scriptRef = doc(db, `users/${(script as UserScript).userId}/scenarios`, script.id);
        } else {
            scriptRef = doc(db, `users/jok-eng-official/scenarios`, script.id);
        }

        const unsubscribe = onSnapshot(scriptRef, (docSnap: any) => {
            if (docSnap.exists()) {
                setLocalScript(prev => ({ ...prev, ...docSnap.data() }));
            }
        });
        return () => unsubscribe();
    }, [script.id, user, script]);

    const activeScript = localScript || script;
    const sentences = activeScript.sentences || [];

    const { episodes, nextEpisode, prevEpisode } = useSeries(activeScript.seriesId, activeScript.id);
    const seriesProp = activeScript.seriesId && episodes.length > 0 ? {
        current: episodes.findIndex(e => e.id === activeScript.id) + 1,
        total: episodes.length,
        next: nextEpisode ? { id: nextEpisode.id, title: nextEpisode.title } : undefined,
        prev: prevEpisode ? { id: prevEpisode.id, title: prevEpisode.title } : undefined
    } : undefined;

    const { markComplete } = useDailyProgress();
    const { getRepeats } = useProgress();
    const { recordPractice } = useUserProgress(user?.uid);

    const hasCulturalInsight = !!activeScript.culturalInsights;
    const hasQuiz = !!activeScript.quizItems && activeScript.quizItems.length > 0;

    // Build flattened steps array
    const steps = useMemo(() => {
        const arr: FlowStep[] = [];
        sentences.forEach((s, idx) => {
            if (s.badResponse && s.goodResponse) {
                arr.push({ type: 'sentence', sentence: s, originalIndex: idx, subStep: 0 }); // Intro
                arr.push({ type: 'sentence', sentence: s, originalIndex: idx, subStep: 1 }); // Trap
                arr.push({ type: 'sentence', sentence: s, originalIndex: idx, subStep: 2 }); // Solution
            } else {
                arr.push({ type: 'sentence', sentence: s, originalIndex: idx });
            }
        });

        if (hasCulturalInsight) arr.push({ type: 'culturalInsight' });
        if (hasQuiz) arr.push({ type: 'quiz' });
        return arr;
    }, [sentences, hasCulturalInsight, hasQuiz]);

    const totalSteps = steps.length;
    const storageKey = `jokeng:progress:${script.id}`;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewMode, setViewMode] = useState<"flow" | "full">("flow");
    const [isGlobalRevealed, setIsGlobalRevealed] = useState(false);
    const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);

    const defaultMode = "cloze";
    const [mode, setMode] = useState<"standard" | "cloze">((script.mode as "standard" | "cloze") || defaultMode);

    const toggleMode = () => setMode(prev => prev === "standard" ? "cloze" : "standard");
    const toggleAutoPlay = () => setIsAutoPlayEnabled(prev => !prev);
    const toggleGlobalReveal = () => setIsGlobalRevealed(prev => !prev);

    // Store originalIndex in heardSet
    const [heardSet, setHeardSet] = useState<Set<number>>(new Set());
    const hasSavedRef = useState(false);
    const databaseRepeats = getRepeats(script.id);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [currentIndex, viewMode]);

    useEffect(() => {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
            try {
                const arr: number[] = JSON.parse(raw);
                setHeardSet(new Set(arr));
            } catch {
                setHeardSet(new Set());
            }
        }
    }, [storageKey]);

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(Array.from(heardSet.values())));
    }, [heardSet, storageKey]);

    const handleAudioGenerated = useCallback((sentenceId: string, url: string) => {
        setLocalScript(prev => {
            if (!prev.sentences) return prev;
            const newSentences = prev.sentences.map(s =>
                s.id === sentenceId ? { ...s, audioUrl: url } : s
            );

            // Background persistence
            const isAdmin = userProfile?.subscription?.tier === 'admin';

            if ('userId' in script && user?.uid && (script as UserScript).userId === user.uid) {
                // Own Scenario Update
                const scriptRef = doc(db, `users/${user.uid}/scenarios`, script.id);
                updateDoc(scriptRef, { sentences: newSentences }).catch(e => console.error("Failed to persist audio", e));
            } else if (!('userId' in script) && isAdmin) {
                // Official script sponsorship (ADMIN ONLY)
                user?.getIdToken().then(token => {
                    fetch('/api/sponsor', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            scenarioId: script.id,
                            sentenceId,
                            type: 'sentence',
                            audioUrl: url,
                            token
                        })
                    }).then(res => {
                        if (res.ok) console.log("💎 Admin sponsorship successful");
                    }).catch(e => console.error("Sponsor API error:", e));
                });
            }

            return { ...prev, sentences: newSentences };
        });
        
        // Gamification Toast
        toast.success("💎 You just sponsored this audio for the community!", {
            duration: 4000,
            position: "bottom-center"
        });
    }, [script.id, user, userProfile]);

    const isCompletion = currentIndex >= totalSteps;
    const isOwner = user && 'userId' in script && (script as UserScript).userId === user.uid;

    const saveProgress = async () => {
        if (user) {
            try {
                const { doc, setDoc, serverTimestamp, increment } = await import("firebase/firestore");
                const progressRef = doc(db, "users", user.uid, "progress", script.id);

                await setDoc(progressRef, {
                    repeats: increment(1),
                    lastPracticedAt: serverTimestamp()
                }, { merge: true });

                recordPractice(10, 80);

                if (isOwner) {
                    await updateDoc(doc(db, "users", user.uid, "scenarios", script.id), {
                        repeats: increment(1)
                    }).catch(e => console.error("Legacy sync error", e));
                }
            } catch (practiceErr) {
                console.error("Failed to update user progress stats", practiceErr);
            }
        } else {
            const key = `jokeng:repeats:${script.id}`;
            const current = parseInt(localStorage.getItem(key) || "0");
            localStorage.setItem(key, String(current + 1));
        }
        markComplete(script.id);
        setHeardSet(new Set());
        localStorage.setItem(storageKey, JSON.stringify([]));
    };

    useEffect(() => {
        if (isCompletion && !hasSavedRef[0]) {
            saveProgress();
            hasSavedRef[1](true);
        }
    }, [isCompletion]);

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < steps.length) {
            const currentStepMatch = steps[currentIndex];
            if (currentStepMatch.type === 'sentence') {
                setHeardSet((prev) => {
                    const next = new Set(prev);
                    next.add(currentStepMatch.originalIndex);
                    return next;
                });
            }
        }

        if (currentIndex < totalSteps) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const handlePracticeAgain = async () => {
        hasSavedRef[1](false);
        setCurrentIndex(0);
    };

    const handleBackToMenu = async () => {
        if (script.categorySlug) {
            router.push(`/category/${script.categorySlug}`);
        } else {
            router.push('/');
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            switch (e.code) {
                case "ArrowRight": e.preventDefault(); handleNext(); break;
                case "ArrowLeft": e.preventDefault(); handlePrev(); break;
                case "ArrowUp":
                case "ArrowDown": e.preventDefault(); toggleGlobalReveal(); break;
                case "Space":
                    e.preventDefault();
                    // Fallback play trigger
                    const playBtn = document.querySelector('button[data-action="play-sentence"]');
                    if (playBtn instanceof HTMLElement) playBtn.click();
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex, isGlobalRevealed]);

    if (viewMode === "full") {
        return <StandardFullView script={script} onBack={() => setViewMode("flow")} />;
    }

    let content = null;
    let isCulturalOrQuiz = false;

    if (isCompletion) {
        const currentReps = databaseRepeats;
        let encouragement = "Good start!";
        if (currentReps >= 3) encouragement = "Muscle memory building...";
        if (currentReps >= 5) encouragement = "You're mastering this!";
        if (currentReps >= 10) encouragement = "Unstoppable!";

        content = (
            <motion.div
                key="completion"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full py-10 md:py-16 text-center flex flex-col items-center"
            >
                <Confetti />
                <div className="w-24 h-24 bg-zinc-900 rounded-[32px] border border-primary/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(var(--primary),0.1)] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                    <Trophy className="w-10 h-10 text-primary drop-shadow-lg relative z-10 transition-transform group-hover:scale-110" />
                </div>

                <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-2">
                    Session Complete
                </h2>
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-10">{encouragement}</p>

                <div className="bg-zinc-950/50 border border-white/5 p-8 rounded-[32px] mb-10 flex flex-col items-center min-w-[240px] shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
                    <span className="text-[10px] uppercase font-black tracking-[0.3em] text-zinc-600 mb-4">Total Mastery</span>
                    <div className="text-6xl font-black text-primary tabular-nums italic tracking-tighter">
                        {currentReps}
                    </div>
                </div>

                <div className="flex flex-col w-full max-w-sm gap-4">
                    {nextScenarioId ? (
                        <>
                            <Button 
                                onClick={() => router.push(`/scenario/${nextScenarioId}`)} 
                                className="w-full h-20 text-sm font-black uppercase tracking-[0.2em] rounded-3xl shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all border border-white/10" 
                                variant="primary"
                            >
                                Next Session <ChevronRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button 
                                onClick={handlePracticeAgain} 
                                className="w-full h-16 text-xs font-black uppercase tracking-[0.2em] rounded-2xl text-zinc-400 hover:text-white" 
                                variant="ghost"
                            >
                                Start Again (Rep {currentReps + 1})
                            </Button>
                        </>
                    ) : (
                        <Button 
                            onClick={handlePracticeAgain} 
                            className="w-full h-16 text-sm font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all" 
                            variant="primary"
                        >
                            Start Again {currentReps + 1}
                        </Button>
                    )}
                    
                    <Button 
                        variant="ghost" 
                        onClick={handleBackToMenu} 
                        className="w-full h-14 text-zinc-500 font-black uppercase tracking-widest text-[10px] mt-4"
                    >
                        &larr; Return to Studio
                    </Button>

                    {script.relatedBlogUrl && (
                        <Button variant="ghost" onClick={() => window.open(script.relatedBlogUrl, '_blank')} className="w-full h-12 text-primary font-black uppercase tracking-widest hover:bg-primary/5 mt-4 text-xs">
                            Read Full Session Guide &reg;
                        </Button>
                    )}
                </div>
            </motion.div>
        );
    } else {
        const stepMatch = steps[currentIndex];

        if (stepMatch.type === 'culturalInsight' && script.culturalInsights) {
            isCulturalOrQuiz = true;
            content = (
                <CulturalNoteCard title={script.culturalInsights.title} content={script.culturalInsights.content} vocabulary={script.culturalInsights.vocabulary} onNext={handleNext} />
            );
        } else if (stepMatch.type === 'quiz' && script.quizItems) {
            isCulturalOrQuiz = true;
            content = (
                <QuizCard items={script.quizItems} onFinish={handleNext} />
            );
        } else if (stepMatch.type === 'sentence') {
            const currentSentence = stepMatch.sentence;
            const isComparison = !!(currentSentence.badResponse && currentSentence.goodResponse);
            const isStory = !!(currentSentence.section || currentSentence.speaker);

            const CardComponent = isComparison ? ComparisonCard : (isStory ? StoryCard : ClozeCard);

            content = (
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full"
                >
                    <CardComponent
                        sentence={currentSentence}
                        index={stepMatch.originalIndex}
                        subStep={stepMatch.subStep as any}
                        heard={heardSet.has(stepMatch.originalIndex)}
                        script={activeScript}
                        mode={mode}
                        isGlobalRevealed={isGlobalRevealed}
                        isAutoPlayEnabled={isAutoPlayEnabled}
                        onHeard={() => {
                            setHeardSet(prev => {
                                const next = new Set(prev);
                                next.add(stepMatch.originalIndex);
                                return next;
                            });
                        }}
                        onAudioGenerated={(url) => handleAudioGenerated(currentSentence.id, url)}
                    />
                </motion.div>
            );
        }
    }

    return (
        <ScriptPlayerShell
            title={script.title}
            categorySlug={script.categorySlug}
            imageUrl={script.imageUrl}
            currentStep={currentIndex}
            totalSteps={totalSteps}
            hasFinished={isCompletion || isCulturalOrQuiz}
            audioStatus={getScriptAudioStatus(activeScript)}
            isAutoPlayEnabled={isAutoPlayEnabled}
            onToggleAutoPlay={toggleAutoPlay}
            mode={mode}
            onToggleMode={toggleMode}
            onNext={handleNext}
            onPrev={handlePrev}
            onRestart={handlePracticeAgain}
            onViewFull={() => setViewMode("full")}
            onBackToMenu={handleBackToMenu}
            series={seriesProp}
        >
            <AnimatePresence mode="wait">
                {content}
            </AnimatePresence>


        </ScriptPlayerShell>
    );
}
