import Link from "next/link";
import { Youtube, Instagram, Twitter } from "lucide-react";

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
            href="https://www.instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-pink-600 transition-colors p-2 hover:bg-pink-50 rounded-full"
          >
            <Instagram className="w-6 h-6" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link 
            href="https://www.youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-full"
          >
            <Youtube className="w-6 h-6" />
            <span className="sr-only">YouTube</span>
          </Link>
          {/* Placeholder for X/Twitter if needed later */}
          {/* <Link href="#" className="text-muted-foreground hover:text-blue-500 transition-colors"><Twitter className="w-5 h-5"/></Link> */}
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
