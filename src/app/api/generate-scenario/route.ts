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
    const { context, myRole, otherRole, plot, userName, tone, format, difficulty, length, userProfile } = body;

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

      const prompt = `
      You are an expert social communication coach creating a "Jok-eng" style roleplay script.
      The goal is to teach "Socially Calibrated English" - NOT just grammar, but how to win at social games.

      CONTEXT: ${context}
      USER NAME: ${userName || "User"}
      USER ROLE: ${myRole}
      OTHER ROLE: ${otherRole}
      PLOT SUMMARY: ${plot}
      DESIRED TONE: ${tone || "Polite"}
      TRAINING FORMAT: ${format || "Social Dojo"}
      
      TARGET DIFFICULTY: ${difficulty || "Normal"} 
      (Guide: Beginner = Simple A2. Normal = Everyday B2. Native = Idiomatic C2)
      
      TARGET LENGTH PER CARD: ${length || "Bite-sized"}
      (Guide: Bite-sized = Max 1 sentence per turn.)

      USER PROFILE (Customize based on this):
      - OCCUPATION: ${userProfile?.occupation || "Unknown"} (Use professional metaphors if applicable)
      - MOTHER LANGUAGE: ${userProfile?.motherLanguage || "Unknown"} (Address specific common pragmatic failures for this group)

      *** CRITICAL INSTRUCTION LAYER ***
      1. THE "HIGH STAKES" RULE:
         - Even if the plot is boring (e.g. "Ordering coffee"), you MUST invent a hidden "Urgency" or "Social Risk". 
         - Example: "Ordering coffee... but you are late for a meeting and forgot your wallet."
         - Make the situation feel ALIVE, not robotic.

      2. THE "ENEMY" RULE:
         - The OTHER ROLE should NOT be helpful. They should be slightly difficult, uncharitable, or distracted.
         - This forces the User to be calibrated to "win" the interaction.

      3. THE "PRAGMATIC FAILURE" RULE (Most Important):
         - For the User's "badResponse", do NOT just write bad grammar.
         - The "badResponse" must be grammatically correct but SOCIALLY FATAL.
         - Examples of Fatal Errors:
           * Too Direct (Rude): "Give me water."
           * Too Intimate (Creepy): "You look beautiful today, boss."
           * Too Robotic (Weird): "I request the liquid consumption."
           * Too Passive (Weak): "Um... sorry... if it's okay..."
         - The "goodResponse" must fix this specific social error.

      TASK:
      1. Create a dialogue script. 
      2. STRICT CONSTRAINT: Follow TARGET LENGTH. Users hate walls of text.
      3. English must match TARGET DIFFICULTY.
      4. For the USER'S lines, provide:
         - badResponse: A PRAGMATICALLY FAILED version (Cringe/Rude/Weak).
         - goodResponse: The Socially Calibrated version.
         - why: Explain the SOCIAL COST of the bad response (e.g. "This makes you sound weak/arrogant.").
         - STRICT RULE: NEVER output "N/A", "None", or "Skip". If the bad response is hard to imagine, you MUST invent a "Silence/Awkward Pause" or a "Generic Rude/Dismissive" reaction. Every single user line MUST have a valid "badResponse" text.
      5. KEYWORDS & CLOZE: You MUST identify 1-2 key vocabulary words (or phrases) per sentence that are crucial for the "vibe".
         - IMPORTANT: In the "en" (or "goodResponse.text"), you MUST wrap these keywords in [square brackets] so the app can hide them.
         - Example: "I would like a [refund] please."
      6. CULTURAL CODE: At the end, provide a specific "Cultural Insight" about this situation (e.g. why Americans fake smile, or why brevity is rude in this context).
      7. QUIZ: Generate 3 multiple-choice quiz items testing the social nuance.

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
            "en": "The final GOOD English text for the line",
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
        categorySlug: "custom",
        categoryName: "Custom Scenario",
        cleanedEnglish: data.cleanedEnglish,
        tone: tone || "Polite", // Persist the requested tone
        format: format || "Social Dojo", // Persist the requested format
        difficulty: difficulty || "Normal", // Save difficulty
        length: length || "Bite-sized", // Save length preference
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
