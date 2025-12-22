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
    const { context, myRole, otherRole, plot } = body;

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `
      You are an expert English tutor creating a "Jok-eng" style roleplay scenario.
      
      CONTEXT: ${context}
      USER ROLE: ${myRole}
      OTHER ROLE: ${otherRole}
      PLOT SUMMARY: ${plot}

      TASK:
      1. Create a funny, natural, and useful roleplay script (3-6 sentences).
      2. The English should be natural "Real English", not textbook style.
      3. For each sentence, provide the English text, a Korean translation, and 1-2 key vocabulary words.
      4. Crucial: For the USER'S lines, provide a "badResponse" (a common mistake/rude way to say it) and a "goodResponse" (the better way you wrote).

      OUTPUT FORMAT:
      Return ONLY a raw JSON object (no markdown, no backticks) matching this structure:
      {
        "title": "Short catchy title",
        "cleanedEnglish": "One sentence summary of the goal",
        "sentences": [
          {
            "id": "1",
            "en": "English text",
            "ko": "Korean translation",
            "keywords": [{"word": "vocab", "meaningKo": "meaning"}],
            "scenario": "Short context for this line (e.g. 'Opening', 'Refusal')",
            "badResponse": {"text": "Mistake version", "why": "Why it is bad"},
            "goodResponse": {"text": "Better version", "why": "Why it is good"}
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
