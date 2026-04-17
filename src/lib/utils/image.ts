/**
 * Handles legacy image path mapping during the JokEng rebranding.
 * Converts old '/images/missions/' paths to the new '/images/sessions/' folder.
 */
export const fixImagePath = (path: string | undefined): string | undefined => {
    if (!path) return path;
    if (path.startsWith("/images/missions/")) {
        return path.replace("/images/missions/", "/images/sessions/");
    }
    return path;
};
