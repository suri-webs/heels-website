import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUXE HEELS | Premium Handcrafted Women's Footwear",
  description: "Experience the epitome of luxury with our handcrafted collection of stilettos, block heels, and party wear. Designed for the modern woman.",
  keywords: "luxury heels, women footwear, stilettos, designer shoes, handcrafted heels",
  openGraph: {
    title: "LUXE HEELS | Premium Women's Footwear",
    description: "Premium handcrafted heels for every occasion.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth", inter.variable, playfair.variable, "font-sans", geist.variable)} data-scroll-behavior="smooth">
      <body className="font-sans antialiased bg-brand-cream text-brand-black min-h-screen flex flex-col">
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: "#1a1a1a",
            color: "#f8f5f0",
            borderRadius: "0",
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          },
        }} />
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
