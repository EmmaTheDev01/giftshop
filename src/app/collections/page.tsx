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
    name: 'Signature Collection',
    tagline: 'Quintessential Heritage Keepsakes',
    description: 'The definitive collection of official medals, architectural bronze replicas, and iconic symbols created with prestige French and Canadian workshops.',
    image: 'https://shop.toureiffel.paris/img/cms/homepage/encart_marque/encart_collection_signature.png',
    itemCount: '18 items',
    featuredBadge: 'Core Heritage',
  },
  {
    slug: 'gardens',
    name: 'Gardens Collection',
    tagline: 'Botanical Allées & Natural Living',
    description: 'Inspired by romantic Parisian parklands, featuring natural Kerzon fragrances, organic maple confections, and botanical silk foulards.',
    image: 'https://shop.toureiffel.paris/img/cms/homepage/encart_marque/encart_collection_jardins_1.png',
    itemCount: '12 items',
    featuredBadge: 'Art de Vivre',
  },
  {
    slug: 'day-night',
    name: 'Day & Night Collection',
    tagline: 'From Morning Dawn to Sparkling Nights',
    description: 'Refined lifestyle accents capturing the contrast between soft golden dawn and the nocturnal sparkling illumination of the skyline.',
    image: 'https://shop.toureiffel.paris/img/cms/homepage/encart_marque/encart_collection_journuit.png',
    itemCount: '15 items',
    featuredBadge: 'Nocturne',
  },
  {
    slug: 'paris-rooftops',
    name: 'Heritage Rooftops',
    tagline: 'Zinc Patina, Limoges & Poetic Horizons',
    description: 'A tribute to historical zinc rooftops, Limoges porcelain espresso sets, and warm copper tones that define legendary architecture.',
    image: 'https://shop.toureiffel.paris/img/cms/homepage/encart_marque/encart_collection_toitsdeparis.png',
    itemCount: '9 items',
    featuredBadge: 'Artisan Porcelain',
  },
  {
    slug: '330-meters',
    name: 'Monumental 330m',
    tagline: 'Architectural Height & Ironwork',
    description: 'Commemorating the staggering 330-metre summit with precision architectural blueprints, metal monographs, and minimalist wall silhouettes.',
    image: 'https://shop.toureiffel.paris/img/cms/homepage/encart_marque/encart_collection_330m.png',
    itemCount: '8 items',
    featuredBadge: 'Architecture',
  },
  {
    slug: 'limited-editions',
    name: 'Limited Collector Editions',
    tagline: 'Numbered Pieces & Authentic Relics',
    description: 'Numbered pieces, certified structural rivets, and limited runs accompanied by official certificates of provenance for serious collectors.',
    image: 'https://shop.toureiffel.paris/879-medium_default/eiffel-tower-bronze-19-cm-signature-collection.jpg',
    itemCount: '6 items',
    featuredBadge: 'Numbered & Rare',
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
