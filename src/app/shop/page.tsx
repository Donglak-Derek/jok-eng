"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Star, Zap, Shield, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { ADMIN_UID } from "@/lib/constants";

const PRODUCT_PACKS = [
    {
        id: "pack-biz",
        title: "The CEO Playbook",
        description: "30+ high-stakes scenarios for boardrooms, salary negotiations, and handling difficult managers.",
        price: "$49",
        tag: "Best Seller",
        features: ["30 Advanced Scenarios", "Audio Deep Dives", "Decision Matrix PDF"],
        color: "from-amber-400 to-orange-600",
        stripeLink: "?checkout=success&product=ceo-playbook"
    },
    {
        id: "pack-social",
        title: "Social Dojo: Master Edition",
        description: "The ultimate guide to networking, dating, and small talk. Never have an awkward silence again.",
        price: "$29",
        tag: "Popular",
        features: ["20 Social Scenarios", "Cheat Sheets", "Vibe Calibration Guide"],
        color: "from-primary to-blue-600",
        stripeLink: "?checkout=success&product=social-dojo"
    },
    {
        id: "pack-survival",
        title: "Daily survival kit",
        description: "Essential scenarios for everyday life: IKEA, Coffee shops, Doctors, and Public transport.",
        price: "$19",
        tag: "Essential",
        features: ["15 Survival Scenarios", "Vocabulary Flashcards", "Quick Reference Guide"],
        color: "from-emerald-400 to-teal-600",
        stripeLink: "?checkout=success&product=daily-survival"
    }
];

export default function ShopPage() {
    const router = useRouter();
    const [loadingPackId, setLoadingPackId] = useState<string | null>(null);
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && (!user || user.uid !== ADMIN_UID)) {
            router.replace('/scenarios');
        }
    }, [user, loading, router]);

    const handleCheckout = (packId: string, link: string) => {
        setLoadingPackId(packId);
        // Simulate Stripe Redirect Delay
        setTimeout(() => {
            router.push(`/shop${link}`);
            setLoadingPackId(null);
        }, 800);
    };

    if (loading || (!user || user.uid !== ADMIN_UID)) return null;

    return (
        <main className="min-h-screen bg-background">
            <Header />

            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto space-y-20">
                    {/* Hero */}
                    <div className="text-center space-y-4 max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4"
                        >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Premium Content
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black italic tracking-tighter"
                        >
                            THE <span className="text-primary italic">SHOP</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-muted-foreground text-lg md:text-xl font-medium"
                        >
                            Unlock curated scenario packs and step-by-step guides to master your social calibration.
                        </motion.p>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {PRODUCT_PACKS.map((pack, index) => (
                            <motion.div
                                key={pack.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative flex flex-col bg-card border border-border/50 rounded-[3rem] p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden"
                            >
                                {/* Glow Effect */}
                                <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${pack.color} opacity-0 group-hover:opacity-10 blur-[100px] transition-opacity`} />

                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold uppercase tracking-widest mb-6 self-start">
                                    {pack.tag}
                                </span>

                                <h3 className="text-3xl font-black italic tracking-tighter mb-2 group-hover:text-primary transition-colors">
                                    {pack.title.toUpperCase()}
                                </h3>
                                <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                                    {pack.description}
                                </p>

                                <div className="space-y-4 mb-10">
                                    {pack.features.map(feature => (
                                        <div key={feature} className="flex items-center gap-3 text-sm font-medium">
                                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <Zap className="w-3 h-3 text-primary" />
                                            </div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto pt-8 border-t border-border/30 flex items-center justify-between gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Investment</span>
                                        <div className="text-3xl font-black">{pack.price}</div>
                                    </div>
                                    <Button
                                        onClick={() => handleCheckout(pack.id, pack.stripeLink)}
                                        disabled={loadingPackId === pack.id}
                                        className="rounded-full px-6 bg-foreground text-background hover:bg-primary hover:text-primary-foreground group-hover:scale-105 transition-all"
                                        rightIcon={loadingPackId === pack.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                                    >
                                        {loadingPackId === pack.id ? "Redirecting..." : "Buy Now"}
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Trust Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="bg-secondary/30 rounded-[3rem] p-12 border border-border/50 text-center space-y-8"
                    >
                        <div className="flex justify-center gap-12 text-muted-foreground font-bold text-xs uppercase tracking-[0.2em]">
                            <div className="flex items-center gap-2"><Shield className="w-4 h-4" /> Secure Payment</div>
                            <div className="flex items-center gap-2"><Zap className="w-4 h-4" /> Instant Access</div>
                            <div className="flex items-center gap-2"><Star className="w-4 h-4" /> 5-Star Content</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
