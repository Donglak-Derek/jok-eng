"use client";

import { Suspense, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import Image from "next/image";

function StoreDashboard() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const storeBooks = [
        {
            id: "book-1",
            title: "Tactical Empathy",
            author: "The Jok-Eng Team",
            description: "A comprehensive guide to reading the room and navigating high-stakes environments without compromising your leverage.",
            coverStyle: "from-emerald-950 to-zinc-950",
            status: "preparing"
        },
        {
            id: "book-2",
            title: "The Anxiety Protocol",
            author: "The Jok-Eng Team",
            description: "Mental frameworks to immediately shut down nervous system spikes during conflict and confrontation.",
            coverStyle: "from-rose-950 to-zinc-950",
            status: "preparing"
        },
        {
            id: "book-3",
            title: "Executive Banter",
            author: "The Jok-Eng Team",
            description: "How to use humor as a competitive advantage to build rapport and disarm aggressive colleagues.",
            coverStyle: "from-indigo-950 to-zinc-950",
            status: "preparing"
        }
    ];

    if (!mounted) return <div className="min-h-screen bg-background" />;

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground pb-20 overflow-x-hidden">
            <Header />

            <main className="flex-1 w-full pt-28 pb-20">
                <div className="max-w-4xl mx-auto px-4 w-full">
                    <div className="text-center mb-16 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-32 bg-primary/5 blur-[80px] rounded-full pointer-events-none -z-10" />
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-primary/10 text-primary border border-primary/20 text-xs font-black uppercase tracking-[0.2em] mb-4">
                                <BookOpen className="w-4 h-4" /> The Armory
                            </span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter italic uppercase mb-4 leading-none"
                        >
                            <span className="text-foreground drop-shadow-sm">Training</span> <br />
                            <span className="text-zinc-500 drop-shadow-sm">Manuals</span>
                        </motion.h1>
                        <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mt-4">Field guides for tactical social engagement.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        {storeBooks.map((book, index) => (
                            <motion.div
                                key={book.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (index * 0.1), duration: 0.4 }}
                                className="group relative flex flex-col items-center"
                            >
                                {/* Book Cover Mockup */}
                                <div className={`relative w-full aspect-[2/3] rounded-r-2xl rounded-l-md shadow-2xl overflow-hidden border border-white/10 bg-gradient-to-br ${book.coverStyle} flex flex-col p-6 mb-6 transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-4`}>
                                    {/* Spine shadow */}
                                    <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-black/60 to-transparent" />
                                    
                                    {/* Cover Content */}
                                    <div className="relative z-10 flex flex-col h-full opacity-80 group-hover:opacity-100 transition-opacity">
                                        <div className="text-[8px] font-black uppercase tracking-[0.3em] text-white/50 mb-auto">Jok-Eng Press</div>
                                        <div className="my-auto">
                                            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white leading-tight mb-2">
                                                {book.title}
                                            </h3>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                                                By {book.author}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Preparing Badge */}
                                    {book.status === 'preparing' && (
                                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20">
                                            <div className="bg-zinc-900 border border-white/10 text-white font-black text-xs uppercase tracking-widest px-4 py-2 rounded-sm shadow-2xl -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                                                Preparing
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Text content */}
                                <div className="text-center w-full px-2">
                                    <h4 className="font-black text-lg text-white mb-2 tracking-tight">{book.title}</h4>
                                    <p className="text-xs text-zinc-500 font-medium leading-relaxed">{book.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default function StorePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <StoreDashboard />
        </Suspense>
    );
}
