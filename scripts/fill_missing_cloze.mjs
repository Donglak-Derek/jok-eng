import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
if (!apiKey) {
    console.error("No API key found. Please set GEMINI_API_KEY in .env.local");
    process.exit(1);
}

const generateContent = async (prompt) => {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
        })
    });
    const result = await response.json();
    if (result.error) throw new Error(result.error.message);
    try {
        return JSON.parse(result.candidates[0].content.parts[0].text);
    } catch(e) {
        console.error("Failed to parse JSON:", result.candidates[0].content.parts[0].text);
        throw e;
    }
};

const missionsPath = path.resolve(__dirname, '../src/data/raw_missions/missions.json');
const data = JSON.parse(fs.readFileSync(missionsPath, 'utf8'));

async function processMissions() {
    let updatedCount = 0;
    
    for (const mission of data) {
        let needsUpdate = false;
        
        // 1. Check Cloze
        if (!mission.cloze_keywords || mission.cloze_keywords.length === 0 || !mission.cloze_translations) {
            console.log(`Mission ${mission.day}: Needs cloze keywords/translations`);
            const prompt = `Extract 2 or 3 of the most difficult, useful, or idiomatic English words or short phrases from this text:
            "${mission.cloze_dialogue || mission.cloze_setup || mission.scenario_text}"
            
            Return ONLY a valid JSON object matching this structure:
            {"keywords": ["word1", "word2"], "translations": {"word1": "korean1", "word2": "korean2"}}
            `;
            
            try {
                const response = await generateContent(prompt);
                
                if (response.keywords && response.keywords.length > 0) {
                    mission.cloze_keywords = response.keywords;
                    mission.cloze_translations = response.translations;
                    
                    let sourceText = mission.cloze_dialogue || mission.cloze_setup || mission.scenario_text;
                    let clozeSetupText = sourceText;
                    
                    for (const word of response.keywords) {
                        const regex = new RegExp(`\\b${word}\\b`, 'gi');
                        clozeSetupText = clozeSetupText.replace(regex, '[______]');
                    }
                    mission.cloze_setup = clozeSetupText;
                    needsUpdate = true;
                }
            } catch (e) {
                console.error(`Error generating cloze for day ${mission.day}:`, e);
            }
        }
        
        // 2. Check Quizzes
        if (mission.quiz_items && mission.quiz_items.length === 2) {
            console.log(`Mission ${mission.day}: Needs 3rd quiz item`);
            const prompt = `Generate a 3rd multiple-choice quiz question related to this scenario text:
            "${mission.scenario_text}"
            
            It should be a psychological, cultural, or social dynamic question, NOT just grammar.
            It should follow the format of the two existing questions:
            ${JSON.stringify(mission.quiz_items, null, 2)}
            
            Return ONLY a valid JSON object representing the SINGLE new question representing exactly this structure:
            {"question": "...", "options": ["...", "...", "..."], "correctIndex": 0, "explanation": "..."}
            `;
            
            try {
                const newQuestion = await generateContent(prompt);
                if (newQuestion && newQuestion.question && newQuestion.options && newQuestion.options.length === 3) {
                    mission.quiz_items.push(newQuestion);
                    needsUpdate = true;
                }
            } catch (e) {
                console.error(`Error generating quiz for day ${mission.day}:`, e);
            }
        }
        
        if (needsUpdate) {
            updatedCount++;
            fs.writeFileSync(missionsPath, JSON.stringify(data, null, 2));
        }
        
        await new Promise(r => setTimeout(r, 1000));
    }
    
    console.log(`\nFinished! Updated ${updatedCount} missions.`);
}

processMissions().catch(console.error);
