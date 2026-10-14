'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { getProducts } from '@/lib/api';
import type { ExtendedProduct } from '@/types/supabase';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function FavoritesDrawer() {
  const {
    wishlist,
    isFavoritesOpen,
    setIsFavoritesOpen,
    toggleWishlist,
    clearWishlist,
    addToCart,
    showToast,
  } = useCart();

  const [products, setProducts] = useState<ExtendedProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFavoritesOpen) {
      setLoading(true);
      getProducts()
        .then((all) => {
          setProducts(all);
        })
        .finally(() => setLoading(false));
    }
  }, [isFavoritesOpen]);

  if (!isFavoritesOpen) return null;

  // Filter products matching the wishlist IDs
  const favoriteProducts = products.filter((p) => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    favoriteProducts.forEach((item) => {
      addToCart(item, 1);
    });
    showToast(`Added ${favoriteProducts.length} favorites to your cart!`);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsFavoritesOpen(false)}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(12, 35, 64, 0.6)',
          backdropFilter: 'blur(4px)',
          animation: 'fadeIn 0.25s',
        }}
      />

      {/* Slide-out Drawer */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          backgroundColor: '#ffffff',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.25)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 101,
          animation: 'slideRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#faf8f5',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(180, 126, 0, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#b47e00',
              }}
            >
              <Heart size={18} style={{ fill: '#b47e00' }} />
            </div>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#0c2340',
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                My Favorites
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0' }}>
                {wishlist.length} saved keepsake{wishlist.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsFavoritesOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s',
            }}
            aria-label="Close favorites"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
          }}
        >
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
              <p>Loading your saved keepsakes...</p>
            </div>
          ) : favoriteProducts.length === 0 ? (
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '40px 16px',
              }}
            >
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  backgroundColor: '#faf8f5',
                  border: '1px solid #ebd9c0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#b47e00',
                  marginBottom: '20px',
                }}
              >
                <Heart size={32} />
              </div>
              <h4
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.35rem',
                  color: '#0c2340',
                  marginBottom: '8px',
                }}
              >
                Your favorites list is empty
              </h4>
              <p
                style={{
                  fontSize: '0.88rem',
                  lineHeight: 1.6,
                  color: '#64748b',
                  maxWidth: '300px',
                  marginBottom: '28px',
                }}
              >
                Tap the heart icon on any keepsake in our catalogue to save your favorite Canadian &amp; American treasures.
              </p>
              <Link
                href="/products"
                onClick={() => setIsFavoritesOpen(false)}
                style={{
                  backgroundColor: '#0c2340',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  padding: '12px 24px',
                  borderRadius: '2px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>Discover Keepsakes</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {favoriteProducts.map((product) => {
                const img = product.images?.[0] || '/images/heirloom-packaging.jpg';
                return (
                  <div
                    key={product.id}
                    style={{
                      display: 'flex',
                      gap: '14px',
                      padding: '14px',
                      borderRadius: '4px',
                      border: '1px solid #e2e8f0',
                      backgroundColor: '#ffffff',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: '70px',
                        height: '70px',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        backgroundColor: '#faf8f5',
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={img}
                        alt={product.name}
                        fill
                        sizes="70px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Link
                        href={`/products/${product.slug}`}
                        onClick={() => setIsFavoritesOpen(false)}
                        style={{
                          fontSize: '0.86rem',
                          fontWeight: 600,
                          color: '#0c2340',
                          textDecoration: 'none',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          lineHeight: 1.35,
                          marginBottom: '4px',
                        }}
                      >
                        {product.name}
                      </Link>
                      <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#b47e00', margin: '0 0 8px' }}>
                        ${product.price.toFixed(2)} CAD
                      </p>

                      <button
                        onClick={() => {
                          addToCart(product, 1);
                          showToast(`Added "${product.name}" to cart`);
                        }}
                        style={{
                          backgroundColor: '#0c2340',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '2px',
                          padding: '6px 12px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <ShoppingBag size={12} style={{ color: '#dda82e' }} />
                        <span>Move to Cart</span>
                      </button>
                    </div>

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        padding: '6px',
                        borderRadius: '4px',
                        transition: 'color 0.2s',
                      }}
                      title="Remove from favorites"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer actions */}
        {favoriteProducts.length > 0 && (
          <div
            style={{
              padding: '18px 24px',
              borderTop: '1px solid #e2e8f0',
              backgroundColor: '#faf8f5',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <button
              onClick={handleAddAllToCart}
              style={{
                backgroundColor: '#b47e00',
                color: '#ffffff',
                border: 'none',
                borderRadius: '2px',
                padding: '12px 20px',
                fontSize: '0.82rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'background-color 0.2s',
              }}
            >
              <ShoppingBag size={16} />
              <span>Add All to Cart</span>
            </button>

            <button
              onClick={clearWishlist}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748b',
                fontSize: '0.75rem',
                textDecoration: 'underline',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              Clear all favorites
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
