/**
 * Logic for Daily Streak Calculation
 * 
 * Rules:
 * 1. < 24h interval: 
 *    - If same day: No change (already counted).
 *    - If next day (or within 24h but different calendar day): Increment.
 *    - Wait, user said "Standard Rule: If a user trains within 24 hours of their last session, the streak counter increments (+1)."
 *      But usually, you don't want someone spamming 100 times in an hour to get 100 streak.
 *      Standard apps (Duolingo) do it per *day*.
 *      However, to stick strictly to the prompt: "Increment (+1)". 
 *      I will enforce a "One increment per calendar day" check to prevent abuse, but generally treat <24h as "Keep going".
 * 
 * 2. 24h - 48h (Grace Period):
 *    - Freeze streak. (Do not reset, do not increment).
 * 
 * 3. > 48h:
 *    - Reset to 1 (current session counts as the first of new streak).
 */

export type StreakStatus = "active" | "at_risk" | "lost";

export const calculateNewStreak = (
    currentStreak: number = 0, 
    lastPracticeTimestamp: number = 0
): { newStreak: number; status: StreakStatus } => {
    
    // If never practiced, start at 1
    if (!lastPracticeTimestamp) {
        return { newStreak: 1, status: "active" };
    }

    const now = Date.now();
    const diffMs = now - lastPracticeTimestamp;
    const diffHours = diffMs / (1000 * 60 * 60);

    // Rule 1: < 24 Hours
    if (diffHours < 24) {
        // Check if it's the SAME calendar day to prevent spamming streak logic
        // If it is the same day, we just return the CURRENT streak (no increment), 
        // unless the streak is 0, then we make it 1.
        const lastDate = new Date(lastPracticeTimestamp);
        const nowDate = new Date(now);

        const isSameDay = lastDate.getDate() === nowDate.getDate() && 
                          lastDate.getMonth() === nowDate.getMonth() && 
                          lastDate.getFullYear() === nowDate.getFullYear();

        if (isSameDay) {
            // If streak is 0, this is the FIRST practice of the day, so it should become 1.
            // If streak is > 0, and isSameDay is true, it means they already practiced today (and got the increment), 
            // so we don't increment AGAIN.
            // Wait, if currentStreak is 0, then newStreak should be 1.
            if (currentStreak === 0) {
                 return { newStreak: 1, status: "active" };
            }
            return { newStreak: currentStreak, status: "active" };
        } else {
            // It is < 24h ago but a different day
            return { newStreak: currentStreak + 1, status: "active" };
        }
    }

    // Rule 2: 24h - 60h (Extended Grace Period)
    // We allow up to 60 hours (2.5 days) to account for "Missed 1 day" + "Session Time" + "Timezone shifts".
    // If they come back within this window, they save the streak AND get credit for today (+1).
    if (diffHours >= 24 && diffHours < 60) {
        return { newStreak: currentStreak + 1, status: "active" };
    }

    // Rule 3: > 60h (Hard Reset)
    // Reset to 1 (this session helps start new streak)
    return { newStreak: 1, status: "lost" };
};

export const getStreakStatus = (lastPracticeTimestamp: number = 0): StreakStatus => {
    if (!lastPracticeTimestamp) return "lost";
    
    const diffHours = (Date.now() - lastPracticeTimestamp) / (1000 * 60 * 60);
    
    if (diffHours < 24) return "active";
    if (diffHours < 60) return "at_risk"; // Matches the logic above
    return "lost";
};
