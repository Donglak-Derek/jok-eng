"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PlayCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { getLatestVideoLessons, VideoLesson } from "@/lib/videoLessons";

export default function VideoFeed() {
    const [lessons, setLessons] = useState<VideoLesson[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchLessons() {
            try {
                const latest = await getLatestVideoLessons(3);
                setLessons(latest);
            } catch (e: any) {
                console.error("🔥 VIDEO FEED ERROR:", e.code, e.message);
                if (e.message?.includes("index")) {
                    console.log("👉 Suggestion: Create a Firestore index for 'video_lessons' with 'createdAt' (DESC).");
                }
            } finally {
                setIsLoading(false);
            }
        }
        fetchLessons();
    }, []);

    if (isLoading) {
        return (
            <div className="w-full py-20 flex flex-col items-center justify-center gap-4 opacity-50">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p className="font-bold text-xs uppercase tracking-widest text-neutral-500">Loading Lessons...</p>
            </div>
        );
    }

    if (lessons.length === 0) return null;

    return (
        <section className="w-full">
            <div className="flex flex-col gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Latest from the Club</h2>
                <p className="text-muted-foreground text-sm md:text-base">Quick tips to sound more like a local.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {lessons.map((lesson, index) => (
                    <motion.div
                        key={lesson.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col gap-4"
                    >
                        <div className="relative aspect-[9/16] rounded-[2rem] overflow-hidden bg-secondary/30 border border-border/50 shadow-sm">
                            <iframe
                                src={`https://www.youtube.com/embed/${lesson.youtubeId}`}
                                title={lesson.title}
                                className="absolute inset-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        <Link href={`/script/${lesson.script.id}`} className="group">
                            <button className="w-full py-4 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm border border-primary/20">
                                <PlayCircle className="w-5 h-5" />
                                Rehearse these phrases
                            </button>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
