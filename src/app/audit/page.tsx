"use client";

import { scripts } from "@/data";
import { useMemo } from "react";

export default function AuditPage() {
  const inconsistencies = useMemo(() => {
    const results: any[] = [];

    scripts.forEach((script) => {
      // Logic: 
      // 1. Regex find [word]
      // 2. Check if 'word' is in script.keywords (legacy?) OR sentence.keywords
      // Wait, keywords are usually identifying per sentence in this app based on bathroom_line.ts
      
      script.sentences?.forEach((sentence) => {
        const matches = [...sentence.en.matchAll(/\[(.*?)\]/g)]; // Finds [word]
        
        matches.forEach((match) => {
          const phrase = match[1]; // "hallway"
          const hasDefinition = sentence.keywords?.some(k => k.word.toLowerCase() === phrase.toLowerCase());
          
          if (!hasDefinition) {
            results.push({
              scriptId: script.id,
              scriptTitle: script.title,
              sentenceId: sentence.id,
              sentenceText: sentence.en,
              missingKeyword: phrase
            });
          }
        });
      });
    });

    return results;
  }, []);

  return (
    <div className="p-10 font-mono text-sm">
      <h1 className="text-2xl font-bold mb-4">Content Consistency Audit</h1>
      <p className="mb-8">Checking {scripts.length} scripts for missing keyword definitions...</p>

      {inconsistencies.length === 0 ? (
        <div className="text-green-600 font-bold bg-green-50 p-4 rounded">✅ All keywords accounted for!</div>
      ) : (
        <div className="space-y-6">
          <div className="text-red-600 font-bold bg-red-50 p-4 rounded mb-4">
            ⚠️ Found {inconsistencies.length} missing keyword definitions
          </div>
          
          {inconsistencies.map((err, i) => (
             <div key={i} className="border border-red-200 p-4 rounded bg-white shadow-sm">
                <div className="font-bold text-lg mb-1">{err.scriptTitle} <span className="text-slate-400 text-xs">({err.scriptId})</span></div>
                <div className="text-slate-500 mb-2">Sentence ID: {err.sentenceId}</div>
                <div className="mb-2 p-2 bg-slate-50 rounded italic">"{err.sentenceText}"</div>
                <div>
                  Missing definition for: <span className="bg-red-100 text-red-800 px-1 rounded font-bold">{err.missingKeyword}</span>
                </div>
             </div>
          ))}
        </div>
      )}
    </div>
  );
}
