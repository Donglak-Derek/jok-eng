"use client";

import { Script } from "@/types";
import { Button } from "@/components/Button";
import { ChevronLeft, Volume2, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { playScenarioAudio } from "@/lib/tts";
import { useAuth } from "@/context/AuthContext";

type Props = {
  script: Script;
  onBack: () => void;
};

export default function SignalFullView({ script, onBack }: Props) {
  // Need auth for centralized TTS
  const { userProfile } = useAuth(); 
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  
  // Cleanup
  useEffect(() => {
      return () => {
          if (window.speechSynthesis) window.speechSynthesis.cancel();
      };
  }, []);

  const speak = async (text: string, index: number) => {
    if (speakingIndex !== null) return;
    setSpeakingIndex(index);
    
    // Safety check
    if (!script.decoderItems || !script.decoderItems[index]) return;

    const itemId = script.decoderItems[index].id;

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

  const getDangerColor = (level: string) => {
      const l = level.toLowerCase();
      if (l.includes("critical") || l.includes("run") || l.includes("red flag") || l.includes("high")) {
          return "text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)]";
      }
      if (l.includes("medium") || l.includes("caution") || l.includes("flake")) {
          return "text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]";
      }
      return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]";
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
        {script.decoderItems?.map((item, index) => (
            <div key={index} className="flex flex-col gap-4 p-6 rounded-2xl border border-white/5 bg-zinc-900/40 shadow-xl group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
                <div className="flex justify-between items-start gap-4 relative z-10">
                    <div className="flex gap-4">
                         <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-950 text-[10px] font-black text-zinc-500 border border-white/5 shadow-inner mt-1">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <div>
                            <h3 className="text-xl font-black text-white italic tracking-tight leading-tight uppercase">
                                &quot;{item.phrase}&quot;
                            </h3>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mt-2">Literal Decryption: {item.literalMeaning}</p>
                        </div>
                    </div>
                     <button
                        onClick={() => speak(item.phrase, index)}
                        disabled={speakingIndex !== null}
                        className={`p-3 rounded-xl transition-all shadow-2xl flex-shrink-0 ${
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
                
                <div className="flex flex-col gap-3 pl-11 bg-zinc-950/40 p-5 rounded-2xl mt-1 border border-white/5 relative z-10">
                     <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Calculated Meaning:</span>
                        <span className="font-bold text-zinc-200">{item.actualMeaning}</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Protocol Stance:</span>
                        <span className={`text-[9px] font-black px-3 py-1 rounded uppercase tracking-widest border ${getDangerColor(item.dangerLevel)}`}>
                            {item.dangerLevel}
                        </span>
                     </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}
