"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-3 md:py-4 bg-white/95 backdrop-blur-sm flex items-center justify-between border-b-2 border-black/5 shadow-sm">
      <div className="flex items-center gap-3">
        <Link href="/">
            <h1 className="font-sans font-black text-2xl md:text-4xl tracking-tight text-black flex items-center gap-2">
                Jok-eng
                <div className="hidden md:inline-block md:text-sm font-hand text-gray-500 font-normal px-2 py-0.5 border border-black/20 rounded-sm -rotate-2">
                    beta
                </div>
            </h1>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
            <div className="relative">
                <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-3 focus:outline-none group"
                >
                    <span className="text-sm font-bold text-black border-b-2 border-transparent group-hover:border-primary transition-colors">
                        Hi, {user.displayName?.split(' ')[0] || "User"}!
                    </span>
                    {user.photoURL ? (
                        <Image 
                            src={user.photoURL} 
                            alt={user.displayName || "User"} 
                            width={36} 
                            height={36} 
                            className="rounded-full border-2 border-black group-hover:scale-110 transition-transform"
                        />
                    ) : (
                        <div className="w-9 h-9 rounded-full bg-primary border-2 border-black flex items-center justify-center text-black font-bold group-hover:scale-110 transition-transform">
                            {user.displayName?.charAt(0) || "U"}
                        </div>
                    )}
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-black rounded-lg hard-shadow py-2 z-50">
                        <div className="px-4 py-2 border-b-2 border-black/5 mb-2 border-dashed">
                            <p className="font-bold text-black truncate">{user.displayName}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        <Link 
                            href="/profile" 
                            className="block px-4 py-2 text-sm text-black font-bold hover:bg-yellow-100 transition-colors"
                            onClick={() => setDropdownOpen(false)}
                        >
                            My Profile
                        </Link>
                        <Link 
                            href="/my-scenarios" 
                            className="block px-4 py-2 text-sm text-black font-bold hover:bg-yellow-100 transition-colors"
                            onClick={() => setDropdownOpen(false)}
                        >
                            My Scenarios
                        </Link>
                        <button
                            onClick={() => {
                                logout();
                                setDropdownOpen(false);
                            }}
                            className="w-full text-left block px-4 py-2 text-sm text-red-500 font-bold hover:bg-red-50 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        ) : (
            <Link 
                href="/login"
                className="px-5 py-2 rounded-full border-2 border-black bg-white text-black text-sm font-black hover:bg-black hover:text-white transition-all hard-shadow hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
            >
                Login
            </Link>
        )}
      </div>
    </header>
  );
}
