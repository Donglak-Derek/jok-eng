import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, Content } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are 'The Director', an expert acting coach and English teacher.
Your goal is to help the user define a roleplay scenario by gathering 4 key details:
1. CONTEXT: Where is this happening?
2. MY_ROLE: Who is the user?
3. OTHER_ROLE: Who are they talking to?
4. PLOT: What is the specific goal or conflict?

RULES:
- Be friendly, concise, and professional.
- Ask ONE question at a time.
- Do NOT ask for everything at once.
- If the user gives a short answer (e.g. "Restaurant"), suggest interesting angles (e.g. "Are you complaining about food, or on a date?").
- ALWAYS provide 2-3 short "Smart Chip" suggestions for the user to click.

OUTPUT FORMAT:
You must ALWAYS return a raw JSON object. Do not include markdown formatting like \`\`\`json.
Structure:
{
  "message": "Your response to the user...",
  "suggestions": ["Option 1", "Option 2", "Option 3"],
  "blueprint": { ... } // ONLY include this if you have collected ALL 4 details and are ready to generate.
}

If you have all 4 details (Context, My Role, Other Role, Plot), set "blueprint" to:
{
  "context": "...",
  "myRole": "...",
  "otherRole": "...",
  "plot": "..."
}
and make your message "Great! I have everything regarding [Summary]. Ready to roll?".
`;

export async function POST(request: NextRequest) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is not set");
        }

        const body = await request.json();
        const { messages } = body; // Array of { role: 'user'|'assistant', content: string }

        if (!messages || !Array.isArray(messages)) {
            return new NextResponse("Invalid messages format", { status: 400 });
        }

        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash", 
            systemInstruction: SYSTEM_PROMPT,
            generationConfig: { responseMimeType: "application/json" }
        });

        // Convert frontend messages to Gemini history
        // Frontend: 'assistant' -> Gemini: 'model'
        const history: Content[] = messages
            .slice(0, -1) // All except the last new message
            .map((m: { role: string, content: string }) => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.content }]
            }));

        const lastMessage = messages[messages.length - 1];
        
        const chat = model.startChat({
            history: history
        });

        const result = await chat.sendMessage(lastMessage.content);
        let text = result.response.text();
        
        // Clean markdown just in case, though mimeType json should handle it
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();

        console.log("Director Response:", text); // Debug

        return new NextResponse(text, { 
            headers: { "Content-Type": "application/json" } 
        });

    } catch (error: unknown) {
        console.error("Director API Error:", error);
        return new NextResponse(
            JSON.stringify({ 
                error: "Failed to process chat", 
                details: error instanceof Error ? error.message : "Unknown error" 
            }), 
            { status: 500 }
        );
    }
}
