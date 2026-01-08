"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { DecoderItem } from "@/types";

type Props = {
  items: DecoderItem[];
  summaryPoints?: string[];
  onFinish: () => void;
};

export default function SignalSummaryCard({ items, summaryPoints, onFinish }: Props) {
  return (
    <div className="w-full max-w-md mx-auto h-[650px] flex flex-col justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col h-full max-h-[600px]"
      >
        <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
               <ShieldCheck className="w-32 h-32" />
           </div>
           <h2 className="text-3xl font-black mb-2 relative z-10">Mission Report</h2>
           <p className="text-slate-400 relative z-10">Review your findings before extracting.</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {summaryPoints && summaryPoints.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Key Takeaways</h3>
                    <ul className="space-y-3">
                        {summaryPoints.map((point, idx) => (
                            <li key={idx} className="flex gap-3 text-slate-700 font-medium">
                                <span className="text-emerald-500 font-bold">•</span>
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div>
                 <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Threat Log</h3>
                 <div className="space-y-3">
                     {items.map((item) => (
                         <div key={item.id} className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex justify-between items-center">
                             <div>
                                 <p className="font-bold text-slate-800">&quot;{item.phrase}&quot;</p>
                                 <p className="text-xs text-slate-500">{item.actualMeaning.substring(0, 40)}...</p>
                             </div>
                             <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                 item.dangerLevel.toLowerCase().includes('run') || item.dangerLevel.toLowerCase().includes('critical') 
                                 ? "bg-red-100 text-red-600"
                                 : item.dangerLevel.toLowerCase().includes('high')
                                 ? "bg-orange-100 text-orange-600"
                                 : "bg-blue-100 text-blue-600"
                             }`}>
                                 {item.dangerLevel.split('-')[0].trim()}
                             </div>
                         </div>
                     ))}
                 </div>
            </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <button
            onClick={onFinish}
            className="w-full py-4 bg-slate-900 hover:bg-black text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            Mission Complete <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
