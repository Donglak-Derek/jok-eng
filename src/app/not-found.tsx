import Link from "next/link";
import Card from "@/components/Card";
import { categories, scripts } from "@/data";

export default function NotFound() {
  return (
    <div className="min-h-dvh text-foreground">
      <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14 flex flex-col gap-6 md:gap-8">
        <div className="text-center">
          <div className="mx-auto mb-3 md:mb-4 w-12 h-12 md:w-16 md:h-16 rounded-full bg-secondary/10 border border-secondary/35 shadow-[0_0_30px_rgba(168,85,247,0.25)] flex items-center justify-center text-2xl md:text-3xl">
            🙈
          </div>
          <h1 className="headline text-3xl md:text-4xl tracking-[0.05em] bg-gradient-to-r from-tertiary via-secondary to-primary text-transparent bg-clip-text">
            Page not found
          </h1>
          <p className="text-sm md:text-base text-muted mt-2">
            The page or content you’re looking for doesn’t exist.
          </p>
          <div className="mt-4">
            <Link
              href="/"
              className="inline-block px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-gradient-to-r from-tertiary via-secondary to-primary text-background text-sm md:text-base shadow-[0_10px_40px_rgba(168,85,247,0.35)]"
            >
              Go Home
            </Link>
          </div>
        </div>

        <section className="mt-2">
          <h2 className="headline text-xl md:text-2xl mb-3 bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text">
            Try these categories
          </h2>
          <div className="grid grid-cols-1 gap-3 md:gap-4">
            {categories.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className="active:scale-[0.98] transition">
                <Card className="p-4 md:p-5 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="headline text-[18px] md:text-[20px] lg:text-[22px] tracking-[0.02em]">
                        {c.name}
                      </div>
                      <div className="text-xs md:text-sm text-muted mt-0.5">
                        {scripts.filter((s) => s.categorySlug === c.slug).length} scripts
                      </div>
                    </div>
                    <div className="text-primary/70 text-base md:text-lg drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]">
                      ›
                    </div>
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
