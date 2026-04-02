import { useAuth } from '@/context/AuthContext';

export function useSubscription() {
    const { user, userProfile } = useAuth();

    // Any signed-in user gets Pro access
    const isPro = !!user;

    const canUsePremiumTTS = () => {
        return isPro;
    }

    return {
        subscription: userProfile?.subscription,
        isPro,
        canUsePremiumTTS
    };
}
