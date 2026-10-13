'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DiamondSeparator from '@/components/DiamondSeparator';
import { PRODUCTS, ExtendedProduct } from '@/data/mockData';
import {
  SlidersHorizontal,
  ChevronDown,
  Search,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Truck,
  ArrowRight,
} from 'lucide-react';

const CATEGORY_TABS = [
  { id: 'all', label: 'All Catalogue' },
  { id: 'keepsakes', label: 'Keepsakes & Medals' },
  { id: 'fashion', label: 'Fashion & Knitwear' },
  { id: 'lifestyle', label: 'Home & Fragrance' },
  { id: 'gourmet', label: 'Gourmet & Teas' },
  { id: 'kids', label: 'Kids & Wooden Toys' },
  { id: 'books', label: 'Books & Stationery' },
];

export default function ProductsPage() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name'>('featured');
  const [priceRange, setPriceRange] = useState<number>(500);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Tab matching
      if (selectedTab !== 'all') {
        const cat = (product.category_name || '').toLowerCase();
        const name = product.name.toLowerCase();
        if (selectedTab === 'keepsakes' && !cat.includes('medal') && !cat.includes('miniature') && !cat.includes('statue') && !cat.includes('keepsake')) return false;
        if (selectedTab === 'fashion' && !cat.includes('fashion') && !cat.includes('apparel') && !cat.includes('knitwear') && !cat.includes('silk') && !cat.includes('bag')) return false;
        if (selectedTab === 'lifestyle' && !cat.includes('home') && !cat.includes('tableware') && !cat.includes('decorative') && !cat.includes('porcelain')) return false;
        if (selectedTab === 'gourmet' && !cat.includes('gourmet') && !cat.includes('tea') && !cat.includes('confection')) return false;
        if (selectedTab === 'kids' && !cat.includes('kids') && !cat.includes('game') && !cat.includes('puzzle')) return false;
        if (selectedTab === 'books' && !cat.includes('book') && !cat.includes('stationery') && !cat.includes('journal')) return false;
      }

      // Price filter
      if (product.price > priceRange) return false;

      // Search matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = (product.description || '').toLowerCase().includes(q);
        const matchesBrand = (product.brand_name || '').toLowerCase().includes(q);
        const matchesCat = (product.category_name || '').toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesBrand && !matchesCat) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
    });
  }, [selectedTab, searchQuery, sortBy, priceRange]);

  const resetFilters = () => {
    setSelectedTab('all');
    setSearchQuery('');
    setSortBy('featured');
    setPriceRange(500);
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1 }}>
        {/* 1. Hero Header Banner */}
        <section
          style={{
            backgroundColor: '#0c2340',
            color: '#f5f1eb',
            padding: '54px 20px 48px',
            position: 'relative',
            borderBottom: '3px solid #b47e00',
            textAlign: 'center',
          }}
        >
          <div className="container-custom" style={{ maxWidth: '960px', margin: '0 auto' }}>
            {/* Breadcrumb */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                color: '#94a3b8',
                marginBottom: '18px',
                letterSpacing: '0.04em',
              }}
            >
              <Link href="/" style={{ color: '#dda82e', textDecoration: 'none' }}>
                Home
              </Link>
              <span>/</span>
              <span style={{ color: '#f5f1eb' }}>All Products</span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(180, 126, 0, 0.15)',
                border: '1px solid rgba(180, 126, 0, 0.35)',
                padding: '4px 14px',
                borderRadius: '30px',
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#dda82e',
                marginBottom: '14px',
              }}
            >
              <Sparkles size={13} />
              <span>Official Canadian & European Heritage Catalogue</span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                margin: '0 0 14px',
                color: '#f5f1eb',
                lineHeight: 1.2,
              }}
            >
              The Complete Collection
            </h1>

            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.6,
                color: '#cbd5e1',
                maxWidth: '720px',
                margin: '0 auto',
                fontWeight: 300,
              }}
            >
              Explore all numbered keepsakes, monument editions, fine porcelain, maritime knitwear,
              and Canadian artisan treasures priced transparently in Canadian Dollars (CAD).
            </p>

            <div style={{ marginTop: '20px' }}>
              <DiamondSeparator color="#b47e00" />
            </div>
          </div>
        </section>

        {/* 2. Interactive Filter & Controls Strip */}
        <section
          style={{
            backgroundColor: '#faf8f5',
            borderBottom: '1px solid #ebd9c0',
            position: 'sticky',
            top: '72px',
            zIndex: 40,
            boxShadow: '0 4px 12px rgba(12, 35, 64, 0.04)',
          }}
        >
          <div className="container-custom" style={{ padding: '14px 20px' }}>
            {/* Top row: Category Pills */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '10px',
                scrollbarWidth: 'none',
              }}
            >
              {CATEGORY_TABS.map((tab) => {
                const isActive = selectedTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    style={{
                      whiteSpace: 'nowrap',
                      padding: '7px 16px',
                      borderRadius: '24px',
                      fontSize: '0.82rem',
                      fontWeight: isActive ? 700 : 500,
                      backgroundColor: isActive ? '#0c2340' : '#ffffff',
                      color: isActive ? '#ffffff' : '#334155',
                      border: isActive ? '1px solid #0c2340' : '1px solid #e2e8f0',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Bottom row: Search & Sort Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                paddingTop: '6px',
                borderTop: '1px solid #f1e7d8',
              }}
            >
              {/* Search Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '3px',
                  padding: '6px 12px',
                  minWidth: '260px',
                  flex: '1 1 240px',
                  maxWidth: '380px',
                }}
              >
                <Search size={16} style={{ color: '#b47e00' }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search catalogue..."
                  style={{
                    border: 'none',
                    outline: 'none',
                    fontSize: '0.86rem',
                    color: '#0c2340',
                    width: '100%',
                    backgroundColor: 'transparent',
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{ fontSize: '0.75rem', color: '#94a3b8', cursor: 'pointer' }}
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Status and Sort */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                  Showing <strong style={{ color: '#0c2340' }}>{filteredProducts.length}</strong> items
                </span>

                {/* Sort Dropdown */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <label htmlFor="sort-select" style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                    Sort by:
                  </label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '3px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: '#ffffff',
                      color: '#0c2340',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="featured">Featured First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Customer Rating</option>
                    <option value="name">Product Name (A-Z)</option>
                  </select>
                </div>

                {/* Reset Filters button if altered */}
                {(selectedTab !== 'all' || searchQuery.trim() || sortBy !== 'featured') && (
                  <button
                    onClick={resetFilters}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#b47e00',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <RotateCcw size={13} />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Products Grid Section */}
        <section style={{ padding: '48px 20px 80px' }}>
          <div className="container-custom">
            {filteredProducts.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '72px 20px',
                  backgroundColor: '#faf8f5',
                  borderRadius: '4px',
                  border: '1px dashed #ebd9c0',
                  maxWidth: '640px',
                  margin: '0 auto',
                }}
              >
                <SlidersHorizontal size={38} style={{ color: '#b47e00', margin: '0 auto 16px' }} />
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.4rem',
                    color: '#0c2340',
                    marginBottom: '8px',
                  }}
                >
                  No Keepsakes Match Your Criteria
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '24px' }}>
                  Try adjusting your search query, selecting another category, or resetting all filters.
                </p>
                <button onClick={resetFilters} className="btn-primary">
                  View All Products
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '32px 24px',
                }}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 4. Canadian Collector Reassurance Bar */}
        <section
          style={{
            backgroundColor: '#0c2340',
            color: '#f5f1eb',
            padding: '36px 20px',
            borderTop: '1px solid rgba(180, 126, 0, 0.3)',
          }}
        >
          <div
            className="container-custom"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
              textAlign: 'center',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Truck size={24} style={{ color: '#dda82e' }} />
              <strong style={{ fontSize: '0.92rem', letterSpacing: '0.04em' }}>Free Canadian Shipping</strong>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Complimentary expedited Canada Post on orders $95+ CAD</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={24} style={{ color: '#dda82e' }} />
              <strong style={{ fontSize: '0.92rem', letterSpacing: '0.04em' }}>Certified Authenticity</strong>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Official certificates with all numbered limited editions</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={24} style={{ color: '#dda82e' }} />
              <strong style={{ fontSize: '0.92rem', letterSpacing: '0.04em' }}>30-Day Canadian Returns</strong>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Hassle-free domestic return drop-offs across Canada</span>
            </div>
          </div>
        </section>
      </main>

      <ReassuranceFooter />
      <Footer />
    </div>
  );
}
