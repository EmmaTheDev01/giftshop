import React from 'react';
import LegalLayout from '@/components/LegalLayout';
import { SITE_CONFIG } from '@/config/site';

export const metadata = {
  title: `Terms & Conditions of Sale | ${SITE_CONFIG.name}`,
  description:
    'Official Terms of Sale governing online orders, Canadian Dollar (CAD) transactions, provincial taxes, shipping with Canada Post, returns, and customer guarantees.',
};

export default function TermsOfSalePage() {
  return (
    <LegalLayout
      title="Terms & Conditions of Sale"
      subtitle="These general commercial conditions govern all purchases of curated keepsakes, limited editions, and boutique gifts placed on our official online boutique in Canadian Dollars (CAD)."
      badge="Commercial Terms of Sale"
      lastUpdated="October 2026"
    >
      <div style={{ color: '#334155', lineHeight: 1.8, fontSize: '0.94rem' }}>
        {/* Section 1 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            1. Preamble, Contractual Scope &amp; Identification of Parties
          </h2>
          <p style={{ marginBottom: '14px' }}>
            These General Terms and Conditions of Sale (hereinafter referred to as the &ldquo;Terms of Sale&rdquo;) govern all contractual transactions, commercial agreements, and product sales concluded between {SITE_CONFIG.name} Retail Operations Inc. (&ldquo;the Boutique&rdquo;, &ldquo;we&rdquo;, or &ldquo;us&rdquo;) and any individual consumer acting for non-commercial or personal gift purposes (hereinafter the &ldquo;Customer&rdquo; or &ldquo;you&rdquo;) on our official digital commerce platform. By initiating, browsing, and completing an order through this website, you unconditionally acknowledge that you have read, comprehended, and agreed to be legally bound by these Terms of Sale in their entirety.
          </p>
          <p>
            We expressly reserve the legal right to adapt, modify, or update these Terms of Sale at our discretion to reflect evolving commercial standards, legislative updates, or logistical improvements across Canadian jurisdictions. The version of these Terms of Sale that is legally binding upon your transaction is the version publicly accessible on this website at the precise moment you finalize and submit your payment authorization.
          </p>
        </section>

        {/* Section 2 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            2. Product Presentation, Artisan Specifications &amp; Natural Variations
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Every curated keepsake, historical medal, porcelain cup, and apparel piece available on our boutique is presented with an authentic digital description, precise dimensions, artisanal materials, and high-fidelity photographs. Because our catalog showcases items crafted by master workshops using authentic materials such as mouth-blown glass, cupro-nickel alloys, Limoges porcelain, and organic maple syrup, minor natural variations in patina, metal polish, wood grain, or hue may naturally occur between production batches. These minute differences do not constitute product defects, but rather serve as verifiable evidence of handcrafted excellence and artisanal authenticity.
          </p>
          <p>
            All products are offered strictly subject to physical inventory availability. In the rare event that an artisan item ordered by a Customer becomes unexpectedly depleted or unavailable due to concurrent boutique purchases, our concierge will notify you via priority electronic mail within twenty-four (24) business hours to offer the option of an alternative keepsake or an immediate full refund processed to your original payment instrument in Canadian Dollars.
          </p>
        </section>

        {/* Section 3 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            3. Pricing Denomination in Canadian Dollars ($ CAD)
          </h2>
          <p style={{ marginBottom: '14px' }}>
            All prices listed across our digital boutique catalog, product detail pages, and checkout summaries are strictly denominated and billed in <strong>Canadian Dollars ($ CAD)</strong>. While our curated collections feature prestigious pieces imported directly from French artisan guild workshops, our patrons across Canada benefit from fully domestic pricing models with all transatlantic customs brokerage fees, duties, and import clearances already absorbed and handled prior to catalog presentation.
          </p>
          <p>
            The prices displayed on catalog pages exclude applicable Canadian provincial sales taxes and shipping fees, which are calculated dynamically and itemized with complete transparency during the final order review step prior to payment processing. We reserve the right to revise our catalog prices at any time without advance notice; however, any price changes will not affect orders that have already received an automated electronic confirmation.
          </p>
        </section>

        {/* Section 4 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            4. Canadian Sales Tax Allocation (GST, PST, QST &amp; HST)
          </h2>
          <p style={{ marginBottom: '14px' }}>
            In accordance with Canadian federal tax regulations administered by the Canada Revenue Agency (CRA) and provincial revenue bodies, sales taxes are levied on all tangible goods based strictly on the destination province or territory where the physical delivery is received. During checkout, once your Canadian shipping address is submitted, our automated tax computation engine itemizes the exact statutory tax rate applicable to your order, providing a fully compliant tax invoice for your records.
          </p>
          <div style={{ backgroundColor: '#faf8f5', border: '1px solid #ebd9c0', borderRadius: '4px', padding: '16px 20px', marginBottom: '14px' }}>
            <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.88rem' }}>
              <li><strong>Ontario:</strong> 13% Harmonized Sales Tax (HST)</li>
              <li><strong>Quebec:</strong> 5% Goods and Services Tax (GST) + 9.975% Quebec Sales Tax (QST)</li>
              <li><strong>British Columbia:</strong> 5% GST + 7% Provincial Sales Tax (PST)</li>
              <li><strong>Alberta, Northwest Territories, Nunavut, Yukon:</strong> 5% GST only</li>
              <li><strong>Nova Scotia, New Brunswick, Newfoundland &amp; Labrador, PEI:</strong> 15% HST</li>
              <li><strong>Manitoba &amp; Saskatchewan:</strong> 5% GST + applicable provincial sales tax (7% RST / 6% PST)</li>
            </ul>
          </div>
          <p>
            For international patrons ordering for delivery outside of Canada, Canadian sales taxes are automatically deducted; however, any local customs duties, clearance fees, or import VAT assessed by the destination nation&apos;s customs authorities remain the sole responsibility of the overseas recipient.
          </p>
        </section>

        {/* Section 5 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            5. Payment Methods &amp; Electronic Authorization (Visa &amp; Mastercard)
          </h2>
          <p style={{ marginBottom: '14px' }}>
            To ensure optimal security and instantaneous fraud protection for Canadian patrons, payments on our platform are processed exclusively through certified Visa and Mastercard payment networks equipped with modern 3D-Secure 2.0 customer authentication. Customers must be the lawful authorized cardholder of the payment card used for the transaction, or possess explicit permission from the cardholder to complete the purchase. All credit and debit card transactions are encrypted via TLS 1.3 tunnels and processed in Canadian Dollars (CAD).
          </p>
          <p>
            Your payment card is debited at the exact moment of order placement following real-time bank pre-authorization. If your financial institution declines authorization or if an anti-fraud security mismatch occurs (such as an address verification system discrepancy), the transaction will be cancelled immediately, no order confirmation will be dispatched, and our boutique will have no liability for any resulting delivery delay.
          </p>
        </section>

        {/* Section 6 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            6. Order Confirmation, Electronic Invoicing &amp; Gift Packaging
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Upon successful payment authorization, our system instantaneously generates a formal electronic invoice and confirmation receipt dispatched directly to your registered email address. This confirmation outlines your permanent order reference identifier (formatted as <code>CA-XXXXXX</code>), an itemized accounting of selected keepsakes, applicable Canadian provincial sales taxes, shipping coordinates, and estimated dispatch dates. Customers are advised to archive this electronic receipt for warranty claims and tracking purposes.
          </p>
          <p>
            Every order placed on our boutique is treated as an exceptional gift. Items are prepared within our Canadian packaging ateliers wrapped in acid-free tissue paper, presented in embossed navy sleeves, and accompanied by an official card of provenance. Customers may additionally request complimentary personalized gift messaging during checkout, which is delicately hand-inscribed on gold-bordered stationery.
          </p>
        </section>

        {/* Section 7 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            7. Canadian Shipping Protocols &amp; $95 Free Delivery Threshold
          </h2>
          <p style={{ marginBottom: '14px' }}>
            We provide prompt, secure delivery across all ten provinces and three territories of Canada. To celebrate our Canadian patrons, we proudly offer <strong>Complimentary Expedited Shipping on all orders totaling $95.00 CAD or more</strong> (calculated prior to provincial sales taxes). For orders falling below this threshold, transparent flat-rate shipping is applied at checkout: $9.95 CAD for deliveries within Ontario and Quebec, and $12.95 CAD for Western and Atlantic Canadian provinces.
          </p>
          <p>
            Parcels are prepared and dispatched from our primary Canadian logistics fulfillment center within twenty-four to forty-eight (24–48) business hours of order placement. Standard transit times range from 1 to 2 business days for the Montreal–Ottawa–Toronto corridor, 3 to 4 business days for Western Canada, and 4 to 6 business days for Atlantic Canada and remote northern communities serviced via Canada Post air transit.
          </p>
        </section>

        {/* Section 8 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            8. Transfer of Risk, Parcel Transit Insurance &amp; Title
          </h2>
          <p style={{ marginBottom: '14px' }}>
            In accordance with high standards of customer protection and Canadian consumer law, the risk of loss, theft, or damage to ordered keepsakes remains entirely with {SITE_CONFIG.name} until the parcel has been physically delivered to and accepted at the destination address designated by the Customer. Every shipment leaving our Canadian fulfillment center is fully insured against transit loss or catastrophic courier mishandling without additional insurance fees charged to the patron.
          </p>
          <p>
            Legal ownership and title to the products transfer definitively to the Customer only once our boutique has received complete, irreversible payment of the purchase price and physical delivery has occurred. If a package appears noticeably crushed, opened, or tampered with upon courier handover, we urge patrons to report the damage to our concierge within forty-eight (48) hours so our claims team can immediately dispatch an expedited replacement.
          </p>
        </section>

        {/* Section 9 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            9. The 30-Day Boutique Satisfaction Guarantee &amp; Return Rights
          </h2>
          <p style={{ marginBottom: '14px' }}>
            We take immense pride in the craftsmanship of our curated keepsakes and want every Canadian patron to experience absolute delight upon unboxing their order. If for any reason a product does not fulfill your expectations, you benefit from our <strong>30-Day Satisfaction Guarantee</strong>, enabling you to return any qualifying item within thirty (30) calendar days of confirmed delivery for a complete refund or boutique exchange in Canadian Dollars.
          </p>
          <p>
            To qualify for a refund, returned items must be in unused, unblemished, and salable condition, housed within their original packaging with all protective sleeves, ribbons, and numbered certificates intact. Custom personalized keepsakes with bespoke name engravings and perishable food items (such as opened maple syrup bottles or artisanal teas) are non-returnable due to health regulations and personalization characteristics, as detailed in our dedicated <a href="/returns" style={{ color: '#b47e00', fontWeight: 600 }}>Returns and Refunds Policy</a>.
          </p>
        </section>

        {/* Section 10 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            10. Limited Editions, Numbered Certificates &amp; Allocation Rules
          </h2>
          <p style={{ marginBottom: '14px' }}>
            A distinguished facet of our boutique involves the distribution of strictly limited collector editions, including certified architectural monument rivets, numbered bronze castings, and centenary commemoratives. Each limited edition piece is accompanied by an individually numbered Certificate of Authenticity signed by the director of the artisan workshop and bears a unique registration number documented within our master historical provenance registry.
          </p>
          <p>
            To prevent speculative commercial hoarding and ensure equitable access for genuine collectors across Canada, orders for limited editions may be subject to a strict limit of two (2) units per household or billing address. Any automated bot orders or multiple transactions suspected of commercial resale intent are subject to immediate cancellation and refund without prior notice at the sole discretion of boutique management.
          </p>
        </section>

        {/* Section 11 */}
        <section>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            11. Statutory Legal Warranties, Liability Limitations &amp; Governing Law
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Products sold through our boutique benefit from statutory legal warranties of quality, fitness for purpose, and latent defects provided under Canadian provincial consumer protection legislation, including Quebec&apos;s <em>Consumer Protection Act</em> and Ontario&apos;s <em>Consumer Protection Act</em>. Under no circumstances shall {SITE_CONFIG.name} be liable for any indirect, incidental, or consequential damages resulting from improper storage, misuse, or commercial utilization of our curated keepsakes.
          </p>
          <p>
            These Terms of Sale and all contracts formed hereunder shall be governed by, interpreted, and enforced in accordance with the laws of the Province of Ontario and the federal laws of Canada applicable therein (or the laws of your home Canadian province where mandatory consumer protections apply). Any legal proceedings arising out of an unresolved dispute shall be submitted to the exclusive jurisdiction of the competent courts sitting in Toronto, Ontario, Canada.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
