// app/privacy-policy/page.tsx
"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const POLICY_VERSION = "1.0.0";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#faf8f3;color:#1a1a1a;-webkit-font-smoothing:antialiased;}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.fade-in{animation:fadeUp 0.5s ease both;}
.d1{animation-delay:0.08s}
.pp h2{font-size:16px;font-weight:800;color:#111;margin:28px 0 10px;padding-top:28px;border-top:1px solid #ede8de;}
.pp h2:first-child{margin-top:0;padding-top:0;border-top:none;}
.pp p{font-size:13.5px;color:#555;line-height:1.85;margin-bottom:10px;}
.pp ul{padding-left:20px;margin-bottom:12px;}
.pp ul li{font-size:13.5px;color:#555;line-height:1.85;margin-bottom:5px;}
.pp a{color:#b8872c;text-decoration:none;}
.pp a:hover{text-decoration:underline;}
.pp strong{color:#333;}
code{background:#f6f3ee;padding:1px 6px;border-radius:4px;font-size:12px;color:#333;}
`;

export default function PrivacyPolicyPage() {
  return (
    <>
      <style>{CSS}</style>
      <main style={{ fontFamily: "'Sora',sans-serif", background: "#faf8f3", minHeight: "100vh" }}>
        <Navbar />

        <div style={{ maxWidth: 760, margin: "0 auto", padding: "56px clamp(20px,4vw,48px) 96px" }}>

          {/* Header */}
          <div className="fade-in" style={{ marginBottom: 36 }}>
            <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#b8872c", marginBottom: 10 }}>Legal</p>
            <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, letterSpacing: -1.2, marginBottom: 14, color: "#0f0f0f" }}>Privacy Policy</h1>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: 11, background: "#f0faf4", color: "#1a6640", border: "1px solid #bbdfc8", borderRadius: 6, padding: "3px 10px", fontWeight: 700 }}>Version {POLICY_VERSION}</span>
              <span style={{ fontSize: 11, color: "#aaa" }}>Last updated: April 2026</span>
            </div>
          </div>          

          {/* Policy body */}
          <div className="pp fade-in d1" style={{ background: "#fff", border: "1px solid #ece7dd", borderRadius: 18, padding: "32px 28px", marginBottom: 24 }}>

            <h2>1. Who we are</h2>
            <p>PriZen is a competitive pricing intelligence service for D2C brands in India. Operated by PriZen (independent service). Billing and compliance are handled under the legally registered name associated with our payment provider.</p>

            <h2>2. What data we collect</h2>
            <ul>
              <li><strong>Account data:</strong> Email, brand name, and plan type provided during onboarding.</li>
              <li><strong>Product data:</strong> URLs of your products and competitors&apos; products you ask us to monitor.</li>
              <li><strong>Alert thresholds:</strong> Minimum price change % you set per product. Used to trigger alerts when competitors breach that threshold.</li>
              <li><strong>Usage data:</strong> Average weekly order volume (only for rupee impact calculations, revenue at risk estimates, and margin opportunity recommendations in reports).</li>
              <li><strong>Consent records:</strong> Timestamp, IP, browser, and policy version when you accept via the cookie banner.</li>
              <li><strong>Communication data:</strong> Messages from our contact form.</li>
            </ul>

            <h2>3. What we do NOT collect</h2>
            <ul>
              <li>No payment card details :- payments handled via secure third-party providers.</li>
              <li>No tracking of your website visitors. No tracking pixels.</li>
              <li>We never sell your data. No advertisers. No AI training on your data.</li>
            </ul>

            <h2>4. How we use your data</h2>
            <ul>
              <li>To send price change alerts based on your threshold % settings.</li>
              <li>To calculate rupee impact estimates and monthly intelligence reports.</li>
              <li>To generate revenue at risk and margin opportunity recommendations based on your average weekly orders.</li>
              <li>To respond to support messages.</li>
              <li>To verify your consent (legal compliance).</li>
            </ul>
            <p><strong>Disclaimer:</strong> All insights, estimates, and recommendations provided are for informational purposes only and should not be considered financial or business advice. We are not liable for decisions made based on this information.</p>

            <h2>5. Your responsibility for data accuracy</h2>
            <p><strong>You are responsible for providing accurate information about:</strong></p>
            <ul>
              <li><strong>Alert thresholds:</strong> The minimum % price change that matters to your business. Incorrect thresholds may cause you to miss important price changes or receive unnecessary alerts.</li>
              <li><strong>Average weekly orders:</strong> Your actual average sales per week. This directly affects all rupee impact calculations and business recommendations in your reports. Inaccurate order counts will produce incorrect revenue projections and margin recommendations.</li>
            </ul>
            <p>We store and use this data as you provide it. We do not validate or verify it independently. Any business decisions you make based on calculations derived from inaccurate data are at your own risk.</p>

            <h2>6. Payments &amp; Billing</h2>
            <p>Payments are processed securely via third-party payment providers such as Razorpay. We do not store your card, UPI, or banking details on our servers.</p>
            <p>We only receive limited payment-related information such as your name, email, and payment status (successful/failed) from the payment provider.</p>
            <p>All billing, disputes, and refunds are handled according to our Terms of Service and the policies of the payment provider.</p>

            <h2>7. Third-Party Services</h2>
            <p>We use trusted third-party services to operate our platform, including:</p>
            <ul>
              <li>Payment processors (e.g., Razorpay)</li>
              <li>Email delivery providers</li>
              <li>Hosting and infrastructure services</li>
            </ul>
            <p>These providers only process data as necessary to deliver the service and are not permitted to use your data for their own purposes.</p>

            <h2>8. Data storage and security</h2>
            <p>Stored on secured servers with HTTPS/TLS encryption. Access restricted to authorised personnel. We retain data only as long as necessary to provide the service. Inactive accounts may be removed after a reasonable period even without a deletion request. Data deleted within 30 days of cancellation upon written request.</p>

            <h2>9. Your rights</h2>
            <ul>
              <li>Request a copy of all data we hold about you.</li>
              <li>Correct inaccurate data.</li>
              <li>Request deletion of your data (&ldquo;right to be forgotten&rdquo;).</li>
              <li>Withdraw consent at any time (terminates the service).</li>
            </ul>
            <p>Email <a href="mailto:prizenalert@gmail.com">prizenalert@gmail.com</a> to exercise any of these rights.</p>

            <h2>10. What we log when you accept the cookie banner</h2>
            <p>When you click &ldquo;Accept &amp; Continue&rdquo;, we record:</p>
            <ul>
              <li><strong>Timestamp:</strong> Exact date and time to the millisecond.</li>
              <li><strong>Policy Version:</strong> Which version you agreed to (currently v{POLICY_VERSION}).</li>
              <li><strong>IP Address:</strong> Recorded server-side :- never sent from your browser.</li>
              <li><strong>Acceptance Method:</strong> <code>cookie-banner-click</code></li>
              <li><strong>Browser / Device:</strong> Your browser&apos;s user-agent string.</li>
            </ul>
            <p>This information is stored as a record of your consent. The record is stored in our database and can be produced as legal evidence.</p>

            <h2>11. Policy changes</h2>
            <p>When we update this policy, the version number changes and all active users are notified by email. Continued use after notification constitutes acceptance.</p>

            <h2>12. Jurisdiction</h2>
            <p>This Privacy Policy is governed by the laws of India.</p>

            <h2>13. Contact</h2>
            <p>Questions? <a href="mailto:prizenalert@gmail.com">prizenalert@gmail.com</a> or <Link href="/contact">Contact page</Link>.</p>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/terms-of-service" style={{ display: "inline-block", background: "#fff", border: "1px solid #e4ddd0", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 700, color: "#333", textDecoration: "none" }}>Read Terms of Service →</Link>
            <Link href="/contact" style={{ display: "inline-block", background: "#1a1a1a", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 700, color: "#fff", textDecoration: "none" }}>Contact Us →</Link>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}