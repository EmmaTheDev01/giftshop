import type { Metadata } from "next";
import { Manrope, Cinzel } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Memoriq | Curated Artisan Keepsakes & Gifts for Canadians 🇨🇦",
  description:
    "Curated Canadian & artisan gift collections in CAD ($). Exceptional keepsakes, limited editions, and bespoke treasures with nationwide delivery across Canada.",
  keywords: [
    "canadian Memoriq",
    "curated gifts canada",
    "artisan keepsakes",
    "gifts for canadians",
    "cad currency gifts",
    "canadian boutique",
    "limited edition gifts",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

import ClientProviders from "@/components/ClientProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${manrope.variable}`}>
      <body className="antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
