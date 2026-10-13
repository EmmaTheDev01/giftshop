'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DiamondSeparator from '@/components/DiamondSeparator';
import {
  getUserOrders,
  getUserWishlist,
  removeFromWishlist,
  requestOrderRefund,
  updateUserProfile,
} from '@/lib/api';
import {
  Package,
  Heart,
  RotateCcw,
  User,
  LogOut,
  Truck,
  ExternalLink,
  ShoppingBag,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck,
  Send,
  Trash2,
} from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const { user, profile, isLoading: authLoading, signOut, refreshProfile } = useAuth();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'refunds' | 'profile'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Refund Modal State
  const [selectedOrderForRefund, setSelectedOrderForRefund] = useState<any | null>(null);
  const [refundReason, setRefundReason] = useState('Changed mind / Not needed');
  const [refundNotes, setRefundNotes] = useState('');
  const [refundSubmitting, setRefundSubmitting] = useState(false);
  const [refundSuccessMsg, setRefundSuccessMsg] = useState<string | null>(null);
  const [refundErrorMsg, setRefundErrorMsg] = useState<string | null>(null);

  // Profile Edit State
  const [editFullName, setEditFullName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileStatus, setProfileStatus] = useState<string | null>(null);

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/account');
    }
  }, [user, authLoading, router]);

  // Load customer data from Supabase
  useEffect(() => {
    if (user?.id) {
      setLoadingData(true);
      Promise.all([getUserOrders(user.id), getUserWishlist(user.id)])
        .then(([ord, wish]) => {
          setOrders(ord);
          setWishlistItems(wish);
          setLoadingData(false);
        })
        .catch(() => setLoadingData(false));
    }
  }, [user]);

  // Sync profile form
  useEffect(() => {
    if (profile) {
      setEditFullName(profile.full_name || '');
      setEditPhone(profile.phone || '');
    }
  }, [profile]);

  const handleRefundSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForRefund) return;
    setRefundSubmitting(true);
    setRefundErrorMsg(null);

    const res = await requestOrderRefund(
      selectedOrderForRefund.id,
      refundReason,
      refundNotes,
      user?.email
    );

    if (res.success) {
      setRefundSuccessMsg(
        `Refund request for order ${selectedOrderForRefund.order_number} submitted to boutique management. RMA tracking details will be emailed to ${user?.email}.`
      );
      setSelectedOrderForRefund(null);
      setRefundNotes('');
    } else {
      setRefundErrorMsg(res.error || 'Failed to submit refund request.');
    }
    setRefundSubmitting(false);
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setProfileSaving(true);
    const res = await updateUserProfile(user.id, {
      full_name: editFullName,
      phone: editPhone,
    });
    if (res.success) {
      setProfileStatus('Profile successfully updated!');
      await refreshProfile();
      setTimeout(() => setProfileStatus(null), 3000);
    } else {
      setProfileStatus('Error saving profile changes.');
    }
    setProfileSaving(false);
  };

  const handleRemoveWishlist = async (productId: string) => {
    if (!user) return;
    await removeFromWishlist(user.id, productId);
    setWishlistItems((prev) => prev.filter((item) => item.product_id !== productId));
  };

  if (authLoading || (!user && authLoading)) {
    return (
      <div style={{ backgroundColor: '#faf8f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', color: '#0c2340', fontWeight: 600 }}>
            Verifying Canadian Boutique session...
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#faf8f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1, padding: '40px 16px 80px' }}>
        <div className="container-custom" style={{ maxWidth: '1100px' }}>
          {/* Welcome Banner */}
          <div
            style={{
              backgroundColor: '#0c2340',
              color: '#ffffff',
              borderRadius: '8px',
              padding: '28px 32px',
              marginBottom: '32px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              border: '1px solid rgba(180, 126, 0, 0.3)',
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', color: '#dda82e', textTransform: 'uppercase' }}>
                Customer Account & Provenance
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-cinzel)',
                  fontSize: '1.8rem',
                  fontWeight: 600,
                  margin: '6px 0 0',
                }}
              >
                Welcome back, {profile?.full_name || user?.email?.split('@')[0]}
              </h1>
              <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: '4px 0 0' }}>
                Account Email: {user?.email} • Currency: Canadian Dollars ($ CAD)
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {(profile?.role === 'admin' || profile?.role === 'staff') && (
                <Link
                  href="/admin"
                  style={{
                    backgroundColor: '#dda82e',
                    color: '#0c2340',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Admin Portal &rarr;
                </Link>
              )}
              <button
                onClick={() => signOut()}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                }}
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Refund Notice Banner if recently filed */}
          {refundSuccessMsg && (
            <div
              style={{
                backgroundColor: '#f0fdf4',
                border: '1px solid #86efac',
                padding: '16px 20px',
                borderRadius: '6px',
                color: '#166534',
                fontSize: '0.9rem',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <CheckCircle2 size={22} style={{ flexShrink: 0 }} />
              <span>{refundSuccessMsg}</span>
            </div>
          )}

          {/* Main Grid: Navigation Tabs & Tab Content */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '240px 1fr',
              gap: '28px',
            }}
            className="account-grid"
          >
            {/* Sidebar Tabs */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                padding: '12px',
                height: 'fit-content',
              }}
            >
              <button
                onClick={() => setActiveTab('orders')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: activeTab === 'orders' ? '#0c2340' : 'transparent',
                  color: activeTab === 'orders' ? '#ffffff' : '#334155',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Package size={18} style={{ color: activeTab === 'orders' ? '#dda82e' : '#64748b' }} />
                  <span>Recent Orders</span>
                </div>
                <span
                  style={{
                    backgroundColor: activeTab === 'orders' ? 'rgba(255,255,255,0.2)' : '#f1f5f9',
                    color: activeTab === 'orders' ? '#ffffff' : '#64748b',
                    fontSize: '0.72rem',
                    padding: '2px 8px',
                    borderRadius: '10px',
                  }}
                >
                  {orders.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('wishlist')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: activeTab === 'wishlist' ? '#0c2340' : 'transparent',
                  color: activeTab === 'wishlist' ? '#ffffff' : '#334155',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  marginTop: '4px',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Heart size={18} style={{ color: activeTab === 'wishlist' ? '#dda82e' : '#64748b' }} />
                  <span>Saved Keepsakes</span>
                </div>
                <span
                  style={{
                    backgroundColor: activeTab === 'wishlist' ? 'rgba(255,255,255,0.2)' : '#f1f5f9',
                    color: activeTab === 'wishlist' ? '#ffffff' : '#64748b',
                    fontSize: '0.72rem',
                    padding: '2px 8px',
                    borderRadius: '10px',
                  }}
                >
                  {wishlistItems.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('refunds')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: activeTab === 'refunds' ? '#0c2340' : 'transparent',
                  color: activeTab === 'refunds' ? '#ffffff' : '#334155',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  marginTop: '4px',
                  transition: 'all 0.15s',
                }}
              >
                <RotateCcw size={18} style={{ color: activeTab === 'refunds' ? '#dda82e' : '#64748b' }} />
                <span>Returns & Refunds</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: activeTab === 'profile' ? '#0c2340' : 'transparent',
                  color: activeTab === 'profile' ? '#ffffff' : '#334155',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  marginTop: '4px',
                  transition: 'all 0.15s',
                }}
              >
                <User size={18} style={{ color: activeTab === 'profile' ? '#dda82e' : '#64748b' }} />
                <span>Profile Settings</span>
              </button>
            </div>

            {/* Main Content Area */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '28px' }}>
              {/* TAB 1: ORDERS */}
              {activeTab === 'orders' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                      <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.3rem', color: '#0c2340', margin: 0 }}>
                        Recent Canadian Orders
                      </h2>
                      <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '4px 0 0' }}>
                        Track Canada Post expedited deliveries, invoices, and fulfillment in CAD ($).
                      </p>
                    </div>
                  </div>

                  {loadingData ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                      Fetching your order history from Supabase...
                    </div>
                  ) : orders.length === 0 ? (
                    <div style={{ padding: '48px 24px', textAlign: 'center', border: '1px dashed #cbd5e1', borderRadius: '8px' }}>
                      <Package size={40} style={{ color: '#94a3b8', margin: '0 auto 12px' }} />
                      <h3 style={{ fontSize: '1.05rem', color: '#0c2340', marginBottom: '6px' }}>No orders placed yet</h3>
                      <p style={{ color: '#64748b', fontSize: '0.85rem', maxWidth: '380px', margin: '0 auto 18px' }}>
                        Explore our handcrafted Canadian wall decor, wooden clocks, and artisan keepsakes.
                      </p>
                      <Link
                        href="/products"
                        style={{
                          backgroundColor: '#0c2340',
                          color: '#ffffff',
                          padding: '10px 20px',
                          borderRadius: '4px',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                        }}
                      >
                        Explore Catalogue &rarr;
                      </Link>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          style={{
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            padding: '18px 20px',
                            backgroundColor: '#fafbfc',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              flexWrap: 'wrap',
                              gap: '12px',
                              borderBottom: '1px solid #e2e8f0',
                              paddingBottom: '12px',
                              marginBottom: '14px',
                            }}
                          >
                            <div>
                              <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Order Reference
                              </span>
                              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#0c2340' }}>
                                {order.order_number}
                              </div>
                            </div>
                            <div>
                              <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Order Date
                              </span>
                              <div style={{ fontSize: '0.85rem', color: '#334155', fontWeight: 500 }}>
                                {new Date(order.created_at).toLocaleDateString('en-CA', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </div>
                            </div>
                            <div>
                              <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Total Amount
                              </span>
                              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#b47e00' }}>
                                ${order.total?.toFixed(2)} CAD
                              </div>
                            </div>
                            <div>
                              <span
                                style={{
                                  display: 'inline-block',
                                  padding: '4px 10px',
                                  borderRadius: '12px',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  textTransform: 'uppercase',
                                  backgroundColor:
                                    order.status === 'delivered'
                                      ? '#dcfce7'
                                      : order.status === 'shipped'
                                      ? '#e0e7ff'
                                      : '#fef3c7',
                                  color:
                                    order.status === 'delivered'
                                      ? '#15803d'
                                      : order.status === 'shipped'
                                      ? '#4338ca'
                                      : '#b45309',
                                }}
                              >
                                {order.status}
                              </span>
                            </div>
                          </div>

                          {/* Line Items */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                            {order.order_items?.map((item: any, idx: number) => (
                              <div
                                key={idx}
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  fontSize: '0.85rem',
                                  color: '#334155',
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={{ fontWeight: 600 }}>{item.quantity}x</span>
                                  <span>{item.product_name}</span>
                                </div>
                                <span style={{ fontWeight: 600 }}>${item.unit_price?.toFixed(2)} CAD</span>
                              </div>
                            ))}
                          </div>

                          {/* Footer / Tracking & Return Actions */}
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              flexWrap: 'wrap',
                              gap: '10px',
                              paddingTop: '12px',
                              borderTop: '1px solid #edf2f7',
                              fontSize: '0.8rem',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}>
                              <Truck size={15} style={{ color: '#0c2340' }} />
                              <span>{order.tracking_carrier || 'Canada Post'}: </span>
                              <span style={{ fontWeight: 600, color: '#0c2340' }}>{order.tracking_number || 'Pending dispatch'}</span>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                setSelectedOrderForRefund(order);
                                setRefundSuccessMsg(null);
                              }}
                              style={{
                                color: '#b47e00',
                                fontWeight: 600,
                                backgroundColor: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                              }}
                            >
                              <RotateCcw size={13} />
                              <span>Request Return / Refund</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: WISHLIST */}
              {activeTab === 'wishlist' && (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.3rem', color: '#0c2340', margin: 0 }}>
                      Saved Keepsakes & Curations
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '4px 0 0' }}>
                      Handmade items saved for future milestone celebrations and gift giving.
                    </p>
                  </div>

                  {wishlistItems.length === 0 ? (
                    <div style={{ padding: '48px 24px', textAlign: 'center', border: '1px dashed #cbd5e1', borderRadius: '8px' }}>
                      <Heart size={40} style={{ color: '#94a3b8', margin: '0 auto 12px' }} />
                      <h3 style={{ fontSize: '1.05rem', color: '#0c2340', marginBottom: '6px' }}>Your wishlist is empty</h3>
                      <p style={{ color: '#64748b', fontSize: '0.85rem', maxWidth: '380px', margin: '0 auto 18px' }}>
                        Browse our collection and tap the heart icon on any keepsake to save it here.
                      </p>
                      <Link
                        href="/products"
                        style={{
                          backgroundColor: '#0c2340',
                          color: '#ffffff',
                          padding: '10px 20px',
                          borderRadius: '4px',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                        }}
                      >
                        Browse Keepsakes &rarr;
                      </Link>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                      {wishlistItems.map((item) => {
                        const prod = item.product;
                        if (!prod) return null;
                        return (
                          <div
                            key={item.id}
                            style={{
                              border: '1px solid #e2e8f0',
                              borderRadius: '8px',
                              overflow: 'hidden',
                              backgroundColor: '#ffffff',
                              display: 'flex',
                              flexDirection: 'column',
                            }}
                          >
                            <div style={{ position: 'relative', height: '180px', backgroundColor: '#f1f5f9' }}>
                              <img
                                src={prod.images?.[0] || '/images/products/canadian-maple-leaf-wall-sign.jpg'}
                                alt={prod.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                              <button
                                onClick={() => handleRemoveWishlist(prod.id)}
                                style={{
                                  position: 'absolute',
                                  top: '8px',
                                  right: '8px',
                                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                  border: 'none',
                                  borderRadius: '50%',
                                  padding: '6px',
                                  cursor: 'pointer',
                                  color: '#dc2626',
                                }}
                                title="Remove item"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                              <h4 style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0c2340', margin: '0 0 6px', flex: 1 }}>
                                {prod.name}
                              </h4>
                              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#b47e00', marginBottom: '10px' }}>
                                ${prod.price?.toFixed(2)} CAD
                              </div>
                              <button
                                onClick={() => {
                                  addToCart(prod, 1);
                                  handleRemoveWishlist(prod.id);
                                }}
                                style={{
                                  backgroundColor: '#0c2340',
                                  color: '#ffffff',
                                  border: 'none',
                                  padding: '8px',
                                  borderRadius: '4px',
                                  fontSize: '0.8rem',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '6px',
                                }}
                              >
                                <ShoppingBag size={14} />
                                <span>Move to Cart</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: REFUNDS & RETURNS */}
              {activeTab === 'refunds' && (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.3rem', color: '#0c2340', margin: 0 }}>
                      Canadian 30-Day Returns & Refund Policy
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '4px 0 0' }}>
                      Items in their original condition and presentation packaging are eligible for full refunds.
                    </p>
                  </div>

                  <div
                    style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      padding: '20px',
                      marginBottom: '24px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0c2340', fontWeight: 700, marginBottom: '8px' }}>
                      <ShieldCheck size={18} style={{ color: '#b47e00' }} />
                      <span>Hassle-Free Return Guarantee</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                      If your laser-cut keepsake arrives with any shipping defect, or if you wish to exchange an item, you may request a Return Merchandise Authorization (RMA) code within 30 days of parcel arrival. Pre-printed Canada Post return slips will be provided for domestic returns.
                    </p>
                  </div>

                  {orders.length > 0 ? (
                    <div>
                      <h3 style={{ fontSize: '1rem', color: '#0c2340', marginBottom: '12px', fontWeight: 600 }}>
                        Select an Order to Request a Return or Refund:
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {orders.map((o) => (
                          <div
                            key={o.id}
                            style={{
                              border: '1px solid #e2e8f0',
                              borderRadius: '6px',
                              padding: '14px 18px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              backgroundColor: '#ffffff',
                            }}
                          >
                            <div>
                              <div style={{ fontWeight: 600, color: '#0c2340', fontSize: '0.9rem' }}>{o.order_number}</div>
                              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                                Placed on {new Date(o.created_at).toLocaleDateString()} • ${o.total?.toFixed(2)} CAD
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedOrderForRefund(o);
                                setRefundSuccessMsg(null);
                              }}
                              style={{
                                backgroundColor: '#f1f5f9',
                                color: '#0c2340',
                                border: '1px solid #cbd5e1',
                                padding: '6px 14px',
                                borderRadius: '4px',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                              }}
                            >
                              Request Refund &rarr;
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      You have no completed orders on file to request returns for.
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: PROFILE SETTINGS */}
              {activeTab === 'profile' && (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.3rem', color: '#0c2340', margin: 0 }}>
                      Profile & Contact Coordinates
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '4px 0 0' }}>
                      Update your account coordinates used for delivery tracking and invoices.
                    </p>
                  </div>

                  {profileStatus && (
                    <div
                      style={{
                        padding: '10px 14px',
                        backgroundColor: '#f0fdf4',
                        border: '1px solid #bbf7d0',
                        color: '#166534',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        marginBottom: '16px',
                      }}
                    >
                      {profileStatus}
                    </div>
                  )}

                  <form onSubmit={handleProfileSave} style={{ maxWidth: '440px' }}>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                        Email Address (Read-only)
                      </label>
                      <input
                        type="email"
                        disabled
                        value={user?.email || ''}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '4px',
                          fontSize: '0.88rem',
                          backgroundColor: '#f8fafc',
                          color: '#64748b',
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={editFullName}
                        onChange={(e) => setEditFullName(e.target.value)}
                        placeholder="e.g. Geneviève Tremblay"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '4px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: '22px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                        Phone Number (For Canada Post tracking alerts)
                      </label>
                      <input
                        type="tel"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        placeholder="+1 (514) 555-0192"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '4px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={profileSaving}
                      style={{
                        backgroundColor: '#0c2340',
                        color: '#ffffff',
                        padding: '11px 20px',
                        borderRadius: '4px',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        border: 'none',
                        cursor: profileSaving ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {profileSaving ? 'Saving Changes...' : 'Save Profile Changes'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* REFUND MODAL */}
      {selectedOrderForRefund && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(12, 35, 64, 0.65)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              padding: '28px',
              maxWidth: '480px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#0c2340', fontFamily: 'var(--font-cinzel)' }}>
                Request Refund / Return
              </h3>
              <button
                onClick={() => setSelectedOrderForRefund(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#64748b' }}
              >
                &times;
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '16px' }}>
              Order Reference: <strong>{selectedOrderForRefund.order_number}</strong> (${selectedOrderForRefund.total?.toFixed(2)} CAD)
            </p>

            {refundErrorMsg && (
              <div style={{ backgroundColor: '#fef2f2', padding: '10px', borderRadius: '4px', color: '#991b1b', fontSize: '0.8rem', marginBottom: '12px' }}>
                {refundErrorMsg}
              </div>
            )}

            <form onSubmit={handleRefundSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Reason for Return / Refund
                </label>
                <select
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    color: '#0f172a',
                  }}
                >
                  <option value="Changed mind / Not needed">Changed mind / Not needed</option>
                  <option value="Item arrived damaged in transit">Item arrived damaged in transit</option>
                  <option value="Defective workmanship or laser cut flaw">Defective workmanship or laser cut flaw</option>
                  <option value="Incorrect keepsake dispatched">Incorrect keepsake dispatched</option>
                  <option value="Parcel transit delay exceeds Canada Post guarantee">Parcel transit delay exceeds Canada Post guarantee</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Additional Notes or Condition Details
                </label>
                <textarea
                  rows={3}
                  value={refundNotes}
                  onChange={(e) => setRefundNotes(e.target.value)}
                  placeholder="Provide any details for the boutique concierge..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    color: '#0f172a',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setSelectedOrderForRefund(null)}
                  style={{
                    padding: '10px 16px',
                    backgroundColor: '#f1f5f9',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: '#475569',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={refundSubmitting}
                  style={{
                    padding: '10px 18px',
                    backgroundColor: '#0c2340',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: refundSubmitting ? 'not-allowed' : 'pointer',
                    color: '#ffffff',
                  }}
                >
                  {refundSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
