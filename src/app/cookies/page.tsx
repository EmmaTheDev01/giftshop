'use client';

import React, { useState } from 'react';
import LegalLayout from '@/components/LegalLayout';
import { SITE_CONFIG } from '@/config/site';
import { Cookie, Check, RotateCcw, ShieldCheck, Settings, Sliders } from 'lucide-react';

export default function CookiePolicyPage() {
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleResetPreferences = () => {
    try {
      localStorage.removeItem('gs_cookie_consent');
      setResetSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch {
      // ignore
    }
  };

  return (
    <LegalLayout
      title="Cookie Policy & Preferences"
      subtitle="Comprehensive disclosure regarding our utilization of HTTP cookies, local storage tokens, and telemetry diagnostics to ensure secure, personalized Canadian shopping in CAD."
      badge="ePrivacy, GDPR & Law 25 Compliant"
      lastUpdated="October 2026"
    >
      <div style={{ color: '#334155', lineHeight: 1.8, fontSize: '0.94rem' }}>
        {/* Section 1 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            1. What Are Cookies &amp; Digital Web Storage Tokens?
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Cookies are compact alphanumeric text files placed on your personal computing terminal, smartphone, or tablet device when you access our digital boutique. These miniature data packages are transmitted between our web servers and your internet browser, enabling our platform to recognize your specific hardware session across consecutive page views. Through this persistent recognition, our platform accurately retains your shopping basket contents, keepsakes wishlist, CAD currency preferences, and security authentication tokens without demanding redundant customer inputs.
          </p>
          <p>
            In addition to traditional HTTP cookies, our modern web architecture utilizes client-side web storage mechanisms (specifically HTML5 <code>localStorage</code> and <code>sessionStorage</code>). These client-side mechanisms operate with enhanced cryptographic speed and security, allowing us to store non-sensitive user interface configurations locally on your terminal without repeatedly transmitting unnecessary tracking payloads across public telecommunication networks.
          </p>
        </section>

        {/* Section 2 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            2. Statutory Regulatory Framework (ePrivacy, GDPR &amp; PIPEDA)
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Our deployment and management of cookies comply strictly with international and Canadian privacy mandates, including the European Union&apos;s ePrivacy Directive (Directive 2002/58/EC as amended), the General Data Protection Regulation (Regulation (EU) 2016/679 &ndash; GDPR), and Canadian federal privacy standards under the <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA). Furthermore, we adhere to Quebec&apos;s Law 25 requirements governing digital tracking consent for our Francophone patrons.
          </p>
          <p>
            Under these governing legal standards, cookies are classified by their necessity. Strictly essential technical cookies required for the fundamental operation of the online store are activated automatically upon site entry. All non-essential tracking cookies—including analytics and marketing identifiers—remain deactivated by default and are energized only after the customer provides clear, affirmative, and unambiguous opt-in consent through our interactive consent modal.
          </p>
        </section>

        {/* Section 3 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            3. Strictly Necessary &amp; Security Cookies (Category A)
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Strictly Necessary cookies are indispensable for the core operational architecture of our boutique. Without these technical tokens, essential e-commerce functions such as retaining items in your shopping bag as you browse other categories, securing the checkout funnel against cross-site request forgery (CSRF), and processing payment card pre-authorizations in Canadian Dollars cannot function. These tokens do not track your browsing habits across third-party websites and do not store unencrypted personal information.
          </p>
          <p>
            Because these cookies are technically required to deliver the specific commercial service expressly requested by the customer, they do not legally require prior consent under Canadian and European privacy regulations. Examples include our session identity token (<code>gs_session_id</code>) and our security anti-tampering verification cookies, which expire either upon closing your browser window or within twenty-four (24) hours.
          </p>
        </section>

        {/* Section 4 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            4. Functional &amp; Localization Preference Cookies (Category B)
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Functional cookies allow our platform to remember custom preferences and localization choices you make during your visit, providing a seamless, individualized browsing experience tailored to Canadian provinces. These tokens store parameters such as your active delivery region (enabling precise calculation of provincial sales taxes like HST or QST), your default currency display (fixed in CAD), your language preference (English or French), and items saved to your personal boutique wishlist.
          </p>
          <p>
            These cookies significantly elevate user convenience by eliminating the necessity of re-entering basic preferences upon every page transition. If you decide to disable functional cookies via your browser settings, the core store will remain accessible, but advanced conveniences—such as persistent wishlist memory and automatic postal code remembrance—will be unavailable.
          </p>
        </section>

        {/* Section 5 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            5. Anonymous Analytics &amp; Boutique Performance Telemetry (Category C)
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Performance and analytics cookies gather anonymous, aggregate metrics regarding how patrons navigate and interact with our digital boutique. They assist our technical team in measuring key performance indicators (KPIs) such as average page load durations across Canadian internet service providers, popular product categories, navigation drop-off rates during checkout, and search query trends. This telemetry is invaluable for identifying broken links, optimizing mobile responsiveness, and refining product displays.
          </p>
          <p>
            We implement privacy-preserving analytics configurations that systematically truncate and hash your IP address prior to storage, preventing any correlation between navigation telemetry and your personal identity. In accordance with GDPR and Quebec Law 25, analytics cookies are activated solely upon your affirmative consent and may be deactivated at any time without impacting your ability to complete an order.
          </p>
        </section>

        {/* Section 6 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            6. Third-Party Payment Token Cookies (Category D)
          </h2>
          <p style={{ marginBottom: '14px' }}>
            During the checkout process, our certified payment gateway partners (Visa and Mastercard) deploy specialized technical cookies designed to facilitate fraud detection, device fingerprinting for anti-money laundering compliance, and 3D-Secure 2.0 multi-factor cardholder authentication. These tokens evaluate technical parameters such as browser resolution, IP reputation, and payment velocity to protect genuine cardholders against unauthorized transaction attempts.
          </p>
          <p>
            These payment tokens operate under strict PCI-DSS Level 1 compliance mandates and are utilized exclusively for the execution of the payment authorization requested by you. They are never utilized for behavioral cross-context advertising or marketing profiling across other websites.
          </p>
        </section>

        {/* Section 7 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            7. Local Storage &amp; Session Storage Architecture
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Our web application leverages HTML5 Web Storage technology to deliver instantaneous, flicker-free rendering of client-side components. The primary storage key utilized is <code>gs_cookie_consent</code>, which stores a compact JSON object detailing your exact consent level, your chosen preference category flags, and a Unix timestamp recording when your consent was given. By recording this choice within local storage, our platform avoids redisplaying the cookie banner on every subsequent page view.
          </p>
          <p>
            Similarly, our cart management subsystem stores transient bag state in local storage (<code>gs_cart_state</code>) to prevent data loss in the event of an accidental browser refresh or momentary internet connection drop. This data resides solely on your client device and is never harvested or sold to external marketing networks.
          </p>
        </section>

        {/* Section 8 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            8. Life Cycle Schedules &amp; Automated Token Expiration
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Cookies utilized on our boutique are divided into two distinct lifecycle classifications: Session Cookies and Persistent Cookies. Session cookies are temporary in nature and are automatically erased from your device memory the instant you terminate your browser software or close all boutique browser tabs. These tokens are used primarily to maintain shopping cart items during an active browsing journey.
          </p>
          <p>
            Persistent cookies remain stored on your hard drive until their predetermined expiration timestamp is reached, or until you manually clear your browser cache. In strict accordance with European data protection guidance, our persistent consent cookie (<code>gs_cookie_consent</code>) has a maximum lifespan of six (6) months, following which it automatically expires, prompting our platform to request a fresh, renewed consent determination from the customer.
          </p>
        </section>

        {/* Section 9 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            9. Granular Consent Controls &amp; The Interactive Reset Tool
          </h2>
          <p style={{ marginBottom: '14px' }}>
            We empower our patrons with absolute, continuous autonomy over their digital privacy settings. You are never locked into your initial cookie choices; you have the legal right to revise, restrict, or entirely retract your cookie preferences at any time during your customer relationship. To make this process seamless and transparent, we provide an integrated one-click reset utility below.
          </p>
          <div style={{ backgroundColor: '#faf8f5', border: '1px solid #ebd9c0', borderRadius: '4px', padding: '24px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Cookie size={24} style={{ color: '#b47e00' }} />
              <div>
                <strong style={{ color: '#0c2340', fontSize: '1rem', display: 'block' }}>Reset Stored Cookie Preferences</strong>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Instantly clears your stored consent token and triggers the consent modal on next interaction.</span>
              </div>
            </div>

            <button
              onClick={handleResetPreferences}
              className="btn-primary"
              style={{ padding: '10px 22px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {resetSuccess ? (
                <>
                  <Check size={16} />
                  <span>Preferences Cleared! Reloading...</span>
                </>
              ) : (
                <>
                  <RotateCcw size={16} />
                  <span>Clear &amp; Re-Select Preferences</span>
                </>
              )}
            </button>
          </div>
          <p>
            Clicking the button above immediately removes all consent keys from your local storage and initiates a soft reload of the boutique, allowing you to re-evaluate your tracking choices in complete freedom.
          </p>
        </section>

        {/* Section 10 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            10. Browser-Level Cookie Management &amp; Universal Blocking
          </h2>
          <p style={{ marginBottom: '14px' }}>
            In addition to our in-platform consent controls, every modern web browser affords you the ability to inspect, restrict, block, or delete cookies globally across all visited websites. You can configure your browser preferences to automatically reject all third-party cookies, alert you whenever a server attempts to deposit a tracking token, or purge all cached cookies each time you terminate your browsing session.
          </p>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '16px 20px', marginBottom: '14px' }}>
            <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.86rem' }}>
              <li><strong>Google Chrome:</strong> Settings &rarr; Privacy and security &rarr; Third-party cookies &rarr; Block third-party cookies</li>
              <li><strong>Apple Safari:</strong> Settings &rarr; Privacy &rarr; Prevent cross-site tracking &rarr; Block all cookies</li>
              <li><strong>Mozilla Firefox:</strong> Settings &rarr; Privacy &amp; Security &rarr; Enhanced Tracking Protection &rarr; Strict mode</li>
              <li><strong>Microsoft Edge:</strong> Settings &rarr; Cookies and site permissions &rarr; Manage and delete cookies</li>
            </ul>
          </div>
          <p>
            Please note that universally disabling all cookies at the browser level may disrupt necessary session persistence on our website, preventing you from saving items to your shopping cart or completing payment checkouts in Canadian Dollars.
          </p>
        </section>

        {/* Section 11 */}
        <section>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            11. Global Privacy Control (GPC) &amp; &ldquo;Do Not Track&rdquo; Compliance
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Our engineering team is committed to adopting the latest technological privacy standards. Our digital boutique fully recognizes and respects the Global Privacy Control (GPC) signal transmitted by compatible modern browsers. When our edge servers detect an active GPC header, our tracking scripts automatically treat the signal as a universal opt-out of all non-essential analytics and tracking cookies, without requiring manual intervention from the customer.
          </p>
          <p>
            If you have questions, inquiries, or require technical assistance concerning our cookie protocols or data storage practices, our Data Protection Concierge is readily available to assist you at <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: '#b47e00', fontWeight: 600 }}>{SITE_CONFIG.contact.email}</a>.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
