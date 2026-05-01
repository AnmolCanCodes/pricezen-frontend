"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

declare global {
  interface Window { Razorpay: any; }
}

function PaymentForm() {
  const params   = useSearchParams();
  const router   = useRouter();
  const rawId    = params.get("client_id");
  // Validate client_id is a real integer — reject injected strings
  const clientId = rawId && /^\d+$/.test(rawId) ? rawId : null;

  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [success,   setSuccess]   = useState(false);
  const [planLabel, setPlanLabel] = useState("");
  const [amount,    setAmount]    = useState<number | null>(null);
  const [brandName, setBrandName] = useState("");

  // Load Razorpay script once on mount
  useEffect(() => {
    const script   = document.createElement("script");
    script.src     = "https://checkout.razorpay.com/v1/checkout.js";
    script.async   = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  const startPayment = async () => {
    if (!clientId) { setError("Invalid payment link. Please contact support."); return; }
    setLoading(true);
    setError("");

    try {
      // Step 1 — create order on backend
      const res = await fetch(`/api/payment/create-order?client_id=${clientId}`, {
        method: "POST",
        signal: AbortSignal.timeout(15000),   // 15s timeout — don't hang forever
      });
      const order = await res.json();
      if (!res.ok) throw new Error(order.detail || "Could not create payment order.");

      // Store plan info so success screen has it even without a re-fetch
      setPlanLabel(order.plan_label);
      setAmount(order.amount);
      setBrandName(order.brand_name);

      if (!window.Razorpay) {
        throw new Error("Payment script failed to load. Please refresh and try again.");
      }

      // Step 2 — open Razorpay checkout
      const rzp = new window.Razorpay({
        key:         order.key_id,
        amount:      order.amount,
        currency:    order.currency,
        order_id:    order.order_id,
        name:        "PriZen",
        description: `${order.plan_label} Plan — Monthly`,
        prefill:     { name: order.brand_name },
        theme:       { color: "#00ff88" },

        handler: async (response: any) => {
          // Step 3 — verify on backend (HMAC check happens server-side)
          try {
            const verify = await fetch("/api/payment/verify", {
              method:  "POST",
              headers: { "Content-Type": "application/json" },
              signal:  AbortSignal.timeout(15000),
              body: JSON.stringify({
                razorpay_order_id:   response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature:  response.razorpay_signature,
                client_id:           parseInt(clientId),
              }),
            });
            const result = await verify.json();
            if (verify.ok) {
              setSuccess(true);
            } else {
              setError(result.detail || "Payment verification failed. Please contact support.");
            }
          } catch {
            // Payment may have gone through even if verify call failed.
            // Tell user to contact support rather than saying it failed.
              setError(
              "Payment received but confirmation timed out. " +
              "Please email prizenalert@gmail.com with your payment ID: " +
              response.razorpay_payment_id
            );
          }
          setLoading(false);
        },

        modal: {
          ondismiss: () => {
            // User closed modal — not a failure, just reset loading
            setLoading(false);
          },
        },
      });

      rzp.open();

    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // ── Invalid link ────────────────────────────────────────────
  if (!clientId) return (
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
  <a href="mailto:prizenalert@gmail.com"
             style={{ color:"#888", fontSize:"0.9em" }}>
            prizenalert@gmail.com
          </a>
        </div>
      </div>
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
        <h2 style={{ fontSize:"1.8rem", fontWeight:900,
                     color:"#00ff88", marginBottom:8 }}>
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
          Questions? <a href="mailto:prizenalert@gmail.com"
                        style={{ color:"#00ff88", textDecoration:"none" }}>
            prizenalert@gmail.com
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
          <h1 style={{ fontSize:"1.6rem", fontWeight:800,
                       color:"#fff", marginBottom:8 }}>
            Complete Your Plan
          </h1>
          <p style={{ color:"#555", fontSize:"0.88em", marginBottom:28, lineHeight:1.6 }}>
            Secure payment via Razorpay.
            UPI · Cards · Net Banking · Wallets — all supported.
          </p>

          {/* Error display with retry button */}
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

          {/* Pay button */}
          <button
            onClick={startPayment}
            disabled={loading}
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
            {loading ? "Opening payment..." : error ? "Try Again →" : "Pay Now →"}
          </button>

          <p style={{ fontSize:"11px", color:"#2a2a2a", marginBottom:20 }}>
            🔒 256-bit SSL · Secured by Razorpay
          </p>

          {/* What's included */}
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
              "Full data export in report.xlsx",
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
            <a href="mailto:prizenalert@gmail.com"
               style={{ color:"#00ff88", textDecoration:"none" }}>
              prizenalert@gmail.com
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
        <p style={{ color:"#555" }}>Loading...</p>
      </main>
    }>
      <PaymentForm />
    </Suspense>
  );
}