"use client";

import { Script } from "@/types";
import { Button } from "@/components/Button";
import { ChevronLeft, Volume2, Play, AlertTriangle, ShieldCheck } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type Props = {
  script: Script;
  onBack: () => void;
};

export default function DecoderFullView({ script, onBack }: Props) {
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const items = script.decoderItems || [];
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Cleanup audio on unmount
  useEffect(() => {
      return () => {
          if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current = null;
          }
          if (window.speechSynthesis) window.speechSynthesis.cancel();
      };
  }, []);

  const speak = async (text: string, index: number) => {
    if (typeof window === "undefined") return;
    if (speakingIndex !== null) return;

    setSpeakingIndex(index);

    try {
      const params = new URLSearchParams({
        text: text,
        voice: "en-US-AriaNeural",
      });

      const audio = new Audio(`/api/tts?${params}`);
      audioRef.current = audio;
      
      await new Promise<void>((resolve, reject) => {
        audio.onended = () => resolve();
        audio.onerror = (e) => reject(e);
        audio.play().catch(reject);
      });
    } catch {
       const u = new SpeechSynthesisUtterance(text);
       u.lang = "en-US";
       u.onend = () => setSpeakingIndex(null);
       window.speechSynthesis.speak(u);
       return;
    } finally {
        // Handled in onend for fallback, but for audio api we reset after await
    }
    setSpeakingIndex(null);
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
            <div key={index} className="flex flex-col gap-4 p-6 rounded-lg border border-border bg-white shadow-sm hover:shadow-md transition-shadow">
                
                {/* Header Row: Signal + Play Button */}
                <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 mt-1">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                            {index + 1}
                        </span>
                    </div>
                    
                    <div className="flex-1">
                        <p className="text-xl font-bold text-foreground leading-snug">
                            &quot;{item.phrase}&quot;
                        </p>
                    </div>

                    <div className="flex-shrink-0">
                        <button
                            onClick={() => speak(item.phrase, index)}
                            disabled={speakingIndex !== null}
                            className={`p-2 rounded-full transition-colors ${
                                speakingIndex === index 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
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
                <div className="pl-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-red-50 p-4 rounded-lg border border-red-100/50">
                         <div className="flex items-center gap-2 text-red-700 font-bold text-sm mb-2">
                            <AlertTriangle className="w-4 h-4" />
                            Hidden Risk
                         </div>
                         <p className="text-red-900/80 text-sm leading-relaxed">
                             {item.actualMeaning}
                         </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg border border-green-100/50">
                         <div className="flex items-center gap-2 text-green-700 font-bold text-sm mb-2">
                            <ShieldCheck className="w-4 h-4" />
                            Smart Move
                         </div>
                         <p className="text-green-900/80 text-sm leading-relaxed">
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
