"use client";

import { motion } from "framer-motion";
import type { Script } from "@/types";
import ScenarioCard from "@/components/ScenarioCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// Imports removed

type Props = {
  scripts: Script[];

  onDelete?: (id: string, e: React.MouseEvent) => void;
  onTogglePublic?: (id: string, current: boolean, e: React.MouseEvent) => void;
};
export default function ScenarioList({ scripts, onDelete, onTogglePublic }: Props) {
  const router = useRouter();
  const [localScripts, setLocalScripts] = useState<Script[]>(scripts);

  // Sync prop changes to state
  useEffect(() => {
    setLocalScripts(scripts);
  }, [scripts]);

  // Handle "Just Created" Highlight
  const searchParams = useSearchParams();
  const newlyCreatedId = searchParams?.get('newlyCreated');

  // Re-sort localScripts to put the newly created one FIRST
  useEffect(() => {
    if (newlyCreatedId && localScripts.length > 0) {
      setLocalScripts(prev => {
        const createdIndex = prev.findIndex(s => s.id === newlyCreatedId);
        if (createdIndex > -1) {
          const newItem = prev[createdIndex];
          const others = prev.filter(s => s.id !== newlyCreatedId);
          return [newItem, ...others];
        }
        return prev;
      });

      // Optional: Clean up URL after a delay
      setTimeout(() => {
        router.replace('/?tab=my_scenarios', { scroll: false });
      }, 5000);
    }
  }, [newlyCreatedId, router]); // Intentionally omitting localScripts to avoid loops, effectively runs once when ID appears

  // Check if we have sections
  const hasSections = localScripts.some(s => s.section);

  if (hasSections) {
    // Dynamically derive sections from scripts
    const dynamicSections = Array.from(new Set(localScripts.map(s => s.section || "Other Scenarios"))).filter(Boolean);

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
    const hasUnsectioned = localScripts.some(s => !s.section);
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
      "The Dating Minefield": "bg-rose-500/5 border-rose-500/10 rounded-3xl p-6 -mx-4 md:-mx-6 border",
      "Social Emergencies": "bg-amber-500/5 border-amber-500/10 rounded-3xl p-6 -mx-4 md:-mx-6 border",
      signal_decoders: "bg-red-500/5 border-red-500/10 rounded-3xl p-6 -mx-4 md:-mx-6 border",
      slang_vocab: "bg-purple-500/5 border-purple-500/10 rounded-3xl p-6 -mx-4 md:-mx-6 border",
      life_work: "bg-blue-500/5 border-blue-500/10 rounded-3xl p-6 -mx-4 md:-mx-6 border"
    };

    const sectionHeaderStyles: Record<string, string> = {
      "The Dating Minefield": "border-rose-500 text-rose-400",
      "Social Emergencies": "border-amber-500 text-amber-400",
      signal_decoders: "border-red-500 text-red-400",
      slang_vocab: "border-purple-500 text-purple-400",
      life_work: "border-blue-500 text-blue-400"
    };

    return (
      <div className="flex flex-col gap-12 mt-6">
        {sectionOrder.map(sectionKey => {
          const sectionScripts = sectionKey === "Other Scenarios"
            ? localScripts.filter(s => !s.section)
            : localScripts.filter(s => s.section === sectionKey);

          if (sectionScripts.length === 0) return null;

          const customStyle = sectionStyles[sectionKey] || "";
          const headerBorderColor = sectionHeaderStyles[sectionKey] || (sectionKey === "Other Scenarios" ? "border-gray-300" : "border-primary/50");
          const headerTextColor = sectionHeaderStyles[sectionKey] ? "" : "text-foreground/90";

          return (
            <div key={sectionKey} className={`${customStyle} mb-8 transition-colors duration-300`}>
              <h2 className={`text-xl md:text-2xl font-black italic uppercase tracking-tighter mb-6 pl-3 border-l-4 ${headerBorderColor} ${headerTextColor}`}>
                {sectionTitles[sectionKey] || sectionKey}
              </h2>
              <div className="grid grid-cols-1 gap-4 md:gap-5">
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
                      onDelete={onDelete}
                      onTogglePublic={onTogglePublic}
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
    <div className="grid grid-cols-1 gap-4 md:gap-5 mt-4 md:mt-6">
      {localScripts.map((script, index) => (
        <motion.div
          key={script.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
        >
          <ScenarioCard
            script={script}
            index={index}
            onDelete={onDelete}
            onTogglePublic={onTogglePublic}
            isNew={script.id === newlyCreatedId}
          />
        </motion.div>
      ))}
    </div>
  );
}
