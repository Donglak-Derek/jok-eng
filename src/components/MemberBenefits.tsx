"use client";

import { Flame, Bookmark, TrendingUp } from "lucide-react";

export default function MemberBenefits() {
  return (
    <section className="py-12 border-y border-border/40 bg-secondary/5">
      <div className="container-minimal px-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground text-center mb-10">
            Why create an account?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Benefit 1: Progress */}
            <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
                    <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                     <h4 className="font-bold text-lg">Track Growth</h4>
                     <p className="text-sm text-muted-foreground leading-relaxed px-4">
                        Visualize your fluency improvement over time.
                     </p>
                </div>
            </div>

            {/* Benefit 2: Fire/Streak */}
             <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shadow-sm">
                    <Flame className="w-6 h-6 fill-current" />
                </div>
                <div>
                     <h4 className="font-bold text-lg">Daily Streak</h4>
                     <p className="text-sm text-muted-foreground leading-relaxed px-4">
                        Build momentum. Don&apos;t break the chain.
                     </p>
                </div>
            </div>

            {/* Benefit 3: Save */}
             <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shadow-sm">
                    <Bookmark className="w-6 h-6 fill-current" />
                </div>
                 <div>
                     <h4 className="font-bold text-lg">Save & Review</h4>
                     <p className="text-sm text-muted-foreground leading-relaxed px-4">
                        Build your personal library of 100+ scenarios.
                     </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
