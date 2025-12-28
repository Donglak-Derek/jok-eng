"use client";

import { useState } from "react";
import { UserScript, Sentence } from "@/types";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

type Props = {
  script: UserScript;
  userId: string;
};

export default function EditScenarioForm({ script, userId }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(script.title);
  const [context, setContext] = useState(script.context);
  const [sentences, setSentences] = useState<Sentence[]>(script.sentences);
  const [isSaving, setIsSaving] = useState(false);

  const handleSentenceChange = (index: number, field: string, value: string) => {
    const newSentences = [...sentences];
    if (field === "en") {
        newSentences[index] = { ...newSentences[index], en: value };
    } else if (field.startsWith("badResponse.")) {
        const subField = field.split('.')[1];
        if (newSentences[index].badResponse) {
             newSentences[index].badResponse = {
                 ...newSentences[index].badResponse!,
                 [subField]: value
             };
        }
    } else if (field.startsWith("goodResponse.")) {
        const subField = field.split('.')[1];
        if (newSentences[index].goodResponse) {
             newSentences[index].goodResponse = {
                 ...newSentences[index].goodResponse!,
                 [subField]: value
             };
        }
    }
    setSentences(newSentences);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const docRef = doc(db, "users", userId, "scenarios", script.id);
      await updateDoc(docRef, {
        title,
        context,
        sentences,
        // Update updated at?
      });
      router.push(`/scenario/${script.id}`);
    } catch (error) {
      console.error("Error updating scenario:", error);
      alert("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
       <div className="bg-card/50 border border-secondary/20 p-6 rounded-3xl space-y-4">
          <h2 className="text-xl font-bold text-muted uppercase tracking-wider">Scenario Details</h2>
          <div>
            <label className="block text-sm font-bold mb-1">Title</label>
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-background border border-secondary/20 rounded-xl px-4 py-2 focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Context</label>
            <input 
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="w-full bg-background border border-secondary/20 rounded-xl px-4 py-2 focus:border-primary outline-none"
            />
          </div>
       </div>

       <div className="space-y-4">
          <h2 className="text-xl font-bold text-muted uppercase tracking-wider px-2">Sentences</h2>
          {sentences.map((sentence, idx) => (
             <div key={sentence.id} className="bg-card/50 border border-secondary/20 p-6 rounded-3xl space-y-4 relative">
                 <div className="absolute top-4 right-4 text-xs font-bold bg-secondary/10 px-2 py-1 rounded text-secondary">
                    Card #{idx + 1}
                 </div>
                 
                 <div>
                    <label className="block text-xs font-bold mb-1 text-muted uppercase">Main English Sentence</label>
                    <textarea 
                       value={sentence.en}
                       onChange={(e) => handleSentenceChange(idx, "en", e.target.value)}
                       className="w-full bg-background border border-secondary/20 rounded-xl px-4 py-2 focus:border-primary outline-none min-h-[80px]"
                    />
                 </div>
                 
                 {/* Only show Mistake/Fix editing if they exist (Story Flow) */}
                 {sentence.badResponse && sentence.goodResponse && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-destructive/5 rounded-xl border border-destructive/10">
                            <label className="block text-xs font-bold mb-1 text-destructive uppercase">Mistake</label>
                            <input 
                                value={sentence.badResponse.text}
                                onChange={(e) => handleSentenceChange(idx, "badResponse.text", e.target.value)}
                                className="w-full bg-background/50 border border-destructive/20 rounded-lg px-3 py-1.5 focus:border-destructive outline-none mb-2"
                                placeholder="Text"
                            />
                            <textarea 
                                value={sentence.badResponse.why}
                                onChange={(e) => handleSentenceChange(idx, "badResponse.why", e.target.value)}
                                className="w-full bg-background/50 border border-destructive/20 rounded-lg px-3 py-1.5 focus:border-destructive outline-none text-xs"
                                placeholder="Why it's bad"
                                rows={2}
                            />
                        </div>
                        <div className="p-3 bg-success/5 rounded-xl border border-success/10">
                            <label className="block text-xs font-bold mb-1 text-success uppercase">Better Fix</label>
                            <input 
                                value={sentence.goodResponse.text}
                                onChange={(e) => handleSentenceChange(idx, "goodResponse.text", e.target.value)}
                                className="w-full bg-background/50 border border-success/20 rounded-lg px-3 py-1.5 focus:border-success outline-none mb-2"
                                placeholder="Text"
                            />
                            <textarea 
                                value={sentence.goodResponse.why}
                                onChange={(e) => handleSentenceChange(idx, "goodResponse.why", e.target.value)}
                                className="w-full bg-background/50 border border-success/20 rounded-lg px-3 py-1.5 focus:border-success outline-none text-xs"
                                placeholder="Why it's good"
                                rows={2}
                            />
                        </div>
                    </div>
                 )}
             </div>
          ))}
       </div>

       <div className="sticky bottom-4 pt-4">
          <Button 
            onClick={handleSave} 
            isLoading={isSaving}
            variant="primary" 
            size="lg" 
            className="w-full shadow-2xl"
          >
            Save Changes
          </Button>
       </div>
    </div>
  );
}
