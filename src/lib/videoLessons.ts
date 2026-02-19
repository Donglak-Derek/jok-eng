import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    limit,
    doc,
    getDoc,
    Timestamp,
    serverTimestamp
} from "firebase/firestore";
import { db } from "./firebase";
import { Script } from "@/types";

export interface VideoLesson {
    id?: string;
    youtubeId: string;
    title: string;
    transcript?: string;
    script: Script;
    createdAt: any; // Using any for Firestore serverTimestamp compatibility
}

const COLLECTION_NAME = "video_lessons";

export async function saveVideoLesson(youtubeId: string, title: string, script: Script, transcript?: string) {
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            youtubeId,
            title,
            transcript,
            script,
            createdAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
}

export async function getLatestVideoLessons(maxCount: number = 3) {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"), limit(maxCount));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as VideoLesson[];
    } catch (e) {
        console.error("Error getting documents: ", e);
        return [];
    }
}

export async function getVideoLessonById(id: string) {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as VideoLesson;
        } else {
            return null;
        }
    } catch (e) {
        console.error("Error getting document: ", e);
        throw e;
    }
}
