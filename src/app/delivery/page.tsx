import React from 'react';
import LegalLayout from '@/components/LegalLayout';
import { SITE_CONFIG } from '@/config/site';
import { Truck, Clock, ShieldCheck, MapPin, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: `Delivery & Shipping Policy • Canada & USA | ${SITE_CONFIG.name}`,
  description:
    'Express delivery across Canada and the United States. Transit timelines by province and state, cross-border express courier options, and archival packaging standards.',
};

export default function DeliveryShippingPage() {
  return (
    <LegalLayout
      title="Delivery & Shipping Policy • Canada & USA"
      subtitle="Expedited tracked delivery across all Canadian provinces and territories as well as the contiguous United States, featuring complimentary shipping on qualifying orders."
      badge="Delivery Across Canada & USA 🇨🇦 🇺🇸"
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
              Express Delivery Across Canada &amp; the USA 🇨🇦 🇺🇸
            </h3>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b' }}>
              Complimentary tracked expedited shipping on orders totaling $95.00 CAD or $70.00 USD and above to domestic and cross-border destinations.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            1. Overview of Canadian Fulfillment Architecture &amp; Hubs
          </h2>
          <p style={{ marginBottom: '14px' }}>
            At {SITE_CONFIG.name}, we operate a centralized Canadian fulfillment and logistics infrastructure specifically engineered to provide rapid, temperature-controlled, and highly secure parcel transit across our vast nation. Our primary operations hub is situated in the Greater Montreal Area, chosen strategically for its direct proximity to major trans-Canada logistics interchanges, international air cargo terminals at Montreal-Trudeau (YUL), and regional sorting nodes servicing the Windsor-Quebec City commercial corridor.
          </p>
          <p>
            Orders received by 1:00 PM Eastern Standard Time on business days are reviewed, packaged by our artisan logistics specialists, and dispatched into the courier network within twenty-four (24) business hours. Every parcel leaves our facility under individual barcode tracking, ensuring transparent accountability from the moment your keepsake leaves our packing table until it is physically delivered to your home or office.
          </p>
        </section>

        {/* Section 2 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            2. The $95.00 CAD Complimentary Delivery Threshold
          </h2>
          <p style={{ marginBottom: '14px' }}>
            To show our genuine appreciation to Canadian collectors and patrons, we proudly provide <strong>Complimentary Expedited Shipping on all domestic orders reaching $95.00 CAD or more</strong>. This threshold is calculated based on the net value of your cart before the application of provincial sales taxes (GST, PST, QST, or HST) and applies automatically during the checkout workflow without demanding any promotional coupon code.
          </p>
          <p>
            For curated orders below the $95.00 CAD qualifying threshold, our boutique applies transparent, fair-rate shipping fees designed purely to offset carrier costs: a flat rate of $9.95 CAD for deliveries within Ontario and Quebec, and $12.95 CAD for deliveries addressed to Alberta, British Columbia, Manitoba, Saskatchewan, and Atlantic Canada. Remote territorial communities are serviced at a transparent flat subsidized rate of $18.95 CAD.
          </p>
        </section>

        {/* Section 3 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            3. Domestic Canadian Courier Partners (Canada Post, FedEx &amp; UPS)
          </h2>
          <p style={{ marginBottom: '14px' }}>
            To guarantee absolute delivery reliability across both metropolitan high-rises and rural postal routes, we partner exclusively with Canada&apos;s leading commercial parcel carriers: <strong>Canada Post Corporation</strong>, <strong>FedEx Canada</strong>, and <strong>UPS Canada</strong>. Canada Post serves as our designated national carrier partner, providing unrivaled coverage through its extensive network of localized post offices, secure community parcel lockers, and rural route couriers.
          </p>
          <p>
            For high-value collector pieces and fragile porcelain shipments, our dispatch engine dynamically selects the optimal carrier based on real-time transit velocity and handling metrics. Every parcel is dispatched under verified signature options where requested, providing patrons with complete assurance that their precious keepsakes will never be left unattended in unsecured lobbies.
          </p>
        </section>

        {/* Section 4 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            4. Estimated Transit Schedules by Province &amp; Territory
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Standard transit durations are calculated from the moment of carrier departure from our central logistics hub. Typical delivery windows across Canadian geographical regions are itemized below:
          </p>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '18px 22px', marginBottom: '14px' }}>
            <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
              <li><strong>Central Canada (Quebec &amp; Ontario):</strong> 1 to 2 business days (Montreal, Quebec City, Ottawa, Toronto, GTA, Hamilton).</li>
              <li><strong>Western Canada (Alberta &amp; British Columbia):</strong> 3 to 4 business days (Calgary, Edmonton, Vancouver, Victoria, Kelowna).</li>
              <li><strong>Prairie Provinces (Manitoba &amp; Saskatchewan):</strong> 3 to 4 business days (Winnipeg, Regina, Saskatoon).</li>
              <li><strong>Atlantic Canada (NS, NB, PEI, Newfoundland &amp; Labrador):</strong> 3 to 5 business days (Halifax, Moncton, Charlottetown, St. John&apos;s).</li>
              <li><strong>Northern Territories (Yukon, NWT &amp; Nunavut):</strong> 5 to 8 business days (Whitehorse, Yellowknife, Iqaluit via Air Cargo).</li>
            </ul>
          </div>
          <p>
            Please note that transit durations may experience temporary minor variances during severe Canadian winter weather advisories or peak holiday shipping weeks (such as late November through December).
          </p>
        </section>

        {/* Section 5 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            5. Priority Express Courier &amp; Metropolitan Same-Day Options
          </h2>
          <p style={{ marginBottom: '14px' }}>
            When an anniversary, celebration, or corporate event demands urgent gift presentation, patrons can upgrade to our <strong>Priority Express Courier</strong> service during checkout. Priority express shipments travel via dedicated air cargo routes, guaranteeing overnight delivery to major Canadian metropolitan airports and delivery within 24 to 48 hours for secondary urban centers.
          </p>
          <p>
            Additionally, patrons located within the metropolitan boundaries of Toronto, Montreal, and Vancouver can take advantage of our exclusive same-day White-Glove Messenger Service for in-stock keepsakes ordered prior to 11:00 AM local time. These hand-delivered gifts arrive presented in luxury boutique gift bags with satin ribbons, delivered directly to residences, corporate offices, or hotel suites.
          </p>
        </section>

        {/* Section 6 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            6. Real-Time Tracking Milestones &amp; Live Telemetry
          </h2>
          <p style={{ marginBottom: '14px' }}>
            We keep our patrons thoroughly informed at every milestone of the fulfillment journey. Immediately upon parcel handover to Canada Post, our automated notification system transmits a detailed Dispatch Notification directly to your email, containing your carrier tracking code (e.g. <code>CP-884109482CA</code>) and a direct link to our integrated <Link href="/tracking" style={{ color: '#b47e00', fontWeight: 600 }}>Guest Order Tracking</Link> portal.
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
            Because our collections feature delicate keepsakes such as fine Limoges porcelain, lead crystal paperweights, mouth-blown glass globes, and numbered architectural models, our packaging protocols exceed ordinary commercial standards. Each piece is nestled within custom-molded high-density protective foam, wrapped in acid-free archival tissue paper, and enclosed within double-walled corrugated shipping cartons designed to withstand severe impacts and Canadian winter temperature fluctuations.
          </p>
          <p>
            Every parcel is sealed using reinforced tamper-evident kraft security tape and clearly marked with bilingual &ldquo;FRAGILE / MANIER AVEC SOIN&rdquo; advisory labels. These comprehensive safeguards ensure that your curated gifts arrive in museum-grade, pristine presentation condition, ready for immediate gifting.
          </p>
        </section>

        {/* Section 8 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            8. Non-Delivery, Courier Exceptions &amp; Address Redirection
          </h2>
          <p style={{ marginBottom: '14px' }}>
            In the event that the carrier is unable to complete a physical delivery due to recipient absence or lack of secure drop-off areas, Canada Post will leave a secure Delivery Notice Card at your door or mailbox. The notice directs you to your neighborhood retail postal outlet where your package will be safely held for fifteen (15) calendar days awaiting pickup with official government photo identification.
          </p>
          <p>
            If you need to update or redirect your delivery address after dispatch has occurred, please notify our shipping concierge immediately at <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: '#b47e00', fontWeight: 600 }}>{SITE_CONFIG.contact.email}</a>. While we make every attempt to intercept and re-route parcels with carrier dispatch managers, redirections requested while a package is already in transit may incur modest carrier re-routing administrative fees.
          </p>
        </section>

        {/* Section 9 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            9. International Deliveries &amp; Worldwide Cross-Border Logistics
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Beyond Canada, our boutique proudly fulfills international gift orders destined for patrons and diplomats across the United States, the European Union, the United Kingdom, Australia, Japan, and over fifty additional countries. International shipments are billed transparently in Canadian Dollars (CAD) and dispatched under Tracked Packet International or FedEx International Priority services.
          </p>
          <p>
            Deliveries to the United States typically arrive within three to six (3–6) business days, while European shipments arrive within five to ten (5–10) business days. For international orders, Canadian domestic sales taxes are automatically deducted at checkout; however, foreign destination import duties, VAT, and local customs brokerage remain the statutory responsibility of the overseas recipient in accordance with international postal treaties.
          </p>
        </section>

        {/* Section 10 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            10. Environmental Sustainability &amp; Eco-Responsible Packaging
          </h2>
          <p style={{ marginBottom: '14px' }}>
            As stewards of Canadian nature and heritage artisanry, {SITE_CONFIG.name} is dedicated to reducing the environmental footprint of digital commerce. Our packaging materials are selected for maximal ecological sustainability: ninety-five percent (95%) of our outer shipping boxes are manufactured from FSC-certified recycled Canadian corrugated fiber, and all void-fill cushioning utilizes 100% biodegradable cornstarch packing chips that dissolve harmlessly in warm water.
          </p>
          <p>
            Furthermore, our primary Canadian courier partner, Canada Post, maintains dedicated carbon-neutral parcel shipping initiatives that offset greenhouse gas emissions generated by ground delivery fleets across the nation. By shopping with our boutique, patrons support responsible artisan stewardship and sustainable commerce across Canada.
          </p>
        </section>

        {/* Section 11 */}
        <section>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '14px', fontWeight: 600 }}>
            11. Shipping Concierge Inquiries, Claims &amp; Support Directory
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Our Shipping &amp; Logistics Concierge is always at your service to answer carrier inquiries, verify transit timelines for remote postal codes, or coordinate scheduled deliveries for special celebrations.
          </p>
          <div style={{ backgroundColor: '#faf8f5', border: '1px solid #ebd9c0', borderRadius: '4px', padding: '18px 22px' }}>
            <p style={{ margin: '0 0 6px' }}><strong>Shipping Concierge Email:</strong> <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: '#b47e00', fontWeight: 600 }}>{SITE_CONFIG.contact.email}</a></p>
            <p style={{ margin: '0 0 6px' }}><strong>Toll-Free Phone Support:</strong> <strong>{SITE_CONFIG.contact.phone}</strong> (Monday – Friday, 9:00 AM – 6:00 PM EST)</p>
            <p style={{ margin: 0 }}><strong>Central Canadian Logistics Hub:</strong> {SITE_CONFIG.name} Fulfillment Center, 242 Rue Saint-Paul Ouest, Montreal, QC H2Y 1Z9</p>
          </div>
        </section>
      </div>
    </LegalLayout>
  );
}
