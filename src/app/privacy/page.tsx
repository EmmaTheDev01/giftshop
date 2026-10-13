import React from 'react';
import LegalLayout from '@/components/LegalLayout';
import { SITE_CONFIG } from '@/config/site';

export const metadata = {
  title: `Privacy Policy & GDPR / PIPEDA Compliance | ${SITE_CONFIG.name}`,
  description:
    'Comprehensive Privacy Policy compliant with Canadian PIPEDA, Quebec Law 25, and European GDPR. Learn how we safeguard your personal data, transaction telemetry, and rights.',
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy & Data Protection"
      subtitle="Your privacy is fundamental to our boutique. Learn how we collect, process, and protect your information under Canadian (PIPEDA / Quebec Law 25) and European (GDPR) standards."
      badge="GDPR, PIPEDA & Law 25 Compliant"
      lastUpdated="October 2026"
    >
      <div style={{ color: '#334155', lineHeight: 1.8, fontSize: '0.94rem' }}>
        {/* Section 1 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            1. Preamble &amp; Designation of Data Controller
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Welcome to the official online boutique of {SITE_CONFIG.name} Canada (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the Boutique&rdquo;). We consider the preservation of your personal privacy and the confidentiality of your customer records to be an uncompromising cornerstone of our luxury customer experience. This comprehensive Privacy Policy sets out the exact terms, technical protocols, and institutional standards under which your personal information is gathered, safeguarded, categorized, and processed when you interact with our boutique platform, purchase artisan keepsakes in Canadian Dollars (CAD), request gift concierge services, or register for our private collector communications.
          </p>
          <p>
            The designated legal data controller responsible for all personal information collected across this digital platform is {SITE_CONFIG.name} Retail Operations Inc., operating under Canadian federal jurisdiction. Our dedicated Data Protection and Privacy Compliance Office may be directly contacted for all regulatory notices, audit inquiries, or privacy rights requests via email at <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: '#b47e00', fontWeight: 600 }}>{SITE_CONFIG.contact.email}</a>, or by toll-free telephone concierge at <strong>{SITE_CONFIG.contact.phone}</strong> between 9:00 AM and 6:00 PM Eastern Standard Time.
          </p>
        </section>

        {/* Section 2 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            2. Statutory Regulatory Framework (PIPEDA, Law 25 &amp; GDPR)
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Our boutique operates in strict, audited accordance with Canada&apos;s <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA, S.C. 2000, c. 5), the 10 Fair Information Principles codified within Schedule 1 thereof, as well as applicable Canadian provincial privacy enactments, notably Quebec&apos;s <em>Act respecting the protection of personal information in the private sector</em> (modernized via Law 25), British Columbia&apos;s PIPA, and Alberta&apos;s PIPA. Furthermore, because our boutique curates authentic pieces from France and serves global patrons, we unconditionally adhere to Regulation (EU) 2016/679 of the European Parliament and Council (General Data Protection Regulation &ndash; GDPR).
          </p>
          <p>
            Under these statutory regimes, personal information is defined as any factual or subjective information, recorded or unrecorded, regarding an identifiable individual. We guarantee that your information is collected fairly, transparently, and lawfully, with appropriate privacy impact assessments conducted prior to any technical deployment or integration with third-party logistics and database infrastructure.
          </p>
        </section>

        {/* Section 3 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            3. Categories of Personal Information Collected
          </h2>
          <p style={{ marginBottom: '14px' }}>
            To process your orders of handcrafted Canadian gifts and provide seamless white-glove fulfillment, we collect several categories of personal data depending on your navigation journey. This includes your direct identity identifiers such as full name, honorific, billing address, Canadian destination shipping coordinates, postal code, phone number, and primary email address. When you create a verified customer profile, we also maintain encrypted password hashes, saved preferred delivery addresses, historical transaction summaries denominated in CAD, and your opt-in notification preferences.
          </p>
          <p>
            Additionally, during digital navigation, our edge servers capture telemetry diagnostics including truncated IP addresses, browser engine user-agent strings, referring uniform resource locators, screen viewport geometry, operating system versions, and anonymized behavioral clickpaths through our catalog categories. We do not knowingly collect, record, or solicit sensitive personal data relating to racial origin, political beliefs, religious convictions, biometric templates, or health information.
          </p>
        </section>

        {/* Section 4 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            4. Payment Card Processing &amp; PCI-DSS Level 1 Security
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Financial security and fraud prevention during Canadian Dollar transactions are engineered under the most stringent banking certifications. All electronic transactions conducted using Visa and Mastercard are executed exclusively through Level 1 PCI-DSS certified tokenization payment gateways. During the checkout procedure, your complete sixteen-digit payment card number, cardholder expiration date, and CVV/CVC security verification codes are transmitted directly from your client browser to the banking processing network via TLS 1.3 cryptographic tunnels with 256-bit encryption.
          </p>
          <p>
            At no point in time are your unencrypted credit card numbers, payment instruments, or magnetic stripe elements handled, intercepted, or saved within our boutique databases or web application servers. We merely retain cryptographically signed payment transaction reference tokens, the issuing card brand identifier, and the final four digits of your card for invoice generation, sales tax reporting, and dispute handling in compliance with Canadian Banking Standards.
          </p>
        </section>

        {/* Section 5 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            5. Legal Bases &amp; Explicit Purposes for Processing
          </h2>
          <p style={{ marginBottom: '14px' }}>
            We process your personal information solely upon recognized legal bases under Article 6 of the GDPR and Section 7 of PIPEDA. The primary justification is the performance of a purchase contract: without your accurate name, contact email, and destination postal coordinates, our fulfillment hubs cannot authenticate your payment, package your numbered keepsakes, or generate shipping waybills with Canada Post, FedEx, or UPS. The second legal basis consists of compliance with statutory legal obligations, including maintaining corporate accounting books and Canadian Revenue Agency (CRA) records.
          </p>
          <p>
            The third basis rests upon our legitimate business interests, specifically the continuous prevention of fraudulent chargebacks, optimization of page loading speeds across Canadian internet service providers, and safeguarding the availability of our catalog infrastructure. Finally, we rely upon your explicit, opt-in consent for non-transactional marketing communications, such as our monthly letters detailing newly arrived artisan limited editions, from which you may withdraw at any time via a single-click unsubscribe mechanism.
          </p>
        </section>

        {/* Section 6 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            6. Subprocessors &amp; Cross-Border Data Transfers
          </h2>
          <p style={{ marginBottom: '14px' }}>
            In delivering a reliable, high-speed digital commerce platform, {SITE_CONFIG.name} engages carefully audited third-party service providers and cloud infrastructure vendors acting as data subprocessors. Our core database architecture is powered by Supabase Inc., providing managed PostgreSQL hosting with SOC 2 Type II certification and advanced row-level security policies. Edge delivery, static asset distribution, and distributed denial-of-service protection are provided through global Anycast CDN networks with dedicated points of presence situated in Montreal and Toronto.
          </p>
          <p>
            Where personal data must be accessed or transmitted across borders—for example, when coordinating international logistics or verifying artisanal certificates of origin with partner houses in France—we implement European Commission Standard Contractual Clauses (SCCs) and Canadian Adequacy frameworks. All subprocessors are legally bound by comprehensive Data Processing Agreements (DPAs) obligating them to implement technical and organizational controls equal to or exceeding our own internal standards.
          </p>
        </section>

        {/* Section 7 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            7. Data Retention Schedules &amp; Secure Disposal
          </h2>
          <p style={{ marginBottom: '14px' }}>
            We enforce strict data minimization schedules and ensure that your personal records are retained no longer than is strictly necessary to fulfill the specific purposes for which they were gathered. Standard customer order records, electronic commercial invoices, and provincial sales tax allocations (GST/HST/PST) are retained for a statutory duration of seven (7) taxation years in accordance with requirements established by the Canada Revenue Agency and provincial taxation authorities (Revenu Québec and the Ontario Ministry of Finance).
          </p>
          <p>
            Customer web sessions, shopping bag cache records, and temporary telemetry events stored within our analytics tables are automatically scrubbed and deleted or irreversibly anonymized after ninety (90) days. Inactive customer profiles that have remained dormant without order activity for thirty-six (36) consecutive months are scheduled for automated archiving, following which all associated personal identifiers are permanently erased using DoD-compliant cryptographic wiping techniques.
          </p>
        </section>

        {/* Section 8 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            8. Comprehensive Customer Rights (Access, Correction &amp; Deletion)
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Under Canadian privacy law (PIPEDA and Quebec Law 25) and European privacy legislation (GDPR Articles 15 through 22), you are endowed with an extensive suite of enforceable rights regarding your personal records. You maintain the right of access, allowing you to request a full, structured, machine-readable digital export (JSON/CSV) of all personal information maintained in our database. You also possess the right of rectification, entitling you to request the immediate correction of inaccurate, incomplete, or out-of-date shipping addresses, contact telephone numbers, or profile information.
          </p>
          <p>
            Furthermore, you have the right to erasure (&ldquo;right to be forgotten&rdquo;), allowing you to instruct us to delete your personal profile, cart history, and marketing preferences, provided such records are not subject to mandatory Canadian taxation retention statutes. You also hold the right to restrict processing, the right to object to profiling, and the right to lodge a formal inquiry without experiencing any discrimination or diminished service quality. To exercise any right, contact our concierge at <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: '#b47e00', fontWeight: 600 }}>{SITE_CONFIG.contact.email}</a>. All verified requests receive a formal written determination within thirty (30) days without administrative charge.
          </p>
        </section>

        {/* Section 9 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            9. Technical Security Safeguards &amp; Breach Protocol
          </h2>
          <p style={{ marginBottom: '14px' }}>
            We implement comprehensive technical, physical, and organizational security safeguards designed to prevent accidental loss, unauthorized destruction, theft, unauthorized disclosure, or unlawful modification of customer data. All internal application communications utilize Transport Layer Security (TLS 1.3), database tables containing user profiles enforce Row-Level Security (RLS) policies preventing inter-tenant cross-contamination, and all administrative access to our Supabase database requires multi-factor authentication (MFA) and encrypted SSH keys.
          </p>
          <p>
            In the improbable event of a suspected security compromise or personal data breach involving customer information, we maintain a codified Incident Response Plan that complies strictly with PIPEDA Section 10.1 and GDPR Article 33. If an incident poses a real risk of significant harm (RROSH) to affected individuals, we will immediately notify the Office of the Privacy Commissioner of Canada and all impacted patrons via electronic transmission within seventy-two (72) hours, outlining the nature of the breach, the data affected, and specific remedial measures deployed.
          </p>
        </section>

        {/* Section 10 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            10. Protection of Minors &amp; Children&apos;s Privacy
          </h2>
          <p style={{ marginBottom: '14px' }}>
            While our boutique offers charming collections of children&apos;s literature, heirloom wooden toys, and miniature keepsake puzzles, our digital commercial storefront is expressly intended for adult patrons capable of entering into legally binding commercial agreements under Canadian law. We do not deliberately solicit, collect, process, or maintain personal identification information from children or individuals under the age of majority in their respective Canadian province (18 years in Alberta, Manitoba, Ontario, Prince Edward Island, Quebec, and Saskatchewan; 19 years in British Columbia, New Brunswick, Newfoundland and Labrador, Northwest Territories, Nova Scotia, Nunavut, and Yukon).
          </p>
          <p>
            If a parent or legal guardian becomes aware that their minor child has provided us with personal information without parental consent, we request that they contact our Data Protection Officer immediately at <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: '#b47e00' }}>{SITE_CONFIG.contact.email}</a>. Upon receipt of such notification and verification of identity, we will take immediate proactive steps to permanently purge all associated information from our operational databases and server archives without delay.
          </p>
        </section>

        {/* Section 11 */}
        <section>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            11. Oversight Authorities &amp; Right to File a Complaint
          </h2>
          <p style={{ marginBottom: '14px' }}>
            We remain committed to resolving any question, concern, or dispute regarding our collection and handling of your personal information through our internal concierge resolution service. If you believe that our response to your privacy request was insufficient or that our processing practices fail to conform with governing Canadian or European standards, you maintain the statutory right to escalate your concern to the appropriate supervisory authority.
          </p>
          <div style={{ backgroundColor: '#faf8f5', border: '1px solid #ebd9c0', borderRadius: '4px', padding: '18px 22px' }}>
            <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#0c2340' }}>
              Office of the Privacy Commissioner of Canada (OPC)
            </p>
            <p style={{ margin: '0 0 4px', fontSize: '0.88rem', color: '#475569' }}>
              30 Victoria Street, 6th Floor, Gatineau, Quebec K1A 1H3 • Toll-Free: 1-800-282-1376
            </p>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569' }}>
              Web: <a href="https://www.priv.gc.ca" target="_blank" rel="noopener noreferrer" style={{ color: '#b47e00' }}>www.priv.gc.ca</a> • In Quebec: Commission d&apos;accès à l&apos;information du Québec (<a href="https://www.cai.gouv.qc.ca" target="_blank" rel="noopener noreferrer" style={{ color: '#b47e00' }}>www.cai.gouv.qc.ca</a>)
            </p>
          </div>
        </section>
      </div>
    </LegalLayout>
  );
}
