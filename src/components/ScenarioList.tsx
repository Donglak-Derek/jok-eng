"use client";

import { motion } from "framer-motion";
import type { Script } from "@/types";
import ScenarioCard from "@/components/ScenarioCard";

type Props = {
  scripts: Script[];
  onEdit?: (id: string, e: React.MouseEvent) => void;
  onDelete?: (id: string, e: React.MouseEvent) => void;
  onTogglePublic?: (id: string, current: boolean, e: React.MouseEvent) => void;
};

export default function ScenarioList({ scripts, onEdit, onDelete, onTogglePublic }: Props) {
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
          />
        </motion.div>
      ))}
    </div>
  );
}
