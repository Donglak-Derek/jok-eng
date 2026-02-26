"use client";

import Link from "next/link";
import Image from "next/image";
import { categories, scripts } from "@/data";
// import { useRef } from "react";
// import { ChevronRight, ChevronLeft } from "lucide-react";
import { Category } from "@/types";

interface CategoryCarouselProps {
    variant?: "default" | "minimal";
    disableLinks?: boolean;
}

export default function CategoryCarousel({ variant = "default", disableLinks = false }: CategoryCarouselProps) {
    return (
        <section className="flex flex-col gap-3 max-w-2xl mx-auto w-full">
            {categories.map((c, i) => (
                <CategoryCard key={c.slug} c={c} index={i} variant={variant} disableLinks={disableLinks} />
            ))}
        </section>
    );
}

// Sub-component for Cleaner Code
function CategoryCard({ c, index, variant, disableLinks }: { c: Category; index: number; variant: "default" | "minimal"; disableLinks: boolean }) {
    const scriptCount = scripts.filter((s) => s.categorySlug === c.slug).length;

    const Content = () => (
        <div className="flex items-center gap-4 p-3 md:p-4 w-full h-full bg-card rounded-2xl border border-border/50 hover:bg-secondary/40 hover:border-border transition-all group">
            {/* Small Thumbnail */}
            <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-xl overflow-hidden bg-secondary">
                <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 64px, 80px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Content Details */}
            <div className="flex-1 min-w-0 py-1">
                <h3 className="font-bold text-base md:text-lg text-foreground truncate group-hover:text-primary transition-colors">
                    {c.name}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-1 mt-0.5">
                    {c.description}
                </p>
                <span className="inline-block mt-2 text-[10px] md:text-xs font-black uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {scriptCount} Scenarios
                </span>
            </div>
        </div>
    );

    if (disableLinks) {
        return (
            <div className="w-full">
                <Content />
            </div>
        );
    }

    return (
        <Link href={`/category/${c.slug}`} className="block w-full outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl">
            <Content />
        </Link>
    );
}
