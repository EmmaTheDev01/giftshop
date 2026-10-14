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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://memoriq.lifelines.global");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    url: siteUrl,
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
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

import ClientProviders from "@/components/ClientProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${manrope.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
