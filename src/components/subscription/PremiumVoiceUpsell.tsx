"use client";

import { useSubscription } from "@/hooks/useSubscription";
import { useState } from "react";
import UpgradeModal from "@/components/subscription/UpgradeModal";
import { Sparkles } from "lucide-react";

export default function PremiumVoiceUpsell() {
    const { isPro } = useSubscription();
    const [showUpgrade, setShowUpgrade] = useState(false);

    if (isPro) return null;

    return (
        <>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setShowUpgrade(true);
                }}
                className="mt-2 text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline flex items-center justify-center gap-1 transition-colors animate-in fade-in slide-in-from-top-1"
            >
                <Sparkles className="w-3 h-3" />
                <span>Unlock Human-like Voices (Pro)</span>
            </button>
            <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} reason="tts_limit" />
        </>
    );
}
