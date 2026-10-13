import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DiamondSeparator from '@/components/DiamondSeparator';
import { SITE_CONFIG } from '@/config/site';
import { getBrands } from '@/lib/api';
import { Award, Compass, HeartHandshake, ShieldCheck, ChevronRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: `Artisan Partners & Guild Makers | ${SITE_CONFIG.name}`,
  description:
    'Discover our collaborative network of master Canadian woodcraft studios and heritage ateliers.',
};

export default async function ArtisanPartnersPage() {
  const brands = await getBrands();
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
            <span style={{ color: '#ffffff' }}>Artisan Partners &amp; Makers</span>
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
            Heritage Guilds &amp; Master Craftspeople
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 600, marginBottom: '16px' }}>
            Artisan Partners &amp; Guild Makers
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '720px' }}>
            We bridge time-honored European savoir-faire with Canadian artisan stewardship, collaborating directly with century-old mints, porcelain kilns, and wool weavers.
          </p>
        </div>
      </section>

      {/* Philosophy Pillars */}
      <main className="container-custom" style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px 80px', flex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', marginBottom: '56px' }}>
          <div style={{ backgroundColor: '#faf8f5', border: '1px solid #ebd9c0', borderRadius: '6px', padding: '28px 24px' }}>
            <Award size={28} style={{ color: '#b47e00', marginBottom: '12px' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#0c2340', marginBottom: '8px', fontWeight: 600 }}>
              Living Heritage (EPV)
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
              Our French partners hold the prestigious <em>Entreprise du Patrimoine Vivant</em> label, recognizing exceptional industrial and artisanal excellence.
            </p>
          </div>

          <div style={{ backgroundColor: '#faf8f5', border: '1px solid #ebd9c0', borderRadius: '6px', padding: '28px 24px' }}>
            <Compass size={28} style={{ color: '#b47e00', marginBottom: '12px' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#0c2340', marginBottom: '8px', fontWeight: 600 }}>
              Certified Provenance
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
              Every limited keepsake comes with an official certificate documenting material origin, batch numbering, and the signature of the master artisan.
            </p>
          </div>

          <div style={{ backgroundColor: '#faf8f5', border: '1px solid #ebd9c0', borderRadius: '6px', padding: '28px 24px' }}>
            <HeartHandshake size={28} style={{ color: '#b47e00', marginBottom: '12px' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#0c2340', marginBottom: '8px', fontWeight: 600 }}>
              Canadian Curation in CAD
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
              Imported directly with customs clearance already handled, priced transparently in Canadian Dollars without hidden international brokerage charges.
            </p>
          </div>
        </div>

        <DiamondSeparator />

        {/* Featured Houses */}
        <div style={{ margin: '48px 0' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#0c2340', marginBottom: '8px', fontWeight: 600 }}>
              Featured Artisan Houses
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
              Select a house to explore their curated gifts and historical legacy.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {brands.map((brand) => (
              <div
                key={brand.id}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '24px',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#b47e00', fontWeight: 700, textTransform: 'uppercase' }}>
                    {brand.country || 'Artisan House'}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#0c2340', margin: '4px 0 8px' }}>
                    {brand.name}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '20px' }}>
                    {brand.description}
                  </p>
                </div>
                <Link
                  href={`/brands/${brand.slug}`}
                  className="btn-secondary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    fontSize: '0.82rem',
                  }}
                >
                  <span>Explore House Collection</span>
                  <ExternalLink size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <DiamondSeparator />

        {/* Call to Action */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#0c2340', marginBottom: '8px' }}>
            Are You a Canadian Artisan or Fine Guild?
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px', maxWidth: '600px', margin: '0 auto 20px' }}>
            We frequently partner with Canadian makers of exceptional ceramics, textiles, and fine food delicacies.
          </p>
          <Link href="/contact" className="btn-primary" style={{ display: 'inline-block', padding: '12px 28px' }}>
            Submit an Artisan Partnership Inquiry
          </Link>
        </div>
      </main>

      <ReassuranceFooter />
      <Footer />
    </div>
  );
}
