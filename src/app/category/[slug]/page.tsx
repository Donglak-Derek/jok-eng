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
    <div className="min-h-dvh text-[color:var(--foreground)]">
      <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 flex flex-col gap-5 md:gap-6">
        <header className="sticky top-0 z-10 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-3 md:py-4 backdrop-blur bg-[color:var(--background)]/70 flex items-center gap-3 border-b border-[color:var(--accent-purple)]/30 shadow-[0_10px_40px_rgba(34,19,74,0.7)]">
          <Link href="/" className="text-lg md:text-xl leading-none text-[color:var(--accent-blue)] drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]">←</Link>
          <h1 className="headline text-2xl md:text-3xl lg:text-4xl tracking-[0.05em] bg-gradient-to-r from-[color:var(--accent-pink)] via-[color:var(--accent-purple)] to-[color:var(--accent-blue)] text-transparent bg-clip-text">
            {categoryName}
          </h1>
        </header>

        <div className="grid grid-cols-1 gap-3 md:gap-4 mt-2">
          {list.map((s) => (
            <Link key={s.id} href={`/script/${s.id}`} className="active:scale-[0.98] transition">
              <Card className="p-4 md:p-5 lg:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="headline text-[18px] md:text-[20px] lg:text-[22px] truncate tracking-[0.02em]">
                      {s.title}
                    </div>
                    <div className="text-xs md:text-sm text-[color:var(--muted)] mt-1 line-clamp-2">
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
