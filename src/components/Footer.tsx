import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { SITE_CONFIG } from '@/config/site';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export default function Footer() {
  const footerColumns: FooterColumn[] = [
    {
      title: 'Need help?',
      links: [
        { label: 'Returns and Refunds', href: '/returns' },
        { label: 'Delivery & Shipping', href: '/delivery' },
        { label: 'Guest order tracking', href: '/tracking' },
        { label: 'F.A.Q', href: '/faq' },
        { label: 'Contact us', href: '/contact' },
      ],
    },
    {
      title: 'Terms of use',
      links: [
        { label: 'Terms and Conditions of Sale', href: '/terms-of-sale' },
        { label: 'Terms of Use', href: '/terms' },
        { label: 'Legal information', href: '/legal' },
        { label: 'Privacy policy', href: '/privacy' },
        { label: 'Cookies settings', href: '/cookies' },
        { label: 'Store Admin Portal', href: '/admin' },
      ],
    },
  ];

  return (
    <footer style={{ backgroundColor: '#0c2340', color: '#ffffff', paddingTop: '64px', borderTop: '2px solid #b47e00' }}>
      <div className="container-custom">
        {/* Top Brand Banner in Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            paddingBottom: '40px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          <Logo inverted={true} />

          {/* Social Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#dda82e', fontWeight: 600 }}>
              Connect with us
            </span>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href="https://www.facebook.com/MemoriqCanada/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(221, 168, 46, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#dda82e',
                  backgroundColor: 'rgba(221, 168, 46, 0.06)',
                  transition: 'all 0.2s ease',
                }}
                className="social-icon"
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/MemoriqCanada"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(221, 168, 46, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#dda82e',
                  backgroundColor: 'rgba(221, 168, 46, 0.06)',
                  transition: 'all 0.2s ease',
                }}
                className="social-icon"
                aria-label="X (Twitter)"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/memoriqcanada/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(221, 168, 46, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#dda82e',
                  backgroundColor: 'rgba(221, 168, 46, 0.06)',
                  transition: 'all 0.2s ease',
                }}
                className="social-icon"
                aria-label="Instagram"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Multi-Column Links */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '36px',
            padding: '48px 0',
          }}
        >
          {footerColumns.map((col, idx) => (
            <div key={idx}>
              <h4
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#dda82e',
                  marginBottom: '16px',
                }}
              >
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      style={{
                        fontSize: '0.84rem',
                        color: '#cbd5e1',
                        transition: 'color 0.2s',
                        display: 'inline-block',
                      }}
                      className="footer-link"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Payment Methods & Legal Copyright */}
        <div
          style={{
            padding: '24px 0 36px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.76rem',
            color: '#94a3b8',
          }}
        >
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.name} Canada &amp; USA. All rights reserved. Curated for collectors across Canada &amp; the United States.
          </p>

          {/* Secure Payment Badges: ONLY VISA & MASTERCARD with SVG Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#dda82e', fontWeight: 600 }}>
              Payment Methods
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Visa Official Badge Icon */}
              <div
                title="Visa Secure Checkout"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '4px',
                  padding: '3px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  height: '28px',
                  width: '46px',
                }}
              >
                <svg width="34" height="12" viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M37.5 31.2H29.8L34.6 1.8H42.3L37.5 31.2Z" fill="#1A1F71"/>
                  <path d="M64.6 2.4C63 1.8 60.5 1.2 57.6 1.2C50.1 1.2 44.9 5.2 44.6 10.8C44.6 15 48.4 17.3 51.3 18.9C54.2 20.5 55.2 21.5 55.2 23C55.2 25.3 52.7 26.3 50.1 26.3C46.9 26.3 45 25.7 42.8 24.7L41.8 24.1L40.5 30.5C42.8 31.5 46.3 32.4 49.9 32.4C58.2 32.4 63.3 28.2 63.6 22.4C63.6 18.5 61 15.6 56.2 13.3C53.3 11.7 51.7 10.7 51.7 9.1C51.7 7.5 53.6 6.2 56.5 6.2C58.7 6.2 60.7 6.7 62.3 7.4L63.3 7.8L64.6 2.4Z" fill="#1A1F71"/>
                  <path d="M75.3 22.8C75.9 20.9 78.1 14.8 78.1 14.8C78.1 14.8 78.7 13.2 79.1 11.9L79.7 14.8C79.7 14.8 81 20.8 81.3 22.8H75.3ZM86.1 1.8H79.8C77.9 1.8 76.3 2.5 75.7 4.5L64.7 31.2H72.8L74.4 26.6H84.3L85.3 31.2H92.4L86.1 1.8Z" fill="#1A1F71"/>
                  <path d="M25.7 1.8L18.2 21.9L17.4 17.8C16.1 13.8 12.6 9.4 8.5 7.4L15.2 31.2H23.3L35.2 1.8H25.7Z" fill="#1A1F71"/>
                  <path d="M13.8 1.8H1.2L0.9 2.5C10.6 4.8 17.1 10.6 19.8 17.8L17.2 3.1C16.6 2.1 15.3 1.8 13.8 1.8Z" fill="#F7B600"/>
                </svg>
              </div>

              {/* Mastercard Official Badge Icon */}
              <div
                title="Mastercard Secure Checkout"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '4px',
                  padding: '3px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  height: '28px',
                  width: '46px',
                }}
              >
                <svg width="34" height="20" viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="15" r="13" fill="#EB001B"/>
                  <circle cx="30" cy="15" r="13" fill="#F79E1B"/>
                  <path d="M24 6.2C26.5 8.4 28.1 11.5 28.1 15C28.1 18.5 26.5 21.6 24 23.8C21.5 21.6 19.9 18.5 19.9 15C19.9 11.5 21.5 8.4 24 6.2Z" fill="#FF5F00"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
