"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

declare global {
  interface Window { Razorpay: any; }
}

// ── localStorage key for retry-safe verification (Issue 4 fix) ─
const PENDING_VERIFY_KEY = "pricezen_pending_verify";

function PaymentForm() {
  const params   = useSearchParams();
  const router   = useRouter();

  const rawId    = params.get("client_id");
  const token    = params.get("token") ?? "";   // ← NEW: signed token
  const clientId = rawId && /^\d+$/.test(rawId) ? rawId : null;

  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState("");
  const [success,    setSuccess]    = useState(false);
  const [planLabel,  setPlanLabel]  = useState("");
  const [amount,     setAmount]     = useState<number | null>(null);
  const [brandName,  setBrandName]  = useState("");
  const [retrying,   setRetrying]   = useState(false);

  // Issue 5 fix: ref-based lock so even double-clicks can't double-fire
  const isOpenRef = useRef(false);

  // Load Razorpay script once on mount
  useEffect(() => {
    const script   = document.createElement("script");
    script.src     = "https://checkout.razorpay.com/v1/checkout.js";
    script.async   = true;
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  // Issue 4 fix: on mount, retry any pending verification from a previous session
  useEffect(() => {
    const pending = localStorage.getItem(PENDING_VERIFY_KEY);
    if (!pending || !clientId) return;

    const data = JSON.parse(pending) as {
      razorpay_order_id:   string;
      razorpay_payment_id: string;
      razorpay_signature:  string;
      client_id:           number;
    };

    // Only retry if it's for the same client
    if (String(data.client_id) !== clientId) return;

    setRetrying(true);
    console.log("[Payment] Retrying pending verification…", data.razorpay_payment_id);

    fetch("/api/payment/verify", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(data),
    })
      .then(r => r.json())
      .then(result => {
        if (result.success) {
          localStorage.removeItem(PENDING_VERIFY_KEY);
          setSuccess(true);
        }
      })
      .catch(e => console.warn("[Payment] Retry failed:", e))
      .finally(() => setRetrying(false));
  }, [clientId]);

  const startPayment = async () => {
    // Issue 5 fix: ref lock — ignores calls while modal is open
    if (isOpenRef.current || loading) return;
    if (!clientId) { setError("Invalid payment link. Please contact support."); return; }
    if (!token)    { setError("Invalid payment link (missing token). Please contact support."); return; }

    isOpenRef.current = true;
    setLoading(true);
    setError("");

    try {
      // Step 1 — create order, passing token for server-side validation
      const res = await fetch(
        `/api/payment/create-order?client_id=${clientId}&token=${encodeURIComponent(token)}`,
        { method: "POST", signal: AbortSignal.timeout(15000) }
      );
      const order = await res.json();
      if (!res.ok) {
        isOpenRef.current = false;
        throw new Error(order.detail || "Could not create payment order.");
      }

      setPlanLabel(order.plan_label);
      setAmount(order.amount);
      setBrandName(order.brand_name);

      if (!window.Razorpay) {
        isOpenRef.current = false;
        throw new Error("Payment script failed to load. Please refresh and try again.");
      }

      // Step 2 — open Razorpay checkout
      const rzp = new window.Razorpay({
        key:         order.key_id,
        amount:      order.amount,
        currency:    order.currency,
        order_id:    order.order_id,
        name:        "PriceZen",
        description: `${order.plan_label} Plan — Monthly`,
        prefill:     { name: order.brand_name },
        theme:       { color: "#00ff88" },

        handler: async (response: any) => {
          // Issue 4 fix: persist before verify so a crash/close can retry
          const verifyPayload = {
            razorpay_order_id:   response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature:  response.razorpay_signature,
            client_id:           parseInt(clientId),
          };
          localStorage.setItem(PENDING_VERIFY_KEY, JSON.stringify(verifyPayload));

          // Step 3 — verify signature on backend
          try {
            const verify = await fetch("/api/payment/verify", {
              method:  "POST",
              headers: { "Content-Type": "application/json" },
              signal:  AbortSignal.timeout(15000),
              body:    JSON.stringify(verifyPayload),
            });
            const result = await verify.json();
            if (verify.ok && result.success) {
              localStorage.removeItem(PENDING_VERIFY_KEY);
              setSuccess(true);
            } else {
              // Payment went through but verify failed — show payment ID so support can fix
              setError(
                `Payment received but confirmation failed. ` +
                `Email pricezenalert@gmail.com with payment ID: ${response.razorpay_payment_id}. ` +
                `We will activate your plan manually within 1 hour.`
              );
            }
          } catch {
            // Timeout or network drop — pending payload is in localStorage, will retry on reload
            setError(
              `Payment received — confirmation timed out. ` +
              `Refresh this page to retry, or email pricezenalert@gmail.com ` +
              `with payment ID: ${response.razorpay_payment_id}`
            );
          }

          isOpenRef.current = false;
          setLoading(false);
        },

        modal: {
          ondismiss: () => {
            // User closed modal — not a failure
            isOpenRef.current = false;
            setLoading(false);
          },
        },
      });

      rzp.open();

    } catch (err: any) {
      isOpenRef.current = false;
      setError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // ── Invalid link ─────────────────────────────────────────────
  if (!clientId || !token) return (
    <main style={{ minHeight:"100vh", display:"flex", alignItems:"center",
                   justifyContent:"center", background:"#060608", padding:"24px" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:16 }}>⚠️</div>
        <p style={{ color:"#f66", marginBottom:8, fontSize:"1.1em", fontWeight:700 }}>
          Invalid payment link.
        </p>
        <p style={{ color:"#555", marginBottom:24, fontSize:"0.9em" }}>
          Please use the link sent to your email or contact support.
        </p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <Link href="/" style={{ color:"#00ff88", fontSize:"0.9em" }}>← Go Home</Link>
          <a href="mailto:pricezenalert@gmail.com" style={{ color:"#888", fontSize:"0.9em" }}>
            pricezenalert@gmail.com
          </a>
        </div>
      </div>
    </main>
  );

  // ── Retrying pending verification ────────────────────────────
  if (retrying) return (
    <main style={{ minHeight:"100vh", display:"flex", alignItems:"center",
                   justifyContent:"center", background:"#060608" }}>
      <p style={{ color:"#555" }}>Confirming your previous payment…</p>
    </main>
  );

  // ── Success screen ───────────────────────────────────────────
  if (success) return (
    <main style={{ minHeight:"100vh", display:"flex", alignItems:"center",
                   justifyContent:"center", background:"#060608", padding:"24px" }}>
      <motion.div
        initial={{ opacity:0, y:20 }}
        animate={{ opacity:1, y:0 }}
        style={{ maxWidth:420, width:"100%", textAlign:"center" }}
      >
        <div style={{
          width:80, height:80, borderRadius:"50%",
          background:"rgba(0,255,136,0.1)", border:"1px solid #00ff88",
          display:"flex", alignItems:"center", justifyContent:"center",
          margin:"0 auto 24px",
        }}>
          <svg width="32" height="32" fill="none" stroke="#00ff88"
               strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 16 13 23 26 9" />
          </svg>
        </div>
        <h2 style={{ fontSize:"1.8rem", fontWeight:900, color:"#00ff88", marginBottom:8 }}>
          Payment Successful!
        </h2>
        {planLabel && amount && (
          <div style={{
            display:"inline-block", padding:"4px 14px",
            background:"rgba(0,255,136,0.08)", border:"1px solid rgba(0,255,136,0.2)",
            borderRadius:20, marginBottom:16,
          }}>
            <span style={{ color:"#00ff88", fontWeight:700, fontSize:"0.9em" }}>
              {planLabel} Plan · ₹{(amount / 100).toLocaleString("en-IN")}/month
            </span>
          </div>
        )}
        <p style={{ color:"#888", marginBottom:8, lineHeight:1.7 }}>
          Your {planLabel} Plan is now active.
          Check your email for a payment receipt and confirmation.
          Price monitoring starts within hours.
        </p>
        <p style={{ color:"#555", fontSize:"0.82em", marginBottom:28 }}>
          Questions?{" "}
          <a href="mailto:pricezenalert@gmail.com" style={{ color:"#00ff88", textDecoration:"none" }}>
            pricezenalert@gmail.com
          </a>
        </p>
        <Link href="/" style={{
          display:"block", padding:"14px",
          background:"#00ff88", color:"#060608",
          fontWeight:800, borderRadius:12, textDecoration:"none",
        }}>
          Back to Home →
        </Link>
      </motion.div>
    </main>
  );

  // ── Payment form ─────────────────────────────────────────────
  return (
    <main style={{ minHeight:"100vh", display:"flex", alignItems:"center",
                   justifyContent:"center", background:"#060608", padding:"24px" }}>
      <div style={{ maxWidth:420, width:"100%" }}>
        <div style={{
          background:"rgba(255,255,255,0.02)",
          border:"1px solid rgba(255,255,255,0.08)",
          borderRadius:20, padding:"32px 28px", textAlign:"center",
        }}>
          <div style={{ fontSize:40, marginBottom:16 }}>💳</div>
          <h1 style={{ fontSize:"1.6rem", fontWeight:800, color:"#fff", marginBottom:8 }}>
            Complete Your Plan
          </h1>
          <p style={{ color:"#555", fontSize:"0.88em", marginBottom:28, lineHeight:1.6 }}>
            Secure payment via Razorpay.
            UPI · Cards · Net Banking · Wallets — all supported.
          </p>

          {error && (
            <div style={{
              padding:"12px 16px",
              background:"rgba(255,107,107,0.08)",
              border:"1px solid rgba(255,107,107,0.2)",
              borderRadius:10, marginBottom:20,
              color:"#ff6b6b", fontSize:"0.85em",
              lineHeight:1.6, textAlign:"left",
            }}>
              <p style={{ margin:"0 0 10px", fontWeight:700 }}>⚠ Payment issue</p>
              <p style={{ margin:0 }}>{error}</p>
            </div>
          )}

          {/* Issue 5 fix: disabled immediately on first click via isOpenRef + loading state */}
          <button
            onClick={startPayment}
            disabled={loading || isOpenRef.current}
            style={{
              width:"100%", padding:"16px",
              background: loading ? "rgba(0,255,136,0.3)" : "#00ff88",
              color:"#060608", fontWeight:800,
              borderRadius:12, border:"none",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize:"1em", marginBottom:10,
              transition:"background 0.2s",
            }}
          >
            {loading ? "Opening payment…" : error ? "Try Again →" : "Pay Now →"}
          </button>

          <p style={{ fontSize:"11px", color:"#2a2a2a", marginBottom:20 }}>
            🔒 256-bit SSL · Secured by Razorpay
          </p>

          <div style={{
            padding:"14px 16px",
            background:"rgba(255,255,255,0.02)",
            borderRadius:10, textAlign:"left",
          }}>
            <p style={{ fontSize:"10px", color:"#444", marginBottom:8,
                        textTransform:"uppercase", letterSpacing:"0.08em" }}>
              Included in your plan
            </p>
            {[
              "Automated price monitoring 24/7",
              "Instant email alerts on price changes",
              "Weekly business performance report",
              "Rupee impact & margin estimates",
            ].map((f, i) => (
              <p key={i} style={{ fontSize:"12px", color:"#666",
                                   marginBottom:4, display:"flex", gap:8,
                                   alignItems:"flex-start" }}>
                <span style={{ color:"#00ff88", flexShrink:0 }}>✓</span>{f}
              </p>
            ))}
          </div>

          <p style={{ marginTop:18, fontSize:"11px", color:"#333", lineHeight:1.7 }}>
            Questions?{" "}
            <a href="mailto:pricezenalert@gmail.com"
               style={{ color:"#00ff88", textDecoration:"none" }}>
              pricezenalert@gmail.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <main style={{ minHeight:"100vh", display:"flex", alignItems:"center",
                     justifyContent:"center", background:"#060608" }}>
        <p style={{ color:"#555" }}>Loading…</p>
      </main>
    }>
      <PaymentForm />
    </Suspense>
  );
}