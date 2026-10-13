export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded' | 'failed';

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          slug: string;
          name: string;
          parent_id: string | null;
          description: string | null;
          image_url: string | null;
          order_position: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          parent_id?: string | null;
          description?: string | null;
          image_url?: string | null;
          order_position?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          parent_id?: string | null;
          description?: string | null;
          image_url?: string | null;
          order_position?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      brands: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          logo_url: string | null;
          hero_image_url: string | null;
          website: string | null;
          country?: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description?: string | null;
          logo_url?: string | null;
          hero_image_url?: string | null;
          website?: string | null;
          country?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          description?: string | null;
          logo_url?: string | null;
          hero_image_url?: string | null;
          website?: string | null;
          country?: string | null;
          created_at?: string;
        };
      };
      collections: {
        Row: {
          id: string;
          slug: string;
          name: string;
          subtitle: string | null;
          description: string | null;
          badge: string | null;
          image_url: string | null;
          is_featured: boolean;
          order_position: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          subtitle?: string | null;
          description?: string | null;
          badge?: string | null;
          image_url?: string | null;
          is_featured?: boolean;
          order_position?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          subtitle?: string | null;
          description?: string | null;
          badge?: string | null;
          image_url?: string | null;
          is_featured?: boolean;
          order_position?: number;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          slug: string;
          name: string;
          sku: string | null;
          category_id: string | null;
          brand_id: string | null;
          collection_id: string | null;
          price: number;
          original_price: number | null;
          currency: string;
          description: string | null;
          short_description: string | null;
          details: Json;
          dimensions: string | null;
          material: string | null;
          made_in: string;
          images: string[];
          stock: number;
          is_limited_edition: boolean;
          limited_pieces: number | null;
          is_featured: boolean;
          rating: number;
          reviews_count: number;
          badge?: string | null;
          low_stock_threshold?: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          sku?: string | null;
          category_id?: string | null;
          brand_id?: string | null;
          collection_id?: string | null;
          price: number;
          original_price?: number | null;
          currency?: string;
          description?: string | null;
          short_description?: string | null;
          details?: Json;
          dimensions?: string | null;
          material?: string | null;
          made_in?: string;
          images?: string[];
          stock?: number;
          low_stock_threshold?: number;
          badge?: string | null;
          is_limited_edition?: boolean;
          limited_pieces?: number | null;
          is_featured?: boolean;
          rating?: number;
          reviews_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          sku?: string | null;
          category_id?: string | null;
          brand_id?: string | null;
          collection_id?: string | null;
          price?: number;
          original_price?: number | null;
          currency?: string;
          description?: string | null;
          short_description?: string | null;
          details?: Json;
          dimensions?: string | null;
          material?: string | null;
          made_in?: string;
          images?: string[];
          stock?: number;
          low_stock_threshold?: number;
          badge?: string | null;
          is_limited_edition?: boolean;
          limited_pieces?: number | null;
          is_featured?: boolean;
          rating?: number;
          reviews_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          role: 'customer' | 'staff' | 'moderator' | 'admin';
          default_shipping_address: Json;
          language: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          role?: 'customer' | 'staff' | 'moderator' | 'admin';
          default_shipping_address?: Json;
          language?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          role?: 'customer' | 'staff' | 'moderator' | 'admin';
          default_shipping_address?: Json;
          language?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      cart_items: {
        Row: {
          id: string;
          user_id: string | null;
          session_id: string | null;
          product_id: string;
          quantity: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          session_id?: string | null;
          product_id: string;
          quantity?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          session_id?: string | null;
          product_id?: string;
          quantity?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      wishlists: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          user_id: string | null;
          customer_email: string;
          customer_name: string;
          shipping_address: Json;
          subtotal: number;
          shipping_cost: number;
          tax: number;
          total: number;
          currency: string;
          status: OrderStatus;
          payment_status: PaymentStatus;
          stripe_session_id: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          user_id?: string | null;
          customer_email: string;
          customer_name: string;
          shipping_address: Json;
          subtotal: number;
          shipping_cost?: number;
          tax?: number;
          total: number;
          currency?: string;
          status?: OrderStatus;
          payment_status?: PaymentStatus;
          stripe_session_id?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_number?: string;
          user_id?: string | null;
          customer_email?: string;
          customer_name?: string;
          shipping_address?: Json;
          subtotal?: number;
          shipping_cost?: number;
          tax?: number;
          total?: number;
          currency?: string;
          status?: OrderStatus;
          payment_status?: PaymentStatus;
          stripe_session_id?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string | null;
          product_name: string;
          product_sku: string | null;
          unit_price: number;
          quantity: number;
          total_price: number;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id?: string | null;
          product_name: string;
          product_sku?: string | null;
          unit_price: number;
          quantity: number;
          total_price: number;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string | null;
          product_name?: string;
          product_sku?: string | null;
          unit_price?: number;
          quantity?: number;
          total_price?: number;
          image_url?: string | null;
          created_at?: string;
        };
      };
      discount_coupons: {
        Row: {
          id: string;
          code: string;
          description: string | null;
          discount_type: 'percentage' | 'fixed_amount';
          discount_value: number;
          min_order_amount: number;
          max_discount_amount: number | null;
          usage_limit: number | null;
          times_used: number;
          is_active: boolean;
          starts_at: string;
          expires_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          description?: string | null;
          discount_type?: 'percentage' | 'fixed_amount';
          discount_value: number;
          min_order_amount?: number;
          max_discount_amount?: number | null;
          usage_limit?: number | null;
          times_used?: number;
          is_active?: boolean;
          starts_at?: string;
          expires_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          description?: string | null;
          discount_type?: 'percentage' | 'fixed_amount';
          discount_value?: number;
          min_order_amount?: number;
          max_discount_amount?: number | null;
          usage_limit?: number | null;
          times_used?: number;
          is_active?: boolean;
          starts_at?: string;
          expires_at?: string | null;
          created_at?: string;
        };
      };
      product_reviews: {
        Row: {
          id: string;
          product_id: string;
          user_id: string | null;
          author_name: string;
          rating: number;
          title: string | null;
          comment: string;
          is_verified_purchase: boolean;
          status: 'pending' | 'approved' | 'rejected';
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          user_id?: string | null;
          author_name: string;
          rating: number;
          title?: string | null;
          comment: string;
          is_verified_purchase?: boolean;
          status?: 'pending' | 'approved' | 'rejected';
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          user_id?: string | null;
          author_name?: string;
          rating?: number;
          title?: string | null;
          comment?: string;
          is_verified_purchase?: boolean;
          status?: 'pending' | 'approved' | 'rejected';
          created_at?: string;
        };
      };
      analytics_events: {
        Row: {
          id: string;
          session_id: string | null;
          user_id: string | null;
          event_name: string;
          event_data: Json | null;
          page_url: string | null;
          referrer: string | null;
          user_agent: string | null;
          ip_hash: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id?: string | null;
          user_id?: string | null;
          event_name: string;
          event_data?: Json | null;
          page_url?: string | null;
          referrer?: string | null;
          user_agent?: string | null;
          ip_hash?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string | null;
          user_id?: string | null;
          event_name?: string;
          event_data?: Json | null;
          page_url?: string | null;
          referrer?: string | null;
          user_agent?: string | null;
          ip_hash?: string | null;
          created_at?: string;
        };
      };
      system_logs: {
        Row: {
          id: string;
          level: 'debug' | 'info' | 'warn' | 'error' | 'critical';
          category: string;
          message: string;
          payload: Json | null;
          error_stack: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          level?: 'debug' | 'info' | 'warn' | 'error' | 'critical';
          category: string;
          message: string;
          payload?: Json | null;
          error_stack?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          level?: 'debug' | 'info' | 'warn' | 'error' | 'critical';
          category?: string;
          message?: string;
          payload?: Json | null;
          error_stack?: string | null;
          created_at?: string;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          is_active: boolean;
          subscribed_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          is_active?: boolean;
          subscribed_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          is_active?: boolean;
          subscribed_at?: string;
        };
      };
      admin_audit_logs: {
        Row: {
          id: string;
          admin_id: string | null;
          admin_email: string | null;
          action: string;
          resource_type: string;
          resource_id: string | null;
          previous_state: Json | null;
          new_state: Json | null;
          details: string | null;
          ip_address: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          admin_id?: string | null;
          admin_email?: string | null;
          action: string;
          resource_type: string;
          resource_id?: string | null;
          previous_state?: Json | null;
          new_state?: Json | null;
          details?: string | null;
          ip_address?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          admin_id?: string | null;
          admin_email?: string | null;
          action?: string;
          resource_type?: string;
          resource_id?: string | null;
          previous_state?: Json | null;
          new_state?: Json | null;
          details?: string | null;
          ip_address?: string | null;
          created_at?: string;
        };
      };
      admin_notifications: {
        Row: {
          id: string;
          title: string;
          message: string;
          notification_type: string;
          link_url: string | null;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          message: string;
          notification_type?: string;
          link_url?: string | null;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          message?: string;
          notification_type?: string;
          link_url?: string | null;
          is_read?: boolean;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      order_status: OrderStatus;
      payment_status: PaymentStatus;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Friendly export types
export type Category = Database['public']['Tables']['categories']['Row'];
export type Brand = Database['public']['Tables']['brands']['Row'];
export type Collection = Database['public']['Tables']['collections']['Row'];
export type Product = Database['public']['Tables']['products']['Row'];
export type CartItem = Database['public']['Tables']['cart_items']['Row'];
export type WishlistItem = Database['public']['Tables']['wishlists']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type OrderItem = Database['public']['Tables']['order_items']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type DiscountCoupon = Database['public']['Tables']['discount_coupons']['Row'];
export type ProductReview = Database['public']['Tables']['product_reviews']['Row'];
export type AnalyticsEvent = Database['public']['Tables']['analytics_events']['Row'];
export type SystemLog = Database['public']['Tables']['system_logs']['Row'];
export type AdminAuditLog = Database['public']['Tables']['admin_audit_logs']['Row'];
export type AdminNotification = Database['public']['Tables']['admin_notifications']['Row'];
export type UserRole = 'customer' | 'staff' | 'moderator' | 'admin';


