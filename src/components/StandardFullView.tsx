"use client";

import { Script } from "@/types";
import { Button } from "@/components/Button";
import { ChevronLeft, Volume2, Play } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { playScenarioAudio } from "@/lib/tts";
import { useAuth } from "@/context/AuthContext";

type Props = {
  script: Script;
  onBack: () => void;
};

export default function StandardFullView({ script, onBack }: Props) {
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { userProfile } = useAuth(); // Needed for TTS check

  useEffect(() => {
      return () => {
          if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current = null;
          }
          if (window.speechSynthesis) window.speechSynthesis.cancel();
      };
  }, []);

  const speak = async (text: string, index: number, sentenceId: string) => {
    if (typeof window === "undefined") return;
    if (speakingIndex !== null) return;

    // Use Centralized Service
    playScenarioAudio(userProfile, script, {
        text,
        sentenceId,
        onStart: () => setSpeakingIndex(index),
        onEnd: () => setSpeakingIndex(null),
        onError: (err) => {
            console.error(err);
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
          <p className="text-muted-foreground">Full Script Content</p>
      </div>

      <div className="space-y-4 mt-4">
        {script.sentences?.map((sentence, index) => (
            <div key={index} className="flex gap-5 p-6 rounded-2xl border border-white/5 bg-zinc-900/40 shadow-xl hover:bg-zinc-900/60 transition-all group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
                <div className="flex-shrink-0 mt-1 relative z-10">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-950 text-[10px] font-black text-zinc-500 border border-white/5 shadow-inner">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                </div>
                <div className="flex-1 space-y-1 relative z-10">
                    <p className="text-lg font-black text-white leading-tight italic tracking-tight">
                        {sentence.goodResponse ? sentence.goodResponse.text : sentence.en}
                    </p>
                    {sentence.scenario && (
                         <p className="text-xs font-black uppercase tracking-widest text-primary/60">
                            {sentence.scenario}
                        </p>
                    )}
                </div>
                <div className="flex-shrink-0 relative z-10">
                    <button
                        onClick={() => speak(sentence.goodResponse ? sentence.goodResponse.text : sentence.en, index, sentence.id)}
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
        ))}
      </div>
    </div>
  );
}
