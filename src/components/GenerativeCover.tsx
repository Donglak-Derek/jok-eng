import { useMemo } from "react";

interface GenerativeCoverProps {
  title: string;
  category?: string;
  className?: string;
}

const GRADIENTS = [
  "from-pink-100 via-rose-100 to-orange-100",
  "from-blue-100 via-indigo-100 to-purple-100",
  "from-green-100 via-emerald-100 to-teal-100",
  "from-orange-100 via-amber-100 to-yellow-100",
  "from-yellow-100 via-lime-100 to-green-100",
  "from-cyan-100 via-sky-100 to-blue-100",
];

const PATTERNS = [
  "radial-gradient(circle at 20% 20%, rgba(0,0,0,0.03) 0%, transparent 20%)",
  "linear-gradient(45deg, rgba(0,0,0,0.02) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.02) 50%, rgba(0,0,0,0.02) 75%, transparent 75%, transparent)",
  "repeating-linear-gradient(45deg, rgba(0,0,0,0.02) 0px, rgba(0,0,0,0.02) 10px, transparent 10px, transparent 20px)",
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
        className="absolute inset-0 opacity-50 pointer-events-none" 
        style={{ backgroundImage: pattern, backgroundSize: "40px 40px" }}
      />
      
      {/* Text Content */}
      <div className="relative z-10">
        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2 block opacity-80">
          {category}
        </span>
        <h3 className="text-xl md:text-2xl font-black text-slate-800 leading-tight break-words drop-shadow-sm/10">
          {title}
        </h3>
      </div>
    </div>
  );
}
