"use client";

import { Script } from "@/types";
import { Button } from "@/components/Button";
import { ChevronLeft, Volume2, Play, AlertTriangle, ShieldCheck } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { playScenarioAudio } from "@/lib/tts";
import { useAuth } from "@/context/AuthContext";

type Props = {
  script: Script;
  onBack: () => void;
};

export default function DecoderFullView({ script, onBack }: Props) {
  // Need auth for centralized TTS
  const { userProfile } = useAuth(); 
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const items = script.decoderItems || [];
  
  // Cleanup audio on unmount (handled mostly by centralized lib now for native, but safe to keep)
  useEffect(() => {
      return () => {
          if (window.speechSynthesis) window.speechSynthesis.cancel();
      };
  }, []);

  const speak = async (text: string, index: number) => {
    if (speakingIndex !== null) return;
    setSpeakingIndex(index);

    const itemId = items[index].id;

    playScenarioAudio(userProfile, script, {
        text: text,
        sentenceId: itemId,
        onStart: () => setSpeakingIndex(index),
        onEnd: () => setSpeakingIndex(null),
        onError: (e) => {
            console.error(e);
            setSpeakingIndex(null);
        }
    });
  };

  return (
    <div className="flex-1 max-w-3xl mx-auto px-4 pt-4 pb-8 md:px-6 md:pt-6 md:pb-12 flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="-ml-2 text-muted-foreground hover:text-foreground"
            leftIcon={<ChevronLeft className="w-5 h-5" />}
        >
            Back to Flow
        </Button>
      </div>

      <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            {script.title}
          </h1>
          <p className="text-muted-foreground">All Signals Decoded</p>
      </div>

      <div className="space-y-4 mt-4">
        {items.map((item, index) => (
            <div key={index} className="flex flex-col gap-6 p-6 md:p-8 rounded-[32px] border border-white/5 bg-zinc-900/40 shadow-2xl group overflow-hidden relative transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
                
                {/* Header Row: Signal + Play Button */}
                <div className="flex gap-4 items-start relative z-10">
                    <div className="flex-shrink-0 mt-1">
                        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-950 text-[10px] font-black text-zinc-500 border border-white/5 shadow-inner">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                    </div>
                    
                    <div className="flex-1">
                        <p className="text-xl md:text-2xl font-black text-white italic leading-tight tracking-tight uppercase">
                            &quot;{item.phrase}&quot;
                        </p>
                    </div>

                    <div className="flex-shrink-0">
                        <button
                            onClick={() => speak(item.phrase, index)}
                            disabled={speakingIndex !== null}
                            className={`p-3 rounded-xl transition-all shadow-2xl ${
                                speakingIndex === index 
                                ? "bg-primary text-white scale-110 shadow-primary/30" 
                                : "bg-zinc-950 text-zinc-500 border border-white/5 hover:bg-primary hover:text-white hover:border-primary/50"
                            }`}
                            aria-label="Play audio"
                        >
                            {speakingIndex === index ? (
                                <Volume2 className="w-5 h-5 animate-pulse" />
                            ) : (
                                <Play className="w-5 h-5 ml-0.5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Details Row: Risk & Tip */}
                <div className="pl-11 grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
                    <div className="bg-rose-500/10 p-5 rounded-2xl border border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.05)]">
                         <div className="flex items-center gap-2 text-rose-400 font-black uppercase tracking-[0.2em] text-[10px] mb-3">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Hidden Risk
                         </div>
                         <p className="text-zinc-300 text-sm leading-relaxed font-medium">
                             {item.actualMeaning}
                         </p>
                    </div>

                    <div className="bg-emerald-500/10 p-5 rounded-2xl border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.05)]">
                         <div className="flex items-center gap-2 text-emerald-400 font-black uppercase tracking-[0.2em] text-[10px] mb-3">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Smart Move
                         </div>
                         <p className="text-zinc-300 text-sm leading-relaxed font-medium">
                             {item.survivalTip}
                         </p>
                    </div>
                </div>

            </div>
        ))}
      </div>
    </div>
  );
}
