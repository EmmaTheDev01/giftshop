import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AccountSkeleton } from '@/components/Skeleton';

export default function AccountLoading() {
  return (
    <div style={{ backgroundColor: '#faf8f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <AccountSkeleton />
      </main>
      <Footer />
    </div>
  );
}
