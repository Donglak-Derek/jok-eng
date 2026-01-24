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
      if (l.includes("critical") || l.includes("run") || l.includes("red flag") || l.includes("high")) return "text-red-600 bg-red-50 border-red-100";
      if (l.includes("medium") || l.includes("caution") || l.includes("flake")) return "text-orange-600 bg-orange-50 border-orange-100";
      return "text-green-600 bg-green-50 border-green-100";
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
            <div key={index} className="flex flex-col gap-3 p-5 rounded-lg border border-border bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start gap-4">
                    <div className="flex gap-3">
                         <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-xs font-bold text-secondary-foreground mt-0.5">
                            {index + 1}
                        </span>
                        <div>
                            <h3 className="text-lg font-bold text-foreground leading-tight">
                                &quot;{item.phrase}&quot;
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">Literal: {item.literalMeaning}</p>
                        </div>
                    </div>
                     <button
                        onClick={() => speak(item.phrase, index)}
                        disabled={speakingIndex !== null}
                        className={`p-2 rounded-full transition-colors flex-shrink-0 ${
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
                
                <div className="flex flex-col gap-2 pl-9 bg-secondary/10 p-3 rounded-md mt-1">
                     <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase text-muted-foreground">Meaning:</span>
                        <span className="font-medium text-foreground">{item.actualMeaning}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase text-muted-foreground">Traffic Light:</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded border ${getDangerColor(item.dangerLevel)}`}>
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
