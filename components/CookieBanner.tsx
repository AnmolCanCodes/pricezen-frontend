// components/CookieBanner.tsx
// ─────────────────────────────────────────────────────────────────────────────
// First-visit privacy consent banner.
//
// HOW IT WORKS:
//   1. On mount, checks localStorage for key "pi_consent"
//   2. If found → never renders (user already agreed)
//   3. If missing → slides in from the bottom after 1.2s
//   4. "Accept All" → saves to localStorage + posts to your FastAPI /consent endpoint
//   5. "Decline" → saves declined state to localStorage, banner disappears
//      (no POST to backend — we only record explicit acceptances)
//
// WHERE DATA IS SAVED:
//   - localStorage:  "pi_consent" = "accepted" | "declined"  +  "pi_consent_ts" = ISO timestamp
//   - FastAPI DB:    POST to NEXT_PUBLIC_API_URL/consent
//                   → stored in consent_records table in clients.db
//                   → IP added server-side automatically
//
// HOW TO ADD TO YOUR SITE:
//   Open pricestats/app/layout.tsx and add:
//     import CookieBanner from "@/components/CookieBanner";
//   Then inside your <body>:
//     <CookieBanner />
//   That's it. It appears on every page automatically, once per visitor.
// ─────────────────────────────────────────────────────────────────────────────

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY    = "pi_consent";
const STORAGE_TS_KEY = "pi_consent_ts";
const POLICY_VERSION = "1.0.0";
const BACKEND        = (process.env.NEXT_PUBLIC_API_URL || "");

type ConsentState = "accepted" | "declined" | "pending" | null;

const CSS = `
@keyframes slideUp {
  from { transform: translateY(110%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
@keyframes slideDown {
  from { transform: translateY(0);    opacity: 1; }
  to   { transform: translateY(110%); opacity: 0; }
}
.cookie-banner {
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 9999;
  width: calc(100vw - 32px);
  max-width: 620px;
  font-family: 'Sora', sans-serif;
}
@media (max-width: 640px) {
  .cookie-banner {
    bottom: 12px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: calc(100% - 24px);
    max-width: 480px;
    border-radius: 14px;
  }
  .cookie-banner > div {
    border-radius: 14px !important;
    padding: 14px 16px !important;
  }
  .cookie-banner p {
    font-size: 11px !important;
  }
  .cb-accept {
    padding: 9px 18px !important;
    font-size: 12px !important;
  }
  .cb-decline {
    padding: 9px 14px !important;
    font-size: 11px !important;
  }
}
.cookie-banner.enter { animation: slideUp   0.42s cubic-bezier(0.34,1.3,0.64,1) both; }
.cookie-banner.leave { animation: slideDown 0.28s ease-in both; }
.cb-accept {
  padding: 11px 24px;
  background: #1a1a1a;
  color: #fff;
  border: none;
  border-radius: 50px;
  font-family: 'Sora', sans-serif;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.16s, transform 0.13s;
  white-space: nowrap;
  letter-spacing: 0.2px;
}
.cb-accept:hover  { background: #333; transform: translateY(-1px); }
.cb-accept:active { transform: scale(0.97); }
.cb-decline {
  padding: 11px 18px;
  background: transparent;
  color: #aaa;
  border: 1px solid #e0dbd0;
  border-radius: 50px;
  font-family: 'Sora', sans-serif;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
  white-space: nowrap;
}
.cb-decline:hover { color: #555; border-color: #aaa; }
`;

export default function CookieBanner() {
  const [state,    setState]    = useState<ConsentState>(null);
  const [leaving,  setLeaving]  = useState(false);
  const [visible,  setVisible]  = useState(false);

  // Check localStorage on mount + listen for show events
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const checkAndShow = (force = false) => {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (existing === "accepted") {
        setState("accepted");
        setVisible(false);
        return;
      }
      // Show banner
      setState("pending");
      setVisible(true);
      setLeaving(false);
    };
    
    // Initial check
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing === "accepted") {
      setState("accepted");
    } else {
      // Delayed show for first visit
      const t = setTimeout(() => checkAndShow(), 1200);
    }
    
    // Listen for custom show event from forms
    const handleShow = () => {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (existing !== "accepted") {
        checkAndShow(true);
      }
    };
    
    window.addEventListener("showCookieBanner", handleShow);
    return () => window.removeEventListener("showCookieBanner", handleShow);
  }, []);

  const dismiss = (decision: "accepted" | "declined") => {
    setLeaving(true);
    setState(decision);
    localStorage.setItem(STORAGE_KEY,    decision);
    localStorage.setItem(STORAGE_TS_KEY, new Date().toISOString());
    setTimeout(() => setVisible(false), 300);
  };

  const handleAccept = async () => {
    dismiss("accepted");

    // Fire-and-forget: POST anonymous consent to FastAPI backend
    // IP is captured server-side. No email required for cookie consent.
    try {
      await fetch(`${BACKEND}/consent`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email:             "no-reply@pricezen.in",   // placeholder — no email collected here
          timestamp:          new Date().toISOString(),
          policy_version:     POLICY_VERSION,
          terms_version:      POLICY_VERSION,
          acceptance_method:  "cookie-banner-click-accept-both",
          accepted_policies:  ["privacy-policy", "terms-of-service"],
          user_agent:         navigator.userAgent,
        }),
      });
    } catch {
      // Silent fail — localStorage already saved. Don't block UX.
    }
  };

  const handleDecline = () => {
    dismiss("declined");
    // No backend call — we only record explicit acceptances
  };

  // Don't render anything if not visible or already accepted
  if (!visible || state === "accepted") return null;

  return (
    <>
      <style>{CSS}</style>
      <div className={`cookie-banner ${leaving ? "leave" : "enter"}`} suppressHydrationWarning>
        <div style={{
          background: "#fff",
          border: "1px solid #e4ddd0",
          borderRadius: 18,
          padding: "18px 20px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.10), 0 2px 10px rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}>

          {/* Top row — icon + text */}
          <div style={{ display: "flex", gap: 13, alignItems: "flex-start" }}>
            {/* Cookie icon */}
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "#fef8ee", border: "1px solid #f0dcaa",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, flexShrink: 0,
            }}>🍪</div>

            <div style={{ flex: 1 }}>
              <p style={{
                margin: "0 0 4px",
                fontSize: 13, fontWeight: 800, color: "#111", lineHeight: 1.3,
              }}>
                We use cookies &amp; store minimal data
              </p>
              <p style={{
                margin: 0, fontSize: 12, color: "#777", lineHeight: 1.65,
              }}>
                By clicking "Accept &amp; Continue", you agree to our{" "}
                <Link href="/terms-of-service" style={{
                  color: "#b8872c", fontWeight: 700, textDecoration: "none",
                }}>
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" style={{
                  color: "#b8872c", fontWeight: 700, textDecoration: "none",
                }}>
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div style={{
            display: "flex", gap: 8, alignItems: "center",
            justifyContent: "flex-end", flexWrap: "wrap",
          }}>
            <button className="cb-decline" onClick={handleDecline}>
              Decline
            </button>
            <button className="cb-accept" onClick={handleAccept}>
              ✓ Accept &amp; Continue
            </button>
          </div>

        </div>
      </div>
    </>
  );
}