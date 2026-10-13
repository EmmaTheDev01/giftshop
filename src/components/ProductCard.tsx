'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExtendedProduct } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { Eye, Heart, ShoppingBag, Check } from 'lucide-react';

export default function ProductCard({ product }: { product: ExtendedProduct }) {
  const { addToCart, toggleWishlist, wishlist, setQuickViewProduct } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isFavorite = wishlist.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const mainImage = product.images[0] || 'https://shop.toureiffel.paris/879-medium_default/eiffel-tower-bronze-19-cm-signature-collection.jpg';

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        position: 'relative',
        transition: 'all 0.25s ease',
      }}
      className="group"
    >
      {/* 1. Image Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 5',
          backgroundColor: '#faf7f2',
          overflow: 'hidden',
          borderRadius: '2px',
          border: '1px solid #eee8df',
        }}
      >
        <Link href={`/products/${product.slug}`} style={{ display: 'block', width: '100%', height: '100%' }}>
          <Image
            src={mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            style={{
              objectFit: 'cover',
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: isHovered ? 'scale(1.06)' : 'scale(1)',
            }}
            priority={false}
          />
        </Link>

        {/* Badges */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexDirection: 'column', gap: '4px', zIndex: 10 }}>
          {product.badge && (
            <span
              style={{
                backgroundColor: '#0c2340',
                color: '#ffffff',
                fontSize: '0.62rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                padding: '4px 8px',
                borderRadius: '1px',
              }}
            >
              {product.badge}
            </span>
          )}
          {product.is_limited_edition && (
            <span
              style={{
                backgroundColor: '#b47e00',
                color: '#ffffff',
                fontSize: '0.62rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                padding: '4px 8px',
                borderRadius: '1px',
              }}
            >
              Limited
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'transform 0.2s, background-color 0.2s',
          }}
          aria-label="Add to wishlist"
        >
          <Heart
            size={16}
            style={{
              color: isFavorite ? '#b47e00' : '#475569',
              fill: isFavorite ? '#b47e00' : 'none',
              transition: 'fill 0.2s, color 0.2s',
            }}
          />
        </button>

        {/* Quick View Button on Hover */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            right: '12px',
            zIndex: 10,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'all 0.25s ease-out',
            display: 'flex',
            gap: '8px',
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            style={{
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.96)',
              color: '#0c2340',
              backdropFilter: 'blur(4px)',
              padding: '9px 12px',
              borderRadius: '2px',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              border: '1px solid rgba(12, 35, 64, 0.1)',
            }}
          >
            <Eye size={14} />
            <span>Quick view</span>
          </button>

          <button
            onClick={handleAddToCart}
            style={{
              backgroundColor: justAdded ? '#15803d' : '#0c2340',
              color: '#ffffff',
              width: '38px',
              height: '38px',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transition: 'background-color 0.2s',
            }}
            aria-label="Add to cart"
          >
            {justAdded ? <Check size={16} /> : <ShoppingBag size={15} style={{ color: '#dda82e' }} />}
          </button>
        </div>
      </div>

      {/* 2. Product Meta Content */}
      <div style={{ paddingTop: '14px', textAlign: 'left' }}>
        <p
          style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#b47e00',
            marginBottom: '4px',
          }}
        >
          {product.category_name || 'Official Souvenir'}
        </p>

        <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none' }}>
          <h4
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.05rem',
              fontWeight: 600,
              lineHeight: 1.3,
              color: '#0c2340',
              marginBottom: '6px',
              minHeight: '2.6em',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            {product.name}
          </h4>
        </Link>

        {/* Price Lockup */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.02rem',
              fontWeight: 700,
              color: '#0c2340',
            }}
          >
            ${product.price.toFixed(2)} CAD
          </span>
          {product.original_price && (
            <span
              style={{
                fontSize: '0.82rem',
                color: '#94a3b8',
                textDecoration: 'line-through',
              }}
            >
              ${product.original_price.toFixed(2)} CAD
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
