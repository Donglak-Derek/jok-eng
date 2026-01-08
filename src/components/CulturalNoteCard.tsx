"use client";

import { motion } from "framer-motion";
import { Globe, ArrowRight } from "lucide-react";

type Props = {
  title: string;
  content: string;
  onNext: () => void;
};

export default function CulturalNoteCard({ title, content, onNext }: Props) {
  return (
    <div className="w-full max-w-md mx-auto h-[600px] flex flex-col justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-3xl shadow-xl overflow-hidden border border-indigo-100 flex flex-col"
      >
        <div className="bg-indigo-50 p-8 flex flex-col items-center justify-center text-center border-b border-indigo-100">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
            <Globe className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-indigo-900 leading-tight">
            {title}
          </h2>
          <span className="text-xs uppercase tracking-widest text-indigo-500 font-bold mt-2">
            Cultural Context
          </span>
        </div>

        <div className="p-8 flex-1 flex flex-col items-center">
            <p className="text-lg text-slate-600 leading-relaxed text-center font-medium">
                {content}
            </p>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <button
            onClick={onNext}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
          >
            Got it <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
