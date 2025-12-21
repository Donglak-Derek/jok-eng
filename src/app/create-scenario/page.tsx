"use client";

import Header from "@/components/Header";
import Link from "next/link";

export default function CreateScenarioPage() {
  return (
    <div className="min-h-dvh text-foreground">
        <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 flex flex-col gap-5 md:gap-6">
            <Header />

            <div className="mt-4">
                 <Link href="/" className="text-sm text-muted hover:text-primary transition-colors mb-4 block">← Back to Home</Link>
                 <h1 className="headline text-3xl md:text-4xl mb-6 bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text">
                    Create New Scenario
                </h1>
                <div className="p-8 rounded-3xl border border-dashed border-secondary/40 bg-secondary/5 h-[400px] flex items-center justify-center">
                    <p className="text-muted">Scenario creation form coming soon...</p>
                </div>
            </div>
        </div>
    </div>
  );
}
