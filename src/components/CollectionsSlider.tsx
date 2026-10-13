'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { COLLECTIONS } from '@/data/mockData';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CollectionsSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section style={{ padding: '84px 0', backgroundColor: '#faf8f5', borderTop: '1px solid #ebd9c0' }}>
      <div className="container-custom">
        {/* Header split row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          <div style={{ maxWidth: '640px' }}>
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
              Exclusive Themes
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                fontWeight: 500,
                color: '#0c2340',
                lineHeight: 1.2,
                marginBottom: '12px',
              }}
            >
              Discover Our Truly Parisian Collections
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.6 }}>
              Discover elegance and taste through our decorative and gourmet collections — a celebration of Parisian art de vivre for every moment of your day.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Arrows */}
            <button
              onClick={() => scroll('left')}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0c2340',
                cursor: 'pointer',
              }}
              aria-label="Previous collections"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0c2340',
                cursor: 'pointer',
              }}
              aria-label="Next collections"
            >
              <ChevronRight size={20} />
            </button>

            <Link href="/collections" className="btn-secondary" style={{ padding: '10px 20px', marginLeft: '6px' }}>
              <span>Discover all collections</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Scrollable Collections Cards */}
        <div
          ref={sliderRef}
          style={{
            display: 'flex',
            gap: '24px',
            overflowX: 'auto',
            paddingBottom: '20px',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {COLLECTIONS.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              style={{
                flex: '0 0 280px',
                scrollSnapAlign: 'start',
                backgroundColor: '#ffffff',
                borderRadius: '2px',
                overflow: 'hidden',
                border: '1px solid #ebd9c0',
                boxShadow: '0 4px 14px rgba(12, 35, 64, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s, box-shadow 0.25s',
              }}
              className="collection-card"
            >
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', overflow: 'hidden' }}>
                <Image
                  src={col.image_url || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80'}
                  alt={col.name || 'Collection'}
                  fill
                  sizes="280px"
                  style={{ objectFit: 'cover', transition: 'transform 0.5s' }}
                  className="collection-img"
                />
              </div>

              <div style={{ padding: '18px 16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.35rem',
                      fontWeight: 600,
                      color: '#0c2340',
                      marginBottom: '6px',
                    }}
                  >
                    {col.name}
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.4 }}>
                    {col.subtitle}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#b47e00',
                    marginTop: '16px',
                  }}
                >
                  <span>Explore items</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
