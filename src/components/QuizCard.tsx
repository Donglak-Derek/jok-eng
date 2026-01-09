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
                className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 p-8 text-center flex flex-col items-center justify-center gap-6"
             >
                <div className="w-24 h-24 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-4xl">🏆</span>
                </div>
                <div>
                    <h2 className="text-3xl font-black text-slate-800 mb-2">Quiz Complete!</h2>
                    <p className="text-slate-500 text-lg">You scored {score} out of {items.length}</p>
                </div>
                <button
                    onClick={onFinish}
                    className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors"
                >
                    Finish
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
        className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-2 text-slate-600 font-bold">
                <HelpCircle className="w-5 h-5" />
                <span>Quiz {currentIndex + 1}/{items.length}</span>
            </div>
            <span className="text-xs font-mono bg-slate-200 px-2 py-1 rounded text-slate-600">
                Score: {score}
            </span>
        </div>

        {/* Question */}
        <div className="p-6 pb-2">
             <h3 className="text-xl font-bold text-slate-800 leading-snug">
                {currentItem.question}
             </h3>
        </div>

        {/* Options */}
        <div className="p-6 pt-2 flex-1 flex flex-col gap-3 overflow-y-auto">
             {currentItem.options.map((option, idx) => {
                 let stateStyles = "bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50";
                 if (showResult) {
                     if (idx === currentItem.correctIndex) {
                         stateStyles = "bg-green-50 border-green-500 text-green-700";
                     } else if (idx === selectedOption) {
                         stateStyles = "bg-red-50 border-red-500 text-red-700";
                     } else {
                         stateStyles = "opacity-50 grayscale border-transparent";
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
                    className="bg-slate-50 p-6 border-t border-slate-100"
                 >
                     <p className="text-sm text-slate-600 mb-4 bg-white p-3 rounded-lg border border-slate-100">
                         <strong>💡 Explanation:</strong> {currentItem.explanation}
                     </p>
                     <button
                        onClick={handleNext}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                     >
                        {currentIndex < items.length - 1 ? "Next Question" : "See Results"} <ArrowRight className="w-4 h-4" />
                     </button>
                 </motion.div>
             )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}
