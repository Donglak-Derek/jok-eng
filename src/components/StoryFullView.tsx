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

export default function StoryFullView({ script, onBack }: Props) {
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

    const segmentId = `seg_${index}`; // Matching StoryFlow convention

    playScenarioAudio(userProfile, script, {
        text: text,
        sentenceId: segmentId,
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
          <p className="text-muted-foreground">{script.cleanedEnglish}</p>
      </div>

      <div className="space-y-6 mt-4">
        {script.segments?.map((segment, index) => (
            <div key={index} className="flex gap-4 p-4 rounded-lg border border-border bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 mt-1">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                        {index + 1}
                    </span>
                </div>
                <div className="flex-1 space-y-2">
                    <p className="text-lg font-medium text-foreground leading-relaxed">
                        {segment.text}
                    </p>
                    {segment.note && (
                        <p className="text-sm text-muted-foreground italic">
                            {segment.note}
                        </p>
                    )}
                </div>
                <div className="flex-shrink-0">
                    <button
                        onClick={() => speak(segment.text, index)}
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
        ))}
      </div>
    </div>
  );
}
