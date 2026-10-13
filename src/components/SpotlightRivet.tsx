import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';

export default function SpotlightRivet() {

  return (
    <section
      style={{
        backgroundColor: '#faf8f5',
        color: '#0c2340',
        padding: '72px 0',
        borderTop: '1px solid #ebd9c0',
        borderBottom: '1px solid #ebd9c0',
      }}
    >
      <div className="container-custom">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '48px',
          }}
        >
          {/* Left: Statue of Liberty Heritage Artifact Image */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '480px',
                aspectRatio: '1 / 1',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 12px 36px rgba(12, 35, 64, 0.16)',
                border: '1px solid #ebd9c0',
              }}
            >
              <Image
                src="/images/statue-of-liberty.jpg"
                alt="The Statue of Liberty Collector Keepsake"
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Right: Narrative matching USA & Canada context */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#b47e00',
                fontSize: '0.82rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '10px',
              }}
            >
              <Flame size={16} />
              <span>North American Landmarks • USA Heritage 🇺🇸</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                fontWeight: 600,
                color: '#0c2340',
                lineHeight: 1.2,
                marginBottom: '16px',
              }}
            >
              The Statue of Liberty Collector Keepsake
            </h2>

            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.65,
                color: '#475569',
                marginBottom: '14px',
              }}
            >
              An enduring tribute to American freedom and monumental architectural grandeur. Hand-finished with authentic copper-patina detailing and accompanied by an engraved certificate of provenance, this heirloom piece honors the intertwined craft heritage of Canada and the United States.
            </p>

            <p
              style={{
                fontSize: '0.92rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#b47e00',
                marginBottom: '24px',
              }}
            >
              Numbered Limited Series • Express Canada &amp; USA Shipping 🇨🇦 🇺🇸
            </p>

            <Link
              href="/products"
              style={{
                backgroundColor: '#B47E00',
                color: '#FFFFFF',
                fontFamily: 'var(--font-serif)',
                fontSize: '14px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                padding: '14px 32px',
                borderRadius: '2px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'background-color 0.25s',
              }}
              className="hero-btn"
            >
              <span>Explore USA &amp; Canada Keepsakes</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
