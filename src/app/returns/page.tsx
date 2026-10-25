import React from 'react';
import LegalLayout from '@/components/LegalLayout';
import { SITE_CONFIG } from '@/config/site';
import { RotateCcw } from 'lucide-react';

export const metadata = {
  title: `Returns & Refunds Policy | 30-Day Guarantee | ${SITE_CONFIG.name}`,
  description:
    'Our 30-day satisfaction guarantee, straightforward return procedures, prepaid shipping return labels, and prompt refund processing.',
};

export default function ReturnsRefundsPage() {
  return (
    <LegalLayout
      title="Returns & Refunds Policy"
      subtitle="Shop with absolute confidence. We provide an unconditional 30-day return window, prepaid return options, and seamless refunds to ensure your complete peace of mind."
      badge="30-Day Boutique Satisfaction Guarantee"
      lastUpdated="October 2026"
    >
      <div style={{ color: '#334155', lineHeight: 1.8, fontSize: '0.94rem' }}>
        {/* Guarantee Highlight Banner */}
        <div
          style={{
            backgroundColor: '#faf8f5',
            border: '1px solid #ebd9c0',
            borderRadius: '6px',
            padding: '24px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '36px',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(180, 126, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#b47e00',
              flexShrink: 0,
            }}
          >
            <RotateCcw size={28} />
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#0c2340', margin: '0 0 4px', fontWeight: 600 }}>
              The 30-Day Satisfaction Guarantee
            </h3>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b' }}>
              If your curated keepsake or artisan gift does not delight you completely, return it within 30 days of delivery for an exchange or a 100% refund.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            1. The 30-Day Boutique Satisfaction Promise &amp; Scope
          </h2>
          <p style={{ marginBottom: '14px' }}>
            At {SITE_CONFIG.name}, we believe that acquiring curated keepsakes and art objects should be an experience of effortless pleasure and absolute security. We understand that selecting fine art objects, luxury homeware, or tailored apparel online requires confidence in the tactile beauty and craftsmanship of the finished piece. To ensure your complete peace of mind, every standard purchase completed through our official digital boutique is backed by our comprehensive <strong>30-Day Satisfaction Guarantee</strong>.
          </p>
          <p>
            The thirty (30) calendar day return period begins on the verified date of physical delivery confirmed by the tracking carrier. If for any reason you are not completely enchanted with your selection upon opening your package, you are fully entitled to return the item to our logistics facility for a complete refund of the purchase price or an immediate boutique exchange.
          </p>
        </section>

        {/* Section 2 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            2. Return Eligibility Criteria &amp; Condition Standards
          </h2>
          <p style={{ marginBottom: '14px' }}>
            To qualify for an unreserved refund or product exchange under our 30-day guarantee, returned items must strictly satisfy our quality condition standards. Products must be returned in their original, unblemished, unworn, and unwashed condition, completely free from scratches, perfume scents, cosmetic smudges, or signs of domestic handling. Apparel items must retain all original fabric tags attached in their unaltered factory locations.
          </p>
          <p>
            Furthermore, fine keepsakes—such as historical medals, porcelain sets, and scale replica monuments—must be returned inside their original presentation gift boxes, complete with protective molded foam inserts, satin ribbons, documentation leaflets, and numbered Certificates of Authenticity. Items returned missing their official certificates or presentation packaging may incur a fifteen percent (15%) restocking fee or be returned to the sender.
          </p>
        </section>

        {/* Section 3 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            3. Non-Returnable Custom &amp; Perishable Artisan Goods
          </h2>
          <p style={{ marginBottom: '14px' }}>
            While we strive to accommodate all return requests with maximal flexibility, certain product categories are legally and operationally exempt from return privileges under consumer regulations. Items that have been customized with bespoke personal inscriptions—such as engraved bronze plates, personalized wooden plaques, or custom monograms—cannot be returned or exchanged unless a typographical error occurred on our part during fabrication.
          </p>
          <p>
            Similarly, perishable culinary delicacies and gourmet goods are strictly non-returnable once the factory tamper-evident safety seals have been broken, in strict adherence to health and food safety regulations. If an edible product arrives with broken seals or transit damage, please refer to Section 8 below for immediate replacement protocols.
          </p>
        </section>

        {/* Section 4 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            4. Step-by-Step Return Process &amp; Digital Label Generation
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Initiating a return with our boutique is straightforward and user-friendly. To begin, send an electronic message to our dedicated returns desk at <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: '#b47e00', fontWeight: 600 }}>{SITE_CONFIG.contact.email}</a> indicating your unique Order Number, the specific item(s) you wish to return, and whether you prefer an exchange or a refund.
          </p>
          <p>
            Within twenty-four (24) business hours of your request, our concierge will issue a Return Merchandise Authorization (RMA) code along with a pre-formatted electronic return packing slip. You simply place the slip inside the return parcel alongside the carefully packaged keepsakes to ensure immediate identification when the shipment arrives at our intake inspection dock.
          </p>
        </section>

        {/* Section 5 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            5. Return Shipping Labels &amp; Drop-Off
          </h2>
          <p style={{ marginBottom: '14px' }}>
            For eligible returns, our concierge provides an official, prepaid <strong>Return Shipping Label</strong> via downloadable PDF. You do not need to calculate postage fees or purchase stamps; simply print the label and affix it securely over the original shipping label on the exterior of the parcel box using clear packing tape.
          </p>
          <p>
            Once sealed, your parcel can be dropped off conveniently at any authorized carrier drop-off location or postal retail outlet. The package will travel under tracked expedited courier service directly to our primary logistics center, with live tracking milestones accessible online throughout the transit period.
          </p>
        </section>

        {/* Section 6 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            6. Quality Inspection Protocols at the Logistics Hub
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Upon physical arrival at our logistics hub, all return parcels undergo a meticulous quality assessment conducted by our artisan inspection specialists within forty-eight (48) business hours of intake. Our specialists inspect the item under magnification lamps to verify that the piece has remained intact, that all numbered edition hallmarks match our registration logs, and that the packaging contains all original protective elements.
          </p>
          <p>
            Following a successful inspection, our quality team marks the RMA as approved within our warehouse management software, which automatically triggers the immediate release of funds through our payment processing gateway and dispatches an electronic confirmation notification to your email address.
          </p>
        </section>

        {/* Section 7 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            7. Refund Reimbursement Timelines &amp; Banking Processing
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Approved refunds are credited directly and exclusively to the original payment instrument utilized at the time of purchase. The refunded amount includes the full purchase price of the returned keepsakes as well as any applicable statutory taxes collected on those items.
          </p>
          <p>
            While our boutique releases your refund within forty-eight (48) hours of inspection approval, banking networks and credit card issuers typically require an additional three to five (3–5) business days to post the credit to your monthly statement. If your refund has not reflected on your card account after seven (7) business days from our confirmation notice, our concierge will gladly furnish your transaction reference number to assist your financial institution in tracing the credit.
          </p>
        </section>

        {/* Section 8 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            8. Damaged, Defective or Incorrect Items Received in Transit
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Every parcel departing our packaging ateliers is thoroughly inspected and insured against courier damage. In the unlikely event that a package arrives showing visible transit damage, crushed packaging, or if you discover a manufacturing defect or wrong item upon unboxing, we ask that you alert our concierge within forty-eight (48) hours of delivery with photographic documentation of the parcel and defective item.
          </p>
          <p>
            In all cases of verified transit damage or defective merchandise, {SITE_CONFIG.name} assumes complete financial responsibility. We will immediately expedite a brand new replacement keepsake at zero cost to you with priority courier delivery, or issue an instantaneous full refund including all original shipping fees without requiring you to wait for a carrier claims investigation.
          </p>
        </section>

        {/* Section 9 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            9. Gift Returns &amp; Store Credit Options for Gift Recipients
          </h2>
          <p style={{ marginBottom: '14px' }}>
            If you have received an exquisite keepsake as a gift from another patron and wish to make an exchange without notifying the original purchaser, our concierge provides discreet gift return handling. Upon verification of the order reference number on the gift packing slip (or identifying the sender&apos;s name and approximate purchase date), you may return the item in exchange for a non-expiring Boutique Digital Gift Certificate.
          </p>
          <p>
            The digital gift certificate can be utilized immediately across our entire catalog of curated gifts, lifestyle keepsakes, and limited edition artisan collections. The original purchaser will not be notified of the exchange, ensuring complete discretion and courtesy for both parties.
          </p>
        </section>

        {/* Section 10 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            10. International Returns &amp; Cross-Border Customs Procedures
          </h2>
          <p style={{ marginBottom: '14px' }}>
            For international orders, patrons may still exercise their 30-day return rights under this policy. International return shipping transit is the responsibility of the overseas customer. Return shipments must be dispatched via a tracked, insured postal or courier service addressed to our receiving facility.
          </p>
          <p>
            When completing the international customs declaration form on the parcel exterior, patrons must clearly designate the shipment contents as &ldquo;Commercial Merchandise Return&rdquo; with the original order invoice attached.
          </p>
        </section>

        {/* Section 11 */}
        <section>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            11. Return Concierge Assistance, Inquiries &amp; Contacts
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Our dedicated Customer Experience Concierge is committed to making every step of your return, refund, or exchange effortless and reassuring. Should you have any questions regarding packaging techniques for delicate porcelain, tracking a return parcel, or selecting an alternate artisan creation, our team is available by phone and email six days a week.
          </p>
          <div style={{ backgroundColor: '#faf8f5', border: '1px solid #ebd9c0', borderRadius: '4px', padding: '18px 22px' }}>
            <p style={{ margin: '0 0 6px' }}><strong>Returns &amp; Exchange Desk:</strong> <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: '#b47e00', fontWeight: 600 }}>{SITE_CONFIG.contact.email}</a></p>
            <p style={{ margin: '0 0 6px' }}><strong>Concierge Phone:</strong> <strong>{SITE_CONFIG.contact.phone}</strong> (Mon – Fri, 9:00 AM – 6:00 PM EST)</p>
            <p style={{ margin: 0 }}><strong>Returns Logistics Center:</strong> {SITE_CONFIG.name} Returns Intake Operations</p>
          </div>
        </section>
      </div>
    </LegalLayout>
  );
}
