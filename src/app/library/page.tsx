"use client";

import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MyScenariosSection from "@/components/MyScenariosSection";
import { Lock } from "lucide-react";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LibraryPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading) return null;

    return (
        <main className="min-h-screen bg-background">
            <Header />

            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                        <div className="max-w-3xl space-y-4">
                            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter">
                                MY <span className="text-primary italic">LIBRARY</span>
                            </h1>
                            <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl">
                                Your personal collection of created and saved scenarios. Rehearse them to build your Streak.
                            </p>
                        </div>
                    </div>

                    {user ? (
                        <MyScenariosSection />
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                            <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center border border-border">
                                <motion.div
                                    animate={{ rotate: [-5, 5, -5] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Lock className="w-10 h-10 text-muted-foreground" />
                                </motion.div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-3xl font-black tracking-tight">Personal Library</h3>
                                <p className="text-muted-foreground max-w-sm mx-auto text-lg leading-relaxed">
                                    Sign in to save scenarios, create custom content, and track your progress across devices.
                                </p>
                            </div>
                            <Button
                                size="lg"
                                onClick={() => router.push("/login")}
                                className="px-10 rounded-full font-bold shadow-lg mt-4 h-14"
                            >
                                Sign In to Unlock
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
