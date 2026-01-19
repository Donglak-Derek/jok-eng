import { scripts } from "@/data";
import ScriptClient from "./ScriptClient";
// import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { id } = await params;
  const script = scripts.find((s) => s.id === id);
 
  if (!script) {
    // Fallback for dynamic scripts (we can't easily fetch title server-side without admin SDK)
    return {
      title: "Custom Scenario | Jok-Eng", 
      description: "A custom roleplay scenario."
    };
  }
 
  return {
    title: `${script.title} - English Roleplay Practice | Jok-Eng`,
    description: `Learn English with real-world scenarios. Context: ${script.context}. Key vocabulary: ${(script.sentences || []).flatMap(s => s.keywords?.map(k => k.word)).slice(0, 5).join(', ')}...`,
    keywords: ["English Practice", "Roleplay", "Learning", script.categorySlug, ...((script.sentences || []).flatMap(s => s.keywords?.map(k => k.word)) || [])],
    openGraph: {
        title: script.title,
        description: script.context,
        type: "article",
    }
  };
}

export default async function ScriptPage({ params }: Props) {
  const { id } = await params;
  const script = scripts.find((s) => s.id === id);
  
  // Don't 404 here. Let Client try to fetch by ID if not in static list.
  
  const jsonLd = script ? {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: script.title,
    description: script.context,
    educationalLevel: 'Beginner',
    keywords: (script.sentences || []).flatMap(s => s.keywords?.map(k => k.word)).join(','),
    teaches: script.cleanedEnglish,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
  } : null;

  return (
    <>
        {jsonLd && (
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        )}
        <ScriptClient script={script} scriptId={id} />
    </>
  );
}
