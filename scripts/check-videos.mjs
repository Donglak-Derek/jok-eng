import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

try {
    initializeApp({
        credential: cert(serviceAccount)
    });
} catch (error) {
    if (!/already exists/.test(error.message)) {
        console.error('Firebase initialization error');
    }
}

const db = getFirestore();

async function checkVideos() {
    console.log("Fetching video_lessons...");
    const snapshot = await db.collection("video_lessons").orderBy("createdAt", "desc").limit(10).get();
    console.log(`Found ${snapshot.docs.length} videos.`);
    snapshot.docs.forEach((doc, idx) => {
        const data = doc.data();
        console.log(`[${idx + 1}] ID: ${doc.id}`);
        console.log(`    Title: ${data.title}`);
        console.log(`    YouTube ID: ${data.youtubeId}`);
        console.log(`    Script ID: ${data.script?.id}`);
    });
    process.exit(0);
}

checkVideos().catch(console.error);
