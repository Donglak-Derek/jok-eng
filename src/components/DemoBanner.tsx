"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function DemoBanner() {
  return (
    <div className="max-w-3xl mx-auto w-full mt-0 md:mt-6 bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-none md:rounded-[40px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
        
        <div className="flex items-center gap-5 relative z-10 w-full md:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.1)]">
                <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-left">
                <h3 className="font-black text-white italic uppercase tracking-tighter text-lg leading-none">Guest Credentials</h3>
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-2">Authentication required for progress persistence</p>
            </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end relative z-10">
             <Link href="/login" className="w-full md:w-auto">
                <button className="w-full md:w-auto px-8 py-4 bg-primary hover:opacity-90 text-white text-sm font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                    Authorize Account
                </button>
             </Link>
        </div>
    </div>
  );
}
