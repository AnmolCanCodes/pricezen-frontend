"use client";
import { useState } from "react";
import Link from "next/link";
import { Lightbulb, Clock, TrendingDown, AlertCircle, Package, Store, IndianRupee, Zap, Flame, Check, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Q1 = "manual" | "blind" | "late" | null;
type Q2 = "small" | "large" | null;
type Q3 = "rupee" | "fast" | null;
type Rec = "growth-strong" | "growth-lean" | "starter";

/* --- Step dot ----------------------------------------- */
function StepDot({ n, active, done }: { n: number; active: boolean; done: boolean }) {
  return (
    <div style={{
      width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
      background: done ? "#1a1a1a" : active ? "#c9a84c" : "#ece7dd",
      color: done || active ? "#fff" : "#aaa",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 900, fontSize: 13, transition: "background 0.25s",
    }}>
      {done ? <Check size={14} strokeWidth={3} /> : n}
    </div>
  );
}

/* --- Choice card -------------------------------------- */
function ChoiceCard({ icon: Icon, title, sub, badge, selected, onClick }: {
  icon: React.ElementType; title: string; sub: string; badge?: string; selected: boolean; onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} style={{
      width: "100%", fontFamily: "'Sora', sans-serif", textAlign: "left",
      border: selected ? "2px solid #1a1a1a" : "1px solid #d4cfc2",
      borderRadius: 18, padding: "20px 22px", cursor: "pointer",
      background: selected ? "#fff" : "#faf8f3",
      boxShadow: selected ? "0 6px 24px rgba(0,0,0,0.08)" : "none",
      transition: "border-color 0.18s, box-shadow 0.18s, background 0.18s",
      position: "relative",
    }}>
      {badge && (
        <span style={{
          position: "absolute", top: -10, right: 18,
          background: "#c9a84c", color: "#fff",
          fontSize: 9, fontWeight: 900, padding: "3px 10px",
          borderRadius: 50, letterSpacing: 0.8, textTransform: "uppercase",
        }}>{badge}</span>
      )}
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <span style={{ display: "flex", lineHeight: 1, marginTop: 2, color: "#b8872c" }}><Icon size={22} strokeWidth={1.5} /></span>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontWeight: 800, fontSize: 14, color: "#111", marginBottom: 4 }}>{title}</p>
          <p style={{ margin: 0, fontSize: 13, color: "#666", lineHeight: 1.6 }}>{sub}</p>
        </div>
        {selected && (
          <span style={{
            flexShrink: 0, width: 22, height: 22, borderRadius: "50%",
            background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="10" height="8" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 3.5 6.5 9 1" />
            </svg>
          </span>
        )}
      </div>
    </button>
  );
}

/* --- Recommendation ----------------------------------- */
function Recommendation({ rec, q1, q2, q3 }: { rec: Rec; q1: Q1; q2: Q2; q3: Q3 }) {
  const isGrowthStrong = rec === "growth-strong";
  const isGrowthLean   = rec === "growth-lean";
  const isStarter      = rec === "starter";
  const planName       = isStarter ? "Starter" : "Growth";
  const planPrice      = isStarter ? "₹999" : "₹2,499";

  // Pain description mapped from Q1
  const painLabel =
    q1 === "blind" ? "finding out when sales drop"
    : q1 === "late" ? "getting alerts too late"
    : "checking manually";

  // Feature bullets per plan
  const features = isStarter
    ? [
        "Instant alert the moment a competitor crosses your threshold",
        "Track up to 3 products and 3 competitors each",
        "Weekly Monday report with your current market position",
        "Straight to your inbox, nothing to log into",
      ]
    : [
        "Instant alert with exact rupee revenue impact, not just a percentage",
        `Track up to ${isGrowthStrong ? "6" : "6"} products and 4 competitors each`,
        "Weekly Monday report with gain/loss breakdown in rupees",
        "30-day price trend so you see patterns before they cost you",
        "Monthly intelligence report showing your ROI for the month",
      ];

  return (
    <div style={{
      borderRadius: 20, overflow: "hidden",
      border: `1.5px solid ${isStarter ? "#d4cfc2" : "#c9a84c"}`,
      boxShadow: "0 20px 60px rgba(0,0,0,0.09)",
      background: "#fff",
    }}>

      {/* Header band */}
      <div style={{
        background: isStarter
          ? "linear-gradient(90deg, #1a1a1a, #2e2e2e)"
          : "linear-gradient(90deg, #a84e12, #c9a84c)",
        padding: "20px 28px",
      }}>
        <p style={{ margin: "0 0 6px", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: isStarter ? "#888" : "rgba(255,255,255,0.6)" }}>
          Our recommendation for you
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <p style={{ margin: 0, fontWeight: 900, fontSize: 22, color: "#fff", letterSpacing: -0.6 }}>
            {planName} Plan
          </p>
          <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 800, fontSize: 14, padding: "5px 16px", borderRadius: 50 }}>
            {planPrice}<span style={{ fontWeight: 400, fontSize: 11, opacity: 0.7 }}>/mo</span>
          </span>
        </div>
      </div>

      <div style={{ padding: "24px 28px" }}>

        {/* Personalized insight */}
        <div style={{
          background: isStarter ? "#f7f4ee" : "#fffdf4",
          border: `1px solid ${isStarter ? "#e4ddd0" : "#f0dcaa"}`,
          borderRadius: 12, padding: "16px 18px", marginBottom: 22,
        }}>
          <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: isStarter ? "#999" : "#b8872c" }}>
            Based on your answers
          </p>
          {isGrowthStrong && (
            <p style={{ margin: 0, fontSize: 14, color: "#333", lineHeight: 1.75 }}>
              With <strong>4 to 6 products</strong> competing in the market, there are multiple
              chances every week for a competitor to quietly undercut one of them and for you
              not to know until orders slow down. Growth closes that gap completely. Every move
              triggers an instant alert with the exact rupee impact, so the decision to act or
              hold always has a number behind it.
            </p>
          )}
          {isGrowthLean && (
            <p style={{ margin: 0, fontSize: 14, color: "#333", lineHeight: 1.75 }}>
              You said you want to know the <strong>rupee impact</strong>, not just that
              something changed. That number is everything. When you see
              &ldquo;₹11,200 at risk this week&rdquo; instead of
              &ldquo;competitor dropped 6%&rdquo;, the decision makes itself. That clarity
              is exactly what Growth is built for. The gap between the plans is usually
              recovered in the first alert.
            </p>
          )}
          {isStarter && (
            <p style={{ margin: 0, fontSize: 14, color: "#333", lineHeight: 1.75 }}>
              You have a focused catalogue and you need fast, reliable alerts without extra
              complexity. That is exactly what Starter is built for. The moment a competitor
              crosses your threshold, you get an email with the change, your updated market
              position, and a clear suggested action. Every Monday, a report lands in your
              inbox. No dashboards. No logging in. Just the information you need.
            </p>
          )}
        </div>

        {/* What you get */}
        <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.2, color: "#aaa", marginBottom: 12 }}>What is included</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
          {features.map(f => (
            <div key={f} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{
                flexShrink: 0, marginTop: 1,
                width: 20, height: 20, borderRadius: "50%",
                background: isStarter ? "#1a1a1a" : "#b85c1a",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Check size={11} strokeWidth={3} color="#fff" />
              </span>
              <span style={{ fontSize: 13.5, color: "#333", lineHeight: 1.6 }}>{f}</span>
            </div>
          ))}
        </div>

        {/* Trial strip */}
        <div style={{
          background: "#fef8ee", border: "1px solid #f0dfa8",
          borderRadius: 12, padding: "14px 18px", marginBottom: 22,
          display: "flex", alignItems: "flex-start", gap: 12,
        }}>
          <span style={{ fontSize: 20, lineHeight: 1, flexShrink: 0 }}>🎁</span>
          <div>
            <p style={{ margin: "0 0 3px", fontWeight: 800, fontSize: 13, color: "#b8872c" }}>10-day free trial included</p>
            <p style={{ margin: 0, fontSize: 12, color: "#7a6030", lineHeight: 1.6 }}>
              Full {planName} access from day one. Real monitoring on your real products.
              No card required. No auto-charge when it ends.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link
            href="/trial"
            className="btn-dark"
            style={{ flex: 1, borderRadius: 12, padding: "14px 24px", fontSize: 14, fontWeight: 800, background: isStarter ? "#1a1a1a" : "#b85c1a", textAlign: "center" }}
          >
            Start {planName} Trial, Free →
          </Link>
          <Link
            href="/#plans"
            className="btn-outline"
            style={{ borderRadius: 12, padding: "14px 20px", fontSize: 13, whiteSpace: "nowrap" }}
          >
            Compare plans
          </Link>
        </div>
      </div>
    </div>
  );
}

/* --- Main page ---------------------------------------- */
export default function GettingStartedPage() {
  const [q1, setQ1] = useState<Q1>(null);
  const [q2, setQ2] = useState<Q2>(null);
  const [q3, setQ3] = useState<Q3>(null);

  const step = q1 === null ? 1 : q2 === null ? 2 : q3 === null ? 3 : 4;

  /*
    Plan logic:
    - Q1 = emotional pain hook (does not affect plan recommendation)
    - Q2 large (4-6 products)           → growth-strong
    - Q2 small (1-3) + Q3 rupee impact  → growth-lean (nudge toward Growth)
    - Q2 small (1-3) + Q3 fast alert    → starter
  */
  const rec: Rec | null = q1 && q2 && q3
    ? q2 === "large" ? "growth-strong"
      : q3 === "rupee" ? "growth-lean"
        : "starter"
    : null;

  const resetFrom = (from: number) => {
    if (from <= 2) { setQ2(null); setQ3(null); }
    if (from <= 3) setQ3(null);
  };

  return (
    <>
      <main style={{ fontFamily: "'Sora', sans-serif", background: "#faf8f3", minHeight: "100vh" }}>
        <Navbar />

        <div style={{ maxWidth: 620, margin: "0 auto", padding: "64px clamp(20px,4vw,32px) 100px" }}>

          {/* Header */}
          <div className="ha h1" style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#f2ece0", border: "1px solid #ddd3b8", borderRadius: 50, padding: "5px 14px", fontSize: 11, color: "#7a6030", fontWeight: 700, letterSpacing: 0.3, marginBottom: 16 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#c9a84c" }} />
              Getting Started
            </span>
            <h1 style={{ fontSize: "clamp(30px,5vw,48px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: -1.8, color: "#0f0f0f", marginBottom: 14 }}>
              Which plan actually{" "}
              <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", color: "#b85c1a" }}>fits your brand?</span>
            </h1>
            <p style={{ fontSize: 15, color: "#777", maxWidth: 420, margin: "0 auto", lineHeight: 1.75 }}>
              Three questions. We will tell you which plan makes sense and you can try it free for 10 days before spending anything.
            </p>
          </div>

          {/* Trial callout */}
          <div className="ha h2" style={{ background: "#111", borderRadius: 16, padding: "16px 20px", marginBottom: 36, display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span style={{ display: "flex", lineHeight: 1, marginTop: 2, color: "#c9a84c" }}><Lightbulb size={20} /></span>
            <div>
              <p style={{ margin: "0 0 5px", fontWeight: 800, fontSize: 13, color: "#fff" }}>Both plans come with a 10-day free trial</p>
              <p style={{ margin: 0, fontSize: 12, color: "#888", lineHeight: 1.7 }}>
                Whichever plan you pick, Starter or Growth, the trial gives you{" "}
                <span style={{ color: "#c9a84c", fontWeight: 700 }}>full access to that plan</span>. Real monitoring on your actual products, from day one.
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="ha h3" style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 40 }}>
            {[1, 2, 3].map(n => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 12, flex: n < 3 ? 1 : "none" }}>
                <StepDot n={n} active={step === n} done={step > n} />
                {n < 3 && <div style={{ flex: 1, height: 2, borderRadius: 2, transition: "background 0.3s", background: step > n ? "#1a1a1a" : "#d4cfc2" }} />}
              </div>
            ))}
          </div>

          {/* Q1 — Pain hook: how do they currently track competitors? */}
          <div className="ha h4" style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#b8872c", marginBottom: 12 }}>Question 1 of 3</p>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0f0f0f", marginBottom: 6, letterSpacing: -0.4 }}>
              Right now, how do you find out when a competitor changes their price?
            </h3>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 16, lineHeight: 1.6 }}>
              Be honest, this is the most common problem we solve.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <ChoiceCard
                icon={Clock} selected={q1 === "manual"}
                onClick={() => { setQ1("manual"); resetFrom(2); }}
                title="I check manually, every few days or when I remember"
                sub="Visiting 3 to 6 competitor URLs one by one, on a schedule that slips. It works until it does not."
              />
              <ChoiceCard
                icon={TrendingDown} selected={q1 === "blind"}
                onClick={() => { setQ1("blind"); resetFrom(2); }}
                title="Honestly, I usually find out when my sales start dropping"
                sub="By the time orders slow down, the competitor already has your customers. The damage is already done."
              />
              <ChoiceCard
                icon={AlertCircle} selected={q1 === "late"}
                onClick={() => { setQ1("late"); resetFrom(2); }}
                title="I get alerts from somewhere but they come too late or miss things"
                sub="A delayed or missed alert is the same as no alert. If you acted on old data, you may have priced wrong anyway."
              />
            </div>
          </div>

          {/* Q2 — How many products are competitors undercutting them on? */}
          {q1 && (
            <div style={{ marginBottom: 28, animation: "fadeSlideUp 0.3s ease both" }}>
              <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#b8872c", marginBottom: 12 }}>Question 2 of 3</p>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0f0f0f", marginBottom: 6, letterSpacing: -0.4 }}>
                How many products do competitors regularly undercut you on?
              </h3>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 16, lineHeight: 1.6 }}>
                Not your whole catalogue. Just the ones where pricing pressure is real.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <ChoiceCard
                  icon={Package} selected={q2 === "small"}
                  onClick={() => { setQ2("small"); resetFrom(3); }}
                  title="1 to 3 products"
                  sub="Your core SKUs. The ones that drive most of your revenue and where every rupee move matters most."
                />
                <ChoiceCard
                  icon={Store} selected={q2 === "large"}
                  onClick={() => { setQ2("large"); resetFrom(3); }}
                  title="4 to 6 products"
                  badge="Growth territory"
                  sub="A broader range means more exposure. Any one of them being undercut silently can drag your whole month."
                />
              </div>
            </div>
          )}

          {/* Q3 — What would actually help them decide what to do? */}
          {q2 && (
            <div style={{ marginBottom: 36, animation: "fadeSlideUp 0.3s ease both" }}>
              <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#b8872c", marginBottom: 12 }}>Question 3 of 3</p>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0f0f0f", marginBottom: 6, letterSpacing: -0.4 }}>
                When a competitor drops their price, what would help you decide what to do next?
              </h3>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 16, lineHeight: 1.6 }}>
                Both plans alert you instantly. The difference is the depth of what comes with the alert.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <ChoiceCard
                  icon={IndianRupee} selected={q3 === "rupee"}
                  onClick={() => setQ3("rupee")}
                  badge="Most useful"
                  title="Know exactly how many rupees I am putting at risk"
                  sub="Growth calculates the revenue impact from your actual weekly orders. You see the rupee number, not just a percentage. That number makes the decision easy."
                />
                <ChoiceCard
                  icon={Zap} selected={q3 === "fast"}
                  onClick={() => setQ3("fast")}
                  title="Just know it happened fast so I can react immediately"
                  sub="Starter sends an instant alert the moment a threshold is crossed. Includes the price change, your updated market position, and a clear next step."
                />
              </div>
            </div>
          )}

          {/* Recommendation */}
          {rec && (
            <div style={{ animation: "fadeSlideUp 0.4s ease both", marginBottom: 48 }}>
              <Recommendation rec={rec} q1={q1} q2={q2} q3={q3} />
            </div>
          )}

          {/* Plan comparison table */}
          <div style={{ background: "#fff", border: "1px solid #d4cfc2", borderRadius: 20, padding: "28px 24px", marginBottom: 28 }}>
            <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#b8872c", marginBottom: 6 }}>Side-by-side comparison</p>
            <p style={{ fontSize: 12, color: "#aaa", marginBottom: 20 }}>Both plans include instant alerts and a 10-day free trial. No card required.</p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 360 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "8px 12px", fontSize: 11, color: "#999", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }} />
                    <th style={{ padding: "8px 12px", fontSize: 12, color: "#555", fontWeight: 800, textAlign: "center" }}>
                      Starter<br /><span style={{ fontSize: 11, color: "#aaa", fontWeight: 500 }}>₹999/mo</span>
                    </th>
                    <th style={{ padding: "8px 12px", fontSize: 12, color: "#b8872c", fontWeight: 800, textAlign: "center", background: "#fffdf5", borderRadius: "8px 8px 0 0" }}>
                      Growth<br /><span style={{ fontSize: 11, color: "#aaa", fontWeight: 500 }}>₹2,499/mo</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Products tracked", "3", "6"],
                    ["Competitors per product", "3", "4"],
                    ["Instant alert on threshold breach", true, true],
                    ["Rupee ₹ revenue impact per alert", false, true],
                    ["Weekly Monday report", true, true],
                    ["30-day price trend history", false, true],
                    ["Monthly intelligence report", false, true],
                    ["Free 10-day trial, no card", true, true],
                  ].map(([label, s, g], i) => {
                    const cell = (v: boolean | string) =>
                      typeof v === "string"
                        ? <span style={{ fontSize: 12, color: "#555" }}>{v}</span>
                        : v
                          ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#1a6640", fontWeight: 800, fontSize: 14 }}><Check size={16} strokeWidth={3} /></span>
                          : <span style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#ddd", fontSize: 13 }}><X size={16} strokeWidth={3} /></span>;
                    return (
                      <tr key={i}>
                        <td style={{ padding: "10px 12px", fontSize: 12, color: "#555", borderBottom: "1px solid #f4f0e8", fontWeight: 500 }}>{label as string}</td>
                        <td style={{ padding: "10px 12px", textAlign: "center", borderBottom: "1px solid #f4f0e8" }}>{cell(s as boolean | string)}</td>
                        <td style={{ padding: "10px 12px", textAlign: "center", borderBottom: "1px solid #f4f0e8", background: "#fffdf5" }}>{cell(g as boolean | string)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <p style={{ fontSize: 13, color: "#888", textAlign: "center" }}>
            Still not sure?{" "}
            <a href="mailto:pricezenalert@gmail.com" style={{ color: "#b8872c", fontWeight: 800 }}>
              Email us and we will tell you what most brands your size end up choosing →
            </a>
          </p>
        </div>

        <Footer />
      </main>
    </>
  );
}