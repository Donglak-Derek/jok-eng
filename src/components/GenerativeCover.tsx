import { useMemo } from "react";

interface GenerativeCoverProps {
  title: string;
  category?: string;
  className?: string;
}

const GRADIENTS = [
  "from-pink-500 via-red-500 to-yellow-500",
  "from-blue-400 via-indigo-500 to-purple-500",
  "from-green-400 via-emerald-500 to-teal-500",
  "from-orange-400 via-pink-500 to-purple-500",
  "from-yellow-400 via-orange-500 to-red-500",
  "from-indigo-400 via-purple-500 to-pink-500",
];

const PATTERNS = [
  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2) 0%, transparent 20%)",
  "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)",
  "repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 10px, transparent 10px, transparent 20px)",
];

export function GenerativeCover({ title, category = "custom", className }: GenerativeCoverProps) {
  // Deterministic random based on title length + first char code
  const seed = useMemo(() => {
    return title.length + (title.codePointAt(0) || 0);
  }, [title]);

  const gradient = GRADIENTS[seed % GRADIENTS.length];
  const pattern = PATTERNS[seed % PATTERNS.length];

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br relative overflow-hidden ${gradient} ${className || ""}`}
    >
      {/* Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none" 
        style={{ backgroundImage: pattern, backgroundSize: "40px 40px" }}
      />
      
      {/* Text Content */}
      <div className="relative z-10">
        <span className="text-[10px] uppercase tracking-widest text-white/80 font-bold mb-2 block">
          {category}
        </span>
        <h3 className="text-xl md:text-2xl font-black text-white leading-tight break-words drop-shadow-md">
          {title}
        </h3>
      </div>
    </div>
  );
}
