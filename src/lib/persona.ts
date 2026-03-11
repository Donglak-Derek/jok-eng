/**
 * Simple calculation engine for analyzing Vibe Scores to brand a User Persona.
 * MVP Version: Based on the immediate success score and existing persona.
 */

export function calculatePersona(latestVibeScore: number, currentPersona?: string): string {
    // If they score perfect 95+ frequently, they are a Power Player.
    // If they score 80-94, they might be the Silent Expert.
    
    if (latestVibeScore >= 95) {
        // If they were already a Power Player, keep it.
        // If they were getting better, upgrade them.
        return "The Power Player";
    }

    if (latestVibeScore >= 80 && latestVibeScore < 95) {
        if (currentPersona === "The Power Player") {
            // Give them grace, keep their title.
            return "The Power Player";
        }
        return "The Silent Expert";
    }

    // Default fallback persona
    return currentPersona || "The Observer";
}
