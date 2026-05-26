// app/terms-of-service/page.tsx
"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TERMS_VERSION = "2.0.0";

export default function TermsOfServicePage() {
  return (
    <>
      <main className="policy-page">
        <Navbar />

        <div className="policy-container">

          {/* Header */}
          <div className="fade-in policy-header">
            <p className="policy-label">Legal</p>
            <h1 className="policy-title">Terms of Service</h1>
            <div className="policy-meta">
              <span className="policy-version-badge">Version {TERMS_VERSION}</span>
              <span className="policy-updated">Last updated: May 2026</span>
            </div>
          </div>

          {/* Terms body */}
          <div className="fade-in d1 policy-content">

            <h2>1. Acceptance of Terms</h2>
            <p>These Terms constitute a binding agreement between you and PriceZen. By accessing or using the Service, you agree to be bound by all terms and conditions herein.</p>
            <p>If you do not accept these Terms, you may not use the Service. Your continued use signifies your acceptance of any updates we make. We recommend reviewing these Terms periodically.</p>

            <h2>2. Description of Service</h2>
            <p>PriceZen is a subscription-based pricing intelligence platform for e-commerce businesses. The Service monitors publicly accessible competitor pricing and delivers alerts and reports via email.</p>
            <p><strong>What We Provide:</strong></p>
            <ul>
              <li>Automated monitoring of publicly accessible competitor product pages.</li>
              <li>Price change alerts delivered to your email.</li>
              <li>Analytical reports (weekly and monthly) with pricing trends.</li>
              <li>Financial impact estimates based on your provided metrics.</li>
            </ul>
            <p><strong>What We Don't Provide:</strong> The Service is for informational and competitive research purposes only. We do not provide financial advice, investment recommendations, business consulting, legal guidance, or accounting services.</p>

            <h2>3. Eligibility and User Responsibilities</h2>
            <p><strong>Eligibility:</strong> You must be at least 18 years old and authorized to enter into binding agreements. If you represent a business, you warrant that you're authorized to bind that entity to these Terms.</p>
            <p><strong>Your Responsibilities:</strong></p>
            <ul>
              <li>Provide accurate, complete information during registration and onboarding.</li>
              <li>Submit valid, accessible product URLs and competitor URLs for monitoring.</li>
              <li>Set appropriate price change thresholds for your business needs.</li>
              <li>Provide accurate order volume data for financial estimates.</li>
              <li>Ensure your use complies with applicable laws and third-party terms of service.</li>
              <li>Keep your account credentials confidential and secure.</li>
              <li>Notify us immediately of unauthorized access or security issues.</li>
            </ul>
            <p><strong>Data Quality:</strong> Inaccurate data you provide (incorrect URLs, thresholds, or metrics) will result in inaccurate monitoring and analysis. We're not liable for issues caused by inaccurate information you provide.</p>

            <h2>4. Account and Onboarding</h2>
            <p><strong>Activation Process:</strong> Service activation requires manual setup. Monitoring begins only after:</p>
            <ul>
              <li>Payment is successfully processed.</li>
              <li>You submit required onboarding information (URLs, thresholds, metrics).</li>
              <li>We complete technical configuration and verification.</li>
              <li>We send you activation confirmation via email.</li>
            </ul>
            <p><strong>Timeline:</strong> Standard activation takes 2–5 business days from complete submission. Incomplete or inaccurate information will delay activation. Setup and infrastructure costs are non-refundable once onboarding begins.</p>

            <h2>5. Subscription Billing</h2>
            <p><strong>Plans:</strong></p>
            <ul>
              <li><strong>Starter Plan:</strong> ₹999/month</li>
              <li><strong>Growth Plan:</strong> ₹2,499/month</li>
            </ul>
            <p><strong>Recurring Billing:</strong> Subscriptions automatically renew monthly unless you cancel before your renewal date. Billing occurs on the same calendar date each month.</p>
            <p><strong>Payment Processing:</strong> Payments are processed through authorized payment gateways (Razorpay). We don't store your card, UPI, or banking details directly. Payment security is governed by the payment provider's standards.</p>
            <p><strong>Invoices:</strong> You'll receive an invoice and confirmation via email after each successful payment. Keep your payment method current to avoid interruptions.</p>
            <p><strong>Payment Failures:</strong> If payment fails, we'll retry within 3 business days. If payment continues to fail, your service will be suspended. To reactivate, provide updated payment information.</p>

            <h2>6. Refunds and Cancellations</h2>
            <p>Our comprehensive Refund and Cancellation Policy is available at <a href="/refund-cancellation-policy">/refund-cancellation-policy</a> and is incorporated as part of these Terms by reference. Please review that document for detailed information regarding refund eligibility, cancellation procedures, refund timelines, and non-refundable circumstances.</p>
            <p><strong>Key Points:</strong> Refund eligibility depends upon the timing of your request and whether service activation is complete. Different refund amounts apply within the 7-day period versus requests made thereafter. Please consult the Refund and Cancellation Policy for complete details.</p>

            <h2>7. Service Availability</h2>
            <p><strong>Uptime:</strong> We aim to maintain reliable service availability. However, we don't guarantee 100% uptime. Interruptions may occur due to maintenance, infrastructure updates, or technical issues.</p>
            <p><strong>Maintenance:</strong> We'll notify you of planned maintenance when possible.</p>
            <p><strong>Monitoring Limitations:</strong> Data availability and accuracy depend on factors outside our control:</p>
            <ul>
              <li>Third-party website availability and accessibility.</li>
              <li>Website configuration changes.</li>
              <li>Website access restrictions or rate limiting.</li>
              <li>Network connectivity.</li>
              <li>Accuracy of URLs you provide.</li>
            </ul>
            <p><strong>Website Blocking:</strong> We're not responsible if target websites block our access or implement rate limiting. This is outside our control.</p>

            <h2>8. Acceptable Use</h2>
            <p><strong>Permitted Use:</strong> You may use the Service solely for legitimate competitive pricing research and internal business decision-making purposes. You agree not to use the Service for any unlawful, prohibited, or unauthorized purposes.</p>
            <p><strong>Prohibited Conduct:</strong> You must not:</p>
            <ul>
              <li>Use the Service in violation of any applicable laws, regulations, or ordinances.</li>
              <li>Violate any third-party website's terms of service, acceptable use policies, or legal restrictions while using our Service.</li>
              <li>Submit URLs or instructions intended to circumvent third-party website protections or access controls.</li>
              <li>Use the Service to enable any unlawful data collection or information extraction.</li>
              <li>Harass, deceive, or harm any third party through your use of the Service.</li>
              <li>Redistribute, resell, republish, or commercially exploit any reports, data, or analytics generated by the Service.</li>
              <li>Share your account credentials with unauthorized users or allow others to access the Service through your account.</li>
              <li>Reverse engineer, decompile, or attempt to derive the underlying technology or methods used in the Service.</li>
              <li>Engage in any activity that interferes with or disrupts the Service or its infrastructure.</li>
            </ul>
            <p><strong>Compliance Responsibility:</strong> You are solely responsible for ensuring that your use of the Service complies with all applicable laws and third-party requirements. PriceZen does not monitor your compliance and bears no responsibility for your use of the Service or the decisions you make based on Service outputs.</p>

            <h2>9. Intellectual Property</h2>
            <p><strong>Company IP Rights:</strong> All reports, analytical outputs, templates, methodologies, algorithms, software, and system-generated content produced by PriceZen remain the exclusive intellectual property of the Company. No ownership rights are transferred to you.</p>
            <p><strong>Limited License:</strong> We grant you a limited, non-exclusive, non-transferable license to access and use reports and data generated by the Service solely for your internal business purposes. This license is personal to you and may not be shared, sublicensed, or transferred.</p>
            <p><strong>Restrictions:</strong> You may not reproduce, distribute, publish, display, perform, modify, translate, or create derivative works from any Service output or proprietary content. All reports and data remain confidential business information.</p>
            <p><strong>Your Data:</strong> You retain ownership of information you submit to the Service (such as URLs and business metrics). However, you grant PriceZen a license to use that information to operate and improve the Service.</p>

            <h2>10. Third-Party Services</h2>
            <p><strong>Payment Gateways:</strong> PriceZen uses authorized third-party payment gateways (including Razorpay) to process subscription payments. These payment processors are independent service providers subject to their own terms of service and privacy policies. We are not responsible for payment processor conduct, policies, or security practices.</p>
            <p><strong>Email Delivery:</strong> Reports and alerts are delivered through third-party email service providers. Delivery timing, filtering, or failures may be beyond our control.</p>
            <p><strong>Infrastructure Providers:</strong> Our servers, hosting, and cloud infrastructure are provided by third-party providers. Service availability depends partly upon their infrastructure reliability.</p>
            <p><strong>Disclaimers:</strong> We do not endorse or assume responsibility for third-party services. Your use of third-party services is governed by their respective terms and privacy policies. We recommend reviewing those policies independently.</p>

            <h2>11. Disclaimer of Warranties</h2>
            <p><strong>"As-Is" Service:</strong> The Service is provided on an "as-is" and "as-available" basis without warranties of any kind.</p>
            <p><strong>We Don't Guarantee:</strong></p>
            <ul>
              <li>Accuracy, completeness, timeliness, or reliability of monitored data or reports.</li>
              <li>Suitability for your specific business needs.</li>
              <li>Uninterrupted or error-free operation.</li>
              <li>Quality or usefulness of reports.</li>
              <li>Continued availability of monitored websites.</li>
            </ul>
            <p><strong>Not Professional Advice:</strong> Our Service provides informational analytics only—not financial advice, investment recommendations, business consulting, legal guidance, or accounting services. Consult appropriate professionals for such guidance.</p>
            <p><strong>Your Responsibility:</strong> You're solely responsible for evaluating our information and making business decisions based on it.</p>

            <h2>12. Limitation of Liability</h2>
            <p><strong>Cap on Liability:</strong> To the maximum extent permitted by law, PriceZen's total cumulative liability to you for any and all claims, losses, damages, or causes of action arising from or related to these Terms or your use of the Service shall not exceed the subscription fees you paid during the calendar month in which the claim or loss occurred.</p>
            <p><strong>Excluded Damages:</strong> PriceZen is not liable for any indirect, incidental, consequential, special, punitive, or exemplary damages, including but not limited to loss of profit, revenue, data, business interruption, or goodwill, even if we have been advised of the possibility of such damages.</p>
            <p><strong>Liability for User-Provided Data:</strong> We are not liable for any inaccurate analysis, incorrect calculations, or misleading recommendations that result from inaccurate, incomplete, or false information you provide, including incorrect URLs, threshold settings, or order volume data.</p>
            <p><strong>Third-Party Conduct:</strong> We are not liable for the conduct, policies, or practices of third-party websites you monitor, third-party payment processors, or third-party infrastructure providers.</p>
            <p><strong>Service Interruptions:</strong> We are not liable for any damages resulting from service interruptions, temporary unavailability, or data collection failures, regardless of cause.</p>

            <h2>13. Suspension and Termination</h2>
            <p><strong>Termination by You:</strong> You may terminate your subscription at any time by submitting a written cancellation request to pricezenalert@gmail.com. Your subscription will terminate at the end of your current billing cycle. Please refer to our Refund and Cancellation Policy for information about any potential refunds.</p>
            <p><strong>Termination by PriceZen:</strong> We reserve the right to suspend or terminate your access to the Service immediately and without prior notice in the following circumstances:</p>
            <ul>
              <li>Non-payment or failure to provide valid payment authorization.</li>
              <li>Violation of these Terms of Service or any applicable laws.</li>
              <li>Misuse of the Service or abuse of the monitoring functionality.</li>
              <li>Submission of requests intended to circumvent third-party website protections.</li>
              <li>Initiation of chargebacks or payment disputes without first contacting us to resolve the matter.</li>
              <li>Any conduct we determine, in our sole discretion, to be harmful or inappropriate.</li>
            </ul>
            <p><strong>Effect of Termination:</strong> Upon termination or suspension, your right to access the Service immediately ceases. We may delete your account data and monitoring configurations. Termination does not relieve you of payment obligations for services already provided.</p>
            <p><strong>Survival:</strong> Sections that by their nature are intended to survive termination (such as limitation of liability, intellectual property, and governing law) shall continue in effect following any termination.</p>

            <h2>14. Privacy and Data Handling</h2>
            <p><strong>Privacy Policy:</strong> Our collection, use, storage, and protection of your information is governed by our Privacy Policy, available at <a href="/privacy-policy">/privacy-policy</a>. The Privacy Policy is incorporated by reference into these Terms and constitutes part of this binding agreement.</p>
            <p><strong>Data You Provide:</strong> You are responsible for the accuracy and legality of all information you submit to the Service. PriceZen processes your data to operate the Service and fulfill our contractual obligations to you.</p>
            <p><strong>Third-Party Data:</strong> PriceZen accesses and processes publicly available information from third-party websites based on your instructions. You are responsible for ensuring that your monitoring requests comply with applicable laws and third-party terms of service.</p>

            <h2>15. Force Majeure</h2>
            <p><strong>Events Beyond Our Control:</strong> Neither party is liable for failure to perform obligations caused by events beyond reasonable control, including natural disasters, wars, terrorism, pandemics, government actions, or infrastructure failures.</p>
            <p><strong>Service Interruptions:</strong> We'll notify you of such events and work to restore service as quickly as possible. For significant outages (7+ days) resulting from such events, we'll discuss remedies with you on a case-by-case basis.</p>

            <h2>16. Changes to Terms</h2>
            <p><strong>Right to Modify:</strong> We may modify these Terms at any time. Material changes will be communicated to you via email at least 30 days before the effective date.</p>
            <p><strong>Your Options:</strong> Your continued use after the effective date means you accept the revised Terms. If you don't accept, you may cancel your subscription without penalty during the notice period.</p>
            <p><strong>Version Updates:</strong> We update the "Last Updated" date and version number whenever these Terms change. We recommend reviewing them periodically.</p>

            <h2>17. Governing Law and Jurisdiction</h2>
            <p><strong>Applicable Law:</strong> These Terms are governed by the laws of the Republic of India.</p>
            <p><strong>Jurisdiction:</strong> Any legal disputes will be subject to the exclusive jurisdiction of the courts in Maharashtra.</p>
            <p><strong>Dispute Resolution:</strong> Before pursuing legal action, please contact us at pricezenalert@gmail.com to attempt resolution.</p>
            <p><strong>Consumer Protection:</strong> These Terms comply with Indian consumer protection laws, including the Consumer Protection Act, 2019.</p>

            <h2>18. Contact Information</h2>
            <p>For questions, concerns, or support regarding these Terms, the Service, or your account:</p>
            <ul>
              <li><strong>Email:</strong> pricezenalert@gmail.com</li>
              <li><strong>Response Time:</strong> We typically respond within 1–2 business days (Monday–Friday, excluding Indian national holidays)</li>
              <li><strong>Include:</strong> Your account email, subscription plan, and detailed description of your inquiry</li>
            </ul>

            <div className="policy-alert-box" style={{ marginTop: 24 }}>
              <p><strong>Summary:</strong> By using PriceZen, you agree to these Terms. If any provision is found unenforceable, the rest remains valid. These Terms are the complete agreement between us regarding the Service.</p>
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
