"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserStats, JOB_CATEGORIES, UserProfile } from "@/types";
import { motion } from "framer-motion";
import MyScenariosSection from "@/components/MyScenariosSection";

// Rank Logic Helpers
const getRank = (scenariosCreated: number) => {
    if (scenariosCreated >= 50) return { title: "Hollywood Legend 🌟", color: "from-yellow-400 to-amber-600" };
    if (scenariosCreated >= 20) return { title: "Award Winning Director 🏆", color: "from-purple-400 to-indigo-600" };
    if (scenariosCreated >= 10) return { title: "Seasoned Professional 🎬", color: "from-blue-400 to-cyan-600" };
    if (scenariosCreated >= 3) return { title: "Rising Star ✨", color: "from-emerald-400 to-green-600" };
    return { title: "Rookie Director 🎥", color: "from-slate-400 to-slate-600" };
};

export default function ProfilePage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState<UserStats | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            router.push("/login");
            return;
        }

        const fetchData = async () => {
            try {
                // Fetch Stats
                const statsRef = doc(db, "users", user.uid);
                const statsSnap = await getDoc(statsRef);
                
                if (statsSnap.exists()) {
                    setStats(statsSnap.data() as UserStats);
                    // Also try to get profile data if it's merged or separate? 
                    // Current schema seems to mix them or use same doc?
                    // Let's assume same doc for now based on previous code.
                    setUserProfile(statsSnap.data() as unknown as UserProfile);
                } else {
                    setStats({
                        userId: user.uid,
                        totalScenariosCreated: 0,
                        totalPractices: 0,
                        totalLikesReceived: 0,
                        currentStreak: 0,
                        longestStreak: 0
                    });
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, authLoading, router]);

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!user) return null;

    const rank = getRank(stats?.totalScenariosCreated || 0);
    const joinDate = user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) : "Unknown";

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
             {/* Profile Hero Section */}
             <div className="relative pt-6 pb-8 overflow-hidden">
                <div className="absolute inset-0 bg-secondary/5 z-0" />
                <div className="container max-w-4xl mx-auto px-6 relative z-10 text-center">
                    
                     <div className="absolute top-4 right-4 z-50">
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="bg-secondary/80 hover:bg-secondary backdrop-blur text-xs font-bold px-4 py-2 rounded-full border border-white/10 transition-all text-foreground/80 hover:text-foreground"
                        >
                            Review Profile ✏️
                        </button>
                     </div>

                    <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full border-4 border-background shadow-xl overflow-hidden mb-4"
                    >
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`} 
                            alt={user.displayName || "User"}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl md:text-3xl font-bold mb-2"
                    >
                        {user.displayName || "Anonymous Director"}
                    </motion.h1>
                    
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

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-muted-foreground text-xs md:text-sm"
                    >
                        Member since {joinDate}
                    </motion.p>
                </div>
             </div>

             {/* Stats Grid */}
             <div className="container max-w-4xl mx-auto px-4 -mt-4 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <StatsCard 
                        icon="🎬" 
                        label="Scripts Written" 
                        value={stats?.totalScenariosCreated || 0} 
                        delay={0.4}
                    />
                    <StatsCard 
                        icon="❤️" 
                        label="Applause Received" 
                        value={stats?.totalLikesReceived || 0} 
                        delay={0.5}
                    />
                    <StatsCard 
                        icon="🎭" 
                        label="Rehearsals Done" 
                        value={stats?.totalPractices || 0} 
                        delay={0.6}
                    />
                    <StatsCard 
                        icon="🔥" 
                        label="Current Streak" 
                        value={stats?.currentStreak || 0} 
                        delay={0.7}
                    />
                    <StatsCard 
                        icon="🏆" 
                        label="Longest Streak" 
                        value={stats?.longestStreak || 0} 
                        delay={0.8}
                    />
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-12"
                >
                    <div className="bg-card w-full rounded-3xl p-6 md:p-8 border border-border shadow-sm">
                        <MyScenariosSection />
                    </div>
                </motion.div>
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

function StatsCard({ icon, label, value, delay }: { icon: string, label: string, value: number, delay: number }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="bg-card/80 backdrop-blur border border-secondary/20 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
        >
            <div className="text-4xl mb-2">{icon}</div>
            <div className="text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent mb-1">
                {value}
            </div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
                {label}
            </div>
        </motion.div>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function EditProfileModal({ user, onClose, initialData }: { user: any, onClose: () => void, initialData: UserProfile }) {
    const [occupation, setOccupation] = useState(initialData?.occupation || "");
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, "users", user.uid), {
                occupation: occupation,
            }, { merge: true });
            
            window.location.reload(); 
        } catch (e) {
            console.error(e);
            alert("Failed to save.");
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-card w-full max-w-md rounded-3xl border border-border shadow-2xl overflow-hidden"
            >
                <div className="p-6 space-y-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Your Professional Identity 🆔</h2>
                        <p className="text-muted-foreground text-sm mt-1">
                            We use this to show you relevant stories from your peers.
                        </p>
                    </div>
                    
                    <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            What is your field?
                        </label>
                        <div className="relative">
                            <select 
                                className="w-full bg-secondary/50 rounded-xl px-4 py-3 font-medium outline-none focus:ring-2 ring-primary/50 appearance-none text-foreground"
                                value={occupation}
                                onChange={(e) => setOccupation(e.target.value)}
                            >
                                <option value="">Select your role...</option>
                                {Object.entries(JOB_CATEGORIES).map(([group, roles]) => (
                                    <optgroup key={group} label={group}>
                                        {roles.map(role => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                ▼
                            </div>
                        </div>
                         <p className="text-xs text-muted-foreground/60">
                            *This helps Chefs see Chef content, Devs see Dev content, etc.
                        </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button 
                            onClick={onClose}
                            className="flex-1 py-3 font-bold text-muted-foreground hover:bg-secondary rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                         <button 
                            onClick={handleSave}
                            disabled={!occupation || saving}
                            className="flex-1 py-3 font-bold bg-primary text-primary-foreground hover:opacity-90 rounded-xl transition-all disabled:opacity-50"
                        >
                            {saving ? "Saving..." : "Save Identity"}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
