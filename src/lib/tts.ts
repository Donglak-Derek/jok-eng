import { Script, UserProfile } from "@/types";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Local Memory Cache: Maps API Request URLs to Local Browser Blob URLs
const audioBlobCache = new Map<string, string>();

// Silent 1-pixel/1-millisecond sound to "bless" the audio context synchronously on mobile
const SILENCE_DATA_URI = "data:audio/wav;base64,UklGRigAAABXQVZFWm1zZSAAAABIAAAAL09wdGlvbnMAAABpZDN0AAAAAAA=";

// Global reference to prevent overlapping audio and maintain mobile "blessed" state
let globalAudio: HTMLAudioElement | null = null;
let globalPlaybackGeneration = 0;

function stopCurrentAudio() {
    if (globalAudio) {
        globalAudio.pause();
        globalAudio.onended = null;
        globalAudio.onerror = null;
        globalAudio.src = SILENCE_DATA_URI; // Reset to silence
    }
}

/**
 * Ensures the audio context is unlocked for mobile Safari.
 * MUST be called inside a synchronous user interaction handler.
 */
function blessAudioContext() {
    if (!globalAudio) {
        globalAudio = new Audio();
    }
    
    // Play silence instantly to satisfy Safari's synchronous requirement
    globalAudio.src = SILENCE_DATA_URI;
    globalAudio.play().catch(() => {
        // Silently fail if context hasn't been blessed yet
    });

    // Also bless SpeechSynthesis for mobile native fallback
    if (typeof window !== "undefined" && window.speechSynthesis) {
        const blessing = new SpeechSynthesisUtterance("");
        blessing.volume = 0;
        window.speechSynthesis.speak(blessing);
    }
}

export async function playScenarioAudio(
    dbUser: UserProfile | null,
    scenario: Script,
    options: {
        text?: string;
        sentenceId?: string;
        voice?: string;
        onStart: () => void;
        onEnd: () => void;
        onError: (err: string) => void;
        onAudioGenerated?: (url: string) => void;
    }
) {
    // 🚩 CRITICAL: Synchronously "bless" the context BEFORE any async calls
    blessAudioContext();

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
        if (!cachedUrl && scenario.segments) {
            if (options.sentenceId.startsWith("seg_")) {
                const idx = parseInt(options.sentenceId.split("_")[1]);
                if (scenario.segments[idx]) cachedUrl = scenario.segments[idx].audioUrl;
            }
        }
    }

    // Increment global generation id
    globalPlaybackGeneration++;
    const currentGeneration = globalPlaybackGeneration;

    // STRATEGY 1: CHECK LEGACY CACHE FIRST
    if (cachedUrl) {
        playAudioFromUrl(cachedUrl, options.onStart, options.onEnd, options.onError);
        return;
    }

    options.onStart();

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
        console.warn("Guest user: Falling back to native TTS");
        speakNative(textToPlay, () => {}, options.onEnd);
        return;
    }

    try {
        const token = await currentUser.getIdToken();
        const voice = options.voice || "en-US-Neural2-F";
        const apiUrl = `/api/tts?text=${encodeURIComponent(textToPlay)}&voice=${voice}&token=${token}`;

        let targetUrl = apiUrl;

        if (audioBlobCache.has(apiUrl)) {
            targetUrl = audioBlobCache.get(apiUrl)!;
        } else {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("TTS Generation failed");
            targetUrl = response.url;
            audioBlobCache.set(apiUrl, targetUrl);
            if (options.onAudioGenerated && response.redirected) {
                options.onAudioGenerated(targetUrl);
            }
        }

        if (globalPlaybackGeneration !== currentGeneration) return;

        // 2. Play Audio via blessed global player
        if (!globalAudio) globalAudio = new Audio();
        
        globalAudio.src = targetUrl;
        globalAudio.onended = () => {
            options.onEnd();
        };
        globalAudio.onerror = () => {
            options.onError("Playback error");
        };

        const playPromise = globalAudio.play();
        if (playPromise !== undefined) {
            playPromise.catch(e => {
                console.error("Audio playback error", e);
                if (e.name === 'NotAllowedError') {
                    // Final attempt fallback to native
                    speakNative(textToPlay, () => {}, options.onEnd);
                }
            });
        }

    } catch (e) {
        console.error("TTS Logic Error", e);
        speakNative(textToPlay, () => {}, options.onEnd);
    }
}

function playAudioFromUrl(url: string, onStart: () => void, onEnd: () => void, onError: (msg: string) => void) {
    if (!globalAudio) globalAudio = new Audio();
    globalAudio.pause();
    globalAudio.src = url;

    globalAudio.onplay = onStart;
    globalAudio.onended = onEnd;
    globalAudio.onerror = () => {
        onError("Failed to play audio url");
    };
    
    globalAudio.play().catch(e => {
        console.error("URL Playback blocked", e);
        onError("Playback blocked by browser");
    });
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
