"use client";

import { motion } from "framer-motion";

export default function LiveGradientBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-background">
      {/* Deep, slowly moving ambient gradients */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[100px]"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[20%] right-[10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px]"
      />

       <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2],
           y: [0, -50, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-[20%] left-[20%] w-[70%] h-[70%] rounded-full bg-blue-500/10 blur-[130px]"
      />

      {/* Subtle Grid Overlay with organic pulse */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: `40px 40px`,
        }}
      />
      
       {/* Fade out edges for seamless integration */}
       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}
