"use client";

import { useCallback, useMemo, useState } from "react";
import type { Sentence } from "@/types";
import { Button } from "@/components/Button";

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



  // Audio Visualizer Component
  const AudioVisualizer = () => (
    <div className="flex items-end justify-center gap-1 h-5">
      <div className="w-1 bg-current animate-[bounce_0.5s_infinite] h-2"></div>
      <div className="w-1 bg-current animate-[bounce_0.7s_infinite] h-4"></div>
      <div className="w-1 bg-current animate-[bounce_0.6s_infinite] h-3"></div>
      <div className="w-1 bg-current animate-[bounce_0.8s_infinite] h-5"></div>
      <div className="w-1 bg-current animate-[bounce_0.55s_infinite] h-2"></div>
    </div>
  );

  // New "Mistake -> Fix" Layout
  if (sentence.scenario && sentence.badResponse && sentence.goodResponse) {
    return (
      <div
        className={
          "relative rounded-3xl border border-secondary/35 p-6 md:p-8 lg:p-10 flex flex-col gap-8 md:gap-10 transition duration-200 bg-card/80 shadow-[0_10px_60px_rgba(34,19,74,0.7)] " +
          (speaking
            ? "ring-2 ring-primary/80 shadow-[0_0_40px_rgba(34,211,238,0.5)] border-primary "
            : "hover:border-primary/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] ") +
          (heard ? "border-primary/50 bg-card/40" : "")
        }
      >
        {/* Scenario Header */}
        <div className="pb-3 border-b border-secondary/20">
          <div className="text-xs font-bold tracking-widest text-primary uppercase mb-1">
            Scenario
          </div>
          <div className="text-base md:text-2xl font-medium text-foreground">
            {sentence.scenario}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {/* Bad Response (Mistake) */}
          <div className="relative p-4 rounded-2xl bg-destructive/10 border border-destructive/20">
            <div className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full bg-destructive/20 border border-destructive/30 backdrop-blur text-[10px] font-bold text-destructive uppercase tracking-wider">
              Mistake
            </div>
            <div className="text-lg md:text-2xl font-bold text-destructive mb-3 font-mono">
              &quot;{sentence.badResponse.text}&quot;
            </div>
            <div className="text-xs md:text-sm text-destructive/70 leading-relaxed">
              {sentence.badResponse.why}
            </div>
          </div>

          {/* Good Response (Fix) */}
          <div className="relative p-4 rounded-2xl bg-success/10 border border-success/20">
            <div className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full bg-success/20 border border-success/30 backdrop-blur text-[10px] font-bold text-success uppercase tracking-wider">
              Better Fix
            </div>
            <div className="text-lg md:text-2xl font-bold text-success mb-3 font-mono">
              &quot;{sentence.goodResponse.text}&quot;
            </div>
            <div className="text-xs md:text-lg text-success/70 leading-relaxed">
              {sentence.goodResponse.why}
            </div>
          </div>
        </div>

        {/* Play Hint */}
        {keywords.length > 0 && (
           <div className="flex flex-wrap gap-2 mt-1 pt-3 border-t border-secondary/20 mb-2">
            {keywords.map((k) => (
                <span
                  key={k.word}
                  className="text-xs md:text-base px-2.5 md:px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/35"
                >
                <span className="font-semibold text-secondary">{k.word}</span>
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
          variant="outline"
          size="md"
          isLoading={loading}
          className="w-full border-primary bg-primary/5 text-primary tracking-widest uppercase hover:bg-primary/10"
          aria-label={loading ? "Loading audio" : "Play correct response"}
        >
            {speaking ? <AudioVisualizer /> : "Play Audio"}
        </Button>
      </div>
    );
  }

  // Original Layout (Fallback)
  return (
    <div
      className={
        "relative rounded-3xl border border-secondary/20 p-6 md:p-10 flex flex-col gap-6 md:gap-10 transition duration-300 shadow-[0_10px_60px_rgba(34,19,74,0.4)] overflow-hidden group " +
        (speaking
          ? "bg-card/90 ring-1 ring-primary/50 shadow-[0_0_50px_rgba(34,211,238,0.2)]"
          : "bg-card/60 backdrop-blur-xl hover:border-primary/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:bg-card/80")
      }
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 p-10 opacity-5 select-none pointer-events-none transition-opacity duration-300 group-hover:opacity-10">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-secondary">
          <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.0171 16H9C9.00001 15 9.00001 14.0001 9 13C9 10.0001 10 9.00001 13 9.00001V7.00001C8.00001 7.00001 7.00001 9.00001 7 13V21H14.017ZM21.017 21L21.017 18C21.017 16.8954 20.1216 16 19.0171 16H16C16 15 16 14.0001 16 13C16 10.0001 17 9.00001 20 9.00001V7.00001C15 7.00001 14 9.00001 14 13V21H21.017Z" />
        </svg>
      </div>
      
      {/* Gradient Mesh Blob */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none mix-blend-screen" />

      <div className="min-w-0 relative z-10 flex flex-col gap-6 text-center items-center py-4">
         {/* Index Badge */}
         <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-secondary/20 bg-secondary/5 text-xs font-bold uppercase tracking-widest text-secondary/80">
            Card {index + 1}
         </div>

         {/* Main Sentence */}
         <div className="relative">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight bg-gradient-to-b from-foreground to-foreground/80 text-transparent bg-clip-text drop-shadow-sm px-4">
              &quot;{sentence.en}&quot;
            </h3>
         </div>

         {/* Divider */}
         <div className="w-16 h-1 bg-gradient-to-r from-transparent via-secondary/20 to-transparent rounded-full" />
      </div>

      <div className="flex flex-wrap justify-center gap-2 md:gap-3 relative z-10">
        {keywords.map((k) => (
          <span
            key={k.word}
            className="text-sm md:text-lg px-3 md:px-5 py-2 rounded-xl bg-background/50 border border-white/5 backdrop-blur-md shadow-sm transition-all hover:scale-105 hover:bg-background/80 hover:border-secondary/30"
          >
            <span className="font-bold text-secondary">{k.word}</span>
            <span className="text-muted-foreground ml-1 font-medium">{k.definition}</span>
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
         className={"w-full relative z-10 shadow-xl transition-all duration-300 " + (speaking ? "border-primary/50 text-primary bg-primary/5" : "hover:scale-[1.01]")}
         aria-label={loading ? "Loading audio" : "Play sentence"}
      >
          {speaking ? <AudioVisualizer /> : <span className="flex items-center gap-2 text-base">🔊 Play Audio</span>}
      </Button>
    </div>
  );
}
