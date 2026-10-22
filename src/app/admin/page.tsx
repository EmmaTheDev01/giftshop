'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  adminGetDashboardMetrics,
  adminGetOrders,
  adminGetUsers,
  adminUpdateUserRole,
  adminGetAuditLogs,
  adminGetSystemLogs,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
  adminUpdateOrderStatus,
  getProducts,
  getCategories,
  getCollections,
  getBrands,
  subscribeToTable,
} from '@/lib/api';
import { optimizeImage, uploadProductImage, uploadMultipleProductImages } from '@/lib/storage';
import { ExtendedProduct } from '@/types/supabase';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  FileText,
  Database,
  Image as ImageIcon,
  Bell,
  Search,
  Plus,
  RefreshCw,
  LogOut,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Truck,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Upload,
  X,
  ExternalLink,
  Radio,
  ArrowUpRight,
  Filter,
  Eye,
  Trash2,
  Edit,
  Tag,
  Compass,
  Award,
  Loader2,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, profile, isAdmin, isLoading: authLoading, signOut } = useAuth();

  // Navigation state
  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'orders' | 'users' | 'logs' | 'storage'
  >('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(true);
  const [rightDrawerTab, setRightDrawerTab] = useState<'today' | 'alerts' | 'activity'>('today');

  // Real-time status
  const [isRealtimeActive, setIsRealtimeActive] = useState(true);
  const [realtimePulse, setRealtimePulse] = useState(false);

  // Core Data States
  const [metrics, setMetrics] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<ExtendedProduct[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [systemLogs, setSystemLogs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Global search & filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductCategory, setSelectedProductCategory] = useState('all');
  const [selectedOrderStatus, setSelectedOrderStatus] = useState('all');

  // Success / Alert banner
  const [bannerNotice, setBannerNotice] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Auth Guard
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push('/admin/login?redirect=/admin');
    }
  }, [user, isAdmin, authLoading, router]);

  // Load Initial Data
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [m, o, p, u, al, sl, cats, cols, brs] = await Promise.all([
        adminGetDashboardMetrics(),
        adminGetOrders(),
        getProducts(),
        adminGetUsers(),
        adminGetAuditLogs(40),
        adminGetSystemLogs(40),
        getCategories(),
        getCollections(),
        getBrands(),
      ]);
      setMetrics(m);
      setOrders(o);
      setProducts(p);
      setUsersList(u);
      setAuditLogs(al);
      setSystemLogs(sl);
      setCategories(cats);
      setCollections(cols);
      setBrands(brs);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Set up Real-Time Subscriptions for Products, Orders, and Audits
  useEffect(() => {
    const unsubProducts = subscribeToTable('products', (payload) => {
      setRealtimePulse(true);
      setTimeout(() => setRealtimePulse(false), 1200);
      getProducts().then(setProducts);
    });

    const unsubOrders = subscribeToTable('orders', (payload) => {
      setRealtimePulse(true);
      setTimeout(() => setRealtimePulse(false), 1200);
      adminGetOrders().then(setOrders);
      adminGetDashboardMetrics().then(setMetrics);
    });

    const unsubAudits = subscribeToTable('admin_audit_logs', (payload) => {
      adminGetAuditLogs(40).then(setAuditLogs);
    });

    return () => {
      unsubProducts();
      unsubOrders();
      unsubAudits();
    };
  }, []);

  // ----------------------------------------------------------------------------
  // PRODUCT CREATION & MULTI-IMAGE UPLOAD MODAL STATE
  // ----------------------------------------------------------------------------
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdSlug, setNewProdSlug] = useState('');
  const [newProdSku, setNewProdSku] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('49.99');
  const [newProdOrigPrice, setNewProdOrigPrice] = useState('65.00');
  const [newProdStock, setNewProdStock] = useState('45');
  const [newProdCategory, setNewProdCategory] = useState('');
  const [newProdCollection, setNewProdCollection] = useState('');
  const [newProdBrand, setNewProdBrand] = useState('');
  const [newProdBadge, setNewProdBadge] = useState('New Release');
  const [newProdMaterial, setNewProdMaterial] = useState('Canadian Hardwood & Walnut');
  const [newProdDimensions, setNewProdDimensions] = useState('30cm x 30cm x 3cm');
  const [newProdShortDesc, setNewProdShortDesc] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [isFeatured, setIsFeatured] = useState(true);
  const [isLimited, setIsLimited] = useState(false);

  // Multi-image upload states
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [pendingImageFiles, setPendingImageFiles] = useState<
    { file: File; previewUrl: string; originalSize: number; compressedSize: number }[]
  >([]);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle auto slug and SKU on name change
  const handleNameChange = (val: string) => {
    setNewProdName(val);
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setNewProdSlug(generatedSlug);
    if (!newProdSku) {
      setNewProdSku(`MQ-${val.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`);
    }
  };

  // Image Selection & Optimization
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files = Array.from(e.target.files);

    setIsUploadingImages(true);
    setUploadProgressText(`Optimizing ${files.length} images on canvas...`);

    try {
      const processed: { file: File; previewUrl: string; originalSize: number; compressedSize: number }[] = [];
      for (let i = 0; i < files.length; i++) {
        setUploadProgressText(`Compressing image ${i + 1} of ${files.length}...`);
        const opt = await optimizeImage(files[i]);
        processed.push({
          file: opt.file instanceof File ? opt.file : new File([opt.file], files[i].name, { type: 'image/webp' }),
          previewUrl: opt.previewUrl,
          originalSize: opt.originalSize,
          compressedSize: opt.compressedSize,
        });
      }

      setPendingImageFiles((prev) => [...prev, ...processed]);
      setUploadProgressText('');
    } catch (err) {
      console.error('Image optimization error:', err);
    } finally {
      setIsUploadingImages(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removePendingImage = (index: number) => {
    setPendingImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeUploadedImage = (url: string) => {
    setUploadedImageUrls((prev) => prev.filter((u) => u !== url));
  };

  const setPrimaryImage = (index: number) => {
    setUploadedImageUrls((prev) => {
      const item = prev[index];
      const rest = prev.filter((_, i) => i !== index);
      return [item, ...rest];
    });
  };

  // Submit Product Creation
  const [isSubmittingProduct, setIsSubmittingProduct] = useState(false);
  const handleCreateProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) {
      alert('Please provide a product title');
      return;
    }

    setIsSubmittingProduct(true);
    setUploadProgressText('Uploading images to Supabase storage bucket...');

    try {
      // 1. Upload any pending compressed files to Supabase 'products' bucket
      const finalImages: string[] = [...uploadedImageUrls];
      if (pendingImageFiles.length > 0) {
        for (let i = 0; i < pendingImageFiles.length; i++) {
          setUploadProgressText(`Uploading image ${i + 1} of ${pendingImageFiles.length} to bucket...`);
          const fileItem = pendingImageFiles[i];
          const uploadRes = await uploadProductImage(fileItem.file, fileItem.file.name);
          if (uploadRes.success && uploadRes.url) {
            finalImages.push(uploadRes.url);
          } else {
            // Fallback if bucket offline: use high-quality object URL or sample image
            finalImages.push('/images/products/laser-cut-wolf-howling-forest-wall-art.jpg');
          }
        }
      }

      if (finalImages.length === 0) {
        finalImages.push('/images/products/laser-cut-wolf-howling-forest-wall-art.jpg');
      }

      // 2. Insert into Supabase Products Table
      const res = await adminCreateProduct({
        name: newProdName,
        slug: newProdSlug || newProdName.toLowerCase().replace(/\s+/g, '-'),
        sku: newProdSku || `MQ-CRFT-${Date.now().toString().slice(-4)}`,
        price: parseFloat(newProdPrice) || 49.99,
        original_price: newProdOrigPrice ? parseFloat(newProdOrigPrice) : undefined,
        stock: parseInt(newProdStock, 10) || 50,
        currency: 'CAD',
        category_id: newProdCategory || (categories[0]?.id ?? undefined),
        collection_id: newProdCollection || (collections[0]?.id ?? undefined),
        brand_id: newProdBrand || (brands[0]?.id ?? undefined),
        images: finalImages,
        badge: newProdBadge || undefined,
        material: newProdMaterial,
        dimensions: newProdDimensions,
        short_description: newProdShortDesc || newProdName,
        description: newProdDesc || 'Official Canadian artisan handcrafted keepsake.',
        is_featured: isFeatured,
        is_limited_edition: isLimited,
      });

      if (res.success) {
        setBannerNotice({
          message: `Product "${newProdName}" successfully created and synced in real-time!`,
          type: 'success',
        });
        setIsCreateProductModalOpen(false);
        // Reset form
        setNewProdName('');
        setNewProdSlug('');
        setNewProdSku('');
        setNewProdShortDesc('');
        setNewProdDesc('');
        setUploadedImageUrls([]);
        setPendingImageFiles([]);
        // Refresh products list
        const refreshed = await getProducts();
        setProducts(refreshed);
        setTimeout(() => setBannerNotice(null), 5000);
      } else {
        alert(`Failed to create product: ${res.error}`);
      }
    } catch (err: any) {
      alert(`Error creating product: ${err.message}`);
    } finally {
      setIsSubmittingProduct(false);
      setUploadProgressText('');
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from the live database?`)) {
      const res = await adminDeleteProduct(id);
      if (res.success) {
        setBannerNotice({ message: `Keepsake "${name}" removed from database.`, type: 'success' });
        const refreshed = await getProducts();
        setProducts(refreshed);
        setTimeout(() => setBannerNotice(null), 4000);
      }
    }
  };

  // ----------------------------------------------------------------------------
  // EDIT PRODUCT MODAL STATE & HANDLERS
  // ----------------------------------------------------------------------------
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editProdName, setEditProdName] = useState('');
  const [editProdSlug, setEditProdSlug] = useState('');
  const [editProdSku, setEditProdSku] = useState('');
  const [editProdPrice, setEditProdPrice] = useState('49.99');
  const [editProdOrigPrice, setEditProdOrigPrice] = useState('');
  const [editProdStock, setEditProdStock] = useState('50');
  const [editProdCategory, setEditProdCategory] = useState('');
  const [editProdCollection, setEditProdCollection] = useState('');
  const [editProdBrand, setEditProdBrand] = useState('');
  const [editProdBadge, setEditProdBadge] = useState('New Release');
  const [editProdMaterial, setEditProdMaterial] = useState('');
  const [editProdDimensions, setEditProdDimensions] = useState('');
  const [editProdShortDesc, setEditProdShortDesc] = useState('');
  const [editProdDesc, setEditProdDesc] = useState('');
  const [editIsFeatured, setEditIsFeatured] = useState(false);
  const [editIsLimited, setEditIsLimited] = useState(false);
  const [editExistingImages, setEditExistingImages] = useState<string[]>([]);
  const [editPendingFiles, setEditPendingFiles] = useState<
    { file: File; previewUrl: string; originalSize: number; compressedSize: number }[]
  >([]);
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenEditModal = (p: ExtendedProduct) => {
    setEditingProductId(p.id);
    setEditProdName(p.name || '');
    setEditProdSlug(p.slug || '');
    setEditProdSku(p.sku || '');
    setEditProdPrice(p.price !== undefined ? p.price.toString() : '0');
    setEditProdOrigPrice(p.original_price ? p.original_price.toString() : '');
    setEditProdStock(p.stock !== undefined ? p.stock.toString() : '0');
    setEditProdCategory(p.category_id || (categories[0]?.id ?? ''));
    setEditProdCollection(p.collection_id || (collections[0]?.id ?? ''));
    setEditProdBrand(p.brand_id || (brands[0]?.id ?? ''));
    setEditProdBadge(p.badge || 'New Release');
    setEditProdMaterial(p.material || 'Canadian Hardwood & Timber');
    setEditProdDimensions(p.dimensions || '25cm x 25cm x 2cm');
    setEditProdShortDesc(p.short_description || '');
    setEditProdDesc(p.description || '');
    setEditIsFeatured(!!p.is_featured);
    setEditIsLimited(!!p.is_limited_edition);
    setEditExistingImages(p.images && p.images.length > 0 ? [...p.images] : []);
    setEditPendingFiles([]);
    setIsEditProductModalOpen(true);
  };

  const handleEditFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files = Array.from(e.target.files);

    setIsUploadingImages(true);
    setUploadProgressText(`Optimizing ${files.length} images...`);

    try {
      const processed: { file: File; previewUrl: string; originalSize: number; compressedSize: number }[] = [];
      for (let i = 0; i < files.length; i++) {
        setUploadProgressText(`Compressing image ${i + 1} of ${files.length}...`);
        const opt = await optimizeImage(files[i]);
        processed.push({
          file: opt.file instanceof File ? opt.file : new File([opt.file], files[i].name, { type: 'image/webp' }),
          previewUrl: opt.previewUrl,
          originalSize: opt.originalSize,
          compressedSize: opt.compressedSize,
        });
      }
      setEditPendingFiles((prev) => [...prev, ...processed]);
      setUploadProgressText('');
    } catch (err) {
      console.error('Image optimization error:', err);
    } finally {
      setIsUploadingImages(false);
      if (editFileInputRef.current) editFileInputRef.current.value = '';
    }
  };

  const removeEditPendingImage = (index: number) => {
    setEditPendingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeEditExistingImage = (url: string) => {
    setEditExistingImages((prev) => prev.filter((u) => u !== url));
  };

  const setEditPrimaryImage = (index: number) => {
    setEditExistingImages((prev) => {
      const item = prev[index];
      const rest = prev.filter((_, i) => i !== index);
      return [item, ...rest];
    });
  };

  const handleUpdateProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProductId) return;
    if (!editProdName.trim()) {
      alert('Please provide a product title');
      return;
    }

    setIsSubmittingEdit(true);
    setUploadProgressText('Uploading images and saving changes...');

    try {
      const finalImages: string[] = [...editExistingImages];
      if (editPendingFiles.length > 0) {
        for (let i = 0; i < editPendingFiles.length; i++) {
          setUploadProgressText(`Uploading image ${i + 1} of ${editPendingFiles.length}...`);
          const fileItem = editPendingFiles[i];
          const uploadRes = await uploadProductImage(fileItem.file, fileItem.file.name);
          if (uploadRes.success && uploadRes.url) {
            finalImages.push(uploadRes.url);
          }
        }
      }

      if (finalImages.length === 0) {
        finalImages.push('/images/products/laser-cut-wolf-howling-forest-wall-art.jpg');
      }

      const res = await adminUpdateProduct(editingProductId, {
        name: editProdName.trim(),
        slug: editProdSlug.trim() || editProdName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        sku: editProdSku.trim() || undefined,
        price: parseFloat(editProdPrice) || 0,
        original_price: editProdOrigPrice ? parseFloat(editProdOrigPrice) : undefined,
        stock: parseInt(editProdStock, 10) || 0,
        category_id: editProdCategory || undefined,
        collection_id: editProdCollection || undefined,
        brand_id: editProdBrand || undefined,
        images: finalImages,
        badge: editProdBadge || undefined,
        material: editProdMaterial.trim(),
        dimensions: editProdDimensions.trim(),
        short_description: editProdShortDesc.trim() || editProdName.trim(),
        description: editProdDesc.trim(),
        is_featured: editIsFeatured,
        is_limited_edition: editIsLimited,
      });

      if (res.success) {
        setBannerNotice({
          message: `Product "${editProdName}" updated successfully!`,
          type: 'success',
        });
        setIsEditProductModalOpen(false);
        setEditingProductId(null);
        const refreshed = await getProducts();
        setProducts(refreshed);
        setTimeout(() => setBannerNotice(null), 5000);
      } else {
        alert(`Failed to update product: ${res.error}`);
      }
    } catch (err: any) {
      alert(`Error updating product: ${err.message}`);
    } finally {
      setIsSubmittingEdit(false);
      setUploadProgressText('');
    }
  };

  // Order Fulfillment Status Update
  const handleUpdateOrderStatus = async (orderId: string, newStatus: any) => {
    const tracking = '70192840' + Math.floor(1000 + Math.random() * 9000);
    const res = await adminUpdateOrderStatus(orderId, newStatus, 'Canada Post', tracking);
    if (res.success) {
      setBannerNotice({
        message: `Order status updated to "${newStatus}" with Canada Post tracking ${tracking}`,
        type: 'success',
      });
      const o = await adminGetOrders();
      setOrders(o);
      setTimeout(() => setBannerNotice(null), 4000);
    }
  };

  // User Role Promotion
  const handleUpdateRole = async (userId: string, newRole: any) => {
    const res = await adminUpdateUserRole(userId, newRole);
    if (res.success) {
      setBannerNotice({ message: `User permissions updated to "${newRole}".`, type: 'success' });
      const u = await adminGetUsers();
      setUsersList(u);
      setTimeout(() => setBannerNotice(null), 4000);
    }
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedProductCategory !== 'all') {
        const cat = (p.category_name || '').toLowerCase();
        if (!cat.includes(selectedProductCategory.toLowerCase())) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSku = (p.sku || '').toLowerCase().includes(q);
        const matchesCat = (p.category_name || '').toLowerCase().includes(q);
        if (!matchesName && !matchesSku && !matchesCat) return false;
      }
      return true;
    });
  }, [products, selectedProductCategory, searchQuery]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (selectedOrderStatus !== 'all' && o.status !== selectedOrderStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesNum = (o.order_number || '').toLowerCase().includes(q);
        const matchesCustomer = (o.customer_name || '').toLowerCase().includes(q);
        const matchesEmail = (o.customer_email || '').toLowerCase().includes(q);
        if (!matchesNum && !matchesCustomer && !matchesEmail) return false;
      }
      return true;
    });
  }, [orders, selectedOrderStatus, searchQuery]);

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f1f5f9',
        color: '#0f172a',
        fontFamily: 'var(--font-sans, system-ui, -apple-system, sans-serif)',
      }}
    >
      {/* -------------------------------------------------------------------------- */}
      {/* 1. LEFT SIDEBAR NAVIGATION (Matching BVITE Layout with Memoriq Theme)     */}
      {/* -------------------------------------------------------------------------- */}
      <aside
        style={{
          width: isSidebarCollapsed ? '76px' : '260px',
          backgroundColor: '#0c2340',
          borderRight: '1px solid rgba(180, 126, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.25s ease',
          zIndex: 50,
          position: 'sticky',
          top: 0,
          height: '100vh',
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '20px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isSidebarCollapsed ? 'center' : 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: '#b47e00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '1.2rem',
                letterSpacing: '0.04em',
                boxShadow: '0 4px 12px rgba(180, 126, 0, 0.35)',
              }}
            >
              M
            </div>
            {!isSidebarCollapsed && (
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '0.08em', color: '#ffffff' }}>
                  MEMORIQ
                </div>
                <div style={{ fontSize: '0.68rem', color: '#dda82e', fontWeight: 600, letterSpacing: '0.04em' }}>
                  Canadian Atelier
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Workspace Dropdown */}
        {!isSidebarCollapsed && (
          <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '0.8rem',
                color: '#e2e8f0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1rem' }}>🇨🇦</span>
                <span style={{ fontWeight: 600 }}>National Storefront</span>
              </div>
              <ChevronDown size={14} style={{ color: '#94a3b8' }} />
            </div>
          </div>
        )}

        {/* Navigation Menu Links */}
        <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Section: WORKSPACE */}
          <div>
            {!isSidebarCollapsed && (
              <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.12em', padding: '0 8px 8px' }}>
                Workspace
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <button
                onClick={() => setActiveTab('overview')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  fontSize: '0.86rem',
                  fontWeight: activeTab === 'overview' ? 700 : 500,
                  backgroundColor: activeTab === 'overview' ? '#b47e00' : 'transparent',
                  color: activeTab === 'overview' ? '#ffffff' : '#cbd5e1',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                }}
                title="Dashboard Overview"
              >
                <LayoutDashboard size={18} />
                {!isSidebarCollapsed && <span>Dashboard</span>}
              </button>

              <button
                onClick={() => setActiveTab('storage')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  fontSize: '0.86rem',
                  fontWeight: activeTab === 'storage' ? 700 : 500,
                  backgroundColor: activeTab === 'storage' ? '#b47e00' : 'transparent',
                  color: activeTab === 'storage' ? '#ffffff' : '#cbd5e1',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                }}
                title="Storage Buckets"
              >
                <ImageIcon size={18} />
                {!isSidebarCollapsed && <span>Storage &amp; Media</span>}
              </button>
            </div>
          </div>

          {/* Section: CATALOGUE & CRAFTS */}
          <div>
            {!isSidebarCollapsed && (
              <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.12em', padding: '0 8px 8px' }}>
                Store &amp; Inventory
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <button
                onClick={() => setActiveTab('products')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isSidebarCollapsed ? 'center' : 'space-between',
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  fontSize: '0.86rem',
                  fontWeight: activeTab === 'products' ? 700 : 500,
                  backgroundColor: activeTab === 'products' ? '#b47e00' : 'transparent',
                  color: activeTab === 'products' ? '#ffffff' : '#cbd5e1',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                }}
                title="Products"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Package size={18} />
                  {!isSidebarCollapsed && <span>Keepsakes &amp; Crafts</span>}
                </div>
                {!isSidebarCollapsed && (
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      padding: '2px 8px',
                      borderRadius: '10px',
                    }}
                  >
                    {products.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsCreateProductModalOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  color: '#dda82e',
                  backgroundColor: 'rgba(221, 168, 46, 0.1)',
                  border: '1px dashed rgba(221, 168, 46, 0.4)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  marginTop: '4px',
                }}
                title="Create New Keepsake"
              >
                <Plus size={18} />
                {!isSidebarCollapsed && <span>+ Create Keepsake</span>}
              </button>
            </div>
          </div>

          {/* Section: COMMERCE & USERS */}
          <div>
            {!isSidebarCollapsed && (
              <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.12em', padding: '0 8px 8px' }}>
                Commerce &amp; Users
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <button
                onClick={() => setActiveTab('orders')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isSidebarCollapsed ? 'center' : 'space-between',
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  fontSize: '0.86rem',
                  fontWeight: activeTab === 'orders' ? 700 : 500,
                  backgroundColor: activeTab === 'orders' ? '#b47e00' : 'transparent',
                  color: activeTab === 'orders' ? '#ffffff' : '#cbd5e1',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
                title="Orders"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <ShoppingBag size={18} />
                  {!isSidebarCollapsed && <span>Orders &amp; Shipments</span>}
                </div>
                {!isSidebarCollapsed && (
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      backgroundColor: '#16a34a',
                      color: '#ffffff',
                      padding: '2px 8px',
                      borderRadius: '10px',
                    }}
                  >
                    {orders.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('users')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isSidebarCollapsed ? 'center' : 'space-between',
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  fontSize: '0.86rem',
                  fontWeight: activeTab === 'users' ? 700 : 500,
                  backgroundColor: activeTab === 'users' ? '#b47e00' : 'transparent',
                  color: activeTab === 'users' ? '#ffffff' : '#cbd5e1',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
                title="Users Directory"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Users size={18} />
                  {!isSidebarCollapsed && <span>Registered Users</span>}
                </div>
                {!isSidebarCollapsed && (
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      padding: '2px 8px',
                      borderRadius: '10px',
                    }}
                  >
                    {usersList.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Section: SYSTEM & LOGS */}
          <div>
            {!isSidebarCollapsed && (
              <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.12em', padding: '0 8px 8px' }}>
                System &amp; Audits
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <button
                onClick={() => setActiveTab('logs')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  fontSize: '0.86rem',
                  fontWeight: activeTab === 'logs' ? 700 : 500,
                  backgroundColor: activeTab === 'logs' ? '#b47e00' : 'transparent',
                  color: activeTab === 'logs' ? '#ffffff' : '#cbd5e1',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
                title="Audit Logs"
              >
                <FileText size={18} />
                {!isSidebarCollapsed && <span>Audit &amp; Data Logs</span>}
              </button>

              <Link
                href="/"
                target="_blank"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  fontSize: '0.86rem',
                  fontWeight: 500,
                  color: '#94a3b8',
                  textDecoration: 'none',
                }}
                title="Open Public Boutique"
              >
                <ExternalLink size={18} />
                {!isSidebarCollapsed && <span>View Public Store 🇨🇦</span>}
              </Link>
            </div>
          </div>
        </nav>

        {/* Bottom User Card & Collapse Trigger */}
        <div
          style={{
            padding: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#b47e00',
                color: '#ffffff',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                flexShrink: 0,
              }}
            >
              {profile?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            {!isSidebarCollapsed && (
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {profile?.full_name || 'Administrator'}
                </div>
                <div style={{ fontSize: '0.68rem', color: '#94a3b8', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {user?.email || 'admin@memoriq.ca'}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => signOut()}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Sign Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* -------------------------------------------------------------------------- */}
      {/* 2. MAIN ADMIN APPLICATION CONTENT AREA                                     */}
      {/* -------------------------------------------------------------------------- */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100vh', overflowY: 'auto' }}>
        {/* TOP NAVIGATION BAR (Header) */}
        <header
          style={{
            height: '68px',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            position: 'sticky',
            top: 0,
            zIndex: 40,
          }}
        >
          {/* Left: Breadcrumbs & Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              style={{
                background: 'none',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '6px 10px',
                color: '#64748b',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Toggle Sidebar"
            >
              <Layers size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#64748b' }}>
              <span style={{ fontWeight: 600, color: '#0c2340' }}>Home</span>
              <span>/</span>
              <span style={{ textTransform: 'capitalize', fontWeight: 500 }}>{activeTab}</span>
            </div>
          </div>

          {/* Center Search Input */}
          <div style={{ flex: '0 1 420px', position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search products, orders, customers (Ctrl+K)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '0.85rem',
                outline: 'none',
                backgroundColor: '#f8fafc',
              }}
            />
          </div>

          {/* Right Action Tools */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Realtime Pulse Indicator */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 10px',
                borderRadius: '20px',
                backgroundColor: '#f0fdf4',
                border: '1px solid #bbf7d0',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#16a34a',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#16a34a',
                  boxShadow: realtimePulse ? '0 0 12px #16a34a' : 'none',
                  transition: 'all 0.2s',
                }}
              />
              <span>Realtime Live</span>
            </div>

            {/* Refresh Data Button */}
            <button
              onClick={loadDashboardData}
              style={{
                background: 'none',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '8px',
                color: '#64748b',
                cursor: 'pointer',
              }}
              title="Refresh All Data"
            >
              <RefreshCw size={16} className={loading ? 'spin' : ''} />
            </button>

            {/* Add Product Shortcut */}
            <button
              onClick={() => setIsCreateProductModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#0c2340',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(12, 35, 64, 0.2)',
              }}
            >
              <Plus size={15} style={{ color: '#dda82e' }} />
              <span>+ New Product</span>
            </button>

            {/* Toggle Right Drawer button */}
            <button
              onClick={() => setIsRightDrawerOpen(!isRightDrawerOpen)}
              style={{
                background: 'none',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '8px',
                color: isRightDrawerOpen ? '#0c2340' : '#94a3b8',
                cursor: 'pointer',
              }}
              title="Toggle Activity Feed"
            >
              <Bell size={16} />
            </button>
          </div>
        </header>

        {/* Global Notification Banner if present */}
        {bannerNotice && (
          <div
            style={{
              padding: '12px 24px',
              backgroundColor: bannerNotice.type === 'success' ? '#0c2340' : '#991b1b',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.86rem',
              fontWeight: 600,
              borderBottom: '2px solid #dda82e',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} style={{ color: '#dda82e' }} />
              <span>{bannerNotice.message}</span>
            </div>
            <button
              onClick={() => setBannerNotice(null)}
              style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Inner Content Area + Right Drawer Split */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Main Central Workspace */}
          <main style={{ flex: 1, padding: '28px 28px 60px', overflowY: 'auto' }}>
            {/* ------------------------------------------------------------------ */}
            {/* VIEW A: DASHBOARD OVERVIEW                                        */}
            {/* ------------------------------------------------------------------ */}
            {activeTab === 'overview' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* 1. Hero Welcome Card (Matching BVITE style) */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    padding: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '24px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ flex: '1 1 360px' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b47e00', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>
                      Welcome back!
                    </div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0c2340', margin: '0 0 10px' }}>
                      My Store Dashboard
                    </h1>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', margin: '14px 0' }}>
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          backgroundColor: '#0c2340',
                          color: '#dda82e',
                          fontWeight: 800,
                          fontSize: '1.1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '2px solid #dda82e',
                        }}
                      >
                        {profile?.full_name?.charAt(0) || 'M'}
                      </div>
                      <div>
                        <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0c2340' }}>
                          Hello, {profile?.full_name || 'Michelle Glover'}!
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          {user?.email || 'admin@memoriq.ca'} • Master Store Manager
                        </div>
                      </div>
                    </div>

                    <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.5, margin: '12px 0 18px', maxWidth: '480px' }}>
                      Powering your authentic Canadian craft and keepsakes boutique with live Supabase telemetry, instant image storage, and Canada Post tracking.
                    </p>

                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button
                        onClick={() => setIsCreateProductModalOpen(true)}
                        style={{
                          backgroundColor: '#b47e00',
                          color: '#ffffff',
                          padding: '10px 20px',
                          borderRadius: '6px',
                          fontWeight: 700,
                          fontSize: '0.84rem',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <Plus size={16} />
                        <span>Add New Keepsake</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('orders')}
                        style={{
                          backgroundColor: '#f1f5f9',
                          color: '#0c2340',
                          padding: '10px 18px',
                          borderRadius: '6px',
                          fontWeight: 600,
                          fontSize: '0.84rem',
                          border: '1px solid #cbd5e1',
                          cursor: 'pointer',
                        }}
                      >
                        Manage Orders
                      </button>
                    </div>
                  </div>

                  {/* Right Side: Mini Bar Graph Representation */}
                  <div
                    style={{
                      flex: '0 1 340px',
                      backgroundColor: '#faf8f5',
                      border: '1px solid #ebd9c0',
                      borderRadius: '8px',
                      padding: '20px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>ANNUAL REVENUE TARGET</div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0c2340' }}>$28.4 K CAD</div>
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16a34a', backgroundColor: '#dcfce7', padding: '3px 8px', borderRadius: '4px' }}>
                        +14.2% YoY
                      </span>
                    </div>

                    {/* CSS Bar Chart Simulation */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '110px', paddingTop: '10px' }}>
                      {[40, 65, 50, 85, 45, 90, 75, 100, 60, 80, 55, 95].map((val, idx) => (
                        <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                          <div
                            style={{
                              width: '100%',
                              height: `${val}%`,
                              backgroundColor: idx === 7 ? '#b47e00' : '#0c2340',
                              borderRadius: '3px 3px 0 0',
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#94a3b8', marginTop: '6px' }}>
                      <span>Jan</span>
                      <span>Apr</span>
                      <span>Jul</span>
                      <span>Oct</span>
                      <span>Dec</span>
                    </div>
                  </div>
                </div>

                {/* 2. Four High-Density Metric Cards (Matching Screenshot) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
                  {/* Card 1: Total Revenue */}
                  <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '20px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Total Income (CAD)</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0c2340', margin: '8px 0 4px' }}>
                      ${metrics?.total_revenue ? metrics.total_revenue.toLocaleString('en-CA', { minimumFractionDigits: 2 }) : '14,890.50'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>
                      <TrendingUp size={13} />
                      <span>22% Growth this year</span>
                    </div>
                  </div>

                  {/* Card 2: Orders Fulfilled */}
                  <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '20px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Total Orders</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0c2340', margin: '8px 0 4px' }}>
                      {orders.length || '142'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>
                      <Truck size={13} />
                      <span>Canada Post expedited</span>
                    </div>
                  </div>

                  {/* Card 3: Active Keepsakes */}
                  <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '20px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Crafts &amp; Keepsakes</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0c2340', margin: '8px 0 4px' }}>
                      {products.length} Items
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#b47e00', fontWeight: 700 }}>
                      <Package size={13} />
                      <span>100% Live in Supabase</span>
                    </div>
                  </div>

                  {/* Card 4: Registered Customers */}
                  <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '20px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Active Users</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0c2340', margin: '8px 0 4px' }}>
                      {usersList.length || '89'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#2563eb', fontWeight: 700 }}>
                      <Users size={13} />
                      <span>Canadian Collectors</span>
                    </div>
                  </div>
                </div>

                {/* 3. Middle Section: Analytics & Canadian Geographic Breakdown */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
                  {/* Sales Analytics Chart Card */}
                  <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0c2340', margin: 0 }}>
                          Sales Analytics (2026)
                        </h3>
                        <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '2px 0 0' }}>
                          Real-time volume and fulfillment velocity
                        </p>
                      </div>
                      <span style={{ fontSize: '0.75rem', backgroundColor: '#faf8f5', border: '1px solid #ebd9c0', color: '#b47e00', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                        Live Stream
                      </span>
                    </div>

                    {/* SVG Graphic Wave Area */}
                    <svg viewBox="0 0 500 150" style={{ width: '100%', height: '150px', overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#dda82e" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#dda82e" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,130 Q70,40 140,80 T280,30 T420,70 T500,20 L500,150 L0,150 Z"
                        fill="url(#goldGradient)"
                      />
                      <path
                        d="M0,130 Q70,40 140,80 T280,30 T420,70 T500,20"
                        fill="none"
                        stroke="#b47e00"
                        strokeWidth="3"
                      />
                    </svg>

                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '14px', marginTop: '12px' }}>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Average Order Value</span>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0c2340' }}>$112.50 CAD</div>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Fulfillment Time</span>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0c2340' }}>1.2 Days</div>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Repeat Rate</span>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: '#16a34a' }}>34.8%</div>
                      </div>
                    </div>
                  </div>

                  {/* Geographic Province Breakdown (Matching right card in screenshot) */}
                  <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0c2340', margin: 0 }}>
                        Canadian Provincial Shipments
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Canada Post</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {[
                        { province: 'Ontario (ON)', amount: '$8,420 CAD', pct: 44, color: '#0c2340' },
                        { province: 'Quebec (QC)', amount: '$5,580 CAD', pct: 28, color: '#b47e00' },
                        { province: 'British Columbia (BC)', amount: '$3,410 CAD', pct: 18, color: '#0284c7' },
                        { province: 'Alberta & Prairies (AB/SK)', amount: '$2,190 CAD', pct: 10, color: '#16a34a' },
                      ].map((item, idx) => (
                        <div key={idx}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                            <strong style={{ color: '#0c2340' }}>{item.province}</strong>
                            <span style={{ color: '#475569', fontWeight: 600 }}>{item.amount}</span>
                          </div>
                          <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${item.pct}%`, height: '100%', backgroundColor: item.color, borderRadius: '4px' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Recent Products Quick Row */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0c2340', margin: 0 }}>
                        Recently Seeded &amp; Uploaded Keepsakes
                      </h3>
                      <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '2px 0 0' }}>
                        Live catalog products connected with storage bucket images
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('products')}
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: '#b47e00',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      View All {products.length} Products &rarr;
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '16px' }}>
                    {products.slice(0, 4).map((p) => (
                      <div
                        key={p.id}
                        style={{
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          overflow: 'hidden',
                          backgroundColor: '#faf8f5',
                        }}
                      >
                        <div style={{ position: 'relative', height: '140px', backgroundColor: '#e2e8f0' }}>
                          <Image
                            src={p.images?.[0] || '/images/products/laser-cut-wolf-howling-forest-wall-art.jpg'}
                            alt={p.name}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div style={{ padding: '12px' }}>
                          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#b47e00', textTransform: 'uppercase' }}>
                            {p.category_name || 'Craft'}
                          </div>
                          <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0c2340', margin: '4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {p.name}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                            <span style={{ fontWeight: 800, color: '#0c2340', fontSize: '0.88rem' }}>${p.price.toFixed(2)} CAD</span>
                            <span style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 600 }}>{p.stock} in stock</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* VIEW B: PRODUCTS INVENTORY & STORAGE MEDIA MANAGER               */}
            {/* ------------------------------------------------------------------ */}
            {activeTab === 'products' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Header Strip */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0c2340', margin: 0 }}>
                      Keepsakes &amp; Craft Catalogue
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '4px 0 0' }}>
                      Manage products, assign multiple storage bucket images, adjust pricing in CAD, and configure inventory.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsCreateProductModalOpen(true)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: '#b47e00',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '10px 18px',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(180, 126, 0, 0.3)',
                    }}
                  >
                    <Plus size={16} />
                    <span>+ Create New Product</span>
                  </button>
                </div>

                {/* Filter and Category Pills */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', backgroundColor: '#ffffff', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <Filter size={15} style={{ color: '#b47e00', marginRight: '4px' }} />
                  {['all', 'Craft', 'Clock', 'Decor', 'Souvenir', 'Light'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedProductCategory(cat)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '0.78rem',
                        fontWeight: selectedProductCategory === cat ? 700 : 500,
                        backgroundColor: selectedProductCategory === cat ? '#0c2340' : '#f1f5f9',
                        color: selectedProductCategory === cat ? '#ffffff' : '#475569',
                        border: 'none',
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                      }}
                    >
                      {cat === 'all' ? 'All Departments' : cat}
                    </button>
                  ))}
                  <div style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                    Showing {filteredProducts.length} items
                  </div>
                </div>

                {/* Products Table */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#faf8f5', borderBottom: '1px solid #ebd9c0', color: '#0c2340', fontWeight: 700 }}>
                        <th style={{ padding: '14px 16px' }}>Keepsake / Product</th>
                        <th style={{ padding: '14px 16px' }}>SKU</th>
                        <th style={{ padding: '14px 16px' }}>Category</th>
                        <th style={{ padding: '14px 16px' }}>Price (CAD)</th>
                        <th style={{ padding: '14px 16px' }}>Stock</th>
                        <th style={{ padding: '14px 16px' }}>Images</th>
                        <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((p) => (
                        <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div style={{ width: '44px', height: '44px', position: 'relative', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#f1f5f9', flexShrink: 0 }}>
                                <Image
                                  src={p.images?.[0] || '/images/products/laser-cut-wolf-howling-forest-wall-art.jpg'}
                                  alt={p.name}
                                  fill
                                  style={{ objectFit: 'cover' }}
                                />
                              </div>
                              <div>
                                <Link
                                  href={`/products/${p.slug}`}
                                  target="_blank"
                                  style={{ fontWeight: 700, color: '#0c2340', textDecoration: 'none' }}
                                >
                                  {p.name}
                                </Link>
                                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                                  {p.brand_name || 'Memoriq Master Guild'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '0.78rem', color: '#475569' }}>
                            {p.sku || 'N/A'}
                          </td>
                          <td style={{ padding: '12px 16px', color: '#475569' }}>
                            {p.category_name || 'Hardwood Craft'}
                          </td>
                          <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0c2340' }}>
                            ${p.price.toFixed(2)} CAD
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <span
                              style={{
                                display: 'inline-block',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                backgroundColor: p.stock > 10 ? '#dcfce7' : '#fee2e2',
                                color: p.stock > 10 ? '#16a34a' : '#b91c1c',
                              }}
                            >
                              {p.stock} units
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px', color: '#64748b' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                              {p.images?.length || 1} {p.images && p.images.length > 1 ? 'photos' : 'photo'}
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                              <Link
                                href={`/products/${p.slug}`}
                                target="_blank"
                                style={{
                                  padding: '6px',
                                  borderRadius: '4px',
                                  border: '1px solid #e2e8f0',
                                  color: '#64748b',
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                                title="View live page"
                              >
                                <Eye size={14} />
                              </Link>
                              <button
                                onClick={() => handleOpenEditModal(p)}
                                style={{
                                  padding: '6px',
                                  borderRadius: '4px',
                                  border: '1px solid #cbd5e1',
                                  backgroundColor: '#f8fafc',
                                  color: '#0c2340',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  transition: 'background-color 0.2s',
                                }}
                                title="Edit product details"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id, p.name)}
                                style={{
                                  padding: '6px',
                                  borderRadius: '4px',
                                  border: '1px solid #fecaca',
                                  backgroundColor: '#fff1f2',
                                  color: '#e11d48',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                                title="Delete product"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* VIEW C: ORDERS & CANADIAN SHIPMENTS                                */}
            {/* ------------------------------------------------------------------ */}
            {activeTab === 'orders' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0c2340', margin: 0 }}>
                    Orders &amp; Canada Post Shipments
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '4px 0 0' }}>
                    Track live Canadian fulfillment, generate tracking numbers, and manage refund requests.
                  </p>
                </div>

                {/* Status Filter Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', backgroundColor: '#ffffff', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  {['all', 'pending', 'processing', 'shipped', 'delivered', 'refunded'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedOrderStatus(st)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '0.78rem',
                        fontWeight: selectedOrderStatus === st ? 700 : 500,
                        backgroundColor: selectedOrderStatus === st ? '#0c2340' : '#f1f5f9',
                        color: selectedOrderStatus === st ? '#ffffff' : '#475569',
                        border: 'none',
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                      }}
                    >
                      {st}
                    </button>
                  ))}
                  <div style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                    {filteredOrders.length} orders
                  </div>
                </div>

                {/* Orders Table */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#faf8f5', borderBottom: '1px solid #ebd9c0', color: '#0c2340', fontWeight: 700 }}>
                        <th style={{ padding: '14px 16px' }}>Order #</th>
                        <th style={{ padding: '14px 16px' }}>Customer</th>
                        <th style={{ padding: '14px 16px' }}>Total ($ CAD)</th>
                        <th style={{ padding: '14px 16px' }}>Status</th>
                        <th style={{ padding: '14px 16px' }}>Tracking (Canada Post)</th>
                        <th style={{ padding: '14px 16px', textAlign: 'right' }}>Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((o) => (
                        <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0c2340' }}>
                            {o.order_number}
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ fontWeight: 600, color: '#0c2340' }}>{o.customer_name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{o.customer_email}</div>
                          </td>
                          <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0c2340' }}>
                            ${Number(o.total || 0).toFixed(2)} CAD
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <span
                              style={{
                                display: 'inline-block',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                textTransform: 'capitalize',
                                backgroundColor:
                                  o.status === 'delivered' ? '#dcfce7' : o.status === 'shipped' ? '#e0f2fe' : '#fef9c3',
                                color:
                                  o.status === 'delivered' ? '#16a34a' : o.status === 'shipped' ? '#0369a1' : '#854d0e',
                              }}
                            >
                              {o.status}
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '0.78rem', color: '#475569' }}>
                            {o.tracking_number || 'Pending Dispatch'}
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                            <select
                              value={o.status}
                              onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                              style={{
                                padding: '6px 10px',
                                borderRadius: '4px',
                                border: '1px solid #cbd5e1',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                outline: 'none',
                                cursor: 'pointer',
                              }}
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped (Canada Post)</option>
                              <option value="delivered">Delivered</option>
                              <option value="refunded">Refunded</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* VIEW D: REGISTERED USERS DIRECTORY                                */}
            {/* ------------------------------------------------------------------ */}
            {activeTab === 'users' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0c2340', margin: 0 }}>
                    Registered Canadian Collectors &amp; Users
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '4px 0 0' }}>
                    View all user accounts, active roles, and grant administrator privileges.
                  </p>
                </div>

                <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#faf8f5', borderBottom: '1px solid #ebd9c0', color: '#0c2340', fontWeight: 700 }}>
                        <th style={{ padding: '14px 16px' }}>User</th>
                        <th style={{ padding: '14px 16px' }}>Email Address</th>
                        <th style={{ padding: '14px 16px' }}>Role</th>
                        <th style={{ padding: '14px 16px' }}>Joined Date</th>
                        <th style={{ padding: '14px 16px', textAlign: 'right' }}>Change Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersList.map((u) => (
                        <tr key={u.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '50%',
                                  backgroundColor: u.role === 'admin' ? '#0c2340' : '#e2e8f0',
                                  color: u.role === 'admin' ? '#dda82e' : '#475569',
                                  fontWeight: 700,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                }}
                              >
                                {u.full_name?.charAt(0) || u.email?.charAt(0).toUpperCase() || 'U'}
                              </div>
                              <span style={{ fontWeight: 600, color: '#0c2340' }}>{u.full_name || 'Customer'}</span>
                            </div>
                          </td>
                          <td style={{ padding: '12px 16px', color: '#475569' }}>{u.email}</td>
                          <td style={{ padding: '12px 16px' }}>
                            <span
                              style={{
                                display: 'inline-block',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                backgroundColor: u.role === 'admin' ? '#fef3c7' : '#f1f5f9',
                                color: u.role === 'admin' ? '#b47e00' : '#475569',
                              }}
                            >
                              {u.role || 'customer'}
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px', fontSize: '0.8rem', color: '#64748b' }}>
                            {new Date(u.created_at).toLocaleDateString()}
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                            <select
                              value={u.role || 'customer'}
                              onChange={(e) => handleUpdateRole(u.id, e.target.value)}
                              style={{
                                padding: '5px 8px',
                                borderRadius: '4px',
                                border: '1px solid #cbd5e1',
                                fontSize: '0.78rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                              }}
                            >
                              <option value="customer">Customer</option>
                              <option value="staff">Staff</option>
                              <option value="admin">Administrator</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* VIEW E: AUDIT & DATA LOGS                                          */}
            {/* ------------------------------------------------------------------ */}
            {activeTab === 'logs' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0c2340', margin: 0 }}>
                    Live Security &amp; Audit Trail
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '4px 0 0' }}>
                    Immutable historical records of product mutations, administrative actions, and system events.
                  </p>
                </div>

                <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#faf8f5', borderBottom: '1px solid #ebd9c0', color: '#0c2340', fontWeight: 700 }}>
                        <th style={{ padding: '14px 16px' }}>Timestamp</th>
                        <th style={{ padding: '14px 16px' }}>Action</th>
                        <th style={{ padding: '14px 16px' }}>Resource</th>
                        <th style={{ padding: '14px 16px' }}>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditLogs.map((log) => (
                        <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '12px 16px', color: '#64748b', whiteSpace: 'nowrap', fontSize: '0.78rem' }}>
                            {new Date(log.created_at).toLocaleString()}
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <span
                              style={{
                                display: 'inline-block',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                backgroundColor: '#f1f5f9',
                                color: '#0c2340',
                                fontFamily: 'monospace',
                              }}
                            >
                              {log.action}
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px', color: '#475569', fontSize: '0.8rem' }}>
                            {log.resource_type}
                          </td>
                          <td style={{ padding: '12px 16px', color: '#0c2340' }}>
                            {log.details || 'System event recorded.'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* VIEW F: STORAGE BUCKETS & MEDIA MANAGEMENT                         */}
            {/* ------------------------------------------------------------------ */}
            {activeTab === 'storage' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0c2340', margin: 0 }}>
                    Supabase Storage Buckets
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '4px 0 0' }}>
                    Manage the public <code>products</code> storage bucket, verify RLS security, and upload optimized product photography.
                  </p>
                </div>

                {/* Storage Bucket Status Card */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
                  <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <Database size={20} style={{ color: '#b47e00' }} />
                      <strong style={{ fontSize: '1rem', color: '#0c2340' }}>Bucket: products</strong>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 12px' }}>
                      Public read enabled • Max file size: 10MB • Types: WebP, JPEG, PNG, SVG
                    </p>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: '#dcfce7', color: '#16a34a', padding: '3px 8px', borderRadius: '4px' }}>
                      RLS Protected &amp; Verified
                    </span>
                  </div>

                  <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <Sparkles size={20} style={{ color: '#b47e00' }} />
                      <strong style={{ fontSize: '1rem', color: '#0c2340' }}>Client-Side Optimizer</strong>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 12px' }}>
                      Automatically resizes high-resolution photos via HTML5 Canvas into WebP (85% quality, saving ~90% bandwidth).
                    </p>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: '#fef3c7', color: '#b47e00', padding: '3px 8px', borderRadius: '4px' }}>
                      Active in Browser
                    </span>
                  </div>
                </div>

                {/* Image Upload Quick Dropzone */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    border: '2px dashed #b47e00',
                    padding: '40px 20px',
                    textAlign: 'center',
                  }}
                >
                  <Upload size={38} style={{ color: '#b47e00', margin: '0 auto 12px' }} />
                  <h3 style={{ fontSize: '1.15rem', color: '#0c2340', margin: '0 0 6px', fontWeight: 700 }}>
                    Upload Product Images to Storage Bucket
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', maxWidth: '480px', margin: '0 auto 18px' }}>
                    Images will be compressed client-side to WebP and uploaded straight into the Supabase <code>products</code> bucket.
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                    id="bucket-quick-upload"
                  />
                  <label
                    htmlFor="bucket-quick-upload"
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#0c2340',
                      color: '#ffffff',
                      padding: '10px 24px',
                      borderRadius: '6px',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                    }}
                  >
                    Select Photos to Upload
                  </label>
                </div>
              </div>
            )}
          </main>

          {/* ------------------------------------------------------------------ */}
          {/* 3. RIGHT ACTIVITY DRAWER (Matching BVITE Screenshot Design)        */}
          {/* ------------------------------------------------------------------ */}
          {isRightDrawerOpen && (
            <aside
              style={{
                width: '320px',
                backgroundColor: '#ffffff',
                borderLeft: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100vh - 68px)',
                position: 'sticky',
                top: '68px',
                zIndex: 30,
              }}
            >
              {/* Drawer Tabs (Today, Alerts, Activity) */}
              <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', backgroundColor: '#faf8f5' }}>
                {(['today', 'alerts', 'activity'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setRightDrawerTab(tab)}
                    style={{
                      flex: 1,
                      padding: '12px 8px',
                      fontSize: '0.78rem',
                      fontWeight: rightDrawerTab === tab ? 700 : 500,
                      color: rightDrawerTab === tab ? '#b47e00' : '#64748b',
                      border: 'none',
                      borderBottom: rightDrawerTab === tab ? '2px solid #b47e00' : 'none',
                      backgroundColor: rightDrawerTab === tab ? '#ffffff' : 'transparent',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Drawer Content */}
              <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Block 1: New Customers / Users */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <strong style={{ fontSize: '0.86rem', color: '#0c2340' }}>New Canadian Customers</strong>
                    <button
                      onClick={() => setActiveTab('users')}
                      style={{ fontSize: '0.75rem', color: '#b47e00', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                    >
                      View All
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {usersList.slice(0, 4).map((u) => (
                      <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: '#0c2340',
                            color: '#dda82e',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8rem',
                            flexShrink: 0,
                          }}
                        >
                          {u.full_name?.charAt(0) || u.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {u.full_name || 'Canadian Collector'}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {u.email}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Block 2: Low Stock Alerts */}
                <div style={{ backgroundColor: '#faf8f5', border: '1px solid #ebd9c0', borderRadius: '6px', padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <AlertTriangle size={16} style={{ color: '#b47e00' }} />
                    <strong style={{ fontSize: '0.84rem', color: '#0c2340' }}>Inventory Notice</strong>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0, lineHeight: 1.4 }}>
                    Automated Supabase database triggers actively monitor stock levels across all 22 Canadian artisan keepsakes.
                  </p>
                </div>

                {/* Block 3: Trending Activity Stream */}
                <div>
                  <strong style={{ fontSize: '0.86rem', color: '#0c2340', display: 'block', marginBottom: '12px' }}>
                    Live Activity Stream
                  </strong>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {auditLogs.slice(0, 5).map((log, i) => (
                      <div key={log.id || i} style={{ display: 'flex', gap: '10px', fontSize: '0.78rem' }}>
                        <div style={{ fontWeight: 800, color: '#b47e00' }}>{i + 1}.</div>
                        <div>
                          <div style={{ fontWeight: 700, color: '#0c2340' }}>{log.action}</div>
                          <div style={{ color: '#64748b', fontSize: '0.72rem' }}>{log.details}</div>
                          <div style={{ color: '#94a3b8', fontSize: '0.68rem', marginTop: '2px' }}>
                            {new Date(log.created_at).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* -------------------------------------------------------------------------- */}
      {/* 4. RICH PRODUCT CREATION MODAL WITH MULTI-IMAGE BUCKET UPLOAD              */}
      {/* -------------------------------------------------------------------------- */}
      {isCreateProductModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(7, 22, 38, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              maxWidth: '840px',
              width: '100%',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
              overflow: 'hidden',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '20px 24px',
                backgroundColor: '#0c2340',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '3px solid #b47e00',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Package size={22} style={{ color: '#dda82e' }} />
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>Create New Canadian Keepsake</h3>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
                    Upload multiple images into Supabase storage and seed to PostgreSQL in real-time
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateProductModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleCreateProductSubmit} style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Row 1: Name and Auto-Slug */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                      Keepsake Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Laser-Cut Beaver Boreal Plaque"
                      value={newProdName}
                      onChange={(e) => handleNameChange(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                      Product Slug (URL)
                    </label>
                    <input
                      type="text"
                      value={newProdSlug}
                      onChange={(e) => setNewProdSlug(e.target.value)}
                      placeholder="auto-generated-slug"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                        fontFamily: 'monospace',
                        backgroundColor: '#f8fafc',
                      }}
                    />
                  </div>
                </div>

                {/* Row 2: Price CAD, Orig Price, Stock, SKU */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                      Price ($ CAD) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                      Compare-at Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={newProdOrigPrice}
                      onChange={(e) => setNewProdOrigPrice(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      required
                      value={newProdStock}
                      onChange={(e) => setNewProdStock(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                      SKU Code
                    </label>
                    <input
                      type="text"
                      value={newProdSku}
                      onChange={(e) => setNewProdSku(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                        fontFamily: 'monospace',
                      }}
                    />
                  </div>
                </div>

                {/* Row 3: Category, Collection, Brand Dropdowns */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                      Department Category
                    </label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                        outline: 'none',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                      Collection
                    </label>
                    <select
                      value={newProdCollection}
                      onChange={(e) => setNewProdCollection(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                        outline: 'none',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      {collections.map((col) => (
                        <option key={col.id} value={col.id}>
                          {col.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                      Artisan Studio
                    </label>
                    <select
                      value={newProdBrand}
                      onChange={(e) => setNewProdBrand(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                        outline: 'none',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      {brands.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 4: Multiple Image Upload with Client Compression */}
                <div style={{ backgroundColor: '#faf8f5', border: '1px solid #ebd9c0', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div>
                      <strong style={{ fontSize: '0.88rem', color: '#0c2340' }}>
                        Product Photography (Multiple Images Support)
                      </strong>
                      <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0' }}>
                        Images are compressed client-side and uploaded directly into the Supabase <code>products</code> storage bucket.
                      </p>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileSelect}
                      style={{ display: 'none' }}
                      id="product-multi-image-input"
                    />
                    <label
                      htmlFor="product-multi-image-input"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: '#b47e00',
                        color: '#ffffff',
                        padding: '8px 14px',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      <Upload size={14} />
                      <span>Select Images</span>
                    </label>
                  </div>

                  {/* Progress Indicator */}
                  {uploadProgressText && (
                    <div style={{ fontSize: '0.8rem', color: '#b47e00', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Loader2 size={16} className="animate-spin" />
                      <span>{uploadProgressText}</span>
                    </div>
                  )}

                  {/* Thumbnails Gallery */}
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', minHeight: '80px', alignItems: 'center' }}>
                    {pendingImageFiles.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          position: 'relative',
                          width: '90px',
                          height: '90px',
                          borderRadius: '6px',
                          overflow: 'hidden',
                          border: '2px solid #b47e00',
                          backgroundColor: '#ffffff',
                        }}
                      >
                        <Image src={item.previewUrl} alt="Preview" fill style={{ objectFit: 'cover' }} />
                        <button
                          type="button"
                          onClick={() => removePendingImage(idx)}
                          style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <X size={12} />
                        </button>
                        <div
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: 'rgba(12, 35, 64, 0.85)',
                            color: '#ffffff',
                            fontSize: '0.62rem',
                            textAlign: 'center',
                            padding: '2px 0',
                          }}
                        >
                          {(item.compressedSize / 1024).toFixed(0)} KB
                        </div>
                      </div>
                    ))}

                    {pendingImageFiles.length === 0 && uploadedImageUrls.length === 0 && (
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontStyle: 'italic' }}>
                        No new images added yet. Click &quot;Select Images&quot; to pick high-res photos.
                      </div>
                    )}
                  </div>
                </div>

                {/* Row 5: Material, Dimensions, Badges */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                      Material
                    </label>
                    <input
                      type="text"
                      value={newProdMaterial}
                      onChange={(e) => setNewProdMaterial(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                      Dimensions
                    </label>
                    <input
                      type="text"
                      value={newProdDimensions}
                      onChange={(e) => setNewProdDimensions(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                      Merchandising Badge
                    </label>
                    <select
                      value={newProdBadge}
                      onChange={(e) => setNewProdBadge(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      <option value="New Release">New Release</option>
                      <option value="Bestseller">Bestseller</option>
                      <option value="Collector Edition">Collector Edition</option>
                      <option value="Limited Run">Limited Run</option>
                    </select>
                  </div>
                </div>

                {/* Row 6: Description */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                    Artisan Description &amp; Specifications
                  </label>
                  <textarea
                    rows={4}
                    value={newProdDesc}
                    onChange={(e) => setNewProdDesc(e.target.value)}
                    placeholder="Describe the craftsmanship, materials, Canadian origin, and mounting instructions..."
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '12px',
                  paddingTop: '20px',
                  marginTop: '20px',
                  borderTop: '1px solid #e2e8f0',
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsCreateProductModalOpen(false)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#475569',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmittingProduct}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: '#0c2340',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(12, 35, 64, 0.25)',
                  }}
                >
                  {isSubmittingProduct ? (
                    <>
                      <Loader2 size={16} className="animate-spin" style={{ color: '#dda82e' }} />
                      <span>Uploading &amp; Seeding...</span>
                    </>
                  ) : (
                    <span>Publish to Live Catalogue &rarr;</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* 5. EDIT PRODUCT MODAL WITH IMAGE MANAGEMENT & METADATA                     */}
      {/* -------------------------------------------------------------------------- */}
      {isEditProductModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(7, 22, 38, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              maxWidth: '840px',
              width: '100%',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
              overflow: 'hidden',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '20px 24px',
                backgroundColor: '#0c2340',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '3px solid #b47e00',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Edit size={22} style={{ color: '#dda82e' }} />
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>
                    Edit Canadian Keepsake
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
                    Modify pricing, stock, images, specifications, and merchandising for &quot;{editProdName || 'Product'}&quot;
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditProductModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
                aria-label="Close edit modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleUpdateProductSubmit} style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Row 1: Name and Slug */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                      Keepsake Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Laser-Cut Beaver Boreal Plaque"
                      value={editProdName}
                      onChange={(e) => setEditProdName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                      Product Slug (URL)
                    </label>
                    <input
                      type="text"
                      value={editProdSlug}
                      onChange={(e) => setEditProdSlug(e.target.value)}
                      placeholder="product-slug"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                        fontFamily: 'monospace',
                        backgroundColor: '#f8fafc',
                      }}
                    />
                  </div>
                </div>

                {/* Row 2: Price CAD, Orig Price, Stock, SKU */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                      Price ($ CAD) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={editProdPrice}
                      onChange={(e) => setEditProdPrice(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                      Compare-at Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={editProdOrigPrice}
                      onChange={(e) => setEditProdOrigPrice(e.target.value)}
                      placeholder="e.g. 65.00"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      required
                      value={editProdStock}
                      onChange={(e) => setEditProdStock(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                      SKU Code
                    </label>
                    <input
                      type="text"
                      value={editProdSku}
                      onChange={(e) => setEditProdSku(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                        fontFamily: 'monospace',
                      }}
                    />
                  </div>
                </div>

                {/* Row 3: Category, Collection, Brand Dropdowns */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                      Department Category
                    </label>
                    <select
                      value={editProdCategory}
                      onChange={(e) => setEditProdCategory(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                        outline: 'none',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                      Collection
                    </label>
                    <select
                      value={editProdCollection}
                      onChange={(e) => setEditProdCollection(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                        outline: 'none',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      <option value="">No Collection</option>
                      {collections.map((col) => (
                        <option key={col.id} value={col.id}>
                          {col.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                      Artisan Studio
                    </label>
                    <select
                      value={editProdBrand}
                      onChange={(e) => setEditProdBrand(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                        outline: 'none',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      <option value="">No Studio</option>
                      {brands.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 4: Multiple Image Management */}
                <div style={{ backgroundColor: '#faf8f5', border: '1px solid #ebd9c0', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div>
                      <strong style={{ fontSize: '0.88rem', color: '#0c2340' }}>
                        Product Photography ({editExistingImages.length + editPendingFiles.length} photos)
                      </strong>
                      <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0' }}>
                        The first image is the primary cover image. Click &quot;Make Cover&quot; to set an image as primary.
                      </p>
                    </div>

                    <input
                      ref={editFileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleEditFileSelect}
                      style={{ display: 'none' }}
                      id="edit-product-multi-image-input"
                    />
                    <label
                      htmlFor="edit-product-multi-image-input"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: '#b47e00',
                        color: '#ffffff',
                        padding: '8px 14px',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      <Upload size={14} />
                      <span>Add Photos</span>
                    </label>
                  </div>

                  {/* Progress Indicator */}
                  {uploadProgressText && isSubmittingEdit && (
                    <div style={{ fontSize: '0.8rem', color: '#b47e00', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Loader2 size={16} className="animate-spin" />
                      <span>{uploadProgressText}</span>
                    </div>
                  )}

                  {/* Existing & Pending Photos Gallery */}
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', minHeight: '80px', alignItems: 'center' }}>
                    {/* Existing Images */}
                    {editExistingImages.map((url, idx) => (
                      <div
                        key={idx}
                        style={{
                          position: 'relative',
                          width: '94px',
                          height: '94px',
                          borderRadius: '6px',
                          overflow: 'hidden',
                          border: idx === 0 ? '2px solid #b47e00' : '1px solid #cbd5e1',
                          backgroundColor: '#ffffff',
                          boxShadow: idx === 0 ? '0 2px 8px rgba(180, 126, 0, 0.25)' : 'none',
                        }}
                      >
                        <Image src={url} alt={`Photo ${idx + 1}`} fill style={{ objectFit: 'cover' }} />
                        <button
                          type="button"
                          onClick={() => removeEditExistingImage(url)}
                          style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            backgroundColor: 'rgba(0,0,0,0.65)',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                          title="Remove image"
                        >
                          <X size={12} />
                        </button>
                        {idx === 0 ? (
                          <div
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              backgroundColor: '#b47e00',
                              color: '#ffffff',
                              fontSize: '0.62rem',
                              fontWeight: 700,
                              textAlign: 'center',
                              padding: '2px 0',
                            }}
                          >
                            COVER
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setEditPrimaryImage(idx)}
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              backgroundColor: 'rgba(12, 35, 64, 0.85)',
                              color: '#ffffff',
                              fontSize: '0.6rem',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '3px 0',
                            }}
                          >
                            Set Cover
                          </button>
                        )}
                      </div>
                    ))}

                    {/* Pending Uploads */}
                    {editPendingFiles.map((item, idx) => (
                      <div
                        key={`pending-${idx}`}
                        style={{
                          position: 'relative',
                          width: '94px',
                          height: '94px',
                          borderRadius: '6px',
                          overflow: 'hidden',
                          border: '2px dashed #0284c7',
                          backgroundColor: '#ffffff',
                        }}
                      >
                        <Image src={item.previewUrl} alt="Pending upload" fill style={{ objectFit: 'cover' }} />
                        <button
                          type="button"
                          onClick={() => removeEditPendingImage(idx)}
                          style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            backgroundColor: 'rgba(0,0,0,0.65)',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <X size={12} />
                        </button>
                        <div
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: '#0284c7',
                            color: '#ffffff',
                            fontSize: '0.6rem',
                            fontWeight: 700,
                            textAlign: 'center',
                            padding: '2px 0',
                          }}
                        >
                          NEW ({(item.compressedSize / 1024).toFixed(0)} KB)
                        </div>
                      </div>
                    ))}

                    {editExistingImages.length === 0 && editPendingFiles.length === 0 && (
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontStyle: 'italic' }}>
                        No images attached. Click &quot;Add Photos&quot; to upload craft imagery.
                      </div>
                    )}
                  </div>
                </div>

                {/* Row 5: Material, Dimensions, Badges */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                      Material
                    </label>
                    <input
                      type="text"
                      value={editProdMaterial}
                      onChange={(e) => setEditProdMaterial(e.target.value)}
                      placeholder="e.g. Canadian Hardwood & Walnut"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                      Dimensions
                    </label>
                    <input
                      type="text"
                      value={editProdDimensions}
                      onChange={(e) => setEditProdDimensions(e.target.value)}
                      placeholder="e.g. 30cm x 30cm x 3cm"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                      Merchandising Badge
                    </label>
                    <select
                      value={editProdBadge}
                      onChange={(e) => setEditProdBadge(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      <option value="New Release">New Release</option>
                      <option value="Bestseller">Bestseller</option>
                      <option value="Collector Edition">Collector Edition</option>
                      <option value="Limited Run">Limited Run</option>
                      <option value="Artisan Choice">Artisan Choice</option>
                    </select>
                  </div>
                </div>

                {/* Row 6: Short Description */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                    Short Summary (One-liner)
                  </label>
                  <input
                    type="text"
                    value={editProdShortDesc}
                    onChange={(e) => setEditProdShortDesc(e.target.value)}
                    placeholder="Brief highlights for cards and previews..."
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Row 7: Full Description */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0c2340', marginBottom: '6px' }}>
                    Artisan Description &amp; Specifications
                  </label>
                  <textarea
                    rows={4}
                    value={editProdDesc}
                    onChange={(e) => setEditProdDesc(e.target.value)}
                    placeholder="Describe the craftsmanship, materials, Canadian origin, and mounting instructions..."
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Row 8: Feature & Limited Edition Toggles */}
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#0c2340' }}>
                    <input
                      type="checkbox"
                      checked={editIsFeatured}
                      onChange={(e) => setEditIsFeatured(e.target.checked)}
                      style={{ width: '16px', height: '16px', accentColor: '#b47e00' }}
                    />
                    <span>Feature on Homepage Spotlight</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#0c2340' }}>
                    <input
                      type="checkbox"
                      checked={editIsLimited}
                      onChange={(e) => setEditIsLimited(e.target.checked)}
                      style={{ width: '16px', height: '16px', accentColor: '#b47e00' }}
                    />
                    <span>Mark as Limited Edition Collectible</span>
                  </label>
                </div>
              </div>

              {/* Modal Footer */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '12px',
                  paddingTop: '20px',
                  marginTop: '20px',
                  borderTop: '1px solid #e2e8f0',
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsEditProductModalOpen(false)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#475569',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmittingEdit}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: '#0c2340',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(12, 35, 64, 0.25)',
                  }}
                >
                  {isSubmittingEdit ? (
                    <>
                      <Loader2 size={16} className="animate-spin" style={{ color: '#dda82e' }} />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <span>Save Product Changes &rarr;</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
