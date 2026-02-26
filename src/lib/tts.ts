import { Script, UserProfile } from "@/types";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

// Local Memory Cache: Maps API Request URLs to Local Browser Blob URLs
const audioBlobCache = new Map<string, string>();

// Global reference to prevent overlapping audio
let currentAudio: HTMLAudioElement | null = null;

function stopCurrentAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.onended = null;
        currentAudio.onerror = null;
        currentAudio.src = "";
        currentAudio = null;
    }
}

interface PlayOptions {
    text: string;
    scenarioId: string;
    voice?: string; // e.g. "en-US-Neural2-F"
    isPro: boolean;
    userCredits: number;
    scenarioAudioUrl?: string; // Pre-cached URL from Firestore
    onPlayStart?: () => void;
    onPlayEnd?: () => void;
    onError?: (msg: string) => void;
}

/**
 * The Master TTS Function: "Cache & Profit" Model
 * 1. Check if we already have a focused legacy URL (passed in).
 * 2. If not, hit `/api/tts` which handles its own global caching.
 * 3. Play audio.
 */
export async function playScenarioAudio(
    dbUser: UserProfile | null,
    scenario: Script,
    options: {
        text?: string;
        sentenceId?: string; // If playing a specific sentence
        voice?: string;
        onStart: () => void;
        onEnd: () => void;
        onError: (err: string) => void;
        onAudioGenerated?: (url: string) => void;
    }
) {
    let textToPlay = options.text || scenario.cleanedEnglish;
    if (!textToPlay) {
        options.onError("No text to play.");
        return;
    }

    // Remove brackets [ ] used for cloze/keywords to prevent TTS pauses
    textToPlay = textToPlay.replace(/[\[\]]/g, "");

    // Determine Cache Key & URL
    let cachedUrl = scenario.audioUrl;
    if (options.sentenceId) {
        if (scenario.sentences) {
            const sentence = scenario.sentences.find(s => s.id === options.sentenceId);
            if (sentence) cachedUrl = sentence.audioUrl;
        }
        if (!cachedUrl && scenario.decoderItems) {
            const decoderItem = scenario.decoderItems.find(d => d.id === options.sentenceId);
            if (decoderItem) cachedUrl = decoderItem.audioUrl;
        }
        // Support for Story Segments (using index as ID usually, or maybe we passed a virtual ID)
        if (!cachedUrl && scenario.segments) {
            // For segments, we might pass "seg_0", "seg_1" etc.
            // Or we just assume the ID passed matches the convention if we enforce it.
            // But segments in types don't have an ID field!
            // So we must rely on index.
            // Hack: we will assume sentenceId is "seg_{index}" for segments
            if (options.sentenceId.startsWith("seg_")) {
                const idx = parseInt(options.sentenceId.split("_")[1]);
                if (scenario.segments[idx]) cachedUrl = scenario.segments[idx].audioUrl;
            }
        }
    }


    // STRATEGY 1: CHECK LEGACY CACHE FIRST (Backward Compatibility)
    if (cachedUrl) {
        playAudioFromUrl(cachedUrl, options.onStart, options.onEnd, options.onError);
        return;
    }

    // STRATEGY 2: CALL GLOBAL CACHED API
    stopCurrentAudio();
    options.onStart();

    try {
        // 1. Check Local In-Memory Cache first
        const voice = options.voice || "en-US-Neural2-F"; // Allow override
        const apiUrl = `/api/tts?text=${encodeURIComponent(textToPlay)}&voice=${voice}`;

        let targetUrl = apiUrl;

        if (audioBlobCache.has(apiUrl)) {
            // HIT: Use the local Memory Blob
            targetUrl = audioBlobCache.get(apiUrl)!;
        } else {
            // MISS: Fetch from Global API Cache
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("TTS Generation failed");

            // Using response.url from the 302 redirect (Firebase Storage public URL)
            targetUrl = response.url;

            // Save to Local Memory Cache for next time
            audioBlobCache.set(apiUrl, targetUrl);

            // Gamification/Persistence Callback: Provide the permanent URL back to the frontend
            if (options.onAudioGenerated && response.redirected) {
                options.onAudioGenerated(targetUrl);
            }
        }

        // 2. Play Audio
        const audio = new Audio(targetUrl);
        currentAudio = audio;

        audio.onended = () => {
            options.onEnd();
            if (currentAudio === audio) currentAudio = null;
            // We NO LONGER revoke the object URL here, as the cache retains it for instant replay
        };
        audio.onerror = () => {
            options.onError("Playback error");
            if (currentAudio === audio) currentAudio = null;
        };

        // Handle Safari autoplay block gracefully
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(e => {
                if (e.name === 'NotAllowedError') {
                    console.warn("Autoplay blocked by browser. User interaction required.");
                } else {
                    console.error("Audio playback error", e);
                }
            });
        }

    } catch (e) {
        console.error("TTS Logic Error", e);
        // Fallback to native if API fails entirely
        speakNative(textToPlay, options.onStart, options.onEnd);
    }
}

function playAudioFromUrl(url: string, onStart: () => void, onEnd: () => void, onError: (msg: string) => void) {
    stopCurrentAudio();
    const audio = new Audio(url);
    currentAudio = audio;

    audio.onplay = onStart;
    audio.onended = () => {
        onEnd();
        if (currentAudio === audio) currentAudio = null;
    };
    audio.onerror = () => {
        onError("Failed to play audio url");
        if (currentAudio === audio) currentAudio = null;
    };
    audio.play();
}

// Global reference to prevent Safari GC bug
let activeUtterance: SpeechSynthesisUtterance | null = null;

function speakNative(text: string, onStart: () => void, onEnd: () => void) {
    stopCurrentAudio();
    if (!window.speechSynthesis) {
        onEnd();
        return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    activeUtterance = utterance; // Pin to global to prevent GC

    // Voice Selection Strategy
    const voices = window.speechSynthesis.getVoices();
    // 1. Prefer "Google US English" (Chrome/Android)
    // 2. Prefer "Samantha" (high quality macOS)
    // 3. Fallback to any "en-US"
    const preferredVoice = voices.find(v => v.name === "Google US English")
        || voices.find(v => v.name === "Samantha")
        || voices.find(v => v.lang === "en-US");

    if (preferredVoice) {
        utterance.voice = preferredVoice;
    }

    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1;

    // Safety Timeout: If browser hangs (common in Safari), force finish after expected duration + buffer
    // rough estimate: 150 words/min = 2.5 words/sec. 
    const wordCount = text.split(' ').length;
    const estimatedDuration = (wordCount / 2.5) * 1000;
    const safetyTimeout = setTimeout(() => {
        if (activeUtterance === utterance) {
            console.warn("TTS Timed out - forcing end");
            onEnd();
            activeUtterance = null;
        }
    }, estimatedDuration + 3000); // 3s buffer

    utterance.onstart = () => {
        onStart();
    };

    utterance.onend = () => {
        clearTimeout(safetyTimeout);
        if (activeUtterance === utterance) {
            onEnd();
            activeUtterance = null;
        }
    };

    utterance.onerror = (e) => {
        clearTimeout(safetyTimeout);
        console.error("Native TTS Error", e);
        // "interrupted" or "canceled" are fine, don't alert
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
            // Try to finish anyway so ui doesn't hang
            onEnd();
        }
        activeUtterance = null;
    };

    window.speechSynthesis.speak(utterance);
}
