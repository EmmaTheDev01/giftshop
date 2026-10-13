'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DiamondSeparator from './DiamondSeparator';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/mockData';
import { ArrowRight, Eye, ShoppingBag } from 'lucide-react';

export default function CuratedLookbook() {
  const { setQuickViewProduct, addToCart } = useCart();

  const lookbookItems = [
    PRODUCTS.find((p) => p.slug === 'navy-shopping-bag-saint-james') || PRODUCTS[11],
    PRODUCTS.find((p) => p.slug === 'heather-grey-t-shirt-signature-collection') || PRODUCTS[12],
    PRODUCTS.find((p) => p.slug === '67x67cm-day-blue-silk-scarf-signature-collection') || PRODUCTS[13],
    PRODUCTS.find((p) => p.slug === '130g-raspberry-candy-jar-signature-collection') || PRODUCTS[14],
  ];

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
            Curated Selection
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 2.85rem)',
              fontWeight: 500,
              color: '#0c2340',
              lineHeight: 1.2,
            }}
          >
            Curated Keepsakes from Memoriq
          </h2>
          <DiamondSeparator variant="points" />
        </div>

        {/* Lookbook Layout: 5 item grid (2 left, 1 Center Hero Card, 2 right) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            alignItems: 'stretch',
          }}
          className="lookbook-grid"
        >
          {/* Card 1: Saint James Bag */}
          <div
            onClick={() => setQuickViewProduct(lookbookItems[0])}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '2px',
              border: '1px solid #ebd9c0',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'transform 0.25s, box-shadow 0.25s',
            }}
            className="lookbook-item"
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden', borderRadius: '2px' }}>
              <Image
                src={lookbookItems[0].images[0]}
                alt={lookbookItems[0].name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div style={{ marginTop: '14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '0.7rem', color: '#b47e00', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.1em' }}>
                  {lookbookItems[0].category_name}
                </p>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: '#0c2340', fontWeight: 600, marginTop: '2px' }}>
                  {lookbookItems[0].name}
                </h4>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0c2340' }}>
                  ${lookbookItems[0].price.toFixed(2)} CAD
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(lookbookItems[0]);
                  }}
                  style={{
                    backgroundColor: '#0c2340',
                    color: '#fff',
                    padding: '6px 12px',
                    borderRadius: '2px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <ShoppingBag size={13} style={{ color: '#dda82e' }} />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Heather Grey T-Shirt */}
          <div
            onClick={() => setQuickViewProduct(lookbookItems[1])}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '2px',
              border: '1px solid #ebd9c0',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'transform 0.25s, box-shadow 0.25s',
            }}
            className="lookbook-item"
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden', borderRadius: '2px' }}>
              <Image
                src={lookbookItems[1].images[0]}
                alt={lookbookItems[1].name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div style={{ marginTop: '14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '0.7rem', color: '#b47e00', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.1em' }}>
                  {lookbookItems[1].category_name}
                </p>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: '#0c2340', fontWeight: 600, marginTop: '2px' }}>
                  {lookbookItems[1].name}
                </h4>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0c2340' }}>
                  ${lookbookItems[1].price.toFixed(2)} CAD
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(lookbookItems[1]);
                  }}
                  style={{
                    backgroundColor: '#0c2340',
                    color: '#fff',
                    padding: '6px 12px',
                    borderRadius: '2px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <ShoppingBag size={13} style={{ color: '#dda82e' }} />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Central Hero Lookbook Banner Card */}
          <div
            style={{
              position: 'relative',
              minHeight: '340px',
              borderRadius: '2px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '32px 24px',
              color: '#ffffff',
              background: `
                linear-gradient(180deg, rgba(12, 35, 64, 0.2) 0%, rgba(12, 35, 64, 0.9) 100%),
                url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80') center/cover no-repeat
              `,
              gridColumn: 'span 1',
            }}
            className="lookbook-hero-card"
          >
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#dda82e',
                marginBottom: '8px',
              }}
            >
              Summer 2026 Collection
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.75rem',
                fontWeight: 500,
                lineHeight: 1.2,
                marginBottom: '18px',
              }}
            >
              The Parisian Art de Vivre
            </h3>
            <Link
              href="/collections"
              className="btn-gold"
              style={{
                padding: '12px 24px',
                fontSize: '0.8rem',
                width: 'fit-content',
              }}
            >
              <span>Discover the collection</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Card 3: Day Blue Silk Scarf */}
          <div
            onClick={() => setQuickViewProduct(lookbookItems[2])}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '2px',
              border: '1px solid #ebd9c0',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'transform 0.25s, box-shadow 0.25s',
            }}
            className="lookbook-item"
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden', borderRadius: '2px' }}>
              <Image
                src={lookbookItems[2].images[0]}
                alt={lookbookItems[2].name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div style={{ marginTop: '14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '0.7rem', color: '#b47e00', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.1em' }}>
                  {lookbookItems[2].category_name}
                </p>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: '#0c2340', fontWeight: 600, marginTop: '2px' }}>
                  {lookbookItems[2].name}
                </h4>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0c2340' }}>
                  ${lookbookItems[2].price.toFixed(2)} CAD
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(lookbookItems[2]);
                  }}
                  style={{
                    backgroundColor: '#0c2340',
                    color: '#fff',
                    padding: '6px 12px',
                    borderRadius: '2px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <ShoppingBag size={13} style={{ color: '#dda82e' }} />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: 130g Raspberry Candy Jar */}
          <div
            onClick={() => setQuickViewProduct(lookbookItems[3])}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '2px',
              border: '1px solid #ebd9c0',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'transform 0.25s, box-shadow 0.25s',
            }}
            className="lookbook-item"
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden', borderRadius: '2px' }}>
              <Image
                src={lookbookItems[3].images[0]}
                alt={lookbookItems[3].name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div style={{ marginTop: '14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '0.7rem', color: '#b47e00', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.1em' }}>
                  {lookbookItems[3].category_name}
                </p>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: '#0c2340', fontWeight: 600, marginTop: '2px' }}>
                  {lookbookItems[3].name}
                </h4>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0c2340' }}>
                  ${lookbookItems[3].price.toFixed(2)} CAD
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(lookbookItems[3]);
                  }}
                  style={{
                    backgroundColor: '#0c2340',
                    color: '#fff',
                    padding: '6px 12px',
                    borderRadius: '2px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <ShoppingBag size={13} style={{ color: '#dda82e' }} />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
