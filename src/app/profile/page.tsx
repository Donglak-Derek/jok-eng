"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserStats, UserProfile, GENERATION_GROUPS, JOB_CATEGORIES, CULTURE_OPTIONS } from "@/types";
import { motion } from "framer-motion";
import { X, Loader2, User } from "lucide-react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import SuccessPath from "@/components/SuccessPath";
import { useUserProgress } from "@/hooks/useUserProgress";
import { Trophy } from "lucide-react";
import Link from "next/link";

// Rank Logic Helpers
const getRank = (xp: number) => {
    if (xp >= 8000) return { title: "Social Master 👑", color: "from-yellow-400 to-amber-600" };
    if (xp >= 3000) return { title: "Charisma Coach 🗣️", color: "from-purple-400 to-indigo-600" };
    if (xp >= 1000) return { title: "Power Player 🤝", color: "from-blue-400 to-cyan-600" };
    if (xp >= 200) return { title: "Vibe Builder ✨", color: "from-emerald-400 to-green-600" };
    return { title: "New Arrival 🌱", color: "from-slate-400 to-slate-600" };
};

export default function ProfilePage() {
    const { user, refreshProfile, loading: authLoading } = useAuth(); // Added refreshProfile
    const { progress } = useUserProgress(user?.uid);
    const router = useRouter();
    const [stats, setStats] = useState<UserStats | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);

    // ... useEffect ...

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0] || !user) return;

        const file = e.target.files[0];
        // Validate file size/type if needed (e.g. < 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("File size must be less than 5MB");
            return;
        }

        setUploadingPhoto(true);

        try {
            const storage = getStorage();
            const fileExt = file.name.split('.').pop();
            const fileName = `profile_${user.uid}_${Date.now()}.${fileExt}`;
            const storageRef = ref(storage, `profile_photos/${user.uid}/${fileName}`);

            // 1. Upload to Firebase Storage
            await uploadBytes(storageRef, file);
            const photoURL = await getDownloadURL(storageRef);

            // 2. Update Firebase Auth Profile
            await updateProfile(user, { photoURL });

            // 3. Update Firestore User Document
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, { photoURL });

            // 4. Refresh Auth Context to update Header immediately
            await refreshProfile();

            // Force local re-render if needed, but context update might handle it
            // window.location.reload(); // Optional, or rely on state
        } catch (error) {
            console.error("Error uploading photo:", error);
            alert("Failed to upload photo. Please try again.");
        } finally {
            setUploadingPhoto(false);
        }
    };

    if (authLoading || loading) {
        // ... loading return
    }

    if (!user) {
        return (
            <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center text-center px-6 pb-20">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 bg-secondary/30 rounded-full flex items-center justify-center mb-6 ring-4 ring-border shadow-2xl"
                >
                    <User className="w-12 h-12 text-muted-foreground" />
                </motion.div>
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl font-black tracking-tight mb-3"
                >
                    Save Your Journey
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-muted-foreground max-w-sm mb-8 text-sm md:text-base leading-relaxed"
                >
                    Create a free account to track your daily rehearsals, save custom scenarios, and build your Hollywood legacy.
                </motion.p>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="w-full max-w-sm flex flex-col gap-4"
                >
                    <Link
                        href="/login"
                        className="w-full py-4 rounded-xl bg-foreground text-background font-bold text-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-xl flex items-center justify-center"
                    >
                        Sign In / Create Account
                    </Link>
                    <button
                        onClick={() => router.push("/")}
                        className="w-full py-3 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Continue as Guest
                    </button>
                </motion.div>
            </div>
        );
    }

    const rank = getRank(progress?.totalXP || 0);

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Profile Hero Section */}
            <div className="relative pt-6 pb-8 overflow-hidden">
                <div className="absolute inset-0 bg-secondary/5 z-0" />
                <div className="container max-w-4xl mx-auto px-6 relative z-10 text-center">

                    {/* Back Button */}
                    {/* ... (keep existing back button) ... */}
                    <div className="absolute top-0 left-4 md:left-0 z-50">
                        <button
                            onClick={() => router.push("/")}
                            className="bg-secondary/80 hover:bg-secondary backdrop-blur p-2 rounded-full border border-white/10 transition-all text-foreground/80 hover:text-foreground"
                            title="Back to Home"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        </button>
                    </div>

                    <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 group">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-full h-full rounded-full border-4 border-background shadow-xl overflow-hidden relative"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`}
                                alt={user.displayName || "User"}
                                className="w-full h-full object-cover"
                            />

                            {/* Upload Overlay */}
                            <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity z-10">
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    disabled={uploadingPhoto}
                                />
                                {uploadingPhoto ? (
                                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                                ) : (
                                    <span className="text-white text-xs font-bold uppercase tracking-wider">Change</span>
                                )}
                            </label>
                        </motion.div>

                        {/* Camera Icon Badge */}
                        <div className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full shadow-md z-20 pointer-events-none group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
                        </div>
                    </div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl md:text-3xl font-bold mb-1"
                    >
                        {user.displayName || "Anonymous Director"}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="mb-3"
                    >
                        <button
                            onClick={() => setIsEditing(true)}
                            className="text-xs font-bold text-primary hover:underline hover:text-primary/80 transition-colors"
                        >
                            Edit Profile Identity ✏️
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${rank.color} text-white font-bold text-xs md:text-sm shadow-md mb-2`}
                    >
                        {rank.title}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25 }}
                        className="mb-2"
                    >
                        {userProfile?.occupation && (
                            <span className="text-sm font-medium px-3 py-1 bg-secondary rounded-full text-secondary-foreground">
                                {userProfile.occupation}
                            </span>
                        )}
                    </motion.div>


                </div>
            </div>



            {/* Stats Grid */}
            <div className="container max-w-4xl mx-auto px-4 -mt-4 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <StatsCard
                        icon="✨"
                        label="Total XP Earned"
                        value={(progress?.totalXP || 0).toString()}
                        delay={0.4}
                    />
                    <StatsCard
                        icon="✅"
                        label="Days Completed"
                        value={(progress?.completedDays?.length || 0).toString()}
                        delay={0.5}
                    />
                    <StatsCard
                        icon="🎭"
                        label="Persona Type"
                        value={progress?.personaType || "N/A"}
                        delay={0.6}
                    />
                    <StatsCard
                        icon="🔥"
                        label="Current Streak"
                        value={(stats?.currentStreak || 0).toString()}
                        delay={0.7}
                    />
                    <StatsCard
                        icon="🏆"
                        label="Longest Streak"
                        value={(stats?.longestStreak || 0).toString()}
                        delay={0.75}
                    />
                    <StatsCard
                        icon="🎙️"
                        label="Rehearsals Done"
                        value={(stats?.totalPractices || 0).toString()}
                        delay={0.8}
                    />
                </div>

                {/* Day 90 Mastery Badge (Profile Version) */}
                {progress?.completedDays.includes(90) && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="mt-6 w-full p-1 rounded-3xl bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 shadow-[0_0_30px_rgba(234,179,8,0.2)]"
                    >
                        <div className="flex items-center gap-6 px-6 py-6 rounded-[22px] bg-zinc-950/90 backdrop-blur-xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(234,179,8,0.1)_0%,transparent_50%)]" />
                            <motion.div 
                                animate={{ rotateY: 360 }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                className="relative z-10 shrink-0"
                            >
                                <Trophy className="w-12 h-12 text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.6)]" strokeWidth={1.5} />
                            </motion.div>
                            <div className="relative z-10">
                                <h3 className="text-xl font-black text-white italic tracking-tight">Social Master</h3>
                                <p className="text-yellow-500/80 text-xs font-bold uppercase tracking-widest mt-0.5">
                                    90-Day Roadmap Completed
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

            </div>

            <div className="container max-w-4xl mx-auto px-4 mt-12">
                <SuccessPath totalPractices={stats?.totalPractices || 0} />
            </div>

            {/* Edit Profile Modal */}
            {isEditing && user && (
                <EditProfileModal
                    user={user}
                    onClose={() => setIsEditing(false)}
                    // Pass the profile data, fallback to empty object if null
                    initialData={userProfile || {} as UserProfile}
                />
            )}
        </div>
    );
}

function StatsCard({ icon, label, value, delay }: { icon: string, label: string, value: string | number, delay: number }) {
    // Determine font size based on whether it's a long string (like Persona Type)
    const isLongText = typeof value === 'string' && value.length > 5;
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="group relative bg-card rounded-2xl p-5 text-center transition-all duration-300 hover:bg-secondary/30"
        >
            {/* Subtle Gradient Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 flex flex-col h-full items-center justify-center">
                <div className="text-3xl mb-1 filter drop-shadow-sm">{icon}</div>
                <div className={`${isLongText ? 'text-[13px] leading-tight md:text-sm' : 'text-2xl'} font-black text-foreground mb-1 tracking-tight group-hover:scale-105 transition-transform duration-300 min-h-[1.5rem] flex items-center justify-center`}>
                    {value}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 w-full truncate">
                    {label}
                </div>
            </div>
        </motion.div>
    );
}



// eslint-disable-next-line @typescript-eslint/no-explicit-any
function EditProfileModal({ user, onClose, initialData }: { user: any, onClose: () => void, initialData: UserProfile }) {
    const [formData, setFormData] = useState<Partial<UserProfile>>({
        displayName: user.displayName || "",
        occupation: initialData?.occupation || ""
    });
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            // 0. Clean undefined values (Firestore rejects undefined)
            const cleanData = Object.entries(formData).reduce((acc, [key, value]) => {
                if (value !== undefined) {
                    acc[key] = value;
                }
                return acc;
            }, {} as any);

            // 1. Update Firestore Profile
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                ...cleanData,
                displayName: formData.displayName
            });

            // 2. Update Auth Profile (Critical for UI)
            if (user && formData.displayName && formData.displayName !== user.displayName) {
                // Dynamic import to avoid SSR issues if any, or just standard import
                const { updateProfile } = await import("firebase/auth");
                await updateProfile(user, {
                    displayName: formData.displayName
                });
            }

            window.location.reload();
        } catch (e) {
            console.error("Failed to update profile", e);
            alert("Failed to save profile.");
        } finally {
            setSaving(false);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-background w-full max-w-md rounded-3xl p-6 md:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            >
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors">
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-2xl font-black tracking-tight mb-6">Edit Identity</h2>

                <div className="space-y-5">
                    {/* Name */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Display Name</label>
                        <input
                            value={formData.displayName as string}
                            onChange={e => setFormData({ ...formData, displayName: e.target.value })}
                            className="w-full bg-secondary/50 rounded-xl px-4 py-3 font-semibold focus:ring-2 ring-primary/20 outline-none transition-all"
                            placeholder="Your Name"
                        />
                    </div>

                    {/* Job */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Occupation</label>
                        <select
                            value={formData.occupation || ""}
                            onChange={e => setFormData({ ...formData, occupation: e.target.value })}
                            className="w-full bg-secondary/50 rounded-xl px-4 py-3 font-medium focus:ring-2 ring-primary/20 outline-none appearance-none"
                        >
                            <option value="">Select...</option>
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

                <div className="mt-8">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full py-4 rounded-xl bg-foreground text-background font-bold text-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        {saving && <Loader2 className="w-5 h-5 animate-spin" />}
                        {saving ? "Saving..." : "Save Identity"}
                    </button>
                    <button onClick={onClose} className="w-full py-3 mt-2 text-sm font-bold text-muted-foreground hover:text-foreground">
                        Cancel
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
