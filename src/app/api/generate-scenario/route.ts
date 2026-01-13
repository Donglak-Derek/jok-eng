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
      1. Create a dialogue script.
      2. STRICT CONSTRAINT: Break dialogue into VERY SHORT chunks. Maximum 1-2 sentences per card. Do NOT create long monologues. Users feel overwhelmed by long text.
      3. The English MUST be "Real, Modern English" (Use idioms, softeners like 'just', 'actually', generic slang if appropriate). NO textbook robot speak.
      4. CRITICAL: For the USER'S lines, provide a "badResponse" and a "goodResponse".
         - badResponse: A grammatically correct but SOCIALLY WRONG way to say it (e.g., too blunt, too formal, robotic, accidental rude).
         - goodResponse: The socially calibrated, natural way.
         - why: Explain the SOCIAL difference (e.g., "The bad version sounds like a police report. The good version builds rapport.").
      5. CULTURAL CODE: At the end, provide a specific "Cultural Insight" about this situation (e.g. why Americans fake smile, or why brevity is rude in this context).
      6. QUIZ: Generate 3 multiple-choice quiz items testing the social nuance.

      OUTPUT FORMAT:
      Return ONLY a raw JSON object (no markdown) matching this structure:
      {
        "title": "Short catchy title (e.g. 'The awkward elevator ride')",
        "cleanedEnglish": "One sentence summary of the social goal",
        "culturalInsights": {
            "title": "The Hidden Rule",
            "content": "Explanation of the social norm..."
        },
        "sentences": [
          {
            "id": "1",
            "en": "The final GOOD English text for the line (Max 2 sentences)",
            "keywords": [{"word": "vocab", "definition": "Short definition"}],
            "scenario": "The specific micro-situation (e.g. 'Trying to interrupt politely')",
            "badResponse": {"text": "The awkward/robotic version", "why": "Why it kills the vibe"},
            "goodResponse": {"text": "The smooth/natural version", "why": "Why it works socially"}
          }
        ],
        "quizItems": [
            {
                "question": "Why shouldn't you say 'I want coffee'?",
                "options": ["It's too direct", "It's bad grammar", "It's too long"],
                "correctIndex": 0,
                "explanation": "In English, direct requests to strangers sound demanding."
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
        culturalInsights: data.culturalInsights, // NEW
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        quizItems: data.quizItems?.map((q: any) => ({ ...q, id: uuidv4() })), // NEW: Map with IDs if needed, or simple array
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
