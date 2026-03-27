"use client";

import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Script, DecoderItem, UserScript } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "@/components/Confetti";
import { Button } from "@/components/Button";
import ScriptPlayerShell from "@/components/ScriptPlayerShell";
import DecoderFullView from "@/components/DecoderFullView";
import CulturalNoteCard from "@/components/CulturalNoteCard";
import QuizCard from "@/components/QuizCard";
import { useAuth } from "@/context/AuthContext";
import { updateDoc, doc, increment, serverTimestamp, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { playScenarioAudio } from "@/lib/tts";
import { useDailyProgress } from "@/hooks/useDailyProgress";
import { useProgress } from "@/context/ProgressContext";

import { Volume2, AlertTriangle, ShieldCheck, PartyPopper } from "lucide-react";
import { toast } from "react-hot-toast";

type Props = {
    script: Script;
};

// specialized card for Signal Decoder
function SignalCard({
    item,
    onHeard,
    isAutoPlayEnabled,
    isGlobalRevealed,
    script,
    onAudioGenerated
}: {
    item: DecoderItem,
    onHeard: () => void,
    isAutoPlayEnabled: boolean,
    isGlobalRevealed: boolean,
    script: Script,
    onAudioGenerated: (sentenceId: string, url: string) => void
}) {
    const [isRevealed, setIsRevealed] = useState(false);
    const [speaking, setSpeaking] = useState(false);
    const hasAutoPlayedRef = useRef(false);
    const [localRevealedWords, setLocalRevealedWords] = useState<Set<string>>(new Set());

    const cleanText = (text: string) => text.replace(/\[|\]/g, "");

    // Get active keywords if any
    const keywords = useMemo(() => item.keywords || [], [item.keywords]);

    const renderClozeText = (text: string) => {
        const parts = text.split(/(\[.*?\])/g);
        if (parts.length === 1) return <>{cleanText(text)}</>;

        return (
            <span>
                {parts.map((part, i) => {
                    if (part.startsWith("[") && part.endsWith("]")) {
                        const content = part.slice(1, -1);
                        const isWordRevealed = isGlobalRevealed || localRevealedWords.has(content);
                        return (
                            <span
                                key={i}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLocalRevealedWords(prev => {
                                        const next = new Set(prev);
                                        if (next.has(content)) next.delete(content);
                                        else next.add(content);
                                        return next;
                                    });
                                }}
                                className={`
                                    inline-block rounded px-2.5 mx-1 border-b-2 transition-all duration-300 align-baseline relative
                                    ${isWordRevealed
                                        ? "bg-primary/10 border-primary/30 text-white cursor-default"
                                        : "bg-zinc-800 border-white/10 text-transparent cursor-pointer hover:bg-zinc-700 select-none min-w-[3ch] text-center"
                                    }
                                `}
                            >
                                {content}
                            </span>
                        );
                    }
                    return <span key={i}>{part}</span>;
                })}
            </span>
        );
    };

    // Effect: If global revealed changes to true, reveal local
    useEffect(() => {
        if (isGlobalRevealed) setIsRevealed(true);
    }, [isGlobalRevealed]);

    // Need userProfile for playScenarioAudio
    const { userProfile } = useAuth();

    const handlePlay = useCallback(async () => {
        if (speaking) return;

        // Mark as played so auto-play logic doesn't fire if this was manual
        hasAutoPlayedRef.current = true;

        onHeard();
        setSpeaking(true);

        const textToSpeak = item.phrase;

        // Use Centralized TTS
        playScenarioAudio(userProfile, script, {
            text: textToSpeak,
            sentenceId: item.id,
            onStart: () => setSpeaking(true),
            onEnd: () => setSpeaking(false),
            onError: (err) => {
                console.error(err);
                setSpeaking(false);
            },
            onAudioGenerated: (url) => onAudioGenerated(item.id, url)
        });
    }, [item, speaking, onHeard, userProfile, script, onAudioGenerated]);

    // Internal Auto-Play Logic
    useEffect(() => {
        if (isAutoPlayEnabled && !hasAutoPlayedRef.current) {
            const timer = setTimeout(() => {
                if (!hasAutoPlayedRef.current && !speaking) {
                    hasAutoPlayedRef.current = true;
                    handlePlay();
                }
            }, 600); // Slight delay for animation
            return () => clearTimeout(timer);
        }
    }, [isAutoPlayEnabled, item.id, handlePlay, speaking]);

    // Native TTS cleanup
    useEffect(() => {
        return () => {
            if (window.speechSynthesis) window.speechSynthesis.cancel();
        };
    }, []);

    // Helper: Is any word revealed?
    const anyWordRevealed = isGlobalRevealed || localRevealedWords.size > 0;

    return (
        <div className="bg-zinc-900/50 rounded-[40px] border border-white/5 shadow-2xl overflow-hidden flex flex-col h-full relative backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
            {/* THE SIGNAL (Top) */}
            <div className="p-10 md:p-14 bg-zinc-950/30 border-b border-white/5 text-center flex flex-col items-center gap-6 relative z-10">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Signal Intercepted</div>
                <div className="text-3xl md:text-5xl font-black text-white italic tracking-tight leading-none uppercase">
                    &quot;{renderClozeText(item.phrase)}&quot;
                </div>

                {/* REVEALED DEFINITIONS */}
                <div className="min-h-[24px] flex flex-col items-center justify-center w-full mt-2">
                    {anyWordRevealed && keywords.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            {keywords.map((k) => {
                                const isWordActive = isGlobalRevealed || localRevealedWords.has(k.word);
                                if (!isWordActive) return null;

                                return (
                                    <span key={k.word} className="text-[11px] font-black uppercase tracking-widest px-4 py-2 bg-zinc-950 text-zinc-300 rounded-lg border border-white/5 shadow-inner leading-snug">
                                        <span className="text-primary mr-1.5">{k.word}</span> <span className="text-zinc-600">:</span> {k.definition}
                                    </span>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-xs text-muted-foreground italic h-[24px] flex items-center">
                            {!isGlobalRevealed && keywords.length > 0 && "Tap hidden words to limit-break"}
                        </div>
                    )}
                </div>

                <Button
                    onClick={handlePlay}
                    variant={speaking ? "outline" : "primary"}
                    size="lg"
                    className={`mt-6 w-full md:w-auto h-16 rounded-2xl px-10 transition-all ${speaking ? "bg-primary/20" : "shadow-2xl shadow-primary/20"}`}
                    leftIcon={<Volume2 className="w-5 h-5" />}
                >
                    {speaking ? "DECODING AUDIO..." : "EXECUTE VERBAL ANALYSIS"}
                </Button>
            </div>

            {/* THE DECODE (Bottom - Revealed) */}
            <div className="flex-1 p-10 md:p-14 flex flex-col items-center justify-center relative bg-transparent z-10">
                <AnimatePresence mode="wait">
                    {!isRevealed && !isGlobalRevealed ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex flex-col items-center gap-6"
                        >
                            <p className="text-4xl md:text-5xl font-black italic text-center text-white uppercase tracking-tighter leading-none mb-4">
                                Strategic Gap detected
                            </p>
                            <Button
                                onClick={() => setIsRevealed(true)}
                                variant="primary"
                                className="rounded-2xl px-12 py-9 text-xl font-black uppercase tracking-widest shadow-[0_0_50px_rgba(var(--primary),0.3)] hover:scale-105 transition-all"
                            >
                                Initiate Local Decoding
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full space-y-8"
                        >
                            {/* The Risk */}
                            <div className="flex gap-6 items-start bg-rose-500/5 p-6 rounded-3xl border border-rose-500/20 shadow-2xl">
                                <div className="p-3 bg-rose-500/20 text-rose-500 rounded-xl shrink-0 border border-rose-500/30">
                                    <AlertTriangle className="w-8 h-8" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-black text-rose-500 uppercase tracking-[0.2em] text-[11px]">Subliminal Threat</h4>
                                    <p className="text-white font-bold leading-tight text-xl italic tracking-tight">{item.actualMeaning}</p>
                                </div>
                            </div>

                            {/* The Safe Move */}
                            <div className="flex gap-6 items-start bg-emerald-500/5 p-6 rounded-3xl border border-emerald-500/20 shadow-2xl">
                                <div className="p-3 bg-emerald-500/20 text-emerald-500 rounded-xl shrink-0 border border-emerald-500/30">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-black text-emerald-500 uppercase tracking-[0.2em] text-[11px]">Tactical Counter</h4>
                                    <p className="text-white font-bold leading-tight text-xl italic tracking-tight">{item.survivalTip}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}


export default function SignalDecoder({ script }: Props) {
    const router = useRouter();

    // Hooks
    const { user } = useAuth();
    const { markComplete } = useDailyProgress();
    const { getRepeats } = useProgress();
    const databaseRepeats = getRepeats(script.id);

    // Real-time Script Sync
    const [localScript, setLocalScript] = useState<Script>(script);

    // Use localScript items
    const items = useMemo(() => localScript.decoderItems || [], [localScript.decoderItems]);

    // Derived
    const hasCulturalInsight = !!script.culturalInsights || (!!script.summaryPoints && script.summaryPoints.length > 0);
    const hasQuiz = !!script.quizItems && script.quizItems.length > 0;

    const itemsCount = items.length;

    const culturalInsightIndex = hasCulturalInsight ? itemsCount : -1;
    const quizIndex = hasQuiz ? (itemsCount + (hasCulturalInsight ? 1 : 0)) : -1;
    const totalSteps = itemsCount + (hasCulturalInsight ? 1 : 0) + (hasQuiz ? 1 : 0);

    const [currentStep, setCurrentStep] = useState(0);
    const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);
    const [isGlobalRevealed, setIsGlobalRevealed] = useState(false);
    const [viewMode, setViewMode] = useState<"flow" | "full">("flow");
    const hasSavedRef = useState(false);

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
    }, [script.id, script]);

    // Handler for local cache update
    const handleAudioGenerated = useCallback((sentenceId: string, url: string) => {
        setLocalScript(prev => {
            if (!prev.decoderItems) return prev;
            const newItems = prev.decoderItems.map(item =>
                item.id === sentenceId ? { ...item, audioUrl: url } : item
            );

            // Background persistence
            let scriptRef;
            if ('userId' in script) {
                scriptRef = doc(db, `users/${(script as any).userId}/scenarios`, script.id);
            } else {
                scriptRef = doc(db, `users/jok-eng-official/scenarios`, script.id);
            }
            updateDoc(scriptRef, { decoderItems: newItems }).catch(e => console.error("Failed to persist audio", e));

            return { ...prev, decoderItems: newItems };
        });
        // Gamification
        toast.success("💎 You just sponsored this audio for the community!", {
            duration: 4000,
            position: "bottom-center"
        });
    }, []);

    const isOwner = user && 'userId' in script && (script as UserScript).userId === user.uid;
    const isCompletion = currentStep >= totalSteps;

    const saveProgress = async () => {
        if (hasSavedRef[0]) return;
        hasSavedRef[1](true);

        if (user) {
            try {
                const progressRef = doc(db, "users", user.uid, "progress", script.id);

                await setDoc(progressRef, {
                    repeats: increment(1),
                    lastPracticedAt: serverTimestamp()
                }, { merge: true });

                const userRef = doc(db, "users", user.uid);
                await updateDoc(userRef, {
                    totalPractices: increment(1)
                });

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
    };

    useEffect(() => {
        if (isCompletion) {
            saveProgress();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCompletion]);


    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handlePracticeAgain = () => {
        hasSavedRef[1](false);
        setCurrentStep(0);
    };

    const toggleAutoPlay = () => setIsAutoPlayEnabled(prev => !prev);
    const toggleGlobalReveal = () => setIsGlobalRevealed(prev => !prev);


    if (viewMode === "full") {
        return <DecoderFullView script={script} onBack={() => setViewMode("flow")} />;
    }

    // Render content
    let content = null;

    if (isCompletion) {
        const currentReps = databaseRepeats;
        let encouragement = "Good start!";
        if (currentReps >= 3) encouragement = "Muscle memory building...";

        content = (
            <motion.div
                key="completion"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full py-16 md:py-24 text-center flex flex-col items-center"
            >
                <Confetti />
                <div className="w-32 h-32 bg-primary/10 border border-primary/20 rounded-[40px] flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(var(--primary),0.3)] animate-in zoom-in-50 duration-500 relative">
                    <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full" />
                    <PartyPopper className="w-16 h-16 text-primary drop-shadow-[0_0_10px_rgba(var(--primary),0.5)] relative z-10" />
                </div>
                <h2 className="text-4xl md:text-6xl font-black italic text-white mb-2 uppercase tracking-tighter">Mission Accomplished</h2>
                <p className="text-zinc-500 text-xl font-black uppercase tracking-[0.3em] mb-12">{encouragement}</p>

                <div className="bg-zinc-900/50 border border-white/5 p-10 rounded-[40px] mb-12 flex flex-col items-center min-w-[280px] shadow-2xl backdrop-blur-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                    <span className="text-xs uppercase tracking-[0.4em] text-zinc-600 font-black mb-2 relative z-10">Total Repetitions</span>
                    <div className="text-7xl font-black text-white tabular-nums relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        {currentReps}
                    </div>
                </div>

                <div className="flex flex-col w-full max-w-sm gap-4">
                    <Button onClick={handlePracticeAgain} className="w-full h-16 text-sm font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all" variant="primary">
                        Initiate Rep {currentReps + 1}
                    </Button>
                    <Button variant="ghost" onClick={() => router.push(`/category/${script.categorySlug}`)} className="w-full h-14 text-zinc-500 font-black uppercase tracking-widest text-xs">
                        &larr; Return to Base
                    </Button>
                </div>
            </motion.div>
        );
    } else if (currentStep === culturalInsightIndex && (script.culturalInsights || script.summaryPoints)) {
        const title = script.culturalInsights?.title || "Key Takeaways";
        const noteContent = script.culturalInsights?.content || (script.summaryPoints ? script.summaryPoints.map(p => `• ${p}`).join("\n\n") : "");
        const vocabulary = script.culturalInsights?.vocabulary || [];

        content = (
            <CulturalNoteCard
                title={title}
                content={noteContent}
                vocabulary={vocabulary}
                onNext={handleNext}
            />
        );
    } else if (currentStep === quizIndex && script.quizItems) {
        content = (
            <QuizCard
                items={script.quizItems}
                onFinish={handleNext}
            />
        );
    } else {
        const currentItem = items[currentStep];
        content = (
            <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full min-h-[500px]"
            >
                <SignalCard
                    item={currentItem}
                    onHeard={() => { }}
                    isAutoPlayEnabled={isAutoPlayEnabled}
                    isGlobalRevealed={isGlobalRevealed}
                    script={localScript}
                    onAudioGenerated={handleAudioGenerated}
                />
            </motion.div>
        );
    }

    // Determine current audio status for the player shell
    // If we are on a step that is a SignalCard, check that item.
    // Otherwise, undefined (hides badge)
    const currentItemForStatus = (currentStep < itemsCount) ? items[currentStep] : undefined;
    const audioStatus = currentItemForStatus?.audioUrl ? 'premium' : (currentItemForStatus ? 'robot' : undefined);

    return (
        <ScriptPlayerShell
            title={script.title}
            categorySlug={script.categorySlug}
            imageUrl={script.imageUrl}
            currentStep={currentStep}
            totalSteps={totalSteps}
            hasFinished={isCompletion || currentStep === quizIndex} // Hide controls on Quiz/Completion

            isAutoPlayEnabled={isAutoPlayEnabled}
            onToggleAutoPlay={toggleAutoPlay}

            mode={isGlobalRevealed ? "standard" : "cloze"}
            onToggleMode={toggleGlobalReveal}

            onNext={handleNext}
            onPrev={handlePrev}
            onRestart={handlePracticeAgain}
            onViewFull={() => setViewMode("full")}
            onBackToMenu={() => router.push(`/category/${script.categorySlug}`)}
        >
            <AnimatePresence mode="wait">
                {content}
            </AnimatePresence>
        </ScriptPlayerShell>
    );
}
