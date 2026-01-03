"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
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
    <div className="min-h-dvh flex flex-col items-center justify-center p-4 bg-primary text-black relative overflow-hidden">
        {/* Notebook background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>

        <div className="z-10 bg-white border-4 border-black p-8 md:p-12 rounded-3xl hard-shadow max-w-md w-full flex flex-col items-center text-center gap-8 transform -rotate-1">
            <Link href="/" className="font-hand font-bold text-sm text-gray-500 hover:text-black hover:underline transition-colors absolute top-6 left-6">
                ← Back
            </Link>
            
            <div className="flex flex-col gap-4 mt-8">
                <div className="w-16 h-16 bg-yellow-300 rounded-full border-2 border-black flex items-center justify-center text-3xl mb-2 mx-auto hard-shadow">
                    👋
                </div>
                <h1 className="font-sans font-black text-5xl text-black leading-none transform -rotate-2">
                    Welcome<br/><span className="text-secondary">Back!</span>
                </h1>
                <p className="font-hand text-lg text-gray-600 font-bold max-w-xs mx-auto">
                    Sign in to check your progress and keep roasting.
                </p>
            </div>

            <button
                onClick={handleLogin}
                className="w-full py-4 px-6 rounded-xl bg-white border-2 border-black text-black font-black text-lg flex items-center justify-center gap-3 hard-shadow hover:-translate-y-1 hover:bg-gray-50 transition-all active:translate-y-0 active:shadow-none"
            >
                <Image 
                    src="https://www.google.com/favicon.ico" 
                    alt="Google" 
                    width={24} 
                    height={24} 
                    className="w-6 h-6" 
                />
                <span>Sign in with Google</span>
            </button>
            
            <p className="text-xs font-mono text-gray-400 mt-4 border-t-2 border-dashed border-gray-200 pt-4 w-full">
                By continuing, you agree to become 20% funnier.
            </p>
        </div>
    </div>
  );
}
