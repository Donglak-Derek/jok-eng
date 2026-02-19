"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Home, Library, PlusCircle, LogOut, User } from "lucide-react";
import StreakDisplay from "./StreakDisplay";
import DailyCreditCounter from "./subscription/DailyCreditCounter";
// import { usePathname } from "next/navigation";

type Tab = "home" | "my_scenarios";

type Props = {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
};

export default function DesktopNavigation({ activeTab, onTabChange }: Props) {
    const { user, logout } = useAuth();
    // const pathname = usePathname();

    return (
        <aside className="hidden md:flex w-64 bg-black flex-col h-screen fixed left-0 top-0 z-50 text-neutral-400 p-6">
            {/* Logo Area */}
            <div className="mb-8 px-2">
                <Link href="/" className="inline-block">
                    <span className="text-2xl font-black tracking-tighter text-white">
                        JOK<span className="text-primary">-ENG</span>
                    </span>
                </Link>
            </div>

            {/* Main Nav */}
            <nav className="space-y-2 flex-1">
                <button
                    onClick={() => onTabChange("home")}
                    className={`
                        w-full flex items-center gap-4 px-4 py-3 rounded-md transition-all font-bold text-sm
                        ${activeTab === "home" ? "bg-white/10 text-white" : "hover:text-white hover:bg-white/5"}
                    `}
                >
                    <Home className="w-6 h-6" />
                    Home
                </button>

                <button
                    onClick={() => onTabChange("my_scenarios")}
                    className={`
                        w-full flex items-center gap-4 px-4 py-3 rounded-md transition-all font-bold text-sm
                        ${activeTab === "my_scenarios" ? "bg-white/10 text-white" : "hover:text-white hover:bg-white/5"}
                    `}
                >
                    <Library className="w-6 h-6" />
                    My Library
                </button>

                <Link
                    href="/create-scenario"
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-md transition-all font-bold text-sm hover:text-white hover:bg-white/5"
                >
                    <PlusCircle className="w-6 h-6" />
                    Create Script
                </Link>

                <div className="pt-4 mt-4 border-t border-white/10">
                    <span className="px-4 text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2 block">Alpha Feature</span>
                    <Link
                        href="/create-scenario?mode=ai"
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-md transition-all font-bold text-sm text-primary hover:bg-primary/10"
                    >
                        <div className="w-6 h-6 rounded flex items-center justify-center bg-primary/20">
                            ✨
                        </div>
                        Script Refiner
                    </Link>
                </div>
            </nav>

            {/* Sidebar Stats */}
            <div className="px-4 pb-4">
                <div className="flex items-center gap-2">
                    <DailyCreditCounter className="bg-white/5 border-white/10 text-white hover:bg-white/10" />
                    <StreakDisplay className="bg-white/5 border-white/10 text-white" />
                </div>
            </div>

            {/* User Footer */}
            <div className="mt-auto border-t border-white/10 pt-6 space-y-4">
                <div className="flex items-center gap-3 px-2">
                    {user?.photoURL ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={user.photoURL} alt="Me" className="w-8 h-8 rounded-full bg-neutral-800" />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center">
                            <User className="w-4 h-4" />
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{user?.displayName || "User"}</p>
                        <Link href="/profile" className="text-xs hover:underline text-neutral-500">View Profile</Link>
                    </div>
                </div>

                <button
                    onClick={() => logout()}
                    className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold hover:text-white transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
