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
    <div className="w-full max-w-md mx-auto flex flex-col justify-center px-4 py-4 min-h-[50vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-3xl shadow-xl overflow-hidden border border-indigo-100 flex flex-col max-h-[85vh]"
      >
        <div className="bg-indigo-50 p-6 flex flex-col items-center justify-center text-center border-b border-indigo-100 shrink-0">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3 text-indigo-600">
            <Globe className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-indigo-900 leading-tight">
            {title}
          </h2>
          <span className="text-[10px] uppercase tracking-widest text-indigo-500 font-bold mt-1">
            Cultural Context
          </span>
        </div>

        <div className="p-6 flex-1 flex flex-col items-center overflow-y-auto">
            <p className="text-base text-slate-600 leading-relaxed text-center font-medium">
                {content}
            </p>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 shrink-0">
          <button
            onClick={onNext}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
          >
            Got it <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
