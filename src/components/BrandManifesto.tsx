'use client';

import React, { useState, useEffect } from 'react';
import DiamondSeparator from './DiamondSeparator';
import { SITE_CONFIG } from '@/config/site';

export default function BrandManifesto() {
  const words = ['timeless', 'authentic', 'exceptional'];
  const [currentWordIdx, setCurrentWordIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIdx((prev) => (prev + 1) % words.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <section
      style={{
        backgroundColor: '#0c2340',
        color: '#ffffff',
        padding: '96px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background architectural latticework watermark */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(180, 126, 0, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="container-custom"
        style={{
          maxWidth: '920px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ marginBottom: '24px' }}>
          <DiamondSeparator variant="points" />
        </div>

        <p
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            lineHeight: 1.7,
            color: '#cbd5e1',
            maxWidth: '780px',
            margin: '0 auto 28px',
            fontWeight: 300,
          }}
        >
          Some moments deserve more than a passing thought. At Memoriq, we help you turn names, memories and small details into thoughtful gifts, meaningful keepsakes worth giving and keeping.
        </p>

        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.5rem, 3.2vw, 2.3rem)',
            fontWeight: 400,
            lineHeight: 1.5,
            color: '#f8fafc',
            letterSpacing: '0.01em',
          }}
        >
          Memoriq Embodies the Alliance of Innovation and Curation, Giving every keepsake a signature That is{' '}
          <span
            style={{
              color: '#dda82e',
              fontStyle: 'italic',
              fontWeight: 600,
              borderBottom: '2px solid #dda82e',
              paddingBottom: '2px',
              display: 'inline-block',
              transition: 'all 0.3s',
            }}
          >
            {words[currentWordIdx]}
          </span>
          .
        </h3>

        <div style={{ marginTop: '28px' }}>
          <DiamondSeparator variant="points" />
        </div>
      </div>
    </section>
  );
}
