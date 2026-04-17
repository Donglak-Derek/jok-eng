import { Session, Season } from "@/types";
import SessionNode from "./SessionNode";
import { useAuth } from "@/context/AuthContext";
import { useUserProgress } from "@/hooks/useUserProgress";
import { motion } from "framer-motion";
import { Trophy, ArrowRight, Star, Hexagon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { seasons } from "@/data/sessions";
import CompletionCard from "./CompletionCard";

interface RoadmapPathProps {
    sessions: Session[];
}

export default function RoadmapPath({ sessions }: RoadmapPathProps) {
    const { user } = useAuth();
    const { progress, resetRoadmap } = useUserProgress(user?.uid);
    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to current day
    useEffect(() => {
        if (!progress || !sessions.length) return;
        
        const timer = setTimeout(() => {
            const activeNodeStr = `session-node-${progress.currentDay}`;
            const element = document.getElementById(activeNodeStr);
            if (element) {
                // Scroll the window so the node is centered
                const y = element.getBoundingClientRect().top + window.scrollY - (window.innerHeight / 2) + 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 500); // Wait for rendering

        return () => clearTimeout(timer);
    }, [progress?.currentDay, sessions.length]);

    if (!sessions.length) return null;

    return (
        <div className="relative w-full py-10 flex flex-col items-center overflow-x-hidden">
            {seasons.map((season) => {
                const seasonSessions = sessions.filter(s => s.day >= season.days[0] && s.day <= season.days[1]);
                const isSeasonLocked = season.days[0] > (progress?.currentDay || 1);
                
                return (
                    <div key={season.id} className="w-full flex flex-col items-center mb-16 px-4">
                        {/* Season Header */}
                        <div className="w-full max-w-md mb-8">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="relative z-10 bg-zinc-900 border-l-4 border-primary p-4 flex flex-col items-start gap-1 shadow-xl"
                            >
                                <div className="flex items-center gap-2">
                                    <Hexagon className="w-4 h-4 fill-primary text-primary" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80">Season {season.id}</span>
                                </div>
                                <h2 className="text-xl font-black italic tracking-tighter uppercase text-white leading-none">{season.title}</h2>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-1">
                                    {season.description}
                                </p>
                            </motion.div>
                        </div>

                        {/* Sessions in Season - Clean Vertical List */}
                        <div className="w-full max-w-md space-y-3">
                            {seasonSessions.map((session, index) => {
                                const isCompleted = progress?.completedDays.includes(session.day) || false;
                                const isLocked = session.day > (progress?.currentDay || 1);

                                return (
                                    <div 
                                        key={session.day} 
                                        id={`session-node-${session.day}`}
                                        className="w-full"
                                    >
                                        <SessionNode 
                                            session={session} 
                                            index={index} 
                                            isCompleted={isCompleted}
                                            isLocked={isLocked}
                                        />
                                        
                                        {/* Guest Conversion Banner after Day 3 */}
                                        {!user && session.day === 3 && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                className="my-8 w-full px-6 py-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-primary/30 text-white shadow-2xl text-center relative overflow-hidden"
                                            >
                                                <div className="relative z-10 space-y-4">
                                                    <Star className="w-8 h-8 mx-auto fill-primary text-primary" />
                                                    <h3 className="text-xl font-black tracking-tight uppercase italic">Secure Your Progress</h3>
                                                    <p className="text-zinc-400 font-medium text-xs leading-relaxed">
                                                        You've reached Day 3. Create a free profile to save your XP and unlock the full 90-day roadmap.
                                                    </p>
                                                    <Link 
                                                        href="/login"
                                                        className="mt-4 block w-full py-3 px-6 bg-primary text-primary-foreground font-black uppercase tracking-widest text-xs rounded-sm shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
                                                    >
                                                        Join the Community <ArrowRight className="w-4 h-4" />
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}

            {/* Roadmap Completion Card - Always Visible */}
            <CompletionCard 
                onReset={resetRoadmap} 
                completions={progress?.completions || 0} 
                isLocked={!progress?.completedDays?.includes(90)}
            />

            {/* The Mastery Award (Day 90 Completion) */}
            {progress?.completedDays.includes(90) && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-20 mb-10 w-full max-w-sm p-1 bg-primary"
                >
                    <div className="px-6 py-10 bg-zinc-950 text-center relative flex flex-col items-center">
                        <Trophy className="w-16 h-16 text-primary mb-6" />
                        <div className="space-y-2">
                            <div className="text-primary uppercase tracking-[0.3em] text-[10px] font-black underline decoration-2 decoration-primary underline-offset-4">Challenge Complete</div>
                            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">Social Master</h2>
                            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest pt-4">
                                You are now a fully upgraded social engine.
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
