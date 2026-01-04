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

  if (loading) return null; // Or a nice splash screen

  return (
    <div className="min-h-dvh flex flex-col">
      <div className="max-w-md md:max-w-3xl lg:max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 flex flex-col gap-6 md:gap-10 w-full">
        <Header />

        {/* LOGGED IN VIEW: Dashboard Mode */}
        {user ? (
          <>
            {/* Tab Navigation (Mobile App Navbar Style) */}
            <div className="grid grid-cols-3 gap-2 w-full mb-4">
                <TabButton 
                    label="Categories" 
                    isActive={activeTab === "categories"} 
                    onClick={() => setActiveTab("categories")} 
                    icon="🗂️"
                />
                <TabButton 
                    label="Story Feed" 
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
                    className="min-h-[400px] bg-white border-2 border-black hard-shadow rounded-2xl p-4 md:p-8"
                >
                    {activeTab === "categories" && (
                        <section>
                        <div className="flex flex-row items-baseline justify-between gap-3 mb-6 flex-wrap">
                            <h2 className="font-sans font-black text-2xl md:text-4xl text-black leading-none">
                                Categories
                            </h2>
                            <span className="font-hand text-base md:text-xl text-black -rotate-2 bg-yellow-300 px-2 py-0.5 hard-shadow border border-black transform whitespace-nowrap">
                                Pick your vibe!
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categories.map((c) => (
                            <Link
                                key={c.slug}
                                href={`/category/${c.slug}`}
                                className="active:scale-[0.98] transition group h-full"
                            >
                                <div className="h-full flex flex-col bg-white border-2 border-black rounded-xl overflow-hidden shadow-sm hover:hard-shadow transition-all">
                                    {/* Image Area - Top 50% */}
                                    <div className="relative w-full aspect-[16/9] border-b-2 border-black bg-gray-100">
                                        <Image
                                            src={c.image}
                                            alt={c.name}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                                        />
                                        <div className="absolute top-2 right-2 bg-black text-white text-xs font-bold uppercase px-2 py-1 rounded-sm transform rotate-1 shadow-sm">
                                            {scripts.filter((s) => s.categorySlug === c.slug).length} scripts
                                        </div>
                                    </div>
                                    
                                    {/* Content Area - Bottom */}
                                    <div className="p-4 flex-1 flex flex-col gap-1 bg-white">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-sans font-black text-xl tracking-tight leading-none text-black">
                                                {c.name}
                                            </h3>
                                            <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                                        </div>
                                        <p className="font-hand text-gray-800 font-medium text-xs leading-relaxed line-clamp-2">
                                            {c.description}
                                        </p>
                                    </div>
                                </div>
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
          <div className="flex flex-col gap-16 md:gap-24 pb-20">
             
             {/* HERO SECTION - Notebook Doodle Style */}
             <section className="relative overflow-hidden rounded-3xl border-4 border-black bg-primary p-6 md:p-12 text-center hard-shadow transform rotate-1">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>

                <div className="relative flex flex-col items-center gap-6 max-w-3xl mx-auto py-6 md:py-10">
                    <div className="font-hand font-bold text-lg md:text-2xl bg-white px-4 py-2 border-2 border-black -rotate-2 hard-shadow mb-2 md:mb-4">
                        For the Cool Late Starters
                    </div>
                    
                    <h2 className="font-sans font-black text-5xl md:text-8xl leading-[0.9] text-black drop-shadow-sm">
                        Stop Nodding.<br/>
                        <span className="text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] paint-order-stroke stroke-black stroke-2">Start Joking.</span>
                    </h2>
                    
                    <p className="font-sans text-lg md:text-2xl text-black font-medium leading-relaxed max-w-xl">
                        Textbooks taught you to be polite. <br/>
                        <span className="font-hand text-secondary font-bold -rotate-1 inline-block mt-1">We teach you to be interesting.</span>
                    </p>

                    <p className="text-sm md:text-base font-bold text-gray-600 mt-2 max-w-sm mx-auto border-t-2 border-black/10 pt-4 border-dashed">
                        Create custom scenarios with AI, practice with native audio, and share your best roasts.
                    </p>
                    
                    <div className="pt-6 md:pt-8 transform hover:scale-105 transition-transform duration-200 w-full flex justify-center">
                        <Link href="/login" passHref className="w-full max-w-xs md:max-w-none">
                           <Button variant="secondary" size="xl" className="w-full md:w-auto whitespace-nowrap text-lg md:text-2xl px-6 py-4 md:px-10 md:py-6 rounded-full border-4 border-black hard-shadow font-black uppercase tracking-wider bg-white text-black hover:bg-secondary hover:text-white flex items-center justify-center gap-2">
                               Start Being Funny <span>→</span>
                           </Button>
                        </Link>
                    </div>
                </div>
             </section>

             {/* HOW IT WORKS - Sticky Notes */}
             <section className="text-center space-y-12">
                 <div className="space-y-4">
                    <h3 className="font-sans font-black text-4xl md:text-5xl -rotate-1">
                        The &quot;Vibe&quot; Method
                    </h3>
                    <p className="text-black text-xl font-hand max-w-xl mx-auto font-medium">
                        Don&apos;t memorialize vocabulary. Internalize the attitude.
                    </p>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                     {[
                         { icon: "👀", title: "Read", desc: "See the context. Get the joke before you say it.", color: "bg-yellow-100", rotate: "rotate-1" },
                         { icon: "🎧", title: "Listen", desc: "Hear standard English TTS. It&apos;s about timing.", color: "bg-pink-100", rotate: "-rotate-2" },
                         { icon: "🔁", title: "Repeat", desc: "Muscle memory. Say it until it feels weird NOT to say it.", color: "bg-blue-100", rotate: "rotate-2" }
                     ].map((step, i) => (
                         <div key={i} className={`relative p-8 ${step.color} hard-shadow border-2 border-black transform ${step.rotate} transition-transform hover:scale-105 hover:rotate-0`}>
                             <div className="text-6xl mb-6">{step.icon}</div>
                             <h4 className="font-sans font-black text-2xl text-black mb-3 uppercase">{step.title}</h4>
                             <p className="font-hand text-xl text-black leading-snug font-medium">{step.desc}</p>
                             <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-black/10"></div>
                         </div>
                     ))}
                 </div>
             </section>

             {/* FEATURES EXPLAINER */}
             <section className="space-y-12">
                 <div className="text-center">
                     <h3 className="font-sans font-black text-4xl">Everything Included</h3>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {/* Feature 1 */}
                     <div className="space-y-4 p-6 border-l-4 border-black bg-white">
                         <div className="text-5xl mb-2">🗂️</div>
                         <h4 className="font-bold text-xl uppercase tracking-wider">Categories</h4>
                         <p className="text-gray-800 leading-relaxed font-medium">
                            Curated packs for specific vibes: &quot;Office Banter&quot;, &quot;Dating Disasters&quot;, or &quot;Street Slang&quot;.
                         </p>
                     </div>

                     {/* Feature 2 */}
                     <div className="space-y-4 p-6 border-l-4 border-secondary bg-white">
                         <div className="text-5xl mb-2">🌍</div>
                         <h4 className="font-bold text-xl uppercase tracking-wider text-secondary">Community</h4>
                         <p className="text-gray-800 leading-relaxed font-medium">
                            See what others are roasting. Browse, like, and save scenarios from the community.
                         </p>
                     </div>

                     {/* Feature 3 */}
                     <div className="space-y-4 p-6 border-l-4 border-primary bg-white">
                         <div className="text-5xl mb-2">👤</div>
                         <h4 className="font-bold text-xl uppercase tracking-wider text-black">Your Studio</h4>
                         <p className="text-gray-800 leading-relaxed font-medium">
                            Your personal library. Save your favorites and track your transformation.
                         </p>
                     </div>
                 </div>
             </section>

             {/* FINAL CTA */}
             <section className="text-center py-16">
                 <h2 className="font-sans font-black text-4xl md:text-6xl mb-8">Ready to find your voice?</h2>
                 <Link href="/login" passHref>
                    <Button variant="primary" size="lg" className="px-12 py-5 text-xl rounded-full border-4 border-black hard-shadow font-black uppercase tracking-wider bg-white text-black hover:bg-secondary hover:text-white hover:-translate-y-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all">
                        Join Now
                    </Button>
                 </Link>
             </section>

             {/* FOOTER */}
             <footer className="border-t-4 border-black bg-gray-50 p-10 md:p-16 text-center">
                <div className="max-w-2xl mx-auto space-y-6">
                    <div className="font-sans font-black text-2xl">JOK-ENG</div>
                    <p className="text-gray-600 font-medium max-w-sm mx-auto">
                        We help you say what you actually mean, with the attitude you actually have.
                    </p>
                    <div className="flex justify-center gap-6 font-bold text-sm underline decoration-2 underline-offset-4">
                        <a href="#" className="hover:text-primary">About</a>
                        <a href="#" className="hover:text-primary">Pricing</a>
                        <a href="#" className="hover:text-primary">Contact</a>
                        <a href="#" className="hover:text-primary">Terms</a>
                    </div>
                    <div className="text-xs text-gray-400 font-mono mt-8">
                        © {new Date().getFullYear()} JOK-ENG Inc. All rights reserved.
                    </div>
                </div>
             </footer>
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
                flex flex-col items-center justify-center py-2 md:py-3 px-2 rounded-xl border-2 transition-all duration-200 w-full h-full
                ${isActive 
                    ? "bg-black border-black text-white hard-shadow transform -translate-y-1" 
                    : "bg-white border-black/10 text-gray-400 hover:border-black hover:text-black"
                }
            `}
        >
            <span className="text-xl md:text-2xl mb-1">{icon}</span>
            <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${isActive ? "text-white" : "text-gray-500"}`}>{label}</span>
        </button>
    );
}
