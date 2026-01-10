import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { scripts } from "@/data";
import ScenarioList from "@/components/ScenarioList";
import CategoryHero from "@/components/CategoryHero";
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



export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const list = scripts.filter((s) => s.categorySlug === slug);
  if (list.length === 0) {
    notFound();
  }
  
  const categoryDetails = CATEGORY_DETAILS[slug];
  const categoryName = categoryDetails?.name ?? list[0]?.categoryName ?? slug;
  
  const colorName = categoryDetails?.color || "blue";

  return (
    <div className="min-h-dvh text-foreground">
      <div className="max-w-md md:max-w-3xl lg:max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 flex flex-col gap-5 md:gap-6">
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground bg-secondary/30 hover:bg-secondary hover:text-foreground transition-all mb-6 w-fit group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Categories
          </Link>
          
          <CategoryHero 
            categoryName={categoryName}

            scripts={list}
            colorName={colorName}
            description={categoryDetails?.description}
          />
        </div>

        <ScenarioList scripts={list} />
      </div>
    </div>
  );
}
