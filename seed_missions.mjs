import { readFileSync } from 'fs';
import { resolve } from 'path';
import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

if (!admin.apps.length) {
    const envFile = readFileSync(resolve('.env.local'), 'utf-8');
    const pKeyLine = envFile.split('\n').find(l => l.startsWith('FIREBASE_PRIVATE_KEY='));
    let privateKey = pKeyLine ? pKeyLine.split('FIREBASE_PRIVATE_KEY=')[1].trim() : "";
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
        privateKey = privateKey.slice(1, -1);
    }
    privateKey = privateKey.replace(/\\n/g, '\n');

    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: privateKey,
        }),
    });
}

const db = admin.firestore();

async function seedMissions() {
    try {
        console.log("Reading missions.json...");
        const jsonPath = resolve('src/data/raw_missions/missions.json');
        const rawData = readFileSync(jsonPath, 'utf-8');
        const missions = JSON.parse(rawData);

        console.log(`Found ${missions.length} missions. Beginning upload to Firestore...`);

        const batch = db.batch();
        const collectionRef = db.collection('missions');

        let count = 0;
        let batchCount = 0;

        for (const mission of missions) {
            // As per UX requirements: document ID should be day_1, day_2, etc.
            const docId = `day_${mission.day}`;
            const docRef = collectionRef.doc(docId);
            
            // Add dayNumber explicitly to help with orderBy queries if needed later
            const dataToUpload = {
                ...mission,
                dayNumber: mission.day
            };

            batch.set(docRef, dataToUpload);
            count++;

            // Firestore batch limit is 500, we have 90 so we can do it in one batch.
            // But just to be robust:
            if (count % 500 === 0) {
                await batch.commit();
                console.log(`Committed batch ${++batchCount}`);
            }
        }

        if (count % 500 !== 0) {
            await batch.commit();
            console.log(`Committed final batch!`);
        }

        console.log(`✅ Successfully uploaded ${count} missions to Firestore Collection: 'missions'`);
        process.exit(0);
    } catch (error) {
        console.error("❌ Error uploading missions:", error);
        process.exit(1);
    }
}

seedMissions();
