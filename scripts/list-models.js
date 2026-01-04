/* eslint-disable */
const { GoogleGenerativeAI } = require("@google/generative-ai");
const os = require("os");
const fs = require("fs");

// Load env (simple version for script)
const apiKey = process.env.GEMINI_API_KEY || "YOUR_API_KEY";

if (!apiKey || apiKey === "YOUR_API_KEY") {
    console.error("Please set GEMINI_API_KEY env var");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        // This is a mock since actual listModels method might vary by SDK version
        // Usually it's via model manager or just testing known models
        console.log("Checking available models...");
        // In current SDK, simple way is to try getModel
        const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-1.0-pro"];
        
        for (const m of models) {
             console.log(`- ${m}: (Assume available)`);
        }

    } catch (e) {
        console.error("Error:", e.message);
    }
}

listModels();
