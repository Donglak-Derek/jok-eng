"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut 
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  userProfile: any | null; // Typed as any to avoid circular deps for now
  loading: boolean;
  refreshProfile: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  refreshProfile: async () => {},
  signInWithGoogle: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [userProfile, setUserProfile] = useState<any | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
         try {
            // Fetch Profile
            const { doc, getDoc } = await import("firebase/firestore");
            const { db } = await import("@/lib/firebase");
            const ref = doc(db, "users", user.uid);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                setUserProfile(snap.data());
            }
         } catch (e) {
            console.error("Error fetching profile", e);
         }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshProfile = async () => {
    if (!user) return;
    try {
        const { doc, getDoc } = await import("firebase/firestore");
        const { db } = await import("@/lib/firebase");
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
            setUserProfile(snap.data());
        }
    } catch (e) {
        console.error("Refreh profile failed", e);
    }
  };

  const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');

        await signInWithPopup(auth, provider);
        // State will update in useEffect
    } catch (error) {
        console.error("Error signing in with Google", error);
        throw error;
    }
  };

  const logout = async () => {
    try {
        await signOut(auth);
        setUserProfile(null);
    } catch (error) {
        console.error("Error signing out", error);
        throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, refreshProfile, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
