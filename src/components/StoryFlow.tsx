"use client";

import { useState } from "react";
import type { Script } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  script: Script;
};

export default function StoryFlow({ script }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const segments = script.segments || [];

  const handleNext = () => {
    if (currentStep < segments.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 max-w-2xl mx-auto">
      <div className="text-center">
        <p className="text-lg md:text-xl text-muted mb-4">
          {script.context}
        </p>
      </div>

      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          {currentStep < segments.length ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="bg-card border border-secondary/30 rounded-3xl p-6 md:p-8 shadow-[0_10px_40px_rgba(34,19,74,0.6)] flex flex-col items-center text-center gap-4">
                <div className="text-sm font-bold uppercase tracking-widest text-tertiary">
                  {segments[currentStep].step}
                </div>
                <div className="text-2xl md:text-3xl font-medium leading-relaxed my-4">
                  &quot;{segments[currentStep].text}&quot;
                </div>
                <div className="text-muted italic text-sm md:text-base bg-background/50 px-4 py-2 rounded-full border border-primary/20">
                  💡 {segments[currentStep].note}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-secondary/30 rounded-3xl p-6 md:p-8 shadow-[0_10px_40px_rgba(34,19,74,0.6)] flex flex-col items-center text-center gap-6"
            >
              <div className="text-3xl md:text-4xl text-primary">
                👏
              </div>
              <h3 className="headline text-2xl md:text-3xl">Story Code Cracked!</h3>
              <p className="text-muted">
                You&apos;ve mastered the rhythm. Ready to try it out?
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-4">
        {currentStep > 0 && (
          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-full border border-muted/30 text-muted hover:bg-muted/10 transition"
          >
            Start Over
          </button>
        )}
        {currentStep < segments.length && (
          <button
            onClick={handleNext}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-tertiary to-secondary text-white font-medium shadow-[0_4px_20px_rgba(236,72,153,0.4)] active:scale-95 transition hover:brightness-110"
          >
            Next Step →
          </button>
        )}
      </div>
    </div>
  );
}
