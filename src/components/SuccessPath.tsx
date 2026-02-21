"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Star, Target, Trophy, User } from "lucide-react";

type Level = {
    title: string;
    description: string;
    requirement: number;
    icon: React.ReactNode;
};

const LEVELS: Level[] = [
    {
        title: "The Observer",
        description: "Just starting to decode the social Matrix.",
        requirement: 0,
        icon: <User className="w-5 h-5" />
    },
    {
        title: "The Apprentice",
        description: "Practicing the basics of calibration.",
        requirement: 5,
        icon: <Star className="w-5 h-5" />
    },
    {
        title: "The Negotiator",
        description: "Handling multi-turn social friction.",
        requirement: 20,
        icon: <Target className="w-5 h-5" />
    },
    {
        title: "The Social Ninja",
        description: "Smooth, calibrated, and high-functioning.",
        requirement: 50,
        icon: <Zap className="w-5 h-5" />
    },
    {
        title: "The Leader",
        description: "Master of subtext. Commands the room.",
        requirement: 100,
        icon: <Trophy className="w-5 h-5" />
    }
];

function Zap({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 14.71 12 2.5v9h8L12 23.5v-9H4z" /></svg>
    );
}

export default function SuccessPath({ totalPractices }: { totalPractices: number }) {
    return (
        <div className="bg-card border border-border/50 rounded-[3rem] p-8 md:p-12 space-y-12">
            <div className="space-y-2">
                <h2 className="text-3xl font-black italic tracking-tighter uppercase">
                    Your <span className="text-primary">Success Path</span>
                </h2>
                <p className="text-muted-foreground font-medium">From student to social architect. Track your mastery.</p>
            </div>

            <div className="relative space-y-8">
                {/* Vertical Line */}
                <div className="absolute left-[26px] top-4 bottom-4 w-0.5 bg-border/50 z-0" />

                {LEVELS.map((level, index) => {
                    const isCompleted = totalPractices >= level.requirement;
                    const isNext = !isCompleted && (index === 0 || totalPractices >= LEVELS[index - 1].requirement);

                    return (
                        <motion.div
                            key={level.title}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative z-10 flex gap-6 items-start ${isCompleted ? 'opacity-100' : 'opacity-40'}`}
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-all duration-500 ${isCompleted ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20 scale-110' : (isNext ? 'bg-background border-primary text-primary animate-pulse' : 'bg-background border-border text-muted-foreground')}`}>
                                {isCompleted ? <CheckCircle2 className="w-7 h-7" /> : level.icon}
                            </div>

                            <div className="space-y-1 py-1">
                                <div className="flex items-center gap-2">
                                    <h3 className={`font-black italic tracking-tight text-xl ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                                        {level.title.toUpperCase()}
                                    </h3>
                                    {isCompleted && (
                                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-black uppercase tracking-widest">Mastered</span>
                                    )}
                                </div>
                                <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                                    {level.description}
                                </p>
                                {!isCompleted && (
                                    <div className="text-[10px] font-black uppercase tracking-widest text-primary/60 pt-1">
                                        Req: {level.requirement} Rehearsals
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Value Proposition Box */}
            <div className="p-8 rounded-[2.5rem] bg-black text-white space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                    Unlocked ROI
                </div>
                <h4 className="text-2xl font-bold tracking-tight">Est. Market Value: <span className="text-primary font-black">$12,500/yr</span></h4>
                <p className="text-white/60 text-sm leading-relaxed max-w-lg">
                    Based on average industry salary bumps for high-functioning communicators. Your current level indicates you are ready for <strong>Mid-Level Multi-Turn</strong> negotiations.
                </p>
            </div>
        </div>
    );
}
