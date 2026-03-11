"use client";

import { useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { motion } from "framer-motion";

interface VideoCardProps {
    videoUrl: string;
    onEnd: () => void;
}

export default function VideoCard({ videoUrl, onEnd }: VideoCardProps) {
    const [isReady, setIsReady] = useState(false);

    // Extract the YouTube Video ID from the URL
    const getYouTubeID = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYouTubeID(videoUrl);

    if (!videoId) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-neutral-900 border border-red-500/20 rounded-3xl">
                <span className="text-red-500 font-bold mb-2">Invalid Video URL</span>
                <span className="text-neutral-500 text-sm">Please check the YouTube link format.</span>
            </div>
        );
    }

    const opts: YouTubeProps['opts'] = {
        height: '100%',
        width: '100%',
        playerVars: {
            // Auto-play the video when the card loads
            autoplay: 1,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
        },
    };

    return (
        <div className="flex flex-col space-y-6">
            <div className="text-center">
                <h2 className="text-sm font-black uppercase tracking-widest text-primary mb-2">Director's Cut</h2>
                <h1 className="text-2xl font-black italic tracking-tighter">Watch the Scene</h1>
                <p className="text-neutral-400 text-sm mt-2">Watch the full interaction before we break it down.</p>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
                {!isReady && (
                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 z-10">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                <YouTube
                    videoId={videoId}
                    opts={opts}
                    onReady={() => setIsReady(true)}
                    onEnd={onEnd}
                    className="w-full h-full"
                    iframeClassName="w-full h-full"
                />
            </motion.div>

            <div className="text-center mt-4">
                <p className="text-xs uppercase tracking-widest font-bold text-neutral-500">
                    The Next button will unlock when the video finishes.
                </p>
            </div>
        </div>
    );
}
