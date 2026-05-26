import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import Script from "next/script";
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
  title: {
    default: "PriceZen - Pricing Intelligence for E-Commerce Brands",
    template: "%s | PriceZen",
  },
  description:
    "Automated competitor price intelligence. Know when competitors move. Get rupee impact. Take one clear action. All delivered to your inbox.",
  keywords: [
    "price monitoring",
    "D2C brands India",
    "competitor price tracking",
    "pricing intelligence",
    "ecommerce pricing tool",
    "price alerts India",
    "competitor price monitoring",
    "automated pricing",
    "D2C pricing tool",
    "pricezen",
  ],
  authors: [{ name: "PriceZen" }],
  creator: "PriceZen",
  publisher: "PriceZen",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/web-app-manifest-512x512.png",
      },
    ],
  },

  manifest: "/site.webmanifest",

  openGraph: {
    title: "PriceZen - Stop Losing to Competitors",
    description:
      "Stop losing sales to competitors who changed their price before you noticed. Real-time alerts delivered to your inbox.",
    type: "website",
    url: "https://pricezen.in",
    siteName: "PriceZen",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PriceZen - Pricing Intelligence for E-Commerce Brands",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "PriceZen - Stop Losing to Competitors",
    description:
      "Automated competitor price intelligence for e-commerce brands.",
    images: ["/og-image.jpg"],
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PriceZen",
  },

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

  // Uncomment and add your Google Search Console verification code:
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE",
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
        {/* Structured Data: WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "PriceZen",
              url: "https://pricezen.in",
              logo: "https://pricezen.in/logo.jpg",
              description:
                "Automated competitor price intelligence for e-commerce brands",
            }),
          }}
        />

        {/* Structured Data: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "PriceZen",
              url: "https://pricezen.in",
              logo: {
                "@type": "ImageObject",
                url: "https://pricezen.in/logo.jpg",
                width: 1024,
                height: 1024,
              },
              image: "https://pricezen.in/logo.jpg",
              contactPoint: {
                "@type": "ContactPoint",
                email: "pricezenalert@gmail.com",
                contactType: "customer service",
                areaServed: "IN",
                availableLanguage: "English",
              },
            }),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        style={{ margin: 0, padding: 0, width: "100%", minHeight: "100%" }}
      >
        {/* Service Worker registration for offline support */}
        <Script
          id="service-worker-registration"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js').catch(function(err) {
                  console.log('SW registration failed:', err);
                });
              }
            `,
          }}
        />
        <Cursor />
        <CookieBanner />
        {children}
      </body>
    </html>
  );
}
