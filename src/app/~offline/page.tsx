"use client";

import { WifiOff } from "lucide-react";
export default function Offline() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6 text-center space-y-6">
            <div className="w-24 h-24 bg-neutral-900 rounded-full flex items-center justify-center text-neutral-500">
                <WifiOff className="w-12 h-12" />
            </div>

            <div className="space-y-2">
                <h1 className="text-3xl font-black tracking-tight">You're Offline</h1>
                <p className="text-neutral-400 max-w-sm mx-auto">
                    It looks like you've lost your connection. Please check your internet and try refreshing.
                </p>
            </div>

            <button
                onClick={() => window.location.reload()}
                className="mt-8 px-6 py-3 bg-white text-black font-bold rounded-full active:scale-95 transition-transform"
            >
                Try Again
            </button>
        </div>
    );
}
