"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";


export default function MyScenariosSection() {
  const { user, loading } = useAuth();

  if (loading) return null; // Or a subtle skeleton

  // Guest View
  if (!user) {
    return (
      <section className="relative overflow-hidden rounded-3xl border border-secondary/40 bg-gradient-to-br from-card/90 to-background shadow-[0_10px_60px_rgba(34,19,74,0.5)] px-5 md:px-7 lg:px-8 py-7 md:py-9 mt-6 group">
        <div className="absolute inset-0 pointer-events-none opacity-50">
           <div className="absolute top-0 rights-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="relative flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-1">
             <span className="text-2xl md:text-4xl">✨</span>
             <p className="text-xs md:text-lg font-bold uppercase tracking-widest text-primary">
                Personalize & Practice
             </p>
          </div>
          
          <h2 className="headline text-2xl md:text-5xl lg:text-6xl tracking-wide">
             Create scenarios for <span className="text-primary italic">your</span> life.
          </h2>
          
          <p className="text-sm md:text-xl lg:text-2xl text-muted max-w-2xl leading-relaxed">
             From awkward tinder dates to answering &quot;What do you do?&quot;—build custom practice decks tailored to your exact situations.
          </p>
          
          <div className="pt-2">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm md:text-xl shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
               <span>Get Started for Free</span>
               <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Logged In View
  return (
    <section className="mt-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <h2 className="headline text-xl md:text-4xl lg:text-5xl bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text">
                My Scenarios
            </h2>
            <Link 
                href="/create-scenario"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs md:text-sm font-bold hover:bg-secondary/20 hover:border-secondary/50 transition-all active:scale-[0.98]"
            >
                <span className="text-base leading-none">＋</span> Create New
            </Link>
        </div>

        {/* Empty State (assuming no data for now, would map over scenarios here later) */}
        <div className="p-8 rounded-3xl border border-dashed border-secondary/30 bg-card/40 flex flex-col items-center justify-center text-center gap-4 transition-colors hover:bg-card/60">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-secondary/10 flex items-center justify-center text-3xl md:text-5xl mb-1">
                📝
            </div>
            <div className="flex flex-col gap-1 md:gap-2">
                <h3 className="text-lg md:text-3xl font-bold text-foreground">Write your first script</h3>
                <p className="text-sm md:text-xl text-muted max-w-md mx-auto">
                    Turn your real-life awkward moments into practice gold.
                </p>
            </div>
            <Link
                href="/create-scenario"
                className="mt-2 px-5 md:px-8 py-2.5 md:py-4 rounded-xl bg-primary text-primary-foreground text-sm md:text-xl font-bold shadow-lg hover:bg-primary/90 transition-all"
            >
                Create Scenario
            </Link>
        </div>
    </section>
  );
}
