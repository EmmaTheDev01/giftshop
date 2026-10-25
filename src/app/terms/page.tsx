import React from 'react';
import LegalLayout from '@/components/LegalLayout';
import { SITE_CONFIG } from '@/config/site';

export const metadata = {
  title: `Terms of Use | ${SITE_CONFIG.name}`,
  description:
    'Website Terms of Use and Intellectual Property rules governing navigation, account security, digital conduct, and legal rights on our official boutique platform.',
};

export default function TermsOfUsePage() {
  return (
    <LegalLayout
      title="Terms of Use"
      subtitle="Statutory rules, intellectual property protections, account responsibilities, and guidelines governing your navigation and use of our official digital platform."
      badge="Platform Terms of Use"
      lastUpdated="October 2026"
    >
      <div style={{ color: '#334155', lineHeight: 1.8, fontSize: '0.94rem' }}>
        {/* Section 1 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            1. Acceptance of Terms &amp; Scope of Digital Platform
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Welcome to the official digital platform of {SITE_CONFIG.name} (&ldquo;the Website&rdquo;, &ldquo;the Platform&rdquo;, or &ldquo;we&rdquo;). By accessing, viewing, exploring, or interacting with any digital feature, interactive showcase, or checkout interface hosted on this website, you explicitly acknowledge that you have read, understood, and consented to comply unconditionally with these Terms of Use and our accompanying <a href="/privacy" style={{ color: '#b47e00', fontWeight: 600 }}>Privacy Policy</a>.
          </p>
          <p>
            If you do not agree with these Terms of Use in their entirety, you must immediately terminate your browsing session and refrain from utilizing our online boutique or purchasing services. We reserve the full prerogative to modify, revise, or refresh these Terms at any time without individual advance notice, and your continued usage of the platform following the publication of any revisions constitutes full legal acceptance of the updated provisions.
          </p>
        </section>

        {/* Section 2 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            2. Proprietary Intellectual Property &amp; Trademark Protection
          </h2>
          <p style={{ marginBottom: '14px' }}>
            The entirety of the content, visual elements, and architectural code available across this Website—including but not limited to the brand name {SITE_CONFIG.name}, stylized insignia, typography, custom iconsets, photographic packshots, high-resolution lifestyle imagery, editorial essays, product copy, and UI software—is protected under applicable copyright laws, trademark legislation, and international intellectual property conventions.
          </p>
          <p>
            All registered trademarks, artisan guild emblems, and commercial insignias displayed on this platform are used either under direct licensing authorization or as authorized retail representations. Nothing contained within this Website shall be construed as granting, by implication, estoppel, or otherwise, any license or right to utilize any trademark, logo, or artistic asset without prior express written permission from boutique leadership.
          </p>
        </section>

        {/* Section 3 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            3. Permitted Platform Navigation &amp; Limited Revocable License
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Subject to your continuous, strict compliance with these Terms of Use, {SITE_CONFIG.name} grants you a non-exclusive, non-transferable, revocable, and limited personal license to access, view, and navigate this Website solely for private, non-commercial shopping, gift selection, and informational purposes. You are authorized to display the content on your personal device and download or print individual pages solely for personal records regarding a completed or contemplated transaction.
          </p>
          <p>
            This limited license expressly forbids any commercial exploitation, redistribution, public exhibition, publication, broadcast, or resale of any catalog listings, product descriptions, pricing matrices, or photographic assets. Any unauthorized exercise of rights beyond this limited grant constitutes an infringement of intellectual property law and results in immediate, automatic termination of your access privilege.
          </p>
        </section>

        {/* Section 4 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            4. Prohibited Platform Activities &amp; Anti-Scraping Protocols
          </h2>
          <p style={{ marginBottom: '14px' }}>
            In accessing and utilizing our digital boutique, you expressly agree not to participate in, facilitate, or promote any unauthorized or malicious activities that impair the integrity, performance, or availability of our infrastructure. You agree not to deploy automated crawlers, scrapers, harvest robots, indexing spiders, or data extraction scripts to access catalog inventories, capture price points, or extract customer database information without express written consent.
          </p>
          <p>
            Furthermore, you shall not attempt to breach or circumvent any digital authentication layers, probe system vulnerabilities, inject malicious code or viruses, execute denial-of-service assaults, or engage in counterfeit payment card testing. Any user or entity identified engaging in automated exploitation or security tampering will have their access immediately revoked and may be reported to relevant law enforcement and cybercrime authorities.
          </p>
        </section>

        {/* Section 5 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            5. Customer Account Security &amp; Credential Custody
          </h2>
          <p style={{ marginBottom: '14px' }}>
            When registering an individual customer account or accessing our administrative concierge interface, you agree to provide truthful, accurate, and current information. You bear the sole responsibility for maintaining the absolute confidentiality of your account credentials, secret passwords, and multi-factor authentication tokens, and you agree to restrict physical access to devices connected to your profile to prevent unauthorized usage.
          </p>
          <p>
            You agree to accept full responsibility for all activities, purchases, and communications executed under your account. Should you suspect or discover any compromise of your credentials, unauthorized access, or payment irregularities, you must immediately notify our Security Concierge at <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: '#b47e00', fontWeight: 600 }}>{SITE_CONFIG.contact.email}</a> so that immediate preventive account freezing procedures may be applied.
          </p>
        </section>

        {/* Section 6 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            6. Product Reviews, User Testimonials &amp; Moderation Standards
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Our platform enables verified patrons to submit product reviews, unboxing ratings, and gift testimonials regarding their experience with our curated artisan keepsakes. By submitting any written review, testimonial, or photograph to our boutique, you grant {SITE_CONFIG.name} a perpetual, worldwide, irrevocable, royalty-free license to reproduce, adapt, publish, translate, and showcase such material across our marketing communications and digital storefront.
          </p>
          <p>
            We enforce strict editorial moderation: reviews containing offensive language, defamatory remarks, competitor advertising, personal identifying data of third parties, or fraudulent claims will be rejected. We do not edit review ratings or alter authentic consumer sentiment, ensuring that all published customer scores reflect genuine verified purchases.
          </p>
        </section>

        {/* Section 7 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            7. External Hyperlinks &amp; Third-Party Integrations
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Our website may contain hyperlinks directed toward external websites, carrier tracking utilities (such as premier logistics partners), or heritage workshop partners. These hyperlinks are provided purely for informational convenience and historical context. The inclusion of any link does not signify our endorsement, authorization, or assumption of responsibility for the content, privacy practices, or operational policies of any external platform.
          </p>
          <p>
            You acknowledge and agree that your navigation of third-party websites is conducted entirely at your own risk. We disclaim all liability for any loss, damage, or legal consequences arising directly or indirectly from your access to or reliance upon third-party services, external cookies, or third-party commercial transactions.
          </p>
        </section>

        {/* Section 8 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            8. Platform Availability, Maintenance &amp; Service Continuity
          </h2>
          <p style={{ marginBottom: '14px' }}>
            While our technical architecture is built on enterprise edge networks providing target uptime of 99.9%, we cannot guarantee that the Website will operate uninterrupted, error-free, or devoid of temporary transmission latencies. Operational interruptions may occur as a result of scheduled infrastructure updates, database migrations, security patches, network routing failures, or internet service provider disruptions beyond our reasonable control.
          </p>
          <p>
            We reserve the right at any time to temporarily suspend, restrict, or modify access to all or any part of the Website without liability or prior notification. In the event of an unexpected service interruption during an active checkout procedure, our support concierge is prepared to verify transaction states and assist patrons in completing orders without duplicating charges.
          </p>
        </section>

        {/* Section 9 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            9. Disclaimer of Digital Warranties &amp; Technical Limitations
          </h2>
          <p style={{ marginBottom: '14px' }}>
            To the maximum extent permitted by applicable law, this digital platform, its content, software, and interactive functions are provided strictly on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. {SITE_CONFIG.name} makes no representations, warranties, or endorsements of any kind, whether express, statutory, or implied, regarding the operation of the site, server accuracy, or freedom from technical anomalies.
          </p>
          <p>
            While we implement advanced TLS encryption, Web Application Firewalls (WAF), and automated intrusion prevention, we cannot guarantee that files downloaded from the platform will be free of infection or unauthorized tampering. Patrons are advised to maintain active antivirus defenses, up-to-date operating systems, and secure browser environments when conducting digital commerce.
          </p>
        </section>

        {/* Section 10 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            10. Limitation of Liability &amp; Comprehensive Indemnification
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Under no legal theory—whether sounding in contract, tort, negligence, or strict liability—shall {SITE_CONFIG.name}, its corporate affiliates, directors, officers, artisan partners, or employees be liable for any direct, indirect, incidental, punitive, or consequential damages resulting from your access to, use of, or inability to access this digital boutique. This limitation encompasses damages for lost profits, data corruption, business interruption, or system downtime.
          </p>
          <p>
            You agree to defend, indemnify, and hold harmless {SITE_CONFIG.name} and its officers from and against any and all third-party claims, liabilities, damages, judgments, and legal expenses arising out of or related to your breach of these Terms of Use, unlawful utilization of the platform, or violation of third-party intellectual property rights.
          </p>
        </section>

        {/* Section 11 */}
        <section>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            11. Governing Law, Dispute Jurisdiction &amp; Severability
          </h2>
          <p style={{ marginBottom: '14px' }}>
            These Terms of Use and all disputes arising directly or indirectly from your access to or navigation of this Website shall be governed by, interpreted, and construed in accordance with substantive commercial and electronic commerce laws, without regard to conflict of laws principles. The United Nations Convention on Contracts for the International Sale of Goods does not apply.
          </p>
          <p>
            Any legal suit, action, or proceeding arising out of these Terms shall be instituted exclusively within courts of competent jurisdiction. If any provision of these Terms is determined by a court of competent jurisdiction to be invalid, illegal, or unenforceable, such provision shall be severed to the minimum extent necessary, and the remaining provisions shall continue in full legal force and effect.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
