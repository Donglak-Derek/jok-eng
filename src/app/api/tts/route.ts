import { NextRequest, NextResponse } from "next/server";
import { Communicate } from "edge-tts-universal";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const text = searchParams.get("text");
  const voice = searchParams.get("voice") || "en-US-AriaNeural";

  if (!text) {
    return new NextResponse("Missing text", { status: 400 });
  }

  try {
    const comm = new Communicate(text, { voice });
    
    // Create a ReadableStream from the async iterator
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // comm.stream() returns an async iterator
          for await (const chunk of comm.stream()) {
            if (chunk.type === "audio") {
              controller.enqueue(chunk.data);
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error) {
    console.error("TTS Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
