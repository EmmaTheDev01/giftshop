import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DiamondSeparator from '@/components/DiamondSeparator';
import { ArrowRight, ChevronRight, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Artisan Houses & Manufactures | The Gift Shop Canada 🇨🇦',
  description:
    'Discover our partner heritage manufactures: Saint James (1889), Bernardaud Limoges (1863), Dammann Frères (1692), Vilac (1911), and Monnaie de Paris (864).',
};

const ARTISAN_HOUSES = [
  {
    slug: 'saint-james',
    name: 'Saint James & Hudson Knitwear',
    founded: 'Maritime Tradition',
    craft: 'Master Maritime Knitwear & Pure Wool',
    description: 'Renowned for authentic striped marinières knitted with 100% pure virgin wool tailored for Canadian coastal climates.',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop',
  },
  {
    slug: 'bernardaud',
    name: 'Bernardaud Fine Porcelain',
    founded: 'Master Porcelain Atelier',
    craft: 'Fine Porcelain & Gilded Dining Artistry',
    description: 'The pinnacle of luxury porcelain tableware, creating bespoke Canadian flora espresso sets and 24-karat gold-trimmed dinnerware.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
  },
  {
    slug: 'dammann-freres',
    name: 'DAMMANN Frères Tea House',
    founded: 'Gourmet Tea Master',
    craft: 'Purveyor of Exceptional Teas & Infusions',
    description: 'Creating peerless artisan tea blends featuring Quebec sugar maple syrup and wild Nova Scotia cranberries.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop',
  },
  {
    slug: 'vilac',
    name: 'VILAC & Laurentian Woodcraft',
    founded: 'Heirloom Studio',
    craft: 'Heirloom Turned Wooden Toys & Wildlife Puzzles',
    description: 'Handcrafted wildlife toys carved from sustainable Canadian sugar maple and beechwood, finished with non-toxic botanical dyes.',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800&auto=format&fit=crop',
  },
  {
    slug: 'kerzon',
    name: 'Kerzon Scents',
    founded: 'Botanical Atelier',
    craft: 'Natural Wax Scented Candles & Scents',
    description: 'Master fragrances formulated with natural cedarwood, balsam fir, and vegetable waxes inspired by Canadian highlands.',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop',
  },
  {
    slug: 'the-line',
    name: 'The Line Architectural Studio',
    founded: 'Architectural Guild',
    craft: 'Architectural Laser-Cut Steel Silhouettes',
    description: 'Minimalist laser-cut wall sculptures and steel silhouettes capturing the iconic Canadian urban skylines and landmarks.',
    image: '/images/cn-tower-hero.jpg',
  },
];

export default function BrandsPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1 }}>
        {/* Hero Banner */}
        <section
          style={{
            backgroundColor: '#0c2340',
            color: '#f5f1eb',
            padding: '54px 20px 48px',
            textAlign: 'center',
            position: 'relative',
            borderBottom: '3px solid #b47e00',
          }}
        >
          <div className="container-custom" style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                color: '#94a3b8',
                marginBottom: '16px',
              }}
            >
              <Link href="/" style={{ color: '#dda82e', textDecoration: 'none' }}>
                Home
              </Link>
              <ChevronRight size={13} style={{ color: '#b47e00' }} />
              <span style={{ color: '#f5f1eb', fontWeight: 600 }}>Artisans & Brands</span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(180, 126, 0, 0.15)',
                border: '1px solid rgba(180, 126, 0, 0.35)',
                padding: '4px 14px',
                borderRadius: '30px',
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#dda82e',
                marginBottom: '14px',
              }}
            >
              <Award size={13} />
              <span>Living Heritage Manufactures</span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
                fontWeight: 600,
                color: '#f5f1eb',
                margin: '0 0 14px',
                lineHeight: 1.2,
              }}
            >
              The Master Artisans
            </h1>

            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.6,
                color: '#cbd5e1',
                maxWidth: '680px',
                margin: '0 auto 20px',
                fontWeight: 300,
              }}
            >
              We collaborate exclusively with certified Living Heritage Companies (Entreprise du Patrimoine Vivant)
              and storied workshops carrying centuries of ancestral craft expertise.
            </p>

            <DiamondSeparator color="#b47e00" />
          </div>
        </section>

        {/* Artisans Grid */}
        <section style={{ padding: '64px 20px 80px', backgroundColor: '#faf8f5' }}>
          <div className="container-custom">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '36px',
              }}
            >
              {ARTISAN_HOUSES.map((brand) => (
                <article
                  key={brand.slug}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    border: '1px solid #ebd9c0',
                    boxShadow: '0 8px 24px rgba(12, 35, 64, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  className="brand-card"
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16 / 10',
                      backgroundColor: '#f1ece4',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      style={{ objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '14px',
                        left: '14px',
                        backgroundColor: '#0c2340',
                        color: '#ffffff',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        padding: '4px 10px',
                        borderRadius: '2px',
                      }}
                    >
                      {brand.founded}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '28px 24px',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      justifyContent: 'space-between',
                      gap: '16px',
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.14em',
                          color: '#b47e00',
                          display: 'block',
                          marginBottom: '6px',
                        }}
                      >
                        {brand.craft}
                      </span>
                      <h2
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.45rem',
                          fontWeight: 600,
                          color: '#0c2340',
                          margin: '0 0 10px',
                        }}
                      >
                        {brand.name}
                      </h2>
                      <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                        {brand.description}
                      </p>
                    </div>

                    <div
                      style={{
                        paddingTop: '16px',
                        borderTop: '1px solid #f1f5f9',
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <Link
                        href={`/brands/${brand.slug}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#0c2340',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          textDecoration: 'none',
                        }}
                      >
                        <span>View Artisan Creations</span>
                        <ArrowRight size={14} style={{ color: '#b47e00' }} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <ReassuranceFooter />
      <Footer />
    </div>
  );
}
