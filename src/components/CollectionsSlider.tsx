'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCollections } from '@/lib/api';
import type { Collection } from '@/types/supabase';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CollectionsSlider() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCollections().then((data) => {
      setCollections(data);
    });
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -334 : 334;
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

      if (direction === 'right' && scrollLeft + clientWidth >= scrollWidth - 25) {
        sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else if (direction === 'left' && scrollLeft <= 15) {
        sliderRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Auto-scroll animation: advances right every 4 seconds, pauses on hover
  useEffect(() => {
    if (isPaused || collections.length === 0) return;

    const timer = setInterval(() => {
      scroll('right');
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused, collections.length]);

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
          <div style={{ maxWidth: '680px' }}>
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
              Make It Personal
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.45rem, 2.2vw, 1.95rem)',
                fontWeight: 500,
                color: '#0c2340',
                lineHeight: 1.25,
              }}
            >
              Explore Collections Made for Your Story
            </h2>
            <p style={{ color: '#475569', fontSize: 'clamp(0.88rem, 1vw, 0.94rem)', marginTop: '8px', lineHeight: 1.6 }}>
              Choose from gifts, keepsakes and décor that reflect your own style, celebrate your stories and make everyday moments feel a little more personal.
            </p>
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
              <span>Explore Gift Collections</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Scrollable Collections Cards */}
        <div
          ref={sliderRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          style={{
            display: 'flex',
            gap: '24px',
            overflowX: 'auto',
            paddingBottom: '20px',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth',
          }}
        >
          {collections.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              style={{
                flex: '0 0 310px',
                scrollSnapAlign: 'start',
                position: 'relative',
                borderRadius: '2px',
                overflow: 'hidden',
                aspectRatio: '4 / 5',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '24px 20px',
                boxShadow: '0 8px 24px rgba(12, 35, 64, 0.08)',
                border: '1px solid #ebd9c0',
              }}
              className="collection-card"
            >
              <Image
                src={col.image_url || 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=800&auto=format&fit=crop'}
                alt={col.name}
                fill
                sizes="310px"
                style={{
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="collection-image"
              />

              {/* Scrim Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(12, 35, 64, 0.1) 30%, rgba(12, 35, 64, 0.88) 100%)',
                  zIndex: 2,
                }}
              />

              {/* Content text */}
              <div style={{ position: 'relative', zIndex: 3, color: '#ffffff' }}>
                {col.badge && (
                  <span
                    style={{
                      display: 'inline-block',
                      backgroundColor: 'rgba(221, 168, 46, 0.95)',
                      color: '#0c2340',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      padding: '3px 8px',
                      borderRadius: '2px',
                      marginBottom: '8px',
                    }}
                  >
                    {col.badge}
                  </span>
                )}
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.45rem',
                    fontWeight: 600,
                    margin: '0 0 6px',
                    lineHeight: 1.25,
                  }}
                >
                  {col.name}
                </h3>
                {col.subtitle && (
                  <p
                    style={{
                      fontSize: '0.8rem',
                      opacity: 0.9,
                      margin: 0,
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {col.subtitle}
                  </p>
                )}
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: '#dda82e',
                    marginTop: '10px',
                  }}
                >
                  <span>Explore series</span>
                  <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
