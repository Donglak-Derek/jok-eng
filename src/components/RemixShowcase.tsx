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
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Smart Remix Engine</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real life happens in context. Adapt any scenario to fit your <strong className="text-foreground">Job</strong>, your <strong className="text-foreground">Culture</strong>, and your <strong className="text-foreground">Vibe</strong>.
          </p>
        </div>
      
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-6 py-3 rounded-full text-lg font-bold transition-all duration-300
                ${activeTab === tab.id 
                  ? "bg-foreground text-background scale-110 shadow-xl" 
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }
              `}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${tab.color} opacity-20 -z-10 blur-lg`}
                />
              )}
            </button>
          ))}
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Original Card */}
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm scale-95 opacity-80 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xl">
                        😐
                    </div>
                    <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Original</div>
                        <div className="font-bold text-lg">{EXAMPLES[activeTab as keyof typeof EXAMPLES].original.title}</div>
                    </div>
                </div>
                <div className="space-y-4 font-medium text-muted-foreground">
                    {EXAMPLES[activeTab as keyof typeof EXAMPLES].original.lines.map((line, i) => (
                        <div key={i} className="flex gap-3">
                            <span className="opacity-30 select-none">0{i+1}</span>
                            <span>{line}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Remixed Card */}
            <AnimatePresence mode="wait">
                <motion.div 
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="relative"
                >
                    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-white/10">
                        {/* Background Glow */}
                        <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-b ${TABS.find(t => t.id === activeTab)?.color} opacity-20 blur-[80px] rounded-full -mr-16 -mt-16`} />
                        
                        <div className="flex items-center gap-3 mb-6 relative z-10">
                            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-xl">
                                ✨
                            </div>
                            <div>
                                <div className="text-xs font-bold uppercase tracking-widest text-white/60">Remixed for</div>
                                <div className="font-bold text-lg text-white">
                                    {EXAMPLES[activeTab as keyof typeof EXAMPLES].remixed.category}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4 font-medium text-indigo-100 relative z-10">
                             {EXAMPLES[activeTab as keyof typeof EXAMPLES].remixed.lines.map((line, i) => (
                                <div key={i} className="flex gap-3">
                                    <span className="opacity-30 select-none">0{i+1}</span>
                                    <span className="text-white text-lg">{line}</span>
                                </div>
                            ))}
                        </div>

                         {/* Floating Tag */}
                         <div className="absolute bottom-6 right-6">
                            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold backdrop-blur">
                                Generated by AI
                            </span>
                         </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
