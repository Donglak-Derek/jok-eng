"use client";

import { useState, useEffect, Suspense } from "react";
import Header from "@/components/Header";
import CreateScenarioForm from "@/components/CreateScenarioForm";
import ScenarioDirector from "@/components/Director/ScenarioDirector";
import { useRouter, useSearchParams } from "next/navigation";

function CreateScenarioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<'director' | 'form'>('form');
  const [directorValues, setDirectorValues] = useState<{
    context: string;
    myRole: string;
    otherRole: string;
    plot: string;
  } | undefined>(undefined);

  // Check for Remix params on mount
  useEffect(() => {
     const remixContext = searchParams.get("remixContext");
     const remixTitle = searchParams.get("remixTitle");

     if (remixContext) {
         setMode('form');
         setDirectorValues({
             context: remixContext,
             // If we had title, we could append it or just use context.
             // Usually Context is enough to start.
             myRole: "", 
             otherRole: "",
             plot: ""
         });
     }
  }, [searchParams]);

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

export default function CreateScenarioPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <CreateScenarioContent />
        </Suspense>
    );
}
