import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { uploadAudioToStorage } from "./audioCache";
import { Script, UserProfile } from "@/types";

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
 * 1. Check if we already have a focused URL (passed in).
 * 2. If not, check if we have enough credits to generate one.
 * 3. Generate -> Upload -> Save URL -> Play.
 */
/**
 * The Master TTS Function: "Cache & Profit" Model
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


    // STRATEGY 1: CHECK CACHE (Profit)
    if (cachedUrl) {
        playAudioFromUrl(cachedUrl, options.onStart, options.onEnd, options.onError);
        return;
    }

    // STRATEGY 2: CHECK LIMITS
    // If not signed in, default to Free/Native
    const isPro = dbUser?.subscription?.tier === 'pro' || (dbUser as any)?.role === 'admin';
    
    if (!isPro) {
        speakNative(textToPlay, options.onStart, options.onEnd);
        return;
    }

    // Pro Tier: Generate & Cache
    options.onStart(); 

    try {
        // 1. Call API
        const voice = options.voice || "en-US-Neural2-F"; // Allow override
        const apiUrl = `/api/tts?text=${encodeURIComponent(textToPlay)}&voice=${voice}`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("TTS Generation failed");

        const audioBlob = await response.blob();

        // 2. Play immediately
        const tempUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(tempUrl);
        
        audio.onended = () => {
            options.onEnd();
            URL.revokeObjectURL(tempUrl);
        };
        audio.onerror = () => options.onError("Playback error");
        audio.play();

        // 3. Upload & Cache
        const cacheId = options.sentenceId ? `${scenario.id}_${options.sentenceId}` : scenario.id;
        
        uploadAudioToStorage(cacheId, audioBlob).then(async (downloadUrl) => {
            console.log("💾 Audio Cached:", downloadUrl);
            options.onAudioGenerated?.(downloadUrl);
            
            if (!dbUser) return; // Guests cannot update Firestore

            const ownerId = (scenario as any).userId;

            // COMMUNITY CACHE STRATEGY:
            // 1. If script has an owner (User-created), write to their profile.
            // 2. If it's official, write to "jok-eng-official".
            // 3. ANY Pro/Admin user can trigger this write.
            
            let targetUserId;
            if (ownerId) {
                targetUserId = ownerId;
            } else {
                 targetUserId = "jok-eng-official";
            }

            const scriptRef = doc(db, `users/${targetUserId}/scenarios`, scenario.id); 

            if (options.sentenceId) {
                 // Check if it's a Sentence or a DecoderItem
                 const isDecoder = scenario.decoderItems && scenario.decoderItems.some(d => d.id === options.sentenceId);
                 const isSegment = options.sentenceId.startsWith("seg_"); // Check heuristic

                 if (isDecoder && scenario.decoderItems) {
                     // Update decoder item
                     const newItems = scenario.decoderItems.map(d => 
                        d.id === options.sentenceId ? { ...d, audioUrl: downloadUrl } : d
                     );
                     await updateDoc(scriptRef, { decoderItems: newItems });

                 } else if (isSegment && scenario.segments) {
                     // Update segment
                     const idx = parseInt(options.sentenceId.split("_")[1]);
                     if (!isNaN(idx) && scenario.segments[idx]) {
                         const newSegments = [...scenario.segments];
                         newSegments[idx] = { ...newSegments[idx], audioUrl: downloadUrl };
                         await updateDoc(scriptRef, { segments: newSegments }).catch(err => console.error(err));
                     }

                 } else if (scenario.sentences) {
                     // Update sentence
                     const newSentences = scenario.sentences.map(s => 
                        s.id === options.sentenceId ? { ...s, audioUrl: downloadUrl } : s
                     );
                     await updateDoc(scriptRef, { sentences: newSentences });
                 }

            } else {
                 // Update main audio
                 await updateDoc(scriptRef, { audioUrl: downloadUrl });
            }
        });

    } catch (e) {
        console.error("TTS Logic Error", e);
        // Fallback to native if API fails
        speakNative(textToPlay, options.onStart, options.onEnd);
    }
}

function playAudioFromUrl(url: string, onStart: () => void, onEnd: () => void, onError: (msg: string) => void) {
    const audio = new Audio(url);
    audio.onplay = onStart;
    audio.onended = onEnd;
    audio.onerror = () => onError("Failed to play audio url");
    audio.play();
}

// Global reference to prevent Safari GC bug
let activeUtterance: SpeechSynthesisUtterance | null = null;

function speakNative(text: string, onStart: () => void, onEnd: () => void) {
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
