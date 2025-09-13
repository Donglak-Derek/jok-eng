import Link from "next/link";
import Card from "@/components/Card";
import { categories, scripts } from "@/data";

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-[var(--background)]">
      <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14 flex flex-col gap-6 md:gap-8">
        <div className="text-center">
          <div className="mx-auto mb-3 md:mb-4 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-2xl md:text-3xl">🙈</div>
          <h1 className="text-2xl md:text-3xl font-semibold">Page not found</h1>
          <p className="text-sm md:text-base text-black/60 dark:text-white/60 mt-2">
            The page or content you’re looking for doesn’t exist.
          </p>
          <div className="mt-4">
            <Link href="/" className="inline-block px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-foreground text-background text-sm md:text-base">
              Go Home
            </Link>
          </div>
        </div>

        <section className="mt-2">
          <h2 className="text-base md:text-lg font-medium mb-3">Try these categories</h2>
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
