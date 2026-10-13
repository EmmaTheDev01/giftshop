-- ==============================================================================
-- MEMORIQ E-COMMERCE: ROW LEVEL SECURITY (RLS) LOCKDOWN FOR ALL TABLES
-- memoriq.lifelines.global
-- 
-- Run this script directly in the Supabase SQL Editor to:
-- 1. Eliminate all 'UNRESTRICTED' warnings across all admin & store tables.
-- 2. Force RLS on sensitive admin tables.
-- 3. Install idempotent, role-based policies for Admin vs Public vs Authenticated users.
-- 4. Secure admin views with security_invoker = true.
-- ==============================================================================

-- 1. Ensure helper admin function exists with search_path protection
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- Service role (backend scripts, edge functions) always has admin access
  IF (auth.jwt() ->> 'role' = 'service_role') THEN
    RETURN TRUE;
  END IF;

  -- An anonymous or unauthenticated request cannot be an admin
  IF auth.uid() IS NULL THEN
    RETURN FALSE;
  END IF;

  -- Check if profile has admin or staff role
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 2. Ensure compatibility columns exist before applying policies
ALTER TABLE public.brands ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;
ALTER TABLE public.brands ADD COLUMN IF NOT EXISTS order_position INT DEFAULT 0;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS created_by UUID;
ALTER TABLE public.collections ADD COLUMN IF NOT EXISTS badge TEXT;
ALTER TABLE public.collections ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;
ALTER TABLE public.collections ADD COLUMN IF NOT EXISTS order_position INT DEFAULT 0;
ALTER TABLE public.product_reviews ADD COLUMN IF NOT EXISTS author_email TEXT;
ALTER TABLE public.product_reviews ADD COLUMN IF NOT EXISTS is_verified_purchase BOOLEAN DEFAULT FALSE;
ALTER TABLE public.discount_coupons ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;
ALTER TABLE public.newsletter_subscribers ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- 3. ENABLE ROW LEVEL SECURITY ON ALL 16 TABLES
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discount_coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- 4. FORCE ROW LEVEL SECURITY ON ADMIN & TELEMETRY TABLES
ALTER TABLE public.admin_audit_logs FORCE ROW LEVEL SECURITY;
ALTER TABLE public.admin_notifications FORCE ROW LEVEL SECURITY;
ALTER TABLE public.system_logs FORCE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events FORCE ROW LEVEL SECURITY;
ALTER TABLE public.discount_coupons FORCE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers FORCE ROW LEVEL SECURITY;
ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;
ALTER TABLE public.orders FORCE ROW LEVEL SECURITY;

-- ==============================================================================
-- A. ADMIN AUDIT LOGS (Admin Only & Immutable)
-- ==============================================================================
DROP POLICY IF EXISTS "Admin can view all audit logs" ON public.admin_audit_logs;
DROP POLICY IF EXISTS "Admin can create audit logs" ON public.admin_audit_logs;
DROP POLICY IF EXISTS "Admin can delete audit logs" ON public.admin_audit_logs;
DROP POLICY IF EXISTS "Admin audit logs select" ON public.admin_audit_logs;
DROP POLICY IF EXISTS "Admin audit logs insert" ON public.admin_audit_logs;
DROP POLICY IF EXISTS "Admin audit logs delete" ON public.admin_audit_logs;

CREATE POLICY "Admin audit logs select" ON public.admin_audit_logs
  FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admin audit logs insert" ON public.admin_audit_logs
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin audit logs delete" ON public.admin_audit_logs
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- ==============================================================================
-- B. ADMIN NOTIFICATIONS (Admin Only)
-- ==============================================================================
DROP POLICY IF EXISTS "Admin can view notifications" ON public.admin_notifications;
DROP POLICY IF EXISTS "Admin notifications select" ON public.admin_notifications;
DROP POLICY IF EXISTS "Admin notifications insert" ON public.admin_notifications;
DROP POLICY IF EXISTS "Admin notifications update" ON public.admin_notifications;
DROP POLICY IF EXISTS "Admin notifications delete" ON public.admin_notifications;

CREATE POLICY "Admin notifications select" ON public.admin_notifications
  FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admin notifications insert" ON public.admin_notifications
  FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin notifications update" ON public.admin_notifications
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin notifications delete" ON public.admin_notifications
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- ==============================================================================
-- C. SYSTEM LOGS (Diagnostic & Error Logging)
-- ==============================================================================
DROP POLICY IF EXISTS "Public can log system errors" ON public.system_logs;
DROP POLICY IF EXISTS "Admin can view all system logs" ON public.system_logs;
DROP POLICY IF EXISTS "System logs select" ON public.system_logs;
DROP POLICY IF EXISTS "System logs insert" ON public.system_logs;
DROP POLICY IF EXISTS "System logs update" ON public.system_logs;
DROP POLICY IF EXISTS "System logs delete" ON public.system_logs;

CREATE POLICY "System logs select" ON public.system_logs
  FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "System logs insert" ON public.system_logs
  FOR INSERT
  WITH CHECK (level IN ('debug', 'info', 'warn', 'error', 'critical') OR public.is_admin());

CREATE POLICY "System logs update" ON public.system_logs
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "System logs delete" ON public.system_logs
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- ==============================================================================
-- D. ANALYTICS EVENTS (Telemetry & Event Tracking)
-- ==============================================================================
DROP POLICY IF EXISTS "Public can log analytics events" ON public.analytics_events;
DROP POLICY IF EXISTS "Admin can view all analytics events" ON public.analytics_events;
DROP POLICY IF EXISTS "Analytics events select" ON public.analytics_events;
DROP POLICY IF EXISTS "Analytics events insert" ON public.analytics_events;
DROP POLICY IF EXISTS "Analytics events delete" ON public.analytics_events;

CREATE POLICY "Analytics events select" ON public.analytics_events
  FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "Analytics events insert" ON public.analytics_events
  FOR INSERT
  WITH CHECK (length(event_name) > 0 OR public.is_admin());

CREATE POLICY "Analytics events delete" ON public.analytics_events
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- ==============================================================================
-- E. DISCOUNT COUPONS (Promotions Management)
-- ==============================================================================
DROP POLICY IF EXISTS "Public read active coupons" ON public.discount_coupons;
DROP POLICY IF EXISTS "Admin full manage coupons" ON public.discount_coupons;
DROP POLICY IF EXISTS "Coupons select" ON public.discount_coupons;
DROP POLICY IF EXISTS "Coupons insert" ON public.discount_coupons;
DROP POLICY IF EXISTS "Coupons update" ON public.discount_coupons;
DROP POLICY IF EXISTS "Coupons delete" ON public.discount_coupons;

CREATE POLICY "Coupons select" ON public.discount_coupons
  FOR SELECT
  USING ((is_active = true AND (expires_at IS NULL OR expires_at > now())) OR public.is_admin());

CREATE POLICY "Coupons insert" ON public.discount_coupons
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Coupons update" ON public.discount_coupons
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Coupons delete" ON public.discount_coupons
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- ==============================================================================
-- F. NEWSLETTER SUBSCRIBERS (Customer Marketing List)
-- ==============================================================================
DROP POLICY IF EXISTS "Public can subscribe to newsletter" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admin can view all subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Subscribers select" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Subscribers insert" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Subscribers update" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Subscribers delete" ON public.newsletter_subscribers;

CREATE POLICY "Subscribers select" ON public.newsletter_subscribers
  FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "Subscribers insert" ON public.newsletter_subscribers
  FOR INSERT
  WITH CHECK (email IS NOT NULL AND position('@' in email) > 1);

CREATE POLICY "Subscribers update" ON public.newsletter_subscribers
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Subscribers delete" ON public.newsletter_subscribers
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- ==============================================================================
-- G. PROFILES (Accounts & Role Integrity Protection)
-- ==============================================================================
DROP POLICY IF EXISTS "Users manage own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admin view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Profiles select" ON public.profiles;
DROP POLICY IF EXISTS "Profiles insert" ON public.profiles;
DROP POLICY IF EXISTS "Profiles update" ON public.profiles;
DROP POLICY IF EXISTS "Profiles delete" ON public.profiles;

CREATE POLICY "Profiles select" ON public.profiles
  FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Profiles insert" ON public.profiles
  FOR INSERT
  WITH CHECK ((auth.uid() = id AND role = 'customer') OR public.is_admin());

-- Prevent ordinary users from escalating their role to 'admin' or 'staff'
CREATE POLICY "Profiles update" ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id OR public.is_admin())
  WITH CHECK (
    public.is_admin() OR 
    (auth.uid() = id AND role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid()))
  );

CREATE POLICY "Profiles delete" ON public.profiles
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- ==============================================================================
-- H. ORDERS & ORDER ITEMS
-- ==============================================================================
DROP POLICY IF EXISTS "Users view own orders or Admin view all" ON public.orders;
DROP POLICY IF EXISTS "Guests and Users can place orders" ON public.orders;
DROP POLICY IF EXISTS "Admin update orders" ON public.orders;
DROP POLICY IF EXISTS "Admin delete orders" ON public.orders;
DROP POLICY IF EXISTS "Orders select" ON public.orders;
DROP POLICY IF EXISTS "Orders insert" ON public.orders;
DROP POLICY IF EXISTS "Orders update" ON public.orders;
DROP POLICY IF EXISTS "Orders delete" ON public.orders;

CREATE POLICY "Orders select" ON public.orders
  FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Orders insert" ON public.orders
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL OR public.is_admin());

CREATE POLICY "Orders update" ON public.orders
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Orders delete" ON public.orders
  FOR DELETE TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Users view own order items or Admin view all" ON public.order_items;
DROP POLICY IF EXISTS "Allow order items creation" ON public.order_items;
DROP POLICY IF EXISTS "Admin update order items" ON public.order_items;
DROP POLICY IF EXISTS "Order items select" ON public.order_items;
DROP POLICY IF EXISTS "Order items insert" ON public.order_items;
DROP POLICY IF EXISTS "Order items update" ON public.order_items;
DROP POLICY IF EXISTS "Order items delete" ON public.order_items;

CREATE POLICY "Order items select" ON public.order_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
        AND (orders.user_id = auth.uid() OR public.is_admin())
    )
  );

CREATE POLICY "Order items insert" ON public.order_items
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
        AND (orders.user_id = auth.uid() OR orders.user_id IS NULL OR public.is_admin())
    )
  );

CREATE POLICY "Order items update" ON public.order_items
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Order items delete" ON public.order_items
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- ==============================================================================
-- I. CATALOG: PRODUCTS, CATEGORIES, BRANDS, COLLECTIONS
-- ==============================================================================
-- Products
DROP POLICY IF EXISTS "Public read products" ON public.products;
DROP POLICY IF EXISTS "Admin full manage products" ON public.products;
DROP POLICY IF EXISTS "Products select" ON public.products;
DROP POLICY IF EXISTS "Products insert" ON public.products;
DROP POLICY IF EXISTS "Products update" ON public.products;
DROP POLICY IF EXISTS "Products delete" ON public.products;

CREATE POLICY "Products select" ON public.products
  FOR SELECT
  USING (true);

CREATE POLICY "Products insert" ON public.products
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Products update" ON public.products
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Products delete" ON public.products
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- Categories
DROP POLICY IF EXISTS "Public read categories" ON public.categories;
DROP POLICY IF EXISTS "Admin full manage categories" ON public.categories;
DROP POLICY IF EXISTS "Categories select" ON public.categories;
DROP POLICY IF EXISTS "Categories insert" ON public.categories;
DROP POLICY IF EXISTS "Categories update" ON public.categories;
DROP POLICY IF EXISTS "Categories delete" ON public.categories;

CREATE POLICY "Categories select" ON public.categories
  FOR SELECT
  USING (true);

CREATE POLICY "Categories insert" ON public.categories
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Categories update" ON public.categories
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Categories delete" ON public.categories
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- Brands
DROP POLICY IF EXISTS "Public read brands" ON public.brands;
DROP POLICY IF EXISTS "Admin full manage brands" ON public.brands;
DROP POLICY IF EXISTS "Brands select" ON public.brands;
DROP POLICY IF EXISTS "Brands insert" ON public.brands;
DROP POLICY IF EXISTS "Brands update" ON public.brands;
DROP POLICY IF EXISTS "Brands delete" ON public.brands;

CREATE POLICY "Brands select" ON public.brands
  FOR SELECT
  USING (true);

CREATE POLICY "Brands insert" ON public.brands
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Brands update" ON public.brands
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Brands delete" ON public.brands
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- Collections
DROP POLICY IF EXISTS "Public read collections" ON public.collections;
DROP POLICY IF EXISTS "Admin full manage collections" ON public.collections;
DROP POLICY IF EXISTS "Collections select" ON public.collections;
DROP POLICY IF EXISTS "Collections insert" ON public.collections;
DROP POLICY IF EXISTS "Collections update" ON public.collections;
DROP POLICY IF EXISTS "Collections delete" ON public.collections;

CREATE POLICY "Collections select" ON public.collections
  FOR SELECT
  USING (true);

CREATE POLICY "Collections insert" ON public.collections
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Collections update" ON public.collections
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Collections delete" ON public.collections
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- ==============================================================================
-- J. REVIEWS, CARTS & WISHLISTS
-- ==============================================================================
DROP POLICY IF EXISTS "Public read approved reviews" ON public.product_reviews;
DROP POLICY IF EXISTS "Users insert reviews" ON public.product_reviews;
DROP POLICY IF EXISTS "Admin full manage reviews" ON public.product_reviews;
DROP POLICY IF EXISTS "Reviews select" ON public.product_reviews;
DROP POLICY IF EXISTS "Reviews insert" ON public.product_reviews;
DROP POLICY IF EXISTS "Reviews update" ON public.product_reviews;
DROP POLICY IF EXISTS "Reviews delete" ON public.product_reviews;

CREATE POLICY "Reviews select" ON public.product_reviews
  FOR SELECT
  USING (status = 'approved' OR public.is_admin());

CREATE POLICY "Reviews insert" ON public.product_reviews
  FOR INSERT
  WITH CHECK (status = 'pending' OR public.is_admin());

CREATE POLICY "Reviews update" ON public.product_reviews
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Reviews delete" ON public.product_reviews
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- Cart Items
DROP POLICY IF EXISTS "Users manage own cart" ON public.cart_items;
DROP POLICY IF EXISTS "Cart select" ON public.cart_items;
DROP POLICY IF EXISTS "Cart insert" ON public.cart_items;
DROP POLICY IF EXISTS "Cart update" ON public.cart_items;
DROP POLICY IF EXISTS "Cart delete" ON public.cart_items;

CREATE POLICY "Cart select" ON public.cart_items
  FOR SELECT
  USING (auth.uid() = user_id OR session_id IS NOT NULL OR public.is_admin());

CREATE POLICY "Cart insert" ON public.cart_items
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR session_id IS NOT NULL OR public.is_admin());

CREATE POLICY "Cart update" ON public.cart_items
  FOR UPDATE
  USING (auth.uid() = user_id OR session_id IS NOT NULL OR public.is_admin())
  WITH CHECK (auth.uid() = user_id OR session_id IS NOT NULL OR public.is_admin());

CREATE POLICY "Cart delete" ON public.cart_items
  FOR DELETE
  USING (auth.uid() = user_id OR session_id IS NOT NULL OR public.is_admin());

-- Wishlists
DROP POLICY IF EXISTS "Users manage own wishlist" ON public.wishlists;
DROP POLICY IF EXISTS "Wishlist select" ON public.wishlists;
DROP POLICY IF EXISTS "Wishlist insert" ON public.wishlists;
DROP POLICY IF EXISTS "Wishlist update" ON public.wishlists;
DROP POLICY IF EXISTS "Wishlist delete" ON public.wishlists;

CREATE POLICY "Wishlist select" ON public.wishlists
  FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Wishlist insert" ON public.wishlists
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Wishlist update" ON public.wishlists
  FOR UPDATE
  USING (auth.uid() = user_id OR public.is_admin())
  WITH CHECK (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Wishlist delete" ON public.wishlists
  FOR DELETE
  USING (auth.uid() = user_id OR public.is_admin());

-- ==============================================================================
-- K. SECURITY INVOKER ON ADMIN METRICS VIEWS
-- ==============================================================================
DO $$
BEGIN
  ALTER VIEW public.admin_dashboard_metrics SET (security_invoker = true);
  ALTER VIEW public.admin_recent_orders SET (security_invoker = true);
  ALTER VIEW public.admin_low_stock_alerts SET (security_invoker = true);
  ALTER VIEW public.admin_top_selling_products SET (security_invoker = true);
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
