"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function DemoBanner() {
  return (
    <div className="w-full bg-indigo-600 text-white px-4 py-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm relative z-50">
        <div className="flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4" />
            <span>Viewing as Guest (Read-Only)</span>
        </div>
        <div className="flex items-center gap-4 text-indigo-100 text-xs sm:text-sm">
             <span>Sign up to Save, Track Progress & Remix.</span>
             <Link href="/login">
                <button className="bg-white text-indigo-700 px-3 py-1 rounded-full font-bold hover:bg-indigo-50 transition-colors">
                    Create Free Account
                </button>
             </Link>
        </div>
    </div>
  );
}
