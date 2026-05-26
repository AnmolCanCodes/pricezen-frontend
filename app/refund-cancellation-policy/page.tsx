// app/refund-cancellation-policy/page.tsx
"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const POLICY_VERSION = "1.1.0";

export default function RefundCancellationPolicyPage() {
  return (
    <>
      <main className="policy-page">
        <Navbar />

        <div className="policy-container">

          {/* Header */}
          <div className="fade-in policy-header">
            <p className="policy-label">Legal</p>
            <h1 className="policy-title">Refund & Cancellation Policy</h1>
            <div className="policy-meta">
              <span className="policy-version-badge">Version {POLICY_VERSION}</span>
              <span className="policy-updated">Last updated: May 2026</span>
            </div>
          </div>

          {/* Policy body */}
          <div className="fade-in d1 policy-content">

            <h2>1. Introduction</h2>
            <p><strong>PriceZen</strong> is a subscription-based pricing intelligence platform for e-commerce brands and retailers in India. This policy outlines our refund and cancellation practices.</p>
            <p>Payments are processed securely through authorized payment gateways. We don't store your payment card or banking details directly. All transactions follow industry-standard security protocols.</p>

            <h2>2. Subscription Plans & Recurring Billing</h2>
            <p>PriceZen offers the following subscription plans:</p>
            <ul>
              <li><strong>Starter Plan:</strong> ₹999 per month</li>
              <li><strong>Growth Plan:</strong> ₹2,499 per month</li>
            </ul>
            <p><strong>Free Trial Option:</strong> A 10-day free trial is available for eligible users. The free trial carries no charge and this policy applies only to paid subscriptions.</p>
            <p>All paid subscriptions are subject to <strong>recurring monthly billing</strong>. Your subscription will automatically renew at the end of each billing cycle unless you submit a formal cancellation request prior to the renewal date. Billing occurs on the same calendar date each month as your initial subscription date.</p>
            <p>You will receive payment confirmation and itemized invoice details via email at your registered address following each successful transaction. You are responsible for ensuring your payment method remains valid and current to prevent service interruption or declined charges.</p>

            <h2>3. Service Activation & Onboarding</h2>
            <p>Subscription payment alone does not activate your service. PriceZen requires manual onboarding and setup before monitoring begins. Service activation requires:</p>
            <ul>
              <li>Successful payment processing through our payment gateway.</li>
              <li>Submission of required onboarding information (product URLs, competitor URLs, price thresholds, order volume).</li>
              <li>Technical configuration and verification of your monitoring setup.</li>
              <li>Email confirmation of successful activation to your registered address.</li>
            </ul>
            <p>Standard activation completes within 2–5 business days of submitting complete information. Delays caused by incomplete or inaccurate submissions will extend this timeline.</p>

            <h2>4. Refund Eligibility: Within 7 Days of Payment (Full Refund)</h2>
            <p>If you wish to request a refund <strong>within 7 days of your original payment date</strong>, the following conditions apply:</p>
            <ul>
              <li>The refund request must be submitted within <strong>7 calendar days</strong> from the date payment was processed.</li>
              <li>Service activation must not be complete; no active monitoring configuration should be operational on your behalf.</li>
              <li>Your written request must clearly articulate the reason for the refund and cancellation.</li>
              <li>PriceZen will review your request and provide a formal response within <strong>5 to 7 business days</strong> of receipt.</li>
            </ul>
            <p>If your refund request is approved, funds will be processed back to your original payment method via our authorized payment gateway. Actual crediting of funds to your account depends upon your bank or payment provider's processing timeline and may require 5–10 additional business days.</p>

            <h2>5. Refund Eligibility: After 7 Days (Partial Refund)</h2>
            <p>Refund requests submitted after the 7-day window are subject to the following terms:</p>
            <ul>
              <li>Partial refunds are not calculated on a daily or pro-rata basis for unused service days.</li>
              <li>If approved, PriceZen may refund 50% of the original monthly subscription amount for that billing period.</li>
              <li>The retained 50% covers monitoring infrastructure costs, data collection services, reports already delivered, technical configuration work, and service setup expenses incurred on your behalf.</li>
              <li>Whether a partial refund is approved depends upon review of your specific circumstances and is made at PriceZen's sole discretion.</li>
            </ul>
            <p>All requests must be submitted in writing to <strong>pricezenalert@gmail.com</strong> with your registered account email, billing details, and complete justification for the refund claim.</p>

            <h2>6. Non-Refundable Situations</h2>
            <p>The following categories of charges and circumstances are expressly <strong>non-refundable</strong> and cannot be disputed or reversed:</p>
            <ul>
              <li><strong>Active service deployment:</strong> Once monitoring setup is confirmed active and operational, all subscription fees become non-refundable. This includes any portion of the current billing cycle that has already commenced.</li>
              <li><strong>Data submission errors:</strong> If you provide incorrect, incomplete, unverifiable, or malformed product URLs, competitor URLs, or order volume data that prevents proper technical configuration or monitoring deployment.</li>
              <li><strong>Invalid or inaccessible URLs:</strong> If submitted URLs are broken, no longer accessible, do not resolve to valid product pages, or lead to restricted-access websites.</li>
              <li><strong>Client-attributable delays:</strong> Delays in providing mandatory onboarding information, responding to configuration requests, or clarifying monitoring requirements that are caused by your actions or inactions.</li>
              <li><strong>Partial usage periods:</strong> If you cancel after monitoring setup is complete, no prorated refunds, credits, or service extensions are issued for unused days within the current billing cycle.</li>
              <li><strong>Third-party website restrictions:</strong> If target websites implement technical blocks, rate limiting, or blocking measures, or if their terms of service prohibit monitoring. PriceZen bears no liability for external website unavailability, access restrictions, or blocking.</li>
              <li><strong>Service suspension for violations:</strong> If your service is suspended or terminated due to violation of our Terms of Service, misuse of the platform, or breach of acceptable use policies.</li>
              <li><strong>Free trial usage:</strong> No refunds or charges are applicable to the complimentary 10-day free trial period.</li>
            </ul>

            <h2>7. Subscription Cancellation</h2>
            <p>You may cancel your PriceZen subscription at any time without penalty. To initiate cancellation:</p>
            <ul>
              <li>Send a written request to <strong>pricezenalert@gmail.com</strong> clearly stating your intent to cancel.</li>
              <li>Include your registered account email address and subscription plan details.</li>
              <li>To prevent the next monthly recurring charge, submit your cancellation request sufficiently in advance of your billing renewal date (typically at least 5 days prior).</li>
            </ul>
            <p>Cancellation requests received on or after your billing renewal date cannot prevent that month's charge from being processed. You will receive written email confirmation of your cancellation within 1 business day. Your subscription access and monitoring services will terminate at the conclusion of your current billing cycle.</p>

            <h2>8. Refund Request Procedure & Timeline</h2>
            <p>Submit refund requests in writing to <strong>pricezenalert@gmail.com</strong> with:</p>
            <ul>
              <li>Your registered account email address.</li>
              <li>Transaction reference number or invoice ID.</li>
              <li>Subscription plan and amount.</li>
              <li>Reason for the refund request.</li>
            </ul>
            <p><strong>Processing timeline:</strong></p>
            <ul>
              <li>Initial Review: 5–7 business days.</li>
              <li>Approval Processing: Refunds processed within 1 business day of approval.</li>
              <li>Bank Settlement: 5–10 additional business days (varies by your bank).</li>
            </ul>
            <p>If funds haven't appeared 10 business days after approval, contact your bank to verify processing status.</p>

            <h2>9. Payment Disputes & Chargebacks</h2>
            <p>If you believe there's an issue with a charge, please contact us first at <strong>pricezenalert@gmail.com</strong> to resolve it directly. We can often resolve payment disputes quickly through communication.</p>
            <p>If you initiate a chargeback or dispute through your bank without first contacting us:</p>
            <ul>
              <li>We will provide transaction records, service agreements, and evidence of services rendered to your bank.</li>
              <li>Your account may be suspended while the dispute is under review.</li>
            </ul>
            <p>Resolving disputes directly with us is faster and simpler than the chargeback process. Please reach out if you have any billing concerns.</p>

            <h2>10. Service Availability, Downtime & Force Majeure</h2>
            <p><strong>Unplanned Downtime:</strong> If PriceZen experiences unplanned service disruption or data collection failures lasting more than 7 consecutive days, we will offer either a service credit for your next billing cycle or a refund of the affected period's fees (at your request).</p>
            <p><strong>Payment Processing:</strong> If your payment method fails during renewal, we will retry within 3 business days. If payment continues to fail, your service will be suspended. Service reactivation requires updating your payment method and reprocessing payment.</p>
            <p><strong>Force Majeure:</strong> PriceZen is not liable for service interruptions caused by circumstances beyond our reasonable control, including natural disasters, government actions, war, terrorism, pandemics, internet infrastructure failures, or third-party vendor failures. During such events, we will make reasonable efforts to restore service but will not provide refunds or credits for losses resulting from these external events.</p>

            <h2>11. Policy Modifications & Updates</h2>
            <p>PriceZen reserves the right to modify this Refund & Cancellation Policy at any time. Material changes will be communicated to all active subscribers via email. For changes that materially affect refund eligibility or reduce your consumer protections, we will provide at least 30 days' advance notice.</p>
            <p>Your continued use of PriceZen following the effective date of policy modifications constitutes your acceptance of the revised terms. If you do not accept proposed modifications, you may cancel your subscription without penalty within the notice period.</p>

            <h2>12. Customer Support & Grievance Redressal</h2>
            <p>For refund requests, cancellations, billing inquiries, or disputes, contact us:</p>
            <ul>
              <li><strong>Email:</strong> pricezenalert@gmail.com</li>
              <li><strong>Response Time:</strong> Within 1 business day (Monday–Friday, excluding Indian national holidays)</li>
              <li><strong>Include:</strong> Your account email, subscription plan, transaction ID (if available), and request details</li>
            </ul>
            <p>Refund and cancellation requests must be submitted in writing via email to be considered valid.</p>

            <h2>13. Governing Law & Jurisdiction</h2>
            <p>This policy is governed by the laws of the Republic of India. Both parties consent to the exclusive jurisdiction of the courts located in Maharashtra for any legal disputes arising from this policy or our subscription service.</p>
            <p>This policy is designed to align with Indian consumer protection laws and subscription billing best practices. We commit to fair treatment of all customers in accordance with the Consumer Protection Act, 2019.</p>

            <div className="policy-alert-box" style={{ marginTop: 24 }}>
              <p><strong>Quick Reference:</strong> Refund and cancellation requests must be submitted via email to pricezenalert@gmail.com with your account email and relevant details. Include all necessary information to help us process your request quickly.</p>
            </div>

          </div>

          {/* Footer spacing */}
          <div style={{ marginTop: 48 }}></div>

        </div>

        <Footer />
      </main>
    </>
  );
}
