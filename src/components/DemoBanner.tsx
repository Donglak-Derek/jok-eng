"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function DemoBanner() {
  return (
    <div className="max-w-3xl mx-auto w-full mt-6 bg-gradient-to-r from-indigo-50/80 to-blue-50/80 border border-indigo-100 rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm relative overflow-hidden">
        
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl" />

        <div className="flex items-center gap-3 relative z-10 w-full md:w-auto">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                <AlertCircle className="w-5 h-5" />
            </div>
            <div className="text-left">
                <h3 className="font-bold text-indigo-950 text-sm">Guest Mode (Read-Only)</h3>
                <p className="text-indigo-700/80 text-xs mt-0.5">Your progress won't be saved.</p>
            </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end relative z-10">
             <Link href="/login" className="w-full md:w-auto">
                <button className="w-full md:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                    Create Free Account
                </button>
             </Link>
        </div>
    </div>
  );
}
