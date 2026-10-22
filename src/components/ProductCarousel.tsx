'use client';

import React, { useState, useRef, useEffect } from 'react';
import ProductCard from './ProductCard';
import DiamondSeparator from './DiamondSeparator';
import { getProducts } from '@/lib/api';
import { ExtendedProduct } from '@/types/supabase';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCarouselSkeleton } from '@/components/Skeleton';

export default function ProductCarousel() {
  const [products, setProducts] = useState<ExtendedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
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
      const scrollAmount = direction === 'left' ? -304 : 304;
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

      if (direction === 'right' && scrollLeft + clientWidth >= scrollWidth - 25) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else if (direction === 'left' && scrollLeft <= 15) {
        scrollContainerRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Auto-scroll animation: advances right every 3.2s, loops seamlessly, pauses on user interaction
  useEffect(() => {
    if (loading || isPaused || products.length === 0) return;

    const timer = setInterval(() => {
      scroll('right');
    }, 3200);

    return () => clearInterval(timer);
  }, [loading, isPaused, products.length]);

  return (
    <section style={{ padding: '72px 0 84px', backgroundColor: '#ffffff' }}>
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <p
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#b47e00',
              marginBottom: '6px',
            }}
          >
            HANDCRAFTED CANADIAN TREASURES
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
            Gifts Worth Keeping and Giving
          </h2>
          <DiamondSeparator variant="points" />
        </div>

        {/* Carousel Container */}
        {loading ? (
          <ProductCarouselSkeleton count={4} />
        ) : (
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* Left Arrow */}
            <button
              onClick={() => {
                setIsPaused(true);
                scroll('left');
                setTimeout(() => setIsPaused(false), 4000);
              }}
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

            {/* Scrollable Products Row (Responsive 2x2 on Mobile, 1 Row on Desktop) */}
            <div
              ref={scrollContainerRef}
              className="product-carousel-track"
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="product-carousel-card-wrap"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => {
                setIsPaused(true);
                scroll('right');
                setTimeout(() => setIsPaused(false), 4000);
              }}
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
