import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    limit,
    doc,
    getDoc,
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
    createdAt: Date | { seconds: number; nanoseconds: number };
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

        const lessons = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as VideoLesson[];

        // Fetch the full script objects for each lesson
        for (const lesson of lessons) {
            // 1. Fetch General Practice Scenario
            const generalScenarioId = (lesson as any).generalScenarioId;
            if (generalScenarioId) {
                try {
                    const scenarioRef = doc(db, "users", "jok-eng-official", "scenarios", generalScenarioId);
                    const scenarioSnap = await getDoc(scenarioRef);
                    if (scenarioSnap.exists()) {
                        (lesson as any).generalScenario = scenarioSnap.data();
                    }
                } catch (err) {
                    console.error("Failed to fetch general scenario for lesson", lesson.id, err);
                }
            }

            // 2. Fetch Exact Dictation Script (V2 architecture)
            const exactScriptId = (lesson as any).exactScriptId;
            if (exactScriptId) {
                try {
                    const exactRef = doc(db, "users", "jok-eng-official", "scenarios", exactScriptId);
                    const exactSnap = await getDoc(exactRef);
                    if (exactSnap.exists()) {
                        (lesson as any).exactScript = exactSnap.data();
                    }
                } catch (err) {
                    console.error("Failed to fetch exact script for lesson", lesson.id, err);
                }
            }
        }

        return lessons;
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
            const lesson = { id: docSnap.id, ...docSnap.data() } as VideoLesson;

            // Fetch General Scenario
            if ((lesson as any).generalScenarioId) {
                const scenarioRef = doc(db, "users", "jok-eng-official", "scenarios", (lesson as any).generalScenarioId);
                const scenarioSnap = await getDoc(scenarioRef);
                if (scenarioSnap.exists()) {
                    (lesson as any).generalScenario = scenarioSnap.data();
                }
            }

            // Fetch Exact Script
            if ((lesson as any).exactScriptId) {
                const exactRef = doc(db, "users", "jok-eng-official", "scenarios", (lesson as any).exactScriptId);
                const exactSnap = await getDoc(exactRef);
                if (exactSnap.exists()) {
                    (lesson as any).exactScript = exactSnap.data();
                }
            }

            return lesson;
        } else {
            return null;
        }
    } catch (e) {
        console.error("Error getting document: ", e);
        throw e;
    }
}
