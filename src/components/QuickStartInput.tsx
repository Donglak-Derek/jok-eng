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
                className="flex-1 h-12 md:h-14 bg-secondary/50 hover:bg-secondary/80 border border-transparent hover:border-border/50 rounded-full flex items-center px-4 md:px-6 cursor-pointer transition-all shadow-sm overflow-hidden"
            >
                <div className="flex items-center gap-0.5 min-w-0">
                    <span className="text-muted-foreground text-sm md:text-lg font-medium whitespace-nowrap truncate">
                        What do you want to say?
                    </span>
                    <motion.span 
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-0.5 h-5 bg-primary ml-1 shrink-0"
                    />
                </div>
            </motion.div>
        </div>
    );
}
