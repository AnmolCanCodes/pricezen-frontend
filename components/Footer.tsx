// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import PriceZenLogo from "@/components/PriceZen-logo.jpg";

const SOCIAL_ICONS = [
  {
    name: "Twitter / X",
    href: "https://twitter.com/amyylogsIN",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    viewBox: "0 0 24 24",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/amyycodees",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    viewBox: "0 0 24 24",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/anmol-gupta-b464253b9/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    viewBox: "0 0 24 24",
  },
  
];

export default function Footer() {
  return (
    <footer style={{ background: "#111", borderTop: "1px solid #1e1e1e", padding: "40px clamp(20px,4vw,48px) 28px", fontFamily: "'Sora', sans-serif" }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>

        {/* Top row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32, marginBottom: 36 }}>

          {/* Brand — now a clickable logo */}
          <div>
            <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <Image
                src={PriceZenLogo}
                alt="PriceZen"
                width={28}
                height={24}
                style={{ borderRadius: 5, objectFit: "contain" }}
              />
              <span style={{ fontWeight: 900, fontSize: 17, color: "#c9a84c", letterSpacing: -0.4 }}>PriceZen</span>
            </Link>
            <p style={{ fontSize: 12, color: "#555", lineHeight: 1.7 }}>
              Competitive pricing intelligence for D2C brands. Delivered to your inbox.
            </p>
          </div>

          {/* Product */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#444", marginBottom: 14 }}>Product</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Link href="/#how"           style={{ fontSize: 13, color: "#666", textDecoration: "none" }}>How it works</Link>
              <Link href="/#plans"         style={{ fontSize: 13, color: "#666", textDecoration: "none" }}>Pricing</Link>
              <Link href="/trial"          style={{ fontSize: 13, color: "#666", textDecoration: "none" }}>Free Trial</Link>
              <Link href="/getting-started" style={{ fontSize: 13, color: "#666", textDecoration: "none" }}>Getting Started</Link>
              <Link href="/faq"            style={{ fontSize: 13, color: "#666", textDecoration: "none" }}>FAQ</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#444", marginBottom: 14 }}>Company</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Link href="/contact"        style={{ fontSize: 13, color: "#666", textDecoration: "none" }}>Contact Us</Link>
              <Link href="/privacy-policy" style={{ fontSize: 13, color: "#666", textDecoration: "none" }}>Privacy Policy</Link>
              <Link href="/terms-of-service" style={{ fontSize: 13, color: "#666", textDecoration: "none" }}>Terms of Service</Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#444", marginBottom: 14 }}>Follow us</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {SOCIAL_ICONS.map((icon) => (
                <a
                  key={icon.name}
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={icon.name}
                  style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: "#1e1e1e", border: "1px solid #2a2a2a",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.18s, border-color 0.18s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#2a2a2a"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "#444"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#1e1e1e"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "#2a2a2a"; }}
                >
                  <svg width="16" height="16" viewBox={icon.viewBox} fill="#888" xmlns="http://www.w3.org/2000/svg">
                    <path d={icon.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #1e1e1e", paddingTop: 20, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 11, color: "#444" }}>© 2026 PriceZen · Built for D2C brands in India 🇮🇳</span>
          <span style={{ fontSize: 11, color: "#333" }}>
            <a href="mailto:pricezenalert@gmail.com" style={{ color: "#555", textDecoration: "none" }}>pricezenalert@gmail.com</a>
          </span>
        </div>
      </div>
    </footer>
  );
}