"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Youtube, Instagram } from "lucide-react";

export default function LandingTrust() {
  return (
    <section className="py-20 border-t border-border/40 bg-secondary/5">
      <div className="container-minimal px-4">
        
        {/* 1. Logos / Used By */}
        <div className="text-center mb-20">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">
                Designed for High-Functioning Professionals
            </p>
            <div className="flex flex-wrap justify-center gap-4 opacity-90">
                {/* Professional Personas instead of Logos */}
                {[
                    "Software Engineers", 
                    "Product Managers", 
                    "Founders & VCs", 
                    "Medical Professionals", 
                    "Diplomats",
                    "Global Consultants"
                ].map((role) => (
                    <span 
                        key={role}
                        className="px-6 py-3 rounded-full bg-background border border-border/60 shadow-sm text-sm font-bold text-foreground/80 hover:bg-secondary/50 hover:scale-105 transition-all cursor-default"
                    >
                        {role}
                    </span>
                ))}
            </div>
        </div>

        {/* 2. Testimonial - The Social Proof */}
        <div className="max-w-4xl mx-auto mb-20">
             <div className="bg-background border border-border/50 rounded-2xl p-8 md:p-12 text-center relative shadow-lg">
                <div className="text-4xl text-primary absolute top-6 left-8 opacity-20">❝</div>
                 <p className="text-xl md:text-2xl font-serif leading-relaxed italic text-foreground/90 mb-6 relative z-10">
                     "I used to stay silent in strategy meetings because I was afraid of saying the wrong idiom. Jok-Eng taught me the 'code'. Last week, I made a joke during a negotiation with a vendor, and the tension instantly disappeared. I'm finally leading."
                 </p>
                 <div className="flex flex-col items-center">
                     <div className="relative w-16 h-16 mb-4 rounded-full overflow-hidden border-2 border-white shadow-md">
                         <Image 
                           src="/images/sarah-profile.png" 
                           alt="Sarah J" 
                           fill 
                           className="object-cover"
                         />
                     </div>
                     <div className="font-bold">Sarah J.</div>
                     <div className="text-sm text-muted-foreground">Senior Product Manager, Tech</div>
                 </div>
             </div>
        </div>

      </div>
    </section>
  );
}
