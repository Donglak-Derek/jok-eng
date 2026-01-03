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

  // New "Mistake -> Fix" Layout (Comic/Notebook Style)
  if (sentence.scenario && sentence.badResponse && sentence.goodResponse) {
    return (
      <div
        className={
          "relative rounded-xl border-2 border-black bg-white p-6 md:p-8 flex flex-col gap-8 transition duration-200 hard-shadow " +
          (speaking
            ? "ring-2 ring-primary "
            : "") +
          (heard ? "opacity-90" : "")
        }
      >
        {/* Scenario Header */}
        <div className="pb-3 border-b-2 border-black/5 border-dashed">
          <div className="font-hand text-xs font-bold tracking-widest text-gray-500 uppercase mb-1 -rotate-1">
            Scenario
          </div>
          <div className="font-sans text-xl md:text-2xl font-black text-black">
            {sentence.scenario}
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col gap-6">
          {/* Bad Response (Mistake) */}
          <div className="relative p-5 rounded-lg border-2 border-secondary bg-secondary/10 transform -rotate-1">
            <div className="absolute -top-3 left-4 px-3 py-1 rounded-sm bg-secondary border-2 border-black text-xs font-black text-white uppercase tracking-wider shadow-sm transform -rotate-2">
              Mistake
            </div>
            <div className="text-lg md:text-2xl font-bold text-black mb-2 mt-2 font-hand">
              &quot;{sentence.badResponse.text}&quot;
            </div>
            <div className="text-sm text-gray-700 leading-snug">
              {sentence.badResponse.why}
            </div>
          </div>

          {/* Good Response (Fix) */}
          <div className="relative p-5 rounded-lg border-2 border-primary bg-primary/10 transform rotate-1">
            <div className="absolute -top-3 left-4 px-3 py-1 rounded-sm bg-primary border-2 border-black text-xs font-black text-black uppercase tracking-wider shadow-sm transform -rotate-2">
              Better Fix
            </div>
            <div className="text-lg md:text-2xl font-black text-black mb-2 mt-2 font-sans">
              &quot;{sentence.goodResponse.text}&quot;
            </div>
            <div className="text-sm md:text-base text-gray-800 leading-snug">
              {sentence.goodResponse.why}
            </div>
          </div>
        </div>

        {/* Play Hint */}
        {keywords.length > 0 && (
           <div className="flex flex-wrap gap-2 mt-1 pt-3 border-t-2 border-black/5 border-dashed mb-2">
            {keywords.map((k) => (
                <span
                  key={k.word}
                  className="font-hand text-xs md:text-sm px-3 py-1 bg-yellow-100 border border-black/30 transform hover:-rotate-2 transition-transform cursor-default"
                >
                <span className="font-black text-black">{k.word}</span>
                <span className="text-gray-600">: {k.definition}</span>
              </span>
            ))}
           </div>
        )}

        <Button
          onClick={(e) => {
            e.stopPropagation();
            speak();
          }}
          variant="primary"
          size="xl"
          isLoading={loading}
          className="w-full border-2 border-black hard-shadow text-black font-black uppercase tracking-wider hover:-translate-y-1 hover:shadow-lg transition-all"
          aria-label={loading ? "Loading audio" : "Play correct response"}
        >
            {speaking ? <AudioVisualizer /> : "Play Audio"}
        </Button>
      </div>
    );
  }

  // Original Layout (Flashcard Fallback)
  return (
    <div
      className={
        "relative rounded-xl border-2 border-black bg-white p-6 md:p-10 flex flex-col gap-6 md:gap-10 transition duration-300 hard-shadow group " +
        (speaking
          ? "ring-4 ring-primary/30"
          : "hover:-translate-y-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)]")
      }
    >
      {/* Decorative Scribble */}
      <div className="absolute top-4 right-4 text-black/5 opacity-50 font-hand text-9xl leading-none pointer-events-none select-none">
        “
      </div>
      
      <div className="min-w-0 relative z-10 flex flex-col gap-6 text-center items-center py-4">
         {/* Index Badge */}
         <div className="inline-flex items-center justify-center px-3 py-1 border-2 border-black bg-gray-100 text-xs font-bold uppercase tracking-widest text-gray-500 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            Card {index + 1}
         </div>

         {/* Main Sentence */}
         <div className="relative">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight text-black px-4 font-sans">
              &quot;{sentence.en}&quot;
            </h3>
         </div>

         {/* Divider */}
         <div className="w-20 h-1.5 bg-primary/30 rounded-full transform -rotate-1" />
      </div>

      <div className="flex flex-wrap justify-center gap-3 relative z-10">
        {keywords.map((k) => (
          <span
            key={k.word}
            className="text-sm md:text-base px-3 py-1.5 bg-yellow-50 border border-black/20 font-hand transform hover:rotate-2 transition-transform"
          >
            <span className="font-bold text-black border-b-2 border-primary/50">{k.word}</span>
            <span className="text-gray-500 ml-1">{k.definition}</span>
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
         className={"w-full relative z-10 font-bold border-2 border-black hard-shadow transition-all " + (speaking ? "bg-white text-black" : "active:translate-y-0 active:shadow-none")}
         aria-label={loading ? "Loading audio" : "Play sentence"}
      >
          {speaking ? <AudioVisualizer /> : <span className="flex items-center gap-2 text-base">🔊 Play Audio</span>}
      </Button>
    </div>
  );
}
