'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, PenTool } from 'lucide-react';
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
                fontSize: 'clamp(1.5rem, 2.3vw, 2.05rem)',
                fontWeight: 500,
                color: '#ffffff',
                lineHeight: 1.25,
                marginBottom: '14px',
                letterSpacing: '-0.01em',
              }}
            >
              Designed just for you.
            </h2>

            <p
              style={{
                fontSize: 'clamp(0.92rem, 1.05vw, 1rem)',
                lineHeight: 1.65,
                color: '#cbd5e1',
                marginBottom: '28px',
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
                gap: '12px',
              }}
              className="two-btn-stack"
            >
              {/* 1. Find My Gift */}
              <Link
                href="/products"
                style={{
                  backgroundColor: '#B47E00',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '13px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '11px 22px',
                  borderRadius: '2px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'background-color 0.25s',
                  boxShadow: '0 4px 14px rgba(180, 126, 0, 0.35)',
                }}
                className="hero-btn stacked-btn"
              >
                <span>Find My Gift</span>
                <ArrowRight size={14} />
              </Link>

              {/* 2. Create Yours */}
              <Link
                href="/customize"
                style={{
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '13px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '10px 20px',
                  borderRadius: '2px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: '1.5px solid rgba(221, 168, 46, 0.8)',
                  transition: 'all 0.25s',
                }}
                className="hero-btn-secondary stacked-btn"
              >
                <PenTool size={13} style={{ color: '#dda82e' }} />
                <span>Create Yours</span>
              </Link>

              {/* 3. Explore More */}
              <Link
                href="/collections"
                style={{
                  color: '#dda82e',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  transition: 'color 0.2s',
                }}
              >
                <span>Explore More</span>
                <ArrowRight size={13} />
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
