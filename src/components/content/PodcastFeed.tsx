"use client";

import { motion } from "framer-motion";
import { Play, Headphones, Clock, Share2 } from "lucide-react";
import { usePodcast } from "@/context/PodcastContext";

const PODCASTS = [
    {
        id: "p1",
        title: "The Art of the 'Diagnostic Greeting'",
        description: "Why 'How are you?' is a social trap and how to break the autopilot response with high-impact openers.",
        duration: "12:45",
        date: "Feb 18, 2026",
        audioUrl: "#", // Placeholder
        category: "Social Calibration",
        tags: ["Greeting", "First Impression"]
    },
    {
        id: "p2",
        title: "Navigating the Texas 'Howdy'",
        description: "Deep dive into Southern hospitality. Is it a question or a statement? Decoding the subtle cues of small talk.",
        duration: "15:20",
        date: "Feb 15, 2026",
        audioUrl: "#", // Placeholder
        category: "Cultural Nuance",
        tags: ["Small Talk", "USA"]
    },
    {
        id: "p3",
        title: "IKEA Return Desk: A Survival Guide",
        description: "The vocabulary of frustration. How to stay polite but firm when the FLURG shelf is missing a critical screw.",
        duration: "10:10",
        date: "Feb 12, 2026",
        audioUrl: "#", // Placeholder
        category: "Survival English",
        tags: ["Customer Service", "Conflict"]
    }
];

export default function PodcastFeed() {
    const { currentPodcast, isPlaying, playPodcast } = usePodcast();

    return (
        <section className="w-full">
            <div className="flex flex-col gap-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Audio Deep Dives</h2>
                <p className="text-muted-foreground text-sm md:text-base">NotebookLM extracted wisdom from Derek&apos;s daily lessons.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {PODCASTS.map((podcast, index) => (
                    <motion.div
                        key={podcast.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group flex flex-col md:flex-row items-center gap-6 p-6 bg-card border border-border/50 rounded-[2.5rem] hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                    >
                        {/* Play Button / Thumbnail Placeholder */}
                        <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-3xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Headphones className="w-10 h-10 text-primary opacity-40" />
                            <button
                                onClick={() => playPodcast(podcast)}
                                className="absolute inset-0 flex items-center justify-center bg-primary text-primary-foreground rounded-full w-12 h-12 m-auto opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shadow-xl"
                            >
                                {currentPodcast?.id === podcast.id && isPlaying ? <div className="flex gap-1 items-end h-4"><div className="w-1 bg-white animate-[bounce_0.6s_ease-in-out_infinite] h-2"></div><div className="w-1 bg-white animate-[bounce_0.6s_ease-in-out_infinite_0.2s] h-4"></div><div className="w-1 bg-white animate-[bounce_0.6s_ease-in-out_infinite_0.4s] h-3"></div></div> : <Play className="w-6 h-6 fill-current" />}
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-3 text-center md:text-left">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold uppercase tracking-widest">
                                    {podcast.category}
                                </span>
                                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                                    <Clock className="w-3.5 h-3.5" />
                                    {podcast.duration}
                                </div>
                                <div className="text-muted-foreground text-xs">
                                    {podcast.date}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                                {podcast.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                                {podcast.description}
                            </p>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
                                {podcast.tags.map(tag => (
                                    <span key={tag} className="text-[10px] font-medium text-muted-foreground/60">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex md:flex-col gap-3 shrink-0">
                            <button className="p-3 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground border border-border/50">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
