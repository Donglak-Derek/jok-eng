import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { Inter, Permanent_Marker, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const permanentMarker = Permanent_Marker({
  variable: "--font-hand",
  weight: "400",
  subsets: ["latin"],
});

const posterHeadings = Bebas_Neue({
  variable: "--font-headline",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jok-eng",
  description: "Learn English with cleaned scripts, sentences, and keywords",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${permanentMarker.variable} ${posterHeadings.variable} antialiased font-sans`}
      >
        <AuthProvider>
            {/* ParticlesBackground removed in favor of CSS Grid */}
            {children}
        </AuthProvider>
      </body>
    </html>
  );
}
