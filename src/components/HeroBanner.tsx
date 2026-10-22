import React from 'react';
import Link from 'next/link';
import DiamondSeparator from './DiamondSeparator';
import { ArrowRight } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '560px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#0c2340',
        color: '#ffffff',
        padding: '64px 0',
        overflow: 'hidden',
      }}
      className="hero-section"
    >
      {/* 2 Distinct Background Images Side-by-Side */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          width: '100%',
          height: '100%',
          zIndex: 0,
          
        }}
        aria-hidden="true"
      >
        {/* Left Half: Statue of Liberty (USA) */}
        <div
          style={{
            flex: '1 1 50%',
            height: '100%',
            position: 'relative',
            backgroundImage: `url('/images/statue-of-liberty.jpg')`,
            backgroundPosition: '52% 16%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',

          }}
        >
          {/* Left Side Overlay for crisp text contrast */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, rgba(26, 49, 79, 0.95) 0%, rgba(14, 33, 59, 0.9) 65%, rgba(37, 66, 104, 0.82) 100%)',
            }}
          />
        </div>

        {/* Right Half: CN Tower (Canada) */}
        <div
          style={{
            flex: '1 1 50%',
            height: '100%',
            position: 'relative',
            backgroundImage: `url('/images/cn-tower-hero.jpg')`,
            backgroundPosition: '72% 35%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Right Side Overlay for cinematic luxury tone */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, rgba(10, 28, 52, 0.65) 0%, rgba(10, 28, 52, 0.45) 50%, rgba(10, 28, 52, 0.32) 100%)',
            }}
          />
        </div>
      </div>

      {/* Subtle Top & Bottom Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(10, 28, 52, 0.35) 0%, transparent 20%, transparent 80%, rgba(10, 28, 52, 0.4) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 2 }}>
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
              color: '#dda82e',
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(0.72rem, 0.85vw, 0.82rem)',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '8px',
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
            }}
          >
            PERSONAL GIFTS • MOMENTS TO REMEMBER • CANADA/USA 🇨🇦 🇺🇸
          </h2>

          {/* Main Title - Proportional Luxury Size */}
          <h1
            style={{
              color: '#FFFFFF',
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.75rem, 2.4vw, 2.35rem)',
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: '0.01em',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
              marginBottom: '14px',
            }}
          >
            PERSONAL GIFTS,<br />MADE TO FIT YOUR STORIES
          </h1>

          {/* Description */}
          <p
            style={{
              color: '#f1f5f9',
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.92rem, 0.98vw, 1rem)',
              fontWeight: 300,
              lineHeight: 1.6,
              textShadow: '0 1px 6px rgba(0, 0, 0, 0.5)',
              marginBottom: '10px',
            }}
          >
            Put your own story in the spotlight with personalized keepsakes, gifts, and décor. Choose meaningful details for the people you love, and give something that feels truly theirs.
          </p>

          <p
            style={{
              color: '#dda82e',
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.72rem, 0.78vw, 0.78rem)',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '12px',
              lineHeight: 1.45,
            }}
          >
            SHOP BY OCCASION • ADD A LITTLE PERSONAL TOUCH • KEEPSAKES FOR THE PEOPLE WHO MATTER MOST
          </p>

          {/* Exact separator from site */}
          <div style={{ width: '100%', maxWidth: '280px', margin: '8px 0 20px' }}>
            <DiamondSeparator variant="dl" />
          </div>

          {/* Button in exact site style: #B47E00, hover #0C2340 */}
          <Link
            href="/products"
            style={{
              backgroundColor: '#B47E00',
              color: '#FFFFFF',
              fontFamily: 'var(--font-serif)',
              fontSize: '13px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '13px 28px',
              borderRadius: '2px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
              transition: 'background-color 0.25s, transform 0.2s',
            }}
            className="hero-btn"
          >
            <span>EXPLORE PERSONAL GIFTS</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
