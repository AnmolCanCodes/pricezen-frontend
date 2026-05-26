// app/privacy-policy/page.tsx
"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const POLICY_VERSION = "1.0.0";

export default function PrivacyPolicyPage() {
  return (
    <>
      <main className="policy-page">
        <Navbar />

        <div className="policy-container">

          {/* Header */}
          <div className="fade-in policy-header">
            <p className="policy-label">Legal</p>
            <h1 className="policy-title">Privacy Policy</h1>
            <div className="policy-meta">
              <span className="policy-version-badge">Version {POLICY_VERSION}</span>
              <span className="policy-updated">Last updated: May 2026</span>
            </div>
          </div>

          {/* Policy body */}
          <div className="fade-in d1 policy-content">

            <h2>1. Introduction</h2>
            <p><strong>PriceZen</strong> is a subscription-based pricing intelligence platform for e-commerce brands and retailers in India. We offer a 10-day free trial and monthly subscription plans (Starter: ₹999/month, Growth: ₹2,499/month). The platform enables businesses to monitor publicly available competitor pricing, receive automated alerts, and access pricing intelligence reports.</p>
            <p>This Privacy Policy explains how we collect, use, store, and protect your information. By using PriceZen, you agree to the collection and use of information as described here.</p>

            <h2>2. Information We Collect</h2>
            <p>To provide our services, we collect the following types of information:</p>
            <ul>
              <li><strong>Account Information:</strong> Business or brand name, email address, subscription plan details, and free trial status.</li>
              <li><strong>Product & Monitoring Data:</strong> Product URLs submitted for monitoring,Competitor product URLs provided by users ,Configured pricing thresholds and monitoring preferences.</li>
              <li><strong>Alert thresholds:</strong> Minimum price change % you set per product. Used to trigger alerts when competitors breach that threshold.</li>
              <li><strong>Business Metrics Provided by Users</strong> Average weekly order volume (Business-related operational inputs used for generating analytical estimates and reports).</li>
              <li><strong>Technical & Usage Information:</strong> Device and browser information, Log data required for security, fraud prevention, and service reliability, Consent and compliance records associated with acceptance of our policies.</li>
              <li><strong>Support & Communication Data:</strong> Information submitted through contact forms, email communication, or support requests.</li>
            </ul>

            <h2>3. Information We Do Not Collect</h2>
            <p>We do not collect or store:</p>
            <ul>
              <li>Payment card information or banking credentials.</li>
              <li>Your UPI, net banking, or wallet details.</li>
              <li>End-customer or user data from your e-commerce store.</li>
              <li>Personal data beyond what's needed to operate the service.</li>
            </ul>
            <p>All payment transactions are securely processed by authorized third-party payment providers like Razorpay.</p>

            <h2>4. How We Use Information</h2>
            <p>We use collected information for the following purposes:</p>
            <ul>
              <li>Providing and operating the PriceZen service (monitoring, alerts, reports).</li>
              <li>Monitoring competitor pricing data you submit for tracking.</li>
              <li>Generating pricing estimates and market insights based on your provided metrics.</li>
              <li>Processing subscriptions, recurring monthly billing, and verifying payment status through Razorpay.</li>
              <li>Responding to your support requests and managing cancellations or refunds.</li>
              <li>Sending alert notifications and periodic reports via email.</li>
              <li>Improving service reliability, security, and performance.</li>
              <li>Maintaining legal and regulatory compliance with Indian consumer protection laws.</li>
            </ul>
            <p><strong>Analytics & Informational Disclaimer:</strong> PriceZen provides automated pricing intelligence, estimates, and business insights based on user-provided information and publicly accessible market data.

              All reports, estimates, recommendations, and analytics are provided solely for informational purposes and should not be interpreted as financial, investment, legal, accounting, or business advice.

              Users remain solely responsible for evaluating and implementing any pricing or commercial decisions based on the information provided through the service.</p>

              <p>PriceZen does not guarantee the accuracy, completeness, or uninterrupted availability of any monitored data, reports, or analytical outputs.

              To the maximum extent permitted under applicable law, PriceZen shall not be liable for any indirect, incidental, consequential, special, or business losses arising from the use of the service.</p>

            <h2>5. User Responsibility</h2>
            <p>You are responsible for ensuring that all information you submit to PriceZen is accurate, lawful, and current.</p>
            <p>We rely on your inputs (product URLs, competitor URLs, price thresholds, order volume data) to generate alerts and reports. Inaccurate or outdated information will result in inaccurate monitoring and analysis. We are not liable for issues caused by inaccurate data you provide.</p>

            <h2>6. Payments &amp; Billing</h2>
            <p>All payment processing is handled securely by authorized third-party payment gateways. PriceZen does not directly collect, process, store, or have access to your payment card, UPI, net banking, or any other banking details. Your payment information is transmitted directly to and processed by the payment gateway in accordance with its security standards.</p>
            <p>PriceZen only receives non-sensitive payment metadata from the payment provider, such as your name, email, and payment status (successful, failed, or pending). We use this information solely to confirm your subscription status and process your account accordingly.</p>
            <p>All billing inquiries, disputes, chargebacks, cancellations, and refunds are handled according to our Terms of Service and the applicable policies of the payment gateway.</p>

            <h2>7. Third-Party Services</h2>
            <p>We use trusted third-party services to operate our platform:</p>
            <ul>
              <li><strong>Payment Processing:</strong> Razorpay and other authorized payment gateways process your subscription payments. They do not share your card details with us.</li>
              <li><strong>Email Delivery:</strong> Third-party email providers deliver your alerts and reports.</li>
              <li><strong>Hosting & Infrastructure:</strong> Cloud providers host our servers and data.</li>
              <li><strong>Third-Party Websites:</strong> We access and monitor publicly available pricing information from competitor websites per your instructions.</li>
            </ul>
            <p>These providers process data only as necessary to deliver the service and are not permitted to use your data for their own purposes. We are not responsible for their privacy practices.</p>

            <h2>8. Data Storage and Retention</h2>
            <p><strong>Security:</strong> All your data is stored on secured servers protected by HTTPS/TLS encryption. Access is restricted to authorized team members only. Regular backups are maintained for service continuity and security.</p>
            <p><strong>Data Retention:</strong> We retain your account data and service information only while your subscription is active. If your subscription is cancelled or terminates, we retain data for 90 days to comply with billing and legal requirements. Upon your formal request to delete your account or data, we remove it within 7 business days. Inactive accounts (no login for 1+ year) may be removed after we attempt to notify you. Consent and compliance records are retained as required by law.</p>

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

            <h2>11. Policy Changes</h2>
            <p>We may update this policy periodically to reflect changes in our practices, technology, or legal requirements. When we make material changes that affect your privacy rights or data handling, we'll notify all active users via email at least 30 days before the changes take effect. Continued use of PriceZen after the new policy goes into effect constitutes your acceptance of the updated terms. If you disagree with any changes, you may cancel your subscription without penalty within the notice period.</p>

            <h2>12. Jurisdiction</h2>
            <p>This Privacy Policy is governed by the laws of the Republic of India. Any disputes will be subject to the exclusive jurisdiction of the courts in Maharashtra.</p>

            <h2>13. Contact & Support</h2>
            <p>For questions about this Privacy Policy or your data, contact us:</p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:pricezenalert@gmail.com">pricezenalert@gmail.com</a></li>
              <li><strong>Response Time:</strong> We typically respond within 1–2 business days (Monday–Friday, excluding Indian national holidays)</li>
            </ul>
          </div>

          {/* Footer spacing */}
          <div style={{ marginTop: 48 }}></div>

        </div>

        <Footer />
      </main>
    </>
  );
}

