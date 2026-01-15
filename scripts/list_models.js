const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  // Note: getGenerativeModel doesn't list models, we need to inspect via a different method or just try to generate to verify.
  // Actually, there isn't a direct "listModels" helper in the high-level SDK easily accessible without setup?
  // Use the admin API or just try to run a simple generation with different models.
  
  // Read .env.local manually
  const fs = require('fs');
  const path = require('path');
  let apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    try {
        const envPath = path.resolve(__dirname, '../.env.local');
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/GEMINI_API_KEY=(.*)/);
        if (match) {
            apiKey = match[1].trim();
        }
    } catch (e) {
        console.error("Could not read .env.local");
    }
  }

  if (!apiKey) {
      console.error("No API Key found.");
      return;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  
  try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("Available Models:");
      if (data.models) {
          data.models.forEach(m => console.log(m.name));
      } else {
          console.log("No models found or error:", data);
      }
  } catch (e) {
      console.error("Error fetching models:", e);
  }
}

listModels();
