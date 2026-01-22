"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
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
                totalRemixesInspired: 0
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
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                 <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-background w-full max-w-lg rounded-3xl p-8 shadow-2xl relative border border-border"
                >
                    <div className="text-center mb-8">
                        <div className="text-4xl mb-3">👋</div>
                        <h2 className="text-3xl font-black mb-2">Welcome to Jok-eng!</h2>
                        <p className="text-muted-foreground">
                            Let's customize the AI to match your vibe.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* 1. Origin */}
                        <div className="space-y-2">
                             <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                Native Language / Origin
                                <span className="text-red-500">*</span>
                             </label>
                             <select 
                                value={formData.motherLanguage || ""} 
                                onChange={e => setFormData({...formData, motherLanguage: e.target.value})}
                                className="w-full bg-secondary/50 rounded-xl px-4 py-4 font-bold text-lg focus:ring-2 ring-primary/20 outline-none appearance-none"
                            >
                                <option value="">Select Origin...</option>
                                {CULTURE_OPTIONS.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                         {/* 2. Generation */}
                         <div className="space-y-2">
                             <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                Generation (The Vibe)
                                <span className="text-red-500">*</span>
                             </label>
                             <select 
                                value={formData.ageGroup || ""} 
                                onChange={e => setFormData({...formData, ageGroup: e.target.value as any})}
                                className="w-full bg-secondary/50 rounded-xl px-4 py-4 font-bold text-lg focus:ring-2 ring-primary/20 outline-none appearance-none"
                            >
                                <option value="">Select Generation...</option>
                                {GENERATION_GROUPS.map(g => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </select>
                        </div>

                        {/* 3. Occupation */}
                        <div className="space-y-2">
                             <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                Occupation
                                <span className="text-red-500">*</span>
                             </label>
                             <select 
                                value={formData.occupation || ""} 
                                onChange={e => setFormData({...formData, occupation: e.target.value})}
                                className="w-full bg-secondary/50 rounded-xl px-4 py-4 font-bold text-lg focus:ring-2 ring-primary/20 outline-none appearance-none"
                            >
                                <option value="">Select Job...</option>
                                {/* Handle Array vs Object for JOB_CATEGORIES */}
                                {Array.isArray(JOB_CATEGORIES) ? (
                                    JOB_CATEGORIES.map(j => (
                                        <option key={j} value={j}>{j}</option>
                                    ))
                                ) : (
                                    Object.entries(JOB_CATEGORIES).map(([group, roles]) => (
                                        <optgroup key={group} label={group}>
                                            {roles.map(role => (
                                                <option key={role} value={role}>{role}</option>
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
                        className="w-full mt-8 py-4 rounded-xl bg-foreground text-background font-black text-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                        {saving && <Loader2 className="w-6 h-6 animate-spin" />}
                        {saving ? "Setting up..." : "Start My Studio 🚀"}
                    </button>

                </motion.div>
            </div>
        </AnimatePresence>
    );
}
