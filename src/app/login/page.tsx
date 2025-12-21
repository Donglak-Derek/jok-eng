"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const { user, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center p-4 bg-background text-foreground relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-tertiary/20 rounded-full blur-[100px]" />

        <div className="z-10 bg-card/80 backdrop-blur-xl border border-secondary/30 p-8 rounded-3xl shadow-[0_20px_60px_rgba(34,19,74,0.5)] max-w-md w-full flex flex-col items-center text-center gap-6">
            <Link href="/" className="text-sm text-muted hover:text-primary transition-colors mb-2">← Back to Home</Link>
            
            <div className="flex flex-col gap-2">
                <h1 className="headline text-4xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-tertiary via-secondary to-primary">
                    Welcome Back
                </h1>
                <p className="text-muted">Sign in to save your progress and create your own scenarios.</p>
            </div>

            <button
                onClick={handleLogin}
                className="w-full py-3.5 px-6 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-3 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                <span>Sign in with Google</span>
            </button>
            
            <p className="text-xs text-muted/60 mt-4">
                By continuing, you agree to become 20% funnier.
            </p>
        </div>
    </div>
  );
}
