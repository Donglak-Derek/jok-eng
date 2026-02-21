"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

type Podcast = {
    id: string;
    title: string;
    audioUrl: string;
    duration: string;
};

type PodcastContextType = {
    currentPodcast: Podcast | null;
    isPlaying: boolean;
    playPodcast: (podcast: Podcast) => void;
    togglePlay: () => void;
    closePlayer: () => void;
};

const PodcastContext = createContext<PodcastContextType | undefined>(undefined);

export function PodcastProvider({ children }: { children: React.ReactNode }) {
    const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playPodcast = (podcast: Podcast) => {
        if (currentPodcast?.id === podcast.id) {
            togglePlay();
            return;
        }
        setCurrentPodcast(podcast);
        setIsPlaying(true);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const closePlayer = () => {
        setCurrentPodcast(null);
        setIsPlaying(false);
    };

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Audio play failed:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentPodcast]);

    return (
        <PodcastContext.Provider value={{ currentPodcast, isPlaying, playPodcast, togglePlay, closePlayer }}>
            {children}
            {currentPodcast && (
                <audio
                    ref={audioRef}
                    src={currentPodcast.audioUrl}
                    onEnded={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                />
            )}
        </PodcastContext.Provider>
    );
}

export function usePodcast() {
    const context = useContext(PodcastContext);
    if (context === undefined) {
        throw new Error('usePodcast must be used within a PodcastProvider');
    }
    return context;
}
