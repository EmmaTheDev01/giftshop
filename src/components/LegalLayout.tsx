'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DiamondSeparator from '@/components/DiamondSeparator';
import { ShieldCheck, FileText, ChevronRight, Lock, HelpCircle, Truck, RotateCcw, Cookie, Building } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated?: string;
  badge?: string;
  children: React.ReactNode;
}

const LEGAL_NAV_ITEMS = [
  { label: 'Privacy & Data Protection Policy', href: '/privacy', icon: Lock },
  { label: 'Terms & Conditions of Sale', href: '/terms-of-sale', icon: FileText },
  { label: 'Terms of Use', href: '/terms', icon: ShieldCheck },
  { label: 'Cookie Policy & Consent', href: '/cookies', icon: Cookie },
  { label: 'Legal Notice & Publisher', href: '/legal', icon: Building },
  { label: 'Returns & Refunds Policy', href: '/returns', icon: RotateCcw },
  { label: 'Delivery & Shipping Policy', href: '/delivery', icon: Truck },
  { label: 'Frequently Asked Questions', href: '/faq', icon: HelpCircle },
];

export default function LegalLayout({
  title,
  subtitle,
  lastUpdated = 'October 2026',
  badge = 'Official Boutique Policy',
  children,
}: LegalLayoutProps) {
  const pathname = usePathname();

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      {/* Hero Banner in Navy & Gold */}
      <section
        style={{
          backgroundColor: '#0c2340',
          color: '#ffffff',
          padding: '64px 20px 54px',
          borderBottom: '2px solid #b47e00',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
          {/* Breadcrumbs */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.78rem',
              color: '#94a3b8',
              marginBottom: '16px',
            }}
          >
            <Link href="/" style={{ color: '#dda82e', textDecoration: 'none' }}>
              Home
            </Link>
            <ChevronRight size={13} />
            <span>Legal & Policies</span>
            <ChevronRight size={13} />
            <span style={{ color: '#ffffff', fontWeight: 600 }}>{title}</span>
          </nav>

          {/* Badge */}
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.68rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#dda82e',
              backgroundColor: 'rgba(221, 168, 46, 0.12)',
              border: '1px solid rgba(221, 168, 46, 0.3)',
              padding: '4px 10px',
              borderRadius: '2px',
              marginBottom: '12px',
            }}
          >
            {badge}
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.1rem, 4vw, 3.2rem)',
              fontWeight: 500,
              color: '#ffffff',
              lineHeight: 1.2,
              marginBottom: '12px',
            }}
          >
            {title}
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', maxWidth: '720px', lineHeight: 1.6, marginBottom: '14px' }}>
            {subtitle}
          </p>

          <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
            Effective & Last Updated: <strong>{lastUpdated}</strong> • Applicable Worldwide
          </p>
        </div>
      </section>

      {/* Main Two-Column Content */}
      <main style={{ flex: 1, backgroundColor: '#faf8f5', padding: '56px 0 80px' }}>
        <div className="container-custom">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr)',
              gap: '40px',
            }}
            className="legal-grid"
          >
            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '40px' }} className="legal-desktop-layout">
              {/* Left Navigation Sidebar */}
              <aside>
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '4px',
                    border: '1px solid #ebd9c0',
                    padding: '20px 16px',
                    position: 'sticky',
                    top: '110px',
                    boxShadow: '0 4px 16px rgba(12, 35, 64, 0.04)',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.18em',
                      color: '#b47e00',
                      marginBottom: '14px',
                      paddingLeft: '8px',
                    }}
                  >
                    Legal & Compliance
                  </p>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {LEGAL_NAV_ITEMS.map((item) => {
                      const isActive = pathname === item.href;
                      const Icon = item.icon;
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              padding: '10px 12px',
                              borderRadius: '2px',
                              fontSize: '0.82rem',
                              fontWeight: isActive ? 700 : 500,
                              color: isActive ? '#0c2340' : '#475569',
                              backgroundColor: isActive ? '#faf6f0' : 'transparent',
                              borderLeft: isActive ? '3px solid #b47e00' : '3px solid transparent',
                              textDecoration: 'none',
                              transition: 'all 0.15s',
                            }}
                          >
                            <Icon size={16} style={{ color: isActive ? '#b47e00' : '#94a3b8', flexShrink: 0 }} />
                            <span>{item.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  <div
                    style={{
                      marginTop: '24px',
                      paddingTop: '16px',
                      borderTop: '1px solid #f1f5f9',
                      paddingLeft: '8px',
                      paddingRight: '8px',
                    }}
                  >
                    <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0c2340', marginBottom: '4px' }}>
                      Need clarification?
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.4, marginBottom: '10px' }}>
                      Our legal & compliance concierge is available to assist you.
                    </p>
                    <Link
                      href="/contact"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#b47e00',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                      }}
                    >
                      Contact Concierge &rarr;
                    </Link>
                  </div>
                </div>
              </aside>

              {/* Right Article Body */}
              <article
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '4px',
                  border: '1px solid #ebd9c0',
                  padding: '44px 48px',
                  boxShadow: '0 4px 20px rgba(12, 35, 64, 0.04)',
                }}
                className="legal-content-card"
              >
                {children}

                {/* Section Separator */}
                <div style={{ margin: '48px 0 24px' }}>
                  <DiamondSeparator variant="points" />
                </div>

                {/* Official Certification Footnote */}
                <div
                  style={{
                    backgroundColor: '#faf8f5',
                    border: '1px solid #ebd9c0',
                    borderRadius: '2px',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                  }}
                >
                  <ShieldCheck size={24} style={{ color: '#b47e00', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 600, color: '#0c2340', marginBottom: '4px' }}>
                      Certified Consumer Protection & Global Privacy Standards
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5 }}>
                      This store complies strictly with international consumer protection standards, fair commercial trade practices, statutory electronic commerce laws, and the General Data Protection Regulation (GDPR).
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
