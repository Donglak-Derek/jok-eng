import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

// Initialize Firebase
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
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SCENARIO_PROMPTS = [
    {
        title: "Declining a vague project",
        plot: "My boss asked me to 'look into' a massive new project without giving me any extra resources or clear goals. I need to push back gently but firmly without sounding lazy or insubordinate.",
        context: "1-on-1 meeting with my manager",
        format: "Script",
        difficulty: "Professional",
        tone: "Firm but collaborative",
        length: "Medium"
    },
    {
        title: "Handling the credit stealer",
        plot: "A colleague just presented my idea as their own in a team meeting. The boss immediately praised them. I need to reclaim ownership of the idea smoothly and publicly without sounding petty or starting a fight.",
        context: "Team meeting with cross-functional stakeholders",
        format: "Script",
        difficulty: "Spicy",
        tone: "Assertive and diplomatic",
        length: "Short"
    },
    {
        title: "The polite exit from a talker",
        plot: "I'm stuck at a networking event talking to someone who has been monologuing for 10 minutes. I really need to leave and talk to other people, but I don't want to burn the bridge.",
        context: "Crowded industry networking mixer",
        format: "Social Dojo",
        difficulty: "Normal",
        tone: "Warm but decisive",
        length: "Short"
    }
];

const schema = {
    type: SchemaType.OBJECT,
    properties: {
        title: { type: SchemaType.STRING, description: "Catchy title for the scenario" },
        categorySlug: { type: SchemaType.STRING, description: "E.g., small_talk, deep_convos, business" },
        categoryName: { type: SchemaType.STRING, description: "Human readable category name" },
        cleanedEnglish: { type: SchemaType.STRING, description: "Brief 1-sentence summary of the scenario goal" },
        difficulty: { type: SchemaType.STRING },
        length: { type: SchemaType.STRING },
        context: { type: SchemaType.STRING },
        tone: { type: SchemaType.STRING },
        sentences: {
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    id: { type: SchemaType.STRING },
                    en: { type: SchemaType.STRING },
                    scenario: { type: SchemaType.STRING, description: "The narrator setting the scene" }
                },
                required: ["id", "en"]
            }
        },
        culturalInsights: {
            type: SchemaType.OBJECT,
            properties: {
                title: { type: SchemaType.STRING },
                content: { type: SchemaType.STRING }
            }
        }
    },
    required: ["title", "categorySlug", "categoryName", "cleanedEnglish", "sentences"]
};

async function generateAndSave() {
    console.log("Starting Generation of Official Seed Scenarios...");
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-pro",
        systemInstruction: "You are a master of American corporate and social subtext. Generate realistic dialog scripts for English learners.",
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
            temperature: 0.7
        }
    });

    for (const prompt of SCENARIO_PROMPTS) {
        console.log(`Generating: ${prompt.title}`);
        try {
            const promptText = `
                Generate a learning scenario for the following situation:
                Plot: ${prompt.plot}
                Context: ${prompt.context}
                Tone: ${prompt.tone}
                Target length: ${prompt.length}
                
                Make the 'en' sentences the natural, nuanced things a native speaker might say. Give 2-3 lines of dialogue.
                Include a cultural insight about navigating this specific type of unspoken rule in American corporate culture.
            `;

            const result = await model.generateContent(promptText);
            const scriptData = JSON.parse(result.response.text());

            // Prepare for DB
            const finalDoc = {
                ...scriptData,
                userId: "jok-eng-official",
                authorName: "Jok-Eng Official",
                createdAt: Date.now(),
                isPublic: true,
                format: prompt.format,
                originalPrompt: {
                    context: prompt.context,
                    plot: prompt.plot
                }
            };

            const docRef = db.collection("users").doc("jok-eng-official").collection("scenarios").doc();
            finalDoc.id = docRef.id;

            await docRef.set(finalDoc);
            console.log(`✅ Saved ${prompt.title} [${docRef.id}]`);

        } catch (e) {
            console.error(`❌ Failed to generate ${prompt.title}`, e);
        }
    }

    console.log("Finished seeding!");
    process.exit(0);
}

generateAndSave();
