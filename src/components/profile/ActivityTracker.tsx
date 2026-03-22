"use client";

import React from "react";
import { motion } from "framer-motion";
import { Dumbbell, Info } from "lucide-react";

interface ActivityTrackerProps {
  activityLog?: Record<string, number>;
}

export default function ActivityTracker({ activityLog = {} }: ActivityTrackerProps) {
  // Generate last 13 weeks of dates
  const weeks = 13;
  const daysInWeek = 7;
  const totalDays = weeks * daysInWeek;
  
  const today = new Date();
  today.setHours(12, 0, 0, 0); // Normalize to noon to avoid DST issues
  
  const dates: Date[] = [];
  
  // Find the most recent Sunday to start the grid (GitHub style)
  const startDay = new Date(today);
  startDay.setDate(today.getDate() - today.getDay());
  
  // Generate the 91-day window (13 weeks)
  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(startDay);
    d.setHours(12, 0, 0, 0); // Ensure each date is at noon
    d.setDate(startDay.getDate() - i);
    dates.push(d);
  }

  const getIntensity = (count: number) => {
    if (!count || count === 0) return "bg-zinc-800/30";
    if (count === 1) return "bg-indigo-900/40 border-indigo-500/10";
    if (count === 2) return "bg-indigo-700/60 border-indigo-500/20";
    if (count <= 4) return "bg-indigo-500 border-indigo-400/30 shadow-[0_0_8px_rgba(99,102,241,0.2)]";
    return "bg-indigo-300 border-white/20 shadow-[0_0_12px_rgba(165,180,252,0.4)]";
  };

  const activeDaysCount = Object.keys(activityLog).length;

  return (
    <div className="w-full bg-card/50 backdrop-blur-sm rounded-3xl p-6 border border-border/40 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            <Dumbbell className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="font-bold text-lg tracking-tight">Training Log</h3>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Consistency History</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-black text-indigo-400 italic leading-none">{activeDaysCount}</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Active Days</div>
        </div>
      </div>

      <div className="relative">
        {/* The Grid Container - Responsive Scroll */}
        <div className="overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex gap-1.5 min-w-max">
            {/* We group by weeks (columns) */}
            {Array.from({ length: weeks }).map((_, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1.5">
                {Array.from({ length: daysInWeek }).map((_, dayIndex) => {
                  const dateIndex = weekIndex * daysInWeek + dayIndex;
                  const date = dates[dateIndex];
                  if (!date) return null;
                  
                  const dateStr = date.toISOString().split('T')[0];
                  const count = activityLog[dateStr] || 0;
                  const isToday = dateStr === today.toISOString().split('T')[0];
                  
                  return (
                    <motion.div
                      key={dateStr}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: dateIndex * 0.002 }}
                      whileHover={{ scale: 1.2, zIndex: 10 }}
                      className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-[3px] border transition-colors relative ${getIntensity(count)} ${isToday ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
                      title={`${dateStr}: ${count} session(s)`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/20">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
            <span>Low Grit</span>
            <div className="flex gap-1 mx-1">
              <div className="w-2.5 h-2.5 rounded-[1px] bg-zinc-800/30" />
              <div className="w-2.5 h-2.5 rounded-[1px] bg-indigo-900/40" />
              <div className="w-2.5 h-2.5 rounded-[1px] bg-indigo-700/60" />
              <div className="w-2.5 h-2.5 rounded-[1px] bg-indigo-500" />
              <div className="w-2.5 h-2.5 rounded-[1px] bg-indigo-300" />
            </div>
            <span>High Intensity</span>
          </div>
          
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground/40 italic">
            <Info className="w-3 h-3" />
            <span>Updates every session</span>
          </div>
        </div>
      </div>
    </div>
  );
}
