"use client";

import { Suspense, useEffect, useState, useCallback, useRef } from "react";
import Header from "@/components/Header";
import { Loader2, ArrowUp, Volume2, VolumeX, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import { getLatestVideoLessons, VideoLesson } from "@/lib/videoLessons";
import FeedSlide from "@/components/content/FeedSlide";
import InlineScenario from "@/components/content/InlineScenario";

// Utility to extract standard YouTube video ID from various link formats
function extractYouTubeId(urlOrId: string) {
    if (!urlOrId) return null;
    if (!urlOrId.includes("youtube.com") && !urlOrId.includes("youtu.be")) {
        return urlOrId;
    }
    const match = urlOrId.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})/);
    return match ? match[1] : null;
}

type SlideData =
    | { type: "video"; id: string; lesson: VideoLesson; index: number }
    | { type: "exactScript"; id: string; lesson: VideoLesson; index: number }
    | { type: "generalScenario"; id: string; lesson: VideoLesson; index: number };

function VideoFeedUI() {
    const searchParams = useSearchParams();
    const startAtId = searchParams?.get("startAt");
    const startLayer = searchParams?.get("layer"); // "dictation" | "practice"

    const [lessons, setLessons] = useState<VideoLesson[]>([]);
    const [slides, setSlides] = useState<SlideData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Embla config for vertical snapping
    const [emblaRef, emblaApi] = useEmblaCarousel({
        axis: "y",
        dragFree: false,
        containScroll: "keepSnaps",
        watchDrag: true
    });

    const [isMuted, setIsMuted] = useState(true);

    // --- Scroll Lock State ---
    const [lockedSlides, setLockedSlides] = useState<Record<string, boolean>>({});
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => {
            setCurrentSlideIndex(emblaApi.selectedScrollSnap());
        };
        emblaApi.on("select", onSelect);
        onSelect();
        return () => { emblaApi.off("select", onSelect); };
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi || slides.length === 0) return;
        const activeSlideId = slides[currentSlideIndex]?.id;
        const isLocked = lockedSlides[activeSlideId] ?? false;

        // Dynamically allow or prevent dragging depending on if the slide wants to lock it.
        emblaApi.reInit({ watchDrag: !isLocked });
    }, [currentSlideIndex, lockedSlides, emblaApi, slides]);

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMuted(prev => !prev);
    };

    useEffect(() => {
        async function fetchLessons() {
            try {
                // Fetch up to 50 lessons for the feed
                const fetched = await getLatestVideoLessons(50);

                // Map the lessons into a flattened 1D array of slides (1 Video = 3 Slides)
                const flattenedSlides: SlideData[] = [];
                let currentIndex = 0;

                fetched.forEach((lesson) => {
                    // Slide 1: Video
                    flattenedSlides.push({ type: "video", id: `${lesson.id}-vid`, lesson, index: currentIndex++ });

                    // Slide 2: Exact Script Dictation (if it exists)
                    if (lesson.script) {
                        flattenedSlides.push({ type: "exactScript", id: `${lesson.id}-exact`, lesson, index: currentIndex++ });
                    }

                    // Slide 3: General Practice (if it exists in new dual-schema)
                    if ((lesson as any).generalScenarioId || lesson.script) {
                        flattenedSlides.push({ type: "generalScenario", id: `${lesson.id}-prac`, lesson, index: currentIndex++ });
                    }
                });

                setLessons(fetched);
                setSlides(flattenedSlides);
            } catch (err) {
                console.error("Failed to load feed", err);
                setError("Failed to load video feed. Please refresh.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchLessons();
    }, []);

    // Scroll to specific slide if deep linked from landing page
    useEffect(() => {
        if (!emblaApi || slides.length === 0 || !startAtId) return;

        const targetSlideIndex = slides.findIndex(slide => {
            if (slide.lesson.id !== startAtId) return false;
            if (startLayer === "dictation" && slide.type === "exactScript") return true;
            if (startLayer === "practice" && slide.type === "generalScenario") return true;
            if (!startLayer && slide.type === "video") return true;
            return false;
        });

        if (targetSlideIndex !== -1) {
            // Jump instantly without animation
            emblaApi.scrollTo(targetSlideIndex, true);
        }
    }, [emblaApi, slides, startAtId, startLayer]);


    const scrollToNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    if (isLoading) {
        return (
            <div className="w-full h-screen bg-black flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-neutral-500">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="font-mono text-xs uppercase tracking-widest">Loading Feed...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-screen bg-black flex items-center justify-center p-6">
                <div className="flex flex-col items-center gap-4 text-neutral-500 text-center">
                    <AlertCircle className="w-12 h-12 text-red-500" />
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <main className="fixed inset-0 bg-black overflow-hidden flex flex-col h-[100dvh]">
            {/* Header Layer (Absolute so it doesn't take up layout space in the swiper) */}
            <div className="absolute top-0 left-0 w-full z-50 pointer-events-none">
                <div className="pointer-events-auto">
                    <Header transparent={true} />
                </div>
            </div>

            {/* The TikTok Embla Swiper Area */}
            <div className="flex-1 w-full overflow-hidden" ref={emblaRef}>
                <div className="flex flex-col h-full tech-container touch-pan-y">
                    {slides.map((slide) => (
                        <FeedSlide key={slide.id}>
                            {(isActive) => (
                                <div className="w-full h-[100dvh] relative snap-center snap-always bg-black flex flex-col">

                                    {/* SLIDE TYPE: YOUTUBE VIDEO */}
                                    {slide.type === "video" && (
                                        <div className="flex-1 relative pb-20 pt-24 md:pt-32">
                                            {/* Video Container matching Short dimensions */}
                                            <div className="absolute inset-0 max-w-md mx-auto h-full flex items-center justify-center shadow-2xl overflow-hidden">
                                                {/* Dimmer overlay for non-active videos */}
                                                {!isActive && <div className="absolute inset-0 bg-black/50 z-10 transition-colors" />}

                                                <iframe
                                                    src={`https://www.youtube.com/embed/${extractYouTubeId(slide.lesson.youtubeId)}?autoplay=${isActive ? 1 : 0}&mute=${isMuted ? 1 : 0}&loop=1&controls=0&modestbranding=1&playsinline=1&rel=0`}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    title={slide.lesson.title}
                                                    className="w-full h-full object-cover scale-[1.05]" // Scale slightly to hide iframe borders
                                                    style={{ border: 'none', pointerEvents: 'none' }} // Disable iframe stealing touch events so users can swipe
                                                />
                                            </div>

                                            {/* UI Overlay */}
                                            <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none p-6 pb-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                                <div className="max-w-md mx-auto pointer-events-auto space-y-4">
                                                    <div>
                                                        <h2 className="text-2xl font-black text-white line-clamp-2 leading-tight">
                                                            {slide.lesson.title}
                                                        </h2>
                                                        <p className="text-neutral-300 font-medium line-clamp-1 mt-1">
                                                            Swipe up to rehearse this exact phrase.
                                                        </p>
                                                    </div>

                                                    {/* Feed Controls */}
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={toggleMute}
                                                            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
                                                        >
                                                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                                        </button>
                                                        <button
                                                            onClick={scrollToNext}
                                                            className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded-full flex items-center justify-center gap-2"
                                                        >
                                                            Rehearse Phrase <ArrowUp className="w-4 h-4 animate-bounce" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* SLIDE TYPE: EXACT SCRIPT DICTATION */}
                                    {slide.type === "exactScript" && (
                                        <div className="w-full max-w-md mx-auto flex-1 bg-neutral-950 pt-20 min-h-0">
                                            <InlineScenario
                                                script={(slide.lesson as any).exactScript || slide.lesson.script} // Fallback to V1 script property
                                                isActive={isActive}
                                                onComplete={scrollToNext}
                                                onLockChange={(isLocked) => {
                                                    setLockedSlides(prev => {
                                                        if (prev[slide.id] === isLocked) return prev;
                                                        return { ...prev, [slide.id]: isLocked };
                                                    });
                                                }}
                                            />
                                        </div>
                                    )}

                                    {/* SLIDE TYPE: GENERAL PRACTICE */}
                                    {slide.type === "generalScenario" && (
                                        <div className="w-full max-w-md mx-auto flex-1 bg-neutral-950 pt-20 min-h-0">
                                            <InlineScenario
                                                script={(slide.lesson as any).generalScenario || slide.lesson.script} // Fallback to V1 script property
                                                isActive={isActive}
                                                onLockChange={(isLocked) => {
                                                    setLockedSlides(prev => {
                                                        if (prev[slide.id] === isLocked) return prev;
                                                        return { ...prev, [slide.id]: isLocked };
                                                    });
                                                }}
                                            />
                                        </div>
                                    )}

                                </div>
                            )}
                        </FeedSlide>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default function VideosPage() {
    return (
        <Suspense fallback={
            <div className="w-full h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        }>
            <VideoFeedUI />
        </Suspense>
    );
}
