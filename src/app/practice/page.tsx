"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";

function PracticeContent() {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
            <Header transparent={false} />

            <main className="flex-1 w-full pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-24 h-24 bg-primary/10 rounded-[32px] flex items-center justify-center mb-6 ring-1 ring-primary/20"
                >
                    <Newspaper className="w-12 h-12 text-primary" />
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-black italic tracking-tighter mb-4"
                >
                    Amly Media
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-muted-foreground font-medium max-w-sm mb-12"
                >
                    Blogs, podcasts, and deep-dive strategies are coming soon.
                </motion.p>
            </main>

            <Footer />
        </div>
    );
}

export default function PracticePage() {
    return (
        <Suspense fallback={null}>
            <PracticeContent />
        </Suspense>
    );
}
