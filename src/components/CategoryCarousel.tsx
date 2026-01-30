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
  // const scrollContainerRef = useRef<HTMLDivElement>(null);

  /* Scroll logic removed in favor of Grid/Native Swipe */

  return (
    <section className="relative group/carousel">
      {/* Header removed to avoid duplication in page.tsx */}

      {/* 1. MOBILE: Carousel Container (md:hidden) */}
      {/* Wrapper to contain the bleed so it doesn't push page width */}
      {/* 1. MOBILE: Carousel Container (md:hidden) */}
      {/* Breakout: Force 100vw width relative to viewport, centered, to avoid parent width pollution */}

      {/* ... */}
      <div className="md:hidden relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-x-hidden bg-transparent">
          <div 
            className="flex gap-4 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory hide-scrollbar px-4"
            style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
            }}
          >
            {categories.map((c, i) => (
                <CategoryCard key={c.slug} c={c} index={i} variant={variant} disableLinks={disableLinks} />
            ))}
            <div className="w-4 shrink-0" />
          </div>
      </div>

      {/* 2. DESKTOP: Grid Container (hidden md:grid) */}
      <div className="hidden md:grid grid-cols-4 gap-6">
         {categories.map((c, i) => (
             <CategoryCard key={c.slug} c={c} index={i} variant={variant} disableLinks={disableLinks} />
        ))}
      </div>
    </section>
  );
}

// Sub-component for Cleaner Code
function CategoryCard({ c, index, variant, disableLinks }: { c: Category; index: number; variant: "default" | "minimal"; disableLinks: boolean }) {
    const scriptCount = scripts.filter((s) => s.categorySlug === c.slug).length;

    const Content = () => (
        <>
            {variant === "minimal" ? (
                 <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-card border border-border/60 hover:border-primary/50 transition-all duration-300 p-6 flex flex-col justify-between shadow-sm hover:shadow-lg h-full">
                     {/* No Image - Pure Typography & Design */}
                     <div className="absolute top-0 right-0 p-6 opacity-10 font-black text-6xl text-foreground rotate-90 origin-top-right select-none pointer-events-none">
                         {index + 1 < 10 ? `0${index + 1}` : index + 1}
                     </div>

                     <div className="mt-8">
                         <h3 className="text-2xl font-bold leading-tight mb-4 group-hover:text-primary transition-colors">
                             {c.name}
                         </h3>
                         <p className="text-muted-foreground text-sm leading-relaxed">
                             {c.description}
                         </p>
                     </div>

                     <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/30">
                         <span className="text-sm font-black uppercase tracking-wider text-primary">
                             {scriptCount} Scenarios
                         </span>
                         {!disableLinks && (
                             <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                 →
                             </div>
                         )}
                     </div>
                </div>
            ) : (
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary mb-4 shadow-sm border border-border/50 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1 h-full">
                    <Image
                        src={c.image}
                        alt={c.name}
                        fill
                        sizes="(max-width: 768px) 280px, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority={index === 0}
                    />
                    
                    {/* Gradient */}
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
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-black text-xs font-extrabold uppercase tracking-wider shadow-lg">
                            <span>{scriptCount} Scenarios</span>
                            </div>
                    </div>
                </div>
            )}
        </>
    );

    if (disableLinks) {
        return (
            <div className={`group block relative min-w-[280px] w-[280px] md:w-auto snap-center ${variant === 'minimal' ? 'cursor-default' : ''}`}>
                <Content />
            </div>
        );
    }

    return (
        <Link
            href={`/category/${c.slug}`}
            className="group block relative min-w-[280px] w-[280px] md:w-auto snap-center"
        >
            <Content />
        </Link>
    );
}
