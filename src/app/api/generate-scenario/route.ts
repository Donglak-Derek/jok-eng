import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Script } from "@/types";
import { v4 as uuidv4 } from "uuid";
import pRetry from "p-retry";
import { SOCIAL_DOJO_PROMPT, OPEN_MIC_PROMPT, THE_SKIT_PROMPT } from "./prompts";
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
        } catch (e) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is not set");
        }

        const body = await request.json();
        const { context, myRole, otherRole, plot, userName, tone, format, difficulty, length, userProfile } = body;

        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        // 1. ROUTER LOGIC
        let rawPrompt = SOCIAL_DOJO_PROMPT; // Default
        if (format === "Open Mic") {
            rawPrompt = OPEN_MIC_PROMPT;
        } else if (format === "The Skit") {
            rawPrompt = THE_SKIT_PROMPT;
        }

        // 2. FILL VARIABLES
        // Helper to safely replace all occurrences
        const fill = (template: string, key: string, value: string | undefined) => {
            return template.split(`{${key}}`).join(value || "Unknown");
        };

        let prompt = rawPrompt;
        prompt = fill(prompt, "context", context);
        prompt = fill(prompt, "userName", userName || "User");
        prompt = fill(prompt, "myRole", myRole);
        prompt = fill(prompt, "otherRole", otherRole);
        prompt = fill(prompt, "plot", plot);
        prompt = fill(prompt, "tone", tone || "Polite");
        prompt = fill(prompt, "difficulty", difficulty || "Normal");
        prompt = fill(prompt, "length", length || "Bite-sized");
        prompt = fill(prompt, "userOccupation", userProfile?.occupation);
        prompt = fill(prompt, "motherLanguage", userProfile?.motherLanguage);

        const result = await pRetry(
            () => model.generateContent(prompt),
            {
                retries: 3,
                minTimeout: 2000, // Wait 2s, 4s, 8s
                onFailedAttempt: error => {
                    console.log(`Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`);
                }
            }
        );
        const response = await result.response;
        const text = response.text();

        // Clean up markdown if present
        // Robust JSON Extraction (Balanced Braces)
        const start = text.indexOf('{');
        if (start === -1) throw new Error("No JSON found in response");

        let nesting = 0;
        let inString = false;
        let escaped = false;
        let end = -1;

        for (let i = start; i < text.length; i++) {
            const char = text[i];
            if (inString) {
                if (char === '\\') escaped = !escaped;
                else if (char === '"' && !escaped) inString = false;
                else escaped = false;
            } else {
                if (char === '"') inString = true;
                else if (char === '{') nesting++;
                else if (char === '}') {
                    nesting--;
                    if (nesting === 0) {
                        end = i;
                        break;
                    }
                }
            }
        }

        if (end === -1) throw new Error("Malformed JSON: Unbalanced braces");
        const jsonString = text.substring(start, end + 1);

        console.log("AI Raw Response (Cleaned):", jsonString);

        const data = JSON.parse(jsonString);

        const script: Script = {
            id: uuidv4(),
            title: data.title,
            categorySlug: "custom", // Should this change based on mode? Maybe "open-mic-custom"? Keeping simple for now.
            categoryName: format || "Custom Scenario",
            cleanedEnglish: data.cleanedEnglish,
            tone: tone || "Polite", // Persist the requested tone
            format: format || "Social Dojo", // Persist the requested format
            difficulty: difficulty || "Normal", // Save difficulty
            length: length || "Bite-sized", // Save length preference
            culturalInsights: data.culturalInsights,
            seriesId: data.seriesId, // NEW: Episodic content
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            quizItems: data.quizItems?.map((q: any) => ({ ...q, id: uuidv4() })),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            sentences: data.sentences.map((s: any) => ({
                ...s,
                id: uuidv4(), // Ensure fresh IDs
            }))
        };

        return NextResponse.json({ script });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Generate Scenario Error:", error);

        // Check for specific Gemini errors
        if (error.message?.includes("API key")) {
            return new NextResponse(
                JSON.stringify({ error: "Invalid or missing API Key. Check server logs." }),
                { status: 401 }
            );
        }

        return new NextResponse(
            JSON.stringify({
                error: "Failed to generate scenario.",
                details: error.message || "Unknown error"
            }),
            { status: 500 }
        );
    }
}
