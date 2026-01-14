"use client";

import { useState } from "react";
import Header from "@/components/Header";
import CreateScenarioForm from "@/components/CreateScenarioForm";
import ScenarioDirector from "@/components/Director/ScenarioDirector";
import { useRouter } from "next/navigation";

export default function CreateScenarioPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'director' | 'form'>('director');
  const [directorValues, setDirectorValues] = useState<{
    context: string;
    myRole: string;
    otherRole: string;
    plot: string;
  } | undefined>(undefined);

  const handleDirectorFinish = (blueprint: { context: string; myRole: string; otherRole: string; plot: string }) => {
      setDirectorValues(blueprint);
      setMode('form');
  };

  const skipToManual = () => {
      setMode('form');
  };

  return (
    <div className="min-h-dvh text-foreground">
        <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 flex flex-col gap-5 md:gap-6">
            <Header />

            <div className="mt-4">
                 {mode === 'director' ? (
                     <div className="space-y-4">
                        <ScenarioDirector 
                            onBack={() => router.push('/')}
                            onBlueprintReady={handleDirectorFinish}
                        />
                        <div className="text-center">
                             <button 
                                onClick={skipToManual}
                                className="text-sm text-muted-foreground hover:text-foreground underline transition-colors"
                             >
                                Skip to manual form
                             </button>
                        </div>
                     </div>
                 ) : (
                     <CreateScenarioForm initialValues={directorValues} />
                 )}
            </div>
        </div>
    </div>
  );
}
