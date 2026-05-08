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
  metadataBase: new URL("https://pricezen.in"),
  title: "PriceZen :- Pricing Intelligence for e-commerce brands",
  description:
    "Automated competitor price intelligence. Know when competitors move. Get rupee impact. Take one clear action. All delivered to your inbox.",
  keywords: [
    "price monitoring",
    "D2C",
    "competitor tracking",
    "pricing intelligence",
    "ecommerce pricing",
    "price alerts",
    "competitor price monitoring",
    "automated pricing",
  ],

  // ✅ COMPREHENSIVE FAVICON CONFIGURATION
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  manifest: "/site.webmanifest",

  openGraph: {
    title: "PriceZen :- Stop Losing to Competitors",
    description:
      "Stop losing sales to competitors who changed their price before you noticed.",
    type: "website",
    url: "https://pricezen.in", // Update with your actual domain
    siteName: "PriceZen",
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
    description:
      "Automated competitor price intelligence for e-commerce brands.",
    images: ["/og-image.jpg"],
    creator: "@pricezen", // Update with your Twitter handle
  },

  // ✅ PWA CONFIGURATION
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PriceZen",
  },

  // ✅ ROBOTS META
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ✅ VERIFICATION (add your codes when you have them)
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  // },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f3" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <head>
        {/* ✅ STRUCTURED DATA FOR GOOGLE */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "PriceZen",
              url: "https://pricezen.in", // Update with your actual domain
              logo: "https://pricezen.in/web-app-manifest-512x512.png",
              description:
                "Automated competitor price intelligence for e-commerce brands",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://pricezen.in/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* ✅ ORGANIZATION STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "PriceZen",
              url: "https://pricezen.in",
              logo: "https://pricezen.in/web-app-manifest-512x512.png",
              contactPoint: {
                "@type": "ContactPoint",
                email: "pricezenalert@gmail.com",
                contactType: "customer service",
              },
              sameAs: [
                // Add your social media profiles here
                // "https://twitter.com/pricezen",
                // "https://www.linkedin.com/company/pricezen",
              ],
            }),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        style={{ margin: 0, padding: 0, width: "100%", minHeight: "100%" }}
      >
        <Cursor />
        <CookieBanner />
        {children}
      </body>
    </html>
  );
}