"use client";

import { useScroll, useMotionValueEvent, AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function FloatingCreateButton() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show button after scrolling down 200px (past the hero input approx)
    if (latest > 200 && !isVisible) {
      setIsVisible(true);
    } else if (latest <= 200 && isVisible) {
      setIsVisible(false);
    }
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-50 md:hidden"
        >
            <Link href="/create-scenario">
                <button className="w-14 h-14 rounded-full bg-primary text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform">
                    <Plus className="w-8 h-8" />
                </button>
            </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
