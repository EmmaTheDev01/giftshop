'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DiamondSeparator from './DiamondSeparator';
import { useCart } from '@/context/CartContext';
import { getProducts } from '@/lib/api';
import type { ExtendedProduct } from '@/types/supabase';
import { ArrowRight, ShoppingBag } from 'lucide-react';

export default function CuratedLookbook() {
  const { setQuickViewProduct, addToCart } = useCart();
  const [items, setItems] = useState<ExtendedProduct[]>([]);

  useEffect(() => {
    getProducts({ limit: 4 }).then((data) => {
      setItems(data.slice(0, 4));
    });
  }, []);

  return (
    <section style={{ padding: '80px 0', backgroundColor: '#faf8f5' }}>
      <div className="container-custom">
        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: '#b47e00',
              marginBottom: '8px',
            }}
          >
            Artisan Curations
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.45rem, 2.2vw, 1.95rem)',
              fontWeight: 500,
              color: '#0c2340',
              lineHeight: 1.25,
            }}
          >
            Curated Woodcraft & Wall Decor
          </h2>
          <DiamondSeparator variant="points" />
        </div>

        {/* Lookbook Layout Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            alignItems: 'stretch',
          }}
          className="lookbook-grid"
        >
          {items.map((prod) => (
            <div
              key={prod.id}
              onClick={() => setQuickViewProduct(prod)}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '4px',
                border: '1px solid #ebd9c0',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.25s, box-shadow 0.25s',
              }}
              className="lookbook-item"
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1/1',
                  overflow: 'hidden',
                  borderRadius: '2px',
                  backgroundColor: '#f1f5f9',
                }}
              >
                <img
                  src={prod.images?.[0] || '/images/products/canadian-maple-leaf-wall-sign.jpg'}
                  alt={prod.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ marginTop: '14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '0.7rem', color: '#b47e00', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.1em', margin: 0 }}>
                    {prod.made_in || 'Canada'} • Artisan Craft
                  </p>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: '#0c2340', fontWeight: 600, marginTop: '4px', marginBottom: 0 }}>
                    {prod.name}
                  </h4>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0c2340' }}>
                    ${prod.price?.toFixed(2)} CAD
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(prod);
                    }}
                    style={{
                      backgroundColor: '#0c2340',
                      color: '#fff',
                      padding: '6px 14px',
                      borderRadius: '2px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <ShoppingBag size={13} style={{ color: '#dda82e' }} />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Catalogue Banner */}
        <div style={{ textAlign: 'center', marginTop: '44px' }}>
          <Link
            href="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#0c2340',
              fontWeight: 700,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              borderBottom: '2px solid #b47e00',
              paddingBottom: '4px',
            }}
          >
            <span>Explore All 22 Keepsakes In CAD</span>
            <ArrowRight size={16} style={{ color: '#b47e00' }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
