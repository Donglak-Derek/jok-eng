import { Mission } from "@/types";
import { Lock, Star, Play, Check, ArrowRight } from "lucide-react";
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

    let statusColor = "border-zinc-800 text-zinc-600 bg-zinc-900/50";
    let icon = <Play className="w-4 h-4 fill-current" />;

    if (isCompleted) {
        statusColor = "border-primary text-primary bg-primary/5 shadow-[0_0_15px_rgba(var(--primary),0.1)]";
        icon = <Check className="w-4 h-4 stroke-[3]" />;
    } else if (isLocked) {
        statusColor = "border-zinc-800 text-zinc-700 bg-zinc-900/20 grayscale";
        icon = <Lock className="w-4 h-4 opacity-40" />;
    } else {
        // Current active node
        statusColor = "border-primary bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)] animate-pulse";
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`group relative flex items-center gap-4 w-full p-1 ${!isLocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            onClick={() => !isLocked && router.push(`/mission/mission-${mission.day}`)}
        >
            {/* Status Indicator (Square/Military Style) */}
            <div className={`shrink-0 w-12 h-12 border-2 flex items-center justify-center transition-all duration-300 ${statusColor}`}>
                {isLocked ? (
                    <Lock className="w-4 h-4 opacity-40" />
                ) : isCompleted ? (
                    <Check className="w-5 h-5 stroke-[3]" />
                ) : (
                    <span className="text-sm font-black italic tracking-tighter">{mission.day}</span>
                )}
            </div>

            {/* Mission Info */}
            <div className="flex-1 flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isLocked ? 'text-zinc-700' : 'text-primary/70'}`}>
                        Msn {mission.day.toString().padStart(2, '0')}
                    </span>
                    {isCompleted && (
                        <div className="w-1 h-1 rounded-full bg-primary" />
                    )}
                </div>
                <h3 className={`text-sm font-black uppercase italic tracking-tighter truncate ${isLocked ? 'text-zinc-600' : 'text-white'}`}>
                    {mission.title}
                </h3>
            </div>

            {/* Action Icon */}
            <div className={`shrink-0 transition-all duration-300 ${isLocked ? 'opacity-0' : 'opacity-100'}`}>
                 {!isCompleted && !isLocked && <ArrowRight className="w-4 h-4 text-primary animate-bounce-horizontal" />}
                 {isCompleted && <Star className="w-4 h-4 text-primary fill-primary" />}
            </div>

            {/* Hover Effect Line */}
            {!isLocked && (
                <div className="absolute left-0 bottom-0 h-px bg-primary scale-x-0 group-hover:scale-x-full transition-transform duration-500 origin-left" />
            )}
        </motion.div>
    );
}

// Add CSS for bounce animation if not present elsewhere
// @keyframes bounce-horizontal {
//   0%, 100% { transform: translateX(0); }
//   50% { transform: translateX(5px); }
// }

