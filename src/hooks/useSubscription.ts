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

             const now = Date.now();
             const ONE_DAY_MS = 24 * 60 * 60 * 1000;
             const timeSinceLastRefill = now - sub.credits.lastRefill;

             // If more than 24 hours have passed, reset credits
             if (timeSinceLastRefill > ONE_DAY_MS) {
                 console.log("🔄 Subscription: Refilling credits...");
                 try {
                     const userRef = doc(db, 'users', user.uid);
                     
                     // Determine refresh amount based on tier
                     const limit = sub.tier === 'pro' ? 15 : 3;
                     
                     await updateDoc(userRef, {
                        "subscription.credits.usage": 0,
                        "subscription.credits.lastRefill": now,
                        "subscription.credits.dailyLimit": limit 
                     });

                     await refreshProfile(); // Sync local state
                 } catch (e) {
                     console.error("Failed to refill credits", e);
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
