import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Skeleton, ProductGridSkeleton } from '@/components/Skeleton';

export default function CollectionLoading() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <section
          style={{
            backgroundColor: '#0c2340',
            padding: '50px 20px 44px',
            textAlign: 'center',
            borderBottom: '3px solid #b47e00',
          }}
        >
          <div className="container-custom" style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <Skeleton width="140px" height="22px" borderRadius={20} dark />
            <Skeleton width="340px" height="36px" borderRadius={4} dark />
            <Skeleton width="480px" height="16px" borderRadius={3} dark />
          </div>
        </section>

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
