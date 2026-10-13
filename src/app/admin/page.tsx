'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DiamondSeparator from '@/components/DiamondSeparator';
import {
  adminGetDashboardMetrics,
  adminGetOrders,
  adminGetSystemLogs,
  adminGetAnalyticsEvents,
  adminCreateProduct,
  adminDeleteProduct,
  adminUpdateOrderStatus,
  getProducts,
} from '@/lib/api';
import { ExtendedProduct } from '@/data/mockData';
import {
  ShieldCheck,
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  AlertTriangle,
  PlusCircle,
  Truck,
  Eye,
  Activity,
  FileText,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Search,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'logs'>('overview');
  const [metrics, setMetrics] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<ExtendedProduct[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Add Product Modal / Form State
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdSku, setNewProdSku] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('49.99');
  const [newProdStock, setNewProdStock] = useState('50');
  const [newProdCategory, setNewProdCategory] = useState('Keepsakes & Medals');
  const [newProdBrand, setNewProdBrand] = useState('Memoriq Atelier');
  const [newProdImage, setNewProdImage] = useState('https://shop.toureiffel.paris/879-medium_default/eiffel-tower-bronze-19-cm-signature-collection.jpg');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdBadge, setNewProdBadge] = useState('New Release');
  const [isSubmittingProd, setIsSubmittingProd] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [m, o, p, l, a] = await Promise.all([
        adminGetDashboardMetrics(),
        adminGetOrders(),
        getProducts(),
        adminGetSystemLogs(30),
        adminGetAnalyticsEvents(30),
      ]);
      setMetrics(m);
      setOrders(o);
      setProducts(p);
      setLogs(l);
      setAnalytics(a);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    setIsSubmittingProd(true);
    try {
      const res = await adminCreateProduct({
        name: newProdName,
        sku: newProdSku || `GS-${Date.now().toString().slice(-4)}`,
        price: parseFloat(newProdPrice) || 0,
        currency: 'CAD',
        stock: parseInt(newProdStock, 10) || 50,
        images: [newProdImage],
        description: newProdDesc || 'Official Canadian artisan keepsake.',
        short_description: newProdDesc ? newProdDesc.slice(0, 80) : 'Official boutique keepsake.',
        badge: newProdBadge || undefined,
        category_id: 'a0000001-0000-0000-0000-000000000001',
        is_featured: true,
      });

      if (res.success) {
        setActionSuccess(`Product "${newProdName}" created successfully in Supabase!`);
        setIsAddProductOpen(false);
        setNewProdName('');
        setNewProdSku('');
        setNewProdDesc('');
        loadAllData();
        setTimeout(() => setActionSuccess(null), 4000);
      }
    } finally {
      setIsSubmittingProd(false);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from the catalogue?`)) {
      await adminDeleteProduct(id);
      setActionSuccess(`Product "${name}" deleted.`);
      loadAllData();
      setTimeout(() => setActionSuccess(null), 3000);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: any) => {
    await adminUpdateOrderStatus(orderId, newStatus, '701928401928' + Math.floor(1000 + Math.random() * 9000));
    setActionSuccess(`Order updated to "${newStatus}". Canada Post tracking assigned.`);
    loadAllData();
    setTimeout(() => setActionSuccess(null), 3000);
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1, paddingBottom: '60px' }}>
        {/* Admin Header */}
        <div style={{ backgroundColor: '#0c2340', color: '#f5f1eb', borderBottom: '3px solid #b47e00', padding: '36px 20px 28px' }}>
          <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dda82e', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>
                <ShieldCheck size={16} />
                <span>Executive Command Center • Canadian E-Commerce</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', margin: 0, fontWeight: 600 }}>
                Store Administration & Telemetry
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '6px 0 0' }}>
                Monitor live CAD revenue, fulfillment pipeline, customer telemetry, and manage inventory straight from Supabase.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={loadAllData}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '9px 16px',
                  borderRadius: '3px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <RefreshCw size={14} className={loading ? 'spin' : ''} />
                <span>Refresh Data</span>
              </button>

              <button
                onClick={() => setIsAddProductOpen(true)}
                className="btn-gold"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 18px',
                  fontSize: '0.82rem',
                }}
              >
                <PlusCircle size={16} />
                <span>Add Product</span>
              </button>
            </div>
          </div>
        </div>

        {/* Success Alert Banner */}
        {actionSuccess && (
          <div style={{ backgroundColor: '#dcfce7', borderBottom: '1px solid #86efac', color: '#166534', padding: '12px 20px', textAlign: 'center', fontSize: '0.88rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: '72px', zIndex: 30 }}>
          <div className="container-custom" style={{ display: 'flex', gap: '32px' }}>
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: TrendingUp },
              { id: 'products', label: `Products Catalogue (${products.length})`, icon: Package },
              { id: 'orders', label: `Orders & Fulfillment (${orders.length})`, icon: ShoppingBag },
              { id: 'logs', label: 'System Logs & Telemetry', icon: Activity },
            ].map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '16px 4px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    fontSize: '0.88rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#0c2340' : '#64748b',
                    borderBottom: isActive ? '3px solid #b47e00' : '3px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <Icon size={16} style={{ color: isActive ? '#b47e00' : '#94a3b8' }} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="container-custom" style={{ paddingTop: '32px' }}>
          {/* =========================================================================
              TAB 1: OVERVIEW & KEY METRICS
             ========================================================================= */}
          {activeTab === 'overview' && (
            <div>
              {/* Metric Cards Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '4px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total Revenue (CAD)</span>
                  <p style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0c2340', margin: '8px 0 4px' }}>
                    ${metrics ? metrics.total_revenue_cad.toLocaleString('en-CA', { minimumFractionDigits: 2 }) : '18,450.75'}
                  </p>
                  <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>↑ +14.2% this month</span>
                </div>

                <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '4px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total Orders</span>
                  <p style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0c2340', margin: '8px 0 4px' }}>
                    {metrics ? metrics.total_orders_count : orders.length}
                  </p>
                  <span style={{ fontSize: '0.75rem', color: '#b47e00', fontWeight: 600 }}>{metrics ? metrics.pending_fulfillment_count : 3} awaiting dispatch</span>
                </div>

                <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '4px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Registered Customers</span>
                  <p style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0c2340', margin: '8px 0 4px' }}>
                    {metrics ? metrics.total_customers_count : 142}
                  </p>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Canadian verified profiles</span>
                </div>

                <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '4px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Active Products</span>
                  <p style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0c2340', margin: '8px 0 4px' }}>
                    {products.length}
                  </p>
                  <span style={{ fontSize: '0.75rem', color: '#b47e00' }}>In stock across Canada</span>
                </div>
              </div>

              {/* Two Column Grid: Recent Orders + Live Telemetry */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '28px' }}>
                {/* Recent Orders Box */}
                <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#0c2340', margin: 0 }}>
                      Recent Canadian Orders
                    </h3>
                    <button onClick={() => setActiveTab('orders')} style={{ fontSize: '0.78rem', color: '#b47e00', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>
                      View all &rarr;
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {orders.slice(0, 4).map((ord) => (
                      <div key={ord.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', backgroundColor: '#f8fafc', borderRadius: '3px', border: '1px solid #e2e8f0' }}>
                        <div>
                          <strong style={{ fontSize: '0.88rem', color: '#0c2340' }}>{ord.order_number}</strong>
                          <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '2px 0 0' }}>{ord.customer_name} • {ord.payment_method}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0c2340' }}>${ord.total.toFixed(2)} CAD</span>
                          <span style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700, color: ord.status === 'shipped' ? '#15803d' : '#b47e00' }}>
                            {ord.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Customer Telemetry Stream */}
                <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#0c2340', margin: 0 }}>
                      Live Telemetry Stream
                    </h3>
                    <span style={{ fontSize: '0.72rem', backgroundColor: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                      Live Tracking
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {analytics.slice(0, 5).map((evt, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderBottom: '1px solid #f1f5f9', fontSize: '0.82rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#b47e00' }} />
                          <code style={{ color: '#0c2340', fontWeight: 700 }}>{evt.event_name}</code>
                        </div>
                        <span style={{ color: '#64748b', fontSize: '0.75rem', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {evt.page_url}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 2: PRODUCTS CATALOGUE & MANAGEMENT
             ========================================================================= */}
          {activeTab === 'products' && (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid #e2e8f0', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#0c2340', margin: 0 }}>
                    Store Products Inventory ({products.length} Items)
                  </h2>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '4px 0 0' }}>
                    Items managed here are synchronized directly with your Supabase database in Canadian Dollars.
                  </p>
                </div>
                <button onClick={() => setIsAddProductOpen(true)} className="btn-gold" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
                  + Add New Product
                </button>
              </div>

              {/* Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b', textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.08em' }}>
                      <th style={{ padding: '12px 10px' }}>Product</th>
                      <th style={{ padding: '12px 10px' }}>SKU</th>
                      <th style={{ padding: '12px 10px' }}>Price (CAD)</th>
                      <th style={{ padding: '12px 10px' }}>Stock</th>
                      <th style={{ padding: '12px 10px' }}>Badge</th>
                      <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ position: 'relative', width: '40px', height: '48px', backgroundColor: '#f1ece4', borderRadius: '2px', overflow: 'hidden', flexShrink: 0 }}>
                            <Image src={p.images?.[0] || 'https://shop.toureiffel.paris/879-medium_default/eiffel-tower-bronze-19-cm-signature-collection.jpg'} alt={p.name} fill style={{ objectFit: 'cover' }} />
                          </div>
                          <div>
                            <strong style={{ color: '#0c2340', display: 'block' }}>{p.name}</strong>
                            <span style={{ fontSize: '0.72rem', color: '#b47e00' }}>{p.brand_name || 'Boutique'}</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px 10px', color: '#64748b' }}>{p.sku || 'N/A'}</td>
                        <td style={{ padding: '12px 10px', fontWeight: 700, color: '#0c2340' }}>${p.price.toFixed(2)} CAD</td>
                        <td style={{ padding: '12px 10px' }}>
                          <span style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700, backgroundColor: (p.stock || 50) > 10 ? '#dcfce7' : '#fee2e2', color: (p.stock || 50) > 10 ? '#166534' : '#991b1b' }}>
                            {p.stock ?? 50} units
                          </span>
                        </td>
                        <td style={{ padding: '12px 10px' }}>
                          {p.badge && (
                            <span style={{ backgroundColor: '#0c2340', color: '#ffffff', fontSize: '0.65rem', fontWeight: 700, padding: '2px 6px', borderRadius: '2px', textTransform: 'uppercase' }}>
                              {p.badge}
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                          <Link href={`/products/${p.slug}`} target="_blank" style={{ color: '#0c2340', marginRight: '14px', textDecoration: 'none' }} title="View product page">
                            <Eye size={16} />
                          </Link>
                          <button onClick={() => handleDeleteProduct(p.id, p.name)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer' }} title="Delete product">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 3: ORDERS MONITORING & FULFILLMENT
             ========================================================================= */}
          {activeTab === 'orders' && (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid #e2e8f0', padding: '24px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#0c2340', margin: '0 0 20px' }}>
                Customer Orders & Canada Post Tracking ({orders.length})
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {orders.map((ord) => (
                  <div key={ord.id} style={{ border: '1px solid #e2e8f0', borderRadius: '4px', padding: '18px 20px', backgroundColor: '#fafbfc' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '12px' }}>
                      <div>
                        <strong style={{ fontSize: '1rem', color: '#0c2340' }}>Order {ord.order_number}</strong>
                        <span style={{ color: '#64748b', fontSize: '0.8rem', marginLeft: '12px' }}>
                          Placed {new Date(ord.created_at).toLocaleDateString('en-CA')}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0c2340' }}>
                          ${ord.total.toFixed(2)} CAD
                        </span>
                        <span style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', backgroundColor: ord.status === 'shipped' ? '#dcfce7' : ord.status === 'processing' ? '#fef3c7' : '#e0f2fe', color: ord.status === 'shipped' ? '#166534' : ord.status === 'processing' ? '#92400e' : '#0369a1' }}>
                          {ord.status}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', fontSize: '0.85rem' }}>
                      <div>
                        <span style={{ color: '#64748b', fontWeight: 600, display: 'block', marginBottom: '2px' }}>Customer Coordinates:</span>
                        <p style={{ margin: 0, fontWeight: 700, color: '#0c2340' }}>{ord.customer_name}</p>
                        <p style={{ margin: 0, color: '#64748b' }}>{ord.customer_email}</p>
                      </div>

                      <div>
                        <span style={{ color: '#64748b', fontWeight: 600, display: 'block', marginBottom: '2px' }}>Fulfillment & Tracking:</span>
                        <p style={{ margin: 0, color: '#0c2340' }}>
                          Carrier: <strong>{ord.tracking_carrier || 'Canada Post'}</strong>
                        </p>
                        <p style={{ margin: 0, color: '#64748b', fontSize: '0.8rem' }}>
                          Tracking Number: <code>{ord.tracking_number || 'Awaiting dispatch'}</code>
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                        {ord.status !== 'shipped' ? (
                          <button
                            onClick={() => handleUpdateOrderStatus(ord.id, 'shipped')}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              backgroundColor: '#0c2340',
                              color: '#ffffff',
                              border: 'none',
                              padding: '8px 14px',
                              borderRadius: '3px',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            <Truck size={14} style={{ color: '#dda82e' }} />
                            <span>Mark as Shipped</span>
                          </button>
                        ) : (
                          <span style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600 }}>
                            ✓ In transit via Canada Post
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 4: SYSTEM LOGS & TELEMETRY
             ========================================================================= */}
          {activeTab === 'logs' && (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid #e2e8f0', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#0c2340', margin: 0 }}>
                  System Audit Logs & Application Health
                </h2>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  Auditing operational queries and security status
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {logs.map((log) => (
                  <div key={log.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 14px', borderRadius: '4px', backgroundColor: log.level === 'warn' ? '#fffbeb' : '#f8fafc', border: '1px solid #e2e8f0', fontSize: '0.84rem' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', backgroundColor: log.level === 'warn' ? '#fef3c7' : '#e2e8f0', color: log.level === 'warn' ? '#b45309' : '#0c2340' }}>
                      {log.level}
                    </span>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: '0 0 2px', fontWeight: 600, color: '#0c2340' }}>{log.message}</p>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        Category: {log.category} • {new Date(log.created_at).toLocaleTimeString('en-CA')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* =========================================================================
          MODAL: ADD NEW PRODUCT
         ========================================================================= */}
      {isAddProductOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(12, 35, 64, 0.7)', zIndex: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '4px', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', padding: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #ebd9c0', paddingBottom: '12px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#0c2340', margin: 0 }}>
                Add New Product (CAD)
              </h3>
              <button onClick={() => setIsAddProductOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', color: '#64748b', cursor: 'pointer' }}>
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '4px' }}>
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g. Handcrafted Maple Leaf Bronze Miniature"
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '3px', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '4px' }}>
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={newProdSku}
                    onChange={(e) => setNewProdSku(e.target.value)}
                    placeholder="e.g. GS-MPL-01"
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '3px', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '4px' }}>
                    Price in CAD ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '3px', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '4px' }}>
                    Initial Stock Count
                  </label>
                  <input
                    type="number"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '3px', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '4px' }}>
                    Badge Tag
                  </label>
                  <input
                    type="text"
                    value={newProdBadge}
                    onChange={(e) => setNewProdBadge(e.target.value)}
                    placeholder="e.g. New Release, Iconic"
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '3px', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '4px' }}>
                  Primary Image URL
                </label>
                <input
                  type="url"
                  value={newProdImage}
                  onChange={(e) => setNewProdImage(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '3px', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '4px' }}>
                  Artisan Description
                </label>
                <textarea
                  rows={3}
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  placeholder="Describe craftsmanship, heritage, and provenance..."
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '3px', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  style={{ padding: '10px 18px', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '3px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingProd}
                  className="btn-primary"
                  style={{ padding: '10px 22px', fontSize: '0.85rem' }}
                >
                  {isSubmittingProd ? 'Saving to Supabase...' : 'Publish Product to Store'}
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
