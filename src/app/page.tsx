"use client";

import Link from "next/link";
import Image from "next/image";
import { categories, scripts } from "@/data";
import Card from "@/components/Card";
import Header from "@/components/Header";
import MyScenariosSection from "@/components/MyScenariosSection";
import CommunityScenariosSection from "@/components/CommunityScenariosSection";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/Button";

type Tab = "categories" | "community" | "personal";

export default function Home() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("categories");

  if (loading) return null; // Or a nice splash screen

  return (
    <div className="min-h-dvh text-foreground">
      <div className="max-w-md md:max-w-3xl lg:max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 flex flex-col gap-5 md:gap-6">
        <Header />

        {/* LOGGED IN VIEW: Dashboard Mode */}
        {user ? (
          <>
            {/* Tab Navigation (Top of Dashboard) */}
            <div className="flex items-center justify-center md:justify-start gap-2 md:gap-4 border-b border-white/10 pb-4 mt-2 overflow-x-auto">
                <TabButton 
                    label="Categories" 
                    isActive={activeTab === "categories"} 
                    onClick={() => setActiveTab("categories")} 
                    icon="🗂️"
                />
                <TabButton 
                    label="Community Scenarios" 
                    isActive={activeTab === "community"} 
                    onClick={() => setActiveTab("community")} 
                    icon="🌍"
                />
                <TabButton 
                    label="My Scenarios" 
                    isActive={activeTab === "personal"} 
                    onClick={() => setActiveTab("personal")} 
                    icon="👤"
                />
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="min-h-[400px]"
                >
                    {activeTab === "categories" && (
                        <section className="mt-4">
                        <div className="flex items-center gap-3 mb-6">
                            <h2 className="headline text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text">
                            Categories
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 gap-3 md:gap-4">
                            {categories.map((c) => (
                            <Link
                                key={c.slug}
                                href={`/category/${c.slug}`}
                                className="active:scale-[0.98] transition group"
                            >
                                <Card className="p-4 md:p-5 lg:p-6 overflow-hidden relative">
                                <div className="flex items-center gap-4 md:gap-6">
                                    <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-card shadow-inner border border-secondary/20">
                                    <Image
                                        src={c.image}
                                        alt={c.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="headline text-2xl md:text-3xl lg:text-4xl tracking-[0.02em] truncate pr-2">
                                        {c.name}
                                        </div>
                                        <div className="text-primary/70 text-lg md:text-xl drop-shadow-[0_0_18px_rgba(34,211,238,0.35)] transition-transform group-hover:translate-x-1">
                                        ›
                                        </div>
                                    </div>
                                    <p className="text-sm md:text-lg lg:text-xl text-foreground/80 my-2 leading-relaxed line-clamp-2">
                                        {c.description}
                                    </p>
                                    <div className="text-xs md:text-sm lg:text-base text-muted font-medium">
                                        {
                                        scripts.filter((s) => s.categorySlug === c.slug)
                                            .length
                                        }{" "}
                                        scripts
                                    </div>
                                    </div>
                                </div>
                                </Card>
                            </Link>
                            ))}
                        </div>
                        </section>
                    )}

                    {activeTab === "community" && (
                        <CommunityScenariosSection />
                    )}

                    {activeTab === "personal" && (
                        <MyScenariosSection />
                    )}
                </motion.div>
            </AnimatePresence>
          </>
        ) : (
          /* GUEST VIEW: Marketing & Info */
          <div className="flex flex-col gap-12 md:gap-20 pb-20">
             
             {/* HERO SECTION */}
             <section className="relative overflow-hidden rounded-3xl border border-secondary/40 bg-card/85 shadow-[0_20px_80px_rgba(34,19,74,0.7)] px-5 md:px-7 lg:px-8 py-10 md:py-16 text-center">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-10 -right-6 w-44 h-44 md:w-60 md:h-60 bg-primary/25 blur-3xl animate-pulse" />
                    <div className="absolute -bottom-12 -left-8 w-48 h-48 md:w-64 md:h-64 bg-tertiary/25 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
                </div>
                <div className="relative flex flex-col items-center gap-6 max-w-2xl mx-auto">
                    <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-cyan-400 font-bold">
                    Cool Late Starter
                    </p>
                    <h2 className="headline text-5xl md:text-7xl lg:text-8xl tracking-[0.05em] drop-shadow-[0_0_26px_rgba(168,85,247,0.45)] leading-tight">
                    Stop Nodding.<br/>Start Joking.
                    </h2>
                    <p className="text-base md:text-xl text-muted leading-relaxed">
                    Textbooks taught you how to be polite. We teach you how to be interesting. 
                    Master sarcasm, banter, and the jokes you missed.
                    </p>
                    <div className="pt-4">
                        <Link href="/login" passHref>
                           <Button variant="primary" size="xl" className="text-lg px-8 py-6 rounded-full shadow-[0_10px_40px_rgba(34,211,238,0.4)]">
                               Get Started Free →
                           </Button>
                        </Link>
                    </div>
                </div>
             </section>

             {/* HOW IT WORKS */}
             <section className="text-center space-y-10">
                 <div className="space-y-2">
                    <h3 className="headline text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                        How It Works
                    </h3>
                    <p className="text-muted max-w-xl mx-auto">
                        A simple method to internalize the vibe, not just the vocabulary.
                    </p>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {[
                         { icon: "👀", title: "Read", desc: "Absorb the context and nuance of real-world scenarios." },
                         { icon: "🎧", title: "Listen", desc: "Hear standard English TTS to catch the rhythm and tone." },
                         { icon: "🔁", title: "Repeat", desc: "Practice until the phrase becomes your natural reflex." }
                     ].map((step, i) => (
                         <div key={i} className="bg-card/40 border border-white/5 rounded-2xl p-6 hover:bg-card/60 transition-colors">
                             <div className="text-4xl mb-4">{step.icon}</div>
                             <h4 className="text-xl font-bold text-foreground mb-2">{step.title}</h4>
                             <p className="text-sm text-muted">{step.desc}</p>
                         </div>
                     ))}
                 </div>
             </section>

             {/* FEATURES EXPLAINER */}
             <section className="space-y-12">
                 <div className="text-center">
                     <h3 className="headline text-3xl md:text-4xl">Everything You Need</h3>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {/* Feature 1 */}
                     <div className="space-y-4">
                         <div className="aspect-video rounded-xl bg-gradient-to-br from-purple-900/50 to-black border border-purple-500/20 flex items-center justify-center text-4xl shadow-lg">
                             🗂️
                         </div>
                         <h4 className="text-xl font-bold">Categories</h4>
                         <p className="text-sm text-muted leading-relaxed">
                            Curated packs of scripts for specific vibes: "Office Banter", "Dating Disasters", or "Street Slang". Pick your battle.
                         </p>
                     </div>

                     {/* Feature 2 */}
                     <div className="space-y-4">
                         <div className="aspect-video rounded-xl bg-gradient-to-br from-cyan-900/50 to-black border border-cyan-500/20 flex items-center justify-center text-4xl shadow-lg">
                             🌍
                         </div>
                         <h4 className="text-xl font-bold">Community Scenarios</h4>
                         <p className="text-sm text-muted leading-relaxed">
                            See what others are roasting. Browse, like, and save scenarios created by other "Cool Late Starters" like you.
                         </p>
                     </div>

                     {/* Feature 3 */}
                     <div className="space-y-4">
                         <div className="aspect-video rounded-xl bg-gradient-to-br from-pink-900/50 to-black border border-pink-500/20 flex items-center justify-center text-4xl shadow-lg">
                             👤
                         </div>
                         <h4 className="text-xl font-bold">My Scenarios</h4>
                         <p className="text-sm text-muted leading-relaxed">
                            Your personal library. Save your favorites, write your own AI-assisted scripts, and track your practice stats.
                         </p>
                     </div>
                 </div>
             </section>

             {/* FINAL CTA */}
             <section className="text-center py-12 rounded-3xl bg-gradient-to-b from-transparent to-primary/10 border border-white/5">
                 <h2 className="headline text-3xl md:text-5xl mb-6">Ready to find your voice?</h2>
                 <Link href="/login" passHref>
                    <Button variant="secondary" size="lg" className="px-10 py-4 text-lg rounded-full">
                        Join Now
                    </Button>
                 </Link>
             </section>
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ label, isActive, onClick, icon }: { label: string, isActive: boolean, onClick: () => void, icon: string }) {
    return (
        <button
            onClick={onClick}
            className={`
                relative px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-bold transition-all whitespace-nowrap flex items-center gap-2
                ${isActive 
                    ? "text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]" 
                    : "text-muted hover:text-foreground hover:bg-white/5"
                }
            `}
        >
            {isActive && (
                <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-tertiary via-secondary to-primary rounded-full z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}
            <span className="relative z-10 flex items-center gap-2">
                <span>{icon}</span>
                {label}
            </span>
        </button>
    );
}
