'use client';

import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  circle?: boolean;
  dark?: boolean;
}

/**
 * Base Shimmer Skeleton primitive
 */
export function Skeleton({
  width = '100%',
  height = '1rem',
  borderRadius = '4px',
  circle = false,
  dark = false,
  className = '',
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={`${dark ? 'skeleton-shimmer-dark' : 'skeleton-shimmer'} skeleton-box ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: circle ? '50%' : typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
        flexShrink: 0,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

/**
 * Skeleton matching the exact dimensions of ProductCard.tsx
 */
export function ProductCardSkeleton() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderRadius: '4px',
        overflow: 'hidden',
        border: '1px solid #ebd9c0',
        boxShadow: '0 2px 8px rgba(12, 35, 64, 0.04)',
      }}
    >
      {/* 4:5 Aspect Ratio Image Placeholder */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 5',
          backgroundColor: '#faf8f5',
          overflow: 'hidden',
          padding: '12px',
        }}
      >
        <Skeleton width="100%" height="100%" borderRadius={2} />
        {/* Floating badge skeleton */}
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <Skeleton width="72px" height="20px" borderRadius={2} />
        </div>
        {/* Favorite heart icon skeleton */}
        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
          <Skeleton width="32px" height="32px" circle />
        </div>
      </div>

      {/* Product Content Details */}
      <div style={{ padding: '16px 14px 18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Brand Studio Tag */}
        <Skeleton width="45%" height="11px" borderRadius={2} />

        {/* Product Title (2 Lines) */}
        <Skeleton width="92%" height="15px" borderRadius={2} />
        <Skeleton width="68%" height="15px" borderRadius={2} />

        {/* Rating and Reviews */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
          <Skeleton width="70px" height="12px" borderRadius={2} />
          <Skeleton width="30px" height="12px" borderRadius={2} />
        </div>

        {/* Price & Currency */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
          <Skeleton width="85px" height="18px" borderRadius={2} />
          <Skeleton width="45px" height="13px" borderRadius={2} />
        </div>

        {/* Quick Add Button placeholder */}
        <div style={{ marginTop: '6px' }}>
          <Skeleton width="100%" height="34px" borderRadius={3} />
        </div>
      </div>
    </div>
  );
}

/**
 * Responsive Grid of ProductCardSkeletons
 */
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))',
        gap: '24px',
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={`grid-skel-${i}`} />
      ))}
    </div>
  );
}

/**
 * Skeleton for the Homepage Product Carousel
 */
export function ProductCarouselSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="product-carousel-track" style={{ overflowX: 'hidden' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={`carousel-skel-${i}`} className="product-carousel-card-wrap">
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
  );
}

/**
 * Complete Product Detail Page Skeleton (for /products/[slug])
 */
export function ProductDetailSkeleton() {
  return (
    <div style={{ paddingBottom: '70px', backgroundColor: '#ffffff' }}>
      {/* 1. Breadcrumbs Bar */}
      <div
        style={{
          backgroundColor: '#faf8f5',
          borderBottom: '1px solid #ebd9c0',
          padding: '14px 20px',
        }}
      >
        <div className="container-custom" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Skeleton width="50px" height="13px" />
          <span style={{ color: '#cbd5e1' }}>/</span>
          <Skeleton width="80px" height="13px" />
          <span style={{ color: '#cbd5e1' }}>/</span>
          <Skeleton width="160px" height="13px" />
        </div>
      </div>

      {/* 2. Main Product Hero */}
      <div className="container-custom" style={{ paddingTop: '40px', paddingBottom: '50px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Visual Gallery */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Primary Main Image */}
            <div
              style={{
                width: '100%',
                aspectRatio: '1 / 1.1',
                borderRadius: '4px',
                overflow: 'hidden',
                border: '1px solid #ebd9c0',
                backgroundColor: '#faf8f5',
              }}
            >
              <Skeleton width="100%" height="100%" />
            </div>

            {/* Thumbnail Strip */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={`thumb-skel-${i}`}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <Skeleton width="100%" height="100%" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Product Information & Purchase Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Badge & Artisan Studio */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Skeleton width="100px" height="22px" borderRadius={2} />
              <Skeleton width="140px" height="14px" borderRadius={2} />
            </div>

            {/* Title (2 lines) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Skeleton width="95%" height="28px" borderRadius={4} />
              <Skeleton width="70%" height="28px" borderRadius={4} />
            </div>

            {/* Rating & SKU */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Skeleton width="110px" height="16px" borderRadius={2} />
              <Skeleton width="90px" height="14px" borderRadius={2} />
            </div>

            {/* Price Block */}
            <div
              style={{
                backgroundColor: '#faf8f5',
                border: '1px solid #ebd9c0',
                borderRadius: '6px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'baseline',
                gap: '12px',
              }}
            >
              <Skeleton width="120px" height="32px" borderRadius={4} />
              <Skeleton width="70px" height="18px" borderRadius={2} />
              <Skeleton width="60px" height="14px" borderRadius={2} />
            </div>

            {/* Short Description */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <Skeleton width="100%" height="14px" />
              <Skeleton width="92%" height="14px" />
              <Skeleton width="80%" height="14px" />
            </div>

            {/* Value Guarantees row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', margin: '8px 0' }}>
              <Skeleton width="100%" height="46px" borderRadius={4} />
              <Skeleton width="100%" height="46px" borderRadius={4} />
              <Skeleton width="100%" height="46px" borderRadius={4} />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginTop: '10px' }}>
              <Skeleton width="110px" height="48px" borderRadius={4} />
              <Skeleton width="100%" height="48px" borderRadius={4} />
            </div>
            <Skeleton width="100%" height="48px" borderRadius={4} />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for Customer Account Dashboard (/account & /my-account)
 */
export function AccountSkeleton() {
  return (
    <div style={{ backgroundColor: '#faf8f5', minHeight: '100vh', padding: '36px 16px 72px' }}>
      <div className="container-custom" style={{ maxWidth: '980px', margin: '0 auto' }}>
        {/* Profile Card Header */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            padding: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '24px',
            boxShadow: '0 4px 16px rgba(12, 35, 64, 0.05)',
          }}
        >
          <Skeleton width="68px" height="68px" circle />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Skeleton width="220px" height="24px" borderRadius={4} />
            <Skeleton width="180px" height="14px" borderRadius={2} />
          </div>
          <Skeleton width="110px" height="38px" borderRadius={4} />
        </div>

        {/* Tab Strip */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <Skeleton width="120px" height="40px" borderRadius={6} />
          <Skeleton width="120px" height="40px" borderRadius={6} />
          <Skeleton width="120px" height="40px" borderRadius={6} />
        </div>

        {/* Orders Card Skeletons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`order-skel-${i}`}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Skeleton width="160px" height="18px" />
                <Skeleton width="90px" height="24px" borderRadius={12} />
              </div>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <Skeleton width="54px" height="54px" borderRadius={4} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <Skeleton width="60%" height="15px" />
                  <Skeleton width="30%" height="13px" />
                </div>
                <Skeleton width="80px" height="20px" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for Admin Dashboard (/admin)
 */
export function AdminSkeleton() {
  return (
    <div style={{ backgroundColor: '#071626', minHeight: '100vh', padding: '30px 24px 80px', color: '#ffffff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Admin Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Skeleton width="260px" height="30px" dark />
            <Skeleton width="180px" height="14px" dark />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Skeleton width="120px" height="38px" borderRadius={6} dark />
            <Skeleton width="140px" height="38px" borderRadius={6} dark />
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`admin-stat-${i}`}
              style={{
                backgroundColor: '#0c2340',
                border: '1px solid rgba(221, 168, 46, 0.25)',
                borderRadius: '8px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Skeleton width="100px" height="14px" dark />
                <Skeleton width="32px" height="32px" borderRadius={6} dark />
              </div>
              <Skeleton width="140px" height="28px" dark />
              <Skeleton width="80px" height="12px" dark />
            </div>
          ))}
        </div>

        {/* Large Table Skeleton */}
        <div
          style={{
            backgroundColor: '#0c2340',
            border: '1px solid rgba(221, 168, 46, 0.2)',
            borderRadius: '8px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Skeleton width="180px" height="20px" dark />
            <Skeleton width="100px" height="32px" borderRadius={4} dark />
          </div>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`row-skel-${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <Skeleton width="44px" height="44px" borderRadius={4} dark />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <Skeleton width="40%" height="15px" dark />
                <Skeleton width="20%" height="12px" dark />
              </div>
              <Skeleton width="90px" height="16px" dark />
              <Skeleton width="70px" height="22px" borderRadius={12} dark />
              <Skeleton width="60px" height="28px" borderRadius={4} dark />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
