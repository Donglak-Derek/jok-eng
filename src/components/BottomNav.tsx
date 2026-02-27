"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Film, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function BottomNav() {
    const pathname = usePathname();
    const { user } = useAuth();

    // Don't show bottom nav if not logged in
    if (!user) return null;

    const navItems = [
        {
            name: "My Path",
            href: "/",
            icon: Compass,
        },
        {
            name: "Discover",
            href: "/videos",
            icon: Film,
        },
        {
            name: "Profile",
            href: "/profile",
            icon: User,
        }
    ];

    return (
        <div
            className="md:hidden fixed bottom-0 left-0 w-full bg-background/90 backdrop-blur-md border-t border-border z-50 px-6 pt-3"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.75rem)' }}
        >
            <div className="flex justify-between items-center max-w-sm mx-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all select-none ${isActive
                                ? "text-primary scale-110"
                                : "text-muted-foreground hover:text-foreground hover:scale-105"
                                }`}
                        >
                            <Icon className={`w-6 h-6 ${isActive ? 'fill-primary/20' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-bold">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
