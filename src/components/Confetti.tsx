"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function Confetti() {
  useEffect(() => {
    // Play sound on mount
    const audio = new Audio("/sounds/good_job.mp3");
    audio.volume = 0.5;
    audio.play().catch((e) => console.log("Audio play failed", e));

    // Fire standard confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      // launch a few confetti from the left edge
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]
      });
      // and launch a few from the right edge
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return null; // The library handles the canvas rendering
}
