"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-3 md:py-4 backdrop-blur bg-background/70 flex items-center justify-between border-b border-secondary/30 shadow-[0_10px_40px_rgba(34,19,74,0.7)]">
      <div className="flex items-center gap-3">
        <Link href="/">
            <h1 className="headline text-2xl md:text-3xl lg:text-4xl tracking-[0.06em] bg-gradient-to-r from-tertiary via-secondary to-primary text-transparent bg-clip-text drop-shadow-[0_0_22px_rgba(168,85,247,0.4)]">
                Jok-eng
            </h1>
        </Link>
        <span className="hidden md:inline-block text-[11px] md:text-xs px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-muted shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            by 9NyangHea
        </span>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
            <div className="relative">
                <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 focus:outline-none"
                >
                    {user.photoURL ? (
                        <Image 
                            src={user.photoURL} 
                            alt={user.displayName || "User"} 
                            width={32} 
                            height={32} 
                            className="rounded-full border border-primary/50 shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold border border-primary/50">
                            {user.displayName?.charAt(0) || "U"}
                        </div>
                    )}
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-card border border-secondary/30 rounded-xl shadow-2xl py-2 z-20 backdrop-blur-xl">
                        <div className="px-4 py-2 border-b border-secondary/20 mb-2">
                            <p className="text-sm font-bold text-foreground truncate">{user.displayName}</p>
                            <p className="text-xs text-muted truncate">{user.email}</p>
                        </div>
                        <Link 
                            href="/my-scenarios" 
                            className="block px-4 py-2 text-sm text-foreground hover:bg-secondary/10 transition-colors"
                            onClick={() => setDropdownOpen(false)}
                        >
                            My Scenarios
                        </Link>
                        <button
                            onClick={() => {
                                logout();
                                setDropdownOpen(false);
                            }}
                            className="w-full text-left block px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        ) : (
            <Link 
                href="/login"
                className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-bold hover:bg-primary/20 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)]"
            >
                Login
            </Link>
        )}
      </div>
    </header>
  );
}
