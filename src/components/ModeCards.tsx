"use client";

import { motion } from "framer-motion";
import { Mic, Clapperboard, Award } from "lucide-react";

const MODES = [
  {
    id: "social-dojo",
    title: "Social Dojo",
    subtitle: "Focus: Nuance",
    description: "Don't just translate. Learen the calibrated, culturally correct native response.",
    icon: Award,
    color: "bg-blue-50 text-blue-600 border-blue-200",
    delay: 0
  },
  {
    id: "open-mic",
    title: "Open Mic",
    subtitle: "Focus: Stamina",
    description: "Can you hold the floor? Practice telling engaging stories with a beginning, middle, and end.",
    icon: Mic,
    color: "bg-pink-50 text-pink-600 border-pink-200",
    delay: 0.1
  },
  {
    id: "the-skit",
    title: "The Skit",
    subtitle: "Focus: Wit",
    description: "Real life is fast. Keep up with rapid-fire dialogue and banter.",
    icon: Clapperboard,
    color: "bg-purple-50 text-purple-600 border-purple-200",
    delay: 0.2
  }
];

export default function ModeCards() {
  return (
    <section className="py-12 md:py-20 container-minimal px-4">
      <div className="text-center mb-10 space-y-2">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          Three ways to <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 inline-block py-1">play</span>.
        </h2>
        <p className="text-muted-foreground font-medium">
          Choose your arena.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MODES.map((mode) => (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: mode.delay, duration: 0.5 }}
            className={`
                relative overflow-hidden rounded-3xl p-6 md:p-8 
                border-2 ${mode.color.split(" ")[2]} 
                ${mode.color.split(" ")[0]} 
                flex flex-col gap-4
                hover:scale-[1.02] transition-transform duration-300 shadow-sm
            `}
          >
            {/* Icon */}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white shadow-sm ${mode.color.split(" ")[1]} relative`}>
                <mode.icon className="w-7 h-7 stroke-[2.5]" />
            </div>

            <div>
                <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-black uppercase tracking-tight text-foreground/90">{mode.title}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-white/60 px-2 py-1 rounded-full text-foreground/50">
                        {mode.subtitle.split(": ")[1]}
                    </span>
                </div>
                <p className="text-sm md:text-base font-medium text-foreground/70 leading-relaxed">
                    {mode.description}
                </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
