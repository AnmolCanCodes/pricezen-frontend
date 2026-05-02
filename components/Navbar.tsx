"use client";
import Link from "next/link";
import Image from "next/image";
import PriceZenLogo from "@/components/PriceZen-logo.jpg";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Why PriceZen", href: "/#why"   },
  { label: "How it works", href: "/#how"   },
  { label: "Pricing",      href: "/#plans" },
  { label: "FAQ",          href: "/faq"    },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');

@keyframes slideDown {
  from { opacity:0; transform:translateY(-8px); }
  to   { opacity:1; transform:translateY(0); }
}

@keyframes trialGlow {
  0%,100% {
    box-shadow: 0 0 0 0 rgba(201,168,76,0), 0 0 8px rgba(201,168,76,0.3);
    border-color: rgba(201,168,76,0.5);
  }
  50% {
    box-shadow: 0 0 0 5px rgba(201,168,76,0), 0 0 18px rgba(201,168,76,0.55);
    border-color: rgba(201,168,76,0.9);
  }
}
@keyframes trialShimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}

.pi-trial-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 16px;
  border-radius: 50px;
  font-size: 15px;
  font-weight: 800;
  font-family: 'Sora', sans-serif;
  text-decoration: solid;
  white-space: nowrap;
  letter-spacing: 0.3px;
  border: 1.5px solid rgba(201,168,76,0.5);
  color: #b85132;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 0 0 rgba(201,168,76,0), 0 0 8px rgba(201,168,76,0.3);
  background: linear-gradient(
    105deg,
    #fef8ee 0%, #fef8ee 35%,
    rgba(201,168,76,0.18) 50%,
    #fef8ee 65%, #fef8ee 100%
  );
  background-size: 200% 100%;
  animation: trialGlow 2.4s ease-in-out infinite, trialShimmer 3.2s linear infinite;
  transition: transform 0.15s;
}
.pi-trial-btn:hover {
  transform: translateY(-1px);
  border-color: #c9a84c;
  background: #fef3da;
  animation: trialGlow 1.8s ease-in-out infinite, trialShimmer 2.8s linear infinite;
}

.pi-preview-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 800;
  font-family: 'Sora', sans-serif;
  color: #b8872c;
  background: rgba(249,238,214,0.95);
  border: 1.5px solid #c9a84c;
  text-decoration: none;
  white-space: nowrap;
  transition: transform 0.15s, background 0.18s, border-color 0.18s;
}
.pi-preview-btn:hover {
  transform: translateY(-1px);
  background: #fff4dc;
  border-color: #b8872c;
}

.pi-trial-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #c9a84c;
  animation: dotPulse 1.6s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes dotPulse {
  0%,100% { opacity:1; transform:scale(1); }
  50%      { opacity:0.4; transform:scale(0.7); }
}

.pi-nav-link {
  font-size: 13px; color: #777; font-weight: 500;
  padding: 6px 11px; border-radius: 8px;
  text-decoration: none;
  transition: color 0.15s, background 0.15s;
  white-space: nowrap;
}
.pi-nav-link:hover  { color: #111; background: #f0ece2; }
.pi-nav-link.active { color: #b8872c; font-weight: 700; }

.pi-cta-btn {
  display: inline-block; padding: 9px 22px;
  background: #1a1a1a; color: #fff;
  border: none; border-radius: 50px;
  font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 700;
  cursor: pointer; text-decoration: none; letter-spacing: 0.2px;
  transition: background 0.18s, transform 0.14s; white-space: nowrap;
}
.pi-cta-btn:hover { background: #333; transform: translateY(-1px); }

.pi-mobile-menu {
  position: fixed; top: 62px; left: 0; right: 0;
  background: rgba(250,248,243,0.97);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid #ede8de;
  padding: 16px 24px 20px;
  display: flex; flex-direction: column; gap: 4px;
  animation: slideDown 0.2s ease; z-index: 99;
}
.pi-mobile-link {
  font-family: 'Sora', sans-serif; font-size: 14px;
  color: #444; font-weight: 600; text-decoration: none;
  padding: 11px 14px; border-radius: 10px;
  transition: background 0.15s, color 0.15s;
}
.pi-mobile-link:hover  { background: #f0ece2; color: #111; }
.pi-mobile-link.active { color: #b8872c; }
.pi-mobile-preview {
  font-family: 'Sora', sans-serif; font-size: 14px;
  color: #b8872c; font-weight: 800; text-decoration: none;
  padding: 11px 14px; border-radius: 10px;
  background: #fff5d9; border: 1px solid #f0dcaa;
  display: flex; align-items: center; gap: 8px;
  margin-bottom: 6px;
}
.pi-mobile-trial {
  font-family: 'Sora', sans-serif; font-size: 14px;
  color: #b8872c; font-weight: 800; text-decoration: none;
  padding: 11px 14px; border-radius: 10px;
  background: #fef8ee; border: 1px solid #f0dcaa;
  display: flex; align-items: center; gap: 8px;
}

.pi-burger {
  display: none; flex-direction: column; gap: 5px;
  background: none; border: none; cursor: pointer; padding: 6px;
}
.pi-burger span {
  display: block; width: 22px; height: 2px;
  background: #555; border-radius: 2px;
  transition: transform 0.2s, opacity 0.2s;
}
.pi-burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.pi-burger.open span:nth-child(2) { opacity: 0; }
.pi-burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (max-width: 720px) {
  .pi-desktop-links { display: none !important; }
  .pi-burger        { display: flex !important; }
}
@media (min-width: 721px) {
  .pi-mobile-menu   { display: none !important; }
}
`;

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <style>{CSS}</style>
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "#faf8f3",
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${scrolled ? "#ddd8ce" : "#ede8de"}`,
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.05)" : "none",
        padding: "0 clamp(20px,4vw,48px)", height: 62,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
        fontFamily: "'Sora', sans-serif",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:2, textDecoration:"none", flexShrink:0 }}>
          {!logoError ? (
            <Image
              src={PriceZenLogo} alt="PriceZen logo"
              width={35} height={30}
              style={{ borderRadius:6, objectFit:"contain" }}
              onError={() => setLogoError(true)}
              priority
            />
          ) : (
            <div style={{ width:30, height:30, borderRadius:8, background:"linear-gradient(135deg,#b8872c,#e6a535)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:900, color:"#fff" }}>P</div>
          )}
          <span style={{ fontWeight:900, fontSize:18, letterSpacing:-0.6, color:"#111" }}>
            Price<span style={{ color:"#b8872c" }}>Zen</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="pi-desktop-links" style={{ display:"flex", gap:2, alignItems:"center" }}>
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href}
              className={`pi-nav-link${isActive(link.href) ? " active" : ""}`}>
              {link.label}
            </Link>
          ))}
          <div style={{ width:1, height:20, background:"#e4ddd0", margin:"0 10px" }} />
          <Link href="/Preview" className="pi-preview-btn">Live Preview</Link>
          <div style={{ width:6 }} />
          <Link href="/trial" className="pi-trial-btn">
            <span className="pi-trial-dot" />
            Free Trial
          </Link>
          <div style={{ width:6 }} />
          <Link href="/audit" className="pi-cta-btn">Audit →</Link>
        </div>

        {/* Hamburger */}
        <button className={`pi-burger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="pi-mobile-menu">
          <Link href="/Preview" className="pi-mobile-preview" onClick={() => setMenuOpen(false)}>Preview</Link>
          <Link href="/trial" className="pi-mobile-trial" onClick={() => setMenuOpen(false)}>
            <span className="pi-trial-dot" />
            Free Trial — 10 Days
          </Link>
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href}
              className={`pi-mobile-link${isActive(link.href) ? " active" : ""}`}
              onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div style={{ borderTop:"1px solid #ede8de", marginTop:8, paddingTop:12 }}>
            <Link href="/audit" className="pi-cta-btn"
              style={{ display:"block", textAlign:"center" }}
              onClick={() => setMenuOpen(false)}>
              Get Started →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}