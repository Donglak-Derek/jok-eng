"use client";

export default function IconLegend() {
  return (
    <section className="py-12 border-y border-border/40 bg-secondary/5">
      <div className="container-minimal px-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground text-center mb-8">
            Decode the Interface
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Difficulty Legend */}
            <div className="col-span-2 md:col-span-2 flex flex-col items-center text-center">
                <div className="mb-4 font-bold text-lg">Difficulty Levels</div>
                <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-2">
                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
                            A2
                        </div>
                        <span className="text-xs text-muted-foreground">Newbie</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold border border-yellow-200">
                            B2
                        </div>
                        <span className="text-xs text-muted-foreground">Pro</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold border border-red-200">
                            C2
                        </div>
                        <span className="text-xs text-muted-foreground">God</span>
                    </div>
                </div>
            </div>

             {/* Vibe Tags */}
             <div className="col-span-2 md:col-span-2 flex flex-col items-center text-center">
                <div className="mb-4 font-bold text-lg">Smart Tags</div>
                <div className="flex gap-3 flex-wrap justify-center">
                     <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-xs font-bold">
                        💼 Career
                    </span>
                    <span className="px-3 py-1 rounded-full bg-pink-50 text-pink-600 border border-pink-200 text-xs font-bold">
                        🔥 Spicy
                    </span>
                    <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 border border-purple-200 text-xs font-bold">
                        ❤️ Dating
                    </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 max-w-xs">
                    Tags filter content to match your specific life situation.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
}
