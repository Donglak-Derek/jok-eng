"use client";

import { motion } from "framer-motion";
import { Globe, ArrowRight } from "lucide-react";

type Props = {
  title: string;
  content: string;
  vocabulary?: { word: string; definition: string; }[];
  onNext: () => void;
};

export default function CulturalNoteCard({ title, content, vocabulary, onNext }: Props) {
  return (
    <div 
      className="w-full max-w-md mx-auto flex flex-col justify-center px-4 py-4 min-h-[50vh] cursor-pointer"
      onClick={onNext}
      title="Tap anywhere to continue"
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(e, { offset }) => {
          const swipe = offset.x; // detected swipe distance
          if (swipe < -100 || swipe > 100) {
            onNext();
          }
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, x: -100 }} // Animate out left
        onClick={(e) => e.stopPropagation()} // Stop backdrop click from firing on content tap
        className="bg-zinc-900/50 rounded-[40px] shadow-2xl overflow-hidden border border-white/5 flex flex-col max-h-[85vh] cursor-auto relative backdrop-blur-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        <div className="bg-zinc-950/30 p-8 flex flex-col items-center justify-center text-center border-b border-white/5 shrink-0 relative z-10">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary border border-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.1)]">
            <Globe className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-tight">
            {title}
          </h2>
          <span className="text-[10px] uppercase font-black tracking-[0.3em] text-zinc-500 mt-2">
            Intelligence Report
          </span>
          <div className="absolute top-4 right-6 md:hidden text-zinc-600 text-[10px] font-black uppercase tracking-widest animate-pulse">
             Swipe ↔
          </div>
        </div>

        <div className="p-8 flex-1 flex flex-col items-center overflow-y-auto relative z-10">
            <p className="text-lg text-zinc-300 leading-relaxed text-center font-medium mb-8">
                {content}
            </p>

            {vocabulary && vocabulary.length > 0 && (
                <div className="w-full bg-zinc-950/50 rounded-2xl p-6 border border-white/5 shadow-inner">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4 text-center">
                        Sector Lexicon
                    </h3>
                    <ul className="space-y-3">
                        {vocabulary.map((item, idx) => (
                            <li key={idx} className="text-sm text-zinc-400 leading-snug">
                                <span className="font-black text-primary uppercase tracking-wider">{item.word}</span> <span className="text-zinc-600 mx-1">:</span> <span className="opacity-90">{item.definition}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

        <div className="p-6 bg-zinc-950/80 border-t border-white/5 shrink-0 relative z-10">
          <button
            onClick={onNext}
            className="w-full py-5 bg-primary hover:opacity-90 active:scale-[0.98] text-white rounded-2xl font-black uppercase tracking-widest text-lg transition-all flex items-center justify-center gap-3 shadow-2xl shadow-primary/20"
          >
            Acknowledge <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-center text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mt-4 md:hidden">
              Swipe or Tap outside to proceed
          </p>
        </div>
      </motion.div>
    </div>
  );
}
