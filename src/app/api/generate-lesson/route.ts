import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from "uuid";
import pRetry from "p-retry";
import { VIDEO_LESSON_PROMPT } from "./prompts";
import { saveVideoLessonAdmin } from "@/lib/videoLessonsAdmin";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
    try {
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

        // Format into Script type
        const script = {
            ...data,
            id: uuidv4(),
            categorySlug: "video_lesson",
            categoryName: "Video Lessons",
            mode: "cloze",
            quizItems: data.quizItems?.map((q: any) => ({ ...q, id: uuidv4() })),
            sentences: data.sentences?.map((s: any) => ({ ...s, id: uuidv4() }))
        };

        // Save to Firestore
        const lessonId = await saveVideoLessonAdmin(youtubeId, title, script, transcript);

        return NextResponse.json({ success: true, lessonId, script });

    } catch (error: any) {
        console.error("Generate Lesson Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
