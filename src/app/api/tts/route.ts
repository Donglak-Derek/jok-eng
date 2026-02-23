import { NextRequest, NextResponse } from "next/server";
import * as googleTTS from "google-tts-api";
import { getAdminStorage } from "@/lib/firebase-admin";
import crypto from "crypto";

const GOOGLE_API_KEY = process.env.GOOGLE_TTS_API_KEY;

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const text = searchParams.get("text");
    const voice = searchParams.get("voice") || "en-US-AriaNeural";

    if (!text) {
        return new NextResponse("Missing text", { status: 400 });
    }

    // 0. GENERATE CACHE HASH
    const hash = crypto.createHash("md5").update(`${text}_${voice}`).digest("hex");
    const cacheFilePath = `tts_cache/${hash}.mp3`;

    try {
        const bucket = getAdminStorage().bucket();
        const file = bucket.file(cacheFilePath);

        // 1. CHECK CACHE
        const [exists] = await file.exists();
        if (exists) {
            console.log(`Cache HIT: ${cacheFilePath} - Streaming from Firebase Storage`);
            const stream = file.createReadStream();
            // Convert Node stream to Web Stream for Edge Response
            const webStream = new ReadableStream({
                start(controller) {
                    stream.on('data', (chunk) => controller.enqueue(chunk));
                    stream.on('end', () => controller.close());
                    stream.on('error', (err) => controller.error(err));
                }
            });
            return new NextResponse(webStream, { headers: { "Content-Type": "audio/mpeg" } });
        }

        console.log(`Cache MISS: ${cacheFilePath} - Generating via Google TTS`);

        // 2. GENERATE AND CACHE (Official Google Cloud TTS)
        if (GOOGLE_API_KEY) {
            let googleVoice = "en-US-Neural2-F";
            if (voice.includes("Guy") || voice.includes("Male")) {
                googleVoice = "en-US-Neural2-D";
            }

            const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_API_KEY}`;
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

            const data = await response.json();
            if (data.audioContent) {
                // Google gives Base64 format
                const audioBuffer = Buffer.from(data.audioContent, 'base64');

                // Await the upload so the serverless function doesn't terminate the promise
                try {
                    await file.save(audioBuffer, {
                        metadata: { contentType: "audio/mpeg" },
                    });
                } catch (e) {
                    console.error("Failed to cache TTS to storage", e);
                }

                // Return to client immediately
                return new NextResponse(audioBuffer, {
                    headers: { "Content-Type": "audio/mpeg" },
                });
            }
        }

        // 3. Fallback: Google Translate (Unofficial, Not Cached)
        console.log("Attempting Google Translate fallback...");
        const translatorStream = new ReadableStream({
            async start(controller) {
                try {
                    const results = googleTTS.getAllAudioUrls(text, {
                        lang: 'en',
                        slow: false,
                        host: 'https://translate.google.com',
                    });

                    for (const item of results) {
                        const controllerSignal = new AbortController();
                        const timeoutId = setTimeout(() => controllerSignal.abort(), 10000);

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
                    controller.close();
                } catch (e) {
                    console.error("Translate Fallback error", e);
                    controller.error(e);
                }
            }
        });

        return new NextResponse(translatorStream, { headers: { "Content-Type": "audio/mpeg" } });

    } catch (error) {
        console.error("TTS Setup Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
