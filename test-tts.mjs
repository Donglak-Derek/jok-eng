import { Communicate } from "edge-tts-universal";

async function main() {
  console.log("Starting test...");
  try {
    console.log("Creating Communicate instance...");
    const comm = new Communicate("Hello world", { voice: "en-US-ChristopherNeural" });
    
    console.log("Calling stream()...");
    const generator = comm.stream();
    
    console.log("Starting iteration...");
    let count = 0;
    for await (const chunk of generator) {
        console.log(`Received chunk of type: ${chunk.type}`);
        if (chunk.type === "audio") {
            count += chunk.data.length;
            process.stdout.write("."); // Progress dot
        }
    }
    console.log(`\nSuccess! Received ${count} bytes.`);
  } catch (err) {
    console.error("\nTTS Failed:", err);
  }
}

main();
