"use client";

import { scripts } from "@/data";

export default function ExportTextPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-8">Jok-eng Scenarios Export</h1>
      <p className="mb-8 text-gray-500">Generated on {new Date().toLocaleDateString()}</p>

      {scripts.map((script, i) => (
        <div key={script.id} className="mb-12 border-b pb-8">
          <h2 className="text-2xl font-bold mb-2">{i + 1}. {script.title}</h2>
          <div className="text-sm text-gray-500 mb-4">
            Category: {script.categoryName} | Difficulty: {script.difficulty || 'N/A'}
          </div>
          
          <div className="mb-4">
            <strong>Summary:</strong> {script.cleanedEnglish || script.context}
          </div>

          {script.culturalInsights && (
            <div className="mb-4 bg-gray-50 p-4 rounded">
              <strong>Cultural Insight:</strong> {script.culturalInsights.content}
            </div>
          )}

          <div className="space-y-2">
            <h3 className="font-bold text-lg">Script:</h3>
            {script.sentences?.map((lines) => {
                // If it has a speaker, show it (mostly for Decoder or specialized types)
                // Standard scripts usually imply "You" or narrator, but let's just show text.
                // We want to support "goodResponse" if it exists (Comparison cards)
                const text = lines.goodResponse ? `(Better Option) ${lines.goodResponse.text}` : lines.en;
                
                // Clean brackets for readability? 
                // User asked for "normal text", so keeping brackets might be useful to see keywords, 
                // OR removing them for pure reading. Let's keep them but maybe subtle.
                // Actually, let's keep brackets as they are part of the "text" logic usually.
                return (
                    <p key={lines.id} className="ml-4">
                        • {text}
                    </p>
                );
            })}
            
            {/* Handle Decoder Items if present */}
            {script.decoderItems?.map((item) => (
                <div key={item.id} className="ml-4 mb-2">
                    <p><strong>Signal:</strong> "{item.phrase}"</p>
                    <p className="ml-4 text-red-600">Risk: {item.actualMeaning}</p>
                    <p className="ml-4 text-green-600">Tip: {item.survivalTip}</p>
                </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
