"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import { Video, FileText, MessageSquareQuote, Users, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardOverview() {
    const [stats, setStats] = useState({
        videos: 0,
        blogs: 0,
        scenarios: 0,
        users: 0 // Placeholder for future
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const [vidSnap, blogSnap, scenSnap] = await Promise.all([
                    getDocs(collection(db, "video_lessons")),
                    getDocs(collection(db, "blogs")),
                    getDocs(collection(db, "users", "jok-eng-official", "scenarios"))
                ]);

                setStats({
                    videos: vidSnap.size,
                    blogs: blogSnap.size,
                    scenarios: scenSnap.size,
                    users: 0
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchStats();
    }, []);

    const statCards = [
        { label: "Video Vault", value: stats.videos, icon: <Video className="w-6 h-6" />, color: "text-blue-500", bg: "bg-blue-500/10", href: "/admin/videos" },
        { label: "Blogs Published", value: stats.blogs, icon: <FileText className="w-6 h-6" />, color: "text-emerald-500", bg: "bg-emerald-500/10", href: "/admin/blogs" },
        { label: "Official Scenarios", value: stats.scenarios, icon: <MessageSquareQuote className="w-6 h-6" />, color: "text-purple-500", bg: "bg-purple-500/10", href: "/admin/scenarios" },
        { label: "Total Users", value: "—", icon: <Users className="w-6 h-6" />, color: "text-orange-500", bg: "bg-orange-500/10", href: "#" },
    ];

    if (isLoading) {
        return <div className="p-8 text-neutral-500 font-bold uppercase tracking-widest animate-pulse">Loading Matrix...</div>;
    }

    return (
        <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12">
            <div>
                <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-2">SYSTEM <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">OVERVIEW</span></h1>
                <p className="text-neutral-500 font-bold uppercase tracking-widest text-sm">Real-time production metrics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 relative group hover:border-neutral-700 transition-colors"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <Link href={stat.href} className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-primary transition-all">
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                        </div>
                        <div className="space-y-1">
                            <div className="text-4xl font-black tracking-tighter">{stat.value}</div>
                            <div className="text-xs uppercase tracking-widest font-bold text-neutral-500">{stat.label}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
                <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <Link href="/admin/generator" className="px-6 py-3 rounded-xl bg-white text-black font-black uppercase text-sm tracking-wider hover:scale-105 transition-transform">
                        Launch AI Generator
                    </Link>
                    <Link href="/admin/blogs" className="px-6 py-3 rounded-xl bg-neutral-800 text-white font-bold uppercase text-sm tracking-wider hover:bg-neutral-700 transition-colors">
                        Write New Blog
                    </Link>
                </div>
            </div>
        </div>
    );
}
