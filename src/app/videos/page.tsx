"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { useEffect, useState, useRef } from "react";
import { getLatestVideoLessons, VideoLesson } from "@/lib/videoLessons";
import { Loader2, PlayCircle, Heart, Share2, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function VideosPage() {
    const [videos, setVideos] = useState<VideoLesson[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const feedRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function fetchVideos() {
            try {
                // Fetch up to 50 latest short-form videos
                const fetched = await getLatestVideoLessons(50);
                setVideos(fetched);
            } catch (err) {
                console.error("Failed to load videos:", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchVideos();
    }, []);

    // Observer to detect which video is currently in the viewport
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const idx = Number(entry.target.getAttribute("data-index"));
                    setActiveVideoIndex(idx);
                }
            });
        }, {
            root: feedRef.current,
            threshold: 0.6 // 60% of the video must be visible to be considered active
        });

        const elements = document.querySelectorAll('.video-container');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [videos]);

    return (
        <div className="fixed inset-0 bg-black text-white flex flex-col z-50">
            {/* Minimal Header Overlay */}
            <div className="absolute top-0 w-full z-10 bg-gradient-to-b from-black/80 to-transparent p-4 flex justify-between items-center pointer-events-none">
                <span className="font-black text-lg text-white">Videos</span>
            </div>
            
            <main 
                ref={feedRef}
                className="flex-1 w-full max-w-md mx-auto overflow-y-scroll snap-y snap-mandatory scrollbar-hide relative"
                style={{ scrollBehavior: 'smooth' }}
            >
                {isLoading ? (
                    <div className="h-full flex flex-col items-center justify-center text-neutral-500 space-y-4">
                        <Loader2 className="w-8 h-8 animate-spin" />
                        <p className="tracking-widest font-bold text-xs uppercase">Loading Feed...</p>
                    </div>
                ) : videos.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-neutral-400 p-8 text-center space-y-4">
                        <PlayCircle className="w-12 h-12 opacity-50" />
                        <p className="font-bold text-xl">No videos yet</p>
                        <p className="text-sm opacity-60">Check back soon for new content!</p>
                    </div>
                ) : (
                    videos.map((video, index) => (
                        <div 
                            key={video.id} 
                            data-index={index}
                            className="video-container snap-center snap-always relative w-full h-full bg-neutral-900 border-b border-neutral-800"
                        >
                            {/* Short-form vertical player. We autoplay only the active video. */}
                            {activeVideoIndex === index ? (
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&loop=1&playlist=${video.youtubeId}&controls=0&modestbranding=1&rel=0&showinfo=0`}
                                    title={video.title}
                                    className="absolute inset-0 w-full h-full object-cover pointer-events-auto"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div 
                                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                                    style={{ backgroundImage: `url(https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg)` }}
                                >
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <PlayCircle className="w-16 h-16 text-white/50" />
                                    </div>
                                </div>
                            )}

                            {/* Overlay UI (TikTok style safe area) - Added pb-20 so it sits above the BottomNav */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 pb-24 pt-32 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none flex justify-between items-end">
                                
                                <div className="flex-1 max-w-[80%] space-y-2 pointer-events-auto">
                                    <h2 className="text-lg font-bold text-white leading-tight drop-shadow-md">
                                        {video.title}
                                    </h2>
                                    {video.description && (
                                        <p className="text-sm text-neutral-200 line-clamp-2 drop-shadow-md overflow-hidden text-ellipsis whitespace-nowrap">
                                            {video.description}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col items-center gap-4 pb-2 pointer-events-auto">
                                    <button className="flex flex-col items-center gap-1 hover:scale-110 transition-transform">
                                        <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                                            <Heart className="w-5 h-5 text-white fill-white/20" />
                                        </div>
                                    </button>
                                    <button className="flex flex-col items-center gap-1 hover:scale-110 transition-transform">
                                        <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                                            <MessageCircle className="w-5 h-5 text-white" />
                                        </div>
                                    </button>
                                    <button className="flex flex-col items-center gap-1 hover:scale-110 transition-transform">
                                        <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                                            <Share2 className="w-5 h-5 text-white" />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </main>
            
            {/* Inject Global NavBar here so it overlays cleanly */}
            <div className="absolute bottom-0 w-full z-50">
                <BottomNav />
            </div>
        </div>
    );
}
