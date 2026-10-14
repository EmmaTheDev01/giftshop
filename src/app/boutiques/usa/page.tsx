import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DiamondSeparator from '@/components/DiamondSeparator';
import { SITE_CONFIG } from '@/config/site';
import { MapPin, Clock, Phone, Sparkles, ChevronRight, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: `USA Boutiques & Salons | ${SITE_CONFIG.name}`,
  description:
    'Explore Memoriq boutiques and showrooms across the United States in New York, Chicago, and Los Angeles. Artisan keepsakes, architectural editions, and bespoke gifting.',
};

export default function USABoutiquesPage() {
  const usaLocations = [
    {
      city: 'New York Flagship & Gallery',
      district: 'Fifth Avenue / SoHo Arts District',
      address: '580 Fifth Avenue, Suite 1400, New York, NY 10036',
      hours: 'Mon – Sat: 10:00 AM – 7:00 PM EST • Sun: 12:00 PM – 6:00 PM EST',
      phone: '+1 (800) 555-4438',
      slug: 'new-york',
      description: 'Our premier American flagship showcasing monumental architectural editions including the Statue of Liberty collector series, heirloom hardwood decor, and private collector salons.',
    },
    {
      city: 'Chicago Heritage Suite',
      district: 'Michigan Avenue / Magnificent Mile',
      address: '676 N Michigan Avenue, Suite 2100, Chicago, IL 60611',
      hours: 'Mon – Fri: 10:00 AM – 6:00 PM CST • Sat: 11:00 AM – 5:00 PM CST',
      phone: '+1 (800) 555-4438',
      slug: 'chicago',
      description: 'An intimate gallery space dedicated to custom architectural wall sculptures, laser-cut cityscapes, and corporate executive gift curation.',
    },
    {
      city: 'Los Angeles Showroom',
      district: 'Beverly Hills / West Hollywood Corridor',
      address: '9454 Wilshire Boulevard, Suite 600, Beverly Hills, CA 90212',
      hours: 'Tue – Sat: 10:00 AM – 6:00 PM PST • Sun – Mon: Private Appointment',
      phone: '+1 (800) 555-4438',
      slug: 'los-angeles',
      description: 'Serving our West Coast patrons with curated bespoke keepsakes, personalized wooden plaques, and private collector consultations.',
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
            <Link href="/boutiques" style={{ color: '#dda82e' }}>Our Boutiques</Link>
            <ChevronRight size={13} />
            <span style={{ color: '#ffffff' }}>USA 🇺🇸</span>
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
            United States Flagships &amp; Salons 🇺🇸
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 600, marginBottom: '16px' }}>
            Boutiques Across North America
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '720px' }}>
            Experience our curated collections in North America. Celebrating iconic North American landmarks, and white-glove concierge services across the United States.
          </p>
        </div>
      </section>

      {/* Boutiques List */}
      <main className="container-custom" style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px 80px', flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '56px' }}>
          {usaLocations.map((b) => (
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
                  href="/contact"
                  className="btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', fontSize: '0.88rem' }}
                >
                  <span>Inquire / Schedule Appointment</span>
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
                    <strong style={{ color: '#0c2340', display: 'block' }}>USA Concierge:</strong>
                    <span style={{ color: '#64748b' }}>{b.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <DiamondSeparator />

        {/* Cross link to Canada Boutiques */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '8px' }}>
            Explore Our Canadian Flagship Salons
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '20px', maxWidth: '640px', margin: '0 auto 20px' }}>
            Discover our heritage boutiques in Toronto, Montreal, and Vancouver.
          </p>
          <Link href="/boutiques/canada" className="btn-secondary" style={{ padding: '10px 24px', fontSize: '0.88rem' }}>
            Explore Canada Boutiques 🇨🇦
          </Link>
        </div>
      </main>

      <ReassuranceFooter />
      <Footer />
    </div>
  );
}
