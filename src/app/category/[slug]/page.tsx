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
      <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 flex flex-col gap-5 md:gap-6">
        <header className="sticky top-0 z-10 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-3 md:py-4 backdrop-blur bg-background/70 flex items-center gap-3 border-b border-secondary/30 shadow-[0_10px_40px_rgba(34,19,74,0.7)]">
          <Link href="/" className="text-lg md:text-xl leading-none text-primary drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]">←</Link>
          <h1 className="headline text-2xl md:text-3xl lg:text-4xl tracking-[0.05em] bg-gradient-to-r from-tertiary via-secondary to-primary text-transparent bg-clip-text">
            {categoryName}
          </h1>
        </header>

        <ScenarioList scripts={list} />
      </div>
    </div>
  );
}
