"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/Button";

export default function LoginPage() {
  const { user, signInWithGoogle, signInWithEmailOnly } = useAuth();
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed", error);
      setError("Google sign in failed. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      if(!email || !password) return;
      
      try {
          setLoading(true);
          setError(null);
          await signInWithEmailOnly(email, password);
          // Redirect handled by effect
      } catch (err: any) {
          console.error(err);
          setError("Invalid email or password.");
          setLoading(false);
      }
  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center p-4 bg-primary/10 text-black relative overflow-hidden">
        {/* Notebook background pattern */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>

        <div className="z-10 bg-white border-2 border-border p-8 md:p-12 rounded-3xl shadow-xl max-w-md w-full flex flex-col items-center gap-8 animate-in fade-in zoom-in-95 duration-500">
            <Link href="/" className="font-medium text-sm text-muted-foreground hover:text-foreground transition-colors absolute top-6 left-6 flex items-center gap-1">
                ← Back
            </Link>
            
            <div className="flex flex-col gap-4 mt-4 text-center items-center">
                <div className="w-24 h-24 relative mb-2 animate-in fade-in zoom-in spin-in-3 duration-700">
                    <Image 
                        src="/logo-v2.png" 
                        alt="Jok-Eng Crown" 
                        fill
                        className="object-contain drop-shadow-lg"
                    />
                </div>
                <h1 className="font-bold text-4xl text-foreground leading-tight">
                    Welcome <span className="text-primary">Back!</span>
                </h1>
                <p className="text-muted-foreground max-w-xs">
                    Sign in to track your progress and manage scenarios.
                </p>
            </div>

            <div className="w-full flex flex-col gap-4">
                {/* GOOGLE LOGIN (Primary) */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl bg-white border border-gray-300 text-gray-700 font-bold text-lg flex items-center justify-center gap-3 hover:bg-gray-50 hover:shadow-md transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <div className="w-6 h-6 border-2 border-gray-300 border-t-indigo-600 rounded-full animate-spin" />
                    ) : (
                         <Image 
                            src="https://www.google.com/favicon.ico" 
                            alt="Google" 
                            width={24} 
                            height={24} 
                            className="w-6 h-6" 
                        />
                    )}
                    <span>Continue with Google</span>
                </button>

                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase tracking-widest font-semibold">Or</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                {/* ADMIN / EMAIL LOGIN (Secondary) */}
                {!isAdminMode ? (
                    <button 
                        onClick={() => setIsAdminMode(true)}
                        className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-all"
                    >
                        Log in with Email (Admin)
                    </button>
                ) : (
                    <form onSubmit={handleEmailLogin} className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}
                        
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                                type="email" 
                                placeholder="name@example.com"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                                type="password" 
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between mt-1">
                            <button 
                                type="button"
                                onClick={() => { setIsAdminMode(false); setError(null); }}
                                className="text-xs text-gray-500 hover:text-gray-700"
                            >
                                Cancel
                            </button>
                            <Button 
                                type="submit" 
                                variant="primary" 
                                size="md"
                                isLoading={loading}
                                className="w-auto px-6"
                            >
                                Login
                            </Button>
                        </div>
                    </form>
                )}
            </div>
            
            <p className="text-xs text-center text-gray-400 max-w-sm leading-relaxed">
                By continuing, you agree to become 20% funnier. 
                <br/>(Terms apply strictly to dad jokes).
            </p>
        </div>
    </div>
  );
}
