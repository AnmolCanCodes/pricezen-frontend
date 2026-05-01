// hooks/useConsent.ts
// ─────────────────────────────────────────────────────────────────
// Hook to check if user has accepted cookie banner (PP + TOS)
// Use this to block form submissions until consent is given
// ─────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "pi_consent";

export type ConsentStatus = "accepted" | "declined" | "pending" | null;

export function useConsent() {
  const [consent, setConsent] = useState<ConsentStatus>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const checkConsent = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      setConsent(stored as ConsentStatus);
      setIsLoading(false);
    };

    checkConsent();
    
    // Listen for storage changes (in case consent is given in another tab)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setConsent(e.newValue as ConsentStatus);
      }
    };
    
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const hasConsent = consent === "accepted";

  const requireConsent = useCallback(() => {
    if (!hasConsent) {
      // Scroll to top to show cookie banner (it appears at bottom)
      window.scrollTo({ top: 0, behavior: "smooth" });
      
      // Dispatch custom event to show banner if hidden
      window.dispatchEvent(new CustomEvent("showCookieBanner"));
      
      return false;
    }
    return true;
  }, [hasConsent]);

  return {
    consent,
    hasConsent,
    isLoading,
    requireConsent,
  };
}
