'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default function ToastNotification() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <aside
      aria-label="Notification"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        backgroundColor: '#0c2340',
        color: '#ffffff',
        border: '1px solid #b47e00',
        borderRadius: '4px',
        padding: '14px 20px',
        boxShadow: '0 12px 36px rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 200,
        fontSize: '0.88rem',
        fontWeight: 500,
        animation: 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        maxWidth: '380px',
      }}
    >
      <div
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          backgroundColor: 'rgba(180, 126, 0, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#dda82e',
          flexShrink: 0,
        }}
      >
        <ShoppingBag size={16} />
      </div>
      <span>{toastMessage}</span>
    </aside>
  );
}
