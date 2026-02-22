import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from "uuid";
import pRetry from "p-retry";
import { VIDEO_LESSON_PROMPT } from "./prompts";
import { saveVideoLessonAdmin } from "@/lib/videoLessonsAdmin";
import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.split("Bearer ")[1];
        let decodedToken;
        try {
            decodedToken = await getAdminAuth().verifyIdToken(token);
            // Only official admin can generate these. Match ADMIN_UID from frontend layout.
            if (decodedToken.uid !== "pbz1yjIxjRhnAA9N5Fyi4YyNy9R2") {
                return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
            }
        } catch (e) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { youtubeId, title, transcript } = await request.json();

        if (!youtubeId || !title || !transcript) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        let prompt = VIDEO_LESSON_PROMPT;
        prompt = prompt.replace("{title}", title).replace("{transcript}", transcript);

        const result = await pRetry(
            () => model.generateContent(prompt),
            { retries: 2 }
        );

        const response = await result.response;
        const text = response.text();

        // JSON Extraction helper
        const start = text.indexOf('{');
        const end = text.lastIndexOf('}');
        if (start === -1 || end === -1) throw new Error("No JSON found");
        const jsonString = text.substring(start, end + 1);
        const data = JSON.parse(jsonString);

        // Format into exactScript type
        const exactScript = {
            ...data.exactScript,
            id: uuidv4(),
            categorySlug: "video_lesson",
            categoryName: "Video Lessons",
            mode: "cloze",
            quizItems: data.exactScript.quizItems?.map((q: any) => ({ ...q, id: uuidv4() })) || [],
            sentences: data.exactScript.sentences?.map((s: any) => ({ ...s, id: uuidv4() })) || []
        };

        // Format into generalScenario type
        const generalScenario = {
            ...data.generalScenario,
            id: uuidv4(),
            categorySlug: "practice",
            categoryName: "Real Life Practice",
            mode: "cloze",
            quizItems: data.generalScenario.quizItems?.map((q: any) => ({ ...q, id: uuidv4() })) || [],
            sentences: data.generalScenario.sentences?.map((s: any) => ({ ...s, id: uuidv4() })) || []
        };

        // Also save both scripts individually to the jok-eng-official account so they show up in the main library
        const adminDb = getAdminDb();
        const officialRef = adminDb.collection("users").doc("jok-eng-official").collection("scenarios");

        await officialRef.doc(exactScript.id).set({
            ...exactScript,
            userId: "jok-eng-official",
            authorName: "Jok-Eng Official",
            createdAt: Date.now(),
            isPublic: true
        });

        await officialRef.doc(generalScenario.id).set({
            ...generalScenario,
            userId: "jok-eng-official",
            authorName: "Jok-Eng Official",
            createdAt: Date.now(),
            isPublic: true
        });

        // Save to Video Vault linking document
        const lessonId = await saveVideoLessonAdmin(youtubeId, title, exactScript, generalScenario, transcript);

        return NextResponse.json({ success: true, lessonId, exactScript, generalScenario });

    } catch (error: any) {
        console.error("Generate Lesson Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
