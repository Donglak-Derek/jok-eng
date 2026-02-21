"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X, Headphones, Volume2, SkipForward } from "lucide-react";
import { usePodcast } from "@/context/PodcastContext";

export default function StickyPodcastPlayer() {
    const { currentPodcast, isPlaying, togglePlay, closePlayer } = usePodcast();

    if (!currentPodcast) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2rem)] max-w-2xl"
            >
                <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-2xl flex items-center gap-4">
                    {/* Thumbnail / Icon */}
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                        <Headphones className="w-6 h-6 text-primary" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-0.5">Now Listening</p>
                        <h4 className="text-white font-bold text-sm truncate">{currentPodcast.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary"
                                    animate={{ width: isPlaying ? ["0%", "100%"] : "30%" }}
                                    transition={{ duration: 180, ease: "linear" }} // Mock progress
                                />
                            </div>
                            <span className="text-[10px] text-white/40 font-mono tracking-tighter">{currentPodcast.duration}</span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={togglePlay}
                            className="bg-primary text-primary-foreground p-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg"
                        >
                            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                        </button>

                        <button
                            onClick={closePlayer}
                            className="text-white/40 hover:text-white p-2 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
