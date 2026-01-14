"use client";

import Link from "next/link";
import Image from "next/image";
import { categories, scripts } from "@/data";
import Header from "@/components/Header";
import CommunityScenariosSection from "@/components/CommunityScenariosSection";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/Button";

import QuickStartInput from "@/components/QuickStartInput";

type Tab = "categories" | "community";

export default function Home() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("categories");

  if (loading) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-black selection:text-white">
      <div className="container-minimal pt-0 pb-8 flex flex-col gap-6">
        <Header />

        {/* LOGGED IN VIEW: Dashboard Mode */}
        {user ? (
          <>
            {/* Dashboard Controller Card */}
            <div className="bg-secondary/20 rounded-3xl px-3 py-4 md:p-6 mb-4 border border-border/50 flex flex-col gap-6">
                {/* Quick Start Input */}
                <QuickStartInput />

                {/* Premium Segmented Control */}
                <div className="flex justify-center">
                    <div className="inline-flex bg-background/50 p-1.5 rounded-full relative shadow-sm border border-border/50 w-full md:w-auto">
                        {(["categories", "community"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`
                                    relative flex-1 md:flex-initial px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 z-10
                                    ${activeTab === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
                                `}
                            >
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-background rounded-full shadow-md border border-border/20"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-20">
                                    {tab === "categories" && "Categories"}
                                    {tab === "community" && "Community"}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="min-h-[400px]"
                >
                    {activeTab === "categories" && (
                        <div>
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold tracking-tight mb-2">
                                    Pick your vibe
                                </h2>
                                <p className="text-muted text-lg">Choose a context to start practicing.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categories.map((c) => (
                            <Link
                                key={c.slug}
                                href={`/category/${c.slug}`}
                                className="group block"
                            >
                                <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-secondary mb-4">
                                    <Image
                                        src={c.image}
                                        alt={c.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-xl font-semibold group-hover:underline decoration-1 underline-offset-4">
                                        {c.name}
                                    </h3>
                                    <span className="text-sm text-muted">
                                        {scripts.filter((s) => s.categorySlug === c.slug).length} scripts
                                    </span>
                                </div>
                                <p className="text-muted mt-1 leading-relaxed">
                                    {c.description}
                                </p>
                            </Link>
                            ))}
                        </div>
                        </div>
                    )}

                    {activeTab === "community" && (
                        <CommunityScenariosSection />
                    )}
                </motion.div>
            </AnimatePresence>
          </>
        ) : (
          /* GUEST VIEW: Marketing & Info */
          <div className="flex flex-col gap-24 py-12">
             
             {/* HERO SECTION */}
             <section className="text-center max-w-4xl mx-auto space-y-8">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-balance">
                    Don&apos;t Sound Like a Robot.
                </h1>
                
                <p className="text-xl md:text-2xl text-muted font-medium max-w-2xl mx-auto text-balance">
                    Master the <span className="text-primary italic">social nuance</span> of English. Create custom scenarios for <span className="text-foreground font-semibold">your actual life</span>, decode slang, and stop being robotic.
                </p>
                
                <div className="pt-8">
                    <Link href="/login" passHref>
                       <Button className="rounded-full px-8 py-6 text-lg font-medium bg-primary text-white hover:opacity-90 transition-opacity">
                           Start Being Funny
                       </Button>
                    </Link>
                </div>
             </section>

             {/* HOW IT WORKS */}
             <section className="py-16 border-t border-border">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                     {[
                         { title: "Read", desc: "See the context. Get the joke before you say it." },
                         { title: "Listen", desc: "Hear natural intonation. It's about timing." },
                         { title: "Repeat", desc: "Muscle memory. Say it until it feels real." }
                     ].map((step, i) => (
                         <div key={i} className="space-y-4">
                             <h4 className="text-sm font-bold uppercase tracking-widest text-muted">Step 0{i+1}</h4>
                             <h3 className="text-3xl font-bold">{step.title}</h3>
                             <p className="text-lg text-muted max-w-xs mx-auto">{step.desc}</p>
                         </div>
                     ))}
                 </div>
             </section>

             {/* FEATURES */}
             <section className="py-16">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                     <div className="space-y-6">
                         <h2 className="text-4xl font-bold tracking-tight">Everything you need to sound local.</h2>
                         <p className="text-lg text-muted">
                            Forget generic phrases. Our curated packs cover the actual conversations you happen in offices, bars, and awkward dates.
                         </p>
                         <ul className="space-y-4 text-lg">
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-primary"></span>
                                Curated &quot;Vibe&quot; Packs
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-primary"></span>
                                Community Scenarios
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-primary"></span>
                                AI Scenario Director
                            </li>
                         </ul>
                     </div>
                     <div className="aspect-square bg-secondary rounded-2xl p-8 flex items-center justify-center">
                        {/* Abstract Feature Graphic placeholder */}
                        <div className="text-9xl opacity-10">🎙️</div>
                     </div>
                 </div>
             </section>

             {/* FOOTER */}
             <footer className="border-t border-border pt-16 pb-8 text-center text-sm text-muted">
                <div className="flex justify-center gap-8 mb-8 font-medium text-foreground">
                    <Link href="#">About</Link>
                    <Link href="#">Pricing</Link>
                    <Link href="#">Terms</Link>
                </div>
                <p>
                    © {new Date().getFullYear()} JOK-ENG. Built for the cool late starters.
                </p>
             </footer>
          </div>
        )}
      </div>
    </div>
  );
}


