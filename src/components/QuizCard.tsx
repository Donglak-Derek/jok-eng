"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight, HelpCircle } from "lucide-react";
import confetti from "canvas-confetti";

type QuizItem = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

type Props = {
  items: QuizItem[];
  onFinish: () => void;
};

export default function QuizCard({ items, onFinish }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false); // Result for current question
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentItem = items[currentIndex];

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
    setShowResult(true);
    
    if (index === currentItem.correctIndex) {
      setScore((prev) => prev + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#22c55e", "#4ade80"] // Green confetti
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setIsCompleted(true);
      confetti({
         particleCount: 150,
         spread: 100,
         origin: { y: 0.6 }
      });
    }
  };

  if (isCompleted) {
      return (
        <div className="w-full max-w-md mx-auto min-h-[50vh] flex flex-col justify-center px-4 py-8">
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-900/50 rounded-[40px] shadow-2xl overflow-hidden border border-white/5 p-12 text-center flex flex-col items-center justify-center gap-8 backdrop-blur-xl relative"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                <div className="w-24 h-24 bg-primary/10 text-primary rounded-3xl flex items-center justify-center border border-primary/20 shadow-[0_0_30px_rgba(var(--primary),0.2)]">
                    <span className="text-4xl">🏆</span>
                </div>
                <div>
                    <h2 className="text-4xl font-black italic text-white mb-2 uppercase tracking-tighter">Challenge Complete</h2>
                    <p className="text-zinc-500 text-lg uppercase font-bold tracking-widest">Efficiency: {score} / {items.length}</p>
                </div>
                <button
                    onClick={onFinish}
                    className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-lg hover:opacity-90 transition-all shadow-2xl shadow-primary/20"
                >
                    Return to Session
                </button>
             </motion.div>
        </div>
      );
  }

  return (
      <div className="w-full max-w-md mx-auto min-h-[50vh] flex flex-col justify-center px-4 py-4">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-zinc-900/50 rounded-[40px] shadow-2xl overflow-hidden border border-white/5 flex flex-col max-h-[85vh] backdrop-blur-xl relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
        {/* Header */}
        <div className="bg-zinc-950/80 p-6 border-b border-white/5 flex justify-between items-center relative z-10">
            <div className="flex items-center gap-3 text-zinc-400 font-black uppercase tracking-widest text-xs">
                <HelpCircle className="w-4 h-4 text-primary" />
                <span>Progress Check {currentIndex + 1}/{items.length}</span>
            </div>
            <span className="text-[10px] font-black bg-zinc-900 border border-white/10 px-3 py-1.5 rounded uppercase tracking-[0.2em] text-zinc-500">
                Score: {score}
            </span>
        </div>

        {/* Question */}
        <div className="p-8 pb-4 relative z-10">
             <h3 className="text-2xl font-black text-white italic leading-tight tracking-tight uppercase">
                {currentItem.question}
             </h3>
        </div>

        {/* Options */}
        <div className="p-8 pt-4 flex-1 flex flex-col gap-4 overflow-y-auto relative z-10">
             {currentItem.options.map((option, idx) => {
                 let stateStyles = "bg-zinc-900 border-white/5 hover:border-primary/50 hover:bg-primary/5 text-zinc-300";
                 if (showResult) {
                     if (idx === currentItem.correctIndex) {
                         stateStyles = "bg-emerald-500/10 border-emerald-500/50 text-emerald-400";
                     } else if (idx === selectedOption) {
                         stateStyles = "bg-rose-500/10 border-rose-500/50 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.1)]";
                     } else {
                         stateStyles = "opacity-30 grayscale border-white/5 text-zinc-600";
                     }
                 }

                 return (
                     <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        disabled={showResult}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all font-medium text-lg relative ${stateStyles}`}
                     >
                        {option}
                        {showResult && idx === currentItem.correctIndex && (
                            <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-green-600" />
                        )}
                        {showResult && idx === selectedOption && idx !== currentItem.correctIndex && (
                            <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-red-500" />
                        )}
                     </button>
                 );
             })}
        </div>
        
        {/* Explanation & Next */}
        <AnimatePresence>
             {showResult && (
                 <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="bg-zinc-950/50 p-8 border-t border-white/5 relative z-10"
                 >
                     <p className="text-sm text-zinc-400 mb-6 bg-zinc-900 p-5 rounded-2xl border border-white/5 leading-relaxed">
                         <strong className="text-primary uppercase tracking-widest text-[10px] block mb-2">Insight:</strong> {currentItem.explanation}
                     </p>
                     <button
                        onClick={handleNext}
                        className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:opacity-90 shadow-2xl shadow-primary/20"
                     >
                        {currentIndex < items.length - 1 ? "Next Analysis" : "Finish"} <ArrowRight className="w-5 h-5" />
                     </button>
                 </motion.div>
             )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}
