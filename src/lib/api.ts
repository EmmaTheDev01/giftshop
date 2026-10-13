import { supabase } from './supabase';
import { PRODUCTS, CATEGORIES, COLLECTIONS, ExtendedProduct } from '@/data/mockData';
import type { Product, Order, OrderItem, DiscountCoupon, ProductReview } from '@/types/supabase';

/**
 * Checks if real Supabase credentials are configured in environment variables.
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(
    url &&
    key &&
    !url.includes('placeholder-project') &&
    !key.includes('placeholder')
  );
}

/**
 * Fetches products from Supabase if connected, or falls back to mockData.
 */
export async function getProducts(options?: {
  categoryId?: string;
  collectionSlug?: string;
  isFeatured?: boolean;
  limit?: number;
}): Promise<ExtendedProduct[]> {
  if (!isSupabaseConfigured()) {
    let result = [...PRODUCTS];
    if (options?.isFeatured) {
      result = result.filter((p) => p.is_featured);
    }
    if (options?.limit) {
      result = result.slice(0, options.limit);
    }
    return result;
  }

  try {
    let query = supabase.from('products').select('*');
    if (options?.categoryId) query = query.eq('category_id', options.categoryId);
    if (options?.isFeatured) query = query.eq('is_featured', true);
    if (options?.limit) query = query.limit(options.limit);

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      console.warn('Supabase products fetch failed or empty, using local data:', error?.message);
      return PRODUCTS;
    }
    return data as ExtendedProduct[];
  } catch (err) {
    console.error('Exception fetching products from Supabase:', err);
    return PRODUCTS;
  }
}

/**
 * Fetches a single product by slug.
 */
export async function getProductBySlug(slug: string): Promise<ExtendedProduct | null> {
  if (!isSupabaseConfigured()) {
    return PRODUCTS.find((p) => p.slug === slug) || null;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return PRODUCTS.find((p) => p.slug === slug) || null;
    }
    return data as ExtendedProduct;
  } catch (err) {
    return PRODUCTS.find((p) => p.slug === slug) || null;
  }
}

/**
 * Fetches all categories.
 */
export async function getCategories() {
  if (!isSupabaseConfigured()) {
    return CATEGORIES;
  }
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('order_position', { ascending: true });
    if (error || !data || data.length === 0) return CATEGORIES;
    return data;
  } catch {
    return CATEGORIES;
  }
}

/**
 * Fetches all collections.
 */
export async function getCollections() {
  if (!isSupabaseConfigured()) {
    return COLLECTIONS;
  }
  try {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .order('order_position', { ascending: true });
    if (error || !data || data.length === 0) return COLLECTIONS;
    return data;
  } catch {
    return COLLECTIONS;
  }
}

/**
 * Validates a discount coupon code in CAD.
 */
export async function validateCoupon(code: string, cartSubtotal: number): Promise<{
  valid: boolean;
  coupon?: DiscountCoupon;
  discountAmount: number;
  message: string;
}> {
  const cleanCode = code.trim().toUpperCase();

  // Local offline fallback coupons
  const fallbackCoupons: Record<string, { type: 'percentage' | 'fixed_amount'; value: number; min: number; desc: string }> = {
    WELCOME10: { type: 'percentage', value: 10, min: 50, desc: '10% welcome discount' },
    CANADA95: { type: 'fixed_amount', value: 15, min: 150, desc: '$15 off orders over $150 CAD' },
    VIPGIFT: { type: 'percentage', value: 15, min: 100, desc: '15% VIP discount' },
  };

  if (!isSupabaseConfigured()) {
    const found = fallbackCoupons[cleanCode];
    if (!found) {
      return { valid: false, discountAmount: 0, message: 'Invalid coupon code.' };
    }
    if (cartSubtotal < found.min) {
      return {
        valid: false,
        discountAmount: 0,
        message: `Requires minimum order of $${found.min.toFixed(2)} CAD.`,
      };
    }
    const discount =
      found.type === 'percentage'
        ? (cartSubtotal * found.value) / 100
        : Math.min(found.value, cartSubtotal);

    return {
      valid: true,
      discountAmount: Number(discount.toFixed(2)),
      message: `${found.desc} applied!`,
    };
  }

  try {
    const { data, error } = await supabase
      .from('discount_coupons')
      .select('*')
      .eq('code', cleanCode)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      return { valid: false, discountAmount: 0, message: 'Invalid or expired coupon.' };
    }

    if (cartSubtotal < data.min_order_amount) {
      return {
        valid: false,
        discountAmount: 0,
        message: `Minimum order amount of $${data.min_order_amount.toFixed(2)} CAD required.`,
      };
    }

    let discount =
      data.discount_type === 'percentage'
        ? (cartSubtotal * data.discount_value) / 100
        : data.discount_value;

    if (data.max_discount_amount && discount > data.max_discount_amount) {
      discount = data.max_discount_amount;
    }

    return {
      valid: true,
      coupon: data,
      discountAmount: Number(discount.toFixed(2)),
      message: 'Coupon successfully applied!',
    };
  } catch (err) {
    return { valid: false, discountAmount: 0, message: 'Could not verify coupon.' };
  }
}

/**
 * Submits newsletter subscription to Supabase.
 */
export async function subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  if (!email || !email.includes('@')) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  if (!isSupabaseConfigured()) {
    return { success: true, message: 'Successfully subscribed to the Canadian boutique newsletter!' };
  }

  try {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: email.toLowerCase().trim() });

    if (error) {
      if (error.code === '23505') {
        return { success: true, message: 'You are already subscribed to our letters!' };
      }
      return { success: false, message: error.message };
    }
    return { success: true, message: 'Thank you for subscribing!' };
  } catch {
    return { success: true, message: 'Subscribed successfully.' };
  }
}

/**
 * Creates an order in Supabase.
 */
export async function createOrder(orderPayload: {
  customer_email: string;
  customer_name: string;
  shipping_address: Record<string, unknown>;
  items: Array<{
    product_id: string;
    product_name: string;
    unit_price: number;
    quantity: number;
    image_url?: string;
  }>;
  subtotal: number;
  shipping_cost: number;
  tax_gst?: number;
  tax_pst?: number;
  tax_hst?: number;
  total_tax?: number;
  discount_amount?: number;
  coupon_code?: string;
  total: number;
  payment_method?: string;
}): Promise<{ success: boolean; orderNumber: string; error?: string }> {
  const orderNumber = `CA-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

  if (!isSupabaseConfigured()) {
    return { success: true, orderNumber };
  }

  try {
    const { data: order, error: orderErr } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_email: orderPayload.customer_email,
        customer_name: orderPayload.customer_name,
        shipping_address: orderPayload.shipping_address,
        subtotal: orderPayload.subtotal,
        shipping_cost: orderPayload.shipping_cost,
        tax_gst: orderPayload.tax_gst || 0,
        tax_pst: orderPayload.tax_pst || 0,
        tax_hst: orderPayload.tax_hst || 0,
        total_tax: orderPayload.total_tax || 0,
        discount_amount: orderPayload.discount_amount || 0,
        coupon_code: orderPayload.coupon_code || null,
        total: orderPayload.total,
        currency: 'CAD',
        status: 'pending',
        payment_status: 'unpaid',
        payment_method: orderPayload.payment_method || 'interac',
      })
      .select('id')
      .single();

    if (orderErr || !order) {
      return { success: false, orderNumber, error: orderErr?.message };
    }

    // Insert line items
    const lineItems = orderPayload.items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product_name,
      unit_price: item.unit_price,
      quantity: item.quantity,
      total_price: item.unit_price * item.quantity,
      image_url: item.image_url,
    }));

    await supabase.from('order_items').insert(lineItems);

    return { success: true, orderNumber };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Order creation failed';
    return { success: false, orderNumber, error: msg };
  }
}

// ==============================================================================
// ADMIN MANAGEMENT & MONITORING SERVICE LAYER
// ==============================================================================

/**
 * Fetches real-time executive dashboard metrics in CAD.
 */
export async function adminGetDashboardMetrics(): Promise<{
  total_revenue_cad: number;
  total_orders_count: number;
  pending_fulfillment_count: number;
  total_customers_count: number;
  low_stock_items_count: number;
  out_of_stock_items_count: number;
  total_products_count: number;
  active_coupons_count: number;
  avg_order_value_cad: number;
}> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('admin_dashboard_metrics')
        .select('*')
        .single();
      if (!error && data) {
        return data as any;
      }
    } catch {
      // fallback calculation
    }
  }

  // Local fallback metrics for preview
  return {
    total_revenue_cad: 18450.75,
    total_orders_count: 84,
    pending_fulfillment_count: 5,
    total_customers_count: 142,
    low_stock_items_count: 3,
    out_of_stock_items_count: 0,
    total_products_count: PRODUCTS.length,
    active_coupons_count: 3,
    avg_order_value_cad: 219.65,
  };
}

/**
 * Admin: Fetches all orders with item counts and delivery tracking.
 */
export async function adminGetOrders(): Promise<any[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Failed to load orders from Supabase:', e);
    }
  }

  // Sample orders for instant preview before live orders arrive
  return [
    {
      id: 'ord-101',
      order_number: 'CA-892104-582',
      customer_name: 'Geneviève Tremblay',
      customer_email: 'genevieve.tremblay@example.ca',
      subtotal: 145.0,
      shipping_cost: 0.0,
      total_tax: 21.71,
      total: 166.71,
      currency: 'CAD',
      status: 'pending',
      payment_status: 'paid',
      payment_method: 'Interac Debit',
      tracking_carrier: 'Canada Post',
      tracking_number: '7019284019283019',
      created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
      order_items: [
        { product_name: 'Authentic Heritage Structural Rivet', quantity: 1, unit_price: 115.0 },
        { product_name: 'Bronze Monument Keepsake 19cm', quantity: 1, unit_price: 30.0 },
      ],
    },
    {
      id: 'ord-102',
      order_number: 'CA-892103-914',
      customer_name: 'David MacLeod',
      customer_email: 'd.macleod@example.ca',
      subtotal: 210.0,
      shipping_cost: 0.0,
      total_tax: 27.3,
      total: 237.3,
      currency: 'CAD',
      status: 'processing',
      payment_status: 'paid',
      payment_method: 'Visa',
      tracking_carrier: 'Canada Post',
      tracking_number: '7019284019283020',
      created_at: new Date(Date.now() - 3600000 * 6).toISOString(),
      order_items: [
        { product_name: 'Saint James Pure Virgin Wool Marinière', quantity: 1, unit_price: 165.0 },
        { product_name: 'VILAC Wooden Architectural Model', quantity: 1, unit_price: 45.0 },
      ],
    },
    {
      id: 'ord-103',
      order_number: 'CA-892099-231',
      customer_name: 'Sarah Chen',
      customer_email: 'schen@example.ca',
      subtotal: 70.0,
      shipping_cost: 12.0,
      total_tax: 10.66,
      total: 92.66,
      currency: 'CAD',
      status: 'shipped',
      payment_status: 'paid',
      payment_method: 'Apple Pay',
      tracking_carrier: 'Canada Post',
      tracking_number: '7019284019283021',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      order_items: [
        { product_name: 'Bernardaud Porcelain Espresso Cup', quantity: 1, unit_price: 65.0 },
        { product_name: 'Monnaie de Paris Summit Medal', quantity: 1, unit_price: 5.0 },
      ],
    },
  ];
}

/**
 * Admin: Updates order status and tracking details.
 */
export async function adminUpdateOrderStatus(
  orderId: string,
  status: Order['status'],
  trackingNumber?: string,
  carrier: string = 'Canada Post'
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: true };
  }

  try {
    const payload: Record<string, unknown> = {
      status,
      updated_at: new Date().toISOString(),
    };
    if (trackingNumber) {
      payload.tracking_number = trackingNumber;
      payload.tracking_carrier = carrier;
    }

    const { error } = await supabase.from('orders').update(payload).eq('id', orderId);
    if (error) return { success: false, error: error.message };

    // Log admin audit
    await supabase.from('admin_audit_logs').insert({
      action: 'update_order_status',
      resource_type: 'orders',
      resource_id: orderId,
      details: `Order updated to ${status} with carrier ${carrier}`,
    });

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Admin: Adds a new product to Supabase.
 */
export async function adminCreateProduct(productData: Partial<Product>): Promise<{
  success: boolean;
  product?: Product;
  error?: string;
}> {
  if (!isSupabaseConfigured()) {
    // Local simulation
    const newProduct: any = {
      ...productData,
      id: `prod-admin-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    PRODUCTS.unshift(newProduct);
    return { success: true, product: newProduct };
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .insert({
        slug: productData.slug || (productData.name || '').toLowerCase().replace(/\s+/g, '-'),
        name: productData.name!,
        sku: productData.sku,
        price: productData.price || 0,
        currency: 'CAD',
        stock: productData.stock || 50,
        images: productData.images || [],
        description: productData.description,
        short_description: productData.short_description,
        badge: productData.badge,
        made_in: productData.made_in || 'Canada',
        is_featured: productData.is_featured || false,
        is_limited_edition: productData.is_limited_edition || false,
      })
      .select('*')
      .single();

    if (error || !data) {
      return { success: false, error: error?.message };
    }

    // Log admin audit
    await supabase.from('admin_audit_logs').insert({
      action: 'create_product',
      resource_type: 'products',
      resource_id: data.id,
      new_state: data as any,
      details: `Created product: ${data.name} ($${data.price} CAD)`,
    });

    return { success: true, product: data as Product };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Admin: Updates an existing product in Supabase.
 */
export async function adminUpdateProduct(
  id: string,
  productData: Partial<Product>
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    const idx = PRODUCTS.findIndex((p) => p.id === id);
    if (idx !== -1) {
      PRODUCTS[idx] = { ...PRODUCTS[idx], ...productData } as any;
    }
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('products')
      .update({
        ...productData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) return { success: false, error: error.message };

    await supabase.from('admin_audit_logs').insert({
      action: 'update_product',
      resource_type: 'products',
      resource_id: id,
      new_state: productData as any,
      details: `Updated product properties for ID ${id}`,
    });

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Admin: Deletes a product from Supabase.
 */
export async function adminDeleteProduct(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    const idx = PRODUCTS.findIndex((p) => p.id === id);
    if (idx !== -1) PRODUCTS.splice(idx, 1);
    return { success: true };
  }

  try {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) return { success: false, error: error.message };

    await supabase.from('admin_audit_logs').insert({
      action: 'delete_product',
      resource_type: 'products',
      resource_id: id,
      details: `Deleted product ID ${id}`,
    });

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Admin: Fetches real-time system & error logs.
 */
export async function adminGetSystemLogs(limit: number = 40): Promise<any[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('system_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);
      if (!error && data && data.length > 0) return data;
    } catch {
      // fallback
    }
  }

  return [
    {
      id: 'log-1',
      level: 'info',
      category: 'telemetry',
      message: 'Checkout session created successfully (CAD)',
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 'log-2',
      level: 'info',
      category: 'inventory',
      message: 'Stock verified for Monnaie de Paris Summit Medal',
      created_at: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      id: 'log-3',
      level: 'warn',
      category: 'tax_calc',
      message: 'Non-standard postal code formatted for Nova Scotia order',
      created_at: new Date(Date.now() - 14400000).toISOString(),
    },
  ];
}

/**
 * Admin: Fetches live customer telemetry / analytics events.
 */
export async function adminGetAnalyticsEvents(limit: number = 40): Promise<any[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('analytics_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);
      if (!error && data && data.length > 0) return data;
    } catch {
      // fallback
    }
  }

  return [
    {
      id: 'evt-1',
      event_name: 'view_item',
      page_url: '/products/authentic-rivet-monument-heritage-edition',
      created_at: new Date(Date.now() - 60000 * 5).toISOString(),
      event_data: { price_cad: 115.0, currency: 'CAD' },
    },
    {
      id: 'evt-2',
      event_name: 'add_to_cart',
      page_url: '/products/saint-james-pure-wool-striped-mariniere',
      created_at: new Date(Date.now() - 60000 * 18).toISOString(),
      event_data: { price_cad: 165.0, quantity: 1 },
    },
    {
      id: 'evt-3',
      event_name: 'coupon_applied',
      page_url: '/cart',
      created_at: new Date(Date.now() - 60000 * 45).toISOString(),
      event_data: { code: 'WELCOME10', discount_amount_cad: 16.5 },
    },
  ];
}

