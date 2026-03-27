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
    if (!count || count === 0) return "bg-zinc-900/30 border-white/5";
    if (count === 1) return "bg-primary/20 border-primary/30";
    if (count === 2) return "bg-primary/40 border-primary/50";
    if (count <= 4) return "bg-primary/70 border-primary/70 shadow-[0_0_15px_rgba(var(--primary),0.2)]";
    return "bg-primary border-white/30 shadow-[0_0_20px_rgba(var(--primary),0.4)]";
  };

  const activeDaysCount = Object.keys(activityLog).length;

  return (
    <div className="w-full bg-zinc-900/50 backdrop-blur-xl rounded-[40px] p-8 border border-white/5 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.1)]">
            <Dumbbell className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-black text-2xl italic uppercase tracking-tighter text-white">Training Log</h3>
            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em]">Operational Consistency</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-3xl font-black text-primary italic leading-none">{activeDaysCount}</div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mt-1">Active Cycles</div>
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

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5 relative z-10">
          <div className="flex items-center gap-2 text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em]">
            <span>Low Output</span>
            <div className="flex gap-1.5 mx-2">
              <div className="w-3 h-3 rounded-[2px] bg-zinc-900/30 border border-white/5" />
              <div className="w-3 h-3 rounded-[2px] bg-primary/20 border border-primary/30" />
              <div className="w-3 h-3 rounded-[2px] bg-primary/40 border border-primary/50" />
              <div className="w-3 h-3 rounded-[2px] bg-primary/70 border border-primary/70" />
              <div className="w-3 h-3 rounded-[2px] bg-primary border border-white/30" />
            </div>
            <span>High Grit</span>
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
