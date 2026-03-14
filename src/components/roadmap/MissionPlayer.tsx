"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ChevronRight, RefreshCw, ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useMission, DetailedMissionData, MissionOption } from "@/hooks/useMission";
import { useAuth } from "@/context/AuthContext";
import { useUserProgress } from "@/hooks/useUserProgress";

type MissionState = "STRATEGY" | "SCENARIO" | "RESULT" | "REVIEW";

export default function MissionPlayer({ dayId }: { dayId: number }) {
    const router = useRouter();
    const { mission, loading, error } = useMission(dayId);
    const { user } = useAuth();
    const { progress, loading: progressLoading, recordMissionSuccess } = useUserProgress(user?.uid);

    // State Machine
    const [currentState, setCurrentState] = useState<MissionState>("STRATEGY");

    // Cloze state (STRATEGY)
    const [filledBlanks, setFilledBlanks] = useState<string[]>([]);
    const [availableKeywords, setAvailableKeywords] = useState<string[]>([]);

    // Option state (SCENARIO)
    const [selectedOption, setSelectedOption] = useState<MissionOption | null>(null);

    // Set keywords when mission loads
    useEffect(() => {
        if (mission && mission.cloze_keywords) {
            setAvailableKeywords(mission.cloze_keywords);
            setFilledBlanks([]);
            setCurrentState("STRATEGY");
            setSelectedOption(null);
        }
    }, [mission]);

    if (loading || progressLoading) {
        return (
            <div className="min-h-screen bg-background text-foreground pb-20 font-sans flex flex-col pt-16 px-4 space-y-8 animate-pulse">
                {/* Skeleton Loader matching 16:9 image card */}
                <div className="w-full relative aspect-video md:aspect-[21/9] rounded-3xl bg-muted/40" />
                <div className="w-24 h-6 bg-muted/40 rounded-full" />
                <div className="w-3/4 h-12 bg-muted/40 rounded-xl" />
                <div className="w-full h-32 bg-muted/40 rounded-3xl" />
            </div>
        );
    }

    if (error || !mission) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center space-y-4">
                    <p className="text-destructive font-bold text-lg">{error || "Mission not found"}</p>
                    <button onClick={() => router.back()} className="px-4 py-2 bg-secondary rounded-lg font-bold">Go Back</button>
                </div>
            </div>
        );
    }

    // Allow access if:
    // 1. Loading isn't complete (we show skeleton)
    // 2. User/Guest has unlocked this day via userProgress
    // 3. For guests (no user), we restrict them to the first 3 days max as a trial
    
    // Default to locked if we have progress data, but the dayId is strictly higher than what they've reached
    let isLocked = !loading && !progressLoading && progress && dayId > progress.currentDay;
    
    // Add additional restriction for guests: cap at Day 3
    if (!user && dayId > 3) {
        isLocked = true;
    }

    if (isLocked) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-background text-foreground space-y-6">
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
                    <Eye className="w-10 h-10 text-muted-foreground" />
                </div>
                <h1 className="text-3xl font-black italic tracking-tighter text-destructive">Mission Locked</h1>
                <p className="text-muted-foreground font-medium text-lg max-w-sm">
                    {!user && dayId > 3 
                        ? `You've reached the end of the free trial. Please log in to unlock Day ${dayId} and save your progress permanently.` 
                        : `You haven't reached Day ${dayId} yet! Complete your previous missions to unlock this scenario.`}
                </p>
                <button onClick={() => router.push("/")} className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg hover:scale-105 transition-transform">
                    Return to Dashboard
                </button>
            </div>
        );
    }

    // Split cloze dialogue safely. We fall back to old property names if the JSON is slightly different.
    const clozeSource = mission.cloze_setup || mission.cloze_dialogue || "";
    const clozeParts = clozeSource.split("[______]");
    const totalBlanks = Math.max(0, clozeParts.length - 1);

    const handleKeywordClick = (keyword: string) => {
        if (filledBlanks.length < totalBlanks) {
            setFilledBlanks([...filledBlanks, keyword]);
            setAvailableKeywords(availableKeywords.filter(k => k !== keyword));
        }
    };

    const handleUndo = () => {
        if (filledBlanks.length > 0) {
            const lastFilled = filledBlanks[filledBlanks.length - 1];
            setFilledBlanks(filledBlanks.slice(0, -1));
            setAvailableKeywords([...availableKeywords, lastFilled]);
        }
    };

    const handleCompleteStrategy = () => {
        setCurrentState("SCENARIO");
    };

    const handleOptionSelect = (option: MissionOption) => {
        setSelectedOption(option);
        setCurrentState("RESULT");
        
        // Phase 7: Progress Sync
        if (option.vibe_score > 80) {
            recordMissionSuccess(dayId, 10, option.vibe_score);
            console.log(`Mission Success! Updating Firebase for Day ${dayId} with 10 XP and Vibe Score ${option.vibe_score}.`);
        }
    };

    const handleRetry = () => {
        setSelectedOption(null);
        setCurrentState("SCENARIO"); // Go back to choices
    };

    const handleCompleteMission = () => {
        // Here we'd typically push them to the next day or back to the dashboard
        router.push("/");
    };

    const getVibeColor = (score: number) => {
        if (score <= 40) return "#ef4444"; // red-500
        if (score <= 75) return "#eab308"; // yellow-500
        return "#22c55e"; // green-500
    };

    return (
        <div className="min-h-screen bg-background text-foreground pb-20 font-sans selection:bg-primary/20">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-4 py-4 flex items-center justify-between">
                <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-secondary transition-colors">
                    <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                </button>
                <div className="font-bold text-sm tracking-widest uppercase text-muted-foreground flex gap-2">
                    <span className={currentState === "STRATEGY" ? "text-primary" : ""}>1. Strat</span> - 
                    <span className={currentState === "SCENARIO" ? "text-primary" : ""}>2. Act</span> -  
                    <span className={(currentState === "RESULT" || currentState === "REVIEW") ? "text-primary" : ""}>3. Review</span>
                </div>
                <div className="w-9 h-9" /> 
            </header>

            <main className="max-w-2xl mx-auto px-4 py-6 space-y-8 overflow-x-hidden relative">
                {/* Background Ambient Glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[120%] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />
                
                {/* Always Show the Featured Image and Intro in State 1 & 2 */}
                {(currentState === "STRATEGY" || currentState === "SCENARIO") && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                        {/* Featured Image */}
                        <div className="w-full relative aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-md bg-muted/30 border border-border">
                            <Image
                                src={mission.imageUrl || "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=1000"} 
                                alt={mission.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                        </div>

                        {/* Title & Brief */}
                        <div className="space-y-4 -mt-12 relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest rounded-full backdrop-blur-md">
                                Day {mission.day} • {mission.module}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black italic tracking-tight drop-shadow-sm">
                                {mission.title}
                            </h1>
                            <details className="group rounded-2xl bg-secondary/50 border border-border transition-all open:bg-secondary [&_summary::-webkit-details-marker]:hidden overflow-hidden">
                                <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-foreground text-sm list-none select-none">
                                    <span className="flex items-center gap-2">
                                        Strategic Brief
                                    </span>
                                    <span className="w-5 h-5 flex items-center justify-center shrink-0 transition-transform duration-300 group-open:-rotate-180 text-muted-foreground group-hover:text-foreground">
                                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                                    </span>
                                </summary>
                                <div className="px-4 pb-4 pt-1">
                                    <p className="text-muted-foreground text-sm font-medium leading-relaxed border-t border-border/50 pt-3">
                                        {mission.strategic_brief}
                                    </p>
                                </div>
                            </details>
                        </div>
                    </motion.div>
                )}

                {/* --- STATE 1: STRATEGY --- */}
                <AnimatePresence mode="wait">
                    {currentState === "STRATEGY" && (
                        <motion.div
                            key="strategy"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h2 className="text-xl font-black italic tracking-tight uppercase bg-gradient-to-br from-primary to-purple-500 bg-clip-text text-transparent mt-4">
                                Strategic Prep
                            </h2>
                            
                            <div className="p-6 rounded-3xl bg-gradient-to-br from-background/80 to-secondary/30 backdrop-blur-xl border border-primary/20 min-h-[140px] flex items-center shadow-[0_8px_30px_-12px_rgba(0,0,0,0.3)]">
                                <p className="text-xl md:text-2xl font-medium leading-relaxed drop-shadow-sm">
                                    {clozeParts.map((part, index) => (
                                        <span key={index}>
                                            {part}
                                            {index < totalBlanks && (
                                                <span className={`inline-block mx-1 px-4 py-1.5 rounded-xl border-2 border-dashed ${filledBlanks[index] ? 'border-transparent bg-gradient-to-r from-primary to-purple-600 text-white border-solid font-black transform scale-110 shadow-lg shadow-primary/30 transition-all' : 'border-muted-foreground/30 text-transparent min-w-[80px]'}`}>
                                                    {filledBlanks[index] || "blank"}
                                                </span>
                                            )}
                                        </span>
                                    ))}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between px-1">
                                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Select Words</span>
                                    {filledBlanks.length > 0 && (
                                        <button onClick={handleUndo} className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                                            <RefreshCw className="w-3 h-3" /> Undo
                                        </button>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <AnimatePresence>
                                        {availableKeywords.map((word) => (
                                            <motion.button
                                                key={word}
                                                layout
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.8, opacity: 0 }}
                                                whileTap={{ scale: 0.9 }}
                                                whileHover={{ scale: 1.05 }}
                                                onClick={() => handleKeywordClick(word)}
                                                className="px-5 py-3 bg-card border-2 border-border/50 rounded-2xl font-black shadow-sm hover:border-transparent hover:bg-gradient-to-br hover:from-primary hover:to-purple-500 hover:text-white hover:shadow-lg hover:shadow-primary/20 transition-all"
                                            >
                                                {word}
                                            </motion.button>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {filledBlanks.length === totalBlanks && (
                                <motion.button
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="w-full mt-6 py-5 bg-gradient-to-r from-foreground to-foreground/80 text-background font-black text-xl rounded-2xl shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    onClick={handleCompleteStrategy}
                                >
                                    Enter Scenario <ChevronRight className="w-5 h-5" />
                                </motion.button>
                            )}
                        </motion.div>
                    )}

                    {/* --- STATE 2: SCENARIO --- */}
                    {currentState === "SCENARIO" && (
                        <motion.div
                            key="scenario"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            {/* Dialogue Bubble */}
                            <div className="p-6 rounded-[2rem] bg-gradient-to-br from-background/90 to-secondary/40 backdrop-blur-xl border border-primary/20 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.2)]">
                                <div className="flex items-end gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-black shadow-lg shadow-primary/30 shrink-0 text-lg">
                                        {(mission.character || "N/A").charAt(0)}
                                    </div>
                                    <div className="text-sm font-black text-muted-foreground uppercase tracking-wider mb-1">
                                        {mission.character || "Encounter"}
                                    </div>
                                </div>
                                <div className="pl-14">
                                    <div className="bg-secondary/60 backdrop-blur-sm rounded-3xl p-5 rounded-tl-sm text-lg md:text-xl leading-relaxed font-semibold inline-block shadow-sm">
                                        &ldquo;{mission.scenario_text}&rdquo;
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 space-y-4">
                                <h2 className="text-xl font-black italic tracking-tight uppercase mb-4 bg-gradient-to-br from-primary to-purple-500 bg-clip-text text-transparent">
                                    Make Your Move
                                </h2>
                                {mission.options.map((option) => (
                                    <motion.button
                                        key={option.id}
                                        whileTap={{ scale: 0.98 }}
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => handleOptionSelect(option)}
                                        className="w-full text-left p-5 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-2 border-border/50 shadow-sm hover:border-transparent hover:shadow-[0_8px_30px_-12px_var(--color-primary)] transition-all font-medium text-lg flex items-end gap-4 group"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-black shadow-inner shrink-0 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-purple-600 group-hover:text-white transition-all">
                                            You
                                        </div>
                                        <div className="bg-primary/5 rounded-3xl p-5 rounded-bl-sm text-lg leading-relaxed font-semibold inline-block shadow-sm group-hover:bg-primary/10 transition-colors w-full border border-primary/5 group-hover:border-primary/20">
                                            &ldquo;{option.text}&rdquo;
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* --- STATE 3 & 4: RESULT / REVIEW --- */}
                    {(currentState === "RESULT" || currentState === "REVIEW") && selectedOption && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-8 pt-4 pb-12"
                        >
                            <div className="p-6 rounded-3xl bg-gradient-to-br from-card to-secondary/30 backdrop-blur-md border border-border/50 text-center shadow-sm">
                                <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">You Chose:</div>
                                <div className="text-xl font-medium italic drop-shadow-sm">&ldquo;{selectedOption.text}&rdquo;</div>
                            </div>

                            {/* Vibe Meter */}
                            <div className="flex flex-col items-center justify-center py-6">
                                <div className="relative w-48 h-24 overflow-hidden mb-4">
                                    <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                                        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="currentColor" strokeWidth="10" className="text-muted/30" strokeLinecap="round" />
                                        <motion.path
                                            d="M 10 50 A 40 40 0 0 1 90 50"
                                            fill="none"
                                            stroke={getVibeColor(selectedOption.vibe_score)}
                                            strokeWidth="10"
                                            strokeLinecap="round"
                                            strokeDasharray={125.6} 
                                            strokeDashoffset={125.6} 
                                            animate={{ strokeDashoffset: 125.6 - (125.6 * (selectedOption.vibe_score / 100)) }}
                                            transition={{ duration: 1.5, ease: "easeOut", type: "spring", bounce: 0.2 }}
                                        />
                                    </svg>
                                    <div className="absolute bottom-0 left-0 w-full text-center">
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8 }}
                                            className="text-4xl font-black italic tracking-tighter"
                                            style={{ color: getVibeColor(selectedOption.vibe_score) }}
                                        >
                                            {selectedOption.vibe_score}
                                        </motion.div>
                                    </div>
                                </div>

                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-center">
                                    <p className="text-foreground font-semibold text-lg md:text-xl leading-relaxed bg-gradient-to-br from-primary/10 to-purple-500/10 backdrop-blur-md border border-primary/20 shadow-inner p-6 rounded-3xl">
                                        {selectedOption.feedback}
                                    </p>
                                </motion.div>
                            </div>

                            {/* X-Ray / Review Logic */}
                            <div className="pt-4 border-t border-border">
                                {currentState === "RESULT" ? (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setCurrentState("REVIEW")}
                                        className="w-full p-8 rounded-[2rem] relative overflow-hidden group border border-primary/30 bg-card shadow-[0_8px_40px_-12px_var(--color-primary)] hover:border-primary/60 transition-colors"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent opacity-50 blur-2xl group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="relative z-10 flex flex-col items-center justify-center gap-3">
                                            <Eye className="w-10 h-10 text-primary drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                                            <span className="font-black italic tracking-tighter text-2xl bg-gradient-to-br from-primary to-purple-500 bg-clip-text text-transparent">Reveal Culture X-Ray</span>
                                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80">Unlock the deep subtext</span>
                                        </div>
                                    </motion.button>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-8 rounded-3xl bg-black/90 backdrop-blur-xl border border-white/10 text-white shadow-2xl relative overflow-hidden"
                                    >
                                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/30 rounded-full blur-3xl" />
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Eye className="w-5 h-5 text-primary" />
                                                <span className="font-bold text-xs uppercase tracking-widest text-primary">Culture X-Ray</span>
                                            </div>
                                            <p className="text-lg leading-relaxed font-medium">
                                                {mission.x_ray}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Dynamic Buttons */}
                            {selectedOption.vibe_score < 80 ? (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    onClick={handleRetry}
                                    className="w-full py-4 bg-muted text-foreground border border-border font-bold text-lg rounded-2xl shadow-sm flex justify-center items-center gap-2 hover:bg-secondary active:scale-[0.98] transition-all"
                                >
                                    <RefreshCw className="w-5 h-5" /> Try a different approach
                                </motion.button>
                            ) : (
                                currentState === "REVIEW" && (
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        onClick={handleCompleteMission}
                                        className="w-full py-5 bg-gradient-to-r from-primary to-purple-600 text-white font-black text-xl rounded-2xl shadow-[0_0_30px_-5px_var(--color-primary)] flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    >
                                        Complete Day {mission.day} <ChevronRight className="w-6 h-6" />
                                    </motion.button>
                                )
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
