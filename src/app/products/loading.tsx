import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Skeleton, ProductGridSkeleton } from '@/components/Skeleton';

export default function ProductsLoading() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1 }}>
        {/* Navy Header Strip Skeleton */}
        <section
          style={{
            backgroundColor: '#0c2340',
            padding: '54px 20px 48px',
            textAlign: 'center',
            borderBottom: '3px solid #b47e00',
          }}
        >
          <div className="container-custom" style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Skeleton width="50px" height="12px" dark />
              <span style={{ color: '#475569' }}>/</span>
              <Skeleton width="90px" height="12px" dark />
            </div>

            <Skeleton width="220px" height="24px" borderRadius={20} dark />
            <Skeleton width="420px" height="38px" borderRadius={4} dark />
            <Skeleton width="520px" height="16px" borderRadius={3} dark />
          </div>
        </section>

        {/* Filter Bar Skeleton */}
        <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #ebd9c0', padding: '16px 20px' }}>
          <div className="container-custom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Skeleton width="80px" height="32px" borderRadius={20} />
              <Skeleton width="80px" height="32px" borderRadius={20} />
              <Skeleton width="80px" height="32px" borderRadius={20} />
              <Skeleton width="80px" height="32px" borderRadius={20} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Skeleton width="180px" height="36px" borderRadius={4} />
              <Skeleton width="140px" height="36px" borderRadius={4} />
            </div>
          </div>
        </div>

        {/* Products Grid Skeleton */}
        <section style={{ padding: '48px 20px 80px' }}>
          <div className="container-custom">
            <ProductGridSkeleton count={8} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
