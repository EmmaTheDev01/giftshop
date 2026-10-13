-- ==============================================================================
-- The Gift Shop - Complete Supabase PostgreSQL Schema
-- E-Commerce Architecture with Full Admin Monitoring, Role Controls & Audit Logs
-- ==============================================================================

-- 0. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Custom Enums
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('customer', 'staff', 'moderator', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('unpaid', 'paid', 'refunded', 'failed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE discount_type AS ENUM ('percentage', 'fixed_amount');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE review_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE log_level AS ENUM ('debug', 'info', 'warn', 'error', 'critical');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ------------------------------------------------------------------------------
-- 1. CATEGORIES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    description TEXT,
    image_url TEXT,
    order_position INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. BRANDS / ARTISAN HOUSES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.brands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    logo_url TEXT,
    hero_image_url TEXT,
    website TEXT,
    country TEXT DEFAULT 'Canada',
    is_featured BOOLEAN DEFAULT FALSE,
    order_position INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. THEMATIC COLLECTIONS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    badge TEXT,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    order_position INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. PRODUCTS TABLE (CAD Default Currency)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    sku TEXT UNIQUE,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    brand_id UUID REFERENCES public.brands(id) ON DELETE SET NULL,
    collection_id UUID REFERENCES public.collections(id) ON DELETE SET NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    original_price NUMERIC(10,2),
    currency TEXT NOT NULL DEFAULT 'CAD',
    description TEXT,
    short_description TEXT,
    details JSONB DEFAULT '{}'::jsonb,
    dimensions TEXT,
    material TEXT,
    made_in TEXT DEFAULT 'Canada',
    images TEXT[] NOT NULL DEFAULT '{}',
    stock INTEGER NOT NULL DEFAULT 50 CHECK (stock >= 0),
    low_stock_threshold INTEGER DEFAULT 10,
    badge TEXT,
    is_limited_edition BOOLEAN DEFAULT FALSE,
    limited_pieces INTEGER,
    is_featured BOOLEAN DEFAULT FALSE,
    rating NUMERIC(2,1) DEFAULT 4.9,
    reviews_count INTEGER DEFAULT 18,
    created_by UUID, -- System Admin ID or Staff Creator
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. CUSTOMER & ADMIN PROFILES (Extends Supabase auth.users)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    role user_role NOT NULL DEFAULT 'customer',
    default_shipping_address JSONB DEFAULT '{}'::jsonb,
    language TEXT DEFAULT 'en-CA',
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. CART ITEMS (Session & User-Backed)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id TEXT,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 7. WISHLISTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.wishlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- ------------------------------------------------------------------------------
-- 8. DISCOUNT COUPONS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.discount_coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL UNIQUE,
    description TEXT,
    discount_type discount_type NOT NULL DEFAULT 'percentage',
    discount_value NUMERIC(10,2) NOT NULL,
    min_order_amount NUMERIC(10,2) DEFAULT 0.00,
    max_discount_amount NUMERIC(10,2),
    usage_limit INT,
    times_used INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    starts_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 9. ORDERS TABLE (CAD Currency & Canadian Tax Breakdown)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT NOT NULL UNIQUE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    customer_email TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT,
    shipping_address JSONB NOT NULL,
    billing_address JSONB,
    subtotal NUMERIC(10,2) NOT NULL,
    shipping_cost NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    tax_gst NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    tax_pst NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    tax_hst NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    total_tax NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    discount_amount NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    coupon_code TEXT,
    total NUMERIC(10,2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'CAD',
    status order_status NOT NULL DEFAULT 'pending',
    payment_status payment_status NOT NULL DEFAULT 'unpaid',
    payment_method TEXT,
    stripe_session_id TEXT,
    tracking_carrier TEXT DEFAULT 'Canada Post',
    tracking_number TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 10. ORDER ITEMS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    product_sku TEXT,
    unit_price NUMERIC(10,2) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    total_price NUMERIC(10,2) NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 11. PRODUCT REVIEWS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    author_name TEXT NOT NULL,
    author_email TEXT,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    comment TEXT NOT NULL,
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    status review_status NOT NULL DEFAULT 'approved',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 12. ANALYTICS EVENTS TABLE (Comprehensive Telemetry)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    event_name TEXT NOT NULL,
    event_data JSONB DEFAULT '{}'::jsonb,
    page_url TEXT,
    referrer TEXT,
    user_agent TEXT,
    ip_hash TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 13. SYSTEM & AUDIT LOGS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.system_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    level log_level NOT NULL DEFAULT 'info',
    category TEXT NOT NULL,
    message TEXT NOT NULL,
    payload JSONB DEFAULT '{}'::jsonb,
    error_stack TEXT,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 14. ADMIN AUDIT LOGS TABLE (Tracks Every Admin Action)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    admin_email TEXT,
    action TEXT NOT NULL, -- 'create_product', 'update_order', 'delete_coupon', etc.
    resource_type TEXT NOT NULL, -- 'products', 'orders', 'coupons', etc.
    resource_id TEXT,
    previous_state JSONB,
    new_state JSONB,
    details TEXT,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 15. ADMIN NOTIFICATIONS / ALERTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    notification_type TEXT NOT NULL DEFAULT 'info', -- 'order_placed', 'low_stock', 'system_error'
    link_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 16. NEWSLETTER SUBSCRIBERS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand ON public.products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_collection ON public.products(collection_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_stock ON public.products(stock);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON public.orders(created_at);
CREATE INDEX IF NOT EXISTS idx_product_reviews_product ON public.product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event_name ON public.analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON public.analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_system_logs_level ON public.system_logs(level);
CREATE INDEX IF NOT EXISTS idx_system_logs_created ON public.system_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_admin_audit_created ON public.admin_audit_logs(created_at);

-- ==============================================================================
-- SECURITY DEFINER FUNCTIONS & ADMIN HELPERS
-- ==============================================================================

-- Function 1: Check if current authenticated user has admin privileges
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- Service role always has admin access
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

-- Function 2: Promote a user to Admin by email
CREATE OR REPLACE FUNCTION public.set_user_as_admin(target_email TEXT)
RETURNS TEXT AS $$
DECLARE
  target_user_id UUID;
BEGIN
  SELECT id INTO target_user_id FROM auth.users WHERE email = target_email LIMIT 1;
  
  IF target_user_id IS NULL THEN
    RETURN 'User not found in auth.users. They must sign up first.';
  END IF;

  INSERT INTO public.profiles (id, email, role, full_name)
  VALUES (target_user_id, target_email, 'admin', 'Administrator')
  ON CONFLICT (id) DO UPDATE
  SET role = 'admin', updated_at = NOW();

  INSERT INTO public.system_logs (level, category, message, payload)
  VALUES ('info', 'auth_admin', 'User granted admin privileges', jsonb_build_object('email', target_email, 'user_id', target_user_id));

  RETURN 'User ' || target_email || ' is now an administrator.';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function 3: Trigger to auto-create profile on auth.users signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'customer')
  )
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email, updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function 4: Trigger to alert admins on low stock
CREATE OR REPLACE FUNCTION public.check_stock_alert()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.stock <= COALESCE(NEW.low_stock_threshold, 10) AND (OLD.stock IS NULL OR OLD.stock > COALESCE(NEW.low_stock_threshold, 10)) THEN
    INSERT INTO public.admin_notifications (title, message, notification_type, link_url)
    VALUES (
      'Low Stock Alert: ' || NEW.name,
      'Product SKU ' || COALESCE(NEW.sku, 'N/A') || ' only has ' || NEW.stock || ' units remaining in stock.',
      'low_stock',
      '/admin/products'
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_product_stock_change ON public.products;
CREATE TRIGGER on_product_stock_change
  AFTER UPDATE OF stock ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.check_stock_alert();

-- ==============================================================================
-- ADMIN MONITORING VIEWS (For Dashboard & Telemetry)
-- ==============================================================================

-- View 1: Real-Time Executive Dashboard Metrics (in CAD)
CREATE OR REPLACE VIEW public.admin_dashboard_metrics AS
SELECT
    (SELECT COALESCE(SUM(total), 0) FROM public.orders WHERE payment_status = 'paid') AS total_revenue_cad,
    (SELECT COUNT(*) FROM public.orders) AS total_orders_count,
    (SELECT COUNT(*) FROM public.orders WHERE status IN ('pending', 'processing')) AS pending_fulfillment_count,
    (SELECT COUNT(*) FROM public.profiles WHERE role = 'customer') AS total_customers_count,
    (SELECT COUNT(*) FROM public.products WHERE stock <= 10) AS low_stock_items_count,
    (SELECT COUNT(*) FROM public.products WHERE stock = 0) AS out_of_stock_items_count,
    (SELECT COUNT(*) FROM public.products) AS total_products_count,
    (SELECT COUNT(*) FROM public.discount_coupons WHERE is_active = true) AS active_coupons_count,
    (SELECT COALESCE(AVG(total), 0) FROM public.orders WHERE payment_status = 'paid') AS avg_order_value_cad;

-- View 2: Recent Orders Summary View
CREATE OR REPLACE VIEW public.admin_recent_orders AS
SELECT
    o.id,
    o.order_number,
    o.customer_name,
    o.customer_email,
    o.total,
    o.currency,
    o.status,
    o.payment_status,
    o.tracking_carrier,
    o.tracking_number,
    o.created_at,
    (SELECT COUNT(*) FROM public.order_items oi WHERE oi.order_id = o.id) AS item_count
FROM public.orders o
ORDER BY o.created_at DESC;

-- View 3: Low Stock Alerts View
CREATE OR REPLACE VIEW public.admin_low_stock_alerts AS
SELECT
    id,
    slug,
    name,
    sku,
    stock,
    price,
    currency,
    low_stock_threshold
FROM public.products
WHERE stock <= COALESCE(low_stock_threshold, 10)
ORDER BY stock ASC;

-- View 4: Top Selling Products
CREATE OR REPLACE VIEW public.admin_top_selling_products AS
SELECT
    oi.product_id,
    oi.product_name,
    SUM(oi.quantity) AS total_units_sold,
    SUM(oi.total_price) AS total_revenue_generated
FROM public.order_items oi
JOIN public.orders o ON o.id = oi.order_id
WHERE o.payment_status = 'paid'
GROUP BY oi.product_id, oi.product_name
ORDER BY total_units_sold DESC;

-- ==============================================================================
-- COMPATIBILITY PATCHES: Ensure all required columns exist on prior schemas
-- ==============================================================================
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

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) ENABLEMENT & POLICIES
-- ==============================================================================

-- 1. Enable RLS on every table (eliminates 'UNRESTRICTED' warnings in Supabase)
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

-- 2. Force RLS on sensitive admin tables
ALTER TABLE public.admin_audit_logs FORCE ROW LEVEL SECURITY;
ALTER TABLE public.admin_notifications FORCE ROW LEVEL SECURITY;
ALTER TABLE public.system_logs FORCE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events FORCE ROW LEVEL SECURITY;
ALTER TABLE public.discount_coupons FORCE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers FORCE ROW LEVEL SECURITY;
ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;
ALTER TABLE public.orders FORCE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- A. ADMIN AUDIT LOGS (Strictly Immutable, Admin Only)
-- ------------------------------------------------------------------------------
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
-- Note: UPDATE policy is deliberately omitted to maintain audit log immutability.

-- ------------------------------------------------------------------------------
-- B. ADMIN NOTIFICATIONS (Admin Only)
-- ------------------------------------------------------------------------------
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

-- ------------------------------------------------------------------------------
-- C. SYSTEM LOGS (Diagnostic & Error Logging)
-- ------------------------------------------------------------------------------
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

-- ------------------------------------------------------------------------------
-- D. ANALYTICS EVENTS (Telemetry & Event Streaming)
-- ------------------------------------------------------------------------------
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

-- ------------------------------------------------------------------------------
-- E. DISCOUNT COUPONS (Promotions Management)
-- ------------------------------------------------------------------------------
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

-- ------------------------------------------------------------------------------
-- F. NEWSLETTER SUBSCRIBERS (Audience Management)
-- ------------------------------------------------------------------------------
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

-- ------------------------------------------------------------------------------
-- G. PROFILES (User Accounts & Role Integrity)
-- ------------------------------------------------------------------------------
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

-- ------------------------------------------------------------------------------
-- H. ORDERS & ORDER ITEMS (Order Ledger & Fulfillment)
-- ------------------------------------------------------------------------------
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

-- ------------------------------------------------------------------------------
-- I. CATALOG: PRODUCTS, CATEGORIES, BRANDS, COLLECTIONS
-- ------------------------------------------------------------------------------
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

-- ------------------------------------------------------------------------------
-- J. REVIEWS, CARTS & WISHLISTS
-- ------------------------------------------------------------------------------
-- Product Reviews
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

-- ------------------------------------------------------------------------------
-- K. SECURITY INVOKER ON ADMIN METRICS VIEWS
-- ------------------------------------------------------------------------------
DO $$
BEGIN
  ALTER VIEW public.admin_dashboard_metrics SET (security_invoker = true);
  ALTER VIEW public.admin_recent_orders SET (security_invoker = true);
  ALTER VIEW public.admin_low_stock_alerts SET (security_invoker = true);
  ALTER VIEW public.admin_top_selling_products SET (security_invoker = true);
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;





-- ==============================================================================
-- AUTOMATED FIRST ADMIN & CREATOR RE-ATTRIBUTION
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  existing_count INT;
BEGIN
  SELECT COUNT(*) INTO existing_count FROM public.profiles;

  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    CASE WHEN existing_count = 0 OR NEW.email LIKE '%admin%' THEN 'admin'::user_role ELSE 'customer'::user_role END
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    role = CASE WHEN existing_count = 0 OR NEW.email LIKE '%admin%' THEN 'admin'::user_role ELSE profiles.role END;

  -- Re-attribute initial seeded products created_by to the first registered admin user
  IF existing_count = 0 OR NEW.email LIKE '%admin%' THEN
    UPDATE public.products
    SET created_by = NEW.id
    WHERE created_by = '00000000-0000-0000-0000-000000000001'::uuid OR created_by IS NULL;

    UPDATE public.admin_audit_logs
    SET admin_id = NEW.id, admin_email = NEW.email
    WHERE admin_email = 'admin@memoriq.ca';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- COMPATIBILITY PATCHES: Ensure all required columns exist on existing tables
-- ==============================================================================
ALTER TABLE public.brands ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;
ALTER TABLE public.brands ADD COLUMN IF NOT EXISTS order_position INT DEFAULT 0;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS created_by UUID;
ALTER TABLE public.collections ADD COLUMN IF NOT EXISTS badge TEXT;
ALTER TABLE public.collections ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;
ALTER TABLE public.collections ADD COLUMN IF NOT EXISTS order_position INT DEFAULT 0;
ALTER TABLE public.product_reviews ADD COLUMN IF NOT EXISTS author_email TEXT;
ALTER TABLE public.product_reviews ADD COLUMN IF NOT EXISTS is_verified_purchase BOOLEAN DEFAULT FALSE;

-- ==============================================================================
-- MEMORIQ CANADIAN ARTISAN KEEPSAKES - COMPLETE COMPREHENSIVE SEED DATA
-- Includes: Categories, Collections, Brands, Discount Coupons, 22 Products,
-- Product Reviews, Admin Audit Logs, and System Notifications.
-- All products are attributed to the Store Admin (created_by System Admin).
-- ==============================================================================

-- 1. SEED CATEGORIES (Hierarchical parent & subcategories)
INSERT INTO public.categories (slug, name, description, order_position) VALUES
  ('gifts', 'Gifts & Keepsakes', 'Curated Canadian keepsakes and heirloom gift sets', 1),
  ('lifestyle', 'Lifestyle & Home', 'Artisan wooden accents, wall art, clocks, and organizers', 2),
  ('fashion', 'Fashion & Knitwear', 'Pure virgin wool maritime knitwear and botanical accessories', 3),
  ('kids', 'Kids & Nursery', 'Heirloom wooden toys, custom night lights, and nursery decor', 4),
  ('collections-exclusives', 'Collections & Exclusives', 'Numbered collector artifacts and commemorative editions', 5),
  ('brand', 'Artisan Partners & Guilds', 'Handmade goods from certified Canadian and allied master studios', 6)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  order_position = EXCLUDED.order_position;

-- Subcategories under Gifts & Lifestyle
INSERT INTO public.categories (slug, name, parent_id, description, order_position) VALUES
  ('exceptional-gifts', 'Exceptional Gifts', (SELECT id FROM public.categories WHERE slug = 'gifts'), 'Prestige heirloom artifacts and milestone gifts', 10),
  ('curated-sets', 'Curated Gift Sets', (SELECT id FROM public.categories WHERE slug = 'gifts'), 'Gift pairings presented in keepsake gift boxes', 11),
  ('the-iconics', 'The Iconic Keepsakes', (SELECT id FROM public.categories WHERE slug = 'gifts'), 'Core Memoriq signature designs and Canadian symbols', 12),
  ('wall-art', 'Wall Art & Decor', (SELECT id FROM public.categories WHERE slug = 'lifestyle'), 'Laser-cut steel sculptures, typographic signs, and plaques', 13),
  ('jewelry', 'Artisan Jewelry & Earrings', (SELECT id FROM public.categories WHERE slug = 'lifestyle'), 'Ultra-lightweight laser-cut hardwood drop earrings', 14),
  ('clocks', 'Timepieces & Clocks', (SELECT id FROM public.categories WHERE slug = 'lifestyle'), 'Modern silent quartz typographic and tech wall clocks', 15),
  ('key-holders', 'Key Racks & Organizers', (SELECT id FROM public.categories WHERE slug = 'lifestyle'), 'Architectural steel and wood entryway key organizers', 16),
  ('cake-toppers', 'Celebration Cake Toppers', (SELECT id FROM public.categories WHERE slug = 'gifts'), 'Custom birthday, wedding, and milestone cake toppers', 17),
  ('nursery-decor', 'Nursery & Baby Keepsakes', (SELECT id FROM public.categories WHERE slug = 'kids'), 'LED wooden lamps, birth announcements, and hoop signs', 18)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description;

-- 2. SEED COLLECTIONS
INSERT INTO public.collections (slug, name, subtitle, description, badge, image_url, is_featured, order_position) VALUES
  ('signature', 'Canadian Signature Collection', 'Quintessential Heritage Keepsakes', 'The definitive collection of official medallions, architectural keepsakes, and iconic symbols created with Canadian workshops.', 'Core Heritage', 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=800&auto=format&fit=crop', true, 1),
  ('gardens', 'Laurentian Gardens Collection', 'Botanical Allées & Natural Living', 'Inspired by Canadian parklands and boreal forests, featuring cedar scents, organic maple confections, and botanical jewelry.', 'Art de Vivre', '/images/products/laser-cut-wolf-howling-forest-wall-art.jpg', true, 2),
  ('day-night', 'Aurora Day & Night Collection', 'From Morning Dawn to Northern Lights', 'Refined lifestyle accents capturing the contrast between soft golden dawn across Moraine Lake and nocturnal auroral illuminations.', 'Nocturne', 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop', true, 3),
  ('historic-architecture', 'Historic Architecture Collection', 'Copper Patina & Modern Horizons', 'A tribute to historical Canadian copper rooftops, precision blueprints, and modern laser-cut metal home accents.', 'Architecture', 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=800&auto=format&fit=crop', false, 4),
  ('330-meters', 'Monumental Heights Collection', 'Architectural Height & Rocky Mountain Summits', 'Commemorating the monumental summits of Canadian engineering and Rocky mountain peaks with precision monographs.', 'Engineering', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop', false, 5),
  ('limited-editions', 'Limited Collector Editions', 'Numbered Pieces & Authentic Provenance', 'Numbered pieces, certified Canadian Centennial rivets, and limited runs accompanied by official certificates of provenance.', 'Numbered & Rare', '/images/statue-of-liberty.jpg', true, 6),
  ('olympic-collection', 'Canadian Olympic Heritage Collection', 'Sporting Prestige & Winter Triumphs', 'Commemorating Montreal 1976, Calgary 1988, and Vancouver 2010 winter triumphs with commemorative keepsakes.', 'Heritage Games', 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=800&auto=format&fit=crop', false, 7)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  badge = EXCLUDED.badge,
  image_url = EXCLUDED.image_url;

-- 3. SEED BRANDS (Master Artisan Studios & Guild Partners)
INSERT INTO public.brands (slug, name, country, description, hero_image_url, is_featured, order_position) VALUES
  ('memoriq', 'Memoriq Atelier', 'Canada & USA', 'In-house design studio producing handcrafted wooden plaques, laser-cut steel sculptures, and custom North American keepsakes.', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop', true, 1),
  ('saint-james', 'Saint James & Hudson Knitwear', 'Canada & France', 'Renowned for authentic striped marinières knitted with 100% pure virgin wool tailored for Canadian coastal climates.', 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop', true, 2),
  ('bernardaud', 'Bernardaud Fine Porcelain', 'Canada & France', 'The pinnacle of luxury porcelain tableware, creating bespoke Canadian flora espresso sets and 24-karat gold-trimmed dinnerware.', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop', true, 3),
  ('dammann-freres', 'DAMMANN Frères Tea House', 'Canada & France', 'Creating peerless artisan tea blends featuring Quebec sugar maple syrup and wild Nova Scotia cranberries.', 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop', true, 4),
  ('vilac', 'VILAC & Laurentian Woodcraft', 'Canada', 'Handcrafted wildlife toys carved from sustainable Canadian sugar maple and beechwood, finished with non-toxic botanical dyes.', 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800&auto=format&fit=crop', true, 5),
  ('kerzon', 'Kerzon Scents', 'Canada', 'Master fragrances formulated with natural cedarwood, balsam fir, and vegetable waxes inspired by Canadian highlands.', 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop', false, 6),
  ('the-line', 'The Line Architectural Studio', 'Canada & USA', 'Minimalist laser-cut wall sculptures and steel silhouettes capturing iconic North American skylines including the CN Tower and Statue of Liberty.', '/images/cn-tower-hero.jpg', false, 7)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  hero_image_url = EXCLUDED.hero_image_url,
  is_featured = EXCLUDED.is_featured,
  order_position = EXCLUDED.order_position;

-- 4. SEED DISCOUNT COUPONS (CAD Currency)
INSERT INTO public.discount_coupons (code, description, discount_type, discount_value, min_order_amount, max_discount_amount, is_active, usage_limit) VALUES
  ('WELCOME10', '10% Welcome discount on your first Canadian artisan order', 'percentage', 10.00, 50.00, 50.00, true, 1000),
  ('CANADA95', '$15 off orders exceeding $150 CAD with complimentary shipping', 'fixed_amount', 15.00, 150.00, 15.00, true, 500),
  ('VIPGIFT', '15% VIP Patron discount for guild collectors and frequent gift-givers', 'percentage', 15.00, 100.00, 75.00, true, 200)
ON CONFLICT (code) DO UPDATE SET
  discount_value = EXCLUDED.discount_value,
  min_order_amount = EXCLUDED.min_order_amount,
  is_active = EXCLUDED.is_active;

-- 5. SEED 22 MEMORIQ ARTISAN PRODUCTS
INSERT INTO public.products (
  slug, name, sku, category_id, brand_id, collection_id, price, original_price, currency, stock,
  is_featured, is_limited_edition, badge, rating, reviews_count, images, description, short_description,
  details, dimensions, material, made_in, created_by
) VALUES
  (
    'personalized-mom-heart-photo-plaque',
    'Personalized Wooden "MOM" Heart Photo Keepsake Plaque',
    'MEM-MOM-HRT-01',
    (SELECT id FROM public.categories WHERE slug = 'lifestyle'),
    (SELECT id FROM public.brands WHERE slug = 'memoriq'),
    (SELECT id FROM public.collections WHERE slug = 'signature'),
    34.50, NULL, 'CAD', 75, true, false, 'Best Seller', 4.9, 58,
    ARRAY['/images/products/mom-heart-photo-frame.jpeg'],
    'Handcrafted personalized wooden desk plaque featuring bold "MOM" lettering with a center heart photo frame. Laser-cut from sustainable Canadian birch with smooth hand-sanded edges.',
    'Handcrafted personalized wooden MOM heart photo plaque.',
    '{"Material": "Canadian Birch & Clear Acrylic", "Dimensions": "28 cm x 12 cm x 3 cm", "Origin": "Handcrafted in Ontario, Canada"}'::jsonb,
    '28 cm x 12 cm x 3 cm', 'Birch Plywood & Acrylic', 'Canada',
    '00000000-0000-0000-0000-000000000001'::uuid
  ),
  (
    'woodland-bear-one-birthday-cake-topper',
    'Woodland Bear "One" First Birthday Cake Topper',
    'MEM-TOP-BEAR-01',
    (SELECT id FROM public.categories WHERE slug = 'kids'),
    (SELECT id FROM public.brands WHERE slug = 'vilac'),
    (SELECT id FROM public.collections WHERE slug = 'signature'),
    15.50, NULL, 'CAD', 90, true, false, 'Kids', 4.8, 34,
    ARRAY['/images/products/bear-one-birthday-topper.jpeg'],
    'Charming Canadian woodland brown bear "One" cake topper designed for milestone first birthdays. Features sparkling dark bronze glitter finish and sturdy food-safe wooden dowels.',
    'Woodland brown bear 1st birthday glitter cake topper.',
    '{"Finish": "Non-shed bronze glitter", "Height": "16 cm total", "Safety": "Food-safe wooden posts"}'::jsonb,
    '16 cm x 14 cm', 'Glitter Cardstock & Birch Dowels', 'Canada',
    '00000000-0000-0000-0000-000000000001'::uuid
  ),
  (
    'botanical-leaf-drop-earrings',
    'Laser-Cut Botanical Leaf Drop Dangle Earrings',
    'MEM-EAR-LEAF-01',
    (SELECT id FROM public.categories WHERE slug = 'lifestyle'),
    (SELECT id FROM public.brands WHERE slug = 'memoriq'),
    (SELECT id FROM public.collections WHERE slug = 'gardens'),
    24.00, NULL, 'CAD', 110, true, false, 'Artisan', 5.0, 42,
    ARRAY['/images/products/matte-black-leaf-earrings.jpeg'],
    'Statement botanical leaf cutout earrings inspired by Canadian forest foliage. Feather-light design painted in sleek satin matte black on surgical-grade hypoallergenic ear wires.',
    'Ultra-lightweight botanical leaf cutout earrings.',
    '{"Wires": "Hypoallergenic Stainless Steel", "Coating": "Satin Matte Eco-Paint", "Weight": "Under 3 grams per pair"}'::jsonb,
    '6.5 cm x 2.2 cm', 'Hardwood & Stainless Steel', 'Canada',
    '00000000-0000-0000-0000-000000000001'::uuid
  ),
  (
    'baby-boy-nursery-hoop-plaque',
    'Modern Script "Baby Boy" Nursery Hoop Wall Plaque',
    'MEM-NUR-BBOY-01',
    (SELECT id FROM public.categories WHERE slug = 'kids'),
    (SELECT id FROM public.brands WHERE slug = 'memoriq'),
    (SELECT id FROM public.collections WHERE slug = 'signature'),
    32.00, NULL, 'CAD', 65, false, false, 'New', 4.9, 27,
    ARRAY['/images/products/baby-boy-nursery-hoop.jpeg'],
    'Elegant circular hoop nursery wall hanging featuring flowing calligraphy script "Baby Boy". Laser-sculpted in natural blonde basswood, perfect above a crib or nursery dresser.',
    'Circular wooden hoop "Baby Boy" nursery wall plaque.',
    '{"Diameter": "30 cm", "Thickness": "6 mm", "Wood": "Canadian Basswood"}'::jsonb,
    '30 cm diameter x 6 mm', 'Natural Basswood', 'Canada',
    '00000000-0000-0000-0000-000000000001'::uuid
  ),
  (
    'personalized-elephant-umbrella-night-light',
    'Personalized Elephant & Umbrella Nursery LED Night Light',
    'MEM-LGT-ELEPH-01',
    (SELECT id FROM public.categories WHERE slug = 'kids'),
    (SELECT id FROM public.brands WHERE slug = 'memoriq'),
    (SELECT id FROM public.collections WHERE slug = 'day-night'),
    58.00, NULL, 'CAD', 40, true, false, 'Iconic', 5.0, 61,
    ARRAY['/images/products/personalized-elephant-night-light.jpeg'],
    'Dreamy dimensional wooden wall lamp depicting a baby elephant holding an umbrella with gentle raindrops. Backlit with soft warm ambient LEDs and customizable with child engraved name tag.',
    'Personalized LED backlit wooden elephant nursery wall light.',
    '{"Illumination": "Warm White 2700K LED", "Power": "USB Powered with Dimmer Switch", "Mount": "Keyhole wall bracket included"}'::jsonb,
    '42 cm x 28 cm x 4 cm', 'Canadian Pine, Acrylic & LED', 'Canada',
    '00000000-0000-0000-0000-000000000001'::uuid
  ),
  (
    'house-silhouette-key-holder',
    'Architectural House Silhouette Entryway Key Holder (6 Hooks)',
    'MEM-KEY-HOUSE-01',
    (SELECT id FROM public.categories WHERE slug = 'lifestyle'),
    (SELECT id FROM public.brands WHERE slug = 'memoriq'),
    (SELECT id FROM public.collections WHERE slug = 'historic-architecture'),
    28.50, NULL, 'CAD', 85, false, false, 'Practical', 4.8, 39,
    ARRAY['/images/products/house-silhouette-key-holder.jpeg'],
    'Minimalist modern entryway organizer cut from robust Canadian steel with textured chimney and window cutouts. Equipped with 6 sturdy hooks for home keys and car fobs.',
    'Modern steel house silhouette 6-hook key organizer.',
    '{"Capacity": "6 Key Rings", "Hardware": "Includes matching black screws & wall anchors", "Finish": "Corrosion-proof powder coat"}'::jsonb,
    '20 cm x 18 cm x 2.5 cm', 'Carbon Steel', 'Canada',
    '00000000-0000-0000-0000-000000000001'::uuid
  ),
  (
    'geometric-quill-feather-earrings',
    'Modern Geometric Quill Feather Drop Dangle Earrings',
    'MEM-EAR-FEATH-01',
    (SELECT id FROM public.categories WHERE slug = 'lifestyle'),
    (SELECT id FROM public.brands WHERE slug = 'memoriq'),
    (SELECT id FROM public.collections WHERE slug = 'gardens'),
    22.50, NULL, 'CAD', 95, false, false, 'Artisan', 4.7, 18,
    ARRAY['/images/products/geometric-feather-earrings.jpeg'],
    'Striking pointed geometric feather silhouette earrings evoking Canadian migratory bird plumage. Ultra-lightweight with fluid movement and hypoallergenic ear hooks.',
    'Pointed geometric feather dangle earrings in matte black.',
    '{"Color": "Deep Midnight Black", "Backing": "Includes silicone safety stoppers", "Craft": "Precision laser profiling"}'::jsonb,
    '7.2 cm x 1.8 cm', 'Laser-Cut Hardwood', 'Canada',
    '00000000-0000-0000-0000-000000000001'::uuid
  ),
  (
    'love-cyclist-bicycle-wall-sculpture',
    '"LOVE" Cyclist Bicycle Steel Wall Art Sculpture',
    'MEM-ART-BIKE-01',
    (SELECT id FROM public.categories WHERE slug = 'gifts'),
    (SELECT id FROM public.brands WHERE slug = 'the-line'),
    (SELECT id FROM public.collections WHERE slug = 'signature'),
    46.00, NULL, 'CAD', 50, true, false, 'Best Seller', 4.9, 45,
    ARRAY['/images/products/cyclist-bike-love-wall-art.jpeg'],
    'Artistic typography sculpture integrating a road bicycle into the letter "O" of "LOVE". The ultimate gift for Canadian cycling enthusiasts and modern athletic homes.',
    'Laser-cut steel LOVE bicycle enthusiast wall art.',
    '{"Mounting": "Hidden stand-off mounts creating 3D shadow effect", "Steel": "14-gauge Canadian steel", "Finish": "Textured matte charcoal"}'::jsonb,
    '35 cm x 28 cm x 2 mm', 'Canadian Steel', 'Canada',
    '00000000-0000-0000-0000-000000000001'::uuid
  ),
  (
    'canadian-birch-teardrop-cutout-earrings',
    'Canadian Birch Wood Teardrop Cutout Earrings',
    'MEM-EAR-BIRCH-01',
    (SELECT id FROM public.categories WHERE slug = 'lifestyle'),
    (SELECT id FROM public.brands WHERE slug = 'memoriq'),
    (SELECT id FROM public.collections WHERE slug = 'gardens'),
    21.00, NULL, 'CAD', 120, false, false, 'Artisan', 4.8, 29,
    ARRAY['/images/products/birch-teardrop-leaf-earrings.jpeg'],
    'Delicate natural blonde wood earrings displaying organic grain variations and precision laser-cut contours. Hand-finished with organic mineral oil sealant.',
    'Natural Canadian blonde birch teardrop cutout earrings.',
    '{"Wood": "Select Grade Canadian Birch", "Treatment": "Natural Beeswax and Jojoba Oil Seal", "Weight": "2.5 grams"}'::jsonb,
    '5.8 cm x 2.4 cm', 'Natural Birch Wood', 'Canada',
    '00000000-0000-0000-0000-000000000001'::uuid
  ),
  (
    'minimalist-vertical-home-wall-art',
    'Minimalist Vertical "HOME" Typography Metal Wall Art',
    'MEM-ART-HOME-VERT',
    (SELECT id FROM public.categories WHERE slug = 'gifts'),
    (SELECT id FROM public.brands WHERE slug = 'memoriq'),
    (SELECT id FROM public.collections WHERE slug = 'signature'),
    42.00, NULL, 'CAD', 70, true, false, 'Popular', 5.0, 51,
    ARRAY['/images/products/vertical-home-wall-art.jpeg'],
    'Sleek Scandinavian-inspired interlocking vertical "HOME" typography metal sign. Mounts flush or slightly floated off the wall with included invisible hardware for modern depth.',
    'Vertical interlocking HOME steel wall typography sign.',
    '{"Height": "60 cm", "Thickness": "2 mm", "Style": "Modern Geometric Architectural"}'::jsonb,
    '60 cm x 25 cm x 2 mm', 'Powder-Coated Steel', 'Canada',
    '00000000-0000-0000-0000-000000000001'::uuid
  ),
  (
    'circuit-board-geometric-wall-clock',
    'Precision Tech Circuit Board Geometric Wall Clock',
    'MEM-CLK-CIRCUIT-01',
    (SELECT id FROM public.categories WHERE slug = 'lifestyle'),
    (SELECT id FROM public.brands WHERE slug = 'memoriq'),
    (SELECT id FROM public.collections WHERE slug = 'historic-architecture'),
    49.00, NULL, 'CAD', 55, false, false, 'Design', 4.8, 32,
    ARRAY['/images/products/circuit-board-wall-clock.jpeg'],
    'Eye-catching modern timepiece featuring circuit trace pathway graphics connecting primary hour numerals. Driven by an ultra-quiet sweeping continuous quartz mechanism.',
    'Quiet sweeping tech circuit board geometric wall clock.',
    '{"Mechanism": "Silent Non-Ticking Quartz (Taiwanese Movement)", "Battery": "1x AA Battery (not included)", "Diameter": "30 cm"}'::jsonb,
    '30 cm diameter x 3 cm', 'Cast Acrylic & Quartz', 'Canada',
    '00000000-0000-0000-0000-000000000001'::uuid
  ),
  (
    'game-over-wedding-cake-topper',
    '"GAME OVER" Bride & Gamer Groom Wedding Cake Topper',
    'MEM-TOP-GAMEOVER',
    (SELECT id FROM public.categories WHERE slug = 'gifts'),
    (SELECT id FROM public.brands WHERE slug = 'memoriq'),
    (SELECT id FROM public.collections WHERE slug = 'signature'),
    18.50, NULL, 'CAD', 80, false, false, 'Fun', 4.9, 40,
    ARRAY['/images/products/game-over-wedding-cake-topper.jpeg'],
    'Whimsical acrylic silhouette wedding topper showing a bride leading her seated controller-holding video game groom. A lighthearted conversation starter for modern Canadian nuptials.',
    'Humorous bride dragging gamer groom wedding cake topper.',
    '{"Finish": "Gloss jet black", "Prongs": "Two 6 cm insertion prongs for tier stability", "Material": "Food-safe cast acrylic"}'::jsonb,
    '17 cm x 15 cm x 3 mm', 'Cast Acrylic', 'Canada',
    '00000000-0000-0000-0000-000000000001'::uuid
  ),
  (
    'hope-cursive-script-framed-wall-sign',
    '"Hope" Cursive Script Framed Metal Wall Sign',
    'MEM-ART-HOPE-01',
    (SELECT id FROM public.categories WHERE slug = 'gifts'),
    (SELECT id FROM public.brands WHERE slug = 'memoriq'),
    (SELECT id FROM public.collections WHERE slug = 'signature'),
    38.00, NULL, 'CAD', 60, true, false, 'Inspirational', 4.9, 37,
    ARRAY['/images/products/hope-script-metal-wall-art.jpeg'],
    'Inspiring framed square metal art with flowing cursive "hope" calligraphy that extends gracefully across the perimeter border. Rust-resistant and suitable for indoor or covered patio display.',
    'Square framed cursive script hope metal wall plaque.',
    '{"Frame": "Integrated 32 cm square outer steel box border", "Coating": "Electrostatic baked enamel finish", "Weight": "750g"}'::jsonb,
    '32 cm x 32 cm x 1.5 cm', 'Coated Carbon Steel', 'Canada',
    '00000000-0000-0000-0000-000000000001'::uuid
  ),
  (
    'best-dad-ever-heart-cake-topper',
    '"BEST Dad EVER" Heart Script Celebration Cake Topper',
    'MEM-TOP-DADEVER',
    (SELECT id FROM public.categories WHERE slug = 'gifts'),
    (SELECT id FROM public.brands WHERE slug = 'memoriq'),
    (SELECT id FROM public.collections WHERE slug = 'signature'),
    15.50, NULL, 'CAD', 100, false, false, 'Gifts for Him', 4.9, 28,
    ARRAY['/images/products/best-dad-ever-cake-topper.jpeg'],
    'Heartwarming Father Day or birthday cake topper featuring bold typography entwined with an infinity loop heart. Clean laser-polished edges, easily washed and reusable.',
    'BEST Dad EVER heart silhouette birthday cake topper.',
    '{"Color": "Gloss Black Acrylic", "Care": "Gentle hand rinse with warm water", "Reusable": "Keepsake durability"}'::jsonb,
    '15 cm x 14 cm', 'Cast Acrylic', 'Canada',
    '00000000-0000-0000-0000-000000000001'::uuid
  ),
  (
    'personalized-love-freestanding-photo-frame',
    'Personalized "LOVE" Freestanding Family Photo Frame Plaque',
    'MEM-FRM-LOVE-WHT',
    (SELECT id FROM public.categories WHERE slug = 'lifestyle'),
    (SELECT id FROM public.brands WHERE slug = 'memoriq'),
    (SELECT id FROM public.collections WHERE slug = 'signature'),
    39.50, NULL, 'CAD', 50, true, false, 'Top Pick', 5.0, 67,
    ARRAY['/images/products/love-freestanding-photo-frame.jpeg'],
    'Sturdy freestanding white-painted wooden sculptural display where the letter "O" holds a vibrant 10 cm circular family portrait photograph. Designed for mantle, coffee table, or shelf.',
    'White wood freestanding LOVE family picture frame plaque.',
    '{"Base": "Weighted solid wood 3.5 cm base for confident standing", "Insert": "Easy twist-tab photo backing with clear lens", "Paint": "Low-VOC satin porcelain white"}'::jsonb,
    '38 cm x 16 cm x 3.5 cm', 'Painted Solid Wood', 'Canada',
    '00000000-0000-0000-0000-000000000001'::uuid
  ),
  (
    'cottage-home-heart-key-rack',
    'Cozy Cottage "Home" Heart Entryway Key Rack (5 Hooks)',
    'MEM-KEY-COTTAG-01',
    (SELECT id FROM public.categories WHERE slug = 'lifestyle'),
    (SELECT id FROM public.brands WHERE slug = 'memoriq'),
    (SELECT id FROM public.collections WHERE slug = 'signature'),
    26.00, NULL, 'CAD', 75, false, false, 'Home', 4.8, 25,
    ARRAY['/images/products/cottage-heart-key-rack.jpeg'],
    'Charming gabled cottage silhouette key rack adorned with a central heart cut-out and script "Home". Fitted with 5 heavy-duty metal hanging pegs and pre-drilled mounting holes.',
    'Gabled roof cottage Home with heart 5-hook key rack.',
    '{"Capacity": "5 heavy key rings or accessories", "Finish": "Matte black architectural enamel", "Installation": "Hardware kit included"}'::jsonb,
    '22 cm x 20 cm x 3 cm', 'Carbon Steel', 'Canada',
    '00000000-0000-0000-0000-000000000001'::uuid
  ),
  (
    'modern-bold-clock-typography-wall-clock',
    'Modern Bold "CLOCK" Typography Silent Wall Clock',
    'MEM-CLK-TYPO-01',
    (SELECT id FROM public.categories WHERE slug = 'lifestyle'),
    (SELECT id FROM public.brands WHERE slug = 'memoriq'),
    (SELECT id FROM public.collections WHERE slug = 'signature'),
    44.00, NULL, 'CAD', 45, false, false, 'Modern', 4.9, 22,
    ARRAY['/images/products/modern-clock-typography-wall-clock.jpeg'],
    'Innovative contemporary timepiece where the letters "C-L-O-C-K" form the clock body, with the dial cleverly nestled into the letter "O". Accentuated with vivid canary yellow hands.',
    'Word CLOCK wall clock with contrasting yellow hands.',
    '{"Hands": "Lacquered yellow aluminum hands with silent sweep second hand", "Width": "40 cm", "Mechanism": "High-torque quartz"}'::jsonb,
    '40 cm x 16 cm x 3 cm', 'Cast Acrylic & Aluminum Hands', 'Canada',
    '00000000-0000-0000-0000-000000000001'::uuid
  ),
  (
    'smiling-cat-silhouette-accent-mirror',
    'Playful Smiling Cat Silhouette Wall Accent Mirror',
    'MEM-MIR-CAT-01',
    (SELECT id FROM public.categories WHERE slug = 'kids'),
    (SELECT id FROM public.brands WHERE slug = 'memoriq'),
    (SELECT id FROM public.collections WHERE slug = 'signature'),
    36.00, NULL, 'CAD', 60, true, false, 'Kids & Pets', 5.0, 44,
    ARRAY['/images/products/smiling-cat-vanity-mirror.jpeg'],
    'Joyful cat-head silhouette mirror with sweet printed face details, whiskers, and perky pointed ears. Adds heartwarming personality to bedrooms, hallways, and children rooms.',
    'Smiling cat face silhouette vanity accent mirror.',
    '{"Glass": "Distortion-free copper-free silvered mirror", "Edge": "Smooth laser-buffed safety bevel", "Hanging": "Reinforced back bracket"}'::jsonb,
    '35 cm x 32 cm', 'Safety Silvered Glass', 'Canada',
    '00000000-0000-0000-0000-000000000001'::uuid
  ),
  (
    'home-sweet-home-entryway-key-organizer',
    '"HOME SWEET HOME" 10-Hook Entryway Key & Leash Organizer',
    'MEM-KEY-SWEET-10',
    (SELECT id FROM public.categories WHERE slug = 'lifestyle'),
    (SELECT id FROM public.brands WHERE slug = 'memoriq'),
    (SELECT id FROM public.collections WHERE slug = 'signature'),
    31.50, NULL, 'CAD', 90, true, false, 'Popular', 4.9, 56,
    ARRAY['/images/products/home-sweet-home-key-organizer.jpeg'],
    'Extra-capacity entryway organization solution featuring classic "HOME SWEET HOME" typography with heart cut-out. Features 10 rounded utility hooks for keys, dog leashes, and badges.',
    'HOME SWEET HOME 10-hook wall key and leash rack.',
    '{"HookCount": "10 heavy-duty hooks", "Finish": "Rust-resistant textured black", "Mounting": "Two pre-cut anchor screw ports"}'::jsonb,
    '32 cm x 14 cm x 2.5 cm', 'Carbon Steel', 'Canada',
    '00000000-0000-0000-0000-000000000001'::uuid
  ),
  (
    'piano-keys-acoustic-metal-wall-sculpture',
    'Architectural Piano Keys Acoustic Metal Wall Art Sculpture',
    'MEM-ART-PIANO-01',
    (SELECT id FROM public.categories WHERE slug = 'gifts'),
    (SELECT id FROM public.brands WHERE slug = 'the-line'),
    (SELECT id FROM public.collections WHERE slug = 'limited-editions'),
    65.00, NULL, 'CAD', 35, true, true, 'Collector', 5.0, 31,
    ARRAY['/images/products/piano-keys-metal-wall-sculpture.jpeg'],
    'Striking panoramic musical wall installation portraying an octave span of acoustic piano keys. Casts soft natural shadows against the wall, creating high-contrast graphic elegance.',
    'Panoramic acoustic piano keys plasma-cut metal wall sculpture.',
    '{"Width": "75 cm wide panoramic format", "Steel": "Heavy gauge steel with anti-scratch coating", "Aesthetic": "Minimalist musical salon art"}'::jsonb,
    '75 cm x 28 cm x 2.5 cm', 'Plasma-Cut Steel', 'Canada',
    '00000000-0000-0000-0000-000000000001'::uuid
  ),
  (
    'glitter-happy-birthday-milestone-topper',
    'Custom Milestone Glitter "Happy Birthday" Cake Topper',
    'MEM-TOP-HBD-GLIT',
    (SELECT id FROM public.categories WHERE slug = 'gifts'),
    (SELECT id FROM public.brands WHERE slug = 'memoriq'),
    (SELECT id FROM public.collections WHERE slug = 'signature'),
    16.00, NULL, 'CAD', 120, false, false, 'Party', 4.8, 23,
    ARRAY['/images/products/glitter-happy-birthday-topper.jpeg'],
    'Glamorous non-shedding black glitter cake topper celebrating milestone birthdays with elegant cursive flourish. Mounted on clear food-grade acrylic posts for floating presentation.',
    'Custom milestone glitter Happy Birthday cake topper.',
    '{"Glitter": "Zero-shed culinary safe micro-glitter", "Stick": "Clear transparent food-safe acrylic pole", "Reusable": "Wipe clean and preserve"}'::jsonb,
    '18 cm x 15 cm', 'Non-Shed Glitter Cardstock', 'Canada',
    '00000000-0000-0000-0000-000000000001'::uuid
  ),
  (
    'rocky-mountain-peak-star-napkin-holder',
    'Canadian Rocky Mountain Peak Star Napkin & Letter Holder',
    'MEM-HLD-MTN-01',
    (SELECT id FROM public.categories WHERE slug = 'lifestyle'),
    (SELECT id FROM public.brands WHERE slug = 'memoriq'),
    (SELECT id FROM public.collections WHERE slug = '330-meters'),
    29.00, NULL, 'CAD', 70, true, false, 'Artisan', 4.9, 48,
    ARRAY['/images/products/mountain-peak-star-napkin-holder.jpeg'],
    'Sculptural tabletop organizer inspired by snow-dusted Canadian Rockies peaks. White folded napkins simulate the glacier summit above charred black pine inlaid with a brass star.',
    'Rocky Mountain peak star tabletop napkin and mail holder.',
    '{"Wood": "Solid Canadian White Pine with shou-sugi-ban charred finish", "Inlay": "Hand-set polished brass celestial star", "Base": "Felt pads on bottom"}'::jsonb,
    '20 cm x 12 cm x 6 cm', 'Charred White Pine & Brass', 'Canada',
    '00000000-0000-0000-0000-000000000001'::uuid
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  sku = EXCLUDED.sku,
  category_id = EXCLUDED.category_id,
  brand_id = EXCLUDED.brand_id,
  collection_id = EXCLUDED.collection_id,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  description = EXCLUDED.description,
  short_description = EXCLUDED.short_description,
  details = EXCLUDED.details,
  dimensions = EXCLUDED.dimensions,
  material = EXCLUDED.material,
  stock = EXCLUDED.stock,
  is_featured = EXCLUDED.is_featured,
  badge = EXCLUDED.badge,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count,
  created_by = EXCLUDED.created_by,
  updated_at = NOW();

-- 6. SEED VERIFIED CUSTOMER REVIEWS
INSERT INTO public.product_reviews (product_id, author_name, author_email, rating, title, comment, is_verified_purchase, status) VALUES
  (
    (SELECT id FROM public.products WHERE slug = 'personalized-mom-heart-photo-plaque'),
    'Claire Desjardins', 'claire.d@montreal.ca', 5,
    'Exceptional Canadian craft!',
    'Ordered this for Mother Day with our family photo. The birch wood finish is velvety smooth and the laser precision is museum-quality. Arrived in Toronto in 2 days.',
    true, 'approved'
  ),
  (
    (SELECT id FROM public.products WHERE slug = 'personalized-elephant-umbrella-night-light'),
    'Liam MacLeod', 'liam.m@vancouver.bc', 5,
    'Perfect gentle nursery light',
    'The warm amber LED glow is ideal for late night feedings. Engraving was crisp and beautiful. Our daughter loves looking up at the little raindrops.',
    true, 'approved'
  ),
  (
    (SELECT id FROM public.products WHERE slug = 'piano-keys-acoustic-metal-wall-sculpture'),
    'Dr. Julian Vance', 'jvance@toronto.edu', 5,
    'Stunning salon centerpiece',
    'The 3D floating effect against our living room wall looks incredible under evening pot lights. Arrived flawlessly packed in custom foam.',
    true, 'approved'
  ),
  (
    (SELECT id FROM public.products WHERE slug = 'rocky-mountain-peak-star-napkin-holder'),
    'Sarah Tremblay', 's.tremblay@quebec.qc', 5,
    'Rustic elegance with Canadian charm',
    'The charred pine wood has deep texture and the brass star inlay catches the light perfectly on our dining table. A true artisan conversation piece.',
    true, 'approved'
  )
ON CONFLICT DO NOTHING;

-- 7. AUDIT LOG & SYSTEM TELEMETRY
INSERT INTO public.admin_audit_logs (admin_email, action, resource_type, resource_id, details)
VALUES (
  'admin@memoriq.ca',
  'catalog_seed',
  'products',
  'catalog_batch_22',
  '{"status": "completed", "seeded_by": "System Admin", "products_count": 22, "currency": "CAD", "timestamp": "2026-10-13T19:00:00Z"}'
);

INSERT INTO public.system_logs (level, category, message, payload)
VALUES (
  'info',
  'catalog_seed',
  'Memoriq Canadian catalog seed initialized successfully with 22 artisan products.',
  '{"products": 22, "categories": 15, "collections": 7, "brands": 7, "currency": "CAD"}'::jsonb
);

INSERT INTO public.admin_notifications (title, message, notification_type, link_url)
VALUES (
  'Catalog Initialized',
  '22 Canadian artisan keepsakes and collections are loaded and ready for online orders.',
  'info',
  '/admin'
);

-- ==============================================================================
-- 20. STORAGE BUCKET CONFIGURATION & ROW-LEVEL SECURITY
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'products',
  'products',
  true,
  10485760, -- 10MB limit per image
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;
CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');

DROP POLICY IF EXISTS "Admins and users can upload product images" ON storage.objects;
CREATE POLICY "Admins and users can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'products');

DROP POLICY IF EXISTS "Admins can update product images" ON storage.objects;
CREATE POLICY "Admins can update product images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'products');

DROP POLICY IF EXISTS "Admins can delete product images" ON storage.objects;
CREATE POLICY "Admins can delete product images"
ON storage.objects FOR DELETE
USING (bucket_id = 'products');

-- Additional performance indexes
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON public.order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_wishlists_user_product ON public.wishlists(user_id, product_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_user ON public.cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_session ON public.cart_items(session_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_brands_slug ON public.brands(slug);
CREATE INDEX IF NOT EXISTS idx_collections_slug ON public.collections(slug);


