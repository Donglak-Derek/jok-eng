"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserStats } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";
import MyScenariosSection from "@/components/MyScenariosSection";
import Header from "@/components/Header";

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            router.push("/login");
            return;
        }

        const fetchStats = async () => {
            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    setStats(docSnap.data() as UserStats);
                } else {
                    // Initialize empty stats if none exist
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
                console.error("Error fetching stats:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
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

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-muted text-xs md:text-sm"
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
            <div className="text-xs uppercase tracking-wider text-muted font-bold">
                {label}
            </div>
        </motion.div>
    );
}
