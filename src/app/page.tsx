import Link from "next/link";
import { categories, scripts } from "@/data/sample";
import Card from "@/components/Card";

export default function Home() {
  return (
    <div className="min-h-dvh bg-[var(--background)]">
      <div className="max-w-md mx-auto px-4 py-5 flex flex-col gap-5">
        <header className="sticky top-0 z-10 -mx-4 px-4 py-3 backdrop-blur bg-[var(--background)]/80 flex items-center justify-between border-b border-black/5 dark:border-white/10">
          <h1 className="text-xl font-semibold">Jok-eng</h1>
          <span className="text-xs text-black/60 dark:text-white/60">MVP</span>
        </header>

        <section className="mt-2">
          <h2 className="text-base font-medium mb-3">Categories</h2>
          <div className="grid grid-cols-1 gap-3">
            {categories.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className="active:scale-[0.98] transition">
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-[16px]">{c.name}</div>
                      <div className="text-xs text-black/60 dark:text-white/60 mt-0.5">
                        {scripts.filter((s) => s.categorySlug === c.slug).length} scripts
                      </div>
                    </div>
                    <div className="text-black/30 dark:text-white/30">›</div>
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
