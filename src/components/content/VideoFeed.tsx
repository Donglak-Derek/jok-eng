"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PlayCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { getLatestVideoLessons, VideoLesson } from "@/lib/videoLessons";

interface VideoFeedProps {
    limit?: number;
    title?: string;
    subtitle?: string;
}

export default function VideoFeed({
    limit = 3,
    title = "Latest from the Club",
    subtitle = "Quick tips to sound more like a local."
}: VideoFeedProps) {
    const [lessons, setLessons] = useState<VideoLesson[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

    useEffect(() => {
        async function fetchLessons() {
            try {
                const latest = await getLatestVideoLessons(limit);
                setLessons(latest);
            } catch (e: unknown) {
                const err = e as { code?: string; message?: string };
                console.error("🔥 VIDEO FEED ERROR:", err.code, err.message);
                if (err.message?.includes("index")) {
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
            {(title || subtitle) && (
                <div className="flex flex-col gap-4 mb-6">
                    {title && <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>}
                    {subtitle && <p className="text-muted-foreground text-sm md:text-base">{subtitle}</p>}
                </div>
            )}

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
                        <div className="relative aspect-[9/16] rounded-[2rem] overflow-hidden bg-secondary/30 border border-border/50 shadow-sm flex items-center justify-center group/video">
                            {activeVideoId === lesson.id ? (
                                <iframe
                                    src={`https://www.youtube.com/embed/${lesson.youtubeId}?autoplay=1`}
                                    title={lesson.title}
                                    className="absolute inset-0 w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div
                                    className="absolute inset-0 w-full h-full bg-cover bg-center cursor-pointer"
                                    style={{
                                        backgroundImage: lesson.youtubeId ? `url(https://img.youtube.com/vi/${lesson.youtubeId}/hqdefault.jpg)` : 'none'
                                    }}
                                    onClick={() => {
                                        if (lesson.id) setActiveVideoId(lesson.id);
                                    }}
                                >
                                    {lesson.youtubeId && (
                                        <div className="absolute inset-0 bg-black/20 group-hover/video:bg-black/40 transition-colors flex items-center justify-center">
                                            <div className="w-16 h-16 bg-red-600/90 backdrop-blur-sm rounded-full flex flex-col items-center justify-center shadow-2xl transform group-hover/video:scale-110 transition-transform border border-white/20">
                                                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {/* Overlay message if video fails to load or for unavailable IDs */}
                            {!lesson.youtubeId && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10 p-6 text-center">
                                    <p className="text-white text-sm font-bold">Video ID Missing or Unavailable</p>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Link href={`/videos?startAt=${lesson.id}&layer=dictation`} className="group w-full">
                                <button className="w-full py-3.5 rounded-xl bg-primary/10 text-primary font-bold text-sm flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm border border-primary/20">
                                    <PlayCircle className="w-4 h-4" />
                                    Rehearse this Scene
                                </button>
                            </Link>

                            {((lesson as any).generalScenarioId || lesson.script) && (
                                <Link href={`/videos?startAt=${lesson.id}&layer=practice`} className="group w-full">
                                    <button className="w-full py-3.5 rounded-xl bg-neutral-100 text-neutral-700 font-bold text-sm flex items-center justify-center gap-2 hover:bg-neutral-800 hover:text-white transition-all duration-300 shadow-sm border border-neutral-200">
                                        <PlayCircle className="w-4 h-4" />
                                        Try it in Real Life
                                    </button>
                                </Link>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
