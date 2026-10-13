'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { SITE_CONFIG } from '@/config/site';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = SITE_CONFIG.freeShippingThreshold;
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(12, 35, 64, 0.6)',
          backdropFilter: 'blur(4px)',
          animation: 'fadeIn 0.25s',
        }}
      />

      {/* Slide-out Drawer */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          backgroundColor: '#ffffff',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.25)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 101,
          animation: 'slideRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#faf8f5',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} style={{ color: '#b47e00' }} />
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.45rem',
                fontWeight: 600,
                color: '#0c2340',
              }}
            >
              Your Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              padding: '6px',
              color: '#64748b',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div style={{ padding: '16px 24px', backgroundColor: '#fdfbf7', borderBottom: '1px solid #f1f5f9' }}>
          <p style={{ fontSize: '0.8rem', color: '#0c2340', marginBottom: '8px', fontWeight: 500 }}>
            {remainingForFreeShipping === 0 ? (
              <span style={{ color: '#166534', fontWeight: 700 }}>
                🎉 You qualified for FREE Canadian delivery!
              </span>
            ) : (
              <>
                Add <strong style={{ color: '#b47e00' }}>${remainingForFreeShipping.toFixed(2)} CAD</strong> more to get <strong>Free Canadian Shipping 🇨🇦</strong>!
              </>
            )}
          </p>
          <div style={{ width: '100%', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                backgroundColor: '#b47e00',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 20px', color: '#64748b' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#faf8f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: '#b47e00',
                }}
              >
                <ShoppingBag size={28} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#0c2340', marginBottom: '6px' }}>
                Your cart is empty
              </h4>
              <p style={{ fontSize: '0.85rem', marginBottom: '24px' }}>
                Discover curated Canadian gift boxes and artisan keepsakes.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-primary"
                style={{ padding: '12px 24px', fontSize: '0.8rem' }}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid #f1f5f9',
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      position: 'relative',
                      width: '74px',
                      height: '92px',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      backgroundColor: '#faf8f5',
                      border: '1px solid #e2e8f0',
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="74px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  {/* Info & Quantity */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                        <h4
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '0.98rem',
                            fontWeight: 600,
                            color: '#0c2340',
                            lineHeight: 1.3,
                          }}
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          style={{ color: '#94a3b8', padding: '2px', cursor: 'pointer' }}
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <p style={{ fontSize: '0.74rem', color: '#b47e00', fontWeight: 600, marginTop: '2px' }}>
                        ${item.product.price.toFixed(2)} CAD
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                      {/* Quantity Controller */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid #cbd5e1',
                          borderRadius: '2px',
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          style={{ padding: '4px 8px', color: '#0c2340' }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, padding: '0 8px' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          style={{ padding: '4px 8px', color: '#0c2340' }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0c2340' }}>
                        ${(item.product.price * item.quantity).toFixed(2)} CAD
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '20px 24px',
              borderTop: '1px solid #e2e8f0',
              backgroundColor: '#faf8f5',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: '#64748b' }}>
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)} CAD</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', fontSize: '0.85rem', color: '#64748b' }}>
              <span>Shipping</span>
              <span>{remainingForFreeShipping === 0 ? 'FREE' : 'Calculated at checkout'}</span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '20px',
                paddingTop: '10px',
                borderTop: '1px solid #e2e8f0',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#0c2340',
              }}
            >
              <span>Total (incl. tax)</span>
              <span>${cartTotal.toFixed(2)} CAD</span>
            </div>

            <button
              onClick={() => {
                alert(`Proceeding to checkout with ${cart.reduce((a, b) => a + b.quantity, 0)} item(s) totaling $${cartTotal.toFixed(2)} CAD`);
              }}
              className="btn-gold"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '0.9rem',
                marginBottom: '10px',
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => setIsCartOpen(false)}
              className="btn-secondary"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '0.78rem',
              }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
