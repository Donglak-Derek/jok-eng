import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserSubscription } from '@/types';

export function useSubscription() {
    const { user, userProfile, refreshProfile } = useAuth();

    // Auto-refill logic
    useEffect(() => {
        if (!user || !userProfile?.subscription) return;

        const checkRefill = async () => {
            const sub = userProfile.subscription as UserSubscription;
            if (!sub) return;

            const now = new Date();
            const lastRefillDate = new Date(sub.credits.lastRefill);

            // Logic 1: Calendar Day Reset (Local Time)
            // Check if "today" is a different calendar day than "last refill"
            const isNewDay = now.toDateString() !== lastRefillDate.toDateString();

            // Logic 2: Tier Limit Sync (Fix for Pro Upgrade lag)
            const expectedLimit = sub.tier === 'pro' ? 15 : 3;
            const needsLimitUpdate = sub.credits.dailyLimit !== expectedLimit;

            if (isNewDay || needsLimitUpdate) {
                console.log(`🔄 Subscription: ${isNewDay ? "New Day Refill" : "Syncing Tier Limit"}...`);
                try {
                    const userRef = doc(db, 'users', user.uid);

                    // If it's a new day, reset usage to 0. 
                    // If it's just a tier change (same day), keep usage but update limit.
                    const updates: Record<string, string | number> = {
                        "subscription.credits.dailyLimit": expectedLimit
                    };

                    if (isNewDay) {
                        updates["subscription.credits.usage"] = 0;
                        updates["subscription.credits.lastRefill"] = now.getTime();
                    }

                    await updateDoc(userRef, updates);
                    await refreshProfile(); // Sync local state
                } catch (e) {
                    console.error("Failed to update subscription", e);
                }
            }
        };

        checkRefill();
    }, [user, userProfile]);

    // Helpers
    const creditsUsed = userProfile?.subscription?.credits?.usage || 0;
    const dailyLimit = userProfile?.subscription?.credits?.dailyLimit || 3;
    const creditsRemaining = Math.max(0, dailyLimit - creditsUsed);
    const isPro = userProfile?.subscription?.tier === 'pro';

    const canCreateScenario = () => {
        if (isPro) return creditsUsed < 15;
        return creditsUsed < 3;
    };

    // Only 'Pro' users can generate Premium audio (initially)
    // But actually, we might want to gate *generation* of audio? 
    // Plan says: Pro users get Premium voices. 
    // Replay is free for everyone if cached.
    // So this check is for "Should we call Google Cloud?"
    // If Free user -> No.
    // If Pro user -> Yes.
    const canUsePremiumTTS = () => {
        return isPro;
    }

    const incrementUsage = async () => {
        if (!user) return;
        try {
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, {
                "subscription.credits.usage": creditsUsed + 1
            });
            await refreshProfile();
        } catch (e) {
            console.error("Failed to increment usage", e);
        }
    };

    return {
        subscription: userProfile?.subscription,
        isPro,
        credits: {
            used: creditsUsed,
            limit: dailyLimit,
            remaining: creditsRemaining
        },
        canCreateScenario,
        canUsePremiumTTS,
        incrementUsage
    };
}
