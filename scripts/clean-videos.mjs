import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

try {
    initializeApp({ credential: cert(serviceAccount) });
} catch (error) {
    if (!/already exists/.test(error.message)) {
        console.error('Firebase initialization error');
    }
}

const db = getFirestore();

async function cleanVideos() {
    console.log("Fetching video_lessons...");
    const snapshot = await db.collection("video_lessons").orderBy("createdAt", "desc").get();

    for (const doc of snapshot.docs) {
        const data = doc.data();
        const ytid = data.youtubeId;

        // Check if thumbnail exists
        try {
            const url = `https://img.youtube.com/vi/${ytid}/hqdefault.jpg`;
            const res = await fetch(url);

            if (!res.ok || res.status === 404) {
                console.log(`[DELETE] Video: "${data.title}" (ID: ${doc.id}) - Thumbnail 404 (or invalid yt id)`);
                await doc.ref.delete();
            } else {
                console.log(`[KEEP] Video: "${data.title}" (ID: ${doc.id}) - status: ${res.status}`);
            }
        } catch (e) {
            console.error(`Error checking ${ytid}`, e);
        }
    }
    process.exit(0);
}

cleanVideos();
