"use client";

import Link from "next/link";
import Image from "next/image";
import { scripts } from "@/data";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@/types";
import THEME_MAP from "@/lib/themeMap";

interface CategoryCarouselProps {
    variant?: "default" | "minimal";
    disableLinks?: boolean;
}

export default function CategoryCarousel({ variant = "default", disableLinks = false }: CategoryCarouselProps) {
    const { categories } = useCategories();

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto w-full px-4 md:px-0">
            {categories.map((c, i) => (
                <CategoryCard key={c.slug} c={c} index={i} variant={variant} disableLinks={disableLinks} />
            ))}
        </section>
    );
}

// Sub-component for Cleaner Code
function CategoryCard({ c, index, variant, disableLinks }: { c: Category; index: number; variant: "default" | "minimal"; disableLinks: boolean }) {
    const scriptCount = scripts.filter((s) => s.categorySlug === c.slug).length;

    // Resolve colors from THEME_MAP or use fallback
    const theme = THEME_MAP[c.color || ""] || THEME_MAP["indigo"];
    const isPinned = false; // Disabled while under construction

    const Content = () => (
        <div className="flex flex-col w-full h-full bg-zinc-900/50 rounded-[40px] shadow-2xl border border-white/5 overflow-hidden group transition-all duration-500 hover:border-white/10 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
            {/* Full Width Image Header */}
            <div className="relative w-full aspect-square bg-zinc-950 overflow-hidden">
                <Image
                    src={c.image || "/images/categories/small_talk.png"}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent pointer-events-none" />
            </div>

            {/* Content Details Below */}
            <div className="flex flex-col flex-1 p-8 md:p-10 relative z-10">
                <div className="flex items-center justify-between gap-3 mb-4">
                    <h3 className="font-black text-3xl md:text-4xl text-white italic uppercase tracking-tighter line-clamp-2">
                        {c.name}
                    </h3>
                    {isPinned && (
                        <span className="text-[10px] uppercase tracking-[0.3em] font-black bg-primary text-white px-4 py-2 rounded-lg shrink-0 shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                            Featured
                        </span>
                    )}
                </div>

                <p className="text-lg text-zinc-500 font-bold italic line-clamp-3 leading-relaxed mb-10">
                    {c.description}
                </p>

                <div className="mt-auto">
                    <span className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-primary/10 px-5 py-2.5 rounded-xl border border-primary/20">
                        {scriptCount} Scenarios
                    </span>
                </div>
            </div>
        </div>
    );

    if (disableLinks) {
        return (
            <div className="w-full h-full">
                <Content />
            </div>
        );
    }

    return (
        <Link href={`/category/${c.slug}`} className="block w-full h-full outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-3xl">
            <Content />
        </Link>
    );
}
