import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { ProgressProvider } from "@/context/ProgressContext";
import OnboardingModal from "@/components/OnboardingModal";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
        className={`${inter.variable} antialiased font-sans bg-background text-foreground`}
      >
        <AuthProvider>
          <ProgressProvider>
            {children}
            <OnboardingModal />
            <Footer />
          </ProgressProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
