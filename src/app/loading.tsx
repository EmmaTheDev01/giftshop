import React from 'react';
import { Skeleton, ProductGridSkeleton } from '@/components/Skeleton';

export default function RootLoading() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Banner Shimmer Placeholder */}
      <div
        style={{
          backgroundColor: '#0c2340',
          minHeight: '440px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 20px',
          borderBottom: '3px solid #b47e00',
        }}
      >
        <div style={{ maxWidth: '800px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <Skeleton width="180px" height="22px" borderRadius={20} dark />
          <Skeleton width="85%" height="42px" borderRadius={4} dark />
          <Skeleton width="60%" height="42px" borderRadius={4} dark />
          <Skeleton width="70%" height="18px" borderRadius={3} dark style={{ marginTop: '8px' }} />
          <div style={{ display: 'flex', gap: '14px', marginTop: '16px' }}>
            <Skeleton width="160px" height="46px" borderRadius={4} dark />
            <Skeleton width="160px" height="46px" borderRadius={4} dark />
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container-custom" style={{ padding: '60px 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
          <Skeleton width="120px" height="14px" />
          <Skeleton width="340px" height="32px" />
          <Skeleton width="100px" height="4px" />
        </div>

        <ProductGridSkeleton count={8} />
      </div>
    </div>
  );
}
