"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Hook to track daily progress for scripts using localStorage.
 * Keys are formatted as: jokeng:daily:YYYY-MM-DD:scriptId
 */
export function useDailyProgress(scriptIds: string[] = []) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  // Helper to get today's key prefix
  const getTodayDateString = () => new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD

  // Load progress for the provided script IDs
  useEffect(() => {
    if (scriptIds.length === 0) return;

    const today = getTodayDateString();
    const completed = new Set<string>();
    
    scriptIds.forEach(id => {
      const key = `jokeng:daily:${today}:${id}`;
      if (typeof window !== "undefined" && localStorage.getItem(key) === "true") {
        completed.add(id);
      }
    });

    setCompletedIds(completed);
  }, [scriptIds]);

  // Function to mark a script as complete for today
  const markComplete = useCallback((scriptId: string) => {
    const today = getTodayDateString();
    const key = `jokeng:daily:${today}:${scriptId}`;
    
    if (typeof window !== "undefined") {
      localStorage.setItem(key, "true");
      setCompletedIds(prev => {
        const next = new Set(prev);
        next.add(scriptId);
        return next;
      });
    }
  }, []);

  return {
    completedIds,
    markComplete,
    isComplete: (scriptId: string) => completedIds.has(scriptId)
  };
}
