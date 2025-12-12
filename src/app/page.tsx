import Link from "next/link";
import Image from "next/image";
import { categories, scripts } from "@/data";
import Card from "@/components/Card";

export default function Home() {
  return (
    <div className="min-h-dvh text-foreground">
      <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 flex flex-col gap-5 md:gap-6">
        <header className="sticky top-0 z-10 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-3 md:py-4 backdrop-blur bg-background/70 flex items-center justify-between border-b border-secondary/30 shadow-[0_10px_40px_rgba(34,19,74,0.7)]">
          <h1 className="headline text-2xl md:text-3xl lg:text-4xl tracking-[0.06em] bg-gradient-to-r from-tertiary via-secondary to-primary text-transparent bg-clip-text drop-shadow-[0_0_22px_rgba(168,85,247,0.4)]">
            Jok-eng
          </h1>
          <span className="text-[11px] md:text-xs px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-muted shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            by 9NyangHea
          </span>
        </header>

        <section className="relative overflow-hidden rounded-3xl border border-secondary/40 bg-card/85 shadow-[0_20px_80px_rgba(34,19,74,0.7)] px-5 md:px-7 lg:px-8 py-7 md:py-9">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-10 -right-6 w-44 h-44 md:w-60 md:h-60 bg-primary/25 blur-3xl" />
            <div className="absolute -bottom-12 -left-8 w-48 h-48 md:w-64 md:h-64 bg-tertiary/25 blur-3xl" />
          </div>
          <div className="relative flex flex-col gap-4">
            <p className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-muted">
              Cool Late Starter
            </p>
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 className="headline text-4xl md:text-5xl lg:text-6xl tracking-[0.08em] animate-shimmer drop-shadow-[0_0_26px_rgba(168,85,247,0.45)]">
                Stop Nodding. Start Joking.
              </h2>
            </div>
            <p className="text-base md:text-lg text-muted max-w-2xl leading-relaxed">
              Textbooks taught you how to be polite. We teach you how to be
              interesting. Master sarcasm, banter, and the jokes you missed.
            </p>
            <div className="flex gap-3 flex-wrap pt-1">
              <Link
                href="#categories"
                className="inline-flex items-center justify-center px-4 md:px-5 py-2.5 rounded-full bg-gradient-to-r from-tertiary via-secondary to-primary text-sm md:text-base font-medium text-white shadow-[0_10px_40px_rgba(168,85,247,0.35)] active:scale-[0.99] transition"
              >
                Start Roasting →
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-2">
          <h2
            id="categories"
            className="headline text-xl md:text-2xl mb-3 bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text"
          >
            Categories
          </h2>
          <div className="grid grid-cols-1 gap-3 md:gap-4">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="active:scale-[0.98] transition group"
              >
                <Card className="p-4 md:p-5 lg:p-6 overflow-hidden relative">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-card shadow-inner border border-secondary/20">
                      <Image
                        src={c.image}
                        alt={c.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="headline text-[18px] md:text-[20px] lg:text-[22px] tracking-[0.02em] truncate pr-2">
                          {c.name}
                        </div>
                        <div className="text-primary/70 text-lg md:text-xl drop-shadow-[0_0_18px_rgba(34,211,238,0.35)] transition-transform group-hover:translate-x-1">
                          ›
                        </div>
                      </div>
                      <p className="text-sm md:text-[15px] text-foreground/80 my-1.5 leading-snug line-clamp-2">
                        {c.description}
                      </p>
                      <div className="text-xs md:text-sm text-muted font-medium">
                        {
                          scripts.filter((s) => s.categorySlug === c.slug)
                            .length
                        }{" "}
                        scripts
                      </div>
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
