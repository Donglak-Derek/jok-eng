import { getAdminDb } from '../lib/firebase-admin';

async function fixLesson() {
    const db = getAdminDb();

    // 1. Get Video Lesson
    const lessonRef = db.collection('video_lessons').doc('U1wXDnoX9b5K7UJqQ0Ai');
    const lessonSnap = await lessonRef.get();

    if (!lessonSnap.exists) {
        console.log("Video Lesson not found!");
        return;
    }

    const lessonData = lessonSnap.data();
    const generalScenarioId = lessonData?.generalScenarioId;

    if (!generalScenarioId) {
        console.log("No general scenario ID found in video lesson.");
        return;
    }

    // 2. Get Practice Scenario
    const scenarioRef = db.doc(`users/jok-eng-official/scenarios/${generalScenarioId}`);
    const scenarioSnap = await scenarioRef.get();

    if (!scenarioSnap.exists) {
        console.log("Scenario document not found!");
        return;
    }

    const scenarioData = scenarioSnap.data();
    let madeChanges = false;

    // 3. Find and patch mismatched keywords
    scenarioData?.sentences?.forEach((sentence: any) => {
        if (sentence?.goodResponse?.text?.includes('[sacrifice]')) {
            console.log("Found target sentence:", sentence.goodResponse.text);
            sentence.keywords.forEach((kw: any) => {
                if (kw.word === "sweating") {
                    console.log("Patching keyword 'sweating' -> 'sacrifice'");
                    kw.word = "sacrifice"; // Match the blank!
                    kw.definition = "Giving up something valued for the sake of other considerations (often used humorously for style choices).";
                    madeChanges = true;
                }
            });
        }
    });

    if (madeChanges) {
        await scenarioRef.update({ sentences: scenarioData?.sentences });
        console.log("Successfully patched scenario document!");
    } else {
        console.log("No patches needed or matches found.");
    }
}

fixLesson().catch(console.error);
