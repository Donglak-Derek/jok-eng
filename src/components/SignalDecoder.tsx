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

import { AlertTriangle, ShieldCheck, PartyPopper, Bot, Gem, ChevronRight } from "lucide-react";
import { toast } from "react-hot-toast";

type Props = {
    script: Script;
    nextScenarioId?: string;
};

// specialized card for Signal Decoder
function SignalCard({
    item,
    subStep,
    onHeard,
    isAutoPlayEnabled,
    isGlobalRevealed,
    script,
    onAudioGenerated,
    onNavigate
}: {
    item: DecoderItem,
    subStep: 0 | 1 | 2,
    onHeard: () => void,
    isAutoPlayEnabled: boolean,
    isGlobalRevealed: boolean,
    script: Script,
    onAudioGenerated: (sentenceId: string, url: string) => void,
    onNavigate: () => void
}) {
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
        if (subStep === 0 && isAutoPlayEnabled && !hasAutoPlayedRef.current) {
            const timer = setTimeout(() => {
                if (!hasAutoPlayedRef.current && !speaking) {
                    hasAutoPlayedRef.current = true;
                    handlePlay();
                }
            }, 600); // Slight delay for animation
            return () => clearTimeout(timer);
        }
    }, [isAutoPlayEnabled, item.id, handlePlay, speaking, subStep]);

    // Native TTS cleanup
    useEffect(() => {
        return () => {
            if (window.speechSynthesis) window.speechSynthesis.cancel();
        };
    }, []);

    // Helper: Is any word revealed?
    const anyWordRevealed = isGlobalRevealed || localRevealedWords.size > 0;

    let cardContent = null;

    if (subStep === 0) {
        // CARD 1: THE SIGNAL
        cardContent = (
            <div className="flex flex-col h-full bg-zinc-900/50 rounded-[40px] border border-white/5 shadow-2xl relative backdrop-blur-xl overflow-hidden min-h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />

                <div className="flex-1 p-10 md:p-14 flex flex-col items-center justify-center text-center gap-8 relative z-10">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Signal Intercepted</div>

                    <div className="text-3xl md:text-5xl font-black text-white italic tracking-tight leading-tight uppercase">
                        &quot;{renderClozeText(item.phrase)}&quot;
                    </div>

                    {/* REVEALED DEFINITIONS */}
                    <div className="min-h-[30px] w-full">
                        {anyWordRevealed && keywords.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                {keywords.map((k) => {
                                    if (!isGlobalRevealed && !localRevealedWords.has(k.word)) return null;
                                    return (
                                        <span key={k.word} className="text-[11px] font-black uppercase tracking-widest px-4 py-2 bg-zinc-950 text-zinc-300 rounded-lg border border-white/5">
                                            <span className="text-primary mr-1.5">{k.word}</span> : {k.definition}
                                        </span>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col w-full max-w-xs gap-4 mt-8">
                        <Button
                            onClick={handlePlay}
                            variant={speaking ? "outline" : "primary"}
                            className="h-16 rounded-2xl text-xs font-black uppercase tracking-[0.2em]"
                        >
                            {speaking ? "DECODING AUDIO..." : <span className="flex items-center gap-2">{item.audioUrl ? <Gem className="w-5 h-5 text-teal-400" /> : <Bot className="w-5 h-5 text-zinc-400" />} Listen To Audio</span>}
                        </Button>

                        <Button
                            onClick={onNavigate}
                            variant="primary"
                            className="h-20 rounded-3xl text-sm font-black uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(var(--primary),0.3)] border border-white/20"
                        >
                            DECODE <span className="text-xl ml-2">🔓</span>
                        </Button>
                    </div>
                </div>
            </div>
        );
    } else if (subStep === 1) {
        // CARD 2: HIDDEN MEANING
        cardContent = (
            <div className="flex flex-col h-full bg-rose-950/20 rounded-[40px] border border-rose-500/20 shadow-2xl relative backdrop-blur-xl overflow-hidden min-h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/[0.05] to-transparent pointer-events-none" />

                <div className="flex-1 p-10 md:p-14 flex flex-col items-center justify-center text-center gap-10 relative z-10">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 rounded-3xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(244,63,94,0.2)]">
                            <AlertTriangle className="w-10 h-10 text-rose-500" />
                        </div>
                        <h4 className="font-black text-rose-500 uppercase tracking-[0.4em] text-xs">Hidden Meaning 🕵️</h4>
                    </div>

                    <p className="text-2xl md:text-4xl font-black italic text-white uppercase tracking-tight leading-tight max-w-xl">
                        {item.actualMeaning}
                    </p>

                    <Button
                        onClick={onNavigate}
                        variant="primary"
                        className="w-full max-w-xs h-20 rounded-3xl text-sm font-black uppercase tracking-[0.2em] bg-rose-600 hover:bg-rose-500 shadow-[0_20px_50px_rgba(225,29,72,0.3)]"
                    >
                        HOW TO RESPOND? <span className="text-xl ml-2">🛡️</span>
                    </Button>
                </div>
            </div>
        );
    } else if (subStep === 2) {
        // CARD 3: TACTICAL RESPONSE
        cardContent = (
            <div className="flex flex-col h-full bg-emerald-950/20 rounded-[40px] border border-emerald-500/20 shadow-2xl relative backdrop-blur-xl overflow-hidden min-h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.05] to-transparent pointer-events-none" />

                <div className="flex-1 p-10 md:p-14 flex flex-col items-center justify-center text-center gap-10 relative z-10">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                            <ShieldCheck className="w-10 h-10 text-emerald-500" />
                        </div>
                        <h4 className="font-black text-emerald-500 uppercase tracking-[0.4em] text-xs">Tactical Response 🛡️</h4>
                    </div>

                    <p className="text-2xl md:text-4xl font-black italic text-white uppercase tracking-tight leading-tight max-w-xl">
                        {item.survivalTip}
                    </p>

                    <Button
                        onClick={onNavigate}
                        variant="primary"
                        className="w-full max-w-xs h-20 rounded-3xl text-sm font-black uppercase tracking-[0.2em] bg-emerald-600 hover:bg-emerald-500 shadow-[0_20px_50px_rgba(5,150,105,0.3)]"
                    >
                        NEXT MISSION <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>
            </div>
        );
    }

    return cardContent;
}

export default function SignalDecoder({ script, nextScenarioId }: Props) {
    const router = useRouter();

    // Hooks
    const { user, userProfile } = useAuth();
    const { markComplete } = useDailyProgress();
    const { getRepeats } = useProgress();
    const databaseRepeats = getRepeats(script.id);

    // Real-time Script Sync
    const [localScript, setLocalScript] = useState<Script>(script);

    // Use localScript items
    const items = useMemo(() => localScript.decoderItems || [], [localScript.decoderItems]);

    // Derived flags
    const hasCulturalInsight = !!script.culturalInsights || (!!script.summaryPoints && script.summaryPoints.length > 0);
    const hasQuiz = !!script.quizItems && script.quizItems.length > 0;

    const itemsCount = items.length;
    const decoderProgressCount = itemsCount * 3; // 3 cards per signal

    const culturalInsightIndex = decoderProgressCount;
    const quizIndex = hasQuiz ? (decoderProgressCount + (hasCulturalInsight ? 1 : 0)) : -1;
    const totalSteps = decoderProgressCount + (hasCulturalInsight ? 1 : 0) + (hasQuiz ? 1 : 0);

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
            const isAdmin = userProfile?.subscription?.tier === 'admin';

            if ('userId' in script && user?.uid && (script as UserScript).userId === user.uid) {
                // Own Scenario Update
                const scriptRef = doc(db, `users/${user.uid}/scenarios`, script.id);
                updateDoc(scriptRef, { decoderItems: newItems }).catch(e => console.error("Failed to persist audio", e));
            } else if (!('userId' in script) && isAdmin) {
                // Official script sponsorship (ADMIN ONLY)
                user?.getIdToken().then(token => {
                    fetch('/api/sponsor', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            scenarioId: script.id,
                            sentenceId,
                            type: 'decoderItem',
                            audioUrl: url,
                            token
                        })
                    }).then(res => {
                        if (res.ok) console.log("💎 Admin sponsorship successful");
                    }).catch(e => console.error("Sponsor API error:", e));
                });
            }

            return { ...prev, decoderItems: newItems };
        });
        
        // Gamification
        toast.success("💎 You just sponsored this audio for the community!", {
            duration: 4000,
            position: "bottom-center"
        });
    }, [script.id, user, userProfile]);

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

    // Determine current item and subStep
    const isDecoderStep = currentStep < decoderProgressCount;
    const itemIndex = isDecoderStep ? Math.floor(currentStep / 3) : -1;
    const subStep = isDecoderStep ? (currentStep % 3) : -1;

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
                    {nextScenarioId ? (
                        <>
                            <Button 
                                onClick={() => router.push(`/scenario/${nextScenarioId}`)} 
                                className="w-full h-20 text-sm font-black uppercase tracking-[0.2em] rounded-3xl shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all border border-white/10" 
                                variant="primary"
                            >
                                Next Mission <ChevronRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button 
                                onClick={handlePracticeAgain} 
                                className="w-full h-16 text-xs font-black uppercase tracking-[0.2em] rounded-2xl text-zinc-400 hover:text-white" 
                                variant="ghost"
                            >
                                Practice Again (Rep {currentReps + 1})
                            </Button>
                        </>
                    ) : (
                        <Button 
                            onClick={handlePracticeAgain} 
                            className="w-full h-16 text-sm font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all" 
                            variant="primary"
                        >
                            Initiate Rep {currentReps + 1}
                        </Button>
                    )}
                    
                    <Button 
                        variant="ghost" 
                        onClick={() => router.push(`/category/${script.categorySlug}`)} 
                        className="w-full h-14 text-zinc-500 font-black uppercase tracking-widest text-[10px] mt-4"
                    >
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
    } else if (isDecoderStep) {
        const currentItem = items[itemIndex];
        content = (
            <motion.div
                key={`${itemIndex}-${subStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full min-h-[500px]"
            >
                <SignalCard
                    item={currentItem}
                    subStep={subStep as 0 | 1 | 2}
                    onHeard={() => { }}
                    isAutoPlayEnabled={isAutoPlayEnabled}
                    isGlobalRevealed={isGlobalRevealed}
                    script={localScript}
                    onAudioGenerated={handleAudioGenerated}
                    onNavigate={handleNext}
                />
            </motion.div>
        );
    }

    // Determine current audio status
    const currentItemForStatus = isDecoderStep ? items[itemIndex] : undefined;
    const audioStatus = currentItemForStatus?.audioUrl ? 'premium' : (currentItemForStatus ? 'robot' : undefined);

    const hideFooter = isDecoderStep;

    return (
        <ScriptPlayerShell
            title={script.title}
            categorySlug={script.categorySlug}
            imageUrl={script.imageUrl}
            currentStep={currentStep}
            totalSteps={totalSteps}
            hasFinished={isCompletion || currentStep === quizIndex}
            audioStatus={audioStatus}
            isAutoPlayEnabled={isAutoPlayEnabled}
            onToggleAutoPlay={toggleAutoPlay}
            mode={isGlobalRevealed ? "standard" : "cloze"}
            onToggleMode={toggleGlobalReveal}
            onNext={handleNext}
            onPrev={handlePrev}
            onRestart={handlePracticeAgain}
            onViewFull={() => setViewMode("full")}
            onBackToMenu={() => router.push(`/category/${script.categorySlug}`)}
            hideFooter={hideFooter}
        >
            <AnimatePresence mode="wait">
                {content}
            </AnimatePresence>
        </ScriptPlayerShell>
    );
}
