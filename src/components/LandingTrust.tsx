"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, CheckCircle, Users } from "lucide-react";

export default function LandingTrust() {
  return (
    <section className="py-20 border-t border-border/40 bg-secondary/5">
      <div className="container-minimal px-4">
        
        {/* 1. Logos / Used By */}
        <div className="text-center mb-20">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">
                Trusted by professionals from
            </p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Simple Text Placeholders for Logos to avoid image dependencies */}
                <span className="text-xl font-bold font-serif">Google</span>
                <span className="text-xl font-bold font-sans tracking-tighter">Pfizer</span>
                <span className="text-xl font-bold italic">Apple</span>
                <span className="text-xl font-black tracking-wide">NETFLIX</span>
                <span className="text-xl font-medium font-serif">McKinsey & Company</span>
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
                     <div className="w-12 h-12 bg-gray-200 rounded-full mb-3" /> {/* Avatar Placeholder */}
                     <div className="font-bold">Sarah J.</div>
                     <div className="text-sm text-muted-foreground">Senior Product Manager, Tech</div>
                 </div>
             </div>
        </div>

        {/* 3. Trust Grid / Footer Elements */}
        <div className="grid md:grid-cols-4 gap-8 md:gap-12 border-t border-border/40 pt-16">
            <div className="space-y-4">
                <div className="font-black text-2xl tracking-tight">Jok-Eng.com</div>
                <p className="text-sm text-muted-foreground">
                    Master the secret code of professional English.
                </p>
                <div className="flex gap-4 pt-2">
                     {/* Socials placeholders */}
                     <div className="w-8 h-8 rounded-full bg-secondary hover:bg-primary/20 transition-colors" />
                     <div className="w-8 h-8 rounded-full bg-secondary hover:bg-primary/20 transition-colors" />
                </div>
            </div>

            <div>
                <h4 className="font-bold mb-4">Membership</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="#" className="hover:text-foreground">Pricing</Link></li>
                    <li><Link href="#" className="hover:text-foreground">Enterprise</Link></li>
                    <li><Link href="#" className="hover:text-foreground">Gift Cards</Link></li>
                </ul>
            </div>

             <div>
                <h4 className="font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="#" className="hover:text-foreground">About Us</Link></li>
                    <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
                    <li><Link href="#" className="hover:text-foreground">Contact</Link></li>
                </ul>
            </div>

            <div>
                 <h4 className="font-bold mb-4">Trust & Security</h4>
                 <ul className="space-y-3 text-sm">
                     <li className="flex items-center gap-2 text-muted-foreground">
                         <ShieldCheck className="w-4 h-4 text-green-500" /> SSL Secured
                     </li>
                     <li className="flex items-center gap-2 text-muted-foreground">
                         <CheckCircle className="w-4 h-4 text-blue-500" /> Money-Back Guarantee
                     </li>
                     <li className="flex items-center gap-2 text-muted-foreground">
                         <Users className="w-4 h-4 text-purple-500" /> Verified Reviews
                     </li>
                 </ul>
            </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border/40 text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Jok-Eng.com. All rights reserved.
        </div>

      </div>
    </section>
  );
}
