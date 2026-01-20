import Link from "next/link";
import { Youtube, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-secondary/30 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Brand & Copyright */}
        <div className="text-center md:text-left">
          <h2 className="font-bold text-xl tracking-tight mb-2 text-foreground">Jok-eng</h2>
          <p className="text-sm text-muted-foreground">
            Master English through roleplay. <br />
            © {new Date().getFullYear()} Jok-eng. All rights reserved.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          <Link 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-black transition-colors p-2 hover:bg-gray-100 rounded-full"
            title="TikTok"
          >
             {/* Custom TikTok SVG */}
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v4a9 9 0 0 1-9-9Z" />
             </svg>
            <span className="sr-only">TikTok</span>
          </Link>
          <Link 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-pink-600 transition-colors p-2 hover:bg-pink-50 rounded-full"
            title="Instagram"
          >
            <Instagram className="w-6 h-6" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-blue-700 transition-colors p-2 hover:bg-blue-50 rounded-full"
            title="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-full"
            title="YouTube"
          >
            <Youtube className="w-6 h-6" />
            <span className="sr-only">YouTube</span>
          </Link>
        </div>

        {/* Mini Links */}
        <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:underline hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="hover:underline hover:text-foreground">Terms</Link>
        </div>

      </div>
    </footer>
  );
}
