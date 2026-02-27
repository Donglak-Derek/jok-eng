import Link from "next/link";
// import { Youtube, Instagram, Linkedin } from "lucide-react"; // Replaced with inline SVGs

export default function Footer() {
  return (
    <footer className="w-full bg-secondary/30 border-t border-border mt-auto hide-in-pwa">
      <div className="max-w-2xl mx-auto px-4 md:px-0 py-12 flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Brand & Copyright */}
        <div className="text-center md:text-left">
          <h2 className="font-bold text-xl tracking-tight mb-2 text-foreground">jok-eng.com</h2>
          <p className="text-sm text-muted-foreground">
            Master the unspoken rules. Sound like yourself again. <br />
            © {new Date().getFullYear()} jok-eng.com. All rights reserved.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          <Link
            href="https://www.tiktok.com/@thebrokenenglishclub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-black transition-colors p-2 hover:bg-gray-100 rounded-full"
            title="TikTok"
          >
            {/* TikTok (Solid) */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-5 h-5">
              <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.165 8.165 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
            </svg>
            <span className="sr-only">TikTok</span>
          </Link>
          <Link
            href="https://www.instagram.com/thebrokenenglishclub/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-pink-600 transition-colors p-2 hover:bg-pink-50 rounded-full"
            title="Instagram"
          >
            {/* Instagram (Solid/Filled) */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-5 h-5">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.225-.149-4.771-1.664-4.919-4.919-.058-1.265-.069-1.644-.069-4.849 0-3.204.012-3.584.069-4.849.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span className="sr-only">Instagram</span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/hiderek/recent-activity/all/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-blue-700 transition-colors p-2 hover:bg-blue-50 rounded-full"
            title="LinkedIn"
          >
            {/* LinkedIn (Solid/Filled) */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-5 h-5">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="https://www.youtube.com/@TheBrokenEnglishClub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-full"
            title="YouTube"
          >
            {/* YouTube (Solid/Filled) */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-5 h-5">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span className="sr-only">YouTube</span>
          </Link>
        </div>

        {/* Mini Links */}
        <div className="flex gap-6 text-sm text-muted-foreground">
          <Link href="/create-scenario?mode=ai" className="hover:underline hover:text-primary font-medium">Beta: AI Script Refiner</Link>
          <Link href="/privacy" className="hover:underline hover:text-foreground">Privacy</Link>
          <Link href="/terms" className="hover:underline hover:text-foreground">Terms</Link>
        </div>

      </div>
    </footer>
  );
}
