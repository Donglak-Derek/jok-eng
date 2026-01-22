"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Lock } from "lucide-react";

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    reason?: "gen_limit" | "tts_limit";
}

export default function UpgradeModal({ isOpen, onClose, reason = "gen_limit" }: UpgradeModalProps) {
    if (!isOpen) return null;

    const title = reason === "gen_limit" 
        ? "You've hit your daily limit! 🛑" 
        : "Unlock Premium Voices 🎙️";

    const limits = [
        { feature: "Daily Scenarios", free: "3 / day", pro: "15 / day" },
        { feature: "AI Voice", free: "Standard", pro: "Premium Google Cloud" },
        { feature: "Replays", free: "Unlimited", pro: "Unlimited" },
        { feature: "Storage", free: "Last 5", pro: "Unlimited" },
    ];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-background w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-border relative"
                >
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary/50 transition-colors z-10">
                        <X className="w-5 h-5 opacity-50" />
                    </button>

                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white text-center">
                        <div className="text-5xl mb-2">💎</div>
                        <h2 className="text-2xl font-black tracking-tight">{title}</h2>
                        <p className="text-white/80 font-medium">Upgrade to Pro to remove limits.</p>
                    </div>

                    <div className="p-6 md:p-8 space-y-6">
                        {/* Comparison Table */}
                        <div className="bg-secondary/30 rounded-2xl p-1">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-muted-foreground/60 text-xs uppercase tracking-wider">
                                        <th className="px-4 py-2 text-left font-bold">Feature</th>
                                        <th className="px-4 py-2 text-center font-bold">Free</th>
                                        <th className="px-4 py-2 text-center font-bold text-indigo-500">Pro</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    {limits.map((row, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors">
                                            <td className="px-4 py-3 font-semibold text-foreground/80">{row.feature}</td>
                                            <td className="px-4 py-3 text-center text-muted-foreground">{row.free}</td>
                                            <td className="px-4 py-3 text-center font-bold text-indigo-600">{row.pro}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <button 
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-lg shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            onClick={() => alert("Payment intent would go here! This is a demo.")}
                        >
                            <Lock className="w-5 h-5" />
                            Unlock Pro - $9/mo
                        </button>
                        
                        <p className="text-center text-xs text-muted-foreground">
                            Cancel anytime. 7-day money back guarantee.
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
