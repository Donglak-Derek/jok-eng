"use client";

import { useEffect, useState } from "react";
import { Script } from "@/types";
import { scripts } from "@/data";
import { Play, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Simple pseudo-random seeder based on day strings (YYYY-MM-DD)
const getDailyScript = (): Script => {
    // 1. Get Today's Date String
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    
    // 2. Hash the string to a number
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
        hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    
    // 3. Modulo to get index
    const index = Math.abs(hash) % scripts.length;
    return scripts[index];
};

export default function DailyChallengeCard() {
    const [dailyScript, setDailyScript] = useState<Script | null>(null);

    useEffect(() => {
        setDailyScript(getDailyScript());
    }, []);

    if (!dailyScript) return null;

    return (
        <div className="w-full rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 text-white overflow-hidden shadow-xl mb-12 relative group border border-white/10">
            {/* Background Texture */}
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none" />
             
             {/* Glow Effect */}
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-40 group-hover:opacity-50 transition-opacity" />

            <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
                
                {/* Visual Side */}
                <div className="relative w-full md:w-48 aspect-[3/4] md:aspect-square shrink-0 rounded-2xl overflow-hidden shadow-2xl skew-x-1 ring-1 ring-white/20">
                    <Image 
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        src={(dailyScript as any).image || (dailyScript as any).imageUrl || "/images/placeholder.jpg"} 
                        alt="Daily Challenge" 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                       <span className="text-2xl">🔥</span>
                       <span className="font-bold text-sm tracking-widest uppercase">Daily</span>
                    </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 text-center md:text-left space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold tracking-wider uppercase border border-white/10 mb-2">
                        <Calendar className="w-3 h-3" />
                         Today&apos;s Challenge
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-black leading-tight">
                        {dailyScript.title}
                    </h2>
                    
                    <p className="text-white/80 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
                        Everyone is practicing this today. Join the community and master this specific vibe!
                    </p>

                    <div className="pt-2">
                         <Link href={`/script/${dailyScript.id}`}>
                            <button className="px-8 py-3 rounded-full bg-white text-indigo-900 font-bold text-lg hover:bg-indigo-50 active:scale-95 transition-all shadow-lg hover:shadow-white/20 flex items-center gap-2 mx-auto md:mx-0">
                                <Play className="w-5 h-5 fill-current" />
                                Start Rehearsing
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
