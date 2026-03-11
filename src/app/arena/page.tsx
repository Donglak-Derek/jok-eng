"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrainingPacks from "@/components/practice/TrainingPacks";
import { Dumbbell } from "lucide-react";

export default function PracticeArenaPage() {
    return (
        <main className="min-h-screen bg-background pb-20 overflow-x-hidden">
            <Header />

            <section className="pt-32 pb-16 px-6">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
                        <div className="max-w-3xl space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-2">
                                <Dumbbell className="w-4 h-4" />
                                Welcome to the Dojo
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">
                                Practice <span className="text-primary italic">Arena</span>
                            </h1>
                            <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl bg-muted/50 p-4 rounded-xl border border-border/50">
                                Build your social muscles. Earn XP for your 90-day journey.
                            </p>
                        </div>
                    </div>

                    <TrainingPacks />
                </div>
            </section>

            <Footer />
        </main>
    );
}
