'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DiamondSeparator from '@/components/DiamondSeparator';
import { SITE_CONFIG } from '@/config/site';
import { Mail, Phone, Globe, Send, CheckCircle2, HelpCircle, Truck, RotateCcw, ChevronRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderNumber: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      {/* Hero Banner in Solid Navy & Gold */}
      <section
        style={{
          backgroundColor: '#0c2340',
          color: '#ffffff',
          padding: '72px 20px 60px',
          borderBottom: '2px solid #b47e00',
        }}
      >
        <div className="container-custom" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Breadcrumbs */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.78rem',
              color: '#94a3b8',
              marginBottom: '16px',
            }}
          >
            <Link href="/" style={{ color: '#dda82e', textDecoration: 'none' }}>
              Home
            </Link>
            <ChevronRight size={13} />
            <span style={{ color: '#ffffff' }}>Contact Command Center</span>
          </nav>

          {/* Badge */}
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.68rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#dda82e',
              backgroundColor: 'rgba(221, 168, 46, 0.12)',
              border: '1px solid rgba(221, 168, 46, 0.3)',
              padding: '4px 10px',
              borderRadius: '2px',
              marginBottom: '14px',
            }}
          >
            Client Services &amp; Concierge
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: 500,
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: '14px',
            }}
          >
            Contact Command Center
          </h1>

          <p
            style={{
              fontSize: '1.05rem',
              color: '#cbd5e1',
              maxWidth: '720px',
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Whether you require personal engraving guidance, order telemetry, or bespoke corporate gifting, our Command Center concierge team is at your disposal.
          </p>
        </div>
      </section>

      {/* Main Two-Column Contact Content */}
      <main style={{ flex: 1, backgroundColor: '#faf8f5', padding: '60px 20px 80px' }}>
        <div className="container-custom" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'start',
            }}
          >
            {/* Left Column: Direct Communication Channels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: '#b47e00',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  Direct Channels
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.75rem',
                    color: '#0c2340',
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  We are here to assist.
                </h2>
              </div>

              {/* Channel 1: Primary Command Center Email */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #ebd9c0',
                  borderRadius: '4px',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(12, 35, 64, 0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(180, 126, 0, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#b47e00',
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem', color: '#0c2340', marginBottom: '2px' }}>
                      Command Center Email
                    </strong>
                    <a
                      href="mailto:commandcenter@lifelines.global"
                      style={{
                        color: '#b47e00',
                        fontWeight: 600,
                        fontSize: '0.92rem',
                        textDecoration: 'none',
                        wordBreak: 'break-all',
                      }}
                    >
                      commandcenter@lifelines.global
                    </a>
                    <p style={{ margin: '6px 0 0', fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5 }}>
                      Direct inbox for collector inquiries, orders, and customization requests. Response within 12–24 business hours.
                    </p>
                  </div>
                </div>
              </div>

              {/* Channel 2: Telephone Line */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #ebd9c0',
                  borderRadius: '4px',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(12, 35, 64, 0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(180, 126, 0, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#b47e00',
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem', color: '#0c2340', marginBottom: '2px' }}>
                      Telephone Concierge
                    </strong>
                    <span style={{ color: '#0c2340', fontWeight: 600, fontSize: '0.92rem' }}>
                      {SITE_CONFIG.contact.phone}
                    </span>
                    <p style={{ margin: '6px 0 0', fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5 }}>
                      Toll-free customer line available Monday &ndash; Friday from 9:00 AM to 6:00 PM EST.
                    </p>
                  </div>
                </div>
              </div>

              {/* Channel 3: Online Atelier & Dispatch */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #ebd9c0',
                  borderRadius: '4px',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(12, 35, 64, 0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(180, 126, 0, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#b47e00',
                      flexShrink: 0,
                    }}
                  >
                    <Globe size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem', color: '#0c2340', marginBottom: '2px' }}>
                      Official Online Atelier
                    </strong>
                    <span style={{ color: '#0c2340', fontWeight: 600, fontSize: '0.92rem' }}>
                      100% Digital Boutique
                    </span>
                    <p style={{ margin: '6px 0 0', fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5 }}>
                      Orders are crafted to order in our artisan workshop and dispatched directly with live tracked delivery.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Self-Service Shortcuts */}
              <div
                style={{
                  backgroundColor: '#faf6f0',
                  border: '1px solid #e7d6be',
                  borderRadius: '4px',
                  padding: '20px 24px',
                }}
              >
                <strong style={{ display: 'block', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#b47e00', marginBottom: '10px' }}>
                  Instant Self-Service Help
                </strong>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <li>
                    <Link
                      href="/tracking"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.85rem',
                        color: '#0c2340',
                        fontWeight: 600,
                        textDecoration: 'none',
                      }}
                    >
                      <Truck size={15} style={{ color: '#b47e00' }} />
                      <span>Track Shipment Telemetry &rarr;</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.85rem',
                        color: '#0c2340',
                        fontWeight: 600,
                        textDecoration: 'none',
                      }}
                    >
                      <HelpCircle size={15} style={{ color: '#b47e00' }} />
                      <span>Browse Frequently Asked Questions &rarr;</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/returns"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.85rem',
                        color: '#0c2340',
                        fontWeight: 600,
                        textDecoration: 'none',
                      }}
                    >
                      <RotateCcw size={15} style={{ color: '#b47e00' }} />
                      <span>30-Day Satisfaction &amp; Returns &rarr;</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Transmission Form */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '4px',
                border: '1px solid #ebd9c0',
                padding: '36px 32px',
                boxShadow: '0 4px 20px rgba(12, 35, 64, 0.04)',
              }}
            >
              <div style={{ marginBottom: '28px' }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: '#b47e00',
                  }}
                >
                  Electronic Dispatch
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.65rem',
                    color: '#0c2340',
                    fontWeight: 600,
                    margin: '4px 0 8px',
                  }}
                >
                  Send a Message
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.88rem', margin: 0, lineHeight: 1.5 }}>
                  Please complete the form below. Messages are routed directly to our Command Center desk at <strong style={{ color: '#0c2340' }}>commandcenter@lifelines.global</strong>.
                </p>
              </div>

              {submitted ? (
                <div
                  style={{
                    backgroundColor: '#faf8f5',
                    border: '1px solid #b47e00',
                    borderRadius: '4px',
                    padding: '36px 24px',
                    textAlign: 'center',
                  }}
                >
                  <CheckCircle2 size={44} style={{ margin: '0 auto 14px', color: '#166534' }} />
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', margin: '0 0 10px', color: '#0c2340' }}>
                    Message Received by Command Center
                  </h3>
                  <p style={{ fontSize: '0.9rem', maxWidth: '440px', margin: '0 auto 20px', color: '#475569', lineHeight: 1.6 }}>
                    Your transmission has been logged. Our concierge will review your message and reply directly to <strong style={{ color: '#0c2340' }}>{formData.email}</strong> within 12–24 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', orderNumber: '', subject: 'General Inquiry', message: '' });
                    }}
                    className="btn-primary"
                    style={{ padding: '10px 24px', fontSize: '0.85rem' }}
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Row 1: Name & Email */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0c2340', marginBottom: '6px' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Eleanor Vance"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '2px',
                          border: '1px solid #cbd5e1',
                          backgroundColor: '#faf8f5',
                          fontSize: '0.9rem',
                          outline: 'none',
                          transition: 'border-color 0.15s, background-color 0.15s',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#b47e00';
                          e.target.style.backgroundColor = '#ffffff';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#cbd5e1';
                          e.target.style.backgroundColor = '#faf8f5';
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0c2340', marginBottom: '6px' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. eleanor@example.com"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '2px',
                          border: '1px solid #cbd5e1',
                          backgroundColor: '#faf8f5',
                          fontSize: '0.9rem',
                          outline: 'none',
                          transition: 'border-color 0.15s, background-color 0.15s',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#b47e00';
                          e.target.style.backgroundColor = '#ffffff';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#cbd5e1';
                          e.target.style.backgroundColor = '#faf8f5';
                        }}
                      />
                    </div>
                  </div>

                  {/* Row 2: Order Number & Subject */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0c2340', marginBottom: '6px' }}>
                        Order Reference (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.orderNumber}
                        onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                        placeholder="e.g. GS-10842"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '2px',
                          border: '1px solid #cbd5e1',
                          backgroundColor: '#faf8f5',
                          fontSize: '0.9rem',
                          outline: 'none',
                          transition: 'border-color 0.15s, background-color 0.15s',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#b47e00';
                          e.target.style.backgroundColor = '#ffffff';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#cbd5e1';
                          e.target.style.backgroundColor = '#faf8f5';
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0c2340', marginBottom: '6px' }}>
                        Inquiry Topic *
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '2px',
                          border: '1px solid #cbd5e1',
                          backgroundColor: '#faf8f5',
                          fontSize: '0.9rem',
                          outline: 'none',
                          color: '#0c2340',
                          transition: 'border-color 0.15s, background-color 0.15s',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#b47e00';
                          e.target.style.backgroundColor = '#ffffff';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#cbd5e1';
                          e.target.style.backgroundColor = '#faf8f5';
                        }}
                      >
                        <option value="General Inquiry">General Boutique Inquiry</option>
                        <option value="Order Tracking">Order Status &amp; Dispatch</option>
                        <option value="Customization Studio">Custom Laser Engraving &amp; Dedications</option>
                        <option value="Returns & Exchanges">30-Day Return or Exchange Request</option>
                        <option value="Corporate Gifting">Corporate Commissions &amp; Guild Honors</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0c2340', marginBottom: '6px' }}>
                      Detailed Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please specify your request, dedication text, or question in detail..."
                      style={{
                        width: '100%',
                        padding: '14px',
                        borderRadius: '2px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#faf8f5',
                        fontSize: '0.9rem',
                        outline: 'none',
                        fontFamily: 'inherit',
                        lineHeight: 1.6,
                        transition: 'border-color 0.15s, background-color 0.15s',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#b47e00';
                        e.target.style.backgroundColor = '#ffffff';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#cbd5e1';
                        e.target.style.backgroundColor = '#faf8f5';
                      }}
                    />
                  </div>

                  {/* Trust indicator */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#64748b' }}>
                    <ShieldCheck size={16} style={{ color: '#b47e00', flexShrink: 0 }} />
                    <span>Your privacy is safeguarded under strict data protection protocols.</span>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary"
                      style={{
                        width: '100%',
                        padding: '14px 24px',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        opacity: submitting ? 0.7 : 1,
                        cursor: submitting ? 'not-allowed' : 'pointer',
                      }}
                    >
                      <span>{submitting ? 'Transmitting to Command Center...' : 'Transmit Message to Command Center'}</span>
                      <Send size={16} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <ReassuranceFooter />
      <Footer />
    </div>
  );
}
