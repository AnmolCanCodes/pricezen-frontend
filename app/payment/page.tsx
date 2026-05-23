"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { AlertTriangle, CreditCard, Lock, Check, Shield, Zap } from "lucide-react";

declare global {
  interface Window { Razorpay: any; }
}

// ── localStorage key for retry-safe verification ─
const PENDING_VERIFY_KEY = "pricezen_pending_verify";

function PaymentForm() {
  const params   = useSearchParams();
  const router   = useRouter();

  const rawId    = params.get("client_id");
  const token    = params.get("token") ?? "";
  const clientId = rawId && /^\d+$/.test(rawId) ? rawId : null;

  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState("");
  const [success,    setSuccess]    = useState(false);
  const [planLabel,  setPlanLabel]  = useState("");
  const [amount,     setAmount]     = useState<number | null>(null);
  const [brandName,  setBrandName]  = useState("");
  const [retrying,   setRetrying]   = useState(false);

  const isOpenRef = useRef(false);

  // Load checkout provider script once on mount
  useEffect(() => {
    const script   = document.createElement("script");
    script.src     = "https://checkout.razorpay.com/v1/checkout.js";
    script.async   = true;
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  // Retry any pending verification from a previous session
  useEffect(() => {
    const pending = localStorage.getItem(PENDING_VERIFY_KEY);
    if (!pending || !clientId) return;

    const data = JSON.parse(pending) as {
      razorpay_order_id:   string;
      razorpay_payment_id: string;
      razorpay_signature:  string;
      client_id:           number;
    };

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
    if (isOpenRef.current || loading) return;
    if (!clientId) { setError("Invalid payment link. Please contact support."); return; }
    if (!token)    { setError("Invalid payment link (missing token). Please contact support."); return; }

    isOpenRef.current = true;
    setLoading(true);
    setError("");

    try {
      // Step 1 — create order
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

      // Step 2 - open hosted checkout
      const rzp = new window.Razorpay({
        key:         order.key_id,
        amount:      order.amount,
        currency:    order.currency,
        order_id:    order.order_id,
        name:        "PriceZen",
        description: `${order.plan_label} Plan — Monthly`,
        prefill:     { name: order.brand_name },
        theme:       { color: "#b85c1a" },

        handler: async (response: any) => {
          const verifyPayload = {
            razorpay_order_id:   response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature:  response.razorpay_signature,
            client_id:           parseInt(clientId),
          };
          localStorage.setItem(PENDING_VERIFY_KEY, JSON.stringify(verifyPayload));

          // Step 3 — verify signature
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
              setError(
                `Payment received but confirmation failed. ` +
                `Email pricezenalert@gmail.com with payment ID: ${response.razorpay_payment_id}. ` +
                `We will activate your plan manually within 1 hour.`
              );
            }
          } catch {
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
    <main style={{ 
      minHeight:"100vh", 
      display:"flex", 
      alignItems:"center",
      justifyContent:"center", 
      background:"#faf8f3", 
      padding:"24px",
      fontFamily:"'Sora', sans-serif"
    }}>
      <motion.div 
        initial={{ opacity:0, y:20 }}
        animate={{ opacity:1, y:0 }}
        style={{ 
          textAlign:"center", 
          background:"#fff", 
          border:"1px solid #d4cfc2", 
          borderRadius:20, 
          padding:"48px 36px",
          maxWidth:480,
          width:"100%",
          boxShadow:"0 14px 30px rgba(0,0,0,0.05)"
        }}
      >
        <div style={{ 
          width:80, 
          height:80, 
          borderRadius:"50%",
          background:"#fef1f0", 
          border:"1px solid #f5b8b4",
          display:"flex", 
          alignItems:"center", 
          justifyContent:"center",
          margin:"0 auto 24px"
        }}>
          <AlertTriangle size={40} color="#b91c1c" strokeWidth={2} />
        </div>
        <h2 style={{ 
          color:"#111", 
          marginBottom:12, 
          fontSize:"1.6rem", 
          fontWeight:800,
          letterSpacing:"-0.5px"
        }}>
          Invalid payment link
        </h2>
        <p style={{ 
          color:"#666", 
          marginBottom:32, 
          fontSize:"0.95em", 
          lineHeight:1.7 
        }}>
          Please use the link sent to your email or contact support.
        </p>
        <div style={{ 
          display:"flex", 
          gap:14, 
          justifyContent:"center", 
          flexWrap:"wrap" 
        }}>
          <Link href="/" style={{ 
            padding:"12px 28px", 
            background:"#b85c1a", 
            color:"#fff", 
            borderRadius:50, 
            textDecoration:"none",
            fontWeight:700,
            fontSize:"0.9em",
            transition:"all 0.2s",
            display:"inline-block"
          }}>
            ← Go Home
          </Link>
          <a href="mailto:pricezenalert@gmail.com" style={{ 
            padding:"12px 28px", 
            background:"#fff", 
            color:"#111",
            border:"1.5px solid #d4cfc2",
            borderRadius:50, 
            textDecoration:"none",
            fontWeight:600,
            fontSize:"0.9em",
            transition:"all 0.2s",
            display:"inline-block"
          }}>
            Contact Support
          </a>
        </div>
      </motion.div>
    </main>
  );

  // ── Retrying verification ────────────────────────────────────
  if (retrying) return (
    <main style={{ 
      minHeight:"100vh", 
      display:"flex", 
      alignItems:"center",
      justifyContent:"center", 
      background:"#faf8f3",
      fontFamily:"'Sora', sans-serif"
    }}>
      <div style={{
        background:"#fff",
        border:"1px solid #d4cfc2",
        borderRadius:20,
        padding:"32px",
        textAlign:"center"
      }}>
        <div style={{
          width:48,
          height:48,
          borderRadius:"50%",
          border:"3px solid #f0dfa8",
          borderTopColor:"#b8872c",
          animation:"spin 1s linear infinite",
          margin:"0 auto 20px"
        }} />
        <p style={{ color:"#666", fontSize:"0.95em" }}>
          Confirming your previous payment…
        </p>
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </main>
  );

  // ── Success screen ───────────────────────────────────────────
  if (success) return (
    <main style={{ 
      minHeight:"100vh", 
      display:"flex", 
      alignItems:"center",
      justifyContent:"center", 
      background:"#faf8f3", 
      padding:"24px",
      fontFamily:"'Sora', sans-serif"
    }}>
      <motion.div
        initial={{ opacity:0, y:20 }}
        animate={{ opacity:1, y:0 }}
        style={{ 
          maxWidth:480, 
          width:"100%", 
          background:"#fff",
          border:"1px solid #d4cfc2",
          borderRadius:20,
          padding:"48px 36px",
          textAlign:"center",
          boxShadow:"0 14px 30px rgba(0,0,0,0.05)"
        }}
      >
        <div style={{
          width:80, 
          height:80, 
          borderRadius:"50%",
          background:"#f0faf4", 
          border:"1px solid #bbdfc8",
          display:"flex", 
          alignItems:"center", 
          justifyContent:"center",
          margin:"0 auto 24px",
        }}>
          <svg width="36" height="36" fill="none" stroke="#1a6640"
               strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 16 13 23 26 9" />
          </svg>
        </div>
        
        <h2 style={{ 
          fontSize:"1.8rem", 
          fontWeight:900, 
          color:"#111", 
          marginBottom:12,
          letterSpacing:"-1px"
        }}>
          Payment Successful!
        </h2>
        
        {planLabel && amount && (
          <div style={{
            display:"inline-block", 
            padding:"6px 16px",
            background:"#fef8ee", 
            border:"1px solid #f0dfa8",
            borderRadius:20, 
            marginBottom:20,
          }}>
            <span style={{ 
              color:"#b8872c", 
              fontWeight:700, 
              fontSize:"0.9em",
              letterSpacing:"0.3px"
            }}>
              {planLabel} Plan · ₹{(amount / 100).toLocaleString("en-IN")}/month
            </span>
          </div>
        )}
        
        <p style={{ 
          color:"#666", 
          marginBottom:10, 
          lineHeight:1.7,
          fontSize:"0.95em"
        }}>
          Your {planLabel} Plan is now active.
          Check your email for a payment receipt and confirmation.
        </p>
        
        <p style={{ 
          color:"#888", 
          fontSize:"0.88em", 
          marginBottom:32,
          lineHeight:1.6
        }}>
          Price monitoring starts within hours. Questions?{" "}
          <a href="mailto:pricezenalert@gmail.com" style={{ 
            color:"#b8872c", 
            textDecoration:"none",
            fontWeight:600
          }}>
            pricezenalert@gmail.com
          </a>
        </p>
        
        <Link href="/" style={{
          display:"block", 
          padding:"14px",
          background:"#b85c1a", 
          color:"#fff",
          fontWeight:800, 
          borderRadius:12, 
          textDecoration:"none",
          transition:"all 0.2s",
          fontSize:"0.95em"
        }}>
          Back to Home →
        </Link>
      </motion.div>
    </main>
  );

  // ── Payment form ─────────────────────────────────────────────
  return (
    <main style={{ 
      minHeight:"100vh", 
      display:"flex", 
      alignItems:"center",
      justifyContent:"center", 
      background:"#faf8f3", 
      padding:"24px",
      fontFamily:"'Sora', sans-serif"
    }}>
      <motion.div 
        initial={{ opacity:0, y:20 }}
        animate={{ opacity:1, y:0 }}
        style={{ maxWidth:480, width:"100%" }}
      >
        <div style={{
          background:"#fff",
          border:"1px solid #d4cfc2",
          borderRadius:20, 
          padding:"40px 32px",
          boxShadow:"0 14px 30px rgba(0,0,0,0.05)"
        }}>
          {/* Header */}
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <div style={{
              width:64,
              height:64,
              borderRadius:16,
              background:"linear-gradient(135deg,#c9a84c,#a06e1a)",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              margin:"0 auto 20px",
              boxShadow:"0 6px 20px rgba(201,168,76,0.3)"
            }}>
              <CreditCard size={32} color="#fff" strokeWidth={2} />
            </div>
            
            <h1 style={{ 
              fontSize:"1.7rem", 
              fontWeight:800, 
              color:"#111", 
              marginBottom:8,
              letterSpacing:"-0.5px"
            }}>
              Complete Your Plan
            </h1>
            
            <p style={{ 
              color:"#666", 
              fontSize:"0.9em", 
              lineHeight:1.6 
            }}>
              Secure payment via authorized payment gateway.<br />
              UPI · Cards · Net Banking · Wallets
            </p>
          </div>

          {/* Error message */}
          {error && (
            <motion.div 
              initial={{ opacity:0, y:-10 }}
              animate={{ opacity:1, y:0 }}
              style={{
                padding:"14px 16px",
                background:"#fef1f0",
                border:"1px solid #f5b8b4",
                borderRadius:12, 
                marginBottom:24,
                color:"#b91c1c", 
                fontSize:"0.85em",
                lineHeight:1.6,
              }}
            >
              <p style={{ 
                margin:"0 0 8px", 
                fontWeight:700, 
                display:"flex", 
                alignItems:"center", 
                gap:6 
              }}>
                <AlertTriangle size={16} strokeWidth={2.5} /> Payment issue
              </p>
              <p style={{ margin:0, color:"#c92a2a" }}>{error}</p>
            </motion.div>
          )}

          {/* Pay button */}
          <button
            onClick={startPayment}
            disabled={loading || isOpenRef.current}
            style={{
              width:"100%", 
              padding:"16px",
              background: loading ? "#d4a063" : "#b85c1a",
              color:"#fff", 
              fontWeight:800,
              borderRadius:12, 
              border:"none",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize:"1em", 
              marginBottom:14,
              transition:"all 0.2s",
              boxShadow: loading ? "none" : "0 4px 14px rgba(184,92,26,0.3)",
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "Opening payment…" : error ? "Try Again →" : "Pay Now →"}
          </button>

          {/* Security badge */}
          <div style={{
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            gap:8,
            marginBottom:24,
            fontSize:"11px",
            color:"#999"
          }}>
            <Lock size={12} />
            <span>Secure checkout · Encrypted payment</span>
          </div>

          {/* Features included */}
          <div style={{
            padding:"20px 18px",
            background:"#f7f4ee",
            border:"1px solid #e4ddd0",
            borderRadius:12,
            marginBottom:20
          }}>
            <p style={{ 
              fontSize:"10px", 
              color:"#b8872c", 
              marginBottom:12,
              textTransform:"uppercase", 
              letterSpacing:"1.5px",
              fontWeight:800
            }}>
              Included in your plan
            </p>
            {[
              "Automated price monitoring 24/7",
              "Instant email alerts on price changes",
              "Weekly business performance report",
              "Rupee impact & margin estimates",
            ].map((f, i) => (
              <div key={i} style={{ 
                fontSize:"13px", 
                color:"#444",
                marginBottom:8, 
                display:"flex", 
                gap:10,
                alignItems:"flex-start" 
              }}>
                <span style={{ 
                  display:"flex", 
                  color:"#1a6640", 
                  flexShrink:0,
                  marginTop:2
                }}>
                  <Check size={16} strokeWidth={2.5} />
                </span>
                <span>{f}</span>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div style={{
            display:"grid",
            gridTemplateColumns:"1fr 1fr",
            gap:10,
            marginBottom:20
          }}>
            <div style={{
              padding:"10px",
              background:"#fef8ee",
              border:"1px solid #f0dfa8",
              borderRadius:10,
              textAlign:"center"
            }}>
              <Shield size={20} color="#b8872c" style={{ marginBottom:4 }} />
              <p style={{ fontSize:"10px", color:"#b8872c", fontWeight:700, margin:0 }}>
                Secure Payment
              </p>
            </div>
            <div style={{
              padding:"10px",
              background:"#f0faf4",
              border:"1px solid #bbdfc8",
              borderRadius:10,
              textAlign:"center"
            }}>
              <Zap size={20} color="#1a6640" style={{ marginBottom:4 }} />
              <p style={{ fontSize:"10px", color:"#1a6640", fontWeight:700, margin:0 }}>
                Instant Activation
              </p>
            </div>
          </div>

          {/* Support link */}
          <p style={{ 
            textAlign:"center",
            fontSize:"11px", 
            color:"#888", 
            lineHeight:1.7,
            margin:0
          }}>
            Questions?{" "}
            <a href="mailto:pricezenalert@gmail.com"
               style={{ 
                 color:"#b8872c", 
                 textDecoration:"none",
                 fontWeight:600
               }}>
              pricezenalert@gmail.com
            </a>
          </p>
        </div>

        {/* Money-back guarantee */}
        <div style={{
          marginTop:20,
          textAlign:"center",
          padding:"16px",
          background:"rgba(255,255,255,0.6)",
          border:"1px solid #e8e3d9",
          borderRadius:12
        }}>
          <p style={{ 
            fontSize:"12px", 
            color:"#666", 
            lineHeight:1.6,
            margin:0
          }}>
            <strong style={{ color:"#111" }}>10-day free trial</strong> · 
            7-day full refund · Cancel anytime
          </p>
        </div>
      </motion.div>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <main style={{ 
        minHeight:"100vh", 
        display:"flex", 
        alignItems:"center",
        justifyContent:"center", 
        background:"#faf8f3",
        fontFamily:"'Sora', sans-serif"
      }}>
        <div style={{
          background:"#fff",
          border:"1px solid #d4cfc2",
          borderRadius:20,
          padding:"32px",
          textAlign:"center"
        }}>
          <div style={{
            width:48,
            height:48,
            borderRadius:"50%",
            border:"3px solid #f0dfa8",
            borderTopColor:"#b8872c",
            animation:"spin 1s linear infinite",
            margin:"0 auto 16px"
          }} />
          <p style={{ color:"#666", fontSize:"0.95em" }}>Loading payment…</p>
          <style jsx>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </main>
    }>
      <PaymentForm />
    </Suspense>
  );
}
