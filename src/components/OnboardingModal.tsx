"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserProfile, GENERATION_GROUPS, JOB_CATEGORIES, CULTURE_OPTIONS } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function OnboardingModal() {
    const { user, loading: authLoading } = useAuth();
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState<Partial<UserProfile>>({
        occupation: "",
        ageGroup: undefined,
        motherLanguage: "",
        humorStyle: "Witty" // Default
    });

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            setIsVisible(false);
            setLoading(false);
            return;
        }

        const checkOnboarding = async () => {
            // Don't show on login page or if already checked in session (optional opt)
            // For now, check firestore
            try {
                const userRef = doc(db, "users", user.uid);
                const snap = await getDoc(userRef);

                if (snap.exists()) {
                    const data = snap.data() as UserProfile;
                    if (data.onboardingCompleted) {
                        setIsVisible(false);
                    } else {
                        // User exists but onboarding not marked complete, or fields missing
                        setIsVisible(true);
                        // Pre-fill if partial data exists
                        setFormData(prev => ({ ...prev, ...data }));
                    }
                } else {
                    // New user (no doc yet), definitely show onboarding
                    setIsVisible(true);
                }
            } catch (e) {
                console.error("Error checking onboarding status", e);
            } finally {
                setLoading(false);
            }
        };

        checkOnboarding();
    }, [user, authLoading]);

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        try {
            const userRef = doc(db, "users", user.uid);

            // Allow merging in case some stats exist
            await setDoc(userRef, {
                ...formData,
                uid: user.uid,
                onboardingCompleted: true,
                // Ensure defaults for stats if they don't exist
                totalScenariosCreated: 0,
                totalPractices: 0,
                totalRemixesInspired: 0,
                // Phase 1: Freemium Init
                subscription: {
                    tier: "free",
                    status: "active",
                    features: {
                        premiumTTS: false,
                        advancedAnalytics: false
                    }
                }
            }, { merge: true });

            setIsVisible(false);
        } catch (e) {
            console.error("Failed to save onboarding", e);
            alert("Failed to save. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    if (authLoading || loading || !isVisible) return null;

    // Force user to stay if visible (no onClose)
    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-2xl">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="bg-zinc-900/50 w-full max-w-xl rounded-[40px] p-10 md:p-14 shadow-[0_0_100px_rgba(0,0,0,0.5)] relative border border-white/5 backdrop-blur-3xl overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                    <div className="text-center mb-10 relative z-10">
                        <div className="text-5xl mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">🛰️</div>
                        <h2 className="text-4xl md:text-5xl font-black mb-2 italic uppercase tracking-tighter text-white">System Initialization</h2>
                        <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-xs">
                            Syncing operator profile with tactical database
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2">
                                Primary Sector / Origin
                                <span className="text-primary">*</span>
                            </label>
                            <select
                                value={formData.motherLanguage || ""}
                                onChange={e => setFormData({ ...formData, motherLanguage: e.target.value })}
                                className="w-full bg-zinc-950/50 border border-white/5 rounded-2xl px-6 py-5 font-black text-lg text-white focus:ring-2 ring-primary/20 outline-none appearance-none transition-all"
                            >
                                <option value="" className="bg-zinc-900">IDENTIFY SECTOR...</option>
                                {CULTURE_OPTIONS.map(c => (
                                    <option key={c} value={c} className="bg-zinc-900">{c}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2">
                                Operator Generation
                                <span className="text-primary">*</span>
                            </label>
                            <select
                                value={formData.ageGroup || ""}
                                onChange={e => setFormData({ ...formData, ageGroup: e.target.value as any }) /* eslint-disable-line @typescript-eslint/no-explicit-any */}
                                className="w-full bg-zinc-950/50 border border-white/5 rounded-2xl px-6 py-5 font-black text-lg text-white focus:ring-2 ring-primary/20 outline-none appearance-none transition-all"
                            >
                                <option value="" className="bg-zinc-900">SELECT VIBE...</option>
                                {GENERATION_GROUPS.map(g => (
                                    <option key={g} value={g} className="bg-zinc-900">{g}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2">
                                Field of Operation
                                <span className="text-primary">*</span>
                            </label>
                            <select
                                value={formData.occupation || ""}
                                onChange={e => setFormData({ ...formData, occupation: e.target.value })}
                                className="w-full bg-zinc-950/50 border border-white/5 rounded-2xl px-6 py-5 font-black text-lg text-white focus:ring-2 ring-primary/20 outline-none appearance-none transition-all"
                            >
                                <option value="" className="bg-zinc-900">SELECT FIELD...</option>
                                {/* Handle Array vs Object for JOB_CATEGORIES */}
                                {Array.isArray(JOB_CATEGORIES) ? (
                                    JOB_CATEGORIES.map(j => (
                                        <option key={j} value={j} className="bg-zinc-900">{j}</option>
                                    ))
                                ) : (
                                    Object.entries(JOB_CATEGORIES).map(([group, roles]) => (
                                        <optgroup key={group} label={group} className="bg-zinc-900">
                                            {roles.map(role => (
                                                <option key={role} value={role} className="bg-zinc-900">{role}</option>
                                            ))}
                                        </optgroup>
                                    ))
                                )}
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={!formData.motherLanguage || !formData.ageGroup || !formData.occupation || saving}
                        className="w-full mt-10 py-5 rounded-2xl bg-primary text-white font-black text-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed shadow-[0_0_30px_rgba(var(--primary),0.2)] relative z-10"
                    >
                        {saving && <Loader2 className="w-6 h-6 animate-spin" />}
                        {saving ? "UPLOADING DATA..." : "AUTHORIZE ACCESS 🚀"}
                    </button>

                </motion.div>
            </div>
        </AnimatePresence>
    );
}
