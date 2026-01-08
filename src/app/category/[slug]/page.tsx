import Link from "next/link";
import { scripts } from "@/data";
import ScenarioList from "@/components/ScenarioList";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CATEGORY_DETAILS } from "@/data/categories";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const list = scripts.filter((s) => s.categorySlug === slug);
  const categoryName = list[0]?.categoryName ?? slug;
 
  return {
    title: `${categoryName} English Scripts | Jok-Eng`,
    description: `Browse ${list.length} scenarios for ${categoryName}. Master the vocabulary and gain confidence in this topic.`,
    keywords: [categoryName, "English Scripts", "ESL", "Conversation Practice"],
  };
}

const COLOR_MAP: Record<string, string> = {
  orange: "text-orange-600 selection:bg-orange-100",
  pink: "text-pink-600 selection:bg-pink-100",
  blue: "text-blue-600 selection:bg-blue-100",
  emerald: "text-emerald-600 selection:bg-emerald-100",
  purple: "text-purple-600 selection:bg-purple-100",
  indigo: "text-indigo-600 selection:bg-indigo-100",
  cyan: "text-cyan-600 selection:bg-cyan-100",
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const list = scripts.filter((s) => s.categorySlug === slug);
  if (list.length === 0) {
    notFound();
  }
  
  const categoryDetails = CATEGORY_DETAILS[slug];
  const categoryName = categoryDetails?.name ?? list[0]?.categoryName ?? slug;
  
  const colorName = categoryDetails?.color || "blue";
  const accentClass = COLOR_MAP[colorName] || "text-black";

  return (
    <div className="min-h-dvh text-foreground">
      <div className="max-w-md md:max-w-3xl lg:max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 flex flex-col gap-5 md:gap-6">
        <header className="sticky top-0 z-50 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-3 md:py-4 bg-white/90 backdrop-blur border-b-2 border-black/5 shadow-sm flex items-center gap-4">
          <Link href="/" className="text-lg md:text-2xl font-bold text-black hover:opacity-70 transition-opacity">←</Link>
          <h1 className={`font-sans font-black text-xl md:text-5xl tracking-tight ${accentClass}`}>
            {categoryName}
          </h1>
        </header>

        <ScenarioList scripts={list} />
      </div>
    </div>
  );
}
