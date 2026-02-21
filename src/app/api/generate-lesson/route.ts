import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from "uuid";
import pRetry from "p-retry";
import { VIDEO_LESSON_PROMPT } from "./prompts";
import { saveVideoLessonAdmin } from "@/lib/videoLessonsAdmin";
import { getAdminAuth } from "@/lib/firebase-admin";

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
            // Only official admin can generate these.
            if (decodedToken.uid !== "Hx4sxBjGaLST6c3MRWtrKn60c702") {
                return NextResponse.json({ error: "Forbidden" }, { status: 403 });
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
