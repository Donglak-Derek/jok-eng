import { calculateNewStreak, getStreakStatus } from "./src/lib/gamification.js";

function test() {
    console.log("Starting Streak Logic Tests (48h Limit)");
    
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const twoDays = 48 * 60 * 60 * 1000;
    const threeDays = 72 * 60 * 60 * 1000;

    // Test 1: Recent practice (12h ago)
    const t1 = calculateNewStreak(5, now - (oneDay / 2));
    console.log("Test 1 (12h ago):", t1.newStreak === 5 ? "PASS" : "FAIL", t1);

    // Test 2: Next day practice (25h ago)
    const t2 = calculateNewStreak(5, now - (oneDay + 1000));
    console.log("Test 2 (25h ago):", t2.newStreak === 6 ? "PASS" : "FAIL", t2);

    // Test 3: Grace period practice (47h ago)
    const t3 = calculateNewStreak(5, now - (twoDays - 1000));
    console.log("Test 3 (47h ago):", t3.newStreak === 6 ? "PASS" : "FAIL", t3);

    // Test 4: Expired practice (49h ago)
    const t4 = calculateNewStreak(5, now - (twoDays + 1000));
    console.log("Test 4 (49h ago):", t4.newStreak === 1 ? "PASS" : "FAIL", t4);

    // Test 5: getStreakStatus
    const s1 = getStreakStatus(now - (oneDay / 2));
    const s2 = getStreakStatus(now - (oneDay + 1000));
    const s3 = getStreakStatus(now - (twoDays + 1000));
    console.log("Status Tests:", 
        s1 === "active" ? "P1" : "F1",
        s2 === "at_risk" ? "P2" : "F2",
        s3 === "lost" ? "P3" : "F3"
    );
}

test();
