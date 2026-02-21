import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// Load service account (make sure FIREBASE_PRIVATE_KEY is correctly formatted)
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
        console.error('Firebase initialization error', error.stack);
    }
}

const db = getFirestore();

const BLOG_POSTS = [
    {
        id: "1",
        title: "Ordering Coffee like a local",
        excerpt: "Forget 'I want a coffee'. Here is how to navigate the complex social cues of a busy morning rush.",
        tag: "Real World",
        textbook: "I would like a medium coffee with milk, please.",
        real: "Can I get a venti oat milk latte? To go, thanks!",
        color: "bg-orange-500/10 text-orange-600",
        content: `In most textbooks, you're taught to say "I would like a coffee, please." While grammatically perfect, it's socially stiff. In a busy city like Dallas or NYC, the barista is in a flow. You want to match that flow.

**The Strategy:** Use "Can I get a..." + [Size] + [Type]. It's direct, friendly, and efficient. Adding "To go, thanks!" at the end signals you're ready to move, which baristas love.`,
        relatedScenarioId: "official-coffee", // Placeholder for actual ID if needed
        author: "Derek",
        createdAt: new Date("2024-02-18T10:00:00Z").getTime(),
    },
    {
        id: "2",
        title: "The Ikea Return Desk struggle",
        excerpt: "Returning a 'FLURG' without losing your mind. The vocabulary you actually need for customer service.",
        tag: "Survival",
        textbook: "I wish to return this item as it is defective.",
        real: "Hey, this thing's missing a screw. Can I just swap it out or get a refund?",
        color: "bg-blue-500/10 text-blue-600",
        content: `Customer service desks are high-stress environments. Walking up and stating "I wish to return this item" sounds like a robot demanding parlay.

**The Strategy:** Lower the stakes. Use casual lead-ins like "Hey, my bad, but..." or "Looks like this thing is missing a piece." Giving the representative options like "swap it out or get a refund" makes you sound cooperative rather than demanding.`,
        relatedScenarioId: "official-ikea",
        author: "Derek",
        createdAt: new Date("2024-02-15T12:00:00Z").getTime(),
    },
    {
        id: "3",
        title: "Texas Small Talk survival guide",
        excerpt: "If someone says 'Howdy', do you have to say it back? A guide to Southern hospitality for non-natives.",
        tag: "Culture",
        textbook: "I am fine, thank you. How are you doing today?",
        real: "Doin' good! How 'bout you? Stayin' cool in this heat?",
        color: "bg-red-500/10 text-red-600",
        content: `In Texas, 'Howdy' isn't just a greeting; it's a vibe check. Responding with a stiff "I am fine, thank you" passes the check, but barely. 

**The Strategy:** Match the energy. Mirroring the casual tone with "Doin' good" builds instant rapport. The true secret weapon of Southern small talk is acknowledging the shared environment—usually the weather ("Stayin' cool in this heat?"). It creates an immediate sense of camaraderie.`,
        relatedScenarioId: "official-smalltalk",
        author: "Derek",
        createdAt: new Date("2024-02-10T09:00:00Z").getTime(),
    }
];

async function seed() {
    console.log("🌱 Starting Blog seeding process...");

    let count = 0;
    for (const post of BLOG_POSTS) {
        try {
            // Use custom ID so URLs don't break (/blogs/1)
            const docRef = db.collection('blogs').doc(post.id);
            await docRef.set(post);
            console.log(`✅ Seeded blog: ${post.title}`);
            count++;
        } catch (error) {
            console.error(`❌ Failed to seed blog ${post.title}:`, error);
        }
    }

    console.log(`\n🎉 Successfully seeded ${count}/${BLOG_POSTS.length} blog posts to Firestore.`);
    process.exit(0);
}

seed();
