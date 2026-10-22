'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import DiamondSeparator from '@/components/DiamondSeparator';
import { ExtendedProduct } from '@/types/supabase';
import { SlidersHorizontal, Search, RotateCcw, ChevronRight } from 'lucide-react';

interface SubcategoryItem {
  name: string;
  slug: string;
  count?: string;
}

interface DepartmentViewProps {
  title: string;
  eyebrow?: string;
  subtitle: string;
  breadcrumbName: string;
  subcategories: SubcategoryItem[];
  products: ExtendedProduct[];
  bannerImage?: string;
}

export default function DepartmentView({
  title,
  eyebrow = 'Official Canadian Boutique Department',
  subtitle,
  breadcrumbName,
  subcategories,
  products,
}: DepartmentViewProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name'>('featured');

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Subcategory matching if selected
        if (selectedSubcategory !== 'all') {
          const sub = selectedSubcategory.toLowerCase();
          const pName = product.name.toLowerCase();
          const pCat = (product.category_name || '').toLowerCase();
          const pDesc = (product.description || '').toLowerCase();
          const pBrand = (product.brand_name || '').toLowerCase();
          const pColl = (product.collection_name || '').toLowerCase();

          const matches =
            pName.includes(sub) ||
            pCat.includes(sub) ||
            pDesc.includes(sub) ||
            pBrand.includes(sub) ||
            pColl.includes(sub);

          // If no direct keyword match, allow fallthrough to show department items
            if (sub.includes('wood') && !pName.includes('wood') && !pCat.includes('wood') && !pDesc.includes('wood')) return false;
            if (sub.includes('clock') && !pName.includes('clock') && !pCat.includes('clock')) return false;
            if (sub.includes('shelf') && !pName.includes('shelf') && !pCat.includes('shelf')) return false;
            if (sub.includes('maple') && !pName.includes('maple') && !pDesc.includes('maple')) return false;
            if (sub.includes('led') && !pName.includes('led') && !pCat.includes('light')) return false;
        }

        // Search matching
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            product.name.toLowerCase().includes(q) ||
            (product.description || '').toLowerCase().includes(q) ||
            (product.category_name || '').toLowerCase().includes(q);
          if (!matches) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
      });
  }, [products, selectedSubcategory, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedSubcategory('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div>
      {/* 1. Hero Header */}
      <section
        style={{
          backgroundColor: '#0c2340',
          color: '#f5f1eb',
          padding: '52px 20px 44px',
          textAlign: 'center',
          position: 'relative',
          borderBottom: '3px solid #b47e00',
        }}
      >
        <div className="container-custom" style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '0.8rem',
              color: '#94a3b8',
              marginBottom: '16px',
            }}
          >
            <Link href="/" style={{ color: '#dda82e', textDecoration: 'none' }}>
              Home
            </Link>
            <ChevronRight size={13} style={{ color: '#b47e00' }} />
            <Link href="/products" style={{ color: '#94a3b8', textDecoration: 'none' }}>
              Boutique
            </Link>
            <ChevronRight size={13} style={{ color: '#b47e00' }} />
            <span style={{ color: '#f5f1eb', fontWeight: 600 }}>{breadcrumbName}</span>
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
            <span>{eyebrow}</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
              fontWeight: 600,
              color: '#f5f1eb',
              margin: '0 0 14px',
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.6,
              color: '#cbd5e1',
              maxWidth: '680px',
              margin: '0 auto 20px',
              fontWeight: 300,
            }}
          >
            {subtitle}
          </p>

          <DiamondSeparator color="#b47e00" />
        </div>
      </section>

      {/* 2. Subcategory & Filters Bar */}
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
          {/* Pills */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '10px',
              scrollbarWidth: 'none',
            }}
          >
            <button
              onClick={() => setSelectedSubcategory('all')}
              style={{
                whiteSpace: 'nowrap',
                padding: '7px 16px',
                borderRadius: '24px',
                fontSize: '0.82rem',
                fontWeight: selectedSubcategory === 'all' ? 700 : 500,
                backgroundColor: selectedSubcategory === 'all' ? '#0c2340' : '#ffffff',
                color: selectedSubcategory === 'all' ? '#ffffff' : '#334155',
                border: selectedSubcategory === 'all' ? '1px solid #0c2340' : '1px solid #e2e8f0',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              All {breadcrumbName}
            </button>

            {subcategories.map((sub) => {
              const isActive = selectedSubcategory === sub.slug;
              return (
                <button
                  key={sub.slug}
                  onClick={() => setSelectedSubcategory(sub.slug)}
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
                  {sub.name}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '3px',
                padding: '6px 12px',
                minWidth: '240px',
                flex: '1 1 220px',
                maxWidth: '360px',
              }}
            >
              <Search size={15} style={{ color: '#b47e00' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search in ${breadcrumbName.toLowerCase()}...`}
                style={{
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.85rem',
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                <strong style={{ color: '#0c2340' }}>{filteredProducts.length}</strong> items available
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <label htmlFor="dept-sort-select" style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                  Sort:
                </label>
                <select
                  id="dept-sort-select"
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
                  <option value="rating">Top Rated</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>

              {(selectedSubcategory !== 'all' || searchQuery.trim() || sortBy !== 'featured') && (
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

      {/* 3. Products Grid */}
      <section style={{ padding: '48px 20px 80px' }}>
        <div className="container-custom">
          {filteredProducts.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '64px 20px',
                backgroundColor: '#faf8f5',
                borderRadius: '4px',
                border: '1px dashed #ebd9c0',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              <SlidersHorizontal size={36} style={{ color: '#b47e00', margin: '0 auto 16px' }} />
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.35rem',
                  color: '#0c2340',
                  marginBottom: '8px',
                }}
              >
                No Items Found In This View
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>
                We could not find any items matching your selected criteria in {breadcrumbName}.
              </p>
              <button onClick={resetFilters} className="btn-primary">
                View All {breadcrumbName}
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
    </div>
  );
}
