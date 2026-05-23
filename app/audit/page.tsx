"use client";
import { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Ruler, BarChart3, Check, X } from "lucide-react";
import Footer from "@/components/Footer";

type Plan = "starter" | "growth";

interface Competitor {
  url: string;
}

interface Product {
  url: string;
  group: string;
  threshold: string;
  avg_weekly_orders: string;
  competitors: Competitor[];
}

interface FormState {
  email: string;
  brand: string;
  whatsapp: string;
  notes: string;
}

const MAX_P: Record<Plan, number> = { starter: 3, growth: 6 };
const MAX_C: Record<Plan, number> = { starter: 3, growth: 4 };

const emptyProduct = (): Product => ({
  url: "",
  group: "",
  threshold: "5",
  avg_weekly_orders: "",
  competitors: [{ url: "" }],
});

/* ─── Spinner CSS (inline so it works without globals.css dependency) ── */
const spinnerStyle: React.CSSProperties = {
  display: "inline-block",
  width: 14,
  height: 14,
  border: "2px solid rgba(255,255,255,0.3)",
  borderTopColor: "#fff",
  borderRadius: "50%",
  animation: "spin 0.7s linear infinite",
  marginRight: 8,
  verticalAlign: "middle",
};

/* ─── Tooltip info bubble ──────────────────────────── */
function InfoBubble({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center", marginLeft: 6 }}>
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        style={{
          width: 17, height: 17, borderRadius: "50%",
          border: "1.5px solid #ccc", background: "#f4f1ea",
          color: "#999", fontSize: 10, fontWeight: 800,
          cursor: "pointer", display: "inline-flex",
          alignItems: "center", justifyContent: "center",
          padding: 0, lineHeight: 1, flexShrink: 0,
        }}
        aria-label="What is this?"
      >i</button>
      {open && (
        <span style={{
          position: "absolute", bottom: "calc(100% + 8px)", left: "50%",
          transform: "translateX(-50%)", background: "#1a1a1a", color: "#fff",
          fontSize: 11, lineHeight: 1.6, padding: "10px 13px", borderRadius: 10,
          width: 230, zIndex: 200, boxShadow: "0 8px 28px rgba(0,0,0,0.2)",
          display: "block", pointerEvents: "none",
        }}>
          {text}
          <span style={{
            position: "absolute", bottom: -5, left: "50%",
            transform: "translateX(-50%) rotate(45deg)",
            width: 10, height: 10, background: "#1a1a1a", borderRadius: 2,
          }} />
        </span>
      )}
    </span>
  );
}

/* ─── Plan option button ──────────────────────────── */
function PlanOption({ plan, selected, onSelect }: {
  plan: Plan; selected: boolean; onSelect: () => void;
}) {
  const isG = plan === "growth";
  return (
    <button
      type="button"
      onClick={onSelect}
      style={{
        border: selected ? `2px solid ${isG ? "#c9a84c" : "#1a1a1a"}` : "2px solid #e8e3d9",
        borderRadius: 16, padding: 18, cursor: "pointer",
        background: selected ? (isG ? "#fffdf5" : "#faf8f3") : "#fff",
        boxShadow: selected && isG ? "0 4px 20px rgba(201,168,76,0.14)" : "none",
        textAlign: "left", width: "100%", position: "relative",
        transition: "border-color 0.18s, box-shadow 0.18s",
        fontFamily: "inherit",
      }}
    >
      {isG && (
        <span style={{
          position: "absolute", top: -10, right: 14,
          background: "#c9a84c", color: "#fff", fontSize: 9, fontWeight: 900,
          padding: "3px 11px", borderRadius: 50, textTransform: "uppercase", letterSpacing: 0.8,
        }}>Popular</span>
      )}
      <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5, color: isG ? "#b8872c" : "#757474", marginBottom: 5 }}>
        {isG ? "Growth" : "Starter"}
      </p>
      <p style={{ fontSize: 24, fontWeight: 900, letterSpacing: -1, marginBottom: 1, color: "#111" }}>
        {isG ? "₹2,499" : "₹999"}
        <span style={{ fontSize: 11, fontWeight: 500, color: "#d4a9a9" }}>/mo</span>
      </p>
      <div style={{ fontSize: 11, color: "#666", lineHeight: 1.9 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Check size={12} strokeWidth={3} />
          {isG ? "6 products · 4 competitors" : "3 products · 3 competitors"}
        </div>
        <div style={{ color: isG ? "#b8872c" : "#666", fontWeight: isG ? 700 : 400, display: "flex", alignItems: "center", gap: 6 }}>
          <Check size={12} strokeWidth={3} /> Instant alert on threshold breach
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Check size={12} strokeWidth={3} /> Weekly Monday report
        </div>
        {isG && (
          <>
            <div style={{ color: "#b8872c", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
              <Check size={12} strokeWidth={3} /> ₹ Rupee impact estimates
            </div>
            <div style={{ color: "#b8872c", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
              <Check size={12} strokeWidth={3} /> 30-day trend + monthly report
            </div>
          </>
        )}
      </div>
      {selected && (
        <span style={{
          position: "absolute", top: 14, right: 14,
          width: 20, height: 20, borderRadius: "50%",
          background: isG ? "#c9a84c" : "#1a1a1a",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="9" height="7" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 3.5 3.5 6 8 1" />
          </svg>
        </span>
      )}
    </button>
  );
}

/* ─── Shared input style ──────────────────────────── */
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "11px 13px",
  border: "1px solid #e4ddd0", borderRadius: 9,
  background: "#fff", fontFamily: "'Sora', sans-serif",
  fontSize: 13, color: "#1a1a1a", outline: "none",
};

/* ─── Product block ───────────────────────────────── */
function ProductBlock({ index, product, maxC, onRemove, onChange }: {
  index: number;
  product: Product;
  maxC: number;
  onRemove: () => void;
  onChange: (p: Product) => void;
}) {
  return (
    <div style={{ border: "1px solid #ece7dd", borderRadius: 13, padding: 18, background: "#faf8f3" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{
            width: 26, height: 26, borderRadius: 7, background: "#1a1a1a", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: 11, flexShrink: 0,
          }}>{index + 1}</div>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#aaa" }}>
            Product {index + 1}
          </span>
        </div>
        {index > 0 && (
          <button
            type="button"
            onClick={onRemove}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "#ccc", fontWeight: 700, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}
          >
            <X size={12} /> Remove
          </button>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>

        {/* Product URL */}
        <div>
          <label style={{ display: "block", fontSize: 11, color: "#757474", fontWeight: 700, marginBottom: 5 }}>
            Your Product URL *
          </label>
          <input
            type="url" required
            placeholder="https://yourstore.com/product-slug"
            value={product.url}
            onChange={e => onChange({ ...product, url: e.target.value })}
            style={inputStyle}
          />
        </div>

        {/* Group + Threshold */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <label style={{ display: "block", fontSize: 11, color: "#757474", fontWeight: 700, marginBottom: 5 }}>
              Category / Group
            </label>
            <input
              type="text"
              placeholder="e.g. sunscreen, serum"
              value={product.group}
              onChange={e => onChange({ ...product, group: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ display: "flex", alignItems: "center", fontSize: 11, color: "#757474", fontWeight: 700, marginBottom: 5 }}>
              Alert Threshold % *
              <InfoBubble text="Minimum % change that triggers an alert. E.g. 5 means alert only when a competitor moves by 5% or more. Recommended: 3–7% for most categories." />
            </label>
            <input
              type="number" required min={1} max={50}
              placeholder="e.g. 5"
              value={product.threshold}
              onChange={e => onChange({ ...product, threshold: e.target.value })}
              style={{ ...inputStyle, background: "#fff" }}
            />
          </div>
        </div>

        {/* Avg Weekly Orders — per product */}
        <div>
          <label style={{ display: "flex", alignItems: "center", fontSize: 11, color: "#757474", fontWeight: 700, marginBottom: 5 }}>
            Avg Weekly Orders
            <InfoBubble text="How many orders does THIS product get per week on average? Used to calculate ₹ rupee impact estimates specific to this product. Leave blank if unsure." />
          </label>
          <input
            type="number" min={1}
            placeholder="e.g. 150"
            value={product.avg_weekly_orders}
            onChange={e => onChange({ ...product, avg_weekly_orders: e.target.value })}
            style={inputStyle}
          />
          <span style={{ fontSize: 10, color: "#bbb", marginTop: 4, display: "block" }}>
            Orders per week for this product. Used for ₹ impact calculations.
          </span>
        </div>

        {/* Competitors */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
            <label style={{ fontSize: 11, color: "#757474", fontWeight: 700 }}>
              Competitor URLs <span style={{ color: "#ccc", fontWeight: 500 }}>(up to {maxC})</span>
            </label>
            {product.competitors.length < maxC && (
              <button
                type="button"
                onClick={() => onChange({ ...product, competitors: [...product.competitors, { url: "" }] })}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "#b8872c", fontWeight: 800, fontFamily: "inherit" }}
              >+ Add</button>
            )}
          </div>
          {product.competitors.map((comp, ci) => (
            <div key={ci} style={{ display: "flex", gap: 7, marginBottom: 7, alignItems: "center" }}>
              <input
                type="url"
                placeholder="https://competitor.com/product"
                value={comp.url}
                onChange={e => {
                  const updated = [...product.competitors];
                  updated[ci] = { url: e.target.value };
                  onChange({ ...product, competitors: updated });
                }}
                style={inputStyle}
              />
              {product.competitors.length > 1 && (
                <button
                  type="button"
                  onClick={() => onChange({ ...product, competitors: product.competitors.filter((_, i) => i !== ci) })}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#ddd", fontSize: 13, width: 28, flexShrink: 0, fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
          {product.competitors.length === 0 && (
            <p style={{ fontSize: 11, color: "#ccc" }}>Add at least one competitor URL.</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Floating info bubble ─────── */
function FloatingInfoBubble({ side, title, icon: Icon, content }: {
  side: "left" | "right"; title: string; icon: React.ElementType; content: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = document.getElementById("products-section");
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const animationName = side === "left" ? "floatBubbleLeft" : "floatBubbleRight";

  return (
    <div style={{
      position: "fixed",
      [side]: "20px",
      top: "50%",
      transform: isVisible ? "translateY(-50%)" : "translateY(-40%)",
      opacity: isVisible ? 1 : 0,
      transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
      zIndex: 1000,
      pointerEvents: "none",
      animation: isVisible ? `${animationName} 3s ease-in-out infinite` : "none",
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

/* ─── Main form ────────────────────────────────────── */
function AuditForm() {
  const params = useSearchParams();
  const router = useRouter();
  const [plan, setPlan] = useState<Plan>((params.get("plan") as Plan) || "starter");
  const [products, setProducts] = useState<Product[]>([emptyProduct()]);
  const [form, setForm] = useState<FormState>({ email: "", brand: "", whatsapp: "", notes: "" });
  const [loading, setLoading] = useState(false);

  const maxP = MAX_P[plan];
  const maxC = MAX_C[plan];

  // When plan changes, trim products list if over new limit
  const handlePlanChange = (newPlan: Plan) => {
    setPlan(newPlan);
    const limit = MAX_P[newPlan];
    if (products.length > limit) {
      setProducts(prev => prev.slice(0, limit));
    }
  };

  const formatApiError = (error: unknown): string => {
    if (!error) return "Something went wrong.";
    if (typeof error === "string") return error;
    if (Array.isArray(error)) return (error as unknown[]).map(formatApiError).join(" | ");
    if (typeof error === "object") {
      const e = error as Record<string, unknown>;
      if (e.detail !== undefined) return formatApiError(e.detail);
      if (e.message !== undefined) return String(e.message);
      try { return JSON.stringify(error); } catch { return String(error); }
    }
    return String(error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.brand) {
      alert("Please fill in all required fields: Email and Brand Name.");
      return;
    }

    for (const [index, p] of products.entries()) {
      if (!p.url.trim()) {
        alert(`Product ${index + 1}: please enter a valid product URL.`);
        return;
      }
      const t = parseInt(p.threshold);
      if (!p.threshold || isNaN(t) || t < 1 || t > 50) {
        alert(`Product ${index + 1}: please enter a valid threshold between 1 and 50.`);
        return;
      }
    }

    setLoading(true);

    // Build payload — avg_weekly_orders is per-product only
    // top-level avg_weekly_orders is NOT sent (backend has Optional[int] = None fallback)
    const payload = {
      email:      form.email.trim(),
      brand_name: form.brand.trim(),
      whatsapp:   form.whatsapp.trim() || null,
      plan,
      notes:      form.notes.trim() || null,
      products: products.map(p => ({
        url:          p.url.trim(),
        group:        p.group.trim(),
        threshold_pct: parseInt(p.threshold),
        // FIX: use !== "" check so "0" doesn't accidentally become null
        avg_weekly_orders: p.avg_weekly_orders !== ""
          ? parseInt(p.avg_weekly_orders, 10)
          : null,
        competitors: p.competitors
          .map(c => c.url.trim())
          .filter(Boolean),
      })),
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        router.push(`/payment?client_id=${data.client_id}&token=${encodeURIComponent(data.token)}`);
      } else {
        alert("Error: " + formatApiError(data));
        setLoading(false);
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  };

  return (
    <main style={{ fontFamily: "'Sora', sans-serif", background: "#faf8f3", minHeight: "100vh" }}>

      {/* Nav */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(250,248,243,0.9)", backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)", borderBottom: "1px solid #ede8de",
        padding: "0 clamp(18px,4vw,40px)", height: 58,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link href="/" style={{ fontWeight: 900, fontSize: 16, color: "#111" }}>
          Price<span style={{ color: "#b8872c" }}>Zen</span>
        </Link>
        <Link href="/" style={{ fontSize: 12, color: "#aaa", fontWeight: 500 }}>← Back to home</Link>
      </nav>

      <div style={{ maxWidth: 648, margin: "0 auto", padding: "48px clamp(18px,4vw,32px) 80px" }}>

        {/* Header */}
        <div className="fade-in" style={{ textAlign: "center", marginBottom: 36 }}>
          <h1 style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 900, letterSpacing: -1.5, marginBottom: 10, color: "#111" }}>
            Audit My Brand
          </h1>
          <p style={{ color: "#757474", fontSize: 14, lineHeight: 1.75, maxWidth: 400, margin: "0 auto" }}>
            Fill this once. We configure everything within 24 hours.<br />
            All alerts delivered straight to your email
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Plan */}
          <div className="fade-in d1" style={{ background: "#fff", border: "1px solid #e8e3d9", borderRadius: 18, padding: 24 }}>
            <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#d4a9a9", marginBottom: 14 }}>
              Choose Your Plan
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <PlanOption plan="starter" selected={plan === "starter"} onSelect={() => handlePlanChange("starter")} />
              <PlanOption plan="growth"  selected={plan === "growth"}  onSelect={() => handlePlanChange("growth")} />
            </div>
          </div>

          {/* Your Details — NO avg_weekly_orders here anymore */}
          <div className="fade-in d2" style={{ background: "#fff", border: "1px solid #e8e3d9", borderRadius: 18, padding: 24 }}>
            <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#d4a9a9", marginBottom: 16 }}>
              Your Details
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 12 }}>
              {([
                { label: "Email *",     key: "email" as const,    type: "email" as const, ph: "ceo@yourbrand.com", req: true  },
                { label: "Brand Name *", key: "brand" as const,   type: "text" as const,  ph: "YourBrand",         req: true  },
                { label: "WhatsApp",     key: "whatsapp" as const, type: "tel" as const,  ph: "+91 9999999999",    req: false },
              ]).map(({ label, key, type, ph, req }) => (
                <div key={key}>
                  <label style={{ display: "block", fontSize: 11, color: "#757474", fontWeight: 700, marginBottom: 5 }}>
                    {label}
                  </label>
                  <input
                    type={type} placeholder={ph} required={req}
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Products — avg_weekly_orders is inside each ProductBlock */}
          <div
            className="fade-in d3"
            id="products-section"
            style={{ background: "#fff", border: "1px solid #e8e3d9", borderRadius: 18, padding: 24 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#d4a9a9" }}>
                Products <span style={{ color: "#e8e3d9" }}>({products.length}/{maxP})</span>
              </p>
              {products.length < maxP && (
                <button
                  type="button"
                  onClick={() => setProducts(p => [...p, emptyProduct()])}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#b8872c", fontWeight: 800, fontFamily: "inherit" }}
                >
                  + Add Product
                </button>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {products.map((p, i) => (
                <ProductBlock
                  key={i}
                  index={i}
                  product={p}
                  maxC={maxC}
                  onRemove={() => setProducts(prev => prev.filter((_, xi) => xi !== i))}
                  onChange={np => setProducts(prev => prev.map((x, xi) => xi === i ? np : x))}
                />
              ))}
            </div>
          </div>

          {/* Floating bubbles */}
          <FloatingInfoBubble
            side="left"
            title="What is Alert Threshold %?"
            icon={Ruler}
            content="The minimum % price change that triggers an alert. E.g. 5% means you're only alerted when a competitor moves by 5% or more. Recommended: 3–7% for most categories."
          />
          <FloatingInfoBubble
            side="right"
            title="Why Avg Weekly Orders?"
            icon={BarChart3}
            content="Your average weekly sales for this product lets us calculate exact ₹ rupee impact — how much revenue is at risk when you're overpriced, or how much you can gain by raising price."
          />

          {/* Notes */}
          <div style={{ background: "#fff", border: "1px solid #e8e3d9", borderRadius: 18, padding: 24 }}>
            <label style={{ display: "block", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#d4a9a9", marginBottom: 12 }}>
              Anything Else? <span style={{ color: "#ddd", textTransform: "none", fontSize: 10, fontWeight: 500 }}>(Optional)</span>
            </label>
            <textarea
              placeholder="Specific products to prioritise, other instructions..."
              rows={3}
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              style={{ ...inputStyle, resize: "none" }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "15px",
              background: loading ? "#555" : "#1a1a1a",
              color: "#fff", border: "none", borderRadius: 12,
              fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 900,
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: 0.5, transition: "background 0.18s, transform 0.14s",
            }}
          >
            {loading
              ? <><span style={spinnerStyle} />Submitting...</>
              : "SUBMIT & PROCEED TO PAYMENT →"
            }
          </button>

        </form>
      </div>
      <Footer />
    </main>
  );
}

export default function AuditPage() {
  return <Suspense><AuditForm /></Suspense>;
}