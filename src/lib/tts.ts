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
        onStart: () => void;
        onEnd: () => void;
        onError: (err: string) => void;
    }
) {
    const textToPlay = options.text || scenario.cleanedEnglish;
    if (!textToPlay) {
        options.onError("No text to play.");
        return;
    }

    // Determine Cache Key & URL
    let cachedUrl = scenario.audioUrl;
    if (options.sentenceId && scenario.sentences) {
        const sentence = scenario.sentences.find(s => s.id === options.sentenceId);
        if (sentence) cachedUrl = sentence.audioUrl;
    }

    // STRATEGY 1: CHECK CACHE (Profit)
    if (cachedUrl) {
        console.log("🎧 Playing cached audio (Free!)");
        playAudioFromUrl(cachedUrl, options.onStart, options.onEnd, options.onError);
        return;
    }

    // STRATEGY 2: CHECK LIMITS
    if (!dbUser) {
         // Fallback to Native logic if not signed in? Or error?
         // Let's assume generic error for now, or assume native.
        options.onError("Please sign in to listen.");
        return;
    }
    
    // Free Tier = Native
    const isPro = dbUser.subscription?.tier === 'pro' || (dbUser as any).role === 'admin';
    
    if (!isPro) {
        console.log("🗣️ User is Free: Using Native TTS");
        speakNative(textToPlay, options.onStart, options.onEnd);
        return;
    }

    // Pro Tier: Generate & Cache
    console.log("☁️ Premium User: Generating & Caching Audio...");
    options.onStart(); 

    try {
        // 1. Call API
        const voice = "en-US-Neural2-F"; 
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
            
            const ownerId = (scenario as any).userId;
            const isAdmin = (dbUser as any).role === 'admin';
            
            // Only owner or admin can update Firestore
            if (ownerId !== dbUser.uid && !isAdmin) return;

            const scriptRef = doc(db, `users/${dbUser.uid}/scenarios`, scenario.id); 
            
            if (options.sentenceId && scenario.sentences) {
                 // Update specific sentence in array
                 const newSentences = scenario.sentences.map(s => 
                    s.id === options.sentenceId ? { ...s, audioUrl: downloadUrl } : s
                 );
                 await updateDoc(scriptRef, { sentences: newSentences });
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

function speakNative(text: string, onStart: () => void, onEnd: () => void) {
    if (!window.speechSynthesis) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = onStart;
    utterance.onend = onEnd;
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
}
