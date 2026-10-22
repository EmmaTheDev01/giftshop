import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ProductDetailSkeleton } from '@/components/Skeleton';

export default function ProductPageLoading() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <ProductDetailSkeleton />
      </main>
      <Footer />
    </div>
  );
}
