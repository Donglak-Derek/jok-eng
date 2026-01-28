"use client";

import { Flame, Bookmark, TrendingUp } from "lucide-react";

export default function MemberBenefits() {
  return (
    <section className="py-12 border-y border-border/40 bg-secondary/5">
      <div className="container-minimal px-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground text-center mb-10">
            Why join? It&apos;s free. <span className="text-foreground">Your English needs a home.</span> Create one here.
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Benefit 1: Progress */}
            <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
                    <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                     <h4 className="font-bold text-lg">See Your Progress</h4>
                     <p className="text-sm text-muted-foreground leading-relaxed px-4">
                        Don&apos;t guess if you&apos;re getting better. Watch your stats go up as you learn.
                     </p>
                </div>
            </div>

            {/* Benefit 2: Fire/Streak */}
             <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shadow-sm">
                    <Flame className="w-6 h-6 fill-current" />
                </div>
                <div>
                     <h4 className="font-bold text-lg">Build the Habit</h4>
                     <p className="text-sm text-muted-foreground leading-relaxed px-4">
                        Consistency is the hardest part. We help you show up every day.
                     </p>
                </div>
            </div>

            {/* Benefit 3: Save */}
             <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shadow-sm">
                    <Bookmark className="w-6 h-6 fill-current" />
                </div>
                  <div>
                     <h4 className="font-bold text-lg">Keep Your Favorites</h4>
                     <p className="text-sm text-muted-foreground leading-relaxed px-4">
                        Found a funny line or a useful phrase? Save it to your personal list for later.
                     </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
