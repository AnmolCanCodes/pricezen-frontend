"use client";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const TERMS_VERSION = "1.0.0";

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

export default function TermsOfServicePage() {
  return (
    <>
      <style>{CSS}</style>
      <main style={{ fontFamily: "'Sora',sans-serif", background: "#faf8f3", minHeight: "100vh" }}>
        <Navbar />

        <div style={{ maxWidth: 760, margin: "0 auto", padding: "56px clamp(20px,4vw,48px) 96px" }}>

          {/* Header */}
          <div className="fade-in" style={{ marginBottom: 36 }}>
            <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#b8872c", marginBottom: 10 }}>Legal</p>
            <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, letterSpacing: -1.2, marginBottom: 14, color: "#0f0f0f" }}>Terms of Service</h1>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: 11, background: "#f0faf4", color: "#1a6640", border: "1px solid #bbdfc8", borderRadius: 6, padding: "3px 10px", fontWeight: 700 }}>Version {TERMS_VERSION}</span>
              <span style={{ fontSize: 11, color: "#aaa" }}>Last updated: April 2026</span>
            </div>
          </div>

          {/* Terms body */}
          <div className="pp fade-in d1" style={{ background: "#fff", border: "1px solid #ece7dd", borderRadius: 18, padding: "32px 28px", marginBottom: 24 }}>

            <h2>1. Agreement</h2>
            <p>By accessing or using PriceZen (&ldquo;Service&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;), you (&ldquo;Client&rdquo;, &ldquo;you&rdquo;) agree to be bound by these Terms of Service. If you do not agree, do not use the service.</p>
            <p>These terms apply to both the Starter and Growth plans.</p>

            <h2>2. What the service provides</h2>
            <p>PriceZen is an automated price monitoring and reporting service. We:</p>
            <ul>
              <li>Monitor competitor product pages at the frequency specified by your plan.</li>
              <li>Deliver price change alerts and weekly/monthly reports to your registered email.</li>
              <li>Provide estimated rupee impact calculations based on your self-reported order volume.</li>
              <li>Deliver full price history data in all email reports.</li>
            </ul>
            <p>We do <strong>not</strong> guarantee completeness, accuracy, or uninterrupted availability of data. External factors such as website changes, blocking, or downtime may affect data collection. Our rupee impact estimates are indicative :- not financial advice.</p>

            <h2>3. Your responsibilities</h2>
            <ul>
              <li><strong>Accurate URLs:</strong> You must provide valid product and competitor URLs during onboarding.</li>
              <li><strong>Alert thresholds:</strong> Set the minimum % price change that reflects your actual business needs. Incorrect thresholds may cause missed alerts or alert fatigue.</li>
              <li><strong>Average weekly orders:</strong> Provide your real average sales per week. This directly affects all rupee impact calculations and monthly recommendations. Wrong order counts produce wrong rupee recommendations.</li>
              <li><strong>Third-party terms:</strong> You must not use the service to monitor prices in a way that violates any third-party website&apos;s terms of service.</li>
              <li><strong>Pricing decisions:</strong> You are solely responsible for any pricing decisions you make based on our reports.</li>
              <li><strong>No redistribution:</strong> You must not share, resell, or redistribute our reports or data to any third party.</li>
            </ul>

            <h2>4. Data Collection Responsibility</h2>
            <p>We act solely as a technical processor of publicly available data based on instructions provided by the client.</p>
            <p>You are responsible for ensuring that your use of this service complies with all applicable laws and third-party website terms.</p>

            <h2>5. Prohibited Use</h2>
            <p>You may not use this service for illegal activities, unauthorized data extraction, or in ways that may harm third-party platforms.</p>

            <h2>6. Service Activation</h2>
            <p>The service is considered active only after successful onboarding and confirmation from our side that monitoring has been configured.</p>
            <p>Delays in onboarding due to incomplete or incorrect data provided by the client do not qualify for refunds.</p>

            <h2>7. Pricing and Payment</h2>
            <p>Payments may be made via invoice or through secure third-party payment providers such as Razorpay.</p>
            <p>By completing a payment, you agree to the pricing, billing cycle, and plan details at the time of purchase.</p>
            <p>We do not store card or UPI details. Payment processing is handled by the respective provider.</p>
            <p>Failure to complete payment within the specified time may result in suspension of the service.</p>

            <h2>8. Payment Disputes</h2>
            <p>If you initiate a chargeback or payment dispute without first contacting us to resolve the issue, we reserve the right to suspend or terminate your service immediately.</p>
            <p>We will make reasonable efforts to resolve legitimate billing concerns.</p>

            <h2>9. Refund Policy</h2>
            <p>Fees are generally non-refundable once the service has been activated.</p>
            <p>However, if we are unable to deliver the service as described, you may contact us for resolution or a partial refund at our discretion.</p>

            <h2>10. Cancellation</h2>
            <ul>
              <li>You may cancel at any time by emailing us.</li>
              <li>Cancellations take effect at the end of the current billing month.</li>
              <li>Monthly fees already paid are non-refundable.</li>
            </ul>

            <h2>11. Service availability</h2>
            <p>We aim for high availability but do not guarantee 100% uptime. Scheduled maintenance, infrastructure issues, or force majeure events may cause temporary interruptions. We will communicate planned downtime in advance.</p>

            <h2>12. Termination</h2>
            <p>We reserve the right to suspend or terminate access to the service at our discretion in cases of misuse, non-payment, or violation of these terms.</p>

            <h2>13. Data and privacy</h2>
            <p>Our collection and use of your data is governed by our <Link href="/privacy-policy">Privacy Policy</Link>, which forms part of this agreement.</p>

            <h2>14. Limitation of liability</h2>
            <p>PriceZen provides pricing intelligence as a decision-support tool. We are not liable for any business decisions, lost revenue, or pricing losses you incur based on our reports.</p>
            <p><strong>Specifically, we are not liable for incorrect calculations or recommendations that result from inaccurate data you provide</strong> :- such as wrong average weekly orders, incorrect threshold settings, or invalid product URLs.</p>
            <p>Our total liability for any claim is capped at the fees you paid us in the calendar month in which the issue occurred.</p>

            <h2>15. Intellectual property</h2>
            <p>All reports, templates, and system outputs generated by PriceZen are provided for your <strong>internal business use only</strong>. You may not redistribute, publish, or sell any report or data derived from our service.</p>

            <h2>16. Changes to these terms</h2>
            <p>When we update these terms, we&apos;ll change the version number and notify all active clients by email at least <strong>14 days</strong> before changes take effect. Continued use after that date constitutes acceptance.</p>

            <h2>17. Governing law</h2>
            <p>These terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of courts in India.</p>

            <h2>18. Contact</h2>
            <p>Questions? <a href="mailto:pricezenalert@gmail.com">pricezenalert@gmail.com</a> or <Link href="/contact">Contact page</Link>.</p>

          </div>

          {/* Action links :- same pattern as privacy page */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/privacy-policy" style={{ display: "inline-block", background: "#fff", border: "1px solid #e4ddd0", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 700, color: "#333", textDecoration: "none" }}>Read Privacy Policy →</Link>
            <Link href="/contact" style={{ display: "inline-block", background: "#1a1a1a", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 700, color: "#fff", textDecoration: "none" }}>Contact Us →</Link>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}