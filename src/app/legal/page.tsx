import React from 'react';
import LegalLayout from '@/components/LegalLayout';
import { SITE_CONFIG } from '@/config/site';

export const metadata = {
  title: `Legal Notice & Publisher Information | ${SITE_CONFIG.name}`,
  description:
    'Official legal notice, publisher identification, corporate registration numbers, cloud infrastructure details, and copyright registrations.',
};

export default function LegalNoticePage() {
  return (
    <LegalLayout
      title="Legal Notice & Publisher Information"
      subtitle="Statutory legal identifications, corporate coordinates, cloud hosting architecture, intellectual property registers, and regulatory compliance disclosures."
      badge="Official Impressum & Legal Notice"
      lastUpdated="October 2026"
    >
      <div style={{ color: '#334155', lineHeight: 1.8, fontSize: '0.94rem' }}>
        {/* Section 1 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            1. Legal Identification of the Website Publisher
          </h2>
          <p style={{ marginBottom: '14px' }}>
            In accordance with statutory corporate transparency requirements and electronic commerce disclosures, this website (accessible at <code>{SITE_CONFIG.domain}</code>) is published, owned, and operated by <strong>{SITE_CONFIG.name} Retail &amp; Boutique Operations Inc.</strong>, an incorporated enterprise organized and existing under statutory corporate legislation.
          </p>
          <div style={{ backgroundColor: '#faf8f5', border: '1px solid #ebd9c0', borderRadius: '4px', padding: '18px 22px', marginBottom: '14px' }}>
            <p style={{ margin: '0 0 6px' }}><strong>Corporate Entity:</strong> {SITE_CONFIG.name} Retail &amp; Boutique Operations Inc.</p>
            <p style={{ margin: '0 0 6px' }}><strong>Principal Corporate Head Office:</strong> 138 Cumberland Street, Suite 200</p>
            <p style={{ margin: '0 0 6px' }}><strong>Official Inquiries Email:</strong> <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: '#b47e00', fontWeight: 600 }}>{SITE_CONFIG.contact.email}</a></p>
            <p style={{ margin: 0 }}><strong>Boutique Concierge Phone:</strong> <strong>{SITE_CONFIG.contact.phone}</strong></p>
          </div>
          <p>
            Our organization operates physical boutique establishments, fulfillment operations, and private collector salons across primary metropolitan centers.
          </p>
        </section>

        {/* Section 2 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            2. Commercial Registrations &amp; Statutory Business Identifications
          </h2>
          <p style={{ marginBottom: '14px' }}>
            {SITE_CONFIG.name} Retail &amp; Boutique Operations Inc. is duly registered with statutory corporate registries. All commercial transactions, order invoices, and customer receipts are issued under our verified corporate identity and subject to statutory audit by competent revenue authorities.
          </p>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '16px 20px', marginBottom: '14px' }}>
            <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.88rem' }}>
              <li><strong>Corporate Business Number:</strong> 84920 1832 RC0001</li>
              <li><strong>Enterprise Registration Number:</strong> 1178294021</li>
              <li><strong>Sales Tax &amp; Fiscal Registration Number:</strong> 849201832 RT0001</li>
            </ul>
          </div>
          <p>
            Our tax registrations enable us to charge transparent, statutory tax rates matching each patron&apos;s destination jurisdiction, ensuring that customers never incur unexpected double taxation charges upon delivery.
          </p>
        </section>

        {/* Section 3 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            3. Publishing Director &amp; Executive Brand Leadership
          </h2>
          <p style={{ marginBottom: '14px' }}>
            The designated Director of Publication responsible for the editorial content, artisan brand partnerships, and catalog curation presented across this boutique is the Chief Executive Officer and Brand Operations Director of {SITE_CONFIG.name} Retail &amp; Boutique Operations Inc. All communications, historical monographs, product descriptions, and artisan heritage interviews are curated under their direct executive editorial oversight.
          </p>
          <p>
            Editorial inquiries, media interview requests, corporate brand partnership inquiries, and press kit access should be directed in writing to our Communications and Press Secretariat via electronic transmission at <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: '#b47e00', fontWeight: 600 }}>{SITE_CONFIG.contact.email}</a> with the subject header &ldquo;Attention: Director of Publication &ndash; Editorial Inquiry&rdquo;.
          </p>
        </section>

        {/* Section 4 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            4. Web Application Edge Hosting Infrastructure
          </h2>
          <p style={{ marginBottom: '14px' }}>
            This web application is deployed and hosted across high-availability Anycast global content delivery networks and edge computing infrastructure provided by <strong>Vercel Inc.</strong>, located at 440 N Barranca Ave #4133, Covina, California 91723, United States of America (website: <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: '#b47e00' }}>vercel.com</a>).
          </p>
          <p>
            Static assets, images, and serverless compute functions are dynamically served from localized edge points of presence situated across global delivery networks. This low-latency infrastructure delivers instantaneous response times, automated HTTP/3 transmission protocols, and enterprise-grade distributed denial-of-service (DDoS) mitigation.
          </p>
        </section>

        {/* Section 5 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            5. Database Architecture &amp; Cloud Telemetry Hosting
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Our persistent relational database architecture, customer profile tables, product inventory counts, and order fulfillment records are hosted securely with <strong>Supabase Inc.</strong>, located at 970 Toa Payoh North #07-04, Singapore (website: <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" style={{ color: '#b47e00' }}>supabase.com</a>), operating across SOC 2 Type II certified data centers.
          </p>
          <p>
            The Supabase infrastructure utilizes PostgreSQL with automated point-in-time recovery, real-time database replication, automated encrypted backups, and fine-grained Row-Level Security (RLS) policies. Customer records and catalog data are encrypted both in transit (TLS 1.3) and at rest using AES-256 military-grade encryption algorithms.
          </p>
        </section>

        {/* Section 6 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            6. Intellectual Property, Trademarks &amp; Official Emblems
          </h2>
          <p style={{ marginBottom: '14px' }}>
            The commercial trade name <strong>{SITE_CONFIG.name}</strong>, custom brand logotypes, and accompanying slogans (&ldquo;Curated Artisan Keepsakes &amp; Gifts&rdquo;) are protected trademarks owned by {SITE_CONFIG.name} Retail Operations Inc. under applicable trademark enactments and international Madrid System trademark treaties.
          </p>
          <p>
            The names, insignias, and emblems of our esteemed artisan partners are the proprietary registered trademarks of their respective historical houses and are displayed on our platform under official authorization. Any unauthorized reproduction, imitation, or commercial use without prior written authorization constitutes trademark infringement and unfair competition actionable under law.
          </p>
        </section>

        {/* Section 7 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            7. Professional Photography, Heritage Media &amp; Copyright Credits
          </h2>
          <p style={{ marginBottom: '14px' }}>
            All photographic packshots, high-resolution lifestyle images, artisan workshop portraits, and multimedia assets presented on this platform are protected under statutory copyright legislation. Photography of curated keepsakes and heritage artifacts is commissioned directly by our boutique or provided courtesy of our official artisan partners under exclusive licensing arrangements.
          </p>
          <p>
            Any unauthorized downloading, reproduction, alteration, extraction, deep-linking, or commercial reuse of photographic materials without explicit written permission from our copyright department is strictly prohibited. Individuals or organizations seeking editorial image licensing for press coverage should contact <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: '#b47e00' }}>{SITE_CONFIG.contact.email}</a>.
          </p>
        </section>

        {/* Section 8 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            8. Digital Accessibility Commitment (WCAG 2.1 Level AA)
          </h2>
          <p style={{ marginBottom: '14px' }}>
            {SITE_CONFIG.name} is deeply committed to ensuring that our digital boutique is universally accessible to all patrons, including individuals living with visual, auditory, cognitive, or motor disabilities. We actively conform our web user interface and interactive checkout components with the standards set forth by the World Wide Web Consortium&apos;s Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
          </p>
          <p>
            Our web pages feature descriptive ARIA semantic labels, high-contrast typography, accessible color ratios exceeding 4.5:1, screen-reader compatible table layouts, and complete keyboard-navigable focus states. If you encounter any accessibility challenge or barrier while shopping with us, our Accessibility Concierge is dedicated to providing immediate assistance via email at <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: '#b47e00' }}>{SITE_CONFIG.contact.email}</a> or phone at <strong>{SITE_CONFIG.contact.phone}</strong>.
          </p>
        </section>

        {/* Section 9 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            9. Commercial Framework &amp; Consumer Dispute Mediation
          </h2>
          <p style={{ marginBottom: '14px' }}>
            All commercial transactions executed through our online boutique are governed by our comprehensive <a href="/terms-of-sale" style={{ color: '#b47e00', fontWeight: 600 }}>Terms and Conditions of Sale</a>, which outline customer return privileges, 30-day satisfaction guarantees, and shipping conditions. In the event of a customer service dispute or dissatisfaction regarding an order, we encourage patrons to first contact our dedicated concierge service, where our team is empowered to achieve prompt, equitable, and amicable resolutions.
          </p>
          <p>
            Consumers retain all statutory protections provided under applicable consumer protection enactments. Nothing contained in our legal notices shall operate to limit or abrogate statutory consumer rights that cannot be waived under applicable legislation.
          </p>
        </section>

        {/* Section 10 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            10. Cybersecurity &amp; Responsible Vulnerability Disclosure
          </h2>
          <p style={{ marginBottom: '14px' }}>
            We maintain a rigorous proactive stance regarding digital infrastructure defense, engaging certified third-party cybersecurity auditors to perform recurring penetration testing, automated static code analysis, and vulnerability reviews of our payment workflows and customer databases. Our systems implement strict transport security (HSTS), Content Security Policies (CSP), and automated rate-limiting to protect patron privacy and maintain platform integrity.
          </p>
          <p>
            We welcome responsible security research from certified independent analysts. If you believe you have discovered a security anomaly or vulnerability within our digital platform, we invite you to disclose your findings responsibly to our engineering team at <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: '#b47e00' }}>{SITE_CONFIG.contact.email}</a> with the subject &ldquo;Responsible Security Disclosure&rdquo;. We commit to investigating all verified reports within forty-eight (48) hours and do not pursue legal action against researchers acting in good faith.
          </p>
        </section>

        {/* Section 11 */}
        <section>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            11. Applicable Law, Legal Jurisdiction &amp; Corporate Contacts
          </h2>
          <p style={{ marginBottom: '14px' }}>
            This Legal Notice and all legal relationships arising from the publication and operation of this digital platform shall be construed, interpreted, and governed in accordance with applicable substantive laws, without giving effect to any principles of conflicts of law.
          </p>
          <p>
            Subject to applicable consumer protection legislation mandating local venue, any judicial litigation or statutory claim arising in connection with this Legal Notice shall be submitted to the exclusive jurisdiction of the competent courts of law. Formal legal notices and inquiries should be served upon our registered agent at: {SITE_CONFIG.name} Retail &amp; Boutique Operations Inc.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
