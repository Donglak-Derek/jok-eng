import type { Metadata, Viewport } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { ProgressProvider } from "@/context/ProgressContext";
import OnboardingModal from "@/components/OnboardingModal";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jok-eng | Speak Like a Leader",
  description: "Master high-functioning professional English. Understand the subtext, sound natural, and speak like a leader with AI-powered scenarios.",
  keywords: ["English learning", "professional English", "leadership communication", "business English", "AI English coach"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
        className={`${inter.variable} antialiased font-sans bg-background text-foreground`}
      >
        <AuthProvider>
          <ProgressProvider>
            {children}
            <OnboardingModal />
          </ProgressProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
