import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Uploads an audio blob to Firebase Storage and returns the download URL.
 * Path: scenarios/{scenarioId}/audio.mp3
 */
export async function uploadAudioToStorage(scenarioId: string, audioBlob: Blob): Promise<string> {
    if (!storage) throw new Error("Firebase Storage not initialized");

    const storagePath = `scenarios/${scenarioId}/audio.mp3`;
    const storageRef = ref(storage, storagePath);

    // Metadata helps with browser playback
    const metadata = {
        contentType: 'audio/mpeg',
    };

    const snapshot = await uploadBytes(storageRef, audioBlob, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
}

/**
 * Checks if audio exists in storage without downloading it.
 * (Optional optimization if we trust Firestore audioUrl field)
 */
export async function getStoredAudioUrl(scenarioId: string): Promise<string | null> {
    if (!storage) return null;
    const storagePath = `scenarios/${scenarioId}/audio.mp3`;
    const storageRef = ref(storage, storagePath);
    
    try {
        return await getDownloadURL(storageRef);
    } catch (e) {
        return null; // File doesn't exist
    }
}
