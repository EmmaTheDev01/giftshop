import React from 'react';
import { SITE_CONFIG } from '@/config/site';

export function LogoIcon({
  size = 36,
  inverted = false,
  className = '',
}: {
  size?: number;
  inverted?: boolean;
  className?: string;
}) {
  const primaryColor = inverted ? '#ffffff' : '#0c2340';
  const goldColor = '#b47e00';
  const width = size;
  const height = Math.round((size * 50) / 48);
  const gradId = inverted ? 'mapleGoldInv' : 'mapleGold';

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}
      aria-label="Memoriq Emblem"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dda82e" />
          <stop offset="100%" stopColor="#b47e00" />
        </linearGradient>
      </defs>

      {/* Left facet of Maple Leaf (Primary Navy/White) */}
      <path
        d="M 24,3 L 22.6,11.2 L 18.2,10.2 L 20.8,15.8 L 13.4,17.2 L 17.8,22.4 L 6.4,25.4 L 15.2,29.8 L 12.4,35.4 L 20.6,33.4 L 22.8,42.2 L 22.8,48 L 24,48 Z"
        fill={primaryColor}
      />

      {/* Right facet of Maple Leaf (Artisan Gold) */}
      <path
        d="M 24,3 L 25.4,11.2 L 29.8,10.2 L 27.2,15.8 L 34.6,17.2 L 30.2,22.4 L 41.6,25.4 L 32.8,29.8 L 35.6,35.4 L 27.4,33.4 L 25.2,42.2 L 25.2,48 L 24,48 Z"
        fill={`url(#${gradId})`}
      />

      {/* Central Spine Vein */}
      <line x1="24" y1="3" x2="24" y2="48" stroke={inverted ? primaryColor : '#ffffff'} strokeWidth="1" opacity="0.75" />

      {/* Leaf Vein Accents - Left Side */}
      <line x1="24" y1="26" x2="15" y2="29" stroke={goldColor} strokeWidth="0.8" opacity="0.85" />
      <line x1="24" y1="20" x2="17" y2="22" stroke={goldColor} strokeWidth="0.8" opacity="0.85" />
      <line x1="24" y1="14" x2="20" y2="15" stroke={goldColor} strokeWidth="0.8" opacity="0.85" />

      {/* Leaf Vein Accents - Right Side */}
      <line x1="24" y1="26" x2="33" y2="29" stroke={primaryColor} strokeWidth="0.8" opacity="0.7" />
      <line x1="24" y1="20" x2="31" y2="22" stroke={primaryColor} strokeWidth="0.8" opacity="0.7" />
      <line x1="24" y1="14" x2="28" y2="15" stroke={primaryColor} strokeWidth="0.8" opacity="0.7" />

      {/* Subtle Heraldic Crown Diamond at Apex */}
      <circle cx="24" cy="2.5" r="1.3" fill={goldColor} />
    </svg>
  );
}

export default function Logo({
  className = '',
  inverted = false,
  iconOnly = false,
  subtitle,
  size = 36,
}: {
  className?: string;
  inverted?: boolean;
  iconOnly?: boolean;
  subtitle?: string;
  size?: number;
}) {
  const primaryColor = inverted ? '#ffffff' : '#0c2340';
  const goldColor = '#b47e00';

  if (iconOnly) {
    return <LogoIcon size={size} inverted={inverted} className={className} />;
  }

  return (
    <div
      className={`flex items-center gap-3 cursor-pointer ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}
    >
      {/* Canadian Maple Leaf Artisan Emblem */}
      <LogoIcon size={size} inverted={inverted} />

      {/* Brand Typographic Wordmark */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.62rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            color: goldColor,
            marginBottom: '2px',
          }}
        >
          {subtitle || 'Boutique Officielle'}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.45rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            color: primaryColor,
            textTransform: 'uppercase',
          }}
        >
          {SITE_CONFIG.shortName}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.55rem',
            fontWeight: 500,
            letterSpacing: '0.35em',
            color: inverted ? '#cbd5e1' : '#64748b',
            textTransform: 'uppercase',
            marginTop: '1px',
          }}
        >
          Canada
        </span>
      </div>
    </div>
  );
}
