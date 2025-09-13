import Link from "next/link";
import Card from "@/components/Card";
import { categories, scripts } from "@/data";

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-[var(--background)]">
      <div className="max-w-md mx-auto px-4 py-10 flex flex-col gap-6">
        <div className="text-center">
          <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-2xl">🙈</div>
          <h1 className="text-2xl font-semibold">Page not found</h1>
          <p className="text-sm text-black/60 dark:text-white/60 mt-2">
            The page or content you’re looking for doesn’t exist.
          </p>
          <div className="mt-4">
            <Link href="/" className="inline-block px-4 py-2 rounded-full bg-foreground text-background text-sm">
              Go Home
            </Link>
          </div>
        </div>

        <section className="mt-2">
          <h2 className="text-base font-medium mb-3">Try these categories</h2>
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
