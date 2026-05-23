"use client";
import type { CSSProperties } from "react";
import { useState } from "react";
import Link from "next/link";
import { Settings, FlaskConical, IndianRupee, Mail, Lock, Search, HelpCircle, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CSS = `
@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.reveal {
  animation: fadeSlideUp 0.6s ease both;
}
`;

interface FAQItem { q: string; a: React.ReactNode }
interface Section { title: string; icon: React.ElementType; items: FAQItem[] }

const sections: Section[] = [
  {
    title: "How It Works", icon: Settings,
    items: [
      {
        q: "How often are prices checked?",
        a: (
          <>
            We check prices <strong>multiple times every single day</strong>, including
            weekends and holidays. The moment any competitor crosses your alert threshold,
            you get an email — right away, not at some scheduled time later. All plan types
            get instant alerts the second they happen. On top of that, every client gets a{" "}
            <strong>full week summary every Monday</strong> showing exactly what moved in
            your category, regardless of whether any alerts fired. So you&apos;re never
            caught off guard.
          </>
        ),
      },
      {
        q: "What happens if a competitor's page breaks or goes down?",
        a: (
          <>
            Our system notices the issue and <strong>retries automatically on the next
              scheduled check</strong>. You will not receive a false alert for a broken page.
            If a URL stays unreachable across several checks, we look into it on our end.
            If a competitor has moved their product to a new URL, just email us and we will
            update it for you the same day.
          </>
        ),
      },
      {
        q: "When does monitoring start after I sign up?",
        a: (
          <>
            <strong>Trial:</strong> monitoring typically starts within 24 hours of your
            submission, often the same day. You will get a confirmation email the moment
            it goes live.{" "}
            <strong>Paid plan / Audit:</strong> we configure everything within 24 hours
            and send you a confirmation as soon as it starts.
          </>
        ),
      },
      {
        q: "How is the weekly report calculated?",
        a: (
          <>
            Every Monday report is built from the price movements captured across the week,
            combined with your average weekly orders that you share during signup. From that
            we work out <strong>where you stand in the market, what changed, and what we
              recommend you do next</strong>. Growth plan reports also show a rupee estimate
            of how much revenue is at risk or recoverable based on those moves.
          </>
        ),
      },
      {
        q: "What does the monthly report include?",
        a: (
          <>
            The monthly intelligence report, available on the <strong>Growth plan</strong>,
            answers one simple question: did PriceZen pay for itself this month? It covers
            30-day price trends per product, how your market position shifted over the month,
            and one clear recommendation for the coming month. Most clients read it in under
            five minutes.
          </>
        ),
      },
    ],
  },
  {
    title: "Trial", icon: FlaskConical,
    items: [
      {
        q: "What exactly is the 10-day free trial?",
        a: (
          <>
            The trial is the real deal. It&apos;s not a demo or preview or watered-down
            version — you get the actual plan you choose, <strong>Starter or Growth</strong>,
            fully functional, monitoring your actual products in real time. You get real
            alerts when competitor prices move, real reports every Monday, the whole thing.
            For 10 days, completely free. No credit card required to start. If you love it,
            you subscribe. If not, no hard feelings, you&apos;re done. Simple as that.
          </>
        ),
      },
      {
        q: "Is the trial limited in any way?",
        a: (
          <>
            No. <strong>The trial gives you complete access to the plan you choose</strong>,
            same product limits, same alert timing, same report format. The only difference
            is it is free for 10 days. There is no reduced-feature trial tier.
          </>
        ),
      },
      {
        q: "Which plan should I trial, Starter or Growth?",
        a: (
          <>
            Choose <strong>Starter</strong> if you have 1 to 3 products to track. Choose{" "}
            <strong>Growth</strong> if you have 4 to 6 products or want to see the rupee
            impact of every price change. Not sure?{" "}
            <Link href="/getting-started" style={{ color: "#b8872c", fontWeight: 700 }}>
              Answer 3 quick questions and we will tell you what fits best →
            </Link>
          </>
        ),
      },
      {
        q: "What happens at the end of the 10 days?",
        a: (
          <>
            Monitoring pauses and you will receive an email asking if you would like to
            continue. There is <strong>no auto-charge</strong>. You manually choose to
            subscribe. If you decide not to, your data is held safely for a period in case
            you change your mind later.
          </>
        ),
      },
    ],
  },
  {
    title: "Plans & Billing", icon: IndianRupee,
    items: [
      {
        q: "Can I upgrade from Starter to Growth later?",
        a: (
          <>
            Yes. Email us anytime and we will sort out the upgrade for you. Once you are on
            Growth you will get more products, more competitors per product, rupee impact in
            every alert, 30-day price trend history, and the monthly intelligence report.
          </>
        ),
      },
      {
        q: "Do I need to sign a contract?",
        a: (
          <>
            No contracts at all. PriceZen is <strong>month-to-month</strong>. You can cancel,
            upgrade, or pause by emailing us. Cancellations are handled according to our refund
            policy, and we&apos;d rather have you staying because you love the product, not because
            you&apos;re locked in.
          </>
        ),
      },
      {
        q: "What if I cancel, do I get a refund?",
        a: (
          <>
            Absolutely. We believe you should be happy with what you&apos;re paying for.{" "}
            <strong>Within 7 days of your payment</strong>, if PriceZen isn&apos;t for you,
            email us at{" "}
            <a href="mailto:pricezenalert@gmail.com" style={{ color: "#b8872c", fontWeight: 700 }}>
              pricezenalert@gmail.com
            </a>{" "}
            with your payment details and we&apos;ll review and initiate the eligible full refund
            within 5 to 7 business days.
            <br /><br />
            If you cancel <strong>after the 7-day period</strong>, refunds are not calculated
            day by day. If approved, we refund <strong>50% of your original payment amount</strong>
            for that billing period. The other 50% reflects the work we&apos;ve already done setting
            up your monitoring, the server costs we&apos;ve incurred, and the reports we&apos;ve sent you.
           
          </>
        ),
      },
    ],
  },
  {
    title: "Alerts & Reports", icon: Mail,
    items: [
      {
        q: "What does an alert email look like?",
        a: (
          <>
            Each alert is straightforward: we tell you which product moved, what your price
            is, what the competitor&apos;s new price is, the percentage change, your current
            market position, and one clear action you can take right now. If you&apos;re on
            Growth, we also calculate the <strong>rupee impact</strong> — how much revenue
            this move means to you based on your order volume — so you know instantly if it
            matters.
          </>
        ),
      },
      {
        q: "Can I share reports with my team?",
        a: (
          <>
            Yes. <strong>Forward reports to your team freely.</strong>
          </>
        ),
      },
      {
        q: "I am not getting alerts even though prices changed?",
        a: (
          <>
            Usually it&apos;s because the price didn&apos;t quite hit your threshold. If you
            set 5% and a competitor moved 3%, no alert fires — that&apos;s by design, so
            we&apos;re not spamming your inbox with noise. Double-check your threshold percentage
            and the actual move. If the math checks out and you&apos;re still not seeing
            anything,{" "}
            <a href="mailto:pricezenalert@gmail.com" style={{ color: "#b8872c", fontWeight: 700 }}>
              send us an email
            </a>
            {" "}and we&apos;ll look into it the same day.
          </>
        ),
      },
    ],
  },
  {
    title: "Privacy & Data", icon: Lock,
    items: [
      {
        q: "What data do you store about me?",
        a: (
          <>
            We store what you give us: your email, your brand name, any WhatsApp number
            you share, your average weekly order count, and the product and competitor URLs
            you want us to monitor. That&apos;s it. We <strong>never sell your data,
            never share it with advertisers, and never train AI models on it</strong>. Your data
            exists purely to deliver you alerts and reports. Full details are in our{" "}
            <Link href="/privacy-policy" style={{ color: "#b8872c", fontWeight: 700 }}>
              Privacy Policy
            </Link>
            .
          </>
        ),
      },
      {
        q: "Do you follow the DPDP Act?",
        a: (
          <>
            Yes, completely. We comply with India&apos;s Digital Personal Data Protection
            (DPDP) Act. That means we ask for your explicit consent before processing any
            personal data, we keep detailed records of exactly when and how you consented,
            and we give you full control. Want your data deleted? Email us and we&apos;ll
            remove it within <strong>7 business days</strong>. We take data rights seriously
            because they&apos;re your rights.
          </>
        ),
      },
    ],
  },
];

/* --- FAQ accordion row -------------------------------- */
function FAQRow({ item, defaultOpen = false }: { item: FAQItem; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const toggleIconStyle: CSSProperties = {
    width: 24,
    height: 24,
    borderRadius: "50%",
    flexShrink: 0,
    background: open ? "#1a1a1a" : "#ece7dd",
    color: open ? "#fff" : "#888",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1,
    transition: "background 0.18s, transform 0.22s",
    transform: open ? "rotate(45deg)" : "none",
  };

  return (
    <div style={{ borderBottom: "1px solid #f4f0e8" }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", background: "none", border: "none", cursor: "pointer",
          fontFamily: "'Sora', sans-serif", padding: "18px 0",
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
          textAlign: "left",
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 14, color: "#111", lineHeight: 1.5, flex: 1 }}>{item.q}</span>
        <span style={toggleIconStyle}>+</span>
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

/* --- Main page ----------------------------------------- */
export default function FAQPage() {
  const [search, setSearch] = useState("");

  const filtered: Section[] = search.trim()
    ? sections
      .map(s => ({ ...s, items: s.items.filter(i => i.q.toLowerCase().includes(search.toLowerCase())) }))
      .filter(s => s.items.length > 0)
    : sections;

  return (
    <>
      <style>{CSS}</style>
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
              Everything you need to know about how PriceZen works, what is included, and how to get started.
            </p>
          </div>

          {/* Search */}
          <div className="ha h2" style={{ marginBottom: 44, position: "relative" }}>
            <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#ccc", display: "flex" }}>
              <Search size={18} />
            </span>
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
              onBlur={e => { e.currentTarget.style.borderColor = "#d4cfc2"; e.currentTarget.style.boxShadow = "none"; }}
            />
            {search && (
              <button type="button" onClick={() => setSearch("")} style={{
                position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", color: "#ccc",
                display: "flex", alignItems: "center", justifyContent: "center",
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

          {/* Bottom CTA */}
          <div className="reveal" style={{ background: "#111", borderRadius: 18, padding: "32px", textAlign: "center", border: "1px solid #222", marginTop: 48 }}>
            <p style={{ fontSize: 12, color: "#888", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>Still have a question?</p>
            <p style={{ fontSize: 16, color: "#fff", fontWeight: 700, lineHeight: 1.7, maxWidth: 440, margin: "0 auto 20px" }}>
              We typically respond within a few hours on weekdays. No bots, no ticket queue, just us.
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
