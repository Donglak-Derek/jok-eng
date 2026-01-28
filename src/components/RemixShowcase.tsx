"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const TABS = [
  { id: "career", label: "Career 💼", color: "from-blue-500 to-indigo-500" },
  { id: "culture", label: "Culture 🇰🇷", color: "from-red-500 to-pink-500" },
  { id: "vibe", label: "Vibe ⚡", color: "from-amber-400 to-orange-500" }
];

const EXAMPLES = {
  career: {
    original: {
      category: "Professional",
      title: "The Project Update",
      lines: [
        "I'm done with the first part.",
        "It took longer than expected.",
        "I need more time for the rest."
      ]
    },
    remixed: {
      category: "Chef Edition 👨‍🍳",
      title: "Kitchen Status",
      lines: [
        "Mise-en-place is complete, Chef.",
        "The prep ran into the weeds.",
        "I need 5 minutes on the proteins!"
      ]
    }
  },
  culture: {
    original: {
      category: "Direct (Western)",
      title: "Declining an Invitation",
      lines: [
        "No, I can't come to your party.",
        "I have too much work to do.",
        "Maybe next time."
      ]
    },
    remixed: {
      category: "Korean Manner 🙇",
      title: "Polite Refusal",
      lines: [
        "I would love to go, but...",
        "Arguments with my schedule are difficult.",
        "Please have fun without me this time!"
      ]
    }
  },
  vibe: {
    original: {
      category: "Standard English",
      title: "That's Amazing",
      lines: [
        "This food is very delicious.",
        "You are extremely talented.",
        "I am having a great time."
      ]
    },
    remixed: {
      category: "Gen Z Vibe ✨",
      title: "The Glaze",
      lines: [
        "This hits different, no cap.",
        "You're actually the goat.",
        "The vibes are immaculate."
      ]
    }
  }
};

export default function RemixShowcase() {
  const [activeTab, setActiveTab] = useState("career");

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="text-center mb-12 space-y-6">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            One Scenario. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Infinite Contexts.</span>
          </h2>
          
           {/* Simple How-To - Moved Up */}
           <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-widest bg-secondary/30 inline-flex flex-wrap px-6 py-3 rounded-full border border-border/50 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-foreground text-background flex items-center justify-center text-[10px] font-bold">1</span> 
                Pick Topic
              </div>
              <div className="text-border/50">→</div>
              <div className="flex items-center gap-2">
                 <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">2</span>
                 Remix It
              </div>
              <div className="text-border/50">→</div>
              <div className="flex items-center gap-2">
                 <span className="w-5 h-5 rounded-full bg-foreground text-background flex items-center justify-center text-[10px] font-bold">3</span>
                 Go Viral
              </div>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto pt-2">
             See how one simple idea transforms to fit your <strong className="text-foreground">Job</strong>, your <strong className="text-foreground">Culture</strong>, or your <strong className="text-foreground">Vibe</strong>.
          </p>
        </div>
      
        {/* Tabs - The "Remix" Controls */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-6 py-3 rounded-full text-lg font-bold transition-all duration-300 flex items-center gap-2
                ${activeTab === tab.id 
                  ? "bg-foreground text-background scale-105 shadow-xl ring-2 ring-primary/20" 
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }
              `}
            >
              <span>{tab.label.split(" ")[1]}</span> {/* Icon only on mobile? No, show both but maybe distinct */}
              <span>{tab.label.split(" ")[0]}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${tab.color} opacity-20 -z-10 blur-xl`}
                />
              )}
            </button>
          ))}
        </div>

        {/* Single Dynamic Card */}
        <div className="relative max-w-lg mx-auto">
             <AnimatePresence mode="wait">
                <motion.div 
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                >
                    <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-black text-white rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden border border-white/10 ring-1 ring-white/5">
                        
                        {/* Dynamic Background Glow */}
                        <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-b ${TABS.find(t => t.id === activeTab)?.color} opacity-25 blur-[100px] rounded-full -mr-20 -mt-20`} />
                        
                        {/* Header */}
                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner border border-white/10">
                                    {activeTab === "career" && "💼"}
                                    {activeTab === "culture" && "🇰🇷"}
                                    {activeTab === "vibe" && "✨"}
                                </div>
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">Context Applied</div>
                                    <div className="font-bold text-xl md:text-2xl text-white tracking-tight">
                                        {EXAMPLES[activeTab as keyof typeof EXAMPLES].remixed.category}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10 text-white/80">
                                AI Remix
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-6 relative z-10">
                             {EXAMPLES[activeTab as keyof typeof EXAMPLES].remixed.lines.map((line, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-4 group"
                                >
                                    <div className="w-6 text-right font-mono text-sm opacity-30 pt-1 group-hover:text-primary transition-colors">0{i+1}</div>
                                    <div className="flex-1">
                                        <p className="text-lg md:text-xl font-medium text-indigo-50 leading-relaxed selection:bg-primary/30">
                                            {line}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                         {/* Footer / Original Context */}
                         <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2 text-xs text-white/40">
                            <span>Original Sceario:</span>
                            <span className="text-white/60 font-semibold">{EXAMPLES[activeTab as keyof typeof EXAMPLES].original.title}</span>
                         </div>
                    </div>
                </motion.div>
            </AnimatePresence>
            
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 blur-[60px] opacity-10 -z-10 rounded-full transform scale-110" />
        </div>

      </div>
    </section>
  );
}
