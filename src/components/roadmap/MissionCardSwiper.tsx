"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ChevronRight, RotateCcw, Award, Globe, MessageSquare, Zap, Lock } from "lucide-react";
import Image from "next/image";
import { Mission, MissionOption } from "@/types";
import confetti from "canvas-confetti";

interface MissionCardSwiperProps {
  mission: Mission;
  onComplete: (option: MissionOption) => void;
  onRetry: () => void;
  onNext?: () => void;
}

type CardStep = "INTRO" | "SCENARIO" | "CHOICE" | "XRAY" | "WIN";

export default function MissionCardSwiper({ mission, onComplete, onRetry, onNext }: MissionCardSwiperProps) {
  const [step, setStep] = useState<CardStep>("INTRO");
  const [selectedOption, setSelectedOption] = useState<MissionOption | null>(null);

  useEffect(() => {
    if (step === "WIN") {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [step]);

  const nextStep = () => {
    if (step === "INTRO") setStep("SCENARIO");
    else if (step === "SCENARIO") setStep("CHOICE");
    else if (step === "CHOICE" && selectedOption) setStep("XRAY");
    else if (step === "XRAY") setStep("WIN");
  };

  const handleRestart = () => {
    setSelectedOption(null);
    setStep("INTRO");
  };

  const handleChoice = (option: MissionOption) => {
    setSelectedOption(option);
    setStep("XRAY");
    if (option.vibe_score >= 80) {
      onComplete(option);
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setStep("CHOICE");
    onRetry();
  };

  return (
    <div className="relative w-full h-full max-h-[850px] max-w-lg mx-auto bg-zinc-950 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5">
      <AnimatePresence mode="wait">
        {step === "INTRO" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute inset-0 flex flex-col"
          >
            <div className="relative flex-1 min-h-[30%]">
              <Image
                src={mission.imageUrl || "/images/placeholder.png"}
                alt={mission.title}
                fill
                className="object-cover brightness-75 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            </div>
            <div className="p-8 space-y-4 relative z-10 shrink-0 bg-zinc-950 overflow-y-auto max-h-[60%]">
              <div className="inline-block px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-[10px] font-black uppercase tracking-widest">
                Day {mission.day} • {mission.module}
              </div>
              <h1 className="text-2xl font-black italic tracking-tighter text-white uppercase leading-none">
                {mission.title}
              </h1>
              <p className="text-zinc-400 text-lg font-medium leading-relaxed">
                {mission.strategic_brief}
              </p>
              <button
                onClick={nextStep}
                className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-sm rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Begin Mission <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {step === "SCENARIO" && (
          <motion.div
            key="scenario"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute inset-0 flex flex-col bg-zinc-900"
          >
            <div className="flex-1 overflow-y-auto flex flex-col">
              <div className="relative w-full aspect-video min-h-[45%] shrink-0">
                <Image
                  src={mission.imageUrl || "/images/placeholder.png"}
                  alt={mission.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
                
                {/* Character Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-black shadow-2xl shadow-primary/40 border-2 border-white/20 shrink-0 transform -rotate-3 hover:rotate-0 transition-transform">
                    {mission.character?.charAt(0) || "E"}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-0.5">Mission Lead</span>
                    <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none italic">
                      {mission.character || "The Encounter"} <span className="text-primary opacity-80">Says:</span>
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-8 pb-12 flex-1 flex flex-col justify-center">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-3xl leading-tight font-black text-white italic tracking-tight"
                >
                  &ldquo;{mission.scenario_text}&rdquo;
                </motion.div>
              </div>
            </div>
            <div className="p-8 shrink-0 bg-zinc-900 border-t border-white/5">
              <button
                onClick={nextStep}
                className="group w-full py-5 bg-primary text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
              >
                What do you say? <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}

        {step === "CHOICE" && (
          <motion.div
            key="choice"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 p-6 flex flex-col justify-center space-y-4"
          >
            <h2 className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6">
              Swipe or Tap to React
            </h2>
            <div className="space-y-4">
              {mission.options.map((option, idx) => (
                <SwipeCard
                  key={option.id}
                  option={option}
                  onSelect={() => handleChoice(option)}
                  isLeft={idx === 0}
                />
              ))}
            </div>
          </motion.div>
        )}

        {step === "XRAY" && selectedOption && (
          <motion.div
            key="xray"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 bg-black flex flex-col"
          >
            <div className="p-8 flex-1 overflow-y-auto relative">
              <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                <Globe className="w-64 h-64 text-primary" />
              </div>

              <div className="space-y-6 relative z-10 flex flex-col justify-center min-h-full">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Cultural X-Ray</span>
                </div>

                <p className="text-2xl md:text-2xl font-black italic tracking-tight text-white leading-tight">
                  {mission.x_ray}
                </p>

                <div className={`p-6 rounded-2xl border-2 transition-all duration-500 ${selectedOption.vibe_score >= 80 ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Result</span>
                    <span className={`text-xl font-black ${selectedOption.vibe_score >= 80 ? 'text-green-500' : 'text-red-500'}`}>
                      {selectedOption.vibe_score}% Vibe
                    </span>
                  </div>
                  <p className="text-zinc-300 font-medium leading-relaxed">
                    {selectedOption.feedback}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-white/5 bg-zinc-950/90 shrink-0 backdrop-blur-md">
              {selectedOption.vibe_score >= 80 ? (
                <button
                  onClick={nextStep}
                  className="w-full py-5 bg-primary text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
                >
                  Continue <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleRetry}
                  className="w-full py-5 bg-zinc-800 text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-zinc-700 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" /> Try Again
                </button>
              )}
            </div>
          </motion.div>
        )}

        {step === "WIN" && (
          <motion.div
            key="win"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center space-y-8 bg-zinc-950"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full"
              />
              <div className="relative w-32 h-32 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/50 border-4 border-white/20">
                <Award className="w-16 h-16" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white">Mission Complete</h2>
              <p className="text-primary font-black uppercase tracking-[0.2em] text-xs">Skill Unlocked: Social Opener</p>
            </div>

            <div className="flex justify-around w-full py-4 border-y border-white/5">
              <div className="flex flex-col items-center">
                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">XP Earned</div>
                <div className="text-3xl font-black text-primary">+{mission.xp}</div>
              </div>
              <div className="w-px h-12 bg-white/5" />
              <div className="flex flex-col items-center">
                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Success</div>
                <div className="text-3xl font-black text-white">100%</div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
              {onNext && (
                <button
                  onClick={onNext}
                  className="w-full py-5 bg-primary text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
                >
                  Next Mission <ChevronRight className="w-5 h-5" />
                </button>
              )}
              
              <button
                onClick={handleRestart}
                className="w-full py-5 bg-zinc-800 text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-zinc-700 transition-all flex items-center justify-center gap-2 border border-white/5"
              >
                <RotateCcw className="w-4 h-4" /> Repeat Mission
              </button>

              <div className="flex items-center justify-center gap-8 pt-2">
                <button
                  onClick={() => window.location.href = "/practice"}
                  className="text-[11px] font-black uppercase tracking-widest text-zinc-500 hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5" /> Practice Area
                </button>
                <button
                  onClick={() => window.location.href = "/"}
                  className="text-[11px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                >
                  Dashboard
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SwipeCard({ option, onSelect, isLeft }: { option: MissionOption, onSelect: () => void, isLeft: boolean }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-100, 100], [-10, 10]);
  const opacity = useTransform(x, [-150, -100, 0, 100, 150], [0, 1, 1, 1, 0]);
  const background = useTransform(x, [-100, 0, 100], [
    "rgba(239, 68, 68, 0.2)", // Red
    "rgba(24, 24, 27, 0.8)", // Zinc-900
    "rgba(34, 197, 94, 0.2)" // Green
  ]);

  const handleDragEnd = (_: any, info: any) => {
    if (Math.abs(info.offset.x) > 100) {
      onSelect();
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      style={{ x, rotate, opacity, backgroundColor: background }}
      onClick={onSelect}
      className="relative p-7 rounded-[2rem] border border-white/10 cursor-grab active:cursor-grabbing backdrop-blur-xl group hover:border-primary/50 transition-colors shadow-lg"
    >
      <div className="flex flex-col gap-4">
        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all text-zinc-500 font-black text-xs shrink-0">
          {option.id}
        </div>
        <p className="text-xl md:text-2xl font-black text-white leading-tight tracking-tight">
          &ldquo;{option.text}&rdquo;
        </p>
        <div className="absolute right-7 top-7 opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Swipe Indicators */}
      <motion.div
        style={{ opacity: useTransform(x, [0, 50], [0, 1]) }}
        className="absolute inset-0 flex items-center justify-end pr-8 bg-green-500/20 rounded-3xl pointer-events-none"
      >
        <Zap className="w-8 h-8 text-green-500" />
      </motion.div>
      <motion.div
        style={{ opacity: useTransform(x, [-50, 0], [1, 0]) }}
        className="absolute inset-0 flex items-center justify-start pl-8 bg-red-500/20 rounded-3xl pointer-events-none"
      >
        <Lock className="w-8 h-8 text-red-500" />
      </motion.div>
    </motion.div>
  );
}
