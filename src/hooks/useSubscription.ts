import { useAuth } from '@/context/AuthContext';
import { UserSubscription } from '@/types';

export function useSubscription() {
    const { userProfile } = useAuth();

    const isPro = userProfile?.subscription?.tier === 'pro';

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

    return {
        subscription: userProfile?.subscription,
        isPro,
        canUsePremiumTTS
    };
}
