"use client";

import { motion } from "framer-motion";
import type { Script, UserScript } from "@/types";
import ScenarioCard from "@/components/ScenarioCard";

type Props = {
  scripts: Script[];
  onEdit?: (id: string, e: React.MouseEvent) => void;
  onDelete?: (id: string, e: React.MouseEvent) => void;
  onTogglePublic?: (id: string, current: boolean, e: React.MouseEvent) => void;
  // onLike and likedSet removed from props as they are handled internally
};


import { useLikes } from "@/hooks/useLikes";

export default function ScenarioList({ scripts, onEdit, onDelete, onTogglePublic }: Props) {
  const { likedSet, toggleLike } = useLikes();

  // Check if we have sections
  const hasSections = scripts.some(s => s.section);

  if (hasSections) {
    const sections: Record<string, string> = {
      basics: "5 Basics (The \"Must Knows\")",
      advanced: "5 Advanced (The \"Cool Kid\" Stuff)",
      boss_battles: "Boss Battles (Hard/Complex)",
      "The Dating Minefield": "The Dating Minefield",
      "Social Emergencies": "Social Emergencies"
    };

    const sectionOrder = ["basics", "advanced", "boss_battles", "The Dating Minefield", "Social Emergencies"];

    const sectionStyles: Record<string, string> = {
      "The Dating Minefield": "bg-pink-50/50 border-pink-100 rounded-3xl p-6 -mx-4 md:-mx-6",
      "Social Emergencies": "bg-yellow-50/50 border-yellow-100 rounded-3xl p-6 -mx-4 md:-mx-6"
    };

    const sectionHeaderStyles: Record<string, string> = {
      "The Dating Minefield": "border-pink-400 text-pink-900/80",
      "Social Emergencies": "border-yellow-400 text-yellow-900/80"
    };

    return (
      <div className="flex flex-col gap-12 mt-6">
        {sectionOrder.map(sectionKey => {
          const sectionScripts = scripts.filter(s => s.section === sectionKey);
          if (sectionScripts.length === 0) return null;

          const customStyle = sectionStyles[sectionKey] || "";
          const headerBorderColor = sectionHeaderStyles[sectionKey] || "border-primary/50";
          const headerTextColor = sectionHeaderStyles[sectionKey] ? "" : "text-foreground/90";

          return (
            <div key={sectionKey} className={`${customStyle} mb-8 transition-colors duration-300`}>
              <h2 className={`text-xl md:text-2xl font-bold mb-6 pl-3 border-l-4 ${headerBorderColor} ${headerTextColor}`}>
                {sections[sectionKey] || sectionKey}
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
                      onLike={(id, _e) => toggleLike(id, 'userId' in script, (script as UserScript).userId)}
                      isLiked={likedSet.has(script.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
        {/* Render any scripts without a section at the bottom */}
        {scripts.filter(s => !s.section).length > 0 && (
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-foreground/90 pl-1 border-l-4 border-gray-300">
              Other Scenarios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
              {scripts.filter(s => !s.section).map((script, index) => (
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
                    onLike={(id, _e) => toggleLike(id, 'userId' in script, (script as UserScript).userId)}
                    isLiked={likedSet.has(script.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
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
            onLike={(id, _e) => toggleLike(id, 'userId' in script, (script as UserScript).userId)}
            isLiked={likedSet.has(script.id)}
          />
        </motion.div>
      ))}
    </div>
  );
}
