const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");
const fs = require("fs");

// Manually read .env.local because we are running this with ts-node/node directly
const envPath = path.resolve(process.cwd(), ".env.local");
const envFile = fs.readFileSync(envPath, "utf8");
const apiKeyLine = envFile.split("\n").find((line) => line.startsWith("GEMINI_API_KEY="));
const apiKey = apiKeyLine ? apiKeyLine.split("=")[1].trim() : null;

if (!apiKey) {
  console.log("No GEMINI_API_KEY found in .env.local");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
  try {
    // This is not directly exposed in the high-level SDK easily for simple listing in some versions, 
    // but let's try to just use a known model and see if we can get a specific error or if there is a list method.
    // Actually, the SDK doesn't have a simple "listModels" on the instance.
    // We have to use the model manager if exposed, or just try to generate with a fallback.
    
    // Changing strategy: Let's try to generate with 'gemini-1.5-flash' again but print the FULL error structure.
    // The previous error was 404.
    
    // Wait, let's look at the error... "Call ListModels to see the list..."
    // We can use the REST API to list models if the SDK doesn't make it easy.
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    
    if (data.models) {
        console.log("Available Models:");
        data.models.forEach(m => {
            if (m.supportedGenerationMethods?.includes("generateContent")) {
                console.log(`- ${m.name.replace("models/", "")}`);
            }
        });
    } else {
        console.log("Error listing models:", data);
    }

  } catch (error) {
    console.error("Error:", error);
  }
}

listModels();
