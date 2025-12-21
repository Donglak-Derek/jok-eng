import { NextRequest, NextResponse } from "next/server";
import { Script } from "@/types";
import { v4 as uuidv4 } from "uuid";

// Mock response for now
const MOCK_SCRIPT: Script = {
  id: "mock-id",
  title: "The Coffee Shop Incident",
  categorySlug: "custom",
  categoryName: "Custom Scenario",
  cleanedEnglish: "Asking for a remake of a wrong coffee order.",
  sentences: [
    {
      id: "1",
      en: "Excuse me, I think there's been a mistake.",
      ko: "저기요, 실수가 있었던 것 같아요.",
      keywords: [{ word: "mistake", meaningKo: "실수" }],
      scenario: "Setting the tone politely",
      badResponse: {
        text: "Hey! You made this wrong!",
        why: "Too aggressive immediately."
      },
      goodResponse: {
        text: "Excuse me, I ordered an iced americano.",
        why: "Direct but polite correction."
      }
    },
    {
        id: "2",
        en: "I ordered an iced americano, but this is hot.",
        ko: "아이스 아메리카노를 시켰는데, 이건 뜨거운 거네요.",
        keywords: [],
    },
    {
        id: "3",
        en: "Could you please remake it for me?",
        ko: "다시 만들어 주실 수 있나요?",
        keywords: [{ word: "remake", meaningKo: "다시 만들다" }],
    }
  ]
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { context, myRole, otherRole, plot } = body;

    // Simulate AI delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In the future, this is where we call OpenAI/Gemini
    // const script = await generateScriptWithAI(context, myRole, otherRole, plot);
    
    const script = {
        ...MOCK_SCRIPT,
        id: uuidv4(),
        title: `${context} - ${myRole} vs ${otherRole}`,
        context: plot.substring(0, 50) + "..."
    };

    return NextResponse.json({ script });
  } catch (error) {
    console.error("Generate Error:", error);
    return new NextResponse("Failed to generate scenario", { status: 500 });
  }
}
