import { useAuth } from "@/context/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";

export function usePremiumAccess(categorySlug: string) {
    const { user } = useAuth();
    const { subscription } = useSubscription();

    if (!user) return false;

    // Pro users get everything
    if (subscription?.tier === "pro") return true;

    // Freemium users get access if they bought this specific category
    // (We will expand userProfile to have purchasedCategories later, 
    // but for now, we will return false for freemium unless it's a free category)
    // NOTE: For now, we will rely strictly on Pro tier until one-time buys are wired to Stripe.

    return false;
}
