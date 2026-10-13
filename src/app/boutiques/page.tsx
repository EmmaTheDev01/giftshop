import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DiamondSeparator from '@/components/DiamondSeparator';
import { SITE_CONFIG } from '@/config/site';
import { MapPin, Clock, Phone, ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: `Our Boutiques & Salons Across Canada | ${SITE_CONFIG.name}`,
  description:
    'Explore our Canadian boutique locations in Toronto, Montreal, and Vancouver. Book private consultations and discover handcrafted keepsakes in person.',
};

export default function BoutiquesDirectoryPage() {
  const boutiques = [
    {
      city: 'Toronto Flagship',
      district: 'Yorkville Heritage District',
      address: '138 Cumberland Street, Suite 200, Toronto, ON M5R 1A6',
      hours: 'Mon – Sat: 10:00 AM – 7:00 PM EST • Sun: 11:00 AM – 5:00 PM EST',
      phone: SITE_CONFIG.contact.phone,
      slug: 'toronto',
      description: 'Our premier Canadian flagship with private collector lounges, bespoke gift curation, and certified monument rivets.',
    },
    {
      city: 'Montreal Boutique',
      district: 'Vieux-Montréal / Old Montreal',
      address: '242 Rue Saint-Paul Ouest, Vieux-Montréal, QC H2Y 1Z9',
      hours: 'Lundi – Samedi : 10h00 – 19h00 HNE • Dimanche : 11h00 – 17h00 HNE',
      phone: SITE_CONFIG.contact.phone,
      slug: 'montreal',
      description: 'Set within an 1845 heritage salon with bilingual concierge service, Dammann Frères tea tastings, and custom gift wrapping.',
    },
    {
      city: 'Vancouver Showroom',
      district: 'Alberni Luxury Corridor',
      address: '1040 Alberni Street, Suite 320, Vancouver, BC V6E 1A3',
      hours: 'Tue – Sat: 10:00 AM – 6:00 PM PST • Sun – Mon: Private Appointment',
      phone: SITE_CONFIG.contact.phone,
      slug: 'vancouver',
      description: 'Our Pacific showroom offering executive gift suites, numbered edition previews, and same-day Metro Vancouver courier dispatch.',
    },
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      {/* Hero Banner */}
      <section
        style={{
          backgroundColor: '#0c2340',
          color: '#ffffff',
          padding: '72px 20px 60px',
          borderBottom: '2px solid #b47e00',
          position: 'relative',
        }}
      >
        <div className="container-custom" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '16px' }}>
            <Link href="/" style={{ color: '#dda82e' }}>Home</Link>
            <ChevronRight size={13} />
            <span style={{ color: '#ffffff' }}>Our Boutiques</span>
          </nav>

          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#dda82e',
              backgroundColor: 'rgba(221, 168, 46, 0.12)',
              border: '1px solid rgba(221, 168, 46, 0.3)',
              padding: '4px 10px',
              borderRadius: '2px',
              display: 'inline-block',
              marginBottom: '14px',
            }}
          >
            Coast-to-Coast Presence
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 600, marginBottom: '16px' }}>
            Our Boutiques &amp; Salons
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '720px' }}>
            Visit our physical locations in Toronto, Montreal, and Vancouver for private concierge appointments, hands-on keepsake viewings, and complimentary gift wrapping.
          </p>
        </div>
      </section>

      {/* Boutiques List */}
      <main className="container-custom" style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px 80px', flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '56px' }}>
          {boutiques.map((b) => (
            <div
              key={b.slug}
              style={{
                backgroundColor: '#faf8f5',
                border: '1px solid #ebd9c0',
                borderRadius: '6px',
                padding: '36px 32px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '28px',
                boxShadow: '0 4px 16px rgba(12, 35, 64, 0.04)',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b47e00', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {b.district}
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#0c2340', margin: '6px 0 12px', fontWeight: 600 }}>
                  {b.city}
                </h2>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  {b.description}
                </p>
                <Link
                  href={`/boutiques/${b.slug}`}
                  className="btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', fontSize: '0.88rem' }}
                >
                  <span>Explore Boutique &amp; Schedule Visit</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem', borderLeft: '1px solid #ebd9c0', paddingLeft: '24px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <MapPin size={18} style={{ color: '#b47e00', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#0c2340', display: 'block' }}>Address:</strong>
                    <span style={{ color: '#64748b' }}>{b.address}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <Clock size={18} style={{ color: '#b47e00', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#0c2340', display: 'block' }}>Opening Hours:</strong>
                    <span style={{ color: '#64748b' }}>{b.hours}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <Phone size={18} style={{ color: '#b47e00', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#0c2340', display: 'block' }}>Phone Concierge:</strong>
                    <span style={{ color: '#64748b' }}>{b.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <DiamondSeparator />

        {/* Artisan Partners Section */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '8px' }}>
            Artisan Partners &amp; Guild Studios
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '20px', maxWidth: '640px', margin: '0 auto 20px' }}>
            In addition to our physical boutiques, our collections are crafted by master artisans across France and Canada.
          </p>
          <Link href="/boutiques/artisan-partners" className="btn-secondary" style={{ padding: '10px 24px', fontSize: '0.88rem' }}>
            View All Artisan Houses &amp; Makers
          </Link>
        </div>
      </main>

      <ReassuranceFooter />
      <Footer />
    </div>
  );
}
