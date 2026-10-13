'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/mockData';
import { ArrowRight, Flame } from 'lucide-react';

export default function SpotlightRivet() {
  const { setQuickViewProduct } = useCart();
  const rivetProduct = PRODUCTS.find((p) => p.slug === 'eiffel-tower-rivet-2025-limited-edition') || PRODUCTS[10];

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
          {/* Left: Exact Packshot from toureiffel.paris */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '480px',
                aspectRatio: '1 / 1',
              }}
            >
              <Image
                src="https://shop.toureiffel.paris/img/cms/homepage/packshot_produit/HP_Printemps_bandeau_rivet_2026%20(1).png"
                alt="The Official 2025 Rivet"
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Right: Narrative matching site */}
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
              <span>Limited Edition</span>
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
              The Official 2025 Rivet
            </h2>

            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.65,
                color: '#475569',
                marginBottom: '14px',
              }}
            >
              Crafted from genuine Eiffel Tower steel, authenticated and individually numbered, this rivet is a unique and exceptional keepsake, carrying a piece of the history of Paris and France.
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
              Only a few pieces left!
            </p>

            <button
              onClick={() => setQuickViewProduct(rivetProduct)}
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
              <span>Get yours</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
