"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User } from "lucide-react";

export default function QuickStartInput() {
    const { user } = useAuth();
    const router = useRouter();

    const handleStart = () => {
        router.push("/create-scenario");
    };

    return (
        <div className="flex items-center gap-3 w-full">
            {/* Avatar - Left aligned */}
            <div className="shrink-0 pl-1">
                {user?.photoURL ? (
                    <img 
                        src={user.photoURL} 
                        alt={user.displayName || "User"} 
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-border shadow-sm"
                    />
                ) : (
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
                        <User className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                )}
            </div>

            {/* Fake Input - Full width remaining */}
            <motion.div 
                onClick={handleStart}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="relative flex-1 h-12 md:h-14 rounded-full flex items-center justify-center cursor-pointer transition-all shadow-sm group overflow-hidden"
            >
                {/* Animated Rainbow Border Background - Faster & Stronger */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 via-yellow-500 via-green-500 via-blue-500 via-purple-500 to-pink-500 bg-[length:200%_auto] animate-[gradient_1.5s_linear_infinite] opacity-80 group-hover:opacity-100 transition-opacity" />
                
                {/* Inner Content Background */}
                <div className="absolute inset-[3px] bg-background rounded-full z-10 flex items-center px-4 md:px-6">
                    <div className="flex items-center gap-0.5 justify-start w-full">
                        <span className="text-muted-foreground text-sm md:text-lg font-medium whitespace-nowrap">
                            Create a real scenario...
                        </span>
                        <motion.span 
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            className="w-0.5 h-5 bg-primary shrink-0"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
