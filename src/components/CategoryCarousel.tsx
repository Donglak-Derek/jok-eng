"use client";

import Link from "next/link";
import Image from "next/image";
import { categories, scripts } from "@/data";
// import { useRef } from "react";
// import { ChevronRight, ChevronLeft } from "lucide-react";
import { Category } from "@/types";

export default function CategoryCarousel() {
  // const scrollContainerRef = useRef<HTMLDivElement>(null);

  /* Scroll logic removed in favor of Grid/Native Swipe */

  return (
    <section className="relative group/carousel">
      {/* Header removed to avoid duplication in page.tsx */}

      {/* 1. MOBILE: Carousel Container (md:hidden) */}
      {/* Wrapper to contain the bleed so it doesn't push page width */}
      {/* 1. MOBILE: Carousel Container (md:hidden) */}
      {/* Breakout: Force 100vw width relative to viewport, centered, to avoid parent width pollution */}
// 1. MOBILE: Carousel Container
      {/* ... */}
      <div className="md:hidden relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-x-hidden bg-background">
          <div 
            className="flex gap-4 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory hide-scrollbar"
            style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
            }}
          >
            {categories.map((c, i) => (
                <CategoryCard key={c.slug} c={c} index={i} />
            ))}
            <div className="w-4 shrink-0" />
          </div>
      </div>

      {/* 2. DESKTOP: Grid Container (hidden md:grid) */}
      <div className="hidden md:grid grid-cols-4 gap-6">
         {categories.map((c, i) => (
             <CategoryCard key={c.slug} c={c} index={i} />
        ))}
      </div>
    </section>
  );
}

// Sub-component for Cleaner Code
function CategoryCard({ c, index }: { c: Category; index: number }) {
    const scriptCount = scripts.filter((s) => s.categorySlug === c.slug).length;
    return (
        <Link
            href={`/category/${c.slug}`}
            className="group block relative min-w-[280px] w-[280px] md:w-auto snap-center"
        >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary mb-4 shadow-sm border border-border/50 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 280px, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={index === 0}
                />
                
                {/* 
                   STRONGER GRADIENT FIX 
                   from-black/90 -> via-black/40 -> to-transparent
                   Ensures text pop on mobile.
                */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                        <div className="flex justify-between items-end mb-1">
                        <h3 className="text-xl font-bold leading-tight drop-shadow-md">
                            {c.name}
                        </h3>
                        </div>
                        <p className="text-white/90 text-sm line-clamp-2 mb-3 font-medium drop-shadow-sm">
                        {c.description}
                        </p>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider border border-white/10 shadow-sm">
                        <span>{scriptCount} Scenarios</span>
                        </div>
                </div>
            </div>
        </Link>
    );
}
