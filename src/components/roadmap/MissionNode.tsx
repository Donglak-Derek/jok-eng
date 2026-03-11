import { Mission } from "@/types";
import { Lock, Star, Play, Check } from "lucide-react";
import { motion } from "framer-motion";

import { useRouter } from "next/navigation";

interface MissionNodeProps {
    mission: Mission;
    index: number;
    isCompleted?: boolean;
    isLocked?: boolean;
}

export default function MissionNode({ mission, index, isCompleted, isLocked }: MissionNodeProps) {
    const router = useRouter();
    // const isLocked = mission.phase > 1; // Assuming Phase 1 is unlocked for now

    // Winding formula
    const xOffset = Math.sin((index * Math.PI) / 5) * 80;

    let bgStyle = "";
    let ringStyle = "";
    let textStyle = "";
    let icon = <Play className="w-5 h-5 fill-current" />;

    if (mission.phase === 1) {
        bgStyle = "bg-gradient-to-tr from-primary to-purple-600 text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.2),_0_12px_24px_-6px_var(--color-primary)] shadow-primary/50";
        ringStyle = "ring-4 ring-primary/30 ring-offset-4 ring-offset-background";
        textStyle = "text-foreground font-bold";
        if (isLocked) icon = <Lock className="w-5 h-5 drop-shadow-sm" />;
    } else if (mission.phase === 2) {
        bgStyle = "bg-gradient-to-br from-secondary to-secondary/50 text-muted-foreground shadow-[inset_0_-4px_0_rgba(0,0,0,0.05),_0_8px_20px_-6px_rgba(0,0,0,0.1)] backdrop-blur-xl border border-border/50";
        ringStyle = "ring-4 ring-secondary/50 ring-offset-4 ring-offset-background";
        icon = <Lock className="w-6 h-6 drop-shadow-sm opacity-50 text-muted-foreground" />;
        textStyle = "text-muted-foreground font-bold";
    } else if (mission.phase === 3) {
        bgStyle = "bg-gradient-to-tr from-zinc-800 to-zinc-950 border-2 border-yellow-500/50 text-yellow-500 shadow-[inset_0_-4px_0_rgba(234,179,8,0.3),_0_12px_24px_-6px_rgba(234,179,8,0.4)]";
        ringStyle = "ring-4 ring-yellow-500/30 ring-offset-4 ring-offset-zinc-950";
        icon = <Star className="w-6 h-6 fill-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />;
        textStyle = "text-yellow-600 font-bold";
        if (isLocked) icon = <Lock className="w-5 h-5 opacity-60" />;
    }

    if (isCompleted) {
        icon = <Check className="w-8 h-8 stroke-[3] drop-shadow-md text-white" />;
        bgStyle = "bg-gradient-to-tr from-emerald-400 to-emerald-600 text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.3),_0_12px_24px_-6px_rgba(52,211,153,0.6)] shadow-emerald-500/40";
        ringStyle = "ring-4 ring-emerald-500/40 ring-offset-8 ring-offset-background";
        textStyle = "text-emerald-600 font-bold";
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
            className={`relative flex flex-col items-center justify-center my-6 ${!isLocked ? 'cursor-pointer' : ''}`}
            onClick={() => !isLocked && router.push(`/mission/mission-${mission.dayNumber}`)}
            style={{ transform: `translateX(${xOffset}px)` }}
        >
            <div className={`relative flex items-center justify-center w-24 h-24 rounded-full font-black text-2xl transition-transform active:scale-95 z-10 ${bgStyle} ${ringStyle}`}>
                {!isLocked && !isCompleted ? (
                    <span className="drop-shadow-sm">{mission.dayNumber}</span>
                ) : (
                    icon
                )}
            </div>

            <div className={`mt-5 text-center px-5 py-3 rounded-2xl backdrop-blur-xl bg-card border ${isCompleted ? 'border-emerald-500/30' : 'border-border'} min-w-[140px] max-w-[220px] shadow-lg ${textStyle}`}>
                <div className="text-[10px] uppercase font-black tracking-widest opacity-80 mb-1">
                    Day {mission.dayNumber}
                </div>
                <div className="text-sm font-bold leading-tight drop-shadow-sm">
                    {mission.title}
                </div>
            </div>

            {/* Connecting line to the next node could be drawn here, but usually a dashed background line works better. To keep it simple, we use index-based transforms. */}
        </motion.div>
    );
}
