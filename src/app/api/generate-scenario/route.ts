import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Script } from "@/types";
import { v4 as uuidv4 } from "uuid";
import pRetry from "p-retry";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set");
    }

    const body = await request.json();
    const { context, myRole, otherRole, plot, userName } = body;

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

      const prompt = `
      You are an expert social communication coach creating a "Jok-eng" style roleplay script.
      The goal is to teach "Socially Calibrated English" - not just correct grammar, but the *right* vibe.

      CONTEXT: ${context}
      USER NAME: ${userName || "User"}
      USER ROLE: ${myRole}
      OTHER ROLE: ${otherRole}
      PLOT SUMMARY: ${plot}

      TASK:
      1. Create a dialogue script (4-6 exchanges).
      2. The English MUST be "Real, Modern English" (Use idioms, softeners like 'just', 'actually', generic slang if appropriate). NO textbook robot speak.
      3. CRITICAL: For the USER'S lines, provide a "badResponse" and a "goodResponse".
         - badResponse: A grammatically correct but SOCIALLY WRONG way to say it (e.g., too blunt, too formal, robotic, accidental rude).
         - goodResponse: The socially calibrated, natural way.
         - why: Explain the SOCIAL difference (e.g., "The bad version sounds like a police report. The good version builds rapport.").

      OUTPUT FORMAT:
      Return ONLY a raw JSON object (no markdown) matching this structure:
      {
        "title": "Short catchy title (e.g. 'The awkward elevator ride')",
        "cleanedEnglish": "One sentence summary of the social goal",
        "sentences": [
          {
            "id": "1",
            "en": "The final GOOD English text for the line",
            "keywords": [{"word": "vocab", "definition": "Short definition"}],
            "scenario": "The specific micro-situation (e.g. 'Trying to interrupt politely')",
            "badResponse": {"text": "The awkward/robotic version", "why": "Why it kills the vibe"},
            "goodResponse": {"text": "The smooth/natural version", "why": "Why it works socially"}
          }
        ]
      }
    `;

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
    let text = response.text();

    // Clean up markdown if present
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    console.log("AI Raw Response:", text); // Debug log

    const data = JSON.parse(text);

    const script: Script = {
        id: uuidv4(),
        title: data.title,
        categorySlug: "custom",
        categoryName: "Custom Scenario",
        cleanedEnglish: data.cleanedEnglish,
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
