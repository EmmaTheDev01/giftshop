import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DiamondSeparator from '@/components/DiamondSeparator';
import { SITE_CONFIG } from '@/config/site';
import { MapPin, Clock, Phone, ArrowRight, ChevronRight, Sparkles, Building2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: `Our Boutiques & Salons Across Canada & USA | ${SITE_CONFIG.name}`,
  description:
    'Explore our boutique locations and partner salons across Canada and the United States. Book private consultations, discover architectural keepsakes, and experience artisan craftsmanship in person.',
};

export default function BoutiquesDirectoryPage() {
  const canadianBoutiques = [
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
      description: 'Set within an 1845 heritage salon with bilingual concierge service, Canadian maple reserve tastings, and custom gift wrapping.',
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

  const usaBoutiques = [
    {
      city: 'New York Flagship & Gallery',
      district: 'Fifth Avenue / SoHo Arts District',
      address: '580 Fifth Avenue, Suite 1400, New York, NY 10036',
      hours: 'Mon – Sat: 10:00 AM – 7:00 PM EST • Sun: 12:00 PM – 6:00 PM EST',
      phone: '+1 (800) 555-4438',
      slug: 'usa',
      description: 'Showcasing monumental architectural editions including the Statue of Liberty collector series, heirloom hardwood decor, and private collector salons.',
    },
    {
      city: 'Chicago Heritage Suite',
      district: 'Michigan Avenue / Magnificent Mile',
      address: '676 N Michigan Avenue, Suite 2100, Chicago, IL 60611',
      hours: 'Mon – Fri: 10:00 AM – 6:00 PM CST • Sat: 11:00 AM – 5:00 PM CST',
      phone: '+1 (800) 555-4438',
      slug: 'usa',
      description: 'An intimate gallery space dedicated to custom architectural wall sculptures, laser-cut cityscapes, and corporate executive gift curation.',
    },
    {
      city: 'Los Angeles Showroom',
      district: 'Beverly Hills / West Hollywood Corridor',
      address: '9454 Wilshire Boulevard, Suite 600, Beverly Hills, CA 90212',
      hours: 'Tue – Sat: 10:00 AM – 6:00 PM PST • Sun – Mon: Private Appointment',
      phone: '+1 (800) 555-4438',
      slug: 'usa',
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
            Canada &amp; USA Presence 🇨🇦 🇺🇸
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 600, marginBottom: '16px' }}>
            Our Boutiques &amp; Salons
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '720px' }}>
            Visit our physical locations across Canada and the United States for private concierge appointments, hands-on keepsake viewings, bespoke engraving, and complimentary gift wrapping.
          </p>

          {/* Quick country jump buttons */}
          <div style={{ display: 'flex', gap: '14px', marginTop: '24px', flexWrap: 'wrap' }}>
            <Link
              href="/boutiques/canada"
              style={{
                backgroundColor: '#b47e00',
                color: '#ffffff',
                padding: '10px 22px',
                borderRadius: '2px',
                fontWeight: 600,
                fontSize: '0.88rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>Explore Canada Locations 🇨🇦</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/boutiques/usa"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '10px 22px',
                borderRadius: '2px',
                fontWeight: 600,
                fontSize: '0.88rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>Explore USA Locations 🇺🇸</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Boutiques Main Content */}
      <main className="container-custom" style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px 80px', flex: 1 }}>
        
        {/* Section 1: Canada */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b47e00', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                Domestic Presence 🇨🇦
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#0c2340', fontWeight: 600, margin: '4px 0 0' }}>
                Canada Boutiques &amp; Salons
              </h2>
            </div>
            <Link href="/boutiques/canada" className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
              View Canada Directory
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {canadianBoutiques.map((b) => (
              <div
                key={b.city}
                style={{
                  backgroundColor: '#faf8f5',
                  border: '1px solid #ebd9c0',
                  borderRadius: '6px',
                  padding: '32px 28px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '24px',
                  boxShadow: '0 4px 16px rgba(12, 35, 64, 0.04)',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#b47e00', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {b.district}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#0c2340', margin: '6px 0 10px', fontWeight: 600 }}>
                    {b.city}
                  </h3>
                  <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '18px' }}>
                    {b.description}
                  </p>
                  <Link
                    href={`/boutiques/${b.slug}`}
                    className="btn-primary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '9px 20px', fontSize: '0.85rem' }}
                  >
                    <span>View Location &amp; Book</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem', borderLeft: '1px solid #ebd9c0', paddingLeft: '20px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <MapPin size={17} style={{ color: '#b47e00', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ color: '#0c2340', display: 'block' }}>Address:</strong>
                      <span style={{ color: '#64748b' }}>{b.address}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Clock size={17} style={{ color: '#b47e00', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ color: '#0c2340', display: 'block' }}>Hours:</strong>
                      <span style={{ color: '#64748b' }}>{b.hours}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Phone size={17} style={{ color: '#b47e00', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ color: '#0c2340', display: 'block' }}>Concierge:</strong>
                      <span style={{ color: '#64748b' }}>{b.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DiamondSeparator />

        {/* Section 2: USA */}
        <div style={{ margin: '56px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b47e00', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                United States Salons 🇺🇸
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#0c2340', fontWeight: 600, margin: '4px 0 0' }}>
                USA Boutiques &amp; Galleries
              </h2>
            </div>
            <Link href="/boutiques/usa" className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
              View USA Directory
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {usaBoutiques.map((b) => (
              <div
                key={b.city}
                style={{
                  backgroundColor: '#faf8f5',
                  border: '1px solid #ebd9c0',
                  borderRadius: '6px',
                  padding: '32px 28px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '24px',
                  boxShadow: '0 4px 16px rgba(12, 35, 64, 0.04)',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#b47e00', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {b.district}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#0c2340', margin: '6px 0 10px', fontWeight: 600 }}>
                    {b.city}
                  </h3>
                  <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '18px' }}>
                    {b.description}
                  </p>
                  <Link
                    href="/boutiques/usa"
                    className="btn-primary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '9px 20px', fontSize: '0.85rem' }}
                  >
                    <span>Inquire / Book Appointment</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem', borderLeft: '1px solid #ebd9c0', paddingLeft: '20px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <MapPin size={17} style={{ color: '#b47e00', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ color: '#0c2340', display: 'block' }}>Address:</strong>
                      <span style={{ color: '#64748b' }}>{b.address}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Clock size={17} style={{ color: '#b47e00', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ color: '#0c2340', display: 'block' }}>Hours:</strong>
                      <span style={{ color: '#64748b' }}>{b.hours}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Phone size={17} style={{ color: '#b47e00', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ color: '#0c2340', display: 'block' }}>Concierge:</strong>
                      <span style={{ color: '#64748b' }}>{b.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <ReassuranceFooter />
      <Footer />
    </div>
  );
}
