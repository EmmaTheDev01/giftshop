import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Skeleton, ProductGridSkeleton } from '@/components/Skeleton';

export default function CategoryLoading() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1 }}>
        {/* Department Banner Skeleton */}
        <section
          style={{
            backgroundColor: '#0c2340',
            padding: '50px 20px 44px',
            textAlign: 'center',
            borderBottom: '3px solid #b47e00',
          }}
        >
          <div className="container-custom" style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Skeleton width="50px" height="12px" dark />
              <span style={{ color: '#475569' }}>/</span>
              <Skeleton width="100px" height="12px" dark />
            </div>

            <Skeleton width="160px" height="22px" borderRadius={20} dark />
            <Skeleton width="360px" height="36px" borderRadius={4} dark />
            <Skeleton width="480px" height="16px" borderRadius={3} dark />

            {/* Subcategory Pills Skeleton */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Skeleton width="90px" height="30px" borderRadius={20} dark />
              <Skeleton width="110px" height="30px" borderRadius={20} dark />
              <Skeleton width="100px" height="30px" borderRadius={20} dark />
              <Skeleton width="95px" height="30px" borderRadius={20} dark />
            </div>
          </div>
        </section>

        {/* Product Grid Skeleton */}
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
