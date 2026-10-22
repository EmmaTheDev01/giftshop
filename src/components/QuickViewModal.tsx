'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Truck, Check } from 'lucide-react';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, wishlist } = useCart();
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setSelectedImgIdx(0);
    setQty(1);
  }, [quickViewProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setQuickViewProduct(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setQuickViewProduct]);

  if (!quickViewProduct) return null;

  const isFavorite = wishlist.includes(quickViewProduct.id);

  const handleAdd = () => {
    addToCart(quickViewProduct, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(12, 35, 64, 0.7)',
          backdropFilter: 'blur(5px)',
          animation: 'fadeIn 0.2s',
        }}
      />

      {/* Modal Dialog */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '920px',
          maxHeight: '90vh',
          backgroundColor: '#ffffff',
          borderRadius: '4px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
          overflowY: 'auto',
          zIndex: 111,
          animation: 'slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0c2340',
            zIndex: 20,
            cursor: 'pointer',
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Left: Product Images */}
        <div style={{ padding: '32px', backgroundColor: '#faf8f5', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '4 / 5',
              borderRadius: '2px',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              border: '1px solid #ebd9c0',
            }}
          >
            <Image
              src={quickViewProduct.images[selectedImgIdx] || quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              fill
              sizes="(max-width: 768px) 100vw, 450px"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>

          {/* Thumbnails if multiple */}
          {quickViewProduct.images.length > 1 && (
            <div style={{ display: 'flex', gap: '10px' }}>
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIdx(idx)}
                  style={{
                    position: 'relative',
                    width: '64px',
                    height: '78px',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    border: selectedImgIdx === idx ? '2px solid #b47e00' : '1px solid #cbd5e1',
                    cursor: 'pointer',
                  }}
                >
                  <Image src={img} alt="Thumbnail" fill style={{ objectFit: 'cover' }} sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details */}
        <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            {/* Category & Badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#b47e00' }}>
                {quickViewProduct.category_name}
              </span>
              {quickViewProduct.badge && (
                <span
                  style={{
                    backgroundColor: '#0c2340',
                    color: '#fff',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    padding: '3px 8px',
                    borderRadius: '2px',
                  }}
                >
                  {quickViewProduct.badge}
                </span>
              )}
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.2rem, 1.8vw, 1.45rem)',
                fontWeight: 600,
                color: '#0c2340',
                lineHeight: 1.25,
                marginBottom: '10px',
              }}
            >
              {quickViewProduct.name}
            </h3>

            {/* Ratings & SKU */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#eab308' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#eab308" />
                ))}
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, marginLeft: '4px' }}>
                  {quickViewProduct.rating} ({quickViewProduct.reviews_count} reviews)
                </span>
              </div>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                SKU: {quickViewProduct.sku}
              </span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontSize: '1.65rem', fontWeight: 700, color: '#0c2340' }}>
                ${quickViewProduct.price.toFixed(2)} CAD
              </span>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                Taxes calculated at checkout • Canadian & Worldwide shipping
              </span>
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '20px' }}>
              {quickViewProduct.description}
            </p>

            {/* Specifications bullet points */}
            {quickViewProduct.details && (
              <div style={{ backgroundColor: '#faf8f5', padding: '14px', borderRadius: '4px', marginBottom: '24px', fontSize: '0.82rem', color: '#334155' }}>
                {Object.entries(quickViewProduct.details).map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
                    <span style={{ fontWeight: 600, color: '#0c2340' }}>{k}:</span>
                    <span>{String(v)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add to Cart Actions */}
          <div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
              {/* Quantity */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #cbd5e1',
                  borderRadius: '2px',
                  backgroundColor: '#ffffff',
                }}
              >
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  style={{ padding: '10px 14px', color: '#0c2340' }}
                >
                  -
                </button>
                <span style={{ padding: '0 12px', fontWeight: 600, fontSize: '0.9rem' }}>
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  style={{ padding: '10px 14px', color: '#0c2340' }}
                >
                  +
                </button>
              </div>

              {/* Add Button */}
              <button
                onClick={handleAdd}
                className="btn-primary"
                style={{
                  flex: 1,
                  padding: '14px 24px',
                  backgroundColor: added ? '#15803d' : '#0c2340',
                }}
              >
                {added ? (
                  <>
                    <Check size={16} />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} style={{ color: '#dda82e' }} />
                    <span>Add to Cart • ${(quickViewProduct.price * qty).toFixed(2)} CAD</span>
                  </>
                )}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '2px',
                  border: '1px solid #cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isFavorite ? '#b47e00' : '#475569',
                }}
                aria-label="Toggle wishlist"
              >
                <Heart size={20} fill={isFavorite ? '#b47e00' : 'none'} />
              </button>
            </div>

            {/* Delivery Reassurance */}
            <div style={{ display: 'flex', gap: '16px', fontSize: '0.78rem', color: '#64748b' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Truck size={14} style={{ color: '#b47e00' }} /> Fast Canadian & Global dispatch 🇨🇦
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <ShieldCheck size={14} style={{ color: '#b47e00' }} /> Certified Artisan Boutique Authenticity
              </span>
            </div>

            {/* View Full Product Details Link */}
            <div style={{ paddingTop: '8px', borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
              <Link
                href={`/products/${quickViewProduct.slug}`}
                onClick={() => setQuickViewProduct(null)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#0c2340',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  padding: '6px 12px',
                }}
              >
                <span>View Full Product Details & Specifications</span>
                <span style={{ color: '#b47e00' }}>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
