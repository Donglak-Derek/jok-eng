import { getAdminDb } from '../lib/firebase-admin';

async function patchAllScenarios() {
    const db = getAdminDb();

    // 1. "The Taco Independence Day" generalScenario (bec01417-bef4-4aef-b3b0-e25d2178acd3)
    let s1 = await db.doc(`users/jok-eng-official/scenarios/bec01417-bef4-4aef-b3b0-e25d2178acd3`).get();
    let d1 = s1.data();
    if (d1 && d1.sentences) {
        d1.sentences[0].goodResponse.text = "Oh, I'm [pumped]. My sweater is so ugly it should be illegal.";
        d1.sentences[1].goodResponse.text = "Hey, if I'm gonna work [overtime], I might as well adopt this [strategy].";
        d1.sentences[2].goodResponse.text = "I'm not just going to win, I'm going to [respect] the [tradition].";
        d1.sentences[3].goodResponse.text = "I'm bringing the [snacks]. It takes real [dedication], after all!";
        d1.sentences[4].goodResponse.text = "See ya in the [breakroom], you bold [patriot]! Get ready to lose!";
        await s1.ref.update({ sentences: d1.sentences });
        console.log("Patched bec01417-bef4-4aef-b3b0-e25d2178acd3");
    }

    // 2. "Respect Taco" exactScript (0741e1f4-d804-49a6-b979-ee8179881306)
    let s2 = await db.doc(`users/jok-eng-official/scenarios/0741e1f4-d804-49a6-b979-ee8179881306`).get();
    let d2 = s2.data();
    if (d2 && d2.sentences) {
        d2.sentences[1].keywords.push({ word: "event", definition: "A planned public or social occasion." });
        d2.sentences[3].keywords.push({ word: "respect", definition: "To show honor or high regard for something." });
        d2.sentences[4].keywords.push({ word: "experiment", definition: "A scientific procedure undertaken to make a discovery." });
        d2.sentences[5].keywords.push({ word: "right", definition: "Morally good, justified, or acceptable." });
        await s2.ref.update({ sentences: d2.sentences });
        console.log("Patched 0741e1f4-d804-49a6-b979-ee8179881306");
    }

    // 3. "Respect Taco" generalScenario (6649c0b3-b0a8-47f9-9974-3a2ba5dc6342)
    let s3 = await db.doc(`users/jok-eng-official/scenarios/6649c0b3-b0a8-47f9-9974-3a2ba5dc6342`).get();
    let d3 = s3.data();
    if (d3 && d3.sentences) {
        d3.sentences[0].goodResponse.text = "Yeah, I wanted to bring my [blazer] to this grill-out.";
        d3.sentences[1].goodResponse.text = "The [grease] is a risk I'm willing to take to show respect.";
        d3.sentences[2].goodResponse.text = "Exactly. Someone without an [apron] needs to balance out the vibe with some class.";
        d3.sentences[4].goodResponse.text = "Call me [hopeless], but make it a cloth napkin. A man has standards.";
        await s3.ref.update({ sentences: d3.sentences });
        console.log("Patched 6649c0b3-b0a8-47f9-9974-3a2ba5dc6342");
    }

    // 4. "What does 'Netflix and Chill' mean to you?" generalScenario (a65f0cc2-284b-4276-ad57-e1ccf55a94dc)
    let s4 = await db.doc(`users/jok-eng-official/scenarios/a65f0cc2-284b-4276-ad57-e1ccf55a94dc`).get();
    let d4 = s4.data();
    if (d4 && d4.sentences) {
        d4.sentences[0].goodResponse.text = "No big [plans] for the [weekend], just going to keep it low-key.";
        d4.sentences[1].goodResponse.text = "I need to [stay] in and [relax] to catch up on some sleep!";
        d4.sentences[2].goodResponse.text = "Actually, I just started [watching] that new documentary and it's [good].";
        d4.sentences[3].goodResponse.text = "I'm [binging] the latest true-[crime] season.";
        d4.sentences[4].goodResponse.text = "Thanks! Have a [great] [time] too!";
        await s4.ref.update({ sentences: d4.sentences });
        console.log("Patched a65f0cc2-284b-4276-ad57-e1ccf55a94dc");
    }
}

patchAllScenarios().catch(console.error);
