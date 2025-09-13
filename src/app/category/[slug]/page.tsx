import Link from "next/link";
import { scripts } from "@/data";
import Card from "@/components/Card";
import RepeatCount from "@/components/RepeatCount";
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
    <div className="min-h-dvh bg-[var(--background)]">
      <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 flex flex-col gap-5 md:gap-6">
        <header className="sticky top-0 z-10 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-3 md:py-4 backdrop-blur bg-[var(--background)]/80 flex items-center gap-2 border-b border-black/5 dark:border-white/10">
          <Link href="/" className="text-lg md:text-xl leading-none">←</Link>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">{categoryName}</h1>
        </header>

        <div className="grid grid-cols-1 gap-3 md:gap-4 mt-2">
          {list.map((s) => (
            <Link key={s.id} href={`/script/${s.id}`} className="active:scale-[0.98] transition">
              <Card className="p-4 md:p-5 lg:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-medium text-[16px] md:text-[18px] lg:text-[20px] truncate">{s.title}</div>
                    <div className="text-xs md:text-sm text-black/60 dark:text-white/60 mt-1 line-clamp-2">
                      {s.cleanedEnglish}
                    </div>
                  </div>
                  <RepeatCount id={s.id} className="shrink-0 ml-2" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
