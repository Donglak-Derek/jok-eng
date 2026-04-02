import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as dotenv from 'dotenv';
import { join } from 'path';

// Load .env.local
dotenv.config({ path: join(process.cwd(), '.env.local') });

async function updateCategories() {
    try {
        const serviceAccount = {
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        };

        if (!serviceAccount.projectId) {
            console.error("Missing FIREBASE_PROJECT_ID in .env.local");
            process.exit(1);
        }

        try {
            initializeApp({ credential: cert(serviceAccount) });
        } catch (error) {
            if (!/already exists/.test(error.message)) {
                throw error;
            }
        }

        const db = getFirestore();

        // The updated simple text and order
        const CATEGORY_DETAILS = {
            the_party_survival_kit: {
                name: "Party Survival Kit",
                description: "What to say at parties so you are never awkward or left out.",
                image: "/images/categories/party_survival_kit_v2.png",
                color: "orange",
            },
            dating_and_disasters: {
                name: "Dating & Disasters",
                description: "What to do when things get awkward on dates or in emergency situations.",
                image: "/images/categories/dating_and_disasters_v2.png",
                color: "pink",
            },
            office_banter: {
                name: "Office Survival",
                description: "Learn how to joke with your coworkers and be popular at work.",
                image: "/images/categories/office_banter_v2.png",
                color: "blue",
            },
            small_talk: {
                name: "Everyday Small Talk",
                description: "How to talk to strangers and start a friendly conversation.",
                image: "/images/categories/small_talk_v2.png",
                color: "emerald",
            },
            the_sarcasm_detector: {
                name: "Sarcasm & Jokes",
                description: "Learn how to understand when Americans are joking or using sarcasm.",
                image: "/images/categories/sarcasm_detector_v2.png",
                color: "purple",
            },
            the_polite_fight: {
                name: "How to Disagree",
                description: "How to say no and fight back without making people hate you.",
                image: "/images/categories/polite_fight_v2.png",
                color: "indigo",
            },
            texting_decoder: {
                name: "Texting & Emails",
                description: "Learn the unwritten rules of texting so you don't sound like a robot.",
                image: "/images/categories/texting_decoder_v2.png",
                color: "cyan",
            },
            american_culture: {
                name: "American Culture",
                description: "Watch real videos to learn exactly what Americans do and say.",
                image: "/images/categories/american_culture_v3.png",
                color: "cyan",
            },
        };

        const batch = db.batch();
        const categoriesRef = db.collection('categories');

        console.log("Updating Categories in Firestore...");

        for (const [slug, details] of Object.entries(CATEGORY_DETAILS)) {
            const docRef = categoriesRef.doc(slug);
            batch.set(docRef, {
                slug,
                name: details.name,
                description: details.description,
                image: details.image,
                color: details.color,
                updatedAt: new Date()
            }, { merge: true });
            console.log(`Prepared update for: ${slug} -> ${details.name}`);
        }

        await batch.commit();
        console.log("✅ Successfully updated all category names and descriptions in Firestore to simple text!");
        process.exit(0);

    } catch (error) {
        console.error("FATAL ERROR:", error);
        process.exit(1);
    }
}

updateCategories();
