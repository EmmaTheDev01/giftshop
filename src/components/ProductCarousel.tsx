'use client';

import React, { useState, useRef } from 'react';
import ProductCard from './ProductCard';
import DiamondSeparator from './DiamondSeparator';
import { PRODUCTS } from '@/data/mockData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductCarousel() {
  const [filter, setFilter] = useState('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'All Keepsakes' },
    { id: 'miniature', label: 'Miniatures' },
    { id: 'snow globe', label: 'Snow Globes' },
    { id: 'decorative products', label: 'Medals & Decor' },
    { id: 'gourmet', label: 'Gourmet & Delicacies' },
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    if (filter === 'all') return true;
    return p.category_name?.toLowerCase().includes(filter);
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section style={{ padding: '72px 0 84px', backgroundColor: '#ffffff' }}>
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
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
            Signature Souvenirs
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
            Take home a signature Gift Shop keepsake
          </h2>
          <DiamondSeparator variant="points" />

          {/* Filter Tabs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              marginTop: '16px',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                style={{
                  padding: '7px 18px',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  transition: 'all 0.2s',
                  border: filter === cat.id ? '1px solid #0c2340' : '1px solid #e2e8f0',
                  backgroundColor: filter === cat.id ? '#0c2340' : '#faf8f5',
                  color: filter === cat.id ? '#ffffff' : '#475569',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Container */}
        <div style={{ position: 'relative' }}>
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            style={{
              position: 'absolute',
              left: '-20px',
              top: '40%',
              transform: 'translateY(-50%)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 16px rgba(12, 35, 64, 0.12)',
              border: '1px solid #e8e2d8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0c2340',
              zIndex: 20,
              cursor: 'pointer',
              transition: 'background-color 0.2s, transform 0.2s',
            }}
            className="carousel-nav-btn"
            aria-label="Previous products"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Scrollable Products Row */}
          <div
            ref={scrollContainerRef}
            style={{
              display: 'flex',
              gap: '24px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              paddingBottom: '20px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  flex: '0 0 280px',
                  scrollSnapAlign: 'start',
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            style={{
              position: 'absolute',
              right: '-20px',
              top: '40%',
              transform: 'translateY(-50%)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 16px rgba(12, 35, 64, 0.12)',
              border: '1px solid #e8e2d8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0c2340',
              zIndex: 20,
              cursor: 'pointer',
              transition: 'background-color 0.2s, transform 0.2s',
            }}
            className="carousel-nav-btn"
            aria-label="Next products"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
