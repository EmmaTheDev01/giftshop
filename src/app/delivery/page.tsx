import React from 'react';
import LegalLayout from '@/components/LegalLayout';
import { SITE_CONFIG } from '@/config/site';
import { Truck } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: `Delivery & Shipping Policy | ${SITE_CONFIG.name}`,
  description:
    'Express worldwide delivery and shipping timelines, express courier options, and archival packaging standards.',
};

export default function DeliveryShippingPage() {
  return (
    <LegalLayout
      title="Delivery & Shipping Policy"
      subtitle="Expedited tracked delivery with premium packaging standards, featuring complimentary shipping on qualifying orders."
      badge="Global Tracked Delivery"
      lastUpdated="October 2026"
    >
      <div style={{ color: '#334155', lineHeight: 1.8, fontSize: '0.94rem' }}>
        {/* Free Shipping Highlight Banner */}
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
            <Truck size={28} />
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#0c2340', margin: '0 0 4px', fontWeight: 600 }}>
              Express Delivery &amp; Worldwide Shipping
            </h3>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b' }}>
              Complimentary tracked expedited shipping on orders meeting the minimum order threshold to domestic and international destinations.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            1. Overview of Fulfillment Architecture &amp; Hubs
          </h2>
          <p style={{ marginBottom: '14px' }}>
            At {SITE_CONFIG.name}, we operate a centralized fulfillment and logistics infrastructure specifically engineered to provide rapid, temperature-controlled, and highly secure parcel transit. Our primary operations hubs are chosen strategically for their direct proximity to major logistics interchanges, international air cargo terminals, and premier carrier sorting nodes.
          </p>
          <p>
            Orders received by 1:00 PM local time on business days are reviewed, packaged by our artisan logistics specialists, and dispatched into the courier network within twenty-four (24) business hours. Every parcel leaves our facility under individual barcode tracking, ensuring transparent accountability from the moment your keepsake leaves our packing table until it is physically delivered to your home or office.
          </p>
        </section>

        {/* Section 2 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            2. Complimentary Delivery Threshold
          </h2>
          <p style={{ marginBottom: '14px' }}>
            To show our genuine appreciation to our collectors and patrons, we proudly provide <strong>Complimentary Expedited Shipping on all qualifying orders</strong> reaching the designated checkout threshold. This threshold applies automatically during the checkout workflow without demanding any promotional coupon code.
          </p>
          <p>
            For curated orders below the qualifying threshold, our boutique applies transparent, fair-rate shipping fees designed purely to offset carrier costs, clearly itemized during final review prior to payment.
          </p>
        </section>

        {/* Section 3 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            3. Premier Courier Partners
          </h2>
          <p style={{ marginBottom: '14px' }}>
            To guarantee absolute delivery reliability across both metropolitan and regional postal routes, we partner exclusively with leading commercial parcel carriers. Our designated carrier partners provide extensive network coverage through localized depots, secure parcel lockers, and dedicated couriers.
          </p>
          <p>
            For high-value collector pieces and fragile porcelain shipments, our dispatch engine dynamically selects the optimal carrier based on real-time transit velocity and handling metrics. Every parcel is dispatched under verified signature options where requested, providing patrons with complete assurance that their precious keepsakes will never be left unattended in unsecured lobbies.
          </p>
        </section>

        {/* Section 4 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            4. Estimated Transit Schedules
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Standard transit durations are calculated from the moment of carrier departure from our central logistics hub. Typical delivery windows are itemized below:
          </p>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '18px 22px', marginBottom: '14px' }}>
            <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
              <li><strong>Major Metropolitan Corridors:</strong> 1 to 2 business days.</li>
              <li><strong>Regional Urban Centers:</strong> 2 to 4 business days.</li>
              <li><strong>Secondary Cities &amp; Districts:</strong> 3 to 5 business days.</li>
              <li><strong>Remote &amp; Outlying Communities:</strong> 5 to 8 business days via priority cargo transit.</li>
            </ul>
          </div>
          <p>
            Please note that transit durations may experience temporary minor variances during severe weather advisories or peak holiday shipping weeks (such as late November through December).
          </p>
        </section>

        {/* Section 5 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            5. Priority Express Courier &amp; Same-Day Options
          </h2>
          <p style={{ marginBottom: '14px' }}>
            When an anniversary, celebration, or corporate event demands urgent gift presentation, patrons can upgrade to our <strong>Priority Express Courier</strong> service during checkout. Priority express shipments travel via dedicated air cargo routes, guaranteeing overnight or 24-to-48-hour delivery for major urban centers.
          </p>
          <p>
            Additionally, patrons located within primary metropolitan areas can take advantage of our exclusive same-day Messenger Service for in-stock keepsakes ordered prior to 11:00 AM local time. These hand-delivered gifts arrive presented in luxury boutique gift bags with satin ribbons, delivered directly to residences, corporate offices, or hotel suites.
          </p>
        </section>

        {/* Section 6 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            6. Real-Time Tracking Milestones &amp; Live Telemetry
          </h2>
          <p style={{ marginBottom: '14px' }}>
            We keep our patrons thoroughly informed at every milestone of the fulfillment journey. Immediately upon parcel handover to our shipping carrier, our automated notification system transmits a detailed Dispatch Notification directly to your email, containing your carrier tracking code and a direct link to our integrated <Link href="/tracking" style={{ color: '#b47e00', fontWeight: 600 }}>Guest Order Tracking</Link> portal.
          </p>
          <p>
            Our tracking interface provides live updates for carrier scans, including outbound facility departure, regional sorting hub transfers, out-for-delivery status, and verified delivery confirmation with timestamps. Patrons may also opt-in to SMS text message notifications for real-time delivery alerts.
          </p>
        </section>

        {/* Section 7 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            7. Packaging Standards &amp; Fragile Keepsake Protection
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Because our collections feature delicate keepsakes such as fine porcelain, crystal paperweights, mouth-blown glass globes, and numbered architectural models, our packaging protocols exceed ordinary commercial standards. Each piece is nestled within custom-molded high-density protective foam, wrapped in acid-free archival tissue paper, and enclosed within double-walled corrugated shipping cartons designed to withstand severe impacts.
          </p>
          <p>
            Every parcel is sealed using reinforced tamper-evident kraft security tape and clearly marked with advisory labels. These comprehensive safeguards ensure that your curated gifts arrive in museum-grade, pristine presentation condition, ready for immediate gifting.
          </p>
        </section>

        {/* Section 8 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            8. Non-Delivery, Courier Exceptions &amp; Address Redirection
          </h2>
          <p style={{ marginBottom: '14px' }}>
            In the event that the carrier is unable to complete a physical delivery due to recipient absence or lack of secure drop-off areas, the courier will leave a secure Delivery Notice Card at your door or mailbox directing you to the nearest postal depot where your package will be safely held for pickup.
          </p>
          <p>
            If you need to update or redirect your delivery address after dispatch has occurred, please notify our shipping concierge immediately at <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: '#b47e00', fontWeight: 600 }}>{SITE_CONFIG.contact.email}</a>.
          </p>
        </section>

        {/* Section 9 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            9. International Deliveries &amp; Worldwide Logistics
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Our boutique proudly fulfills international gift orders destined for patrons across the globe. International shipments are billed transparently and dispatched under International Priority services.
          </p>
          <p>
            Deliveries to international destinations typically arrive within three to eight (3–8) business days depending on customs and local courier handling. Foreign destination import duties, VAT, and local customs brokerage remain the statutory responsibility of the overseas recipient in accordance with international postal treaties.
          </p>
        </section>

        {/* Section 10 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            10. Environmental Sustainability &amp; Eco-Responsible Packaging
          </h2>
          <p style={{ marginBottom: '14px' }}>
            As stewards of nature and heritage artisanry, {SITE_CONFIG.name} is dedicated to reducing the environmental footprint of digital commerce. Our packaging materials are selected for maximal ecological sustainability: ninety-five percent (95%) of our outer shipping boxes are manufactured from FSC-certified recycled corrugated fiber, and all void-fill cushioning utilizes 100% biodegradable packing materials.
          </p>
          <p>
            Furthermore, our primary courier partners maintain dedicated carbon-neutral parcel shipping initiatives that offset greenhouse gas emissions generated by ground delivery fleets.
          </p>
        </section>

        {/* Section 11 */}
        <section>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            11. Shipping Concierge Inquiries, Claims &amp; Support Directory
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Our Shipping &amp; Logistics Concierge is always at your service to answer carrier inquiries, verify transit timelines, or coordinate scheduled deliveries for special celebrations.
          </p>
          <div style={{ backgroundColor: '#faf8f5', border: '1px solid #ebd9c0', borderRadius: '4px', padding: '18px 22px' }}>
            <p style={{ margin: '0 0 6px' }}><strong>Shipping Concierge Email:</strong> <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: '#b47e00', fontWeight: 600 }}>{SITE_CONFIG.contact.email}</a></p>
            <p style={{ margin: '0 0 6px' }}><strong>Phone Support:</strong> <strong>{SITE_CONFIG.contact.phone}</strong> (Monday – Friday, 9:00 AM – 6:00 PM EST)</p>
            <p style={{ margin: 0 }}><strong>Central Logistics Hub:</strong> {SITE_CONFIG.name} Fulfillment Center Operations</p>
          </div>
        </section>
      </div>
    </LegalLayout>
  );
}
