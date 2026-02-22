import { getAdminDb } from "./firebase-admin";
import { Script } from "@/types";
import { FieldValue } from "firebase-admin/firestore";

export async function saveVideoLessonAdmin(youtubeId: string, title: string, exactScript: Script, generalScenario: Script, transcript?: string) {
    try {
        const db = getAdminDb();
        const collection = db.collection("video_lessons");

        // Check for existing lesson with this youtubeId
        const existing = await collection.where("youtubeId", "==", youtubeId).limit(1).get();

        if (!existing.empty) {
            const docId = existing.docs[0].id;
            await collection.doc(docId).update({
                title,
                transcript,
                exactScriptId: exactScript.id,
                generalScenarioId: generalScenario.id,
                script: exactScript, // LEAVING THIS FOR V1 BACKWARD COMPATIBILITY
                updatedAt: FieldValue.serverTimestamp(),
            });
            return docId;
        }

        const docRef = await collection.add({
            youtubeId,
            title,
            transcript,
            exactScriptId: exactScript.id,
            generalScenarioId: generalScenario.id,
            script: exactScript, // LEAVING THIS FOR V1 BACKWARD COMPATIBILITY
            createdAt: FieldValue.serverTimestamp(),
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding document (Admin): ", e);
        throw e;
    }
}
