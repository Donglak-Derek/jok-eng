import Link from "next/link";
import { scripts } from "@/data/sample";

type Props = { params: Promise<{ slug: string }> };

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const list = scripts.filter((s) => s.categorySlug === slug);
  const categoryName = list[0]?.categoryName ?? slug;

  return (
    <div className="p-6 max-w-3xl mx-auto flex flex-col gap-6">
      <Link href="/" className="text-sm hover:underline">← Back</Link>
      <h1 className="text-2xl font-semibold">{categoryName}</h1>
      <div className="grid grid-cols-1 gap-3">
        {list.map((s) => (
          <Link
            key={s.id}
            href={`/script/${s.id}`}
            className="border rounded p-4 hover:bg-black/5 dark:hover:bg-white/5"
          >
            <div className="font-medium">{s.title}</div>
            <div className="text-sm text-black/60 dark:text-white/60 truncate">
              {s.cleanedEnglish}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

