"use client";

import Link from "next/link";
import Image from "next/image";
import { categories, scripts } from "@/data";
import { useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function CategoryCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative group/carousel">
      <div className="mb-4 px-4 md:px-0 flex items-baseline justify-between">
         <div>
            <h2 className="text-3xl font-bold tracking-tight mb-1">
                Pick your vibe
            </h2>
            <p className="text-muted-foreground text-lg">Choose a context to start practicing.</p>
         </div>
         
         {/* Scroll Controls (Desktop) */}
         <div className="hidden md:flex gap-2">
            <button 
                onClick={() => scroll("left")}
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                aria-label="Scroll left"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
                onClick={() => scroll("right")}
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                aria-label="Scroll right"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
         </div>
      </div>

      {/* Carousel Container */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory hide-scrollbar px-4 md:px-0 -mx-4 md:mx-0"
        style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
        {categories.map((c) => {
           const scriptCount = scripts.filter((s) => s.categorySlug === c.slug).length;
           
           return (
            <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="group block relative min-w-[280px] w-[280px] md:w-[320px] snap-center"
            >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary mb-4 shadow-sm border border-border/50 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                    <Image
                        src={c.image}
                        alt={c.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gradient Overlay for Text Visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-70" />
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                         <div className="flex justify-between items-end mb-1">
                            <h3 className="text-xl font-bold leading-tight">
                                {c.name}
                            </h3>
                         </div>
                         <p className="text-white/80 text-sm line-clamp-2 mb-3">
                            {c.description}
                         </p>
                         <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider border border-white/10">
                            <span>{scriptCount} Scenarios</span>
                         </div>
                    </div>
                </div>
            </Link>
           );
        })}
        
        {/* Padding element for end of scroll */}
        <div className="w-4 shrink-0 md:hidden" />
      </div>
    </section>
  );
}
