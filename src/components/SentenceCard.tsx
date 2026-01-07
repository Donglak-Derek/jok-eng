"use client";

import { useCallback, useMemo, useState } from "react";
import type { Sentence } from "@/types";
import { Button } from "@/components/Button";
import { AudioLines } from "lucide-react";

type Props = {
  sentence: Sentence;
  index: number;
  heard: boolean;
  onHeard: (index: number) => void;
};

export default function SentenceCard({ sentence, index, heard, onHeard }: Props) {
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);

  const speak = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (speaking || loading) return; // avoid restarting while speaking/loading
    if (!heard) {
      onHeard(index);
    }
    
    const textToSpeak = sentence.goodResponse ? sentence.goodResponse.text : sentence.en;
    setLoading(true);

    try {
      // Direct stream URL - starts playing immediately (no waiting for blob download)
      const params = new URLSearchParams({
        text: textToSpeak,
        voice: "en-US-AriaNeural", 
      });
      
      const audio = new Audio(`/api/tts?${params}`);
      
      await new Promise<void>((resolve, reject) => {
        // Event listeners before play
        audio.oncanplay = () => {
             setLoading(false);
             setSpeaking(true);
        };
        audio.onended = () => resolve();
        audio.onerror = (e) => reject(e);
        
        // .play() returns a promise that rejects if autoplay is blocked
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(reject);
        }
      });
      
    } catch (error) {
       console.warn("High-quality TTS failed/blocked, falling back to system voice:", error);
       
       // Fallback to Web Speech API
       await new Promise<void>((resolve) => {
         // Reset explicit loading since fallback is instant
         setLoading(false);
         setSpeaking(true);
         
         const u = new SpeechSynthesisUtterance(textToSpeak);
         u.lang = "en-US";
         u.rate = 1;
         u.onend = () => resolve();
         u.onerror = () => resolve(); 
         window.speechSynthesis.speak(u);
       });
    } finally {
      setSpeaking(false);
      setLoading(false);
    }
  }, [heard, index, onHeard, sentence.en, sentence.goodResponse, speaking, loading]);

  const keywords = useMemo(() => sentence.keywords, [sentence.keywords]);

  // Audio Visualizer Component - Minimalist Lines
  const AudioVisualizer = () => (
    <div className="flex items-center justify-center gap-1 h-4">
      <div className="w-0.5 bg-current animate-[pulse_0.5s_infinite] h-2"></div>
      <div className="w-0.5 bg-current animate-[pulse_0.7s_infinite] h-4"></div>
      <div className="w-0.5 bg-current animate-[pulse_0.6s_infinite] h-3"></div>
      <div className="w-0.5 bg-current animate-[pulse_0.8s_infinite] h-2"></div>
    </div>
  );

  // New "Mistake -> Fix" Layout (Minimalist)
  if (sentence.scenario && sentence.badResponse && sentence.goodResponse) {
    return (
      <div className="bg-white rounded-lg border border-border p-6 md:p-8 flex flex-col gap-8 shadow-sm transition-shadow hover:shadow-md">
        {/* Scenario Header */}
        <div className="pb-4 border-b border-border">
          <div className="text-xs font-semibold tracking-wider text-muted uppercase mb-2">
            Scenario
          </div>
          <div className="text-xl md:text-2xl font-semibold text-foreground">
            {sentence.scenario}
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col gap-6">
          {/* Bad Response (Mistake) */}
          <div className="p-5 rounded-md bg-secondary/50">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
              Don&apos;t say
            </div>
            <div className="text-lg md:text-xl text-muted-foreground mb-2 line-through decoration-muted-foreground/30">
              &quot;{sentence.badResponse.text}&quot;
            </div>
            <div className="text-sm text-muted-foreground">
              {sentence.badResponse.why}
            </div>
          </div>

          {/* Good Response (Fix) */}
          <div className="p-5 rounded-md bg-primary/5 border-l-2 border-primary">
            <div className="text-xs font-bold text-primary uppercase tracking-wide mb-2">
              Better
            </div>
            <div className="text-xl md:text-2xl font-bold text-foreground mb-2">
              &quot;{sentence.goodResponse.text}&quot;
            </div>
            <div className="text-base text-foreground/80">
              {sentence.goodResponse.why}
            </div>
          </div>
        </div>

        {/* Keywords hint */}
        {keywords.length > 0 && (
           <div className="flex flex-wrap gap-2 mt-2">
            {keywords.map((k) => (
                <span
                  key={k.word}
                  className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground"
                >
                <span className="font-semibold">{k.word}</span>
                <span className="opacity-70">: {k.definition}</span>
              </span>
            ))}
           </div>
        )}

        <Button
          onClick={(e) => {
            e.stopPropagation();
            speak();
          }}
          className="w-full mt-2 h-12 text-base font-medium rounded-md"
          variant="primary"
          isLoading={loading}
        >
            {speaking ? <AudioVisualizer /> : <span className="flex items-center gap-2">Play Audio</span>}
        </Button>
      </div>
    );
  }

  // Original Layout (Flashcard Fallback)
  return (
    <div className="bg-white rounded-lg border border-border p-8 md:p-12 flex flex-col gap-8 shadow-sm transition-all hover:shadow-md text-center">
      
      <div className="flex flex-col gap-6 items-center">
         {/* Index Badge */}
         <div className="text-xs font-semibold text-muted uppercase tracking-widest">
            Sentence {index + 1}
         </div>

         {/* Main Sentence */}
         <div className="relative">
            <h3 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">
              &quot;{sentence.en}&quot;
            </h3>
         </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {keywords.map((k) => (
          <span
            key={k.word}
            className="text-sm px-3 py-1 bg-secondary text-secondary-foreground rounded-full"
          >
            <span className="font-semibold">{k.word}</span>
            <span className="text-muted-foreground ml-1">{k.definition}</span>
          </span>
        ))}
      </div>

      {/* Full width play button */}
      <Button
         onClick={(e) => {
           e.stopPropagation();
           speak();
         }}
         variant={speaking ? "outline" : "primary"}
         size="lg"
         isLoading={loading}
         className="w-full h-14 text-lg font-medium rounded-md mt-4"
      >
          {speaking ? <AudioVisualizer /> : <span className="flex items-center gap-2"><AudioLines className="w-5 h-5" /> Play Audio</span>}
      </Button>
    </div>
  );
}
