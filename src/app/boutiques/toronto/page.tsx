import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DiamondSeparator from '@/components/DiamondSeparator';
import { SITE_CONFIG } from '@/config/site';
import { MapPin, Clock, Phone, Mail, Award, Sparkles, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: `Toronto Flagship Boutique | Yorkville | ${SITE_CONFIG.name}`,
  description:
    'Visit our premier Toronto Flagship in Yorkville. Explore luxury Parisian and Canadian keepsakes, private gift consultations, bespoke engraving, and artisan tastings.',
};

export default function TorontoBoutiquePage() {
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
            <span style={{ color: '#ffffff' }}>Toronto Flagship</span>
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
            Yorkville Heritage Flagship
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 600, marginBottom: '16px' }}>
            Toronto Flagship Boutique
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '720px' }}>
            Nestled in the heart of Toronto’s historic Yorkville district, our flagship brings together fine Parisian artisanry, certified Eiffel Tower rivets, and Canadian maple keepsakes under one luminous roof.
          </p>
        </div>
      </section>

      {/* Boutique Details & Schedule */}
      <main className="container-custom" style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px 80px', flex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '56px' }}>
          {/* Location & Opening Hours Card */}
          <div
            style={{
              backgroundColor: '#faf8f5',
              border: '1px solid #ebd9c0',
              borderRadius: '6px',
              padding: '36px 30px',
              boxShadow: '0 6px 20px rgba(12, 35, 64, 0.04)',
            }}
          >
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#0c2340', marginBottom: '20px', fontWeight: 600 }}>
              Visitor Information
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.92rem' }}>
              <div style={{ display: 'flex', gap: '14px' }}>
                <MapPin size={22} style={{ color: '#b47e00', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#0c2340', display: 'block' }}>Address</strong>
                  <span style={{ color: '#475569' }}>138 Cumberland Street, Suite 200<br />Yorkville, Toronto, ON M5R 1A6</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <Clock size={22} style={{ color: '#b47e00', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#0c2340', display: 'block' }}>Opening Hours</strong>
                  <span style={{ color: '#475569' }}>
                    Monday – Saturday: 10:00 AM – 7:00 PM EST<br />
                    Sunday: 11:00 AM – 5:00 PM EST
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <Phone size={22} style={{ color: '#b47e00', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#0c2340', display: 'block' }}>Direct Boutique Phone</strong>
                  <a href={`tel:${SITE_CONFIG.contact.phone}`} style={{ color: '#b47e00', fontWeight: 600 }}>
                    {SITE_CONFIG.contact.phone}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <Mail size={22} style={{ color: '#b47e00', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#0c2340', display: 'block' }}>Boutique Concierge</strong>
                  <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: '#b47e00' }}>
                    toronto@{SITE_CONFIG.domain}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Boutique Experiences Card */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#0c2340', marginBottom: '16px', fontWeight: 600 }}>
              Exclusive In-Store Services
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '24px' }}>
              Our Yorkville salon provides discerning collectors with private appointments, personalized calligraphy ribbons, and hands-on viewing of rare historical artifacts.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Sparkles size={18} style={{ color: '#b47e00', marginTop: '3px' }} />
                <div>
                  <strong style={{ color: '#0c2340', fontSize: '0.92rem' }}>Personalized Gift Curation:</strong>
                  <span style={{ color: '#64748b', fontSize: '0.88rem' }}> Dedicated specialists curate bespoke corporate sets or individual anniversary gifts.</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Award size={18} style={{ color: '#b47e00', marginTop: '3px' }} />
                <div>
                  <strong style={{ color: '#0c2340', fontSize: '0.92rem' }}>Numbered Edition Inspection:</strong>
                  <span style={{ color: '#64748b', fontSize: '0.88rem' }}> View official numbered certificates and brass certificates of origin in person.</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Calendar size={18} style={{ color: '#b47e00', marginTop: '3px' }} />
                <div>
                  <strong style={{ color: '#0c2340', fontSize: '0.92rem' }}>Click &amp; Collect in 2 Hours:</strong>
                  <span style={{ color: '#64748b', fontSize: '0.88rem' }}> Order online in CAD and pick up securely at our Yorkville boutique counter.</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '28px' }}>
              <Link href="/contact" className="btn-primary" style={{ display: 'inline-block', padding: '12px 24px' }}>
                Book a Private Concierge Appointment
              </Link>
            </div>
          </div>
        </div>

        <DiamondSeparator />

        {/* Featured Products Available in Flagship */}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#0c2340', marginBottom: '8px' }}>
            Discover Our Other Boutique Locations
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
            Experience our curated artisan collections across Canada.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/boutiques/montreal" className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
              Montreal Boutique (Old Montreal)
            </Link>
            <Link href="/boutiques/vancouver" className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
              Vancouver Showroom (Alberni)
            </Link>
            <Link href="/boutiques/artisan-partners" className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
              Artisan Partners &amp; Makers
            </Link>
          </div>
        </div>
      </main>

      <ReassuranceFooter />
      <Footer />
    </div>
  );
}
