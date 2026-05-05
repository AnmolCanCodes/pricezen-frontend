import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import CookieBanner from "@/components/CookieBanner";


const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PriceZen :- Pricing Intelligence for e-commerce brands",
  description:
    "Automated competitor price intelligence. Know when competitors move. Get rupee impact. Take one clear action. All delivered to your inbox.",
  keywords: ["price monitoring", "D2C", "competitor tracking", "pricing intelligence", "ecommerce pricing"],
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "PriceZen :- Stop Losing to Competitors",
    description: "Stop losing sales to competitors who changed their price before you noticed.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PriceZen - Pricing Intelligence for e-commerce brands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PriceZen :- Stop Losing to Competitors",
    description: "Automated competitor price intelligence for e-commerce brands.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body suppressHydrationWarning style={{ margin: 0, padding: 0, width: "100%", minHeight: "100%" }}>
        <Cursor />
        <CookieBanner />
        {children}
      </body>
    </html>

  );
}
