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
      category: "The Textbook 📚",
      title: "The Situation",
      lines: [
        "I am very busy right now.",
        "I cannot do that.",
        "Maybe another time."
      ]
    },
    remixed: {
      category: "Corporate (The Boss) 👔",
      title: "Professional",
      lines: [
        "I'm at capacity currently.",
        "That's not actionable for me.",
        "Let's circle back on this."
      ]
    }
  },
  culture: {
    original: {
      category: "The Textbook 📚",
      title: "The Situation",
      lines: [
        "I am very busy right now.",
        "I cannot do that.",
        "Maybe another time."
      ]
    },
    remixed: {
      category: "Polite (The Elder) 🙇",
      title: "Indirect Refusal",
      lines: [
        "I'd love to, but...",
        "My schedule is a bit difficult.",
        "Please ask me again later!"
      ]
    }
  },
  vibe: {
    original: {
      category: "The Textbook 📚",
      title: "The Situation",
      lines: [
        "I am very busy right now.",
        "I cannot do that.",
        "Maybe another time."
      ]
    },
    remixed: {
      category: "Casual (The Friend) 🧢",
      title: "Street Smart",
      lines: [
        "I'm swamped.",
        "No shot I can do that.",
        "Catch you later?"
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
            One Scenario. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Any Style.</span>
          </h2>
          
           {/* Simple How-To - Moved Up */}
           <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-widest bg-secondary/30 inline-flex flex-wrap px-6 py-3 rounded-full border border-border/50 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-foreground text-background flex items-center justify-center text-[10px] font-bold">1</span> 
                Pick a Topic
              </div>
              <div className="text-border/50">→</div>
              <div className="flex items-center gap-2">
                 <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">2</span>
                 Hit Remix
              </div>
              <div className="text-border/50">→</div>
              <div className="flex items-center gap-2">
                 <span className="w-5 h-5 rounded-full bg-foreground text-background flex items-center justify-center text-[10px] font-bold">3</span>
                 See the Magic
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

        {/* Single Dynamic Card (Expanded for Before/After) */}
        <div className="relative max-w-4xl mx-auto">
             <AnimatePresence mode="wait">
                <motion.div 
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                >
                    <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-black text-white rounded-[2rem] p-6 md:p-10 shadow-2xl relative overflow-hidden border border-white/10 ring-1 ring-white/5">
                        
                        {/* Dynamic Background Glow */}
                        <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-b ${TABS.find(t => t.id === activeTab)?.color} opacity-25 blur-[100px] rounded-full -mr-20 -mt-20`} />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10">
                            {/* LEFT COLUMN: BEFORE */}
                            <div className="space-y-6 opacity-60">
                                <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
                                    <div className="text-xs font-bold uppercase tracking-widest text-white/50">Before</div>
                                    <div className="font-bold text-lg text-white/80">
                                        {EXAMPLES[activeTab as keyof typeof EXAMPLES].original.category}
                                    </div>
                                </div>

                                <div className="space-y-4 font-serif italic text-white/70">
                                    {EXAMPLES[activeTab as keyof typeof EXAMPLES].original.lines.map((line, i) => (
                                        <p key={i} className="text-base md:text-lg leading-relaxed">{line}</p>
                                    ))}
                                </div>
                            </div>

                            {/* RIGHT COLUMN: AFTER (highlighted) */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-4 border-b border-white/20 pb-4">
                                    <div className="text-xs font-bold uppercase tracking-widest text-primary">After</div>
                                    <div className="font-bold text-lg md:text-2xl text-white tracking-tight flex items-center gap-2">
                                         {EXAMPLES[activeTab as keyof typeof EXAMPLES].remixed.category}
                                    </div>
                                    <div className="ml-auto bg-white/10 px-2 py-0.5 rounded text-[10px] font-bold">AI Remix</div>
                                </div>

                                <div className="space-y-4">
                                     {EXAMPLES[activeTab as keyof typeof EXAMPLES].remixed.lines.map((line, i) => (
                                        <motion.div 
                                            key={i} 
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + (i * 0.1) }}
                                            className="flex gap-3 group"
                                        >
                                            <div className="w-4 text-right font-mono text-xs opacity-30 pt-1.5 group-hover:text-primary transition-colors">0{i+1}</div>
                                            <div className="flex-1">
                                                <p className="text-lg md:text-xl font-bold text-indigo-50 leading-relaxed selection:bg-primary/30">
                                                    {line}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </AnimatePresence>
            
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 blur-[80px] opacity-10 -z-10 rounded-full transform scale-110" />
        </div>

      </div>
    </section>
  );
}
