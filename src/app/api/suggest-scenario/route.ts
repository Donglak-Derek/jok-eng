import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getAdminAuth } from "@/lib/firebase-admin";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.split("Bearer ")[1];
    try {
        await getAdminAuth().verifyIdToken(token);
    } catch (e) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set");
    }

    const body = await request.json();
    const { theme, userProfile } = body;

    // Use Gemini 1.5 Flash for speed and cost
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `
      You are a creative director for a roleplay app.
      Generate a INTERESTING, UNIQUE roleplay scenario for learning English.

      THEME REQUESTED: ${theme || "Random (Any interesting social situation)"}
      
      USER CONTEXT:
      - Job: ${userProfile?.occupation || "Unknown"}
      - Age: ${userProfile?.ageGroup || "Unknown"}
      - Interest: ${userProfile?.topics?.join(", ") || "General Life"}

      INSTRUCTIONS:
      1. Create a "Situation" (Context) that is socially nuanced (e.g., awkward, high-stakes, funny, or professional).
      2. Define the User's Role (My Role) and the Other Person's Role.
      3. Define the "Plot Twist" or specific goal (e.g., "I need to refuse without being rude").
      4. Make it feel fresh, not generic. Avoid "Ordering coffee" unless there is a twist (e.g. "Ordering coffee but I forgot my wallet").

      OUTPUT JSON ONLY:
      {
        "context": "The specific setting and situation",
        "myRole": "Who the user plays",
        "otherRole": "Who the partner plays",
        "plot": "The specific conflict or goal",
        "tone": "Suggested tone (e.g. Polite, Direct, Flirty, Spicy)"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean JSON
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start === -1 || end === -1) throw new Error("Invalid JSON response");
    
    const jsonStr = text.substring(start, end + 1);
    const data = JSON.parse(jsonStr);

    return NextResponse.json(data);

  } catch (error: any) {
    console.error("Suggest Scenario Error:", error);
    return NextResponse.json(
      { error: "Failed to suggest scenario", details: error.message },
      { status: 500 }
    );
  }
}
