'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { getProducts } from '@/lib/api';
import type { ExtendedProduct } from '@/types/supabase';
import { Search, X, ArrowRight } from 'lucide-react';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, setQuickViewProduct } = useCart();
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<ExtendedProduct[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      getProducts().then(setProducts);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category_name?.toLowerCase().includes(query.toLowerCase()) ||
          (p.description || '').toLowerCase().includes(query.toLowerCase()) ||
          (p.brand_name || '').toLowerCase().includes(query.toLowerCase())
      )
    : products.slice(0, 4);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 110,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 20px',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(12, 35, 64, 0.75)',
          backdropFilter: 'blur(6px)',
          animation: 'fadeIn 0.2s',
        }}
      />

      {/* Search Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '720px',
          backgroundColor: '#ffffff',
          borderRadius: '4px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
          zIndex: 111,
          marginTop: '60px',
          overflow: 'hidden',
          animation: 'slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '20px 24px',
            borderBottom: '1px solid #e2e8f0',
            gap: '14px',
          }}
        >
          <Search size={22} style={{ color: '#b47e00' }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search medals, snow globes, books, textiles, souvenirs..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1.05rem',
              color: '#0c2340',
              fontFamily: 'inherit',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ color: '#94a3b8', padding: '4px' }}
              aria-label="Clear query"
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            style={{
              color: '#64748b',
              padding: '6px',
              borderRadius: '50%',
              backgroundColor: '#f1f5f9',
            }}
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '16px 24px' }}>
          <p
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#b47e00',
              marginBottom: '12px',
            }}
          >
            {query.trim() ? `Search Results (${results.length})` : 'Popular Searches'}
          </p>

          {results.length === 0 ? (
            <div style={{ padding: '36px 0', textAlign: 'center', color: '#64748b' }}>
              <p style={{ fontSize: '0.95rem' }}>No products found for &ldquo;{query}&rdquo;</p>
              <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>Try searching for &ldquo;snow globe&rdquo;, &ldquo;medal&rdquo;, or &ldquo;bronze&rdquo;.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={() => setIsSearchOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '8px 10px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s',
                    textDecoration: 'none',
                  }}
                  className="search-item"
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '48px',
                      height: '58px',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      backgroundColor: '#faf8f5',
                      border: '1px solid #ebd9c0',
                      flexShrink: 0,
                    }}
                  >
                    <Image src={product.images[0]} alt={product.name} fill sizes="48px" style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.72rem', color: '#b47e00', textTransform: 'uppercase', fontWeight: 600 }}>
                      {product.category_name}
                    </p>
                    <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.98rem', color: '#0c2340', fontWeight: 600 }}>
                      {product.name}
                    </h5>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0c2340' }}>
                    ${product.price.toFixed(2)} CAD
                  </span>
                  <ArrowRight size={16} style={{ color: '#b47e00', opacity: 0.7 }} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
