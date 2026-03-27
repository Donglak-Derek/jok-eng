"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import StreakDisplay from "./StreakDisplay";
import { ADMIN_UID } from "@/lib/constants";

interface HeaderProps {
    transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const pathname = usePathname();

    const isHomeActive = pathname === "/";
    const isVideosActive = pathname.startsWith("/videos");
    const isPracticeActive = pathname.startsWith("/practice");
    const isProfileActive = pathname.startsWith("/profile");

    const headerBg = transparent 
        ? 'bg-gradient-to-b from-black/80 to-transparent border-transparent' 
        : 'bg-zinc-950/90 backdrop-blur-md border-b border-white/5';
    
    const textColor = 'text-white';
    const mutedTextColor = 'text-zinc-500 hover:text-white';

    return (
        <header className={`fixed top-0 z-50 w-full px-4 md:px-0 py-3 transition-colors duration-300 ${headerBg}`}>
            <div className="max-w-2xl mx-auto w-full flex items-center justify-between px-4 md:px-6 xl:px-0">
                <div className="flex-1 flex justify-start items-center gap-4 md:gap-8">
                    <Link href="/" className="group flex items-center gap-0">
                        <div className="relative w-8 h-8 md:w-9 md:h-9">
                            <Image
                                src="/logo-v2.png"
                                alt="Jok-Eng Logo"
                                fill
                                sizes="(max-width: 768px) 32px, 36px"
                                className={`object-contain drop-shadow-sm transition-transform group-hover:scale-105 duration-300 ${transparent ? 'invert brightness-0' : ''}`}
                                priority
                            />
                        </div>
                        <h1 className="font-sans font-black italic text-xl tracking-tight group-hover:opacity-80 transition-opacity text-white">
                            Amly
                        </h1>
                        <span className="ml-2 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.2em] font-black rounded-sm bg-primary/10 text-primary border border-primary/20">
                            Beta
                        </span>
                    </Link>

                    <nav className="items-center gap-4 md:gap-7 hidden md:flex">
                        <Link
                            href="/"
                            className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:tracking-[0.25em] ${isHomeActive ? 'text-primary' : mutedTextColor}`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/videos"
                            className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:tracking-[0.25em] ${isVideosActive ? 'text-primary' : mutedTextColor}`}
                        >
                            Videos
                        </Link>
                        <Link
                            href="/practice"
                            className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:tracking-[0.25em] ${isPracticeActive ? 'text-primary' : mutedTextColor}`}
                        >
                            Practice
                        </Link>
                        <Link
                            href="/profile"
                            className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:tracking-[0.25em] ${isProfileActive ? 'text-primary' : mutedTextColor}`}
                        >
                            Profile
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    {user ? (
                        <>
                            {/* Streak Icon */}
                            <StreakDisplay />

                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 md:gap-3 focus:outline-none group"
                                >
                                    <span className="hidden md:block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                        {user.displayName?.split(' ')[0] || "User"}
                                    </span>
                                    {user.photoURL ? (
                                        <Image
                                            src={user.photoURL}
                                            alt={user.displayName || "User"}
                                            width={32}
                                            height={32}
                                            className="rounded-full ring-2 ring-transparent group-hover:ring-border transition-all"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-xs font-bold group-hover:ring-2 group-hover:ring-border transition-all">
                                            {user.displayName?.charAt(0) || "U"}
                                        </div>
                                    )}
                                </button>

                                {dropdownOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setDropdownOpen(false)} />
                                        <div className="absolute right-0 mt-3 w-60 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl py-2 z-50 overflow-hidden ring-1 ring-black/50">
                                            <div className="px-4 py-3 border-b border-white/5 bg-white/5 mb-1">
                                                <p className="font-bold text-sm text-white truncate lowercase tracking-tight">{user.displayName}</p>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Active Operator</p>
                                                </div>
                                            </div>
                                            
                                            <div className="px-1.5 py-1 space-y-0.5">
                                                <Link
                                                    href="/profile"
                                                    className="flex items-center gap-3 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-all group/item"
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    <span className="w-1 h-1 rounded-full bg-zinc-700 group-hover/item:bg-primary transition-colors" />
                                                    Personal Profile
                                                </Link>
                                                <Link
                                                    href="/practice"
                                                    className="flex items-center gap-3 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-all group/item"
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    <span className="w-1 h-1 rounded-full bg-zinc-700 group-hover/item:bg-primary transition-colors" />
                                                    Practice & Arena
                                                </Link>
                                                <Link
                                                    href="/"
                                                    className="flex items-center gap-3 px-3 py-2 text-[11px] font-black uppercase tracking-wider text-primary hover:bg-primary/5 rounded-lg transition-all group/item"
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    <span className="w-1 h-1 rounded-full bg-primary" />
                                                    90-Day Roadmap
                                                </Link>
                                            </div>

                                            <div className="mt-2 pt-2 border-t border-white/5 px-1.5 pb-1">
                                                <button
                                                    onClick={() => {
                                                        logout();
                                                        setDropdownOpen(false);
                                                    }}
                                                    className="w-full flex items-center gap-3 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                                                >
                                                    Terminate Session
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className={`px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity ${transparent ? 'bg-white text-black' : 'bg-primary text-primary-foreground'}`}
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
