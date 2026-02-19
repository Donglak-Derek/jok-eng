"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, X, Lock, Zap, User, Star } from "lucide-react";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function PricingPage() {
    const router = useRouter();
    const { user } = useAuth();

    const tiers = [
        {
            name: "Guest",
            price: "Free",
            description: "Perfect for testing the waters.",
            icon: <User className="w-6 h-6 text-muted-foreground" />,
            features: [
                { text: "Browse all categories", included: true },
                { text: "Limited daily scenarios", included: true },
                { text: "Standard AI voices", included: true },
                { text: "Progress tracking", included: false },
                { text: "Save scenarios", included: false },
                { text: "Daily challenges", included: false },
            ],
            cta: "Start Exploring",
            action: () => router.push("/"),
            highlight: false
        },
        {
            name: "Free (Sign In)",
            price: "Free",
            description: "For serious learners who want to track growth.",
            icon: <Zap className="w-6 h-6 text-primary" />,
            features: [
                { text: "Browse all categories", included: true },
                { text: "3 scenarios / day", included: true },
                { text: "Standard AI voices", included: true },
                { text: "Full progress tracking", included: true },
                { text: "Daily streak widget", included: true },
                { text: "Save last 5 scenarios", included: true },
            ],
            cta: user ? "Already Signed In" : "Sign Up Free",
            action: () => router.push("/login"),
            highlight: true
        },
        {
            name: "Pro",
            price: "$9/mo",
            description: "Unlimited power for high-functioning professionals.",
            icon: <Star className="w-6 h-6 text-indigo-600" />,
            features: [
                { text: "15 scenarios / day", included: true },
                { text: "Premium Neural voices", included: true },
                { text: "Full progress tracking", included: true },
                { text: "Unlimited scenario storage", included: true },
                { text: "Priority support", included: true },
                { text: "Ad-free experience", included: true },
            ],
            cta: "Upgrade to Pro",
            action: () => router.push("/?upgrade=true"),
            highlight: false
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />

            <main className="flex-1 pt-32 pb-20 px-4">
                <div className="max-w-6xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight">Simple Pricing</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                            Start for free, upgrade when you&apos;re ready to dominate your next English conversation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {tiers.map((tier, i) => (
                            <div
                                key={i}
                                className={`
                                    relative p-8 rounded-3xl border flex flex-col gap-6 transition-all duration-300
                                    ${tier.highlight
                                        ? "bg-white shadow-2xl border-primary ring-1 ring-primary scale-105 z-10"
                                        : "bg-secondary/20 border-border hover:border-muted-foreground/30 hover:bg-secondary/30"}
                                `}
                            >
                                {tier.highlight && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                                        Most Popular
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        {tier.icon}
                                        <h3 className="text-2xl font-bold">{tier.name}</h3>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-black">{tier.price}</span>
                                        {tier.price !== "Free" && <span className="text-muted-foreground font-medium">/month</span>}
                                    </div>
                                    <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                                        {tier.description}
                                    </p>
                                </div>

                                <div className="space-y-4 flex-1">
                                    {tier.features.map((feature, j) => (
                                        <div key={j} className="flex items-center gap-3 text-sm">
                                            {feature.included ? (
                                                <Check className={`w-5 h-5 ${tier.highlight ? "text-primary" : "text-emerald-500"}`} />
                                            ) : (
                                                <X className="w-5 h-5 text-muted-foreground/30" />
                                            )}
                                            <span className={feature.included ? "text-foreground font-medium" : "text-muted-foreground"}>
                                                {feature.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    onClick={tier.action}
                                    className={`
                                        w-full h-12 rounded-xl font-bold transition-all
                                        ${tier.highlight
                                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                            : "bg-secondary text-foreground hover:bg-secondary/80"}
                                    `}
                                    disabled={tier.cta === "Already Signed In"}
                                >
                                    {tier.cta}
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="text-center pt-8">
                        <p className="text-muted-foreground text-sm font-medium">
                            All plans include access to our community scenarios and daily vibe checks.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
