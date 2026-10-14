'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { NAV_MENU } from '@/config/navigation';
import {
  Search,
  User,
  ShoppingBag,
  Heart,
  Globe,
  ArrowUpRight,
  Menu as MenuIcon,
  X as CloseIcon,
  ChevronDown,
} from 'lucide-react';

export default function Header() {
  const { cartCount, cartTotal, setIsCartOpen, setIsFavoritesOpen, setIsSearchOpen, wishlist } = useCart();
  const { user, profile, isAdmin } = useAuth();
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { code: 'EN', label: 'English (CA)', flag: '🇨🇦' },
    { code: 'US', label: 'English (US)', flag: '🇺🇸' },
    { code: 'FR', label: 'Français (CA)', flag: '🇨🇦' },
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: '#ffffff', transition: 'box-shadow 0.25s' }} className={isScrolled ? 'shadow-md' : ''}>
      {/* 1. Top Announcement Bar */}
      <div
        style={{
          backgroundColor: '#0c2340',
          color: '#f5f1eb',
          fontSize: '0.75rem',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '8px 16px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          borderBottom: '1px solid rgba(180, 126, 0, 0.25)',
        }}
      >
        <span>Delivery Across Canada &amp; USA 🇨🇦 🇺🇸</span>
        <span style={{ color: '#b47e00' }}>•</span>
        <span>Free Shipping Over $95 CAD / $70 USD</span>
        <span style={{ color: '#b47e00' }}>•</span>
        <span style={{ color: '#dda82e' }}>Official Memoriq Boutique</span>
      </div>

      {/* 2. Main Header Row */}
      <div
        className="container-custom"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '18px',
          paddingBottom: '18px',
          position: 'relative',
        }}
      >
        {/* Left Utilities (Language & Monument Link) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: 1 }}>
          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0c2340',
              padding: '6px',
            }}
            className="mobile-burger"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          </button>

          {/* Language Selector */}
          <div style={{ position: 'relative' }} className="hidden-mobile">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#0c2340',
                padding: '4px 8px',
                borderRadius: '4px',
                textTransform: 'uppercase',
              }}
              aria-label="Select language"
            >
              <Globe size={15} style={{ color: '#b47e00' }} />
              <span>{selectedLang}</span>
              <ChevronDown size={13} style={{ opacity: 0.7 }} />
            </button>

            {isLangDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: '8px',
                  backgroundColor: '#ffffff',
                  boxShadow: 'var(--shadow-lg)',
                  borderRadius: '4px',
                  border: '1px solid var(--color-border)',
                  padding: '6px 0',
                  minWidth: '130px',
                  zIndex: 60,
                }}
              >
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setSelectedLang(l.code);
                      setIsLangDropdownOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '8px 14px',
                      fontSize: '0.8rem',
                      fontWeight: selectedLang === l.code ? 700 : 500,
                      color: selectedLang === l.code ? '#b47e00' : '#0c2340',
                      textAlign: 'left',
                      backgroundColor: selectedLang === l.code ? '#faf6f0' : 'transparent',
                    }}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Canada & USA Boutiques Link */}
          <Link
            href="/boutiques"
            className="hidden-tablet"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.8rem',
              color: '#475569',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
          >
            <span>Galleries: Canada • USA</span>
            <ArrowUpRight size={13} style={{ color: '#b47e00' }} />
          </Link>
        </div>

        {/* Center: Brand Logo */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {/* Right: Actions (Search, Wishlist, Account, Cart) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '18px', flex: 1 }}>
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#0c2340',
              padding: '8px',
              borderRadius: '50%',
              transition: 'background-color 0.2s',
            }}
            aria-label="Search items"
          >
            <Search size={21} />
          </button>

          {/* Wishlist */}
          <button
            onClick={() => setIsFavoritesOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#0c2340',
              padding: '8px',
              position: 'relative',
            }}
            aria-label="Wishlist"
            className="hidden-mobile"
          >
            <Heart size={21} style={{ fill: wishlist.length > 0 ? '#b47e00' : 'none', color: '#0c2340' }} />
            {wishlist.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  backgroundColor: '#b47e00',
                  color: '#ffffff',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Account */}
          <Link
            href={user ? '/my-account' : '/login'}
            style={{
              display: 'flex',
              alignItems: 'center',
              color: user ? '#b47e00' : '#0c2340',
              padding: '8px',
              position: 'relative',
            }}
            aria-label={user ? 'Customer Account' : 'Sign In'}
            className="hidden-mobile"
            title={user ? `Signed in as ${profile?.full_name || user.email}` : 'Sign In'}
          >
            <User size={21} />
            {user && (
              <span
                style={{
                  position: 'absolute',
                  bottom: '6px',
                  right: '6px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#16a34a',
                  border: '1.5px solid #ffffff',
                }}
              />
            )}
          </Link>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#0c2340',
              color: '#ffffff',
              padding: '9px 16px',
              borderRadius: '2px',
              fontWeight: 600,
              fontSize: '0.82rem',
              transition: 'all 0.2s',
              border: '1px solid #0c2340',
            }}
            aria-label="View shopping cart"
          >
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <ShoppingBag size={18} style={{ color: '#dda82e' }} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-7px',
                    right: '-9px',
                    backgroundColor: '#dda82e',
                    color: '#0c2340',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {cartCount}
                </span>
              )}
            </div>
            <span style={{ letterSpacing: '0.04em' }}>${cartTotal.toFixed(2)} CAD</span>
          </button>
        </div>
      </div>

      {/* 3. Mega-Menu Navigation Bar */}
      <nav
        style={{
          borderTop: '1px solid var(--color-border-light)',
          borderBottom: '1px solid var(--color-border-light)',
          position: 'relative',
          overflow: 'visible',
          zIndex: 40,
        }}
        className="hidden-mobile"
      >
        <div className="container-custom" style={{ position: 'relative', overflow: 'visible' }}>
          <ul
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(8px, 1.6vw, 22px)',
              listStyle: 'none',
              padding: 0,
              margin: 0,
              flexWrap: 'wrap',
              overflow: 'visible',
            }}
          >
            {/* 1. Check Your Favorite */}
            <li>
              <button
                onClick={() => setIsFavoritesOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '14px 4px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#b47e00',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
                title="View your favorite keepsakes"
              >
                <Heart size={14} style={{ fill: wishlist.length > 0 ? '#b47e00' : 'none', color: '#b47e00' }} />
                <span>Check Your Favorite</span>
              </button>
            </li>

            {NAV_MENU.map((menu) => {
              const menuHref =
                menu.slug === 'catalogue'
                  ? '/products'
                  : menu.slug === 'collections'
                    ? '/collections'
                    : menu.slug === 'brands'
                      ? '/brands'
                      : menu.slug === 'gifts'
                        ? '/gifts'
                        : menu.slug === 'lifestyles'
                          ? '/collections'
                          : menu.slug === 'fashion'
                            ? '/collections'
                            : menu.slug === 'events'
                              ? '/boutiques'
                              : menu.slug === 'customize'
                                ? '/customize'
                                : `/category/${menu.slug}`;

              const isLeftItem = menu.slug === 'catalogue' || menu.slug === 'gifts';
              const isRightItem = menu.slug === 'customize' || menu.slug === 'events';

              return (
                <li
                  key={menu.slug}
                  onMouseEnter={() => setActiveMegaMenu(menu.slug)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                  style={{ position: 'relative' }}
                >
                  <Link
                    href={menuHref}
                    style={{
                      display: 'inline-block',
                      padding: '14px 4px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: activeMegaMenu === menu.slug ? '#b47e00' : '#0c2340',
                      position: 'relative',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {menu.name}
                    {activeMegaMenu === menu.slug && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '2px',
                          backgroundColor: '#b47e00',
                        }}
                      />
                    )}
                  </Link>

                  {/* Dropdown Container */}
                  {activeMegaMenu === menu.slug && menu.items && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: isLeftItem ? '0' : isRightItem ? 'auto' : '50%',
                        right: isRightItem ? '0' : 'auto',
                        transform: isLeftItem || isRightItem ? 'none' : 'translateX(-50%)',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.08)',
                        border: '1px solid #ebd9c0',
                        borderRadius: '0 0 6px 6px',
                        padding: '24px 30px',
                        minWidth: menu.featured ? '620px' : '360px',
                        maxWidth: '90vw',
                        display: 'flex',
                        gap: '28px',
                        zIndex: 100,
                        animation: 'slideDown 0.18s ease-out forwards',
                      }}
                    >
                      {/* Category Column */}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                          <p
                            style={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              letterSpacing: '0.18em',
                              color: '#b47e00',
                              margin: 0,
                            }}
                          >
                            Explore {menu.name}
                          </p>
                          <Link
                            href={menuHref}
                            style={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em',
                              color: '#0c2340',
                              textDecoration: 'underline',
                            }}
                          >
                            View Department &rarr;
                          </Link>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: menu.items.length > 5 ? 'repeat(2, 1fr)' : '1fr', gap: '10px 20px' }}>
                          {menu.items.map((sub) => {
                            const subHref =
                              menu.slug === 'collections'
                                ? `/collections/${sub.slug}`
                                : menu.slug === 'brands'
                                  ? `/brands/${sub.slug}`
                                  : `/category/${sub.slug}`;

                            return (
                              <li key={sub.slug}>
                                <Link
                                  href={subHref}
                                  style={{
                                    display: 'block',
                                    fontSize: '0.86rem',
                                    color: '#1e293b',
                                    fontWeight: 500,
                                    padding: '4px 0',
                                    transition: 'all 0.15s',
                                  }}
                                  className="nav-sub-item"
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* Featured Promo Card in Mega Menu if present */}
                      {menu.featured && (
                        <div
                          style={{
                            width: '240px',
                            backgroundColor: '#faf7f2',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            border: '1px solid #ebd9c0',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div>
                            <span
                              style={{
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.15em',
                                color: '#b47e00',
                                backgroundColor: '#fff',
                                padding: '3px 8px',
                                borderRadius: '2px',
                                display: 'inline-block',
                                marginBottom: '8px',
                              }}
                            >
                              Collection
                            </span>
                            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#0c2340', fontWeight: 600 }}>
                              {menu.featured.title}
                            </h4>
                            <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '6px' }}>
                              {menu.featured.desc}
                            </p>
                          </div>
                          <Link
                            href={menuHref}
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em',
                              color: '#b47e00',
                              marginTop: '14px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            Discover Department &rarr;
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Subtle Diamond Divider Under Header */}
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(180, 126, 0, 0.3) 20%, rgba(180, 126, 0, 0.7) 50%, rgba(180, 126, 0, 0.3) 80%, transparent)',
        }}
      />

      {/* 4. Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '90px',
            backgroundColor: '#ffffff',
            zIndex: 90,
            overflowY: 'auto',
            padding: '24px 20px',
            animation: 'fadeIn 0.2s',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* All Products on mobile */}
            <div style={{ borderBottom: '1px solid #ebd9c0', paddingBottom: '14px' }}>
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '1rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#0c2340',
                }}
              >
                <span>All Products (Catalogue)</span>
                <span style={{ fontSize: '0.72rem', backgroundColor: '#dda82e', color: '#0c2340', padding: '2px 8px', borderRadius: '2px' }}>
                  CAD
                </span>
              </Link>
            </div>

            {NAV_MENU.map((item) => {
              const itemHref =
                item.slug === 'collections'
                  ? '/collections'
                  : item.slug === 'brands'
                    ? '/brands'
                    : item.slug === 'gifts'
                      ? '/gifts'
                      : item.slug === 'crafts'
                        ? '/crafts'
                        : item.slug === 'decorations'
                          ? '/decorations'
                          : item.slug === 'souvenirs'
                            ? '/souvenirs'
                            : item.slug === 'lifestyle'
                              ? '/lifestyle'
                              : `/category/${item.slug}`;

              return (
                <div key={item.slug} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                  <Link
                    href={itemHref}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: '#0c2340',
                      display: 'block',
                    }}
                  >
                    {item.name}
                  </Link>
                  <div style={{ marginTop: '8px', paddingLeft: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {item.items.map((sub) => {
                      const subHref =
                        item.slug === 'collections'
                          ? `/collections/${sub.slug}`
                          : item.slug === 'brands'
                            ? `/brands/${sub.slug}`
                            : `/category/${sub.slug}`;

                      return (
                        <Link
                          key={sub.slug}
                          href={subHref}
                          onClick={() => setIsMobileMenuOpen(false)}
                          style={{ fontSize: '0.85rem', color: '#475569' }}
                        >
                          {sub.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setSelectedLang(l.code)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '4px',
                    border: '1px solid #e2e8f0',
                    fontSize: '0.85rem',
                    fontWeight: selectedLang === l.code ? 700 : 500,
                    backgroundColor: selectedLang === l.code ? '#0c2340' : '#fff',
                    color: selectedLang === l.code ? '#fff' : '#0c2340',
                  }}
                >
                  {l.flag} {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
