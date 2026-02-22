import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from "uuid";
import pRetry from "p-retry";
import { VIDEO_LESSON_PROMPT } from "../generate-lesson/prompts";
import type { Script } from "@/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
export const maxDuration = 60; // Up to 60s for AI Generation

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Missing token" }, { status: 401 });
        }
        const token = authHeader.split("Bearer ")[1];
        const decodedToken = await getAdminAuth().verifyIdToken(token);

        // AUTHORIZATION: Only Admin can upgrade lessons
        if (decodedToken.uid !== "pbz1yjIxjRhnAA9N5Fyi4YyNy9R2") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const { lessonId } = await req.json();

        if (!lessonId) {
            return NextResponse.json({ error: "Missing lessonId" }, { status: 400 });
        }

        // 1. Fetch the existing lesson
        const adminDb = getAdminDb();
        const lessonRef = adminDb.collection("video_lessons").doc(lessonId);
        const lessonSnap = await lessonRef.get();

        if (!lessonSnap.exists) {
            return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
        }

        const lessonData = lessonSnap.data();
        const transcript = lessonData?.transcript;
        const title = lessonData?.title;

        if (!transcript) {
            return NextResponse.json({ error: "No original transcript found to regenerate from" }, { status: 400 });
        }

        // 2. Generate the new V2 Dual-Scripts based on the original transcript
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        let prompt = VIDEO_LESSON_PROMPT;
        prompt = prompt.replace("{title}", title || "Video Lesson").replace("{transcript}", transcript);

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

        // 3. Format into exactScript type
        const exactScript = {
            ...data.exactScript,
            id: uuidv4(),
            categorySlug: "video_lesson",
            categoryName: "Video Lessons",
            mode: "cloze",
            quizItems: data.exactScript.quizItems?.map((q: any) => ({ ...q, id: uuidv4() })),
            sentences: data.exactScript.sentences?.map((s: any) => ({ ...s, id: uuidv4() }))
        };

        // 4. Format into generalScenario type
        const generalScenario = {
            ...data.generalScenario,
            id: uuidv4(),
            categorySlug: "practice",
            categoryName: "Real Life Practice",
            mode: "standard",
            sentences: data.generalScenario.sentences?.map((s: any) => ({ ...s, id: uuidv4() }))
        };

        // 5. Save both scripts individually to the jok-eng-official account
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

        // 6. Link the new scenarios to the Video Lesson, completely replacing the old
        await lessonRef.update({
            generalScenarioId: generalScenario.id,
            exactScriptId: exactScript.id,
        });

        return NextResponse.json({ success: true, exactScript, generalScenario });

    } catch (error: any) {
        console.error("Upgrade API Error:", error);
        return NextResponse.json({ error: error.message || "Failed to upgrade lesson" }, { status: 500 });
    }
}
