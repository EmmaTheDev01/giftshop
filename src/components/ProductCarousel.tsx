'use client';

import React, { useState, useRef, useEffect } from 'react';
import ProductCard from './ProductCard';
import DiamondSeparator from './DiamondSeparator';
import { getProducts } from '@/lib/api';
import { ExtendedProduct } from '@/types/supabase';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

export default function ProductCarousel() {
  const [products, setProducts] = useState<ExtendedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Error loading carousel products:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredProducts = products;

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
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
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
            Handcrafted Canadian Treasures
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
            Take home an authentic Memoriq keepsake
          </h2>
          <DiamondSeparator variant="points" />
        </div>

        {/* Carousel Container */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
            <Loader2 size={32} className="animate-spin" style={{ color: '#b47e00' }} />
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
}
