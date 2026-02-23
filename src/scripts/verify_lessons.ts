import { getAdminDb } from '../lib/firebase-admin';

async function verifyAllLessons() {
    const db = getAdminDb();
    const lessonsRef = db.collection('video_lessons');
    const snapshot = await lessonsRef.get();

    console.log(`Found ${snapshot.size} video lessons to check.`);

    const mismatchedSentences: any[] = [];

    for (const doc of snapshot.docs) {
        const lesson = doc.data();
        console.log(`\n--- Checking Lesson: ${lesson.title} ---`);

        const scenarioIds = [
            { id: lesson.exactScriptId, type: 'exactScript' },
            { id: lesson.generalScenarioId, type: 'generalScenario' }
        ].filter(s => s.id);

        for (const { id, type } of scenarioIds) {
            const scenarioRef = db.doc(`users/jok-eng-official/scenarios/${id}`);
            const scenarioSnap = await scenarioRef.get();

            if (!scenarioSnap.exists) {
                console.log(`Missing ${type} document: ${id}`);
                continue;
            }

            const scenario = scenarioSnap.data();
            let hasMismatches = false;

            scenario?.sentences?.forEach((sentence: any, idx: number) => {
                // Determine which text has the cloze bracket
                const clozeText = type === 'generalScenario' && sentence.goodResponse?.text
                    ? sentence.goodResponse.text
                    : sentence.en;

                // Extract bracketed words
                const matches = clozeText.match(/\[(.*?)\]/g) || [];
                const bracketedWords = matches.map((m: string) => m.slice(1, -1).toLowerCase().replace(/[^\w\s-]/g, ''));

                // Extract keyword words
                const keywordWords = (sentence.keywords || []).map((kw: any) => kw.word.toLowerCase().replace(/[^\w\s-]/g, ''));

                // Check for strict overlap
                const mismatch = bracketedWords.some((bw: string) => !keywordWords.includes(bw)) ||
                    keywordWords.some((kw: string) => !bracketedWords.includes(kw));

                if (mismatch && (bracketedWords.length > 0 || keywordWords.length > 0)) {
                    hasMismatches = true;
                    mismatchedSentences.push({
                        lesson: lesson.title,
                        type,
                        scenarioId: id,
                        sentenceIndex: idx,
                        text: clozeText,
                        brackets: bracketedWords,
                        keywords: sentence.keywords
                    });
                }
            });

            if (!hasMismatches) {
                console.log(`${type} (${id}): OK`);
            } else {
                console.log(`${type} (${id}): MISMATCHES FOUND`);
            }
        }
    }

    console.log(`\n=== SUMMARY OF MISMATCHES ===`);
    console.log(JSON.stringify(mismatchedSentences, null, 2));
}

verifyAllLessons().catch(console.error);
