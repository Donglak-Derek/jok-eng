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
        <div className="flex flex-col w-full h-full bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
            {/* Full Width Image Header */}
            <div className="relative w-full aspect-square bg-stone-50">
                <Image
                    src={c.image || "/images/categories/small_talk.png"}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                />
            </div>

            {/* Content Details Below */}
            <div className="flex flex-col flex-1 p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3 mb-4">
                    <h3 className="font-black text-2xl sm:text-3xl text-stone-800 tracking-tight line-clamp-2">
                        {c.name}
                    </h3>
                    {isPinned && (
                        <span className="text-[10px] uppercase tracking-widest font-bold bg-[#FF5C00] text-white px-3 py-1.5 rounded-full shrink-0">
                            Featured
                        </span>
                    )}
                </div>

                <p className="text-base text-stone-500 line-clamp-3 leading-relaxed mb-8">
                    {c.description}
                </p>

                <div className="mt-auto">
                    <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-stone-700 bg-stone-50 px-4 py-2 rounded-full border border-stone-200">
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
