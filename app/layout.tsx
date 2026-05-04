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
    "Automated competitor price monitoring. Know when competitors move. Get rupee impact. Take one clear action. All delivered to your inbox.",
  keywords: ["price monitoring", "D2C", "competitor tracking", "pricing intelligence", "ecommerce pricing"],
  openGraph: {
    title: "PriceZen :- Stop Losing to Competitors",
    description: "Stop losing sales to competitors who changed their price before you noticed.",
    type: "website",
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
