'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, PenTool } from 'lucide-react';
import DiamondSeparator from './DiamondSeparator';

export default function YourOwnMark() {
  return (
    <section
      style={{
        backgroundColor: '#0c2340',
        color: '#ffffff',
        padding: '88px 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '2px solid #b47e00',
        borderBottom: '1px solid rgba(180, 126, 0, 0.3)',
      }}
    >
      {/* Decorative ambient radial lighting */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(221, 168, 46, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(180, 126, 0, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '56px',
          }}
        >
          {/* Left Column: Narrative & CTAs */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#dda82e',
                fontSize: '0.82rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                marginBottom: '12px',
                backgroundColor: 'rgba(221, 168, 46, 0.1)',
                padding: '6px 14px',
                borderRadius: '9999px',
                border: '1px solid rgba(221, 168, 46, 0.3)',
              }}
            >

              <span>Your Own Mark</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)',
                fontWeight: 500,
                color: '#ffffff',
                lineHeight: 1.18,
                marginBottom: '18px',
                letterSpacing: '-0.01em',
              }}
            >
              Designed just for you.
            </h2>

            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.7,
                color: '#cbd5e1',
                marginBottom: '32px',
                maxWidth: '540px',
                fontWeight: 300,
              }}
            >
              Choose a gift, add your details, and create something they won&apos;t forget. Make their day memorable.
            </p>

            {/* CTAs matching Google Doc requirements */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px',
              }}
            >
              {/* 1. Find My Gift */}
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
                  padding: '14px 28px',
                  borderRadius: '2px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'background-color 0.25s',
                  boxShadow: '0 4px 14px rgba(180, 126, 0, 0.35)',
                }}
                className="hero-btn"
              >
                <span>Find My Gift</span>
                <ArrowRight size={15} />
              </Link>

              {/* 2. Create Yours */}
              <Link
                href="/customize"
                style={{
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '14px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  padding: '13px 26px',
                  borderRadius: '2px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1.5px solid rgba(221, 168, 46, 0.8)',
                  transition: 'all 0.25s',
                }}
                className="hero-btn-secondary"
              >
                <PenTool size={14} style={{ color: '#dda82e' }} />
                <span>Create Yours</span>
              </Link>

              {/* 3. Explore More */}
              <Link
                href="/collections"
                style={{
                  color: '#dda82e',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 14px',
                  transition: 'color 0.2s',
                }}
              >
                <span>Explore More</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Preview of Personalization */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '460px',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#132d4d',
                border: '1px solid rgba(221, 168, 46, 0.4)',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '320px',
                }}
              >
                <Image
                  src="/images/collections/heirloom-packaging.jpg"
                  alt="Personalized keepsake packaging and engraved plaque"
                  fill
                  sizes="(max-width: 768px) 100vw, 460px"
                  style={{ objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(12, 35, 64, 0.92) 0%, rgba(12, 35, 64, 0.3) 60%, transparent 100%)',
                  }}
                />
              </div>

              {/* Interactive Inscription Card Overlay */}
              <div style={{ padding: '24px 28px' }}>
                <p
                  style={{
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    color: '#dda82e',
                    fontWeight: 700,
                    marginBottom: '8px',
                  }}
                >
                  Personalization Atelier Preview
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    color: '#ffffff',
                    fontStyle: 'italic',
                    margin: '0 0 6px',
                  }}
                >
                  &ldquo;To Many More Shared Sunsets&rdquo;
                </p>
                <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0 }}>
                  Engraved in Master Hardwood • Hand-Inspected in Canada 🇨🇦
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
