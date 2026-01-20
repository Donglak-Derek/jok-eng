"use client";

import { motion } from "framer-motion";
import type { Script } from "@/types";
import ScenarioCard from "@/components/ScenarioCard";
import { useRouter } from "next/navigation";

type Props = {
  scripts: Script[];
  onEdit?: (id: string, e: React.MouseEvent) => void;
  onDelete?: (id: string, e: React.MouseEvent) => void;
  onTogglePublic?: (id: string, current: boolean, e: React.MouseEvent) => void;
  onRemix?: (script: Script) => void;
  // onLike and likedSet removed from props as they are handled internally
};



export default function ScenarioList({ scripts, onEdit, onDelete, onTogglePublic, onRemix }: Props) {
  const router = useRouter();

  const handleRemix = (script: Script) => {
      if (onRemix) {
          onRemix(script);
      } else {
          // Default Remix Behavior (for Standard Scenarios)
          localStorage.setItem('remixSource', JSON.stringify(script));
          router.push('/create-scenario?mode=remix');
      }
  };

  // Check if we have sections
  const hasSections = scripts.some(s => s.section);

  if (hasSections) {
    // Dynamically derive sections from scripts
    const dynamicSections = Array.from(new Set(scripts.map(s => s.section || "Other Scenarios"))).filter(Boolean);
    
    // Define explicit order if known, else append others
    const explicitOrder = [
      "basics", "advanced", "boss_battles", 
      "The Dating Minefield", "Social Emergencies",
      "signal_decoders", "slang_vocab", "life_work"
    ];
    const sectionOrder = [
        ...explicitOrder.filter(key => dynamicSections.includes(key)),
        ...dynamicSections.filter(key => !explicitOrder.includes(key) && key !== "Other Scenarios")
    ];

    // If there are scripts without a section, add "Other Scenarios" at the end
    const hasUnsectioned = scripts.some(s => !s.section);
    if (hasUnsectioned && !sectionOrder.includes("Other Scenarios")) {
        sectionOrder.push("Other Scenarios");
    }

    const sectionTitles: Record<string, string> = {
      basics: "5 Basics (The \"Must Knows\")",
      advanced: "5 Advanced (The \"Cool Kid\" Stuff)",
      boss_battles: "Boss Battles (Hard/Complex)",
      "The Dating Minefield": "The Dating Minefield",
      "Social Emergencies": "Social Emergencies",
      // Texting Decoder Sections
      signal_decoders: "🚩 Signal Decoders",
      slang_vocab: "📚 Slang & Vocabulary",
      life_work: "💼 Life & Work Etiquette"
    };

    const sectionStyles: Record<string, string> = {
      "The Dating Minefield": "bg-pink-50/50 border-pink-100 rounded-3xl p-6 -mx-4 md:-mx-6",
      "Social Emergencies": "bg-yellow-50/50 border-yellow-100 rounded-3xl p-6 -mx-4 md:-mx-6",
      signal_decoders: "bg-red-50/50 border-red-100 rounded-3xl p-6 -mx-4 md:-mx-6",
      slang_vocab: "bg-purple-50/50 border-purple-100 rounded-3xl p-6 -mx-4 md:-mx-6",
      life_work: "bg-blue-50/50 border-blue-100 rounded-3xl p-6 -mx-4 md:-mx-6"
    };

    const sectionHeaderStyles: Record<string, string> = {
      "The Dating Minefield": "border-pink-400 text-pink-900/80",
      "Social Emergencies": "border-yellow-400 text-yellow-900/80",
      signal_decoders: "border-red-400 text-red-900/80",
      slang_vocab: "border-purple-400 text-purple-900/80",
      life_work: "border-blue-400 text-blue-900/80"
    };

    return (
      <div className="flex flex-col gap-12 mt-6">
        {sectionOrder.map(sectionKey => {
          const sectionScripts = sectionKey === "Other Scenarios" 
             ? scripts.filter(s => !s.section)
             : scripts.filter(s => s.section === sectionKey);
          
          if (sectionScripts.length === 0) return null;

          const customStyle = sectionStyles[sectionKey] || "";
          const headerBorderColor = sectionHeaderStyles[sectionKey] || (sectionKey === "Other Scenarios" ? "border-gray-300" : "border-primary/50");
          const headerTextColor = sectionHeaderStyles[sectionKey] ? "" : "text-foreground/90";

          return (
            <div key={sectionKey} className={`${customStyle} mb-8 transition-colors duration-300`}>
              <h2 className={`text-xl md:text-2xl font-bold mb-6 pl-3 border-l-4 ${headerBorderColor} ${headerTextColor}`}>
                {sectionTitles[sectionKey] || sectionKey}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
                {sectionScripts.map((script, index) => (
                  <motion.div
                     key={script.id}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <ScenarioCard 
                      script={script} 
                      index={index} 
                      onEdit={onEdit} 
                      onDelete={onDelete}
                      onTogglePublic={onTogglePublic}
                      onRemix={() => handleRemix(script)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
      {scripts.map((script, index) => (
        <motion.div
           key={script.id}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: index * 0.1, duration: 0.4 }}
        >
          <ScenarioCard 
            script={script} 
            index={index} 
            onEdit={onEdit} 
            onDelete={onDelete}
            onTogglePublic={onTogglePublic}
            onRemix={() => handleRemix(script)}
          />
        </motion.div>
      ))}
    </div>
  );
}
