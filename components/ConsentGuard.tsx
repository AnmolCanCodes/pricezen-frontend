// components/ConsentGuard.tsx
// ─────────────────────────────────────────────────────────────────
// Wrapper that blocks form submission until cookie consent is given
// Shows a warning message with link to accept PP/TOS
// ─────────────────────────────────────────────────────────────────

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "pi_consent";

interface ConsentGuardProps {
  children: React.ReactNode;
  formId?: string;
}

export default function ConsentGuard({ children, formId }: ConsentGuardProps) {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const check = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      setHasConsent(stored === "accepted");
    };
    
    check();
    
    // Listen for storage changes
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setHasConsent(e.newValue === "accepted");
      }
    };
    
    // Listen for custom show event
    const showHandler = () => {
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 5000);
    };
    
    window.addEventListener("storage", handler);
    window.addEventListener("showCookieBanner", showHandler);
    
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("showCookieBanner", showHandler);
    };
  }, []);

  // Block form submission
  useEffect(() => {
    if (!formId || hasConsent === null) return;
    
    const form = document.getElementById(formId) as HTMLFormElement | null;
    if (!form) return;

    const handler = (e: Event) => {
      if (!hasConsent) {
        e.preventDefault();
        e.stopPropagation();
        setShowBanner(true);
        // Scroll to show the warning
        window.scrollTo({ top: 0, behavior: "smooth" });
        return false;
      }
    };

    form.addEventListener("submit", handler, true);
    return () => form.removeEventListener("submit", handler, true);
  }, [formId, hasConsent]);

  if (hasConsent === null) return null; // Loading

  if (hasConsent) {
    return <>{children}</>;
  }

  return (
    <div style={{ position: "relative" }}>
      {/* Warning banner */}
      <div 
        style={{
          background: "#fff8e6",
          border: "2px solid #ffc107",
          borderRadius: 12,
          padding: "16px 20px",
          marginBottom: 20,
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
        }}
      >
        <span style={{ fontSize: 24 }}>⚠️</span>
        <div>
          <p style={{ 
            margin: "0 0 8px", 
            fontSize: 14, 
            fontWeight: 700, 
            color: "#b8872c" 
          }}>
            Consent Required
          </p>
          <p style={{ 
            margin: "0 0 12px", 
            fontSize: 13, 
            color: "#5a4520", 
            lineHeight: 1.6 
          }}>
            To submit this form, you must first accept our 
            <Link href="/terms-of-service" style={{ color: "#b8872c", fontWeight: 700 }}> Terms of Service</Link> and
            <Link href="/privacy-policy" style={{ color: "#b8872c", fontWeight: 700 }}> Privacy Policy</Link>.
            Please click <strong>"Accept & Continue"</strong> in the cookie banner at the bottom of the page.
          </p>
          <p style={{ margin: 0, fontSize: 11, color: "#999" }}>
            Your data (email, product URLs, etc.) will not be submitted until consent is given.
          </p>
        </div>
      </div>

      {/* Disabled form overlay */}
      <div style={{ position: "relative" }}>
        {children}
        <div 
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(250, 248, 243, 0.7)",
            backdropFilter: "blur(2px)",
            borderRadius: 8,
            cursor: "not-allowed",
            zIndex: 10,
          }}
        />
      </div>
    </div>
  );
}
