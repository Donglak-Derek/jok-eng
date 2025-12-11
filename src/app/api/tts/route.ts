import { NextRequest, NextResponse } from "next/server";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const text = searchParams.get("text");
  const voice = searchParams.get("voice") || "en-US-AriaNeural";

  if (!text) {
    return new NextResponse("Missing text", { status: 400 });
  }

  try {
    const tts = new MsEdgeTTS();
    await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    const result = await tts.toStream(text);
    const readable = result.audioStream;

    const stream = new ReadableStream({
        start(controller) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            readable.on("data", (chunk: any) => controller.enqueue(chunk));
            readable.on("end", () => controller.close());
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            readable.on("error", (err: any) => controller.error(err));
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
