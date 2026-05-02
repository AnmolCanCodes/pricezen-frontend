"use client";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer"

type Plan = "starter" | "growth";
interface Competitor { url: string }
interface Product { url: string; group: string; threshold: string; competitors: Competitor[] }

const MAX_P: Record<Plan, number> = { starter: 5, growth: 10 };
const MAX_C: Record<Plan, number> = { starter: 3, growth: 4 };

/* ─── Tooltip info bubble ──────────────────────────── */
function InfoBubble({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position:"relative", display:"inline-flex", alignItems:"center", marginLeft:6 }}>
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        style={{ width:17, height:17, borderRadius:"50%", border:"1.5px solid #ccc", background:"#f4f1ea", color:"#999", fontSize:10, fontWeight:800, cursor:"pointer", display:"inline-flex", alignItems:"center", justifyContent:"center", padding:0, lineHeight:1, flexShrink:0 }}
        aria-label="What is this?"
      >i</button>
      {open && (
        <span style={{ position:"absolute", bottom:"calc(100% + 8px)", left:"50%", transform:"translateX(-50%)", background:"#1a1a1a", color:"#fff", fontSize:11, lineHeight:1.6, padding:"10px 13px", borderRadius:10, width:230, zIndex:200, boxShadow:"0 8px 28px rgba(0,0,0,0.2)", display:"block", pointerEvents:"none" }}>
          {text}
          <span style={{ position:"absolute", bottom:-5, left:"50%", transform:"translateX(-50%) rotate(45deg)", width:10, height:10, background:"#1a1a1a", borderRadius:2 }} />
        </span>
      )}
    </span>
  );
}

/* ─── Plan option button ──────────────────────────── */
function PlanOption({ plan, selected, onSelect }: { plan: Plan; selected: boolean; onSelect: () => void }) {
  const isG = plan === "growth";
  return (
    <button
      type="button"
      onClick={onSelect}
      style={{
        border: selected ? `2px solid ${isG ? "#c9a84c" : "#1a1a1a"}` : "2px solid #e8e3d9",
        borderRadius:16, padding:18, cursor:"pointer",
        background: selected ? (isG ? "#fffdf5" : "#faf8f3") : "#fff",
        boxShadow: selected && isG ? "0 4px 20px rgba(201,168,76,0.14)" : "none",
        textAlign:"left", width:"100%", position:"relative",
        transition:"border-color 0.18s, box-shadow 0.18s",
        fontFamily:"inherit",
      }}
    >
      {isG && (
        <span style={{ position:"absolute", top:-10, right:14, background:"#c9a84c", color:"#fff", fontSize:9, fontWeight:900, padding:"3px 11px", borderRadius:50, textTransform:"uppercase", letterSpacing:0.8 }}>Popular</span>
      )}
      <p style={{ fontSize:10, fontWeight:800, textTransform:"uppercase", letterSpacing:1.5, color:isG?"#b8872c":"#757474", marginBottom:5 }}>{isG?"Growth":"Starter"}</p>
      <p style={{ fontSize:24, fontWeight:900, letterSpacing:-1, marginBottom:1, color:"#111" }}>
        {isG?"₹2,999":"₹1,499"}<span style={{ fontSize:11, fontWeight:500, color:"#d4a9a9" }}>/mo</span>
      </p>
      <div style={{ fontSize:11, color:"#666", lineHeight:1.9 }}>
        <div>✓ {isG?"10 products · 4 competitors":"5 products · 3 competitors"}</div>
        <div style={{ color:isG?"#b8872c":"#666", fontWeight:isG?700:400 }}>✓ {isG?"Instant alert on threshold breach":"Alert next morning 10am"}</div>
        <div>✓ Weekly Monday report</div>
        {isG && <>
          <div style={{ color:"#b8872c", fontWeight:700 }}>✓ Rupee ₹ impact estimates</div>
          <div style={{ color:"#b8872c", fontWeight:700 }}>✓ 30-day trend + monthly report</div>
        </>}
      </div>
      {selected && (
        <span style={{ position:"absolute", top:14, right:14, width:20, height:20, borderRadius:"50%", background:isG?"#c9a84c":"#1a1a1a", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg width="9" height="7" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 3.5 3.5 6 8 1"/></svg>
        </span>
      )}
    </button>
  );
}

/* ─── Product block ───────────────────────────────── */
function ProductBlock({ index, product, maxC, onRemove, onChange }: {
  index: number; product: Product; maxC: number;
  onRemove: () => void; onChange: (p: Product) => void;
}) {
  return (
    <div style={{ border:"1px solid #ece7dd", borderRadius:13, padding:18, background:"#faf8f3" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
          <div style={{ width:26, height:26, borderRadius:7, background:"#1a1a1a", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:11, flexShrink:0 }}>{index + 1}</div>
          <span style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:1, color:"#aaa" }}>Product {index + 1}</span>
        </div>
        {index > 0 && (
          <button type="button" onClick={onRemove} style={{ background:"none", border:"none", cursor:"pointer", fontSize:11, color:"#ccc", fontWeight:700, fontFamily:"inherit" }}>✕ Remove</button>
        )}
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
        <div>
          <label style={{ display:"block", fontSize:11, color:"#757474", fontWeight:700, marginBottom:5 }}>Your Product URL *</label>
          <input type="url" required placeholder="https://yourstore.com/product-slug" value={product.url} onChange={e => onChange({ ...product, url:e.target.value })} style={inputStyle} />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          <div>
            <label style={{ display:"block", fontSize:11, color:"#757474", fontWeight:700, marginBottom:5 }}>Category / Group</label>
            <input type="text" placeholder="e.g. sunscreen, serum" value={product.group} onChange={e => onChange({ ...product, group:e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={{ display:"flex", alignItems:"center", fontSize:11, color:"#757474", fontWeight:700, marginBottom:5 }}>
              Alert Threshold % *
              <InfoBubble text="The minimum price change that triggers an alert. E.g. 5 means 'alert me only when a competitor's price changes by 5% or more'. Prevents noise from tiny fluctuations." />
            </label>
            <input
              type="number" required min={1} max={50} placeholder="e.g. 5"
              value={product.threshold}
              onChange={e => onChange({ ...product, threshold:e.target.value })}
              style={{ ...inputStyle, background:"#fff" }}
            />
          </div>
        </div>
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:7 }}>
            <label style={{ fontSize:11, color:"#757474", fontWeight:700 }}>Competitor URLs <span style={{ color:"#ccc", fontWeight:500 }}>(up to {maxC})</span></label>
            {product.competitors.length < maxC && (
              <button type="button" onClick={() => onChange({ ...product, competitors:[...product.competitors, { url:"" }] })}
                style={{ background:"none", border:"none", cursor:"pointer", fontSize:11, color:"#b8872c", fontWeight:800, fontFamily:"inherit" }}>+ Add</button>
            )}
          </div>
          {product.competitors.map((c, ci) => (
            <div key={ci} style={{ display:"flex", gap:7, marginBottom:7, alignItems:"center" }}>
              <input type="url" placeholder="https://competitor.com/product" value={c.url}
                onChange={e => { const comps=[...product.competitors]; comps[ci]={ url:e.target.value }; onChange({ ...product, competitors:comps }); }}
                style={inputStyle} />
              {product.competitors.length > 1 && (
                <button type="button" onClick={() => onChange({ ...product, competitors:product.competitors.filter((_,i)=>i!==ci) })}
                  style={{ background:"none", border:"none", cursor:"pointer", color:"#ddd", fontSize:13, width:28, flexShrink:0, fontFamily:"inherit" }}>✕</button>
              )}
            </div>
          ))}
          {product.competitors.length === 0 && <p style={{ fontSize:11, color:"#ccc" }}>Add at least one competitor URL.</p>}
        </div>
      </div>
    </div>
  );
}

/* ─── Shared input style ──────────────────────────── */
const inputStyle: React.CSSProperties = {
  width:"100%", padding:"11px 13px",
  border:"1px solid #e4ddd0", borderRadius:9,
  background:"#fff", fontFamily:"'Sora', sans-serif",
  fontSize:13, color:"#1a1a1a", outline:"none",
};



/* ─── Threshold explainer block ──────────────────── */
function ThresholdExplainer() {
  return (
    <div style={{ background:"#fef8ee", border:"1px solid #f0dcaa", borderRadius:12, padding:"16px 18px", marginBottom:14 }}>
      <p style={{ fontSize:12, fontWeight:800, color:"#b8872c", marginBottom:6, display:"flex", alignItems:"center", gap:7 }}>
        <span style={{ fontSize:16 }}>📐</span> What is Alert Threshold %?
      </p>
      <p style={{ fontSize:12, color:"#5a4520", lineHeight:1.7 }}>
        The threshold is the <strong>minimum % price change</strong> that triggers an alert. If you set it to <strong>5%</strong>, you&apos;ll only be notified when a competitor&apos;s price moves by 5% or more — so small rounding changes don&apos;t flood your inbox.
      </p>
      <p style={{ fontSize:11, color:"#b8872c", marginTop:8, fontWeight:700 }}>
        Recommended: 3–7% for most categories. Lower = more sensitive. Higher = only big moves.
      </p>
    </div>
  );
}

/* ─── Avg Weekly Orders explainer block ────────────── */
function AvgWeeklyOrdersExplainer() {
  return (
    <div style={{ background:"#fef3f0", border:"1px solid #f0d5cc", borderRadius:12, padding:"16px 18px", marginBottom:14 }}>
      <p style={{ fontSize:12, fontWeight:800, color:"#b86857", marginBottom:6, display:"flex", alignItems:"center", gap:7 }}>
        <span style={{ fontSize:16 }}>📊</span> Why We Need Your Avg Weekly Orders
      </p>
      <p style={{ fontSize:12, color:"#5a3a35", lineHeight:1.7 }}>
        Your average weekly sales volume is used to calculate <strong>accurate rupee (₹) impact estimates</strong>, <strong>revenue at risk recommendations</strong>, and <strong>margin opportunity insights</strong> in our System. Without fair numbers, these calculations will be misleading.
      </p>
    </div>
  );
}

/* ─── Main form ────────────────────────────────────── */
function AuditForm() {
  const params = useSearchParams();
  const router = useRouter();
  const [plan, setPlan] = useState<Plan>((params.get("plan") as Plan) || "starter");
  const [products, setProducts] = useState<Product[]>([{ url:"", group:"", threshold:"5", competitors:[{ url:"" }] }]);
  const [form, setForm] = useState({ email:"", brand:"", whatsapp:"", orders:"", notes:"" });
  const [loading, setLoading] = useState(false);

  const maxP = MAX_P[plan];
  const maxC = MAX_C[plan];

  const formatApiError = (error: any): string => {
    if (!error) return "Something went wrong.";
    if (typeof error === "string") return error;
    if (Array.isArray(error)) return error.map(formatApiError).join(" | ");
    if (typeof error === "object") {
      if (error.detail !== undefined) return formatApiError(error.detail);
      if (error.message !== undefined) return String(error.message);
      try { return JSON.stringify(error); } catch { return String(error); }
    }
    return String(error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!form.email || !form.brand || !form.orders) {
      alert("Please fill in all required fields: Email, Brand Name, and Average Weekly Orders.");
      return;
    }

    // Validate thresholds
    for (const p of products) {
      const t = parseInt(p.threshold);
      if (!p.threshold || isNaN(t) || t < 1 || t > 50) {
        alert("Please enter a valid threshold (1–50%) for all products.");
        return;
      }
    }

    for (const [index, p] of products.entries()) {
      if (!p.url.trim()) {
        alert(`Product ${index + 1} must have a valid product URL.`);
        return;
      }
    }

    setLoading(true);
    const payload = {
      email: form.email, brand_name: form.brand, whatsapp: form.whatsapp || null, plan,
      avg_weekly_orders: parseInt(form.orders),
      notes: form.notes,
      products: products.map(p => ({
        url: p.url, group: p.group,
        threshold_pct: parseInt(p.threshold),
        competitors: p.competitors.map(c => c.url).filter(Boolean),
      })),
    };
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        // Redirect to the payment page with the newly created client_id
        router.push(`/payment?client_id=${data.client_id}`);
      } else {
        const message = formatApiError(data);
        console.error("Submit response error:", data);
        alert("Error: " + message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <main style={{ fontFamily:"'Sora', sans-serif", background:"#faf8f3", minHeight:"100vh" }}>

        {/* Nav */}
        <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(250,248,243,0.9)", backdropFilter:"blur(14px)", WebkitBackdropFilter:"blur(14px)", borderBottom:"1px solid #ede8de", padding:"0 clamp(18px,4vw,40px)", height:58, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <Link href="/" style={{ fontWeight:900, fontSize:16, color:"#111" }}>Price<span style={{ color:"#b8872c" }}>Zen</span></Link>
          <Link href="/" style={{ fontSize:12, color:"#aaa", fontWeight:500 }}>← Back to home</Link>
        </nav>

        <div style={{ maxWidth:648, margin:"0 auto", padding:"48px clamp(18px,4vw,32px) 80px" }}>

          {/* Header */}
          <div className="fade-in" style={{ textAlign:"center", marginBottom:36 }}>
            <h1 style={{ fontSize:"clamp(28px,5vw,42px)", fontWeight:900, letterSpacing:-1.5, marginBottom:10, color:"#111" }}>
              Audit My Brand
            </h1>
            <p style={{ color:"#757474", fontSize:14, lineHeight:1.75, maxWidth:400, margin:"0 auto" }}>
              Fill this once. We configure everything within 24 hours.<br />
              All alerts delivered straight to your email
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:14 }}>

            {/* Plan */}
            <div className="fade-in d1" style={{ background:"#fff", border:"1px solid #e8e3d9", borderRadius:18, padding:24 }}>
              <p style={{ fontSize:10, fontWeight:800, textTransform:"uppercase", letterSpacing:2, color:"#d4a9a9", marginBottom:14 }}>Choose Your Plan</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <PlanOption plan="starter" selected={plan==="starter"} onSelect={() => setPlan("starter")} />
                <PlanOption plan="growth"  selected={plan==="growth"}  onSelect={() => setPlan("growth")} />
              </div>
            </div>

            {/* Brand details */}
            <div className="fade-in d2" style={{ background:"#fff", border:"1px solid #e8e3d9", borderRadius:18, padding:24 }}>
              <p style={{ fontSize:10, fontWeight:800, textTransform:"uppercase", letterSpacing:2, color:"#d4a9a9", marginBottom:16 }}>Your Details</p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:12 }}>
                {[
                  { label:"Email *",          key:"email",    type:"email",  ph:"ceo@yourbrand.com",  req:true  },
                  { label:"Brand Name *",      key:"brand",    type:"text",   ph:"YourBrand",          req:true  },
                  { label:"WhatsApp",          key:"whatsapp", type:"tel",    ph:"+91 9999999999",     req:false },
                  { label:"Avg Weekly Orders *", key:"orders",   type:"number", ph:"e.g. 150",           req:true },
                ].map(({ label, key, type, ph, req }) => (
                  <div key={key}>
                    <label style={{ display:"block", fontSize:11, color:"#757474", fontWeight:700, marginBottom:5 }}>
                      {label}
                      {key === "orders" && <InfoBubble text="Average orders per week. Used to calculate ₹ rupee impact, revenue at risk, and margin opportunities in reports. Affects all calculations." />}
                    </label>
                    <input type={type} placeholder={ph} required={req}
                      value={form[key as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [key]:e.target.value }))}
                      style={inputStyle} />
                  </div>
                ))}
              </div>
              {form.orders && (
                <p style={{ fontSize:11, color:"#b86857", marginTop:10, fontWeight:600 }}>
                  💡 Accuracy matters: Wrong weekly order counts will lead to incorrect rupee recommendations and monthly insights. Please provide accurate data.
                </p>
              )}
            </div>

            {/* Threshold explainer */}
            <div className="fade-in d2">
              <ThresholdExplainer />
            </div>

            {/* Avg Weekly Orders explainer */}
            <div className="fade-in d2">
              <AvgWeeklyOrdersExplainer />
            </div>

            {/* Products */}
            <div className="fade-in d3" style={{ background:"#fff", border:"1px solid #e8e3d9", borderRadius:18, padding:24 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                <p style={{ fontSize:10, fontWeight:800, textTransform:"uppercase", letterSpacing:2, color:"#d4a9a9" }}>
                  Products <span style={{ color:"#e8e3d9" }}>({products.length}/{maxP})</span>
                </p>
                {products.length < maxP && (
                  <button type="button"
                    onClick={() => setProducts(p => [...p, { url:"", group:"", threshold:"5", competitors:[{ url:"" }] }])}
                    style={{ background:"none", border:"none", cursor:"pointer", fontSize:12, color:"#b8872c", fontWeight:800, fontFamily:"inherit" }}>
                    + Add Product
                  </button>
                )}
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {products.map((p, i) => (
                  <ProductBlock key={i} index={i} product={p} maxC={maxC}
                    onRemove={() => setProducts(prev => prev.filter((_,xi) => xi!==i))}
                    onChange={np => setProducts(prev => prev.map((x,xi) => xi===i ? np : x))} />
                ))}
              </div>
            </div>

            {/* Notes */}
            <div style={{ background:"#fff", border:"1px solid #e8e3d9", borderRadius:18, padding:24 }}>
              <label style={{ display:"block", fontSize:10, fontWeight:800, textTransform:"uppercase", letterSpacing:2, color:"#d4a9a9", marginBottom:12 }}>
                Anything Else? <span style={{ color:"#ddd", textTransform:"none", fontSize:10, fontWeight:500 }}>(Optional)</span>
              </label>
              <textarea
                placeholder="Specific products to prioritise, other instructions..."
                rows={3} value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes:e.target.value }))}
                style={{ ...inputStyle, resize:"none" }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              style={{ width:"100%", padding:"15px", background:loading?"#555":"#1a1a1a", color:"#fff", border:"none", borderRadius:12, fontFamily:"'Sora', sans-serif", fontSize:14, fontWeight:900, cursor:loading?"not-allowed":"pointer", letterSpacing:0.5, transition:"background 0.18s, transform 0.14s" }}
            >
              {loading ? <><span className="spinner" />Submitting...</> : "SUBMIT & PROCEED TO PAYMENT →"}
            </button>
          </form>
        </div>
        <Footer />
      </main>
    </>
  );
}

export default function AuditPage() {
  return <Suspense><AuditForm /></Suspense>;
}