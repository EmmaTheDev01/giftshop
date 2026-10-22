'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ExtendedProduct } from '@/types/supabase';
import ProductCard from '@/components/ProductCard';
import DiamondSeparator from '@/components/DiamondSeparator';
import { useAuth } from '@/context/AuthContext';
import {
  Star,
  Heart,
  ShoppingBag,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Share2,
  Edit,
} from 'lucide-react';

export default function ProductDetailClient({
  product,
  relatedProducts,
}: {
  product: ExtendedProduct;
  relatedProducts: ExtendedProduct[];
}) {
  const { addToCart, toggleWishlist, wishlist, setIsCartOpen } = useCart();
  const { profile } = useAuth();
  const isAdmin = profile?.role === 'admin';
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Accordion active tab states
  const [activeAccordion, setActiveAccordion] = useState<string | null>('specs');

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const isFavorite = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    setIsCartOpen(true);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const mainImage = product.images?.[selectedImgIdx] || product.images?.[0] || '/images/products/mom-heart-photo-frame.jpeg';

  return (
    <div style={{ paddingBottom: '70px' }}>
      {/* 1. Breadcrumbs Bar */}
      <div
        style={{
          backgroundColor: '#faf8f5',
          borderBottom: '1px solid #ebd9c0',
          padding: '12px 20px',
        }}
      >
        <div className="container-custom">
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '6px',
              fontSize: '0.82rem',
              color: '#64748b',
            }}
          >
            <Link href="/" style={{ color: '#0c2340', fontWeight: 500, textDecoration: 'none' }}>
              Home
            </Link>
            <ChevronRight size={13} style={{ color: '#b47e00' }} />
            <Link href="/products" style={{ color: '#0c2340', fontWeight: 500, textDecoration: 'none' }}>
              All Products
            </Link>
            {product.category_name && (
              <>
                <ChevronRight size={13} style={{ color: '#b47e00' }} />
                <span style={{ color: '#64748b' }}>{product.category_name}</span>
              </>
            )}
            <ChevronRight size={13} style={{ color: '#b47e00' }} />
            <span style={{ color: '#b47e00', fontWeight: 600 }}>{product.name}</span>

            {isAdmin && (
              <Link
                href="/admin"
                style={{
                  marginLeft: 'auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#0c2340',
                  color: '#ffffff',
                  padding: '5px 12px',
                  borderRadius: '4px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 2px 6px rgba(12, 35, 64, 0.2)',
                }}
                title="Open Admin Catalogue to Edit this product"
              >
                <Edit size={12} style={{ color: '#dda82e' }} />
                <span>Edit Product (Admin)</span>
              </Link>
            )}
          </nav>
        </div>
      </div>

      {/* 2. Main Product Hero (Gallery + Purchase Panel) */}
      <div className="container-custom" style={{ paddingTop: '40px', paddingBottom: '50px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Visual Gallery */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Primary Main Image Container */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1 / 1.1',
                borderRadius: '4px',
                overflow: 'hidden',
                backgroundColor: '#faf8f5',
                border: '1px solid #ebd9c0',
                boxShadow: '0 8px 30px rgba(12, 35, 64, 0.06)',
              }}
            >
              <Image
                src={mainImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 600px"
                style={{ objectFit: 'cover' }}
              />

              {/* Badges Overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  zIndex: 10,
                }}
              >
                {product.badge && (
                  <span
                    style={{
                      backgroundColor: '#0c2340',
                      color: '#ffffff',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      padding: '5px 10px',
                      borderRadius: '2px',
                    }}
                  >
                    {product.badge}
                  </span>
                )}
                {product.is_limited_edition && (
                  <span
                    style={{
                      backgroundColor: '#b47e00',
                      color: '#ffffff',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      padding: '5px 10px',
                      borderRadius: '2px',
                    }}
                  >
                    Limited Edition
                  </span>
                )}
              </div>

              {/* Share & Wishlist in overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  zIndex: 10,
                }}
              >
                <button
                  onClick={() => toggleWishlist(product.id)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.94)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: '1px solid #ebd9c0',
                  }}
                  aria-label="Save to wishlist"
                >
                  <Heart
                    size={18}
                    style={{
                      color: isFavorite ? '#b47e00' : '#475569',
                      fill: isFavorite ? '#b47e00' : 'none',
                    }}
                  />
                </button>
                <button
                  onClick={handleShare}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.94)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: '1px solid #ebd9c0',
                    color: copiedShare ? '#15803d' : '#475569',
                  }}
                  aria-label="Share product"
                >
                  {copiedShare ? <Check size={16} /> : <Share2 size={16} />}
                </button>
              </div>
            </div>

            {/* Thumbnail Row */}
            {product.images && product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIdx(idx)}
                    style={{
                      position: 'relative',
                      width: '80px',
                      height: '80px',
                      borderRadius: '3px',
                      overflow: 'hidden',
                      border: selectedImgIdx === idx ? '2px solid #b47e00' : '1px solid #cbd5e1',
                      padding: 0,
                      cursor: 'pointer',
                      flexShrink: 0,
                      backgroundColor: '#faf8f5',
                    }}
                  >
                    <Image src={img} alt={`${product.name} thumb ${idx}`} fill style={{ objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Commercial & Heritage Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Kicker */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: '#b47e00',
                }}
              >
                {product.brand_name || 'Artisan Keepsake'}
              </span>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>
                {product.collection_name || 'Official Boutique'}
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.35rem, 2.2vw, 1.85rem)',
                fontWeight: 600,
                color: '#0c2340',
                lineHeight: 1.25,
                margin: 0,
              }}
            >
              {product.name}
            </h1>

            {/* Rating & Reviews */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '3px', color: '#dda82e' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0c2340' }}>
                {product.rating || '4.9'} / 5.0
              </span>
              <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                ({product.reviews_count || 48} verified reviews)
              </span>
            </div>

            {/* Price Box */}
            <div
              style={{
                backgroundColor: '#faf8f5',
                border: '1px solid #ebd9c0',
                borderRadius: '4px',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                <span
                  style={{
                    fontSize: '1.9rem',
                    fontWeight: 800,
                    color: '#0c2340',
                    letterSpacing: '0.02em',
                  }}
                >
                  ${product.price.toFixed(2)} CAD
                </span>
                {product.original_price && (
                  <span
                    style={{
                      fontSize: '1.1rem',
                      color: '#94a3b8',
                      textDecoration: 'line-through',
                    }}
                  >
                    ${product.original_price.toFixed(2)} CAD
                  </span>
                )}
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: '#15803d',
                    fontWeight: 700,
                    backgroundColor: '#dcfce7',
                    padding: '2px 8px',
                    borderRadius: '12px',
                  }}
                >
                  In Stock 🇨🇦
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>
                Prices in Canadian Dollars. Applicable federal & provincial taxes (GST/PST/HST) calculated at checkout.
              </p>
            </div>

            {/* Narrative description */}
            <p style={{ fontSize: '0.96rem', lineHeight: 1.65, color: '#334155', margin: 0 }}>
              {product.description}
            </p>

            {/* Free Shipping Alert if under threshold */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '4px',
                padding: '10px 14px',
                fontSize: '0.82rem',
                color: '#1e40af',
              }}
            >
              <Truck size={17} style={{ color: '#2563eb', flexShrink: 0 }} />
              <span>
                Free Expedited Shipping across Canada on all orders over <strong>$95 CAD</strong>.
              </span>
            </div>

            {/* Quantity Selector & CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '6px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                {/* Stepper */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #cbd5e1',
                    borderRadius: '3px',
                    backgroundColor: '#ffffff',
                    height: '48px',
                  }}
                >
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    style={{ padding: '0 16px', height: '100%', fontSize: '1.1rem', color: '#0c2340', cursor: 'pointer' }}
                  >
                    -
                  </button>
                  <span style={{ padding: '0 14px', fontWeight: 700, fontSize: '0.95rem', minWidth: '24px', textAlign: 'center' }}>
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    style={{ padding: '0 16px', height: '100%', fontSize: '1.1rem', color: '#0c2340', cursor: 'pointer' }}
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="btn-primary"
                  style={{
                    flex: 1,
                    height: '48px',
                    padding: '0 24px',
                    fontSize: '0.88rem',
                    backgroundColor: added ? '#15803d' : '#0c2340',
                  }}
                >
                  {added ? (
                    <>
                      <Check size={18} />
                      <span>Added to Shopping Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} style={{ color: '#dda82e' }} />
                      <span>Add to Bag • ${(product.price * qty).toFixed(2)} CAD</span>
                    </>
                  )}
                </button>
              </div>

              {/* Instant Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="btn-gold"
                style={{
                  width: '100%',
                  height: '46px',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <CreditCard size={17} />
                <span>Instant Checkout • Fast Dispatch</span>
              </button>
            </div>

            {/* Certified Features List */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                paddingTop: '8px',
                borderTop: '1px solid #e2e8f0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#475569' }}>
                <ShieldCheck size={16} style={{ color: '#b47e00' }} />
                <span>Official Provenance Guaranteed</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#475569' }}>
                <Truck size={16} style={{ color: '#b47e00' }} />
                <span>Canada Post Tracked Delivery</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#475569' }}>
                <RotateCcw size={16} style={{ color: '#b47e00' }} />
                <span>30-Day Canadian Returns</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#475569' }}>
                <Sparkles size={16} style={{ color: '#b47e00' }} />
                <span>Artisan Gift Wrapping Available</span>
              </div>
            </div>

            {/* 3. Detailed Accordions */}
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Accordion 1: Specifications */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <button
                  onClick={() => toggleAccordion('specs')}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#faf8f5',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    color: '#0c2340',
                    cursor: 'pointer',
                  }}
                >
                  <span>Craftsmanship & Specifications</span>
                  {activeAccordion === 'specs' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {activeAccordion === 'specs' && (
                  <div style={{ padding: '16px 18px', backgroundColor: '#ffffff', fontSize: '0.86rem', color: '#475569' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <tbody>
                        {product.sku && (
                          <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '6px 0', fontWeight: 600, width: '140px' }}>Reference / SKU:</td>
                            <td style={{ padding: '6px 0' }}>{product.sku}</td>
                          </tr>
                        )}
                        {product.dimensions && (
                          <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '6px 0', fontWeight: 600 }}>Dimensions:</td>
                            <td style={{ padding: '6px 0' }}>{product.dimensions}</td>
                          </tr>
                        )}
                        {product.material && (
                          <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '6px 0', fontWeight: 600 }}>Materials:</td>
                            <td style={{ padding: '6px 0' }}>{product.material}</td>
                          </tr>
                        )}
                        {product.made_in && (
                          <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '6px 0', fontWeight: 600 }}>Country of Origin:</td>
                            <td style={{ padding: '6px 0' }}>{product.made_in}</td>
                          </tr>
                        )}
                        {product.details &&
                          Object.entries(product.details).map(([key, val]) => (
                            <tr key={key} style={{ borderBottom: '1px solid #f1f5f9' }}>
                              <td style={{ padding: '6px 0', fontWeight: 600 }}>{key}:</td>
                              <td style={{ padding: '6px 0' }}>{val as string}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Accordion 2: Shipping & Delivery */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <button
                  onClick={() => toggleAccordion('shipping')}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#faf8f5',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    color: '#0c2340',
                    cursor: 'pointer',
                  }}
                >
                  <span>Canadian Delivery & Free Shipping Threshold</span>
                  {activeAccordion === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {activeAccordion === 'shipping' && (
                  <div style={{ padding: '16px 18px', backgroundColor: '#ffffff', fontSize: '0.86rem', color: '#475569', lineHeight: 1.6 }}>
                    <p style={{ margin: '0 0 10px' }}>
                      Orders are processed and dispatched within <strong>24 business hours</strong> with complete end-to-end Canada Post tracking.
                    </p>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                      <li><strong>Ontario & Quebec:</strong> 1 to 2 business days ($12 CAD flat or Free on $95+ CAD)</li>
                      <li><strong>Western Canada (BC, AB, SK, MB):</strong> 2 to 4 business days</li>
                      <li><strong>Atlantic Canada (NS, NB, PE, NL):</strong> 2 to 4 business days</li>
                      <li><strong>Northern Territories:</strong> 3 to 5 business days</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 3: 30-Day Returns */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <button
                  onClick={() => toggleAccordion('returns')}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#faf8f5',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    color: '#0c2340',
                    cursor: 'pointer',
                  }}
                >
                  <span>30-Day Canadian Return Guarantee</span>
                  {activeAccordion === 'returns' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {activeAccordion === 'returns' && (
                  <div style={{ padding: '16px 18px', backgroundColor: '#ffffff', fontSize: '0.86rem', color: '#475569', lineHeight: 1.6 }}>
                    <p style={{ margin: '0 0 8px' }}>
                      We offer a 30-day satisfaction guarantee on all items in their original collector packaging.
                    </p>
                    <p style={{ margin: 0 }}>
                      Simply request a prepaid Canada Post return label via our <Link href="/returns" style={{ color: '#b47e00', textDecoration: 'underline' }}>Returns Portal</Link> and drop off at any Canada Post location nationwide.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Related Keepsakes Section */}
      {relatedProducts.length > 0 && (
        <section style={{ backgroundColor: '#faf8f5', padding: '60px 20px', borderTop: '1px solid #ebd9c0' }}>
          <div className="container-custom">
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: '#b47e00',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                Curated Suggestions
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  color: '#0c2340',
                  margin: '0 0 12px',
                }}
              >
                Complete The Collection
              </h2>
              <DiamondSeparator color="#b47e00" />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '24px',
              }}
            >
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
