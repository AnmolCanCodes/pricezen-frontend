"use client";
// app/trial/page.tsx
// ─────────────────────────────────────────────────────────────────
// Trial page — full product + competitor form, saves to the backend database.
// Posts to POST /trial/start (backend/main.py) which saves
// clients + products + competitors tables in PostgreSQL.
//
// SUCCESS SCREEN logic:
//   - "Products configured" ✓ (because they just submitted products)
//   - "First scrape" — we run it within 24hrs
//   - Correct alert timing based on plan
//   - Day 8 payment reminder
//   - Day 10 trial ends
// ─────────────────────────────────────────────────────────────────
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Gift, Ruler, BarChart3, CheckCircle2, Search, Zap, Mail, TrendingUp, Send, Bell, PartyPopper, Check, Lightbulb, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsentGuard from "@/components/ConsentGuard";

type Plan = "starter" | "growth";
interface Competitor { url: string }
interface Product { url: string; group: string; threshold: string; competitors: Competitor[] }

const MAX_P: Record<Plan, number> = { starter: 3, growth: 6 };
const MAX_C: Record<Plan, number> = { starter: 3, growth: 4 };
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

/* ─── CSS (page-specific only) ─────────────────────── */
const CSS = `
@keyframes pulseOut{0%{transform:scale(1);opacity:0.6}100%{transform:scale(2.2);opacity:0}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.ha{animation:fadeUp 0.55s ease both;}
.h1{animation-delay:0.05s}.h2{animation-delay:0.14s}.h3{animation-delay:0.22s}
.pulse-ring{
  position:absolute;inset:0;border-radius:50%;
  border:1.5px solid #c9a84c;
  animation:pulseOut 2.4s ease-out infinite;
}
.spinner{
  width:17px;height:17px;
  border:2.5px solid rgba(255,255,255,0.25);
  border-top-color:#fff;border-radius:50%;
  animation:spin 0.75s linear infinite;
  display:inline-block;vertical-align:middle;margin-right:7px;
}
/* plan buttons */
.plan-btn{
  border-radius:16px;padding:18px;cursor:pointer;
  text-align:left;width:100%;position:relative;
  transition:border-color 0.18s,box-shadow 0.18s,background 0.18s;
  font-family:'Sora',sans-serif;
}
.plan-btn:focus{outline:none;}
/* shared input */
.fi{
  width:100%;padding:11px 13px;
  border:1px solid #e4ddd0;border-radius:9px;
  background:#fff;font-family:'Sora',sans-serif;
  font-size:13px;color:#1a1a1a;outline:none;
  transition:border-color 0.18s,box-shadow 0.18s;
}
.fi:focus{border-color:#c9a84c;box-shadow:0 0 0 3px rgba(201,168,76,0.13);}
.fi::placeholder{color:#ccc;}
/* cards */
.card{background:#fff;border:1px solid #e8e3d9;border-radius:18px;padding:24px;}
/* section label */
.slabel{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#aaa;margin-bottom:14px;display:block;}
/* submit button */
.btn-submit{
  width:100%;padding:15px;background:#1a1a1a;color:#fff;
  border:none;border-radius:12px;font-family:'Sora',sans-serif;
  font-size:14px;font-weight:900;cursor:pointer;
  transition:background 0.18s;letter-spacing:0.4px;
}
.btn-submit:disabled{background:#999;cursor:not-allowed;}
/* timeline */
.tl-dot{width:9px;height:9px;border-radius:50%;background:#c9a84c;flex-shrink:0;}
.tl-line{width:1px;height:26px;background:#f0dcaa;margin:2px 0;}
a{color:inherit;text-decoration:none;}
`;

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "11px 13px",
  border: "1px solid #e4ddd0", borderRadius: 9,
  background: "#fff", fontFamily: "'Sora',sans-serif",
  fontSize: 13, color: "#1a1a1a", outline: "none",
};

/* ─── Info bubble ──────────────────────────────────── */
function InfoBubble({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center", marginLeft: 6 }}>
      <button type="button"
        onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}
        style={{ width: 17, height: 17, borderRadius: "50%", border: "1.5px solid #ccc", background: "#f4f1ea", color: "#999", fontSize: 10, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: 0, lineHeight: 1, flexShrink: 0 }}
        aria-label="What is this?"
      >i</button>
      {open && (
        <span style={{ position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", background: "#1a1a1a", color: "#fff", fontSize: 11, lineHeight: 1.6, padding: "10px 13px", borderRadius: 10, width: 230, zIndex: 200, boxShadow: "0 8px 28px rgba(0,0,0,0.2)", display: "block", pointerEvents: "none" }}>
          {text}
          <span style={{ position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%) rotate(45deg)", width: 10, height: 10, background: "#1a1a1a", borderRadius: 2 }} />
        </span>
      )}
    </span>
  );
}

/* ─── Plan button ──────────────────────────────────── */
function PlanBtn({ plan, selected, onSelect }: { plan: Plan; selected: boolean; onSelect: () => void }) {
  const isG = plan === "growth";
  return (
    <button type="button" onClick={onSelect} className="plan-btn" style={{
      border: selected ? `2px solid ${isG ? "#c9a84c" : "#1a1a1a"}` : "2px solid #e8e3d9",
      background: selected ? (isG ? "#fffdf5" : "#faf8f3") : "#fff",
      boxShadow: selected && isG ? "0 4px 20px rgba(201,168,76,0.14)" : "none",
    }}>
      {isG && <span style={{ position: "absolute", top: -10, right: 14, background: "#c9a84c", color: "#fff", fontSize: 9, fontWeight: 900, padding: "3px 11px", borderRadius: 50, textTransform: "uppercase", letterSpacing: 0.8 }}>Popular</span>}
      <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5, color: isG ? "#b8872c" : "#757474", marginBottom: 5 }}>{isG ? "Growth" : "Starter"}</p>
      <p style={{ fontSize: 22, fontWeight: 900, letterSpacing: -0.8, marginBottom: 1, color: "#111" }}>
      </p>
      <div style={{ fontSize: 11, color: "#666", lineHeight: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Check size={12} strokeWidth={3} /> {isG ? "6 products · 4 competitors" : "3 products · 3 competitors"}</div>
        <div style={{ color: isG ? "#b8872c" : "#666", fontWeight: isG ? 700 : 400, display: "flex", alignItems: "center", gap: 6 }}>
          <Check size={12} strokeWidth={3} /> {isG ? "Instant alert when prices change" : "Instant alert when prices change"}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Check size={12} strokeWidth={3} /> Weekly Monday report</div>
        {isG && <>
          <div style={{ color: "#b8872c", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}><Check size={12} strokeWidth={3} /> ₹ Rupee impact estimates</div>
          <div style={{ color: "#b8872c", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}><Check size={12} strokeWidth={3} /> 30-day trend + monthly report</div>
        </>}
      </div>
      {selected && (
        <span style={{ position: "absolute", top: 14, right: 14, width: 20, height: 20, borderRadius: "50%", background: isG ? "#c9a84c" : "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="9" height="7" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 3.5 3.5 6 8 1" /></svg>
        </span>
      )}
    </button>
  );
}

/* ─── Avg Weekly Orders explainer block ────────────── */
function AvgWeeklyOrdersExplainer() {
  return (
    <div style={{ background: "#fef3f0", border: "1px solid #f0d5cc", borderRadius: 12, padding: "16px 18px" }}>
      <p style={{ fontSize: 12, fontWeight: 800, color: "#b86857", marginBottom: 6, display: "flex", alignItems: "center", gap: 7 }}>
        <BarChart3 size={16} /> Why We Need Your Avg Weekly Orders
      </p>
      <p style={{ fontSize: 12, color: "#5a3a35", lineHeight: 1.7 }}>
        Your average weekly sales volume is used to calculate <strong>accurate rupee (₹) impact estimates</strong>, <strong>revenue at risk recommendations</strong>, and <strong>margin opportunity insights</strong> in our System. Without fair numbers, these calculations will be misleading.
      </p>
    </div>
  );
}

/* ─── Product block ────────────────────────────────── */
function ProductBlock({ index, product, maxC, onRemove, onChange }: {
  index: number; product: Product; maxC: number;
  onRemove: () => void; onChange: (p: Product) => void;
}) {
  return (
    <div style={{ border: "1px solid #ece7dd", borderRadius: 13, padding: 18, background: "#faf8f3" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: "#1a1a1a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 11, flexShrink: 0 }}>{index + 1}</div>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#aaa" }}>Product {index + 1}</span>
        </div>
        {index > 0 && (
          <button type="button" onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "#ccc", fontWeight: 700, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}><X size={12} /> Remove</button>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        <div>
          <label style={{ display: "block", fontSize: 11, color: "#757474", fontWeight: 700, marginBottom: 5 }}>Your Product URL *</label>
          <input type="url" required placeholder="https://yourstore.com/product" value={product.url}
            onChange={e => onChange({ ...product, url: e.target.value })} className="fi" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <label style={{ display: "block", fontSize: 11, color: "#757474", fontWeight: 700, marginBottom: 5 }}>Category / Group</label>
            <input type="text" placeholder="e.g. sunscreen, serum" value={product.group}
              onChange={e => onChange({ ...product, group: e.target.value })} className="fi" />
          </div>
          <div>
            <label style={{ display: "flex", alignItems: "center", fontSize: 11, color: "#757474", fontWeight: 700, marginBottom: 5 }}>
              Alert Threshold % *
              <InfoBubble text="Minimum % price change that triggers an alert. 5 = alert only when competitor moves ≥5%. Recommended: 3–7%." />
            </label>
            <input type="number" required min={1} max={50} placeholder="5"
              value={product.threshold}
              onChange={e => onChange({ ...product, threshold: e.target.value })}
              className="fi" style={{ background: "#fff" }} />
          </div>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
            <label style={{ fontSize: 11, color: "#757474", fontWeight: 700 }}>
              Competitor URLs <span style={{ color: "#ccc", fontWeight: 500 }}>(up to {maxC})</span>
            </label>
            {product.competitors.length < maxC && (
              <button type="button"
                onClick={() => onChange({ ...product, competitors: [...product.competitors, { url: "" }] })}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "#b8872c", fontWeight: 800, fontFamily: "inherit" }}>+ Add</button>
            )}
          </div>
          {product.competitors.map((c, ci) => (
            <div key={ci} style={{ display: "flex", gap: 7, marginBottom: 7, alignItems: "center" }}>
              <input type="url" placeholder="https://competitor.com/product" value={c.url}
                onChange={e => { const comps = [...product.competitors]; comps[ci] = { url: e.target.value }; onChange({ ...product, competitors: comps }); }}
                className="fi" />
              {product.competitors.length > 1 && (
                <button type="button"
                  onClick={() => onChange({ ...product, competitors: product.competitors.filter((_, i) => i !== ci) })}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#ddd", fontSize: 13, width: 28, flexShrink: 0, fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={14} /></button>
              )}
            </div>
          ))}
          {product.competitors.length === 0 && <p style={{ fontSize: 11, color: "#ccc" }}>Add at least one competitor URL.</p>}
        </div>
      </div>
    </div>
  );
}

/* ─── Success screen ───────────────────────────────── */
// Timeline is now 100% logical:
// ✓ Products already submitted in this form → they ARE configured
// ✓ We scrape for the first time within 24hrs → baseline is set
// ✓ Then alerts fire based on plan
// ✓ Day 8: payment reminder (so they have 2 days to decide)
// ✓ Day 10: trial ends (manual — nothing charged automatically)
function SuccessScreen({ email, plan, productCount }: { email: string; plan: Plan; productCount: number }) {
  const alertStep = plan === "growth"
    ? "First alert is sent when a competitor changes price according to your threshold"
    : "If any competitor price crosses your threshold, you'll get an email the next morning at 10am";

  const timeline = [
    {
      icon: CheckCircle2,
      title: "Products saved",
      desc: `${productCount} product${productCount > 1 ? "s" : ""} + competitors submitted. Your monitoring config is ready.`,
      done: true,
    },
    {
      icon: Search,
      title: "Within 24 hours — first scrape",
      desc: "We run the first price check. Current prices are recorded as your baseline. Monitoring begins.",
      done: false,
    },
    {
      icon: plan === "growth" ? Zap : Mail,
      title: plan === "growth" ? "Instant alerts active" : "Morning alerts active",
      desc: alertStep + ". Every alert shows the exact change + your market position.",
      done: false,
    },
    {
      icon: BarChart3,
      title: "Every Monday 10am — weekly report",
      desc: plan === "growth"
        ? "Weekly business performance report with ₹ revenue at risk and margin opportunities."
        : "Weekly price summary with competitor positions and two clear options.",
      done: false,
    },
    {
      icon: Send,
      title: "Day 8 — payment reminder",
      desc: "We send you a payment link 2 days before the trial ends. No pressure, no auto-charge.",
      done: false,
    },
    {
      icon: Bell,
      title: "Day 10 — trial ends",
      desc: "If you pay → monitoring continues uninterrupted. If not → it stops. Nothing is charged automatically.",
      done: false,
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#faf8f3", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Sora',sans-serif" }}>
      <div style={{ maxWidth: 500, width: "100%", textAlign: "center" }}>

        {/* Pulse rings + checkmark */}
        <div style={{ position: "relative", width: 80, height: 80, margin: "0 auto 28px" }}>
          <div className="pulse-ring" style={{ animationDelay: "0s" }} />
          <div className="pulse-ring" style={{ animationDelay: "0.55s" }} />
          <div className="pulse-ring" style={{ animationDelay: "1.1s" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="30" height="24" fill="none" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="2 12 10 20 28 4" />
            </svg>
          </div>
        </div>

        <h1 style={{ fontSize: 46, fontWeight: 900, letterSpacing: -2, marginBottom: 8, color: "#111", display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          Trial Started! <PartyPopper size={36} />
        </h1>
        <p style={{ color: "#757474", fontSize: 14, marginBottom: 28, lineHeight: 1.7 }}>
          Your products and competitors are saved. Here&apos;s exactly what happens next — no fluff.
        </p>

        {/* Timeline */}
        <div style={{ background: "#fff", border: "1px solid #e8e3d9", borderRadius: 16, padding: 22, textAlign: "left", marginBottom: 14 }}>
          <span className="slabel" style={{ marginBottom: 18 }}>What happens next</span>
          {timeline.map(({ icon: Icon, title, desc, done }, i) => (
            <div key={i} style={{ display: "flex", gap: 12 }}>
              {/* Left column: dot + line */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 2 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  background: done ? "#1a1a1a" : "#f0ece2",
                  border: done ? "none" : "1.5px solid #e4ddd0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, color: done ? "#fff" : "#888"
                }}>
                  {done ? <Check size={14} strokeWidth={3} color="#c9a84c" /> : <Icon size={14} />}
                </div>
                {i < timeline.length - 1 && (
                  <div style={{ width: 1, height: 20, background: done ? "#1a1a1a" : "#e4ddd0", margin: "3px 0" }} />
                )}
              </div>
              {/* Right column: text */}
              <div style={{ paddingBottom: i < timeline.length - 1 ? 14 : 0 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: done ? "#b8872c" : "#111", marginBottom: 3 }}>
                  {title}
                  {done && <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 800, color: "#b8872c", background: "#fef8ee", border: "1px solid #f0dcaa", borderRadius: 4, padding: "1px 7px", verticalAlign: "middle" }}>DONE</span>}
                </p>
                <p style={{ fontSize: 11, color: "#aaa", lineHeight: 1.6 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* What you get box */}
        <div style={{ background: "#faf8f3", border: "1px solid #e8e3d9", borderRadius: 12, padding: "14px 16px", textAlign: "left", marginBottom: 14 }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: "#555", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
            <TrendingUp size={14} /> What&apos;s included on your {plan === "growth" ? "Growth" : "Starter"} trial
          </p>
          <div style={{ fontSize: 11, color: "#777", lineHeight: 2 }}>
            {(plan === "growth" ? [
              "6 products · 4 competitors each",
              "First alert is sent when a competitor crosses your threshold",
              "Weekly report with ₹ rupee impact (lost revenue + margin opportunity)",
              "30-day price history + trend",
              "Monthly intelligence summary",
            ] : [
              "3 products · 3 competitors each · 2× daily checks",
              "Instant alert when a competitor crosses your threshold",
              "Weekly report every Monday with competitor snapshot",
              "Two clear options per alert",
            ]).map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#c9a84c", fontWeight: 900, flexShrink: 0 }}><Check size={14} strokeWidth={3} /></span>{f}
              </div>
            ))}
          </div>
        </div>

        {/* Email badge */}
        <div style={{ background: "#fef8ee", border: "1px solid #f0dcaa", borderRadius: 11, padding: "13px 16px", textAlign: "left", marginBottom: 22 }}>
          <p style={{ fontSize: 10, color: "#bbb", marginBottom: 3, display: "flex", alignItems: "center", gap: 4 }}><Mail size={12} /> All alerts + reports go to</p>
          <p style={{ fontWeight: 800, color: "#b8872c", fontSize: 14 }}>{email}</p>
          <p style={{ fontSize: 10, color: "#ccc", marginTop: 3 }}>No app. No dashboard. Just your inbox.</p>
        </div>

        <Link href="/" style={{ display: "block", width: "100%", padding: "14px", background: "#1a1a1a", color: "#fff", borderRadius: 12, fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 800, textDecoration: "none", textAlign: "center" }}>
          Back to Home →
        </Link>
      </div>
    </div>
  );
}

/* ─── Main form ─────────────────────────────────────── */
function TrialForm() {
  const params = useSearchParams();
  const [plan, setPlan] = useState<Plan>((params.get("plan") as Plan) || "growth");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", brand: "", orders: "" });
  const [products, setProducts] = useState<Product[]>([
    { url: "", group: "", threshold: "5", competitors: [{ url: "" }] }
  ]);

  const maxP = MAX_P[plan];
  const maxC = MAX_C[plan];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!form.email.trim() || !form.brand.trim() || !form.orders.trim()) {
      setError("Please fill in Brand Name, Email, and Average Weekly Orders."); return;
    }
    for (const [i, p] of products.entries()) {
      if (!p.url.trim()) { setError(`Product ${i + 1}: product URL is required.`); return; }
      const t = parseInt(p.threshold);
      if (!p.threshold || isNaN(t) || t < 1 || t > 50) {
        setError(`Product ${i + 1}: enter a valid threshold between 1 and 50.`); return;
      }
    }

    setLoading(true); setError("");

    const payload = {
      email: form.email.trim(),
      brand_name: form.brand.trim(),
      plan,
      avg_weekly_orders: parseInt(form.orders),
      // Products go through /trial/start → saved in same clients.db
      products: products.map(p => ({
        url: p.url.trim(),
        group: p.group.trim(),
        competitors: p.competitors.map(c => c.url.trim()).filter(Boolean),
      })),
    };

    try {
      const res = await fetch(`${BACKEND}/trial/start`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        const msg = typeof data.detail === "string"
          ? data.detail
          : Array.isArray(data.detail)
            ? data.detail.map((d: { msg?: string }) => d.msg || JSON.stringify(d)).join(" | ")
            : JSON.stringify(data);
        setError(msg);
      }
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) return <SuccessScreen email={form.email} plan={plan} productCount={products.length} />;

  return (
    <>
      <style>{CSS}</style>
      <main style={{ fontFamily: "'Sora',sans-serif", background: "#faf8f3", minHeight: "100vh" }}>
        <Navbar />

        <div style={{ maxWidth: 600, margin: "0 auto", padding: "48px clamp(18px,4vw,32px) 80px" }}>

          {/* Header */}
          <div className="ha h1" style={{ textAlign: "center", marginBottom: 32 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 16px", borderRadius: 100, background: "#fef8ee", border: "1px solid #f0dcaa", fontSize: 11, fontWeight: 700, color: "#b8872c", marginBottom: 14 }}>
              <Gift size={14} /> 10-day free trial · No credit card
            </span>
            <h1 style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 900, letterSpacing: -1.5, marginBottom: 10, color: "#111", lineHeight: 1.1 }}>
              Start your free trial
            </h1>
            <p style={{ color: "#757474", fontSize: 14, lineHeight: 1.75, maxWidth: 420, margin: "0 auto" }}>
              Add your products and competitors now. We run the first scrape within 24 hours and alerts fire automatically from day 1.
            </p>
          </div>

          <ConsentGuard formId="trial-form">
          <form id="trial-form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Plan */}
            <div className="card ha h2">
              <span className="slabel">Choose Your Plan</span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <PlanBtn plan="starter" selected={plan === "starter"} onSelect={() => setPlan("starter")} />
                <PlanBtn plan="growth" selected={plan === "growth"} onSelect={() => setPlan("growth")} />
              </div>
            </div>

            {/* Details */}
            <div className="card ha h2">
              <span className="slabel">Your Details</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "Brand Name *", key: "brand", type: "text", ph: "YourBrand", req: true },
                  { label: "Email *", key: "email", type: "email", ph: "ceo@yourbrand.com", req: true },
                  { label: "Avg Weekly Orders *", key: "orders", type: "number", ph: "e.g. 150", req: true },
                ].map(({ label, key, type, ph, req }) => (
                  <div key={key}>
                    <label style={{ display: "block", fontSize: 11, color: "#757474", fontWeight: 700, marginBottom: 5 }}>
                      {label}
                      {key === "orders" && <InfoBubble text="Average orders per week. Used to calculate ₹ rupee impact, revenue at risk, and margin opportunities in reports. Affects all calculations." />}
                    </label>
                    <input type={type} required={req} placeholder={ph} className="fi"
                      value={form[key as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
                  </div>
                ))}
                {form.orders && (
                  <p style={{ fontSize: 11, color: "#b86857", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                  <Lightbulb size={14} /> Accuracy matters: Wrong weekly order counts will lead to incorrect rupee recommendations and monthly insights. Please provide accurate data.
                </p>
                )}
              </div>
            </div>

            {/* Threshold explainer */}
            <div style={{ background: "#fef8ee", border: "1px solid #f0dcaa", borderRadius: 12, padding: "16px 18px" }}>
              <p style={{ fontSize: 11, fontWeight: 800, color: "#b8872c", marginBottom: 6, display: "flex", alignItems: "center", gap: 7 }}>
                <Ruler size={16} /> What is Alert Threshold %?
              </p>
              <p style={{ fontSize: 12, color: "#5a4520", lineHeight: 1.7 }}>
                The <strong>minimum % price change</strong> that triggers an alert. Set to <strong>5</strong> → only notified when a competitor moves ≥5%. Prevents noise from tiny rounding changes.
              </p>
              <p style={{ fontSize: 11, color: "#b8872c", marginTop: 6, fontWeight: 700 }}>
                Recommended: 3–7% for most categories. Lower = more sensitive.
              </p>
            </div>

            {/* Avg Weekly Orders explainer */}
            <AvgWeeklyOrdersExplainer />

            

            {/* Products */}
            <div className="card ha h3">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span className="slabel" style={{ marginBottom: 0 }}>
                  Products &amp; Competitors
                  <span style={{ color: "#ddd", fontWeight: 400, marginLeft: 6 }}>({products.length}/{maxP})</span>
                </span>
                {products.length < maxP && (
                  <button type="button"
                    onClick={() => setProducts(p => [...p, { url: "", group: "", threshold: "5", competitors: [{ url: "" }] }])}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#b8872c", fontWeight: 800, fontFamily: "inherit" }}>
                    + Add Product
                  </button>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {products.map((p, i) => (
                  <ProductBlock key={i} index={i} product={p} maxC={maxC}
                    onRemove={() => setProducts(prev => prev.filter((_, xi) => xi !== i))}
                    onChange={np => setProducts(prev => prev.map((x, xi) => xi === i ? np : x))} />
                ))}
              </div>
            </div>


            {error && (
              <div style={{ padding: "11px 15px", background: "#fff0f0", border: "1px solid #ffc0c0", borderRadius: 10, color: "#c0392b", fontSize: 13 }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? <><span className="spinner" />Starting trial...</> : "START FREE TRIAL →"}
            </button>
          </form>
          </ConsentGuard>
        </div>
        <Footer />
      </main>
    </>
  );
}

export default function TrialPage() {
  return <Suspense><TrialForm /></Suspense>;
}