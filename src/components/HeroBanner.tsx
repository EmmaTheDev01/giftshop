import React from 'react';
import Link from 'next/link';
import DiamondSeparator from './DiamondSeparator';
import { ArrowRight } from 'lucide-react';

export default function HeroBanner() {

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '625px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f9f6f1',
        backgroundImage: `
          linear-gradient(90deg, rgba(12, 35, 64, 0.94) 15%, rgba(12, 35, 64, 0.72) 55%, rgba(12, 35, 64, 0.38) 100%),
          url('https://images.unsplash.com/photo-1632857997897-9418428d7368?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D')
        `,
        backgroundPosition: 'center 40%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        color: '#ffffff',
        padding: '80px 0',
      }}
    >
      <div className="container-custom">
        <div
          style={{
            maxWidth: '620px',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          {/* Top category headline */}
          <h2
            style={{
              color: '#B47E00',
              fontFamily: 'var(--font-serif)',
              fontSize: '18px',
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginBottom: '10px',
              textShadow: '0px 0px 20px rgba(12, 35, 64, 0.54)',
            }}
          >
            North American Heritage Collection • Canada &amp; USA 🇨🇦 🇺🇸
          </h2>

          {/* Main Title */}
          <h1
            style={{
              color: '#FFFFFF',
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 4.5vw, 3.4rem)',
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: '1px',
              textShadow: '0px 0px 20px rgba(12, 35, 64, 0.54)',
              marginBottom: '18px',
            }}
          >
            Heirloom Gifts,<br />Crafted for Canada &amp; USA
          </h1>

          {/* Description */}
          <p
            style={{
              color: '#FFFFFF',
              fontFamily: 'var(--font-sans)',
              fontSize: '18px',
              fontWeight: 300,
              lineHeight: 1.5,
              letterSpacing: '0.1px',
              textShadow: '0px 0px 57px rgba(12, 35, 64, 0.8)',
              marginBottom: '10px',
            }}
          >
            Curated artisan keepsakes, monumental architectural tributes from Toronto&apos;s CN Tower to New York landmarks, and certified limited editions handcrafted by master guild workshops.
          </p>

          <p
            style={{
              color: '#dda82e',
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              fontWeight: 600,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            All Prices in CAD ($) &amp; USD ($) • Express Cross-Border Delivery • Free Shipping Available
          </p>

          {/* Exact separator from site */}
          <div style={{ width: '100%', maxWidth: '320px', margin: '14px 0 24px' }}>
            <DiamondSeparator variant="dl" />
          </div>

          {/* Button in exact site style: #B47E00, hover #0C2340 */}
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
            <span>Explore The Collection</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

    </section>
  );
}
