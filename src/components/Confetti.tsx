"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const COLORS = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];

type Particle = {
  id: number;
  x: number;
  color: string;
};

export default function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Play sound on mount
    const audio = new Audio("/sounds/good_job.mp3");
    audio.volume = 0.5;
    audio.play().catch((e) => console.log("Audio play failed", e));

    // Generate particles
    const count = 50;
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "-10vh", x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{
            y: "110vh",
            rotate: Math.random() * 360 + 360,
            x: `${p.x + (Math.random() * 10 - 5)}vw`, // slight drift
          }}
          transition={{
            duration: Math.random() * 2 + 2, // 2-4 seconds
            ease: "linear",
            delay: Math.random() * 0.5,
          }}
          className="absolute w-3 h-3 rounded-sm"
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  );
}
