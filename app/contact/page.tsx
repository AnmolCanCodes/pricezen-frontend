"use client";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ConsentGuard from "@/components/ConsentGuard";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Replace with your API endpoint or mailto
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <>
      <main style={{ fontFamily: "'Sora', sans-serif", background: "#faf8f3", minHeight: "100vh" }}>

        {/* Nav */}
        <Navbar />

        <div style={{ maxWidth: 1040, margin: "0 auto", padding: "64px clamp(20px,4vw,48px) 96px" }}>

          {/* Hero text */}
          <div className="fade-in" style={{ textAlign: "center", marginBottom: 64 }}>
            {/* Warm icon */}
            <div style={{ width: 64, height: 64, borderRadius: 20, background: "#fef3d8", border: "1.5px solid #f0dcaa", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 20px" }}>✉️</div>
            <h1 style={{ fontSize: "clamp(32px,5vw,54px)", fontWeight: 900, letterSpacing: -1.5, marginBottom: 14, color: "#0f0f0f" }}>
              We&apos;re here for you,{" "}
              <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", color: "#b85c1a" }}>Always.</span>
            </h1>
            <p style={{ fontSize: 15, color: "#666", maxWidth: 520, margin: "0 auto", lineHeight: 1.8 }}>
              Have a question about your plan, need help with setup, or just want to chat about your pricing strategy? We respond to every message :- usually within a few hours.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 28 }}>

            {/* Left — contact details */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Warm message card */}
              <div className="fade-in d1" style={{ background: "#111", borderRadius: 20, padding: "32px 28px", color: "#fff" }}>
                <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#c9a84c", marginBottom: 14 }}>Talk to us</p>
                <p style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.6, marginBottom: 16 }}>
                  You built your brand from scratch.<br />
                  <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", color: "#f0c040" }}>Pricing shouldn&apos;t be a guessing game.</span>
                </p>
                <p style={{ fontSize: 13, color: "#888", lineHeight: 1.75 }}>
                  Whether you&apos;re a solo founder tracking 5 products or a growing team managing multiple categories :- we&apos;re here to help you get the most out of PriZen.
                </p>
              </div>

              {/* Contact details */}
              {[
                {
                  icon: "📧",
                  label: "Email us",
                  value: "prizenalert@gmail.com",
                  sub: "We reply within a few hours",
                  href: "mailto:prizenalert@gmail.com",
                },
                
                {
                  icon: "📍",
                  label: "Based in",
                  value: "India 🇮🇳",
                  sub: "Serving brands nationwide",
                  href: null,
                },
              ].map((item, i) => (
                <div key={i} className={`fade-in d${i + 2}`} style={{ background: "#fff", border: "1px solid #ece7dd", borderRadius: 16, padding: "20px 22px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5, color: "#bbb", marginBottom: 3 }}>{item.label}</p>
                    {item.href ? (
                      <a href={item.href} style={{ fontSize: 14, fontWeight: 700, color: "#111", display: "block", marginBottom: 2 }}>{item.value}</a>
                    ) : (
                      <p style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 2 }}>{item.value}</p>
                    )}
                    <p style={{ fontSize: 11, color: "#6e6e6e" }}>{item.sub}</p>
                  </div>
                </div>
              ))}

              {/* Response time badge */}
              <div className="fade-in d4" style={{ background: "#f0faf4", border: "1px solid #bbdfc8", borderRadius: 14, padding: "16px 20px", display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#1a6640", flexShrink: 0, display: "inline-block" }} />
                <p style={{ fontSize: 13, color: "#1a6640", fontWeight: 600 }}>
                  Average reply time: <strong>under 4 hours</strong> on business days.
                </p>
              </div>
            </div>

            {/* Right — contact form */}
            <div className="fade-in d2" style={{ background: "#fff", border: "1px solid #ece7dd", borderRadius: 20, padding: "32px 28px" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, color: "#111" }}>Message sent!</h3>
                  <p style={{ fontSize: 13, color: "#888", lineHeight: 1.7 }}>We&apos;ve received your message and will get back to you at <strong>{form.email}</strong> within a few hours.</p>
                </div>
              ) : (
                <ConsentGuard formId="contact-form">
                <form id="contact-form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#bbb", marginBottom: 4 }}>Send us a message</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 11, color: "#888", fontWeight: 700, marginBottom: 5 }}>Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Priya Sharma"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      style={{
                        width: "100%",
                        padding: "11px 13px",
                        border: "1px solid #e4ddd0",
                        borderRadius: 9,
                        background: "#fff",
                        fontFamily: "'Sora',sans-serif",
                        fontSize: 13,
                        color: "#1a1a1a",
                        outline: "none",
                        transition: "border-color 0.18s, box-shadow 0.18s"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#c9a84c";
                        e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.13)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e4ddd0";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, color: "#888", fontWeight: 700, marginBottom: 5 }}>Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@brand.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      style={{
                        width: "100%",
                        padding: "11px 13px",
                        border: "1px solid #e4ddd0",
                        borderRadius: 9,
                        background: "#fff",
                        fontFamily: "'Sora',sans-serif",
                        fontSize: 13,
                        color: "#1a1a1a",
                        outline: "none",
                        transition: "border-color 0.18s, box-shadow 0.18s"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#c9a84c";
                        e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.13)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e4ddd0";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, color: "#888", fontWeight: 700, marginBottom: 5 }}>Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Question about Growth plan"
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      style={{
                        width: "100%",
                        padding: "11px 13px",
                        border: "1px solid #e4ddd0",
                        borderRadius: 9,
                        background: "#fff",
                        fontFamily: "'Sora',sans-serif",
                        fontSize: 13,
                        color: "#1a1a1a",
                        outline: "none",
                        transition: "border-color 0.18s, box-shadow 0.18s"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#c9a84c";
                        e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.13)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e4ddd0";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, color: "#888", fontWeight: 700, marginBottom: 5 }}>Message *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us what's on your mind :- we read every message."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      style={{
                        width: "100%",
                        padding: "11px 13px",
                        border: "1px solid #e4ddd0",
                        borderRadius: 9,
                        background: "#fff",
                        fontFamily: "'Sora',sans-serif",
                        fontSize: 13,
                        color: "#1a1a1a",
                        outline: "none",
                        resize: "none",
                        transition: "border-color 0.18s, box-shadow 0.18s"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#c9a84c";
                        e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.13)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e4ddd0";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{ width: "100%", padding: "14px", background: "#1a1a1a", color: "#fff", border: "none", borderRadius: 12, fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", letterSpacing: 0.4, transition: "background 0.18s" }}
                  >
                    {loading ? <><span className="spinner" />Sending...</> : "Send Message →"}
                  </button>
                  <p style={{ fontSize: 11, color: "#ccc", textAlign: "center" }}>We never share your email. Ever.</p>
                </form>
                </ConsentGuard>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}