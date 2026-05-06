"use client";
import { useState } from "react";
import Link from "next/link";
import { Settings, FlaskConical, IndianRupee, Mail, Lock, Search, HelpCircle, Check, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface FAQItem { q: string; a: React.ReactNode }
interface Section  { title: string; icon: React.ElementType; items: FAQItem[] }

const sections: Section[] = [
  {
    title: "How It Works", icon: Settings,
    items: [
      {
        q: "How often are prices checked?",
        a: <>Prices are checked <strong>every hour, around the clock</strong>. Growth plan subscribers receive an instant email the moment a threshold is crossed. Starter plan subscribers get a morning digest at <strong>10am the next day</strong>. All clients get a Monday weekly report regardless of alerts.</>,
      },
      {
        q: "What happens if a competitor's page breaks or goes down?",
        a: <>The scraper logs the error and <strong>retries automatically on the next scheduled check</strong>. You won't receive a false alert. If a URL stays broken for 3+ consecutive checks, we flag it internally. If a competitor has changed their URL, just email us and we'll update it same day.</>,
      },
      {
        q: "When does monitoring start after I sign up?",
        a: <><strong>Trial:</strong> monitoring starts within 24 hours of your submission — usually the same day. You'll get a confirmation email once it's live. <strong>Paid plan / Audit:</strong> we configure everything within 24 hours and notify you when it starts.</>,
      },
      {
        q: "How is the weekly report calculated?",
        a: <>Each Monday report is based on the price movements captured across the week, combined with your average weekly orders (which you provide during signup). We calculate <strong>revenue at risk, missed margin opportunities, and your current market position</strong>. Growth plan reports include a rupee ₹ impact estimate per product.</>,
      },
      {
        q: "What does the monthly report include?",
        a: <>The monthly intelligence report shows whether PriceZen paid for itself — with an <strong>estimated ₹ figure for revenue protected or margin recovered</strong>. It covers 30-day price trends per product, your positioning history (cheapest / mid / premium), and one strategic recommendation for the coming month. Growth plan only.</>,
      },
    ],
  },
  {
    title: "Trial", icon: FlaskConical,
    items: [
      {
        q: "What exactly is the 10-day free trial?",
        a: <>The trial is a full, real version of whichever plan you sign up for — <strong>Starter or Growth</strong>. Not a demo. Not a preview. Actual monitoring on your actual products. Actual alerts when competitor prices move. You get 10 days free with no credit card required. If you like it, you subscribe. If not, you don't. No awkward cancellation flow.</>,
      },
      {
        q: "Is the trial limited in any way?",
        a: <>No. <strong>The trial gives you complete access to the plan you choose</strong> — same product limits, same alert timing, same report format. The only difference is it's free for 10 days. There's no "trial tier" with reduced features.</>,
      },
      {
        q: "Which plan should I trial — Starter or Growth?",
        a: <>Choose <strong>Starter</strong> if you have 3 or fewer products. Choose <strong>Growth</strong> if you have 4–6 products or need ₹ impact estimates. Not sure? <Link href="/getting-started" style={{ color: "#b8872c", fontWeight: 700 }}>Answer 3 quick questions →</Link></>,
      },
      {
        q: "What happens at the end of the 10 days?",
        a: <>Monitoring pauses and you'll receive an email asking if you'd like to subscribe. There's no auto-charge. You manually choose to continue. If you don't subscribe, your data is retained for 30 days in case you change your mind.</>,
      },
    ],
  },
  {
    title: "Plans & Billing", icon: IndianRupee,
    items: [
      {
        q: "Can I change products mid-month?",
        a: <>Yes — just <strong>email us</strong> with the new URLs. We update your CSV and monitoring setup within 24 hours at no extra charge. Up to <strong>2 product swaps per billing month</strong> are included in both plans.</>,
      },
      {
        q: "Can I upgrade from Starter to Growth later?",
        a: <>Yes. Email us anytime and we'll switch your plan at the start of your next billing cycle. You'll immediately get access to Growth features — instant alerts, 6 products, 4 competitors, ₹ estimates.</>,
      },
      {
        q: "Do I need to sign a contract?",
        a: <>No contracts. PriceZen is <strong>month-to-month</strong>. Cancel, upgrade, or pause anytime by emailing us. Cancellations take effect at the end of the current billing month.</>,
      },
      {
        q: "What if I cancel — do I get a refund?",
        a: <>We don't offer partial-month refunds. If you cancel, your plan stays active until the end of the billing period and then stops. The 10-day trial has nothing to charge, so this only applies to paid subscriptions.</>,
      },
    ],
  },
  {
    title: "Alerts & Reports", icon: Mail,
    items: [
      {
        q: "What does an alert email look like?",
        a: <>Each alert includes: the product name, your current price, the competitor's new price, the % change, your new market position, and one recommended action. Growth plan alerts also include an <strong>estimated ₹ revenue impact</strong> based on your weekly order volume.</>,
      },
      {
        q: "Can I share reports with my team?",
        a: <>Yes — <strong>forward reports to your team freely</strong>. Re-publishing or commercially redistributing report content is not permitted. If you need multiple email recipients, let us know and we can CC a second address at no extra charge.</>,
      },
      {
        q: "I'm not getting alerts even though prices changed?",
        a: <>The most common reason is the price movement didn't cross your threshold %. If you set 5% and a competitor moved 3%, no alert fires — by design. Check your threshold setting. If the math looks right and alerts still aren't arriving, <a href="mailto:pricezenalert@gmail.com" style={{ color: "#b8872c", fontWeight: 700 }}>email us</a> and we'll investigate within 24 hours.</>,
      },
    ],
  },
  {
    title: "Privacy & Data", icon: Lock,
    items: [
      {
        q: "What data do you store about me?",
        a: <>We store your email, brand name, WhatsApp number (if provided), average weekly orders, the product and competitor URLs you submit, and your consent record. We <strong>never sell, share, or use your data for any purpose other than delivering your plan</strong>. Full details in our Privacy Policy.</>,
      },
      {
        q: "Are we follow DPDP Act?",
        a: <>Yes. User consent is recorded at CookieBanner with timestamp, IP address, acceptance method, and policy version. Data deletion requests can be made anytime via email and are processed within 7 business days.</>,
      },
    ],
  },
];

/* ─── FAQ accordion row ──────────────────────────── */
function FAQRow({ item, defaultOpen = false }: { item: FAQItem; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid #f4f0e8" }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", background: "none", border: "none", cursor: "none",
          fontFamily: "'Sora', sans-serif", padding: "18px 0",
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
          textAlign: "left",
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 14, color: "#111", lineHeight: 1.5, flex: 1 }}>{item.q}</span>
        <span style={{
          width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
          background: open ? "#1a1a1a" : "#ece7dd",
          color: open ? "#fff" : "#888",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, fontWeight: 700, lineHeight: 1,
          transition: "background 0.18s, transform 0.22s",
          transform: open ? "rotate(45deg)" : "none",
        }}>+</span>
      </button>
      {open && (
        <div style={{
          fontSize: 13, color: "#666", lineHeight: 1.85,
          paddingBottom: 18, animation: "fadeSlideUp 0.22s ease both",
        }}>
          {item.a}
        </div>
      )}
    </div>
  );
}

/* ─── Main page ──────────────────────────────────── */
export default function FAQPage() {
  const [search, setSearch] = useState("");

  const filtered: Section[] = search.trim()
    ? sections
        .map(s => ({ ...s, items: s.items.filter(i => i.q.toLowerCase().includes(search.toLowerCase())) }))
        .filter(s => s.items.length > 0)
    : sections;

  return (
    <>
      <main style={{ fontFamily: "'Sora', sans-serif", background: "#faf8f3", minHeight: "100vh" }}>
        <Navbar />

        <div style={{ maxWidth: 720, margin: "0 auto", padding: "64px clamp(20px,4vw,32px) 100px" }}>

          {/* Header */}
          <div className="ha h1" style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#f2ece0", border: "1px solid #ddd3b8", borderRadius: 50, padding: "5px 14px", fontSize: 11, color: "#7a6030", fontWeight: 700, letterSpacing: 0.3, marginBottom: 16 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#c9a84c" }} />
              FAQ
            </span>
            <h1 style={{ fontSize: "clamp(30px,5vw,48px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: -1.8, color: "#0f0f0f", marginBottom: 12 }}>
              Frequently asked{" "}
              <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", color: "#b85c1a" }}>questions.</span>
            </h1>
            <p style={{ fontSize: 15, color: "#777", maxWidth: 420, margin: "0 auto", lineHeight: 1.7 }}>
              Everything you need to know about how PriceZen works, what's included, and how to get started.
            </p>
          </div>

          {/* Search */}
          <div className="ha h2" style={{ marginBottom: 44, position: "relative" }}>
            <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#ccc" }}><Search size={18} /></span>
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%", padding: "14px 16px 14px 44px",
                border: "1px solid #d4cfc2", borderRadius: 12,
                background: "#fff", fontSize: 14, fontFamily: "'Sora', sans-serif",
                color: "#111", outline: "none", boxSizing: "border-box",
                transition: "border-color 0.18s, box-shadow 0.18s",
              }}
              onFocus={e => { e.currentTarget.style.borderColor = "#c9a84c"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.13)"; }}
              onBlur={e  => { e.currentTarget.style.borderColor = "#d4cfc2"; e.currentTarget.style.boxShadow = "none"; }}
            />
            {search && (
              <button type="button" onClick={() => setSearch("")} style={{
                position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "none", color: "#ccc", display: "flex", alignItems: "center", justifyContent: "center"
              }}><X size={18} /></button>
            )}
          </div>

          {/* FAQ sections */}
          {filtered.length > 0 ? (
            filtered.map((s, i) => (
              <div key={i} className="reveal" style={{ marginBottom: 36 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ display: "flex", color: "#b8872c" }}><s.icon size={18} /></span>
                  <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#b8872c", margin: 0 }}>{s.title}</p>
                </div>
                <div style={{ background: "#fff", border: "1px solid #d4cfc2", borderRadius: 18, padding: "0 24px" }}>
                  {s.items.map((item, j) => (
                    <FAQRow key={j} item={item} defaultOpen={i === 0 && j === 0} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "56px 0" }}>
              <p style={{ fontSize: 36, marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#ccc" }}><HelpCircle size={48} /></p>
              <p style={{ fontWeight: 800, fontSize: 16, color: "#444", marginBottom: 8 }}>No matching questions.</p>
              <p style={{ fontSize: 13, color: "#888" }}>
                Try different words, or{" "}
                <a href="mailto:pricezenalert@gmail.com" style={{ color: "#b8872c", fontWeight: 700 }}>email us directly →</a>
              </p>
            </div>
          )}

          {/* Bottom CTA — matching main page style */}
          <div className="reveal" style={{ background: "#111", borderRadius: 18, padding: "32px", textAlign: "center", border: "1px solid #222", marginTop: 48 }}>
            <p style={{ fontSize: 12, color: "#888", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>Still have a question?</p>
            <p style={{ fontSize: 16, color: "#fff", fontWeight: 700, lineHeight: 1.7, maxWidth: 440, margin: "0 auto 20px" }}>
              We typically respond within a few hours on weekdays. No bots, no ticket queue — just us.
            </p>
            <a href="mailto:pricezenalert@gmail.com" className="btn-dark" style={{ display: "inline-block", padding: "13px 32px", borderRadius: 50, fontSize: 14, fontWeight: 800 }}>
              Email Us →
            </a>
          </div>

          {/* Ready to start nudge */}
          <div className="reveal" style={{ textAlign: "center", marginTop: 32 }}>
            <p style={{ fontSize: 13, color: "#aaa" }}>
              Ready to try it?{" "}
              <Link href="/trial" style={{ color: "#b8872c", fontWeight: 800 }}>Start your 10-day free trial →</Link>
            </p>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}