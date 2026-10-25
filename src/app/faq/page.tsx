'use client';

import React, { useState } from 'react';
import LegalLayout from '@/components/LegalLayout';
import { SITE_CONFIG } from '@/config/site';
import { ChevronDown, Search } from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    category: 'Orders & Payments',
    q: 'How is pricing and currency handled at checkout?',
    a: 'All prices displayed across our boutique are clearly stated at checkout. Applicable sales taxes and delivery fees are itemized transparently according to your delivery destination before order confirmation.',
  },
  {
    category: 'Orders & Payments',
    q: 'Which payment methods do you accept?',
    a: 'We accept Visa and Mastercard processed with 3D Secure 2.0 cardholder protection. All payment transactions are encrypted using bank-grade PCI-DSS Level 1 compliance.',
  },
  {
    category: 'Orders & Payments',
    q: 'Can I add a personalized gift message or gift box?',
    a: 'Absolutely. Every order is packaged in our signature luxury presentation box. During checkout, you can include a complimentary personalized gift message printed on heavy cardstock embossed with our golden workshop crest.',
  },
  {
    category: 'Shipping & Delivery',
    q: 'How does complimentary shipping work?',
    a: 'We offer complimentary standard expedited shipping on all qualifying orders totaling $95.00 or more. Transit insurance and tracking are included with no promo code required.',
  },
  {
    category: 'Shipping & Delivery',
    q: 'How long will it take to receive my order?',
    a: 'Orders are prepared and dispatched within 24 to 48 hours from our fulfillment ateliers. Standard domestic deliveries typically take 2 to 4 business days, while express international shipping takes 3 to 6 business days.',
  },
  {
    category: 'Shipping & Delivery',
    q: 'How can I track my parcel?',
    a: 'As soon as your parcel is scanned by our carrier partners (including FedEx, UPS, and premier postal networks), you will receive an email containing your tracking number and live link to monitor its progress.',
  },
  {
    category: 'Returns & Refunds',
    q: 'What is your return policy?',
    a: 'We offer a 30-day satisfaction guarantee. If an item does not meet your expectations, you may return it within 30 days of receipt in its original, unused condition for a full refund or exchange.',
  },
  {
    category: 'Returns & Refunds',
    q: 'How do I obtain a prepaid return shipping label?',
    a: 'Simply email our concierge at ' + SITE_CONFIG.contact.email + ' with your order number. We will provide a prepaid digital return label with complete return instructions.',
  },
  {
    category: 'Craftsmanship & Authenticity',
    q: 'Are limited edition pieces authenticated and numbered?',
    a: 'Yes. All limited edition items are individually numbered and accompanied by an official Certificate of Authenticity signed by the master craft workshop.',
  },
  {
    category: 'Craftsmanship & Authenticity',
    q: 'Where are your physical boutiques and showrooms located?',
    a: 'Our flagship showrooms and workshop partners showcase our full collections, curated keepsakes, and personalized engraving options in person.',
  },
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'Orders & Payments', 'Shipping & Delivery', 'Returns & Refunds', 'Craftsmanship & Authenticity'];

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCat = selectedCat === 'All' || item.category === selectedCat;
    const matchesSearch =
      search.trim() === '' ||
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <LegalLayout
      title="Frequently Asked Questions (F.A.Q)"
      subtitle="Find quick answers to common questions regarding orders, shipping, payments, returns, and our artisan keepsakes."
      badge="Customer Help Center"
      lastUpdated="October 2026"
    >
      <div style={{ color: '#334155' }}>
        {/* Search Input */}
        <div
          style={{
            position: 'relative',
            marginBottom: '28px',
          }}
        >
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#b47e00' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions (e.g. shipping, returns, currency, tracking)..."
            style={{
              width: '100%',
              padding: '14px 16px 14px 44px',
              borderRadius: '4px',
              border: '1px solid #cbd5e1',
              fontSize: '0.95rem',
              outline: 'none',
              backgroundColor: '#faf8f5',
            }}
          />
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: 600,
                border: selectedCat === cat ? '1px solid #0c2340' : '1px solid #e2e8f0',
                backgroundColor: selectedCat === cat ? '#0c2340' : '#ffffff',
                color: selectedCat === cat ? '#ffffff' : '#475569',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredFaqs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
              <p>No questions found matching &ldquo;{search}&rdquo;.</p>
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCat('All');
                }}
                className="btn-secondary"
                style={{ marginTop: '10px', padding: '8px 16px' }}
              >
                Clear Search
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '18px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      backgroundColor: isOpen ? '#faf8f5' : '#ffffff',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 600, color: '#0c2340', paddingRight: '16px' }}>
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      style={{
                        color: '#b47e00',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        flexShrink: 0,
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '16px 20px 22px',
                        fontSize: '0.9rem',
                        lineHeight: 1.65,
                        color: '#475569',
                        borderTop: '1px solid #f1f5f9',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions card */}
        <div
          style={{
            marginTop: '36px',
            backgroundColor: '#faf8f5',
            border: '1px solid #ebd9c0',
            borderRadius: '4px',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#0c2340', margin: '0 0 4px', fontWeight: 600 }}>
              Still have a question?
            </h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
              Our dedicated concierge team is here to assist you anytime.
            </p>
          </div>

          <Link href="/contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.8rem' }}>
            <span>Contact Customer Concierge</span>
          </Link>
        </div>
      </div>
    </LegalLayout>
  );
}
