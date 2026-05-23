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
            <p>PriceZen is a competitive pricing intelligence service built for D2C brands in India. We help you track competitor prices so you don't lose sales by being left behind. Payment processing is handled by authorized third-party payment gateways.</p>

            <h2>2. What data we collect</h2>
            <ul>
              <li><strong>Account data:</strong> Email, brand name, and plan type provided during onboarding.</li>
              <li><strong>Product data:</strong> URLs of your products and competitors&apos; products you ask us to monitor.</li>
              <li><strong>Alert thresholds:</strong> Minimum price change % you set per product. Used to trigger alerts when competitors breach that threshold.</li>
              <li><strong>Usage data:</strong> Average weekly order volume (only for rupee impact calculations, revenue at risk estimates, and margin opportunity recommendations in reports).</li>
              <li><strong>Compliance and consent records:</strong> Necessary information recorded when you accept our terms via the cookie banner, for legal verification and service security purposes.</li>
              <li><strong>Communication data:</strong> Messages from our contact form used to provide support.</li>
            </ul>

            <h2>3. What we do NOT collect</h2>
            <ul>
              <li><strong>No payment card details ever.</strong> Payments are processed through secure third-party providers. We never see or store your card, UPI, or banking information.</li>
              <li><strong>No tracking of your customers.</strong> We don't track people visiting your website. We don't use tracking pixels or analytics code on your site. We only know about your competitors' public product pages that you tell us to monitor.</li>
              <li><strong>We never sell your data.</strong> No advertisers get access. No data brokers. Your business information stays between you and us.</li>
            </ul>

            <h2>4. How we use your data</h2>
            <ul>
              <li>To send price change alerts based on your threshold % settings.</li>
              <li>To calculate rupee impact estimates and monthly intelligence reports.</li>
              <li>To generate revenue at risk and margin opportunity recommendations based on your average weekly orders.</li>
              <li>To respond to support messages and improve our service.</li>
              <li>To verify your consent and maintain legal compliance.</li>
            </ul>
            <p><strong>Important Disclaimer:</strong> All insights, estimates, and recommendations provided by PriceZen are for informational purposes only and should not be construed as financial, investment, business, or legal advice. We make no representations or warranties regarding the accuracy or completeness of any information. You acknowledge that any business decisions made based on information from PriceZen are made entirely at your own discretion and risk. PriceZen shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service or reliance on any information provided.</p>

            <h2>5. Your responsibility for data accuracy</h2>
            <p>For the best results from PriceZen, please ensure the information you provide is accurate:</p>
            <ul>
              <li><strong>Alert thresholds:</strong> The minimum % price change that matters to your business. If these are set incorrectly, you may miss important price changes or receive alerts you don't find useful.</li>
              <li><strong>Average weekly orders:</strong> Your actual average sales per week directly impacts the accuracy of rupee impact calculations and recommendations. We rely on this information as you provide it.</li>
            </ul>
            <p>PriceZen processes and uses data exactly as you provide it. We do not independently verify or validate the accuracy of the information you submit. We recommend reviewing your account settings periodically to ensure they reflect your current business needs.</p>

            <h2>6. Payments &amp; Billing</h2>
            <p>All payment processing is handled securely by authorized third-party payment gateways. PriceZen does not directly collect, process, store, or have access to your payment card, UPI, net banking, or any other banking details. Your payment information is transmitted directly to and processed by the payment gateway in accordance with its security standards.</p>
            <p>PriceZen only receives non-sensitive payment metadata from the payment provider, such as your name, email, and payment status (successful, failed, or pending). We use this information solely to confirm your subscription status and process your account accordingly.</p>
            <p>All billing inquiries, disputes, chargebacks, cancellations, and refunds are handled according to our Terms of Service and the applicable policies of the payment gateway.</p>

            <h2>7. Third-Party Services</h2>
            <p>We use trusted third-party services to operate our platform, including:</p>
            <ul>
              <li>Authorized payment gateways and payment processors</li>
              <li>Email delivery providers</li>
              <li>Hosting and infrastructure services</li>
            </ul>
            <p>These providers only process data as necessary to deliver the service and are not permitted to use your data for their own purposes.</p>

            <h2>8. Data storage and security</h2>
            <p>All your data is stored on secured servers protected by HTTPS/TLS encryption. Access is restricted to authorized team members only. We retain data only for as long as necessary to provide our service and fulfill your requests. Upon your request to delete your account or data, we remove it within 7 business days. Inactive accounts may be removed after a reasonable period. Regular backups are maintained for service continuity and security.</p>

            <h2>9. Your rights</h2>
            <ul>
              <li>You can request a complete copy of all the data we hold about you in a readable format.</li>
              <li>You can ask us to correct any data that's inaccurate or outdated.</li>
              <li>You can request deletion of your data ("right to be forgotten") and we'll remove it within 7 business days.</li>
              <li>You can withdraw your consent to data processing at any time by emailing us. If you do, we'll stop processing your personal data, though your existing subscription will pause and monitoring will stop.</li>
            </ul>
            <p>To exercise any of these rights, email <a href="mailto:pricezenalert@gmail.com">pricezenalert@gmail.com</a> with your request and we'll respond promptly.</p>

            <h2>10. How we record your consent</h2>
            <p>To comply with Indian data protection laws and provide you with a safe, secure service, we maintain a record of your consent. When you click &ldquo;Accept &amp; Continue&rdquo;, the following information is recorded for verification and compliance purposes:</p>
            <ul>
              <li><strong>Consent timestamp:</strong> The date and time of your acceptance. This helps us verify the timing of your consent agreement.</li>
              <li><strong>Policy version:</strong> Which version of our privacy policy you consented to (v{POLICY_VERSION}). This ensures we know exactly which terms you accepted.</li>
              <li><strong>Session information:</strong> Standard browser and device information (like browser type) for security verification purposes, ensuring your account remains protected from unauthorized access.</li>
              <li><strong>Access origin:</strong> Technical information used to prevent fraud and ensure service integrity.</li>
            </ul>
            <p>This consent record is stored securely and is kept only as long as legally required to demonstrate compliance. It protects both you and us by creating a transparent record of your agreement to our terms.</p>

            <h2>11. Policy changes</h2>
            <p>We may update this policy periodically to reflect changes in our practices, technology, or legal requirements. When we make material changes, we'll notify all active users via email at least 30 days before the changes take effect. Continued use of PriceZen after the new policy goes into effect constitutes your acceptance of the updated terms. If you disagree with any changes, you may cancel your subscription.</p>

            <h2>12. Jurisdiction</h2>
            <p>This Privacy Policy is governed by the laws of India.</p>

            <h2>13. Contact</h2>
            <p>Questions? <a href="mailto:pricezenalert@gmail.com">pricezenalert@gmail.com</a> or <Link href="/contact">Contact page</Link>.</p>
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
