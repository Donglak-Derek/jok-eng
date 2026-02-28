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

    const isMyPathActive = pathname === "/" || pathname.startsWith("/category");
    const isLibraryActive = pathname === "/library";

    const headerBg = transparent ? 'bg-gradient-to-b from-black/60 to-transparent border-transparent' : 'bg-white/80 backdrop-blur-md border-b border-border';
    const textColor = transparent ? 'text-white' : 'text-foreground';
    const mutedTextColor = transparent ? 'text-white/80 hover:text-white' : 'text-muted-foreground hover:text-foreground';

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
                        <h1 className={`font-sans font-bold text-xl tracking-tight group-hover:opacity-80 transition-opacity ${textColor}`}>
                            Jok-eng
                        </h1>
                        <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-full ${transparent ? 'bg-white/20 text-white' : 'bg-secondary text-secondary-foreground'}`}>
                            Beta
                        </span>
                    </Link>

                    <nav className="items-center gap-4 md:gap-6 hidden md:flex">
                        <Link
                            href="/"
                            className={`text-sm md:text-base font-bold transition-colors ${isMyPathActive ? 'text-primary' : mutedTextColor
                                }`}
                        >
                            My Path
                        </Link>
                        <Link
                            href="/library"
                            className={`text-sm md:text-base font-bold transition-colors ${isLibraryActive ? 'text-primary' : mutedTextColor
                                }`}
                        >
                            Library
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
                                        <div className="absolute right-0 mt-2 w-56 bg-white border border-border rounded-lg shadow-lg py-1 z-50 overflow-hidden text-black">
                                            <div className="px-4 py-3 border-b border-border bg-secondary/30">
                                                <p className="font-medium text-sm text-foreground truncate">{user.displayName}</p>
                                                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                            </div>
                                            <Link
                                                href="/profile"
                                                className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                My Profile
                                            </Link>
                                            <Link
                                                href="/library"
                                                className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                My Library
                                            </Link>
                                            <Link
                                                href="/shop"
                                                className="block px-4 py-2 text-sm text-primary font-bold hover:bg-secondary transition-colors"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                Premium Store
                                            </Link>
                                            <Link
                                                href="/about"
                                                className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                About & Help
                                            </Link>

                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setDropdownOpen(false);
                                                }}
                                                className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                Logout
                                            </button>
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
