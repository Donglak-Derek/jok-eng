import Link from "next/link";
import { scripts } from "@/data";
import ScenarioList from "@/components/ScenarioList";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const list = scripts.filter((s) => s.categorySlug === slug);
  if (list.length === 0) {
    notFound();
  }
  const categoryName = list[0]?.categoryName ?? slug;

  return (
    <div className="min-h-dvh text-foreground">
      <div className="max-w-md md:max-w-3xl lg:max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 flex flex-col gap-5 md:gap-6">
        <header className="sticky top-0 z-50 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-3 md:py-4 bg-white/90 backdrop-blur border-b-2 border-black/5 shadow-sm flex items-center gap-4">
          <Link href="/" className="text-lg md:text-2xl font-bold text-black hover:text-primary transition-colors">←</Link>
          <h1 className="font-sans font-black text-2xl md:text-5xl tracking-tight text-black">
            {categoryName}
          </h1>
        </header>

        <ScenarioList scripts={list} />
      </div>
    </div>
  );
}
