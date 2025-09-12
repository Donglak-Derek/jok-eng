import Link from "next/link";
import { categories, scripts } from "@/data/sample";

export default function Home() {
  return (
    <div className="p-6 max-w-3xl mx-auto flex flex-col gap-8">
      <header className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold">Jok-eng</h1>
        <span className="text-sm text-black/60 dark:text-white/60">MVP</span>
      </header>

      <section>
        <h2 className="text-xl font-medium mb-3">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="border rounded p-3 hover:bg-black/5 dark:hover:bg-white/5"
            >
              <div className="font-medium">{c.name}</div>
              <div className="text-sm text-black/60 dark:text-white/60">
                {scripts.filter((s) => s.categorySlug === c.slug).length} scripts
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

