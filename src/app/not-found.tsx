// 404 Page - Themed for Jok-Eng
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="max-w-md w-full text-center space-y-6">
         {/* Image Container with "Broken" Vibe */}
         <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden border-4 border-muted rotate-3 shadow-2xl">
            <Image 
                src="/images/scenarios/the_offline_date.png"
                alt="404 Error"
                fill
                className="object-cover opacity-80 grayscale"
            />
            {/* Overlay Glitch Text */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <span className="text-4xl">❌</span>
            </div>
         </div>

         <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-primary">
                404
            </h1>
            <h2 className="text-xl md:text-2xl font-bold">
                Scenario Not Found
            </h2>
            <p className="text-muted-foreground leading-relaxed">
                Looks like this script hasn&apos;t been written yet. Maybe it crashed like a dating app?
            </p>
         </div>

         <div className="pt-4">
            <Link href="/">
                <Button variant="primary" size="lg" className="w-full md:w-auto px-8 rounded-full">
                    Return to Safety (Home)
                </Button>
            </Link>
         </div>
      </div>
    </div>
  );
}
