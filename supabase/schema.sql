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

  -- Check if profile has admin or staff role
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

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
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

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

-- ------------------------------------------------------------------------------
-- Catalog Policies (Public Read, Admin Full Write)
-- ------------------------------------------------------------------------------
-- Products
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Admin full manage products" ON public.products FOR ALL USING (public.is_admin());

-- Categories
CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admin full manage categories" ON public.categories FOR ALL USING (public.is_admin());

-- Brands
CREATE POLICY "Public read brands" ON public.brands FOR SELECT USING (true);
CREATE POLICY "Admin full manage brands" ON public.brands FOR ALL USING (public.is_admin());

-- Collections
CREATE POLICY "Public read collections" ON public.collections FOR SELECT USING (true);
CREATE POLICY "Admin full manage collections" ON public.collections FOR ALL USING (public.is_admin());

-- Coupons
CREATE POLICY "Public read active coupons" ON public.discount_coupons FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Admin full manage coupons" ON public.discount_coupons FOR ALL USING (public.is_admin());

-- Reviews
CREATE POLICY "Public read approved reviews" ON public.product_reviews FOR SELECT USING (status = 'approved' OR public.is_admin());
CREATE POLICY "Users insert reviews" ON public.product_reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full manage reviews" ON public.product_reviews FOR ALL USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- Customer & Admin User Policies
-- ------------------------------------------------------------------------------
CREATE POLICY "Users manage own profile" ON public.profiles FOR ALL USING (auth.uid() = id OR public.is_admin());
CREATE POLICY "Admin view all profiles" ON public.profiles FOR SELECT USING (public.is_admin());

CREATE POLICY "Users manage own cart" ON public.cart_items FOR ALL USING (auth.uid() = user_id OR session_id IS NOT NULL OR public.is_admin());
CREATE POLICY "Users manage own wishlist" ON public.wishlists FOR ALL USING (auth.uid() = user_id OR public.is_admin());

-- ------------------------------------------------------------------------------
-- Orders Policies
-- ------------------------------------------------------------------------------
CREATE POLICY "Users view own orders or Admin view all" ON public.orders FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Guests and Users can place orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin update orders" ON public.orders FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete orders" ON public.orders FOR DELETE USING (public.is_admin());

CREATE POLICY "Users view own order items or Admin view all" ON public.order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND (orders.user_id = auth.uid() OR public.is_admin()))
);
CREATE POLICY "Allow order items creation" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin update order items" ON public.order_items FOR ALL USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- Telemetry, Logs & Admin Monitoring Policies
-- ------------------------------------------------------------------------------
-- Analytics Events (Public write, Admin read)
CREATE POLICY "Public can log analytics events" ON public.analytics_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view all analytics events" ON public.analytics_events FOR SELECT USING (public.is_admin());

-- System Logs (Public write for errors, Admin read)
CREATE POLICY "Public can log system errors" ON public.system_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view all system logs" ON public.system_logs FOR SELECT USING (public.is_admin());

-- Admin Audit Logs (Admin only)
CREATE POLICY "Admin can view all audit logs" ON public.admin_audit_logs FOR SELECT USING (public.is_admin());
CREATE POLICY "Admin can create audit logs" ON public.admin_audit_logs FOR INSERT WITH CHECK (public.is_admin());

-- Admin Notifications (Admin only)
CREATE POLICY "Admin can view notifications" ON public.admin_notifications FOR ALL USING (public.is_admin());

-- Newsletter Subscribers
CREATE POLICY "Public can subscribe to newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view all subscribers" ON public.newsletter_subscribers FOR SELECT USING (public.is_admin());
