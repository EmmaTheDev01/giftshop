'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ExtendedProduct } from '@/types/supabase';

export interface CartItemType {
  product: ExtendedProduct;
  quantity: number;
}

interface CartContextType {
  cart: CartItemType[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: ExtendedProduct, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  clearWishlist: () => void;
  resetCartAndWishlist: () => void;
  quickViewProduct: ExtendedProduct | null;
  setQuickViewProduct: (product: ExtendedProduct | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Reset by default: starts strictly empty
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<ExtendedProduct | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Clear any residual browser storage on mount to guarantee default empty state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('memoriq_cart');
        localStorage.removeItem('memoriq_wishlist');
        localStorage.removeItem('giftshop_cart');
        localStorage.removeItem('giftshop_wishlist');
      } catch {}

      const handleCartReset = () => {
        setCart([]);
        setWishlist([]);
      };

      window.addEventListener('cart_reset', handleCartReset);
      return () => window.removeEventListener('cart_reset', handleCartReset);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (product: ExtendedProduct, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to your cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const clearWishlist = () => setWishlist([]);

  const resetCartAndWishlist = () => {
    setCart([]);
    setWishlist([]);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('memoriq_cart');
        localStorage.removeItem('memoriq_wishlist');
      } catch {}
    }
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to your wishlist ❤️');
        return [...prev, productId];
      }
    });
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        clearWishlist,
        resetCartAndWishlist,
        quickViewProduct,
        setQuickViewProduct,
        isSearchOpen,
        setIsSearchOpen,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
