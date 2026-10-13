'use client';

import React from 'react';
import DiamondSeparator from './DiamondSeparator';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/mockData';
import { ArrowRight } from 'lucide-react';

export default function HeroBanner() {
  const { setQuickViewProduct } = useCart();
  const diamondLightProduct = PRODUCTS.find((p) => p.slug === 'diamond-light-collector-lamp') || PRODUCTS[9];

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '625px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f9f6f1',
        backgroundImage: `
          linear-gradient(90deg, rgba(12, 35, 64, 0.92) 15%, rgba(12, 35, 64, 0.6) 55%, rgba(12, 35, 64, 0.25) 100%),
          url('https://shop.toureiffel.paris/img/cms/DL%20LP/asset%20(7).jpeg')
        `,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        color: '#ffffff',
        padding: '80px 0',
      }}
    >
      <div className="container-custom">
        <div
          style={{
            maxWidth: '560px',
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
              fontSize: '20px',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '10px',
              textShadow: '0px 0px 20px rgba(12, 35, 64, 0.54)',
            }}
          >
            Diamond Light
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
            Shine to<br />Eiffel&apos;s beat
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
            An authentic Eiffel tower light bulb transformed into a collector&apos;s lamp
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
            Only 500 pieces available
          </p>

          {/* Exact separator from site */}
          <div style={{ width: '100%', maxWidth: '320px', margin: '14px 0 24px' }}>
            <DiamondSeparator variant="dl" />
          </div>

          {/* Button in exact site style: #B47E00, hover #0C2340 */}
          <button
            onClick={() => setQuickViewProduct(diamondLightProduct)}
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
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'background-color 0.25s',
            }}
            className="hero-btn"
          >
            <span>Discover now</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

    </section>
  );
}
