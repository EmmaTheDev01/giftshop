import React from 'react';

interface DiamondSeparatorProps {
  className?: string;
  variant?: 'line' | 'points' | 'dl';
  color?: string;
}

export default function DiamondSeparator({ className = '', variant = 'line', color = '#B47E00' }: DiamondSeparatorProps) {
  if (variant === 'points') {
    return (
      <div className={`diamond-points ${className}`} aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', margin: '20px 0' }}>
        <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 2L2 0L4 2L2 4L0 2Z" fill="#B47E00" />
        </svg>
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 4L4 0L8 4L4 8L0 4Z" fill="#B47E00" />
        </svg>
        <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 2L2 0L4 2L2 4L0 2Z" fill="#B47E00" />
        </svg>
      </div>
    );
  }

  if (variant === 'dl') {
    return (
      <div
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '320px',
          margin: '20px auto',
        }}
        aria-hidden="true"
      >
        <span style={{ flex: 1, height: '1px', backgroundColor: '#B47E00' }} />
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ margin: '0 20px', flexShrink: 0 }}>
          <path d="M8 1L15 8L8 15L1 8L8 1Z" stroke="#B47E00" strokeWidth="1.5" />
        </svg>
        <span style={{ flex: 1, height: '1px', backgroundColor: '#B47E00' }} />
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        margin: '20px 0',
      }}
      aria-hidden="true"
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 2L2 0L4 2L2 4L0 2Z" fill="#B47E00" />
        </svg>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 4L4 0L8 4L4 8L0 4Z" fill="#B47E00" />
        </svg>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 2L2 0L4 2L2 4L0 2Z" fill="#B47E00" />
        </svg>
      </div>
    </div>
  );
}
