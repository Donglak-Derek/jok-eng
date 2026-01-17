"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import Image from "next/image";

export default function QuickStartInput() {
    const { user } = useAuth();
    const router = useRouter();

    const handleStart = () => {
        router.push("/create-scenario");
    };

    return (
        <div className="flex items-center gap-3 w-full">
            {/* Avatar - Left aligned (Hidden on mobile for cleaner search bar look, or keep? Let's keep for personalization but maybe larger) */}
            <div className="shrink-0 pl-1">
                {user?.photoURL ? (
                    <Image 
                        src={user.photoURL} 
                        alt={user.displayName || "User"} 
                        width={56}
                        height={56}
                        unoptimized
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-background shadow-md ring-2 ring-border/50"
                    />
                ) : (
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center border-2 border-background shadow-md ring-2 ring-primary/20 text-primary">
                        <User className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                )}
            </div>

            {/* Fake Input - "Hero" Rainbow Style (Restored) */}
            <motion.div 
                onClick={handleStart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative flex-1 h-14 md:h-20 rounded-full flex items-center justify-center cursor-pointer transition-all shadow-lg hover:shadow-xl group overflow-hidden"
            >
                {/* Animated Rainbow Border Background - Faster & Stronger */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 via-yellow-500 via-green-500 via-blue-500 via-purple-500 to-pink-500 bg-[length:200%_auto] animate-[gradient_2s_linear_infinite] opacity-90 group-hover:opacity-100 transition-opacity" />
                
                {/* Inner Content Background */}
                <div className="absolute inset-[3px] bg-background rounded-full z-10 flex items-center pl-4 md:pl-6 pr-2 md:pr-3 shadow-inner">
                    <div className="flex items-center gap-0.5 justify-start flex-1 min-w-0">
                        <span className="text-muted-foreground/80 text-base md:text-xl font-medium whitespace-nowrap truncate">
                            Roleplay Anything...
                        </span>
                        <motion.span 
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            className="w-0.5 h-5 md:h-6 bg-primary shrink-0 ml-0.5"
                        />
                    </div>
                    
                    {/* Action Button */}
                    <div className="w-9 h-9 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-md group-hover:scale-105 transition-transform">
                        <span className="text-lg md:text-xl">✨</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
