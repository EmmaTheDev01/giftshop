'use client';

import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import FavoritesDrawer from '@/components/FavoritesDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import SearchModal from '@/components/SearchModal';
import ToastNotification from '@/components/ToastNotification';
import CookieConsent from '@/components/CookieConsent';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <CartDrawer />
        <FavoritesDrawer />
        <QuickViewModal />
        <SearchModal />
        <ToastNotification />
        <CookieConsent />
      </CartProvider>
    </AuthProvider>
  );
}
