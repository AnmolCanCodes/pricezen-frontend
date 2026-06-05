"use client";
import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Gift, Ruler, BarChart3, CheckCircle2, Search, Zap, Mail, TrendingUp, Send, Bell, PartyPopper, Check, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsentGuard from "@/components/ConsentGuard";

type Plan = "starter" | "growth";
interface Competitor { url: string }
interface Product { url: string; group: string; threshold: string; avg_weekly_orders: string; competitors: Competitor[] }

const MAX_P: Record<Plan, number> = { starter: 3, growth: 6 };
const MAX_C: Record<Plan, number> = { starter: 3, growth: 4 };
const BACKEND = (process.env.NEXT_PUBLIC_API_URL || "");

const emptyProduct = (): Product => ({
  url: "", group: "", threshold: "5", avg_weekly_orders: "", competitors: [{ url: "" }],
});

/* CSS (page-specific only) */
const CSS = `
@keyframes pulseOut{0%{transform:scale(1);opacity:0.6}100%{transform:scale(2.2);opacity:0}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes floatBubbleLeft{0%,100%{transform:translateY(-50%) translateX(0)}50%{transform:translateY(-52%) translateX(5px)}}
@keyframes floatBubbleRight{0%,100%{transform:translateY(-50%) translateX(0)}50%{transform:translateY(-52%) translateX(-5px)}}
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
.plan-btn{
  border-radius:16px;padding:18px;cursor:pointer;
  text-align:left;width:100%;position:relative;
  transition:border-color 0.18s,box-shadow 0.18s,background 0.18s;
  font-family:'Sora',sans-serif;
}
.plan-btn:focus{outline:none;}
.fi{
  width:100%;padding:11px 13px;
  border:1px solid #e4ddd0;border-radius:9px;
  background:#fff;font-family:'Sora',sans-serif;
  font-size:13px;color:#1a1a1a;outline:none;
  transition:border-color 0.18s,box-shadow 0.18s;
}
.fi:focus{border-color:#c9a84c;box-shadow:0 0 0 3px rgba(201,168,76,0.13);}
.fi::placeholder{color:#ccc;}
.card{background:#fff;border:1px solid #e8e3d9;border-radius:18px;padding:24px;}
.slabel{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#aaa;margin-bottom:14px;display:block;}
.btn-submit{
  width:100%;padding:15px;background:#1a1a1a;color:#fff;
  border:none;border-radius:12px;font-family:'Sora',sans-serif;
  font-size:14px;font-weight:900;cursor:pointer;
  transition:background 0.18s;letter-spacing:0.4px;
}
.btn-submit:disabled{background:#999;cursor:not-allowed;}
a{color:inherit;text-decoration:none;}
`;

/* Info bubble */
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

/* Plan button */
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
      <p style={{ fontSize: 22, fontWeight: 900, letterSpacing: -0.8, marginBottom: 4, color: "#111" }}>
        {isG ? "Rs.2,499" : "Rs.999"}
        <span style={{ fontSize: 11, fontWeight: 500, color: "#d4a9a9" }}>/mo</span>
      </p>
      <div style={{ fontSize: 11, color: "#666", lineHeight: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Check size={12} strokeWidth={3} /> {isG ? "6 products · 4 competitors" : "3 products · 3 competitors"}</div>
        <div style={{ color: isG ? "#b8872c" : "#666", fontWeight: isG ? 700 : 400, display: "flex", alignItems: "center", gap: 6 }}>
          <Check size={12} strokeWidth={3} /> {isG ? "Regular price checks throughout the day" : "Price checks every 4 hours (6x/day)"}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Check size={12} strokeWidth={3} /> Instant alert when competitor crosses threshold</div>
        {isG ? (
          <>
            <div style={{ color: "#b8872c", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}><Check size={12} strokeWidth={3} /> Estimated lost revenue this week</div>
            <div style={{ color: "#b8872c", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}><Check size={12} strokeWidth={3} /> Estimated profit gain opportunity</div>
            <div style={{ color: "#b8872c", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}><Check size={12} strokeWidth={3} /> One clear weekly action with rupee impact</div>
            <div style={{ color: "#b8872c", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}><Check size={12} strokeWidth={3} /> 30-day price history with trend</div>
            <div style={{ color: "#b8872c", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}><Check size={12} strokeWidth={3} /> Monthly intelligence summary</div>
          </>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Check size={12} strokeWidth={3} /> Competitor snapshot in every alert</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Check size={12} strokeWidth={3} /> Basic business analysis</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Check size={12} strokeWidth={3} /> Weekly Monday report with 7-day summary</div>
          </>
        )}
      </div>
      {selected && (
        <span style={{ position: "absolute", top: 14, right: 14, width: 20, height: 20, borderRadius: "50%", background: isG ? "#c9a84c" : "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="9" height="7" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 3.5 3.5 6 8 1" /></svg>
        </span>
      )}
    </button>
  );
}

/* FloatingInfoBubble — no inline style tag, keyframes are in CSS const above */
function FloatingInfoBubble({ side, title, icon: Icon, content }: {
  side: "left" | "right"; title: string; icon: React.ElementType; content: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const productsSection = document.getElementById("products-section");
    if (!productsSection) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(productsSection);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{
      position: "fixed",
      [side]: "20px",
      top: "50%",
      transform: isVisible ? "translateY(-50%)" : "translateY(-40%)",
      opacity: isVisible ? 1 : 0,
      transition: "opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
      zIndex: 1000,
      pointerEvents: "none",
      animation: isVisible
        ? `${side === "left" ? "floatBubbleLeft" : "floatBubbleRight"} 3s ease-in-out infinite`
        : "none",
    }}>
      <div style={{
        background: side === "left" ? "#fef8ee" : "#fef3f0",
        border: side === "left" ? "1px solid #f0dcaa" : "1px solid #f0d5cc",
        borderRadius: 12, padding: "16px 18px", maxWidth: 260,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      }}>
        <p style={{ fontSize: 12, fontWeight: 800, color: side === "left" ? "#b8872c" : "#b86857", marginBottom: 6, display: "flex", alignItems: "center", gap: 7 }}>
          <Icon size={16} /> {title}
        </p>
        <p style={{ fontSize: 11, color: side === "left" ? "#5a4520" : "#5a3a35", lineHeight: 1.7 }}>
          {content}
        </p>
      </div>
    </div>
  );
}

/* Product block */
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
              <InfoBubble text="Minimum % price change that triggers an alert. 5 means alert only when a competitor moves by 5% or more. Recommended: 3 to 7%." />
            </label>
            <input type="number" required min={1} max={50} placeholder="5"
              value={product.threshold}
              onChange={e => onChange({ ...product, threshold: e.target.value })}
              className="fi" style={{ background: "#fff" }} />
          </div>
        </div>
        <div>
          <label style={{ display: "flex", alignItems: "center", fontSize: 11, color: "#757474", fontWeight: 700, marginBottom: 5 }}>
            Avg Weekly Orders
            <InfoBubble text="How many orders does this product receive per week on average? Used to calculate rupee impact. Leave blank if unsure, we will use your account-level figure." />
          </label>
          <input type="number" min={1} placeholder="e.g. 150"
            value={product.avg_weekly_orders}
            onChange={e => onChange({ ...product, avg_weekly_orders: e.target.value })}
            className="fi" />
          <span style={{ fontSize: 10, color: "#bbb", marginTop: 4, display: "block" }}>Leave blank to use your account-level average.</span>
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

/* Success screen */
function SuccessScreen({ email, plan, productCount }: { email: string; plan: Plan; productCount: number }) {
  const alertStep = plan === "growth"
    ? "First alert is sent when a competitor changes price according to your threshold"
    : "If any competitor price crosses your threshold, you'll get an email the next morning at 10am";

  const timeline = [
    { icon: CheckCircle2, title: "Products saved", desc: `${productCount} product${productCount > 1 ? "s" : ""} + competitors submitted. Your monitoring config is ready.`, done: true },
    { icon: Search, title: "Within 24 hours — first scrape", desc: "We run the first price check. Current prices are recorded as your baseline. Monitoring begins.", done: false },
    { icon: plan === "growth" ? Zap : Mail, title: plan === "growth" ? "Instant alerts active" : "Morning alerts active", desc: alertStep + ". Every alert shows the exact change + your market position.", done: false },
    { icon: BarChart3, title: "Every Monday 10am — weekly report", desc: plan === "growth" ? "Weekly business performance report with rupee revenue at risk and margin opportunities." : "Weekly price summary with competitor positions and two clear options.", done: false },
    { icon: Send, title: "Day 8 — payment reminder", desc: "We send you a payment link 2 days before the trial ends. No pressure, no auto-charge.", done: false },
    { icon: Bell, title: "Day 10 — trial ends", desc: "If you pay, monitoring continues uninterrupted. If not, it stops. Nothing is charged automatically.", done: false },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#faf8f3", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Sora',sans-serif" }}>
      <div style={{ maxWidth: 500, width: "100%", textAlign: "center" }}>
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
          Your products and competitors are saved. Here is exactly what happens next.
        </p>
        <div style={{ background: "#fff", border: "1px solid #e8e3d9", borderRadius: 16, padding: 22, textAlign: "left", marginBottom: 14 }}>
          <span className="slabel" style={{ marginBottom: 18 }}>What happens next</span>
          {timeline.map(({ icon: Icon, title, desc, done }, i) => (
            <div key={i} style={{ display: "flex", gap: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 2 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: done ? "#1a1a1a" : "#f0ece2", border: done ? "none" : "1.5px solid #e4ddd0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: done ? "#fff" : "#888" }}>
                  {done ? <Check size={14} strokeWidth={3} color="#c9a84c" /> : <Icon size={14} />}
                </div>
                {i < timeline.length - 1 && (
                  <div style={{ width: 1, height: 20, background: done ? "#1a1a1a" : "#e4ddd0", margin: "3px 0" }} />
                )}
              </div>
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
        <div style={{ background: "#faf8f3", border: "1px solid #e8e3d9", borderRadius: 12, padding: "14px 16px", textAlign: "left", marginBottom: 14 }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: "#555", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
            <TrendingUp size={14} /> What is included on your {plan === "growth" ? "Growth" : "Starter"} trial
          </p>
          <div style={{ fontSize: 11, color: "#777", lineHeight: 2 }}>
            {(plan === "growth" ? [
              "6 products · 4 competitors each",
              "Regular price checks throughout the day",
              "Instant alerts when competitor changes cross thresholds",
              "Estimated lost revenue this week (per product group)",
              "Estimated profit gain opportunity this week (per product group)",
              "One clear weekly action with rupee impact",
              "30-day price history with trend",
              "Monthly intelligence summary",
              "Business impact analysis (loss/gain/stable cards)",
            ] : [
              "3 products · 3 competitors each",
              "Price checks every 4 hours (6x/day)",
              "Instant alert when competitor crosses threshold",
              "Competitor snapshot in every alert",
              "Basic business analysis (overpriced/underpriced/competitive)",
              "Weekly Monday report with 7-day price summary",
            ]).map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#c9a84c", fontWeight: 900, flexShrink: 0 }}><Check size={14} strokeWidth={3} /></span>{f}
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "#fef8ee", border: "1px solid #f0dcaa", borderRadius: 11, padding: "13px 16px", textAlign: "left", marginBottom: 22 }}>
          <p style={{ fontSize: 10, color: "#bbb", marginBottom: 3, display: "flex", alignItems: "center", gap: 4 }}><Mail size={12} /> All alerts + reports go to</p>
          <p style={{ fontWeight: 800, color: "#b8872c", fontSize: 14 }}>{email}</p>
          <p style={{ fontSize: 10, color: "#ccc", marginTop: 3 }}>No app. No dashboard. Just your inbox.</p>
        </div>
        <Link href="/" style={{ display: "block", width: "100%", padding: "14px", background: "#1a1a1a", color: "#fff", borderRadius: 12, fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 800, textDecoration: "none", textAlign: "center" }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

/* Main form */
function TrialForm() {
  const params = useSearchParams();
  const [plan, setPlan] = useState<Plan>((params.get("plan") as Plan) || "growth");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", brand: "" });
  const [products, setProducts] = useState<Product[]>([emptyProduct()]);

  const maxP = MAX_P[plan];
  const maxC = MAX_C[plan];

  /* KEY FIX: trim product list when switching to a plan with a lower limit */
  const handlePlanChange = (newPlan: Plan) => {
    setPlan(newPlan);
    const limit = MAX_P[newPlan];
    setProducts(prev => prev.length > limit ? prev.slice(0, limit) : prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email.trim() || !form.brand.trim()) {
      setError("Please fill in Brand Name and Email."); return;
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
      products: products.map(p => ({
        url: p.url.trim(),
        group: p.group.trim(),
        threshold_pct: parseInt(p.threshold),
        avg_weekly_orders: p.avg_weekly_orders !== "" ? parseInt(p.avg_weekly_orders, 10) : null,
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

        {/* Floating bubbles outside the form, inside main */}
        <FloatingInfoBubble
          side="left"
          title="What is Alert Threshold %?"
          icon={Ruler}
          content="The minimum % price change that triggers an alert. Set to 5 and you are only notified when a competitor moves by 5% or more. Prevents noise from tiny rounding changes. Recommended: 3 to 7%."
        />
        <FloatingInfoBubble
          side="right"
          title="Why We Need Avg Weekly Orders"
          icon={BarChart3}
          content="Your average weekly sales volume is used to calculate accurate rupee impact estimates, revenue at risk recommendations, and margin opportunity insights in our system."
        />

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
                  <PlanBtn plan="starter" selected={plan === "starter"} onSelect={() => handlePlanChange("starter")} />
                  <PlanBtn plan="growth"  selected={plan === "growth"}  onSelect={() => handlePlanChange("growth")} />
                </div>
              </div>

              {/* Details */}
              <div className="card ha h2">
                <span className="slabel">Your Details</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {([
                    { label: "Brand Name *", key: "brand" as const, type: "text" as const, ph: "YourBrand", req: true },
                    { label: "Email *", key: "email" as const, type: "email" as const, ph: "ceo@yourbrand.com", req: true },
                  ]).map(({ label, key, type, ph, req }) => (
                    <div key={key}>
                      <label style={{ display: "block", fontSize: 11, color: "#757474", fontWeight: 700, marginBottom: 5 }}>{label}</label>
                      <input type={type} required={req} placeholder={ph} className="fi"
                        value={form[key]}
                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Products */}
              <div className="card ha h3" id="products-section">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span className="slabel" style={{ marginBottom: 0 }}>
                    Products &amp; Competitors
                    <span style={{ color: "#ddd", fontWeight: 400, marginLeft: 6 }}>({products.length}/{maxP})</span>
                  </span>
                  {products.length < maxP && (
                    <button type="button"
                      onClick={() => setProducts(p => [...p, emptyProduct()])}
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
                {loading ? <><span className="spinner" />Starting trial...</> : "START FREE TRIAL"}
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