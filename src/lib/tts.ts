import { Script, UserProfile } from "@/types";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Tier 1: In-Memory Content Cache (Text + Voice -> Blob URL)
const textAudioBlobCache = new Map<string, string>();
// Tier 2: In-Memory URL Cache (URL -> Blob URL)
const audioBlobCache = new Map<string, string>();

/**
 * Normalizes text and voice for consistent cache keys
 */
function getCacheKey(text: string, voice?: string) {
    const cleanText = text.trim().toLowerCase().replace(/[\[\]]/g, "");
    const cleanVoice = (voice || "en-US-Neural2-F").toLowerCase();
    return `${cleanText}@@${cleanVoice}`;
}

/**
 * Robust fetch for audio blobs to avoid CORS/redirect issues in <audio> tags
 */
async function fetchAudioBlob(url: string, cacheKey?: string): Promise<string | null> {
    if (audioBlobCache.has(url)) {
        return audioBlobCache.get(url)!;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch audio: ${response.status}`);
    
    const blob = await response.blob();
    
    // VALIDATION: Ensure we got actual audio, not an empty file or a 200-OK HTML error page
    const headerBuffer = await blob.slice(0, 8).arrayBuffer();
    const header = Array.from(new Uint8Array(headerBuffer)).map(b => b.toString(16).padStart(2, '0')).join(' ');
    console.log(`[TTS Info] Fetched Storage: size=${blob.size} bytes, type=${blob.type}, header=${header}`);
    
    if (blob.size < 100 || !blob.type.includes("audio")) {
        console.warn("[TTS Warning] Media invalid or too small.");
        return null;
    }

    const objectUrl = URL.createObjectURL(blob);
    audioBlobCache.set(url, objectUrl);
    if (cacheKey) textAudioBlobCache.set(cacheKey, objectUrl);
    return objectUrl;
}

// Optimized 0.1-second silence MP3 snippet (minimizes overlap while still 'blessing' context)
const SILENCE_DATA_URI = "data:audio/mpeg;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACSAALCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsL/8AAAABhbmZvAAAA8AAAACAAACSAALCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsL/8AAAAhTEFNRTMuMTAwAof8AAAAAAAAAAAAMUCAAAAAAAAAAAAAAAD/8MUAAAAAAAAAAAAAAAAAAAAAAAANIAAAAAAAVU9VAVVVVRX/8MUAMIAAAAzAAAAANIAAAAAAAVU9VAVVVVRX/8MUALIAAAAzAAAAANIAAAAAAAVU9VAVVVVRX/8MUAMYAAAAzAAAAANIAAAAAAAVU9VAVVVVRU=";

// Global reference to prevent overlapping audio and maintain mobile "blessed" state
let globalAudio: HTMLAudioElement | null = null;
let globalPlaybackGeneration = 0;

function stopCurrentAudio() {
    if (globalAudio) {
        globalAudio.pause();
        globalAudio.onended = null;
        globalAudio.onerror = null;
        globalAudio.src = ""; // Fully clear source
        globalAudio.load();   // Force clear
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
    
    // Clear previous state
    stopCurrentAudio();
    
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
    scenario: Script | null,
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
    // 🚩 CRITICAL: Synchronously "bless" the context BEFORE any async calls.
    // Safari REQUIRES the first audio action to be in the direct call stack.
    blessAudioContext();

    const voice = options.voice || "en-US-Neural2-F";
    let textToPlay = options.text || scenario?.cleanedEnglish;
    if (!textToPlay) {
        options.onError("No text to play.");
        return;
    }

    // 1️⃣ TIER 1: CLIENT MEMORY CACHE (Zero Network)
    const cacheKey = getCacheKey(textToPlay, voice);
    if (textAudioBlobCache.has(cacheKey)) {
        const cachedUrl = textAudioBlobCache.get(cacheKey)!;
        console.log(`[TTS Info] Tier 1 HIT: Using memory-cached blob.`);
        // Play directly
        playFinalBlob(cachedUrl, textToPlay, options);
        return;
    }

    // Remove brackets [ ] used for cloze/keywords for network-level TTS
    textToPlay = textToPlay.replace(/[\[\]]/g, "");

    // 2️⃣ TIER 2: STORAGE KEY (Database check)
    let sourceUrl = scenario?.audioUrl;
    if (options.sentenceId && scenario) {
        if (scenario.sentences) {
            const sentence = scenario.sentences.find(s => s.id === options.sentenceId);
            if (sentence) sourceUrl = sentence.audioUrl;
        }
        if (!sourceUrl && scenario.decoderItems) {
            const decoderItem = scenario.decoderItems.find(d => d.id === options.sentenceId);
            if (decoderItem) sourceUrl = decoderItem.audioUrl;
        }
        if (!sourceUrl && scenario.segments) {
            if (options.sentenceId.startsWith("seg_")) {
                const idx = parseInt(options.sentenceId.split("_")[1]);
                if (scenario.segments[idx]) sourceUrl = scenario.segments[idx].audioUrl;
            }
        }
    }

    // Increment global generation id to handle async races
    globalPlaybackGeneration++;
    const currentGeneration = globalPlaybackGeneration;

    try {
        let finalBlobUrl: string | null = null;

        if (sourceUrl) {
            // Found a Storage URL -> Tier 2 Hit
            console.log(`[TTS Info] Tier 2 HIT: Fetching direct from Storage URL.`);
            finalBlobUrl = await fetchAudioBlob(sourceUrl, cacheKey);
        } else {
            // 3️⃣ TIER 3: API GENERATION (Cloud fallback)
            console.log(`[TTS Info] Tier 3: Calling Proxy API for generation.`);
            options.onStart(); // Show loading state
            
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) {
                speakNative(textToPlay, () => {}, options.onEnd);
                return;
            }

            const token = await currentUser.getIdToken();
            const apiUrl = `/api/tts?text=${encodeURIComponent(textToPlay)}&voice=${voice}&token=${token}`;

            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`TTS API failed: ${response.status}`);
            
            const blob = await response.blob();
            
            // DIAGNOSTICS
            const headerBuffer = await blob.slice(0, 8).arrayBuffer();
            const header = Array.from(new Uint8Array(headerBuffer)).map(b => b.toString(16).padStart(2, '0')).join(' ');
            const status = response.headers.get("X-Audio-Status") || "ok";
            console.log(`[TTS Info] API Result: size=${blob.size} bytes, status=${status}, header=${header}`);

            if (status === "new") {
                console.info(`💎 [Cloud Cache] New audio generated and saved to community storage (${blob.size} bytes).`);
            }

            if (blob.size < 100 || !blob.type.includes("audio")) {
                throw new Error("Invalid audio response from API");
            }

            finalBlobUrl = URL.createObjectURL(blob);
            
            // Populate Tier 1 for next time
            textAudioBlobCache.set(cacheKey, finalBlobUrl);

            // Populate Storage Key for community (Step 3 feedback)
            const audioPath = response.headers.get("X-Audio-Path");
            if (options.onAudioGenerated && audioPath) {
                options.onAudioGenerated(audioPath);
            }
        }

        // ⚠️ FINAL EXECUTION
        if (!finalBlobUrl) {
            speakNative(textToPlay, () => {}, options.onEnd);
            return;
        }

        // Abort if another click happened during the fetch
        if (globalPlaybackGeneration !== currentGeneration) {
            URL.revokeObjectURL(finalBlobUrl); 
            return;
        }

        playFinalBlob(finalBlobUrl, textToPlay, options);

    } catch (e) {
        console.warn("TTS Strategy Error -> Falling back to native speech", e);
        speakNative(textToPlay, () => {}, options.onEnd);
    }
}

/**
 * Actual playback engine shared by all 3 Tiers
 */
function playFinalBlob(blobUrl: string, textToPlay: string, options: { onStart: () => void, onEnd: () => void }) {
    if (!globalAudio) globalAudio = new Audio();
    
    // Clear and set
    globalAudio.onended = null;
    globalAudio.onerror = null;
    globalAudio.src = blobUrl;
    globalAudio.onplay = options.onStart;
    globalAudio.onended = () => {
        options.onEnd();
    };

    globalAudio.onerror = () => {
        const code = globalAudio?.error?.code;
        const message = globalAudio?.error?.message;
        console.error(`Media Error [${code}]: ${message}. Falling back to native.`);
        speakNative(textToPlay, () => {}, options.onEnd);
    };

    const playPromise = globalAudio.play();
    if (playPromise !== undefined) {
        playPromise.catch(e => {
            if (e.name === 'NotAllowedError' || e.name === 'AbortError') {
                speakNative(textToPlay, () => {}, options.onEnd);
            }
        });
    }
}

/**
 * Robust wrapper for direct URL playback
 */
export async function playAudioFromUrl(url: string, onStart: () => void, onEnd: () => void, onError: (msg: string) => void) {
    try {
        const urlToUse = await fetchAudioBlob(url);
        if (!urlToUse) throw new Error("Invalid media URL");

        if (!globalAudio) globalAudio = new Audio();
        
        globalAudio.pause();
        globalAudio.src = urlToUse;
        globalAudio.onplay = onStart;
        globalAudio.onended = onEnd;
        globalAudio.onerror = () => {
             // If manual URL fails, we don't have a 'text' context for speech synthesis, 
             // but we can try to find the text if it was part of a scenario
             onError("Playback blocked or media corrupted");
        };
        
        await globalAudio.play();
    } catch (e) {
        console.error("URL Playback failed", e);
        onError("Playback error");
    }
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
