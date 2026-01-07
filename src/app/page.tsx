"use client";

import Link from "next/link";
import Image from "next/image";
import { categories, scripts } from "@/data";
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

  if (loading) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-black selection:text-white">
      <div className="container-minimal py-8 flex flex-col gap-12">
        <Header />

        {/* LOGGED IN VIEW: Dashboard Mode */}
        {user ? (
          <>
            {/* Minimal Tab Navigation */}
            <div className="flex border-b border-border mb-8">
                <TabButton 
                    label="Categories" 
                    isActive={activeTab === "categories"} 
                    onClick={() => setActiveTab("categories")} 
                />
                <TabButton 
                    label="Community" 
                    isActive={activeTab === "community"} 
                    onClick={() => setActiveTab("community")} 
                />
                <TabButton 
                    label="My Studio" 
                    isActive={activeTab === "personal"} 
                    onClick={() => setActiveTab("personal")} 
                />
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
                        <section>
                        <div className="mb-10">
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
          <div className="flex flex-col gap-24 py-12">
             
             {/* HERO SECTION */}
             <section className="text-center max-w-4xl mx-auto space-y-8">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-balance">
                    Stop Nodding. <br/>
                    <span className="text-muted">Start Joking.</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-muted font-medium max-w-2xl mx-auto text-balance">
                    Textbooks taught you to be polite. We teach you to be interesting.
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
                                Curated "Vibe" Packs
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

function TabButton({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`
                pb-3 px-6 text-sm font-medium tracking-wide transition-all border-b-2
                ${isActive 
                    ? "border-primary text-primary" 
                    : "border-transparent text-muted hover:text-foreground"
                }
            `}
        >
            {label}
        </button>
    );
}
