import Link from "next/link";
import { scripts } from "@/data/sample";
import Card from "@/components/Card";
import RepeatCount from "@/components/RepeatCount";

type Props = { params: Promise<{ slug: string }> };

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const list = scripts.filter((s) => s.categorySlug === slug);
  const categoryName = list[0]?.categoryName ?? slug;

  return (
    <div className="min-h-dvh bg-[var(--background)]">
      <div className="max-w-md mx-auto px-4 py-5 flex flex-col gap-5">
        <header className="sticky top-0 z-10 -mx-4 px-4 py-3 backdrop-blur bg-[var(--background)]/80 flex items-center gap-2 border-b border-black/5 dark:border-white/10">
          <Link href="/" className="text-lg leading-none">←</Link>
          <h1 className="text-xl font-semibold">{categoryName}</h1>
        </header>

        <div className="grid grid-cols-1 gap-3 mt-2">
          {list.map((s) => (
            <Link key={s.id} href={`/script/${s.id}`} className="active:scale-[0.98] transition">
              <Card className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-medium text-[16px] truncate">{s.title}</div>
                    <div className="text-xs text-black/60 dark:text-white/60 mt-1 line-clamp-2">
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
