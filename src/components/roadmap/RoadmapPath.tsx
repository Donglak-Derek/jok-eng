import { Mission } from "@/types";
import MissionNode from "./MissionNode";
import { useAuth } from "@/context/AuthContext";
import { useUserProgress } from "@/hooks/useUserProgress";
import { motion } from "framer-motion";
import { Trophy, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface RoadmapPathProps {
    missions: Mission[];
}

export default function RoadmapPath({ missions }: RoadmapPathProps) {
    const { user } = useAuth();
    const { progress } = useUserProgress(user?.uid);
    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to current day
    useEffect(() => {
        if (!progress || !missions.length) return;
        
        const timer = setTimeout(() => {
            const activeNodeStr = `mission-node-${progress.currentDay}`;
            const element = document.getElementById(activeNodeStr);
            if (element) {
                // Scroll the window so the node is centered
                const y = element.getBoundingClientRect().top + window.scrollY - (window.innerHeight / 2) + 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 500); // Wait for rendering

        return () => clearTimeout(timer);
    }, [progress?.currentDay, missions.length]);

    if (!missions.length) return null;

    return (
        <div className="relative w-full py-10 flex flex-col items-center overflow-x-hidden">
            {/* Background dashed path */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 border-l-4 border-dashed border-border/40 -z-10" />

            {/* Phase sections visual breaks */}
            {missions.map((mission, index) => {
                const showPhase2Header = mission.dayNumber === 31;
                const showPhase3Header = mission.dayNumber === 61;
                const isActive = progress?.currentDay === mission.dayNumber;

                return (
                    <div 
                        key={mission.id} 
                        id={`mission-node-${mission.dayNumber}`}
                        className="w-full flex flex-col items-center"
                    >
                        {showPhase2Header && (
                            <div className="my-16 flex flex-col items-center text-center">
                                <div className="h-px w-48 bg-gradient-to-r from-transparent via-border to-transparent mb-4" />
                                <h2 className="text-2xl font-black tracking-widest uppercase text-muted-foreground italic mb-1">Phase 2: The Vibe Builder</h2>
                                <p className="text-sm text-muted-foreground/80 font-medium">Locked until Day 31</p>
                                <div className="h-px w-48 bg-gradient-to-r from-transparent via-border to-transparent mt-4" />
                            </div>
                        )}
                        {showPhase3Header && (
                            <div className="my-16 flex flex-col items-center text-center">
                                <div className="h-px w-48 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent mb-4" />
                                <h2 className="text-2xl font-black tracking-widest uppercase text-yellow-500 italic mb-1">Phase 3: The Power Player</h2>
                                <p className="text-sm text-yellow-500/80 font-medium">Premium content</p>
                                <div className="h-px w-48 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent mt-4" />
                            </div>
                        )}
                        <MissionNode 
                            mission={mission} 
                            index={index} 
                            isCompleted={progress?.completedDays.includes(mission.dayNumber) || false}
                            isLocked={mission.dayNumber > (progress?.currentDay || 1)}
                        />
                        
                        {/* Guest Conversion Banner after Day 3 */}
                        {!user && mission.dayNumber === 3 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="my-12 w-full max-w-sm px-6 py-8 rounded-3xl bg-gradient-to-br from-primary/90 to-purple-600/90 backdrop-blur-xl border border-white/20 text-white shadow-2xl text-center relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10" />
                                <div className="relative z-10 space-y-4">
                                    <Star className="w-10 h-10 mx-auto fill-yellow-400 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                                    <h3 className="text-2xl font-black tracking-tight">You're on a roll!</h3>
                                    <p className="text-white/90 font-medium text-sm">
                                        You've unlocked the first 3 days. Create a free account to automatically save your XP and unlock Day 4.
                                    </p>
                                    <Link 
                                        href="/login"
                                        className="mt-4 block w-full py-4 px-6 bg-white text-primary font-bold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2"
                                    >
                                        Save My Progress <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </div>
                );
            })}

            {/* The Mastery Award (Day 90 Completion) */}
            {progress?.completedDays.includes(90) && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="mt-20 mb-10 w-full max-w-sm p-1 rounded-3xl bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-700 shadow-[0_0_50px_rgba(234,179,8,0.4)]"
                >
                    <div className="px-6 py-10 rounded-[22px] bg-zinc-950 text-center relative overflow-hidden flex flex-col items-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.15)_0%,transparent_70%)]" />
                        <motion.div 
                            animate={{ rotateY: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="relative z-10 mb-6"
                        >
                            <Trophy className="w-20 h-20 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]" strokeWidth={1.5} />
                        </motion.div>
                        <div className="relative z-10 space-y-2">
                            <div className="text-yellow-500 uppercase tracking-[0.3em] text-xs font-black">90-Day Journey Complete</div>
                            <h2 className="text-3xl font-black text-white italic tracking-tighter">Social Master</h2>
                            <p className="text-zinc-400 text-sm font-medium pt-2">
                                You have completed the definitive path. Your social engine is now fully upgraded. Use your power wisely.
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
