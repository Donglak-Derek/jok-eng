import { NextRequest, NextResponse } from "next/server";
import { Communicate } from "edge-tts-universal";
import * as googleTTS from "google-tts-api";

const GOOGLE_API_KEY = process.env.GOOGLE_TTS_API_KEY;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const text = searchParams.get("text");
  const voice = searchParams.get("voice") || "en-US-AriaNeural";

  if (!text) {
    return new NextResponse("Missing text", { status: 400 });
  }

  // 1. Helper: Google Cloud TTS (Official)
  const streamOfficialGoogleTTS = async (text: string, controller: ReadableStreamDefaultController) => {
    if (!GOOGLE_API_KEY) throw new Error("No Google Cloud API Key");

    // Map Edge voices to Google voices if needed, or default to a good Neural voice
    // en-US-AriaNeural (Female) -> en-US-Neural2-F (Female)
    // en-US-GuyNeural (Male) -> en-US-Neural2-D (Male)
    let googleVoice = "en-US-Neural2-F"; 
    if (voice.includes("Guy") || voice.includes("Male")) {
        googleVoice = "en-US-Neural2-D";
    }

    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_API_KEY}`;
    
    // Google Cloud requires JSON body
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            input: { text },
            voice: { languageCode: "en-US", name: googleVoice },
            audioConfig: { audioEncoding: "MP3" },
        }),
    });

    if (!response.ok) {
        throw new Error(`Google Cloud API Error: ${response.status} ${await response.text()}`);
    }

    // Response is JSON with "audioContent" (base64)
    const data = await response.json();
    if (data.audioContent) {
        // Convert Base64Str to Uint8Array
        const binaryString = atob(data.audioContent);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        controller.enqueue(bytes);
    } else {
        throw new Error("No audio content in response");
    }
  };


  // 2. Helper: Google Translate TTS (Unofficial Fallback)
  const streamGoogleTranslateTTS = async (text: string, controller: ReadableStreamDefaultController) => {
    try {
        // google-tts-api splits text > 200 chars.
        const results = googleTTS.getAllAudioUrls(text, {
            lang: 'en',
            slow: false,
            host: 'https://translate.google.com',
            // splitPunctuation: true, // Removed invalid option
        });

        for (const item of results) {
            const controllerSignal = new AbortController();
            const timeoutId = setTimeout(() => controllerSignal.abort(), 10000); // 10s timeout for Google

            try {
                const response = await fetch(item.url, { signal: controllerSignal.signal });
                clearTimeout(timeoutId);

                if (!response.ok) throw new Error(`Google Translate fetch error: ${response.status}`);
                
                const reader = response.body?.getReader();
                if (reader) {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        controller.enqueue(value);
                    }
                }
            } catch (err) {
                clearTimeout(timeoutId);
                throw err;
            }
        }
    } catch (err) {
        console.error("Google Translate Fallback failed:", err);
        throw err;
    }
  };

  try {
    const stream = new ReadableStream({
      async start(controller) {
        try {
            // STEP 1: Try Official Google Cloud TTS
            // Only runs if Key is configured
            if (GOOGLE_API_KEY) {
                console.log("Attempting Google Cloud TTS (Official)...");
                try {
                    await streamOfficialGoogleTTS(text, controller);
                    controller.close();
                    return; // Success!
                } catch (cloudErr) {
                    console.warn("Google Cloud TTS failed, failing over...", cloudErr);
                }
            }

            // STEP 2: Try Google Translate TTS (Unofficial)
            console.log("Attempting Google Translate fallback...");
            try {
                await streamGoogleTranslateTTS(text, controller);
                controller.close();
                return;
            } catch (googleErr) {
                console.warn("Google Translate TTS failed, switching to Edge TTS...", googleErr);
            }

            // STEP 3: Fallback to Edge TTS - REMOVED (Unstable)
            // If both Google Cloud and Google Translate fail, we throw error.
            
            throw new Error("All TTS providers failed.");
            
        } catch (err) {
            console.error("Stream controller error:", err);
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
    console.error("TTS Setup Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
