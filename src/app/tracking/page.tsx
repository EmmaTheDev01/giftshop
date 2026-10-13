'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DiamondSeparator from '@/components/DiamondSeparator';
import { SITE_CONFIG } from '@/config/site';
import { Package, Search, Truck, CheckCircle2, Clock, MapPin, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function GuestTrackingPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 700);
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      {/* Hero Header */}
      <section
        style={{
          backgroundColor: '#0c2340',
          color: '#ffffff',
          padding: '64px 20px 54px',
          borderBottom: '2px solid #b47e00',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div className="container-custom" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#dda82e',
              display: 'inline-block',
              marginBottom: '10px',
            }}
          >
            Canadian Order Telemetry
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 600,
              marginBottom: '14px',
            }}
          >
            Guest Order Tracking
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto' }}>
            Follow your handcrafted Canadian keepsakes and artisan deliveries in real-time with our live carrier tracking system.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '54px 20px 72px' }}>
        <div className="container-custom" style={{ maxWidth: '840px', margin: '0 auto' }}>
          {/* Tracking Form Card */}
          <div
            style={{
              backgroundColor: '#faf8f5',
              border: '1px solid #ebd9c0',
              borderRadius: '6px',
              padding: '36px 32px',
              boxShadow: '0 8px 30px rgba(12, 35, 64, 0.05)',
              marginBottom: '48px',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.45rem',
                color: '#0c2340',
                marginBottom: '10px',
                fontWeight: 600,
              }}
            >
              Lookup Your Shipment
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
              Enter the unique Order Number from your confirmation email (e.g. <code>CA-849201</code>) and your Canadian delivery postal code.
            </p>

            <form onSubmit={handleSearch} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0c2340', marginBottom: '6px' }}>
                  Order Number or Tracking ID *
                </label>
                <div style={{ position: 'relative' }}>
                  <Package size={18} style={{ position: 'absolute', left: '12px', top: '13px', color: '#94a3b8' }} />
                  <input
                    type="text"
                    required
                    placeholder="e.g. CA-849201"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 12px 11px 38px',
                      borderRadius: '4px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.92rem',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0c2340', marginBottom: '6px' }}>
                  Canadian Postal Code *
                </label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '13px', color: '#94a3b8' }} />
                  <input
                    type="text"
                    required
                    placeholder="e.g. M5V 2T6"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
                    style={{
                      width: '100%',
                      padding: '11px 12px 11px 38px',
                      borderRadius: '4px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.92rem',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-end', gridColumn: '1 / -1' }}>
                <button
                  type="submit"
                  disabled={isSearching}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '13px 24px',
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                  }}
                >
                  <Search size={18} />
                  <span>{isSearching ? 'Locating Parcel...' : 'Track My Shipment'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Result Display */}
          {hasSearched ? (
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '32px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                marginBottom: '48px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '14px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid #f1f5f9',
                  marginBottom: '28px',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#b47e00', fontWeight: 700 }}>
                    Active Order
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#0c2340', margin: '2px 0 0' }}>
                    {orderNumber.toUpperCase()}
                  </h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span
                    style={{
                      backgroundColor: '#dcfce7',
                      color: '#166534',
                      padding: '6px 14px',
                      borderRadius: '999px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Truck size={14} /> In Transit with Canada Post
                  </span>
                  <p style={{ margin: '6px 0 0', fontSize: '0.78rem', color: '#64748b' }}>
                    Tracking: <strong>CP-884109482CA</strong>
                  </p>
                </div>
              </div>

              {/* Progress Stepper */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', textAlign: 'center', marginBottom: '32px' }}>
                <div>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#0c2340', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                    <CheckCircle2 size={20} />
                  </div>
                  <strong style={{ fontSize: '0.82rem', color: '#0c2340', display: 'block' }}>Order Confirmed</strong>
                  <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Processed in CAD</span>
                </div>
                <div>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#0c2340', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                    <CheckCircle2 size={20} />
                  </div>
                  <strong style={{ fontSize: '0.82rem', color: '#0c2340', display: 'block' }}>Artisan Packing</strong>
                  <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Silk paper & seals</span>
                </div>
                <div>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#dda82e', color: '#0c2340', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                    <Truck size={20} />
                  </div>
                  <strong style={{ fontSize: '0.82rem', color: '#b47e00', display: 'block' }}>In Transit</strong>
                  <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Montreal &rarr; {postalCode || 'Destination'}</span>
                </div>
                <div>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#e2e8f0', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                    <Clock size={20} />
                  </div>
                  <strong style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'block' }}>Delivered</strong>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Est. Tomorrow 2:00 PM</span>
                </div>
              </div>

              {/* Event Logs */}
              <div style={{ backgroundColor: '#faf8f5', borderRadius: '4px', padding: '16px 20px', border: '1px solid #ebd9c0' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: '#0c2340', marginBottom: '12px', fontWeight: 600 }}>
                  Recent Carrier Scans
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                  <li style={{ display: 'flex', justifyContent: 'space-between', color: '#334155' }}>
                    <span>Departed Canada Post Major Sorting Facility (Montreal, QC)</span>
                    <span style={{ color: '#64748b', fontSize: '0.78rem' }}>Today, 06:14 AM</span>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', color: '#334155' }}>
                    <span>Processed &amp; Barcode Attached at Boutique Fulfillment Hub</span>
                    <span style={{ color: '#64748b', fontSize: '0.78rem' }}>Yesterday, 04:30 PM</span>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', color: '#334155' }}>
                    <span>Electronic Shipping Info Received from Merchant</span>
                    <span style={{ color: '#64748b', fontSize: '0.78rem' }}>Yesterday, 11:20 AM</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#64748b', padding: '20px 0 40px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(180, 126, 0, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#b47e00' }}>
                <Truck size={30} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#0c2340', marginBottom: '6px' }}>
                Track Any Shipment Across Canada
              </h3>
              <p style={{ maxWidth: '500px', margin: '0 auto', fontSize: '0.88rem' }}>
                Orders ship with expedited tracking via Canada Post, FedEx, or UPS with full transit insurance.
              </p>
            </div>
          )}

          {/* Need help concierge prompt */}
          <div style={{ borderTop: '1px solid #ebd9c0', paddingTop: '32px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '12px' }}>
              Cannot locate your tracking details or need to change a delivery address?
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-secondary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                Contact Concierge
              </Link>
              <Link href="/delivery" className="btn-secondary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                Shipping FAQ &amp; Policy
              </Link>
            </div>
          </div>
        </div>
      </main>

      <ReassuranceFooter />
      <Footer />
    </div>
  );
}
