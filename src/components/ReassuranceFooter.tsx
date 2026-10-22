'use client';

import React, { useState } from 'react';
import DiamondSeparator from './DiamondSeparator';
import { useCart } from '@/context/CartContext';
import { RotateCcw, Truck, CreditCard, Send, CheckCircle2 } from 'lucide-react';

export default function ReassuranceFooter() {
  const { showToast } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast('Thank you for subscribing to the official newsletter! ✉️');
    setEmail('');
  };

  return (
    <section style={{ backgroundColor: '#ffffff', paddingTop: '64px', borderTop: '1px solid #ebd9c0' }}>
      <div className="container-custom">
        {/* Diamond Separator */}
        <DiamondSeparator />

        {/* 1. Reassurance Guarantee Items */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: '32px',
            textAlign: 'center',
            padding: '28px 0 44px',
          }}
        >
          {/* Guarantee 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'rgba(180, 126, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#b47e00',
                marginBottom: '12px',
              }}
            >
              <RotateCcw size={22} />
            </div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1rem, 1.2vw, 1.15rem)', fontWeight: 600, color: '#0c2340', marginBottom: '4px' }}>
              Satisfaction Guarantee
            </h4>
            <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
              Your style. Made for you.
            </p>
          </div>

          {/* Guarantee 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'rgba(180, 126, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#b47e00',
                marginBottom: '12px',
              }}
            >
              <Truck size={22} />
            </div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1rem, 1.2vw, 1.15rem)', fontWeight: 600, color: '#0c2340', marginBottom: '4px' }}>
              Canadian &amp; Global Delivery
            </h4>
            <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
              Express dispatch within 1-2 days
            </p>
          </div>

          {/* Guarantee 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'rgba(180, 126, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#b47e00',
                marginBottom: '12px',
              }}
            >
              <CreditCard size={22} />
            </div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1rem, 1.2vw, 1.15rem)', fontWeight: 600, color: '#0c2340', marginBottom: '4px' }}>
              Secure Checkout
            </h4>
            <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
              Interac, Visa, Mastercard, Apple Pay
            </p>
          </div>
        </div>

        {/* Diamond Separator */}
        <DiamondSeparator />

        {/* 2. Official Newsletter Box */}
        <div
          style={{
            maxWidth: '680px',
            margin: '20px auto 72px',
            textAlign: 'center',
            backgroundColor: '#faf8f5',
            padding: '40px 24px',
            borderRadius: '4px',
            border: '1px solid #ebd9c0',
            boxShadow: '0 8px 24px rgba(12, 35, 64, 0.04)',
          }}
        >
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#b47e00',
              marginBottom: '6px',
              display: 'block',
            }}
          >
            Exclusive Letters
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.35rem, 2vw, 1.75rem)',
              fontWeight: 500,
              color: '#0c2340',
              marginBottom: '8px',
            }}
          >
            Keep in touch with The Memoriq
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '22px' }}>
            Receive exclusive artisan releases, seasonal collections, and Canadian subscriber privileges.
          </p>

          {subscribed ? (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#f0fdf4',
                color: '#166534',
                padding: '12px 24px',
                borderRadius: '4px',
                border: '1px solid #bbf7d0',
                fontSize: '0.88rem',
                fontWeight: 600,
              }}
            >
              <CheckCircle2 size={18} />
              <span>You are successfully subscribed to the official newsletter!</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                gap: '10px',
                maxWidth: '520px',
                margin: '0 auto',
                flexWrap: 'wrap',
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                required
                style={{
                  flex: 1,
                  minWidth: '240px',
                  padding: '14px 18px',
                  borderRadius: '2px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                }}
              />
              <button
                type="submit"
                className="btn-primary"
                style={{
                  padding: '14px 28px',
                  fontSize: '0.82rem',
                }}
              >
                <span>Register now</span>
                <Send size={14} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
