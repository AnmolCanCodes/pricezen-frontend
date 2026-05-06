"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Zap, IndianRupee, Target, FolderOpen, ScanLine, CalendarDays, BarChart3, TrendingUp, Mail, Flame, Check, X, AlertTriangle } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

/* ─── Scroll reveal hook ─────────────────────────── */
function useReveal(margin = "-60px") {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { rootMargin: margin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [margin]);
  return { ref, vis };
}

/* ─── CountUp ────────────────────────────────────── */
function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const [val, setVal] = useState(0);
  const { ref, vis } = useReveal();
  useEffect(() => {
    if (!vis) return;
    let cur = 0; const step = to / 50;
    const id = setInterval(() => {
      cur += step;
      if (cur >= to) { setVal(to); clearInterval(id); } else setVal(Math.floor(cur));
    }, 18);
    return () => clearInterval(id);
  }, [vis, to]);
  return <span ref={ref}>{prefix}{val.toLocaleString("en-IN")}{suffix}</span>;
}

/* ─── Email mockup ────────────────────────────────── */
function EmailMockup() {
  return (
    <div style={{ background: "#fff", border: "1px solid #e8e3d9", borderRadius: 20, overflow: "hidden", maxWidth: 430, width: "100%", boxShadow: "0 16px 48px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)", fontFamily: "inherit" }}>
      <div style={{ background: "#f7f4ee", borderBottom: "1px solid #ede8de", padding: "13px 18px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#c9a84c,#a06e1a)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>P</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 12, color: "#1a1a1a" }}>PriceZen</p>
          <p style={{ margin: 0, fontSize: 11, color: "#999" }}>pricezenalert@gmail.com · Monday, 10:00 AM</p>
        </div>
        <div style={{ background: "#fde8e8", color: "#b91c1c", fontSize: 10, fontWeight: 800, borderRadius: 6, padding: "3px 9px", flexShrink: 0, letterSpacing: 0.3 }}>ACTION NEEDED</div>
      </div>
      <div style={{ padding: "13px 18px 0", borderBottom: "1px solid #f2ede4" }}>
        <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 13, color: "#111", display: "flex", alignItems: "center", gap: 6 }}><AlertTriangle size={14} /> Weekly Report · Week of 7 Apr :- ₹12,400 at risk</p>
        <p style={{ margin: "0 0 12px", fontSize: 11, color: "#aaa" }}>Sunscreen SPF 50 · Vitamin C Serum · 2 categories</p>
      </div>
      <div style={{ padding: "14px 18px" }}>
        <div style={{ background: "#fef8ee", border: "1px solid #f0dfa8", borderRadius: 10, padding: "12px 14px", marginBottom: 10 }}>
          <p style={{ margin: "0 0 3px", fontSize: 10, color: "#b8872c", fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.8 }}>This Week's Estimated Impact</p>
          <p style={{ margin: "0 0 2px", fontSize: 24, fontWeight: 900, color: "#c0392b", letterSpacing: -1 }}>−₹12,400</p>
          <p style={{ margin: 0, fontSize: 11, color: "#888" }}>estimated revenue leak vs optimal pricing</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
          <div style={{ background: "#f0faf4", border: "1px solid #bbdfc8", borderRadius: 9, padding: "10px 12px" }}>
            <p style={{ margin: "0 0 2px", fontSize: 9, color: "#1a6640", fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.6 }}>Gain Opportunity</p>
            <p style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#1a6640" }}>+₹8,200</p>
          </div>
          <div style={{ background: "#fef1f0", border: "1px solid #f5b8b4", borderRadius: 9, padding: "10px 12px" }}>
            <p style={{ margin: "0 0 2px", fontSize: 9, color: "#b91c1c", fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.6 }}>Loss Risk</p>
            <p style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#b91c1c" }}>−₹4,200</p>
          </div>
        </div>
        <div style={{ background: "#111", borderRadius: 10, padding: "12px 14px", marginBottom: 10 }}>
          <p style={{ margin: "0 0 4px", fontSize: 10, color: "#888", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8 }}>One Action This Week</p>
          <p style={{ margin: 0, fontSize: 12, color: "#fff", lineHeight: 1.6 }}>Drop Sunscreen SPF 50 to <span style={{ color: "#f0c040", fontWeight: 800 }}>₹415</span> :- recover ~₹8,200 in weekly volume with zero margin loss.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#f7f4ee", border: "1px solid #e4ddd0", borderRadius: 9, padding: "9px 13px" }}>
          <div style={{ flex: 1 }}>
            <p style={{ margin: "0 0 1px", fontSize: 11, fontWeight: 700, color: "#1a1a1a" }}>30-Day Price History</p>
            <p style={{ margin: 0, fontSize: 10, color: "#aaa" }}>All your products & competitors · tracked hourly</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Why card ───────────────────────────────────── */
function WhyCard({ icon: Icon, title, body }: { icon: React.ElementType; title: string; body: string }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #d4cfc2", borderRadius: 18, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
      <span style={{ display: "flex" }}><Icon size={26} strokeWidth={1.5} /></span>
      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#111", lineHeight: 1.3 }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 13, color: "#666", lineHeight: 1.75 }}>{body}</p>
    </div>
  );
}

/* ─── Comparison row ─────────────────────────────── */
function CompRow({ label, s, g }: { label: string; s: boolean | string; g: boolean | string }) {
  const cell = (v: boolean | string) =>
    typeof v === "string" ? <span style={{ fontSize: 12, color: "#555", fontWeight: 500 }}>{v}</span>
      : v ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#1a6640", fontWeight: 800, fontSize: 15 }}><Check size={16} strokeWidth={3} /></span>
        : <span style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#ddd", fontWeight: 700, fontSize: 13 }}><X size={16} strokeWidth={3} /></span>;
  return (
    <tr>
      <td style={{ padding: "11px 16px", fontSize: 12, color: "#444", borderBottom: "1px solid #f4f0e8", fontWeight: 500 }}>{label}</td>
      <td style={{ padding: "11px 16px", textAlign: "center", borderBottom: "1px solid #f4f0e8" }}>{cell(s)}</td>
      <td style={{ padding: "11px 16px", textAlign: "center", borderBottom: "1px solid #f4f0e8", background: "#fffdf5" }}>{cell(g)}</td>
    </tr>
  );
}

/* ─── Page ───────────────────────────────────────── */
export default function Home() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { rootMargin: "-50px" }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const tickerItems = [
    "Price checked every hour, all day", "₹ impact on every alert",
    "One action in every weekly report", "Straight to your inbox :- nothing to log into",
    "30-day price history on every email", "Up to 4 competitors per product",
    "Runs while you sleep", "Delivered to your inbox",
  ];

  return (
    <>
      <main style={{ fontFamily: "'Sora', sans-serif", background: "#faf8f3" }}>
        <Navbar />

        {/* ── HERO ─────────────────────────────────────── */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px clamp(20px,4vw,48px) 64px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

          <div className="ha h1" style={{ marginBottom: 18 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#f2ece0", border: "1px solid #ddd3b8", borderRadius: 50, padding: "6px 16px", fontSize: 12, color: "#7a6030", fontWeight: 700, letterSpacing: 0.3 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#c9a84c", display: "inline-block" }} />
              Lands in your inbox. Nothing to log into.
            </span>
          </div>

          <h1 className="ha h2" style={{ fontSize: "clamp(38px,7vw,78px)", fontWeight: 900, lineHeight: 1.04, letterSpacing: -2.5, maxWidth: 840, marginBottom: 18, color: "#0f0f0f" }}>
            Know your competitors&apos;{" "}
            <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", background: "linear-gradient(120deg,#b85c1a,#c9a84c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              prices
            </span>
            {" "}before{" "}
            <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", background: "linear-gradient(120deg,#b85c1a,#c9a84c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              your customers do.
            </span>
          </h1>

          <p className="ha h3" style={{ fontSize: "clamp(15px,2vw,18px)", color: "#5a5040", maxWidth: 560, lineHeight: 1.75, marginBottom: 32, fontWeight: 500 }}>
            Automated price tracking for brands. We monitor your competitors 24/7 and deliver instant alerts with exact rupee impact to your inbox. See your monthly ROI. One clear action every Monday.
          </p>

          <div className="ha h4" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 56 }}>
            <Link href="/trial" className="btn-dark">Start Free Trial →</Link>
            <Link href="/getting-started" className="btn-outline">Not sure where to start?</Link>
          </div>

          {/* Stats row */}
          <div className="ha h5" style={{ display: "flex", gap: "clamp(24px,5vw,64px)", flexWrap: "wrap", justifyContent: "center", paddingTop: 28, borderTop: "1px solid #ede8de", width: "100%", marginBottom: 64 }}>
            {[
              { val: <><CountUp to={100} prefix="₹" suffix="k+" /></>, label: "avg. weekly recovery" },
              { val: <><CountUp to={6} /></>, label: "products tracked" },
              { val: <>Instant</>, label: "alert on price change" },
              { val: <><CountUp to={4} /> comps</>, label: "per product, tracked" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <p style={{ margin: "0 0 4px", fontSize: "clamp(22px,3vw,30px)", fontWeight: 900, color: "#111", letterSpacing: -0.5 }}>{s.val}</p>
                <p style={{ margin: 0, fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="float ha h5" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <EmailMockup />
          </div>
        </section>

        {/* ── TICKER ───────────────────────────────────── */}
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...tickerItems, ...tickerItems].map((t, i) => (
              <span key={i} className="ticker-item"><span style={{ color: "#c9a84c" }}>◆</span>{t}</span>
            ))}
          </div>
        </div>

        {/* ── WHY PriceZen ───────────────────────────────── */}
        <section id="why" style={{ background: "#fff", borderTop: "1px solid #d4cfc2", borderBottom: "1px solid #d4cfc2", padding: "80px clamp(20px,4vw,48px)" }}>
          <div style={{ maxWidth: 1060, margin: "0 auto" }}>
            <div className="reveal" style={{ textAlign: "center", marginBottom: 52 }}>
              <p style={{ fontSize: 15, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2.5, color: "#b8872c", marginBottom: 12 }}>Why PriceZen</p>
              <h2 style={{ fontSize: "clamp(26px,4vw,46px)", fontWeight: 900, letterSpacing: -1.2, marginBottom: 14, color: "#0f0f0f" }}>
                Stop guessing. Start knowing.<br />
                <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", color: "#b85c1a" }}>Before your competitors do.</span>
              </h2>
              <p style={{ fontSize: 16, color: "#777", maxWidth: 500, margin: "0 auto", lineHeight: 1.75 }}>
                Most founders find out about price drops when a customer complains or when orders mysteriously fall. By then the sales are already lost. We make sure that never happens to you.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 40 }}>
              {[
                {
                  icon: Zap,
                  title: "Know the moment they move",
                  body: "The instant a competitor changes price, you get an email. Not tomorrow. Not when you remember to check. Right now, while you can still do something about it.",
                },
                {
                  icon: IndianRupee,
                  title: "See the money at stake",
                  body: "We do not just tell you a competitor dropped prices. We tell you exactly how much revenue is at risk. Every number is calculated from your actual sales, not some generic guess.",
                },
                {
                  icon: Target,
                  title: "One clear move. Not endless analysis.",
                  body: "Every weekly report ends with one sentence: what to change, which product, what price, and why. Act on it in two minutes or skip it. Either way, you always know the right move.",
                },
                {
                  icon: FolderOpen,
                  title: "Everything in your inbox",
                  body: "Every email has 30 days of price history for all your products and competitors, formatted cleanly. Read it, forward it to your team, done. No login. No waiting. No extra work.",
                },
                {
                  icon: ScanLine,
                  title: "Know your market position",
                  body: "Cheapest in the market? Middle of the pack? Premium option? Every alert shows exactly where you stand compared to competitors right now, not some outdated industry report.",
                },
                {
                  icon: CalendarDays,
                  title: "See your monthly return",
                  body: "Every monthly report shows exactly how much revenue you protected or recovered that month. You will know at a glance whether the service paid for itself. It almost always has.",
                },
              ].map((c, i) => (
                <div key={i} className={`reveal d${(i % 4) + 1}`}>
                  <WhyCard {...c} />
                </div>
              ))}
            </div>

            {/* Manual vs PriceZen */}
            <div className="reveal" style={{ marginTop: 48, background: "#faf8f3", border: "1px solid #d4cfc2", borderRadius: 20, padding: "32px 28px" }}>
              <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#b8872c", marginBottom: 18 }}>Doing it yourself vs PriceZen</p>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: "10px 16px", fontSize: 11, color: "#858383", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Task</th>
                      <th style={{ padding: "10px 16px", fontSize: 11, color: "#858383", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, textAlign: "center" }}>Manual checking</th>
                      <th style={{ padding: "10px 16px", fontSize: 11, color: "#b8872c", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, textAlign: "center", background: "#fffdf5" }}>PriceZen</th>
                    </tr>
                  </thead>
                  <tbody>
                    <CompRow label="Check 4 competitors × 10 products" s="~2 times/day at best" g="Every hour, automatically" />
                    <CompRow label="Know when a price changed" s="Days later, if you notice" g="Alerted immediately" />
                    <CompRow label="Know what the change costs you" s={false} g={true} />
                    <CompRow label="Know exactly what to do next" s={false} g={true} />
                    <CompRow label="30-day price trend in one file" s={false} g={true} />
                    <CompRow label="30-day price trend analysis" s={false} g={true} />
                    <CompRow label="Monthly ₹ ROI proof" s={false} g={true} />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────── */}
        <section id="how" style={{ padding: "80px clamp(20px,4vw,48px)", maxWidth: 1060, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2.5, color: "#b8872c", marginBottom: 12 }}>How It Works</p>
            <h2 style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 900, letterSpacing: -1.2, marginBottom: 12 }}>
              Set it up once.<br />We do the rest.
            </h2>
            <p style={{ fontSize: 14, color: "#888", maxWidth: 400, margin: "0 auto", lineHeight: 1.75 }}>
              Ten minutes of setup. Then everything comes to your inbox automatically. No dashboards to check. No tools to learn. Just the information you need, when you need it.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 32 }}>
            {[
              {
                n: "01", bg: "#1a1a1a",
                title: "Tell us what you sell",
                body: "Share your product pages and the competitors you want to watch. Under 10 minutes and you are done. No technical setup, no complicated configuration.",
              },
              {
                n: "02", bg: "#b85c1a",
                title: "We watch every move",
                body: "We check prices all day, every day. The moment something important happens, you know about it. No delays, no waiting for scheduled updates.",
              },
              {
                n: "03", bg: "#1a6640",
                title: "Get clear answers in your inbox",
                body: "Every alert tells you the revenue impact and what to do next. Every Monday, get your week summarized: what changed, what it cost you, and your one move for the week ahead.",
              },
            ].map((s, i) => (
              <div key={i} className={`reveal d${i + 1}`} style={{ textAlign: "center", border: "1px solid #d4cfc2", borderRadius: 24, padding: "32px 26px", background: "#fff", boxShadow: "0 14px 30px rgba(0,0,0,0.05)" }}>
                <div style={{ width: 54, height: 54, borderRadius: 15, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "#fff", margin: "0 auto 18px", boxShadow: `0 6px 20px ${s.bg}40` }}>{s.n}</div>
                <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 8, color: "#111" }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "#777", lineHeight: 1.7 }}>{s.body}</p>
              </div>
            ))}
          </div>

          {/* Inbox breakdown */}
          <div style={{ marginTop: 64 }}>
            <div className="reveal" style={{ textAlign: "center", marginBottom: 32 }}>
              <h3 style={{ fontSize: "clamp(20px,3vw,32px)", fontWeight: 900, letterSpacing: -0.8, marginBottom: 8 }}>What actually lands in your inbox</h3>
              <p style={{ fontSize: 13, color: "#999", lineHeight: 1.6 }}>Four types of email. Each one has a specific job.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
              {[
                {
                  icon: Zap, title: "Instant Price Alert", when: "The moment a threshold is crossed",
                  body: "Know immediately when a competitor moves. Every alert shows your revenue impact, where you stand in the market, and the one action worth considering right now.",
                },
                {
                  icon: BarChart3, title: "Monday Weekly Report", when: "Every Monday · 10:00 AM",
                  body: "Start your week knowing exactly where you stand. See if you gained or lost ground, the rupee impact, and one clear move to make before your competitors wake up.",
                },
                {
                  icon: TrendingUp, title: "Price Trend", when: "Inside every weekly report",
                  body: "See the full picture across 30 days. Spot patterns you would miss looking at one week at a time. Know which way prices are moving before everyone else does.",
                },
                {
                  icon: Mail, title: "Monthly ROI Report", when: "Last Monday of each month",
                  body: "See exactly how much revenue you protected or recovered this month. Includes your complete month in numbers: competitor moves, your positioning journey, and what to watch next month.",
                },
              ].map((e, i) => (
                <div key={i} className={`reveal d${(i % 4) + 1}`} style={{ background: "#fff", border: "1px solid #ece7dd", borderRadius: 16, padding: "22px 20px" }}>
                  <p style={{ fontSize: 26, marginBottom: 10, color: "#b8872c" }}><e.icon size={26} strokeWidth={1.5} /></p>
                  <h4 style={{ fontSize: 14, fontWeight: 800, marginBottom: 4, color: "#111" }}>{e.title}</h4>
                  <p style={{ fontSize: 10, color: "#b8872c", fontWeight: 800, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.6 }}>{e.when}</p>
                  <p style={{ fontSize: 12, color: "#666", lineHeight: 1.7 }}>{e.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PLANS ────────────────────────────────────── */}
        <section id="plans" style={{ background: "#fff", borderTop: "1px solid #d4cfc2", padding: "80px clamp(20px,4vw,48px)" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div className="reveal" style={{ textAlign: "center", marginBottom: 48 }}>
              <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2.5, color: "#b8872c", marginBottom: 12 }}>Pricing</p>
              <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, letterSpacing: -1.2, marginBottom: 8 }}>Two plans. One free trial.</h2>
              <p style={{ fontSize: 14, color: "#888", lineHeight: 1.7, maxWidth: 400, margin: "0 auto 6px" }}>
                Both plans come with a 10-day free trial :- full access, no card needed. Pick what fits your catalogue size.
              </p>
              <div style={{ marginTop: 16 }}>
                <p style={{ fontSize: 13, color: "#888" }}>
                  Not sure which plan is right for you?{" "}
                  <Link href="/getting-started" style={{ color: "#b8872c", fontWeight: 800, textDecoration: "underline", textUnderlineOffset: 3 }}>
                    Answer 3 quick questions →
                  </Link>
                </p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20, marginBottom: 32 }}>
              {/* Starter */}
              <div className="plan-card reveal d1" style={{ borderColor: "#d4cfc2" }}>
                <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#999", marginBottom: 10 }}>Starter</p>
                <p style={{ fontSize: 46, fontWeight: 900, letterSpacing: -2, marginBottom: 2 }}>₹999<span style={{ fontSize: 15, fontWeight: 500, color: "#bbb" }}>/mo</span></p>
                <p style={{ fontSize: 12, color: "#aaa", marginBottom: 16 }}>Good for a focused catalogue of 1–3 products.</p>
                <div style={{ borderTop: "1px solid #d4cfc2", paddingTop: 20, marginBottom: 24 }}>
                  {[
                    [true, "3 products · 3 competitors each"],
                    [true, "Hourly price monitoring, 24/7"],
                    [true, "Instant alert on threshold breach"],
                    [true, "Two clear action options per alert"],
                    [true, "Weekly Monday report"],
                    [false, "Rupee ₹ impact estimates"],
                    [false, "30-day trend analysis"],
                    [false, "Monthly intelligence report"],
                  ].map(([on, label], i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 9 }}>
                      <span style={{ display: "flex", color: on ? "#1a6640" : "#ddd", marginTop: 1, flexShrink: 0 }}>{on ? <Check size={14} strokeWidth={3} /> : <X size={14} strokeWidth={3} />}</span>
                      <span style={{ fontSize: 12, color: on ? "#333" : "#ccc" }}>{label as string}</span>
                    </div>
                  ))}
                </div>
                <Link href="/audit?plan=starter" className="btn-outline" style={{ display: "block", textAlign: "center", width: "100%", borderRadius: 12 }}>Get Started →</Link>
              </div>

              {/* Growth */}
              <div className="plan-card gold reveal d2" style={{ position: "relative", borderColor: "#c9a84c" }}>
                <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "#c9a84c", color: "#fff", fontSize: 10, fontWeight: 900, padding: "4px 16px", borderRadius: 50, letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap", boxShadow: "0 4px 14px rgba(201,168,76,0.4)", display: "flex", alignItems: "center", gap: 6 }}>
                  <Flame size={14} /> Most Popular
                </div>
                <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#b8872c", marginBottom: 10 }}>Growth</p>
                <p style={{ fontSize: 46, fontWeight: 900, letterSpacing: -2, marginBottom: 2 }}>₹2,499<span style={{ fontSize: 15, fontWeight: 500, color: "#bbb" }}>/mo</span></p>
                <p style={{ fontSize: 12, color: "#aaa", marginBottom: 16 }}>For a bigger catalogue that needs more coverage and deeper insights.</p>
                <div style={{ borderTop: "1px solid #d4cfc2", paddingTop: 20, marginBottom: 24 }}>
                  {[
                    [false, "6 products · 4 competitors each"],
                    [false, "Hourly price monitoring, 24/7"],
                    [false, "Instant alert on threshold breach"],
                    [true, "Rupee ₹ impact estimate per alert"],
                    [true, "Weekly report with ₹ gain/loss breakdown"],
                    [true, "30-day price history + trend chart"],
                    [true, "Monthly intelligence summary"],
                    [false, "One clear weekly action with ₹ reason"],
                  ].map(([badge, label], i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 9 }}>
                      <span style={{ fontSize: 12, color: "#c9a84c", fontWeight: 800, marginTop: 1, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: 12, color: "#333", flex: 1 }}>{label as string}</span>
                      {badge && <span style={{ fontSize: 9, background: "#fef8e4", color: "#b8872c", border: "1px solid #f0dcaa", borderRadius: 5, padding: "2px 7px", fontWeight: 800, whiteSpace: "nowrap", flexShrink: 0 }}>Growth only</span>}
                    </div>
                  ))}
                </div>
                <Link href="/audit?plan=growth" className="btn-dark" style={{ display: "block", textAlign: "center", width: "100%", borderRadius: 12, background: "#b85c1a" }}>Get Started →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────── */}
        <section style={{ padding: "80px clamp(20px,4vw,48px)", textAlign: "center", background: "#faf8f3", borderTop: "1px solid #d4cfc2" }}>
          <div className="reveal">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#f2ece0", border: "1px solid #ddd3b8", borderRadius: 50, padding: "5px 14px", fontSize: 11, color: "#7a6030", fontWeight: 700, letterSpacing: 0.3, marginBottom: 18 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#c9a84c" }} /> Live within 24 hours of signing up
            </span>
            <h2 style={{ fontSize: "clamp(30px,5vw,56px)", fontWeight: 900, letterSpacing: -1.5, marginBottom: 14, color: "#0f0f0f" }}>
              Ready?{" "}<span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", color: "#b85c1a" }}>Let's go.</span>
            </h2>
            <p style={{ color: "#6e6d6d", fontSize: 15, maxWidth: 380, margin: "0 auto 32px", lineHeight: 1.75 }}>
              You share the URLs, we handle the setup. Your first alert fires the next time a competitor moves.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/audit" className="btn-dark" style={{ padding: "16px 48px", fontSize: 15, fontWeight: 800, background: "#b85c1a", borderRadius: 50 }}>
                Audit My Brand →
              </Link>
              <Link href="/Preview" className="last-btn-dark" style={{ padding: "16px 48px", borderRadius: 50, fontSize: 15, fontWeight: 800 }}>
                Live Preview ◉
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}