"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const MODES = [
  {
    id: "social-dojo",
    title: "Social Dojo",
    subtitle: "Focus: Nuance",
    description: "Read the room. Don't just translate words—learn the culturally right answer for the moment.",
    image: "/mode-dojo.png",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    delay: 0
  },
  {
    id: "open-mic",
    title: "Open Mic",
    subtitle: "Focus: Flow",
    description: "Keep them listening. Practice telling full, engaging stories from start to finish.",
    image: "/mode-open-mic.png",
    color: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    delay: 0.1
  },
  {
    id: "the-skit",
    title: "The Skit",
    subtitle: "Focus: Wit",
    description: "Think fast. Real life moves quickly. Learn to handle rapid dialogue and banter.",
    image: "/mode-skit.png",
    color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    delay: 0.2
  }
];

export default function ModeCards() {
  return (
    <section className="py-12 md:py-20 container-minimal px-4">
      <div className="text-center mb-10 space-y-2">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          Three <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 inline-block py-1">Ways to Train</span>.
        </h2>
        <p className="text-muted-foreground font-medium text-lg max-w-2xl mx-auto">
          Every scenario fits one of these styles. <br className="hidden md:block" /> Master them all.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MODES.map((mode) => (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: mode.delay, duration: 0.6, ease: "easeOut" }}
            className={`
                relative overflow-hidden rounded-[40px] p-8 md:p-10 
                border border-white/5
                bg-zinc-900/50 backdrop-blur-xl
                flex flex-col gap-6
                hover:scale-[1.02] transition-all duration-500 shadow-2xl group
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
            {/* Image */}
            <div className={`w-full aspect-[4/3] rounded-2xl overflow-hidden relative shadow-sm ${mode.color.split(" ")[1]} bg-secondary/10`}>
                <Image 
                    src={mode.image} 
                    alt={mode.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                />
            </div>

            <div>
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">{mode.title}</h3>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-zinc-400">
                        {mode.subtitle.split(": ")[1]}
                    </span>
                </div>
                <p className="text-base font-bold italic text-zinc-500 leading-relaxed">
                    {mode.description}
                </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
