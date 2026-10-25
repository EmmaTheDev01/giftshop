'use client';

import React, { useState } from 'react';
import LegalLayout from '@/components/LegalLayout';
import { SITE_CONFIG } from '@/config/site';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';

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
    <LegalLayout
      title="Contact Customer Concierge"
      subtitle="We are at your disposal to assist with gift recommendations, order tracking, corporate gifting, or boutique inquiries."
      badge="Boutique Concierge"
      lastUpdated="October 2026"
    >
      <div style={{ color: '#334155' }}>
        {/* Contact info grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '18px',
            marginBottom: '36px',
          }}
        >
          <div style={{ border: '1px solid #ebd9c0', borderRadius: '4px', padding: '18px', backgroundColor: '#faf8f5' }}>
            <Mail size={22} style={{ color: '#b47e00', marginBottom: '8px' }} />
            <strong style={{ color: '#0c2340', display: 'block', fontSize: '0.95rem' }}>Email Concierge</strong>
            <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: '#b47e00', fontSize: '0.85rem' }}>
              {SITE_CONFIG.contact.email}
            </a>
            <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#64748b' }}>Response within 24 business hours</p>
          </div>

          <div style={{ border: '1px solid #ebd9c0', borderRadius: '4px', padding: '18px', backgroundColor: '#faf8f5' }}>
            <Phone size={22} style={{ color: '#b47e00', marginBottom: '8px' }} />
            <strong style={{ color: '#0c2340', display: 'block', fontSize: '0.95rem' }}>Telephone Support</strong>
            <span style={{ fontSize: '0.85rem', color: '#0c2340', fontWeight: 600 }}>{SITE_CONFIG.contact.phone}</span>
            <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#64748b' }}>Toll-free across North America</p>
          </div>

          <div style={{ border: '1px solid #ebd9c0', borderRadius: '4px', padding: '18px', backgroundColor: '#faf8f5' }}>
            <Clock size={22} style={{ color: '#b47e00', marginBottom: '8px' }} />
            <strong style={{ color: '#0c2340', display: 'block', fontSize: '0.95rem' }}>Operating Hours</strong>
            <span style={{ fontSize: '0.85rem', color: '#0c2340' }}>Mon &ndash; Fri: 9:00 AM &ndash; 6:00 PM EST</span>
            <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#64748b' }}>Saturday: 10:00 AM &ndash; 4:00 PM EST</p>
          </div>

          <div style={{ border: '1px solid #ebd9c0', borderRadius: '4px', padding: '18px', backgroundColor: '#faf8f5' }}>
            <MapPin size={22} style={{ color: '#b47e00', marginBottom: '8px' }} />
            <strong style={{ color: '#0c2340', display: 'block', fontSize: '0.95rem' }}>Boutique Showrooms</strong>
            <span style={{ fontSize: '0.85rem', color: '#0c2340' }}>{SITE_CONFIG.locations}</span>
            <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#64748b' }}>By appointment & retail walk-in</p>
          </div>
        </div>

        {/* Contact Form Section */}
        <section style={{ maxWidth: '680px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#0c2340', marginBottom: '8px', fontWeight: 600 }}>
            Send Us an Electronic Message
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '24px' }}>
            Please complete the fields below. If your message pertains to an existing order, include your order tracking number for expedited assistance.
          </p>

          {submitted ? (
            <div
              style={{
                backgroundColor: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '4px',
                padding: '32px 24px',
                textAlign: 'center',
                color: '#166534',
              }}
            >
              <CheckCircle2 size={40} style={{ margin: '0 auto 12px', color: '#166534' }} />
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', margin: '0 0 8px', color: '#14532d' }}>
                Thank You for Your Message!
              </h4>
              <p style={{ fontSize: '0.92rem', maxWidth: '520px', margin: '0 auto 20px', color: '#166534' }}>
                Your request has been routed to our customer concierge team. A confirmation receipt has been sent to your email, and a representative will reply within 24 business hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', orderNumber: '', subject: 'General Inquiry', message: '' });
                }}
                className="btn-primary"
                style={{ padding: '10px 22px', fontSize: '0.8rem' }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0c2340', marginBottom: '6px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Marie Tremblay"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '2px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                      outline: 'none',
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
                    placeholder="e.g. marie.tremblay@example.ca"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '2px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0c2340', marginBottom: '6px' }}>
                    Order Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                    placeholder="e.g. CA-849201"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '2px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0c2340', marginBottom: '6px' }}>
                    Subject *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '2px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <option value="General Inquiry">General Boutique Inquiry</option>
                    <option value="Order Tracking">Order & Delivery Status</option>
                    <option value="Returns & Exchanges">Return, Refund, or Exchange</option>
                    <option value="Limited Edition Concierge">Limited Edition Collector Piece Inquiries</option>
                    <option value="Corporate Gifting">Corporate Gifting & Bespoke Sets</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0c2340', marginBottom: '6px' }}>
                  Your Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can our concierge team assist you today?"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '2px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '12px 24px',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  <span>{submitting ? 'Transmitting Message...' : 'Submit Message to Concierge'}</span>
                  <Send size={15} />
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </LegalLayout>
  );
}
