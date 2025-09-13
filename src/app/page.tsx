import Link from "next/link";
import { categories, scripts } from "@/data";
import Card from "@/components/Card";

export default function Home() {
  return (
    <div className="min-h-dvh bg-[var(--background)]">
      <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 flex flex-col gap-5 md:gap-6">
        <header className="sticky top-0 z-10 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-3 md:py-4 backdrop-blur bg-[var(--background)]/80 flex items-center justify-between border-b border-black/5 dark:border-white/10">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">Jok-eng</h1>
          <span className="text-xs md:text-sm text-black/60 dark:text-white/60">MVP</span>
        </header>

        <section className="mt-2">
          <h2 className="text-base md:text-lg font-medium mb-3">Categories</h2>
          <div className="grid grid-cols-1 gap-3 md:gap-4">
            {categories.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className="active:scale-[0.98] transition">
                <Card className="p-4 md:p-5 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-[16px] md:text-[18px] lg:text-[20px]">{c.name}</div>
                      <div className="text-xs md:text-sm text-black/60 dark:text-white/60 mt-0.5">
                        {scripts.filter((s) => s.categorySlug === c.slug).length} scripts
                      </div>
                    </div>
                    <div className="text-black/30 dark:text-white/30 text-base md:text-lg">›</div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
