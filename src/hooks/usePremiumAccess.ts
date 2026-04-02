import { useAuth } from "@/context/AuthContext";

export function usePremiumAccess(categorySlug: string) {
    const { user } = useAuth();

    if (!user) return false;

    // For now, all logged-in users have access to all base categories.
    // In the future, paid store categories will check userProfile?.purchasedModules.
    return true;
}
