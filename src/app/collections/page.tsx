import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DiamondSeparator from '@/components/DiamondSeparator';
import { Sparkles, ArrowRight, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Exclusive Collections | Official Memoriq Boutique Canada 🇨🇦',
  description:
    'Explore our signature heritage collections: Signature, Gardens, Day & Night, Heritage Rooftops, and Limited Editions in CAD.',
};

const ALL_COLLECTIONS = [
  {
    slug: 'signature',
    name: 'North American Signature Keepsakes',
    tagline: 'Iconic Emblems & Architectural Monuments',
    description: 'The definitive collection of official laser-cut emblems, architectural monuments, and iconic landmark keepsakes from Toronto to New York.',
    image: '/images/cn-tower-portrait.jpg',
    itemCount: '18 items',
    featuredBadge: 'Core Heritage',
  },
  {
    slug: 'gardens',
    name: 'Laurentian Woodcraft & Forest Art',
    tagline: 'Botanical Allées & Natural Living',
    description: 'Inspired by Canadian parklands and boreal forests, featuring natural cedar fragrances, organic maple confections, and botanical silk foulards.',
    image: '/images/collections/woodcraft-atelier.jpg',
    itemCount: '12 items',
    featuredBadge: 'Art de Vivre',
  },
  {
    slug: 'day-night',
    name: 'Artisan Living & Architectural Clocks',
    tagline: 'Silent Quartz & Architectural Dials',
    description: 'Architectural wall clocks, precision wood silhouettes, and modern typography dials engineered for timeless interiors.',
    image: '/images/collections/architectural-interior.jpg',
    itemCount: '10 items',
    featuredBadge: 'Timepieces',
  },
  {
    slug: 'historic-architecture',
    name: 'Architectural Metal & Script Art',
    tagline: 'Precision Steel & Modern Patina',
    description: 'Contemporary laser-cut metal sculptures, piano keys wall art, and script wall sculptures celebrating craftsmanship.',
    image: '/images/collections/metalcraft-atelier.jpg',
    itemCount: '12 items',
    featuredBadge: 'Metalwork',
  },
  {
    slug: '330-meters',
    name: 'Monumental Heights & Mountain Summits',
    tagline: 'Architectural Height & Rocky Mountain Peaks',
    description: 'Commemorating the monumental summits of Canadian engineering and Rocky mountain summits with precision metal monographs.',
    image: '/images/collections/rocky-mountain-summit.jpg',
    itemCount: '8 items',
    featuredBadge: 'Architecture',
  },
  {
    slug: 'limited-editions',
    name: 'Limited Collector Editions',
    tagline: 'Numbered Pieces & Authentic Relics',
    description: 'Numbered pieces, certified Canadian Centennial rivets, and limited runs accompanied by official certificates of provenance for serious collectors.',
    image: '/images/statue-of-liberty.jpg',
    itemCount: '6 items',
    featuredBadge: 'Numbered & Rare',
  },
  {
    slug: 'olympic-collection',
    name: 'Heirloom Gifting & Commemorative Relics',
    tagline: 'Archival Presentation & Heritage keepsakes',
    description: 'Bespoke Canadian gift boxing with official gold-embossed wax seals, archival certificates of provenance, and heirloom keepsakes.',
    image: '/images/collections/heirloom-packaging.jpg',
    itemCount: '7 items',
    featuredBadge: 'Heirloom',
  },
];

export default function CollectionsPage() {
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
              <span style={{ color: '#f5f1eb', fontWeight: 600 }}>Exclusive Collections</span>
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
              <Sparkles size={13} />
              <span>Curated Design Universes</span>
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
              The Collections
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
              Each collection represents a distinct artistic narrative, combining architectural heritage
              with contemporary Canadian living and master European craftsmanship.
            </p>

            <DiamondSeparator color="#b47e00" />
          </div>
        </section>

        {/* Collections Grid */}
        <section style={{ padding: '64px 20px 80px', backgroundColor: '#faf8f5' }}>
          <div className="container-custom">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '36px',
              }}
            >
              {ALL_COLLECTIONS.map((col) => (
                <article
                  key={col.slug}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    border: '1px solid #ebd9c0',
                    boxShadow: '0 8px 24px rgba(12, 35, 64, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.25s, box-shadow 0.25s',
                  }}
                  className="collection-card"
                >
                  {/* Photo Container */}
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
                      src={col.image}
                      alt={col.name}
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
                      {col.featuredBadge}
                    </div>
                  </div>

                  {/* Body Content */}
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
                        {col.tagline}
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
                        {col.name}
                      </h2>
                      <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                        {col.description}
                      </p>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '16px',
                        borderTop: '1px solid #f1f5f9',
                      }}
                    >
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
                        {col.itemCount}
                      </span>
                      <Link
                        href={`/collections/${col.slug}`}
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
                        <span>Explore Collection</span>
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
