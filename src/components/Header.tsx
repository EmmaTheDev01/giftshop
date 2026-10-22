'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  ChevronRight,
  ShieldCheck,
  LogOut,
  Package,
} from 'lucide-react';

export default function Header() {
  const { cartCount, cartTotal, setIsCartOpen, setIsFavoritesOpen, setIsSearchOpen, wishlist } = useCart();
  const { user, profile, isAdmin, signOut } = useAuth();
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(74);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update dynamic header height for pixel-perfect mobile drawer positioning
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.getBoundingClientRect().height);
      }
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, [isScrolled]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleMobileCategory = (slug: string) => {
    setExpandedMobileCategory((prev) => (prev === slug ? null : slug));
  };

  const languages = [
    { code: 'EN', label: 'English (CA)', flag: '🇨🇦' },
    { code: 'US', label: 'English (US)', flag: '🇺🇸' },
    { code: 'FR', label: 'Français (CA)', flag: '🇨🇦' },
  ];

  return (
    <header
      ref={headerRef}
      style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: '#ffffff', transition: 'box-shadow 0.25s' }}
      className={isScrolled ? 'shadow-md' : ''}
    >
      {/* 1. Top Announcement Bar */}
      <div
        style={{
          backgroundColor: '#0c2340',
          color: '#f5f1eb',
          fontSize: 'clamp(0.66rem, 1.8vw, 0.74rem)',
          fontWeight: 500,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          padding: '7px 14px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '6px 12px',
          borderBottom: '1px solid rgba(180, 126, 0, 0.25)',
        }}
      >
        <span>Delivery Across Canada &amp; USA 🇨🇦 🇺🇸</span>
        <span style={{ color: '#b47e00' }} className="hidden-mobile">•</span>
        <span className="hidden-mobile">Free Shipping Over $95 CAD / $70 USD</span>
        <span style={{ color: '#b47e00' }} className="hidden-mobile">•</span>
        <span style={{ color: '#dda82e' }}>Official Memoriq Boutique</span>
      </div>

      {/* 2. Main Header Row */}
      <div
        className="container-custom"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 'clamp(10px, 2.2vw, 18px)',
          paddingBottom: 'clamp(10px, 2.2vw, 18px)',
          position: 'relative',
        }}
      >
        {/* Left Utilities (Language & Monument Link) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px, 2vw, 24px)', flex: 1 }}>
          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0c2340',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #e2e8f0',
              backgroundColor: isMobileMenuOpen ? '#f1f5f9' : '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            className="mobile-burger"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 'clamp(6px, 1.8vw, 18px)', flex: 1 }}>
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
              gap: '8px',
              backgroundColor: '#0c2340',
              color: '#ffffff',
              padding: '8px 14px',
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
            <span className="hidden-mobile" style={{ letterSpacing: '0.04em' }}>
              ${cartTotal.toFixed(2)} CAD
            </span>
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
            top: `${headerHeight}px`,
            backgroundColor: '#ffffff',
            zIndex: 90,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            display: 'flex',
            flexDirection: 'column',
            animation: 'fadeIn 0.2s ease-out',
            borderTop: '1px solid #e2e8f0',
          }}
        >
          {/* Mobile Drawer Brand Header */}
          <div
            style={{
              padding: '14px 20px',
              borderBottom: '1px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#faf8f5',
            }}
          >
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <Logo size={32} />
            </Link>
            <span
              style={{
                fontSize: '0.68rem',
                color: '#b47e00',
                backgroundColor: '#ffffff',
                border: '1px solid #ebd9c0',
                padding: '3px 8px',
                borderRadius: '4px',
                fontWeight: 700,
              }}
            >
              🇨🇦 Canada
            </span>
          </div>

          {/* Quick Search Shortcut */}
          <div style={{ padding: '16px 20px 12px 20px', borderBottom: '1px solid #f1f5f9' }}>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '11px 14px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                color: '#64748b',
                fontSize: '0.86rem',
                cursor: 'pointer',
                textAlign: 'left',
              }}
              aria-label="Search catalog"
            >
              <Search size={18} style={{ color: '#94a3b8' }} />
              <span>Search art, collectibles, gifts...</span>
            </button>
          </div>

          {/* Quick Account / Wishlist / Admin Grid */}
          <div
            style={{
              padding: '12px 20px',
              display: 'grid',
              gridTemplateColumns: isAdmin ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
              gap: '10px',
              backgroundColor: '#faf8f5',
              borderBottom: '1px solid #ebd9c0',
            }}
          >
            {/* Account Link */}
            <Link
              href={user ? '/my-account' : '/login'}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 8px',
                backgroundColor: '#ffffff',
                border: '1px solid #ebd9c0',
                borderRadius: '6px',
                color: '#0c2340',
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ color: '#0c2340' }} />
                {user && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      right: '-3px',
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: '#16a34a',
                      border: '1.5px solid #ffffff',
                    }}
                  />
                )}
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.02em' }}>
                {user ? (profile?.full_name ? profile.full_name.split(' ')[0] : 'My Account') : 'Sign In'}
              </span>
            </Link>

            {/* Wishlist Link */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsFavoritesOpen(true);
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 8px',
                backgroundColor: '#ffffff',
                border: '1px solid #ebd9c0',
                borderRadius: '6px',
                color: '#0c2340',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              <div style={{ position: 'relative' }}>
                <Heart size={18} style={{ color: '#b47e00', fill: wishlist.length > 0 ? '#b47e00' : 'none' }} />
                {wishlist.length > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-8px',
                      backgroundColor: '#b47e00',
                      color: '#ffffff',
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {wishlist.length}
                  </span>
                )}
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.02em' }}>
                Saved ({wishlist.length})
              </span>
            </button>

            {/* Admin Portal Shortcut if Admin */}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '10px 8px',
                  backgroundColor: '#0c2340',
                  border: '1px solid #0c2340',
                  borderRadius: '6px',
                  color: '#dda82e',
                  textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                <ShieldCheck size={18} style={{ color: '#dda82e' }} />
                <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.02em' }}>
                  Admin
                </span>
              </Link>
            )}
          </div>

          {/* Navigation Accordion Sections */}
          <div style={{ flex: 1, padding: '16px 20px 24px 20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {/* Master All Products Link */}
            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '10px', marginBottom: '4px' }}>
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  backgroundColor: '#0c2340',
                  color: '#ffffff',
                  borderRadius: '4px',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  textDecoration: 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Package size={16} style={{ color: '#dda82e' }} />
                  <span>Browse All Products</span>
                </div>
                <span
                  style={{
                    fontSize: '0.68rem',
                    backgroundColor: '#dda82e',
                    color: '#0c2340',
                    padding: '2px 8px',
                    borderRadius: '2px',
                    fontWeight: 800,
                  }}
                >
                  Catalogue
                </span>
              </Link>
            </div>

            {/* Departments with Accordion Collapse */}
            {NAV_MENU.map((item) => {
              const itemHref =
                item.slug === 'catalogue'
                  ? '/products'
                  : item.slug === 'collections'
                    ? '/collections'
                    : item.slug === 'brands'
                      ? '/brands'
                      : item.slug === 'gifts'
                        ? '/gifts'
                        : item.slug === 'lifestyles'
                          ? '/collections'
                          : item.slug === 'fashion'
                            ? '/collections'
                            : item.slug === 'events'
                              ? '/boutiques'
                              : item.slug === 'customize'
                                ? '/customize'
                                : `/category/${item.slug}`;

              const isExpanded = expandedMobileCategory === item.slug;

              return (
                <div
                  key={item.slug}
                  style={{
                    borderBottom: '1px solid #f1f5f9',
                    paddingBottom: isExpanded ? '10px' : '4px',
                    transition: 'all 0.2s',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 4px',
                    }}
                  >
                    <Link
                      href={itemHref}
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.07em',
                        color: isExpanded ? '#b47e00' : '#0c2340',
                        textDecoration: 'none',
                        flex: 1,
                      }}
                    >
                      {item.name}
                    </Link>

                    {item.items && item.items.length > 0 && (
                      <button
                        onClick={() => toggleMobileCategory(item.slug)}
                        aria-label={`Toggle ${item.name} categories`}
                        aria-expanded={isExpanded}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '6px 8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isExpanded ? '#b47e00' : '#64748b',
                          transition: 'transform 0.2s ease',
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      >
                        <ChevronDown size={18} />
                      </button>
                    )}
                  </div>

                  {/* Subcategories (Collapsible) */}
                  {isExpanded && item.items && item.items.length > 0 && (
                    <div
                      style={{
                        paddingLeft: '12px',
                        paddingTop: '6px',
                        paddingBottom: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        borderLeft: '2px solid #dda82e',
                        marginLeft: '4px',
                        marginTop: '4px',
                      }}
                    >
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
                            style={{
                              fontSize: '0.84rem',
                              color: '#475569',
                              textDecoration: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '4px 0',
                            }}
                          >
                            <span>{sub.name}</span>
                            {sub.count && (
                              <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{sub.count}</span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Canadian Boutiques & Galleries */}
            <div style={{ borderBottom: '1px solid #f1f5f9', padding: '12px 4px' }}>
              <Link
                href="/boutiques"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: '#0c2340',
                  textDecoration: 'none',
                }}
              >
                <span>Galleries: Canada • USA</span>
                <ArrowUpRight size={15} style={{ color: '#b47e00' }} />
              </Link>
            </div>

            {/* Regional & Language Switcher */}
            <div style={{ marginTop: '16px' }}>
              <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', marginBottom: '8px' }}>
                Region &amp; Currency
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setSelectedLang(l.code)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '4px',
                      border: selectedLang === l.code ? '1.5px solid #0c2340' : '1px solid #e2e8f0',
                      fontSize: '0.76rem',
                      fontWeight: selectedLang === l.code ? 700 : 500,
                      backgroundColor: selectedLang === l.code ? '#0c2340' : '#ffffff',
                      color: selectedLang === l.code ? '#ffffff' : '#0c2340',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>{l.flag}</span>
                    <span>{l.code}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sign Out Action if Logged In */}
            {user && (
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                <button
                  onClick={async () => {
                    await signOut();
                    setIsMobileMenuOpen(false);
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #fee2e2',
                    backgroundColor: '#fef2f2',
                    color: '#dc2626',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
