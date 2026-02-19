"use client";

import { motion } from "framer-motion";
import { Sparkles, Info, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GuestWelcome() {
    const router = useRouter();

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-gradient-to-r from-primary/10 via-background to-secondary/10 border border-primary/20 rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-500"
        >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

            <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-primary animate-pulse" />
                </div>

                <div className="flex-1 text-center md:text-left space-y-2">
                    <h2 className="text-xl md:text-2xl font-black tracking-tight flex items-center justify-center md:justify-start gap-2">
                        Welcome to Jok-eng <span className="text-primary">Beta</span>
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base max-w-xl font-medium">
                        You&apos;re in guest mode. Explore scenarios and try a vibe check!
                        <span className="hidden md:inline"> To save your progress and unlock daily challenges, create a free account.</span>
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={() => router.push("/login")}
                        className="w-full md:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap"
                    >
                        Sign Up Free
                        <ArrowRight className="w-4 h-4" />
                    </button>
                    <Link
                        href="/about"
                        className="w-full md:w-auto px-6 py-3 border border-border bg-white/50 backdrop-blur-sm rounded-full text-sm font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors whitespace-nowrap"
                    >
                        <Info className="w-4 h-4" />
                        Learn More
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
