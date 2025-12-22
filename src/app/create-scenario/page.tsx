"use client";

import Header from "@/components/Header";
import CreateScenarioForm from "@/components/CreateScenarioForm";

export default function CreateScenarioPage() {
  return (
    <div className="min-h-dvh text-foreground">
        <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 flex flex-col gap-5 md:gap-6">
            <Header />

            <div className="mt-4">
                 <CreateScenarioForm />
            </div>
        </div>
    </div>
  );
}
