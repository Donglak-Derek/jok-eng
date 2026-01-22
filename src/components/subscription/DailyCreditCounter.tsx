"use client";

import { useSubscription } from "@/hooks/useSubscription";
import { Zap } from "lucide-react";
import { useState } from "react";
import UpgradeModal from "@/components/subscription/UpgradeModal";

export default function DailyCreditCounter() {
    const { credits, isPro } = useSubscription();
    const [showUpgrade, setShowUpgrade] = useState(false);

    if (isPro) return null; // Or show specific Pro badge?

    return (
        <>
            <button 
                onClick={() => setShowUpgrade(true)}
                className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all
                    ${credits.remaining === 0 
                        ? "bg-red-50 border-red-200 text-red-600 animate-pulse" 
                        : "bg-secondary/50 border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }
                `}
            >
                <Zap className={`w-3.5 h-3.5 ${credits.remaining === 0 ? "fill-red-500" : "fill-yellow-400 text-yellow-500"}`} />
                <span>{credits.remaining}/{credits.limit}</span>
            </button>

            <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} reason="gen_limit" />
        </>
    );
}
