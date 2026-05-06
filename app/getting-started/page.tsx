"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Q1 = "yes" | "no" | null;
type Q2 = "small" | "mid" | "large" | null;
type Q3 = "rupee" | "basic" | null;
type Rec = "growth-strong" | "growth-lean" | "starter";

/* ─── Step dot ───────────────────────────────────── */
function StepDot({ n, active, done }: { n: number; active: boolean; done: boolean }) {
  return (
    <div style={{
      width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
      background: done ? "#1a1a1a" : active ? "#c9a84c" : "#ece7dd",
      color: done || active ? "#fff" : "#aaa",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 900, fontSize: 13, transition: "background 0.25s",
    }}>
      {done ? "✓" : n}
    </div>
  );
}

/* ─── Choice card ────────────────────────────────── */
function ChoiceCard({ icon, title, sub, badge, selected, onClick }: {
  icon: string; title: string; sub: string; badge?: string; selected: boolean; onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} style={{
      width: "100%", fontFamily: "'Sora', sans-serif", textAlign: "left",
      border: selected ? "2px solid #1a1a1a" : "1px solid #d4cfc2",
      borderRadius: 18, padding: "20px 22px", cursor: "none",
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
        <span style={{ fontSize: 22, lineHeight: 1, marginTop: 2 }}>{icon}</span>
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

/* ─── Recommendation ─────────────────────────────── */
function Recommendation({ rec }: { rec: Rec }) {
  const isGrowthStrong = rec === "growth-strong";
  const isGrowthLean = rec === "growth-lean";
  const isStarter = rec === "starter";

  const planName = isStarter ? "Starter" : "Growth";
  const planPrice = isStarter ? "₹999" : "₹2,499";
  const planHref = isStarter ? "/audit?plan=starter" : "/audit?plan=growth";

  return (
    <div style={{
      background: "#fff", border: `2px solid ${isStarter ? "#d4cfc2" : "#c9a84c"}`,
      borderRadius: 20, overflow: "hidden",
      boxShadow: "0 14px 40px rgba(0,0,0,0.07)",
    }}>
      <div style={{
        background: isStarter ? "#1a1a1a" : "linear-gradient(90deg, #b85c1a, #c9a84c)",
        padding: "14px 24px", display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ fontSize: 18 }}>{isStarter ? "✅" : "🔥"}</span>
        <p style={{ margin: 0, fontWeight: 900, fontSize: 14, color: "#fff", letterSpacing: 0.2 }}>
          {isStarter
            ? "Starter looks like the right fit for you"
            : isGrowthStrong
              ? "Growth is the clear choice here"
              : "We'd lean toward Growth for your setup"
          }
        </p>
      </div>

      <div style={{ padding: "22px 24px" }}>
        {isGrowthStrong && (
          <p style={{ fontSize: 14, color: "#444", lineHeight: 1.8, marginBottom: 20 }}>
            You&rsquo;ve got a decent-sized catalogue and you want to see the rupee picture :- that&rsquo;s exactly what Growth is built for. The ₹ impact estimates, 30-day trends, and monthly report all exist because brands at your scale need more than just alerts :- they need context. Start the 10-day trial on Growth and see what the first weekly report shows you.
          </p>
        )}
        {isGrowthLean && (
          <p style={{ fontSize: 14, color: "#444", lineHeight: 1.8, marginBottom: 20 }}>
            Starter would cover your product count, but honestly, Growth isn&rsquo;t a huge jump :- and the rupee impact estimates alone usually pay for the difference. If you&rsquo;re running even 30–40 orders a week, knowing the ₹ at risk per alert is genuinely useful. Try Growth on the 10-day trial and compare both plans yourself before paying anything.
          </p>
        )}
        {isStarter && (
          <p style={{ fontSize: 14, color: "#444", lineHeight: 1.8, marginBottom: 20 }}>
            For a focused catalogue, Starter does everything it needs to. You get hourly monitoring, instant alerts when a threshold is crossed, and the weekly Monday report. Clean and simple. The 10-day trial gives you the full Starter experience :- no card, no risk.
          </p>
        )}

        {/* What&rsquo;s in the trial */}
        <div style={{ background: "#fef8ee", border: "1px solid #f0dfa8", borderRadius: 12, padding: "14px 18px", marginBottom: 22 }}>
          <p style={{ margin: "0 0 10px", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.8, color: "#b8872c" }}>What the 10-day trial actually is</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {[
              `Full ${planName} plan access for 10 days`,
              "Real monitoring on your actual products from day one",
              "Real alerts the first time a competitor crosses your threshold",
              "No auto-charge when it ends.",

            ].map(t => (
              <div key={t} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                <span style={{ fontSize: 12, color: "#1a6640", fontWeight: 800, flexShrink: 0, marginTop: 1 }}>✓</span>
                <span style={{ fontSize: 13, color: "#555" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <Link href="/trial" className="btn-dark" style={{ borderRadius: 50, padding: "13px 32px", fontSize: 14, fontWeight: 800, background: isStarter ? "#1a1a1a" : "#b85c1a" }}>
            Start {planName} Trial :- Free →
          </Link>
          <Link href="/#plans" className="btn-outline" style={{ borderRadius: 50, padding: "13px 24px", fontSize: 13 }}>
            See plan details
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────── */
export default function GettingStartedPage() {
  const [q1, setQ1] = useState<Q1>(null);
  const [q2, setQ2] = useState<Q2>(null);
  const [q3, setQ3] = useState<Q3>(null);

  const step = q1 === null ? 1 : q2 === null ? 2 : q3 === null ? 3 : 4;

  /* Logic:
     - large catalogue (6–10) → growth-strong regardless of Q3
     - small catalogue (1–3) + wants rupee impact → growth-lean (nudge)
     - small catalogue (1–3) + basic is fine → starter
     - mid catalogue (4–5) + wants rupee impact → growth-lean
     - mid catalogue (4–5) + basic is fine → starter (borderline, but fair)
  */
  const rec: Rec | null = q1 && q2 && q3
    ? q2 === "large" ? "growth-strong"
      : q3 === "rupee" ? "growth-lean"
        : "starter"
    : null;

  const reset = (from: number) => {
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
              Three questions. We&rsquo;ll tell you which plan makes sense :- and you can try it free for 10 days before spending anything.
            </p>
          </div>

          {/* Trial callout */}
          <div className="ha h2" style={{ background: "#111", borderRadius: 16, padding: "16px 20px", marginBottom: 36, display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span style={{ fontSize: 20, lineHeight: 1, marginTop: 2 }}>💡</span>
            <div>
              <p style={{ margin: "0 0 5px", fontWeight: 800, fontSize: 13, color: "#fff" }}>Both plans come with a 10-day free trial</p>
              <p style={{ margin: 0, fontSize: 12, color: "#888", lineHeight: 1.7 }}>
                Whichever plan you pick :- Starter or Growth :- the trial gives you{" "}
                <span style={{ color: "#c9a84c", fontWeight: 700 }}>full access to that plan</span>. Real monitoring on your actual products.
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="ha h3" style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 40 }}>
            {[1, 2, 3].map(n => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 12, flex: n < 3 ? 1 : "none" }}>
                <StepDot n={n} active={step === n} done={step > n} />
                {n < 3 && <div style={{ flex: 1, height: 2, borderRadius: 2, transition: "background 0.3s", background: step > n ? "#1a1a1a" : "#d4cfc2" }} />}
              </div>
            ))}
          </div>

          {/* Q1 :- existing customer? */}
          <div className="ha h4" style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#b8872c", marginBottom: 12 }}>Question 1 of 3</p>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0f0f0f", marginBottom: 6, letterSpacing: -0.4 }}>
              Are you already a PriceZen customer?
            </h3>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 16, lineHeight: 1.6 }}>Just helps us understand where you are.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <ChoiceCard
                icon="✅" selected={q1 === "yes"}
                onClick={() => { setQ1("yes"); reset(2); }}
                title="Yes, I have a plan already"
                sub="Looking to upgrade, or helping someone else get set up."
              />
              <ChoiceCard
                icon="👋" selected={q1 === "no"}
                onClick={() => { setQ1("no"); reset(2); }}
                title="No, I'm new here"
                sub="First time looking at PriceZen :- figuring out where to start."
              />
            </div>
          </div>

          {/* Q2 :- catalogue size */}
          {q1 && (
            <div style={{ marginBottom: 28, animation: "fadeSlideUp 0.3s ease both" }}>
              <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#b8872c", marginBottom: 12 }}>Question 2 of 3</p>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0f0f0f", marginBottom: 6, letterSpacing: -0.4 }}>
                How many products do you want to track?
              </h3>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 16, lineHeight: 1.6 }}>
                Just the ones you care about competing on price :- not your whole catalogue necessarily.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <ChoiceCard
                  icon="🧴" selected={q2 === "small"}
                  onClick={() => { setQ2("small"); reset(3); }}
                  title="1–3 products"
                  sub="Core SKUs you compete on hardest. Starter covers this, but Growth works too."
                />
                <ChoiceCard
                  icon="🏪" selected={q2 === "mid"}
                  onClick={() => { setQ2("mid"); reset(3); }}
                  title="3 products"
                  sub="Starter's limit is 3 products :- fits perfectly for focused catalogues. Growth gives you more headroom."
                />
                <ChoiceCard
                  icon="🏭" selected={q2 === "large"}
                  onClick={() => { setQ2("large"); reset(3); }}
                  title="4–6 products"
                  badge="Growth territory"
                  sub="Growth is the right choice here :- 6 products, 4 competitors each."
                />
              </div>
            </div>
          )}

          {/* Q3 :- what matters more */}
          {q2 && (
            <div style={{ marginBottom: 36, animation: "fadeSlideUp 0.3s ease both" }}>
              <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#b8872c", marginBottom: 12 }}>Question 3 of 3</p>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0f0f0f", marginBottom: 6, letterSpacing: -0.4 }}>
                What matters more to you in an alert?
              </h3>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 16, lineHeight: 1.6 }}>
                Both plans send instant alerts. The difference is what&rsquo;s in the email.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <ChoiceCard
                  icon="₹" selected={q3 === "rupee"}
                  onClick={() => setQ3("rupee")}
                  badge="Most useful"
                  title="I want to know the rupee impact"
                  sub="Growth tells you exactly how much revenue is at risk or recoverable :- calculated from your weekly order volume. Plus 30-day trends and a monthly ROI report."
                />
                <ChoiceCard
                  icon="📬" selected={q3 === "basic"}
                  onClick={() => setQ3("basic")}
                  title="Just the alert and the data is enough"
                  sub="Starter sends you the price change, your new market position, and two clear action options."
                />
              </div>
            </div>
          )}

          {/* Recommendation */}
          {rec && (
            <div style={{ animation: "fadeSlideUp 0.4s ease both", marginBottom: 48 }}>
              <Recommendation rec={rec} />
            </div>
          )}

          {/* Plan comparison table */}
          <div style={{ background: "#fff", border: "1px solid #d4cfc2", borderRadius: 20, padding: "28px 24px", marginBottom: 28 }}>
            <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#b8872c", marginBottom: 6 }}>Side-by-side comparison</p>
            <p style={{ fontSize: 12, color: "#aaa", marginBottom: 20 }}>Both plans include instant alerts and a 10-day free trial.</p>
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
                    ["Instant alerts", true, true],
                    ["Rupee ₹ impact per alert", false, true],
                    ["30-day price trend", false, true],
                    ["Monthly intelligence report", false, true],
                    ["Free 10-day trial", true, true],
                  ].map(([label, s, g], i) => {
                    const cell = (v: boolean | string) =>
                      typeof v === "string"
                        ? <span style={{ fontSize: 12, color: "#555" }}>{v}</span>
                        : v
                          ? <span style={{ color: "#1a6640", fontWeight: 800, fontSize: 14 }}>✓</span>
                          : <span style={{ color: "#ddd", fontSize: 13 }}>✗</span>;
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
            Still on the fence?{" "}
            <a href="mailto:pricezenalert@gmail.com" style={{ color: "#b8872c", fontWeight: 800 }}>
              Email us :- we&rsquo;ll tell you what most brands your size end up on →
            </a>
          </p>
        </div>

        <Footer />
      </main>
    </>
  );
}