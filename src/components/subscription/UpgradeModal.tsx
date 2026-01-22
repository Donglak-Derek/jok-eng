"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";


interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    reason?: "gen_limit" | "tts_limit";
}

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function UpgradeModal({ isOpen, onClose, reason = "gen_limit" }: UpgradeModalProps) {
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleCheckout = async () => {
        if (!user) {
            alert("Please sign in to upgrade!");
            return;
        }

        const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID;
        
        setLoading(true);
        try {
            const res = await fetch("/api/checkout_sessions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.uid,
                    email: user.email,
                    priceId, 
                }),
            });

            const { url, error } = await res.json();
            if (error) throw new Error(error);

            if (url) {
                window.location.href = url;
            }
        } catch (err: any) {
            console.error("Checkout failed:", err);
            alert("Checkout failed: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const title = reason === "gen_limit" 
        ? "You've hit your daily limit! 🛑" 
        : "Unlock Premium Voices 🎙️";

    const limits = [
        { feature: "Daily Ai Creation Limit", free: "3 scenarios / day", pro: "15 scenarios / day" },
        { feature: "AI Voice", free: "Standard Robotic", pro: "Human-like Neural" },
        { feature: "Replays", free: "Unlimited", pro: "Unlimited" },
        { feature: "Storage", free: "Last 5", pro: "Unlimited" },
    ];

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />
                    
                    {/* Modal */}
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-background w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-border relative z-10 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
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
                                    <tr className="text-foreground text-xs uppercase tracking-wider border-b border-border/50">
                                        <th className="px-4 py-3 text-left font-black">Feature</th>
                                        <th className="px-4 py-3 text-center font-black">Free</th>
                                        <th className="px-4 py-3 text-center font-black text-indigo-600">Pro</th>
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
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-lg shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleCheckout}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                            ) : (
                                <Lock className="w-5 h-5" />
                            )}
                            {loading ? "Processing..." : "Unlock Pro - $9/mo"}
                        </button>
                        
                        <p className="text-center text-xs text-muted-foreground">
                             Stripe Secure Payment. Cancel anytime.
                        </p>
                    </div>
                </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
