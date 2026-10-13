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
  metadataBase: new URL("https://memoriq.lifelines.global"),
  title: {
    default: "memoriq.lifelines.global | Curated Artisan Keepsakes & Gifts | Canada 🇨🇦 & USA 🇺🇸",
    template: "%s | memoriq.lifelines.global",
  },
  description:
    "memoriq.lifelines.global — Curated North American artisan gift collections in CAD ($) and USD ($). Exceptional keepsakes, personalized wooden plaques, laser-cut wall decor, and certified limited editions with express delivery across Canada and the USA.",
  applicationName: "memoriq.lifelines.global",
  keywords: [
    "memoriq.lifelines.global",
    "memoriq",
    "lifelines global",
    "canadian keepsakes",
    "american keepsakes",
    "curated gifts canada",
    "curated gifts usa",
    "artisan keepsakes",
    "gifts for canadians and americans",
    "cad currency gifts",
    "north american boutique",
    "limited edition gifts",
  ],
  authors: [{ name: "memoriq.lifelines.global" }],
  creator: "memoriq.lifelines.global",
  publisher: "memoriq.lifelines.global",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://memoriq.lifelines.global",
    siteName: "memoriq.lifelines.global",
    title: "memoriq.lifelines.global | Curated Artisan Keepsakes & Gifts | Canada 🇨🇦 & USA 🇺🇸",
    description:
      "Curated North American artisan gift collections in CAD ($) and USD ($). Exceptional keepsakes, personalized wooden plaques, laser-cut wall decor, and limited editions across Canada & the USA.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@MemoriqGlobal",
    creator: "@MemoriqGlobal",
    title: "memoriq.lifelines.global | Curated Artisan Keepsakes & Gifts | Canada 🇨🇦 & USA 🇺🇸",
    description:
      "Curated North American artisan gift collections in CAD ($) and USD ($). Exceptional keepsakes, personalized wooden plaques, laser-cut wall decor, and limited editions across Canada & the USA.",
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
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
