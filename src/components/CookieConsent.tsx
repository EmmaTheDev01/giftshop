'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, Check, ShieldCheck } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('gs_cookie_consent');
      if (!consent) {
        // Small delay so it animates in politely
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('gs_cookie_consent', 'all');
      trackEvent('filter_change', { consent: 'all' });
      setVisible(false);
    } catch {
      setVisible(false);
    }
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem('gs_cookie_consent', 'essential');
      setVisible(false);
    } catch {
      setVisible(false);
    }
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        right: '20px',
        maxWidth: '520px',
        backgroundColor: '#ffffff',
        border: '1px solid #ebd9c0',
        borderRadius: '4px',
        boxShadow: '0 12px 36px rgba(12, 35, 64, 0.22)',
        padding: '20px 22px',
        zIndex: 9999,
        animation: 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'rgba(180, 126, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#b47e00',
            flexShrink: 0,
            marginTop: '2px',
          }}
        >
          <Cookie size={20} />
        </div>

        <div style={{ flex: 1 }}>
          <h4
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.05rem',
              fontWeight: 600,
              color: '#0c2340',
              margin: '0 0 6px',
            }}
          >
            We Value Your Privacy & Choice
          </h4>

          <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5, margin: '0 0 14px' }}>
            We use strictly necessary cookies to power our boutique shopping cart, alongside functional tokens to store your CAD currency preference. With your permission, we also collect privacy-friendly analytics.{' '}
            <Link href="/cookies" style={{ color: '#b47e00', textDecoration: 'underline' }}>
              Read Cookie Policy &rarr;
            </Link>
          </p>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              onClick={handleAcceptAll}
              className="btn-primary"
              style={{
                padding: '8px 16px',
                fontSize: '0.75rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <Check size={14} />
              <span>Accept All</span>
            </button>

            <button
              onClick={handleEssentialOnly}
              className="btn-secondary"
              style={{
                padding: '8px 14px',
                fontSize: '0.75rem',
              }}
            >
              Essential Only
            </button>

            <Link
              href="/privacy"
              style={{
                fontSize: '0.72rem',
                color: '#94a3b8',
                marginLeft: 'auto',
                textDecoration: 'none',
              }}
            >
              Privacy Notice
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
