"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import {
    LayoutDashboard,
    Video,
    FileText,
    MessageSquareQuote,
    LogOut,
    Sparkles,
    ShieldAlert,
    Layers
} from "lucide-react";
import { motion } from "framer-motion";
import { ADMIN_UID } from "@/lib/constants";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.replace("/login");
            } else if (user.uid !== ADMIN_UID) {
                // Not the admin? Send them to the public home
                router.replace("/");
            } else {
                setIsAuthorized(true);
            }
        }
    }, [user, loading, router]);

    if (loading || !isAuthorized) {
        return (
            <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center gap-4">
                <ShieldAlert className="w-12 h-12 text-primary animate-pulse" />
                <h2 className="text-xl font-black tracking-widest uppercase text-neutral-500">Verifying Clearance...</h2>
            </div>
        );
    }

    const navItems = [
        { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
        { label: "Categories", href: "/admin/categories", icon: <Layers className="w-5 h-5" /> },
        { label: "Video Vault", href: "/admin/videos", icon: <Video className="w-5 h-5" /> },
        { label: "AI Generator", href: "/admin/generator", icon: <Sparkles className="w-5 h-5" /> },
        { label: "Blogs", href: "/admin/blogs", icon: <FileText className="w-5 h-5" /> },
        { label: "Scenarios", href: "/admin/scenarios", icon: <MessageSquareQuote className="w-5 h-5" /> },
    ];

    return (
        <div className="min-h-screen bg-neutral-950 text-white flex flex-col md:flex-row font-sans selection:bg-primary selection:text-white">

            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 bg-neutral-900 border-b md:border-b-0 md:border-r border-neutral-800 flex flex-col shrink-0">
                <div className="p-6 md:p-8">
                    <Link href="/admin" className="flex flex-col gap-1 inline-block">
                        <span className="text-2xl font-black italic tracking-tighter">THE <span className="text-primary">CMS</span></span>
                        <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Admin Level 9</span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 md:px-6 py-2 md:py-8 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap md:whitespace-normal font-bold text-sm uppercase tracking-wider
                                    ${isActive
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                                        : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                                    }
                                `}
                            >
                                {item.icon}
                                {item.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute left-0 w-1 h-full bg-primary hidden md:block rounded-r-full"
                                        style={{ top: 0 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 md:p-6 mt-auto">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-500 hover:text-white hover:bg-neutral-800 transition-all font-bold text-sm uppercase tracking-wider"
                    >
                        <LogOut className="w-5 h-5" />
                        Exit Matrix
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-x-hidden relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
                {children}
            </main>

        </div>
    );
}
