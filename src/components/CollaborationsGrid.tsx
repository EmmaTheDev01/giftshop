'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BRANDS } from '@/data/mockData';
import { ArrowRight } from 'lucide-react';

export default function CollaborationsGrid() {
  return (
    <section style={{ padding: '84px 0', backgroundColor: '#ffffff' }}>
      <div className="container-custom">
        {/* Section Header with split title and CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                color: '#b47e00',
                marginBottom: '6px',
              }}
            >
              Prestigious Houses
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                fontWeight: 500,
                color: '#0c2340',
                lineHeight: 1.2,
              }}
            >
              Official Collaborations
            </h2>
          </div>

          <Link href="/brands" className="btn-secondary" style={{ padding: '10px 22px' }}>
            <span>Discover all brands</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* 4 Col Grid of Brand Cards with Zoom Effect */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {BRANDS.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              style={{
                position: 'relative',
                aspectRatio: '3 / 4',
                borderRadius: '2px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '24px 20px',
                boxShadow: '0 8px 20px rgba(12, 35, 64, 0.08)',
                border: '1px solid #ebd9c0',
              }}
              className="brand-card"
            >
              <Image
                src={brand.hero_image_url || 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80'}
                alt={brand.name || 'Brand'}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                style={{
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="brand-image"
              />

              {/* Gradient Scrim Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(12, 35, 64, 0) 40%, rgba(12, 35, 64, 0.85) 100%)',
                  zIndex: 2,
                }}
              />

              {/* Brand Typography */}
              <div style={{ position: 'relative', zIndex: 3, color: '#ffffff' }}>
                <span
                  style={{
                    fontSize: '0.68rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    color: '#dda82e',
                    fontWeight: 700,
                  }}
                >
                  Maison Partenaire
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.65rem',
                    fontWeight: 500,
                    color: '#ffffff',
                    marginTop: '2px',
                    letterSpacing: '0.02em',
                  }}
                >
                  {brand.name}
                </h3>
                <p
                  style={{
                    fontSize: '0.78rem',
                    color: '#e2e8f0',
                    marginTop: '6px',
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {brand.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
