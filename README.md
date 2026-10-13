# The Gift Shop (Canadiana Boutique) 🇨🇦

A luxury Canadian e-commerce boutique inspired by high-end monument and heritage stores (such as the official Eiffel Tower boutique). Built with **Next.js 15 (App Router)**, **TypeScript**, bespoke **Vanilla CSS & Tailwind styling**, and built-in turnkey **Supabase** backend integration with intelligent mock data fallback.

---

## 🌟 Key Features

1. **Parisian-Heritage Luxury Aesthetics**:
   - Signature Navy (`#0c2340`), Warm Gold (`#b47e00`), and Pearl White palette.
   - Elegant typography pairing **Cinzel** (refined serif display) and **Manrope** (clean geometric sans-serif).
   - Custom Maple Leaf emblem, diamond separators, rivet accents, and micro-interactions.

2. **Tailored for Canadian E-Commerce 🇨🇦**:
   - Pricing in Canadian Dollars (`$XX.XX CAD`).
   - Free Canadian expedited shipping threshold at **$95 CAD**.
   - Canadian Sales Tax calculations (GST, PST, HST breakdown across all 13 provinces and territories).
   - Payment reassurance supporting Visa, Mastercard, AMEX, Apple Pay, Google Pay, and Interac Debit.

3. **Complete Legal & Compliance Suite (GDPR, PIPEDA & ePrivacy)**:
   - Dedicated, fully styled legal routes with interactive sidebar navigation:
     - [`/privacy`](/privacy): Comprehensive Privacy Policy compliant with both EU GDPR & Canadian PIPEDA.
     - [`/terms-of-sale`](/terms-of-sale): Commercial General Terms of Sale with tax tables and consumer guarantees.
     - [`/terms`](/terms): Website Terms of Use and Intellectual Property notice.
     - [`/cookies`](/cookies): Cookie Policy with detailed cookie inventory and an interactive **Reset Cookie Preferences** button.
     - [`/legal`](/legal): Legal Notice / Impressum with registered publisher and hosting provider disclosures.
     - [`/returns`](/returns): 30-Day Canadian satisfaction guarantee & Canada Post return procedure.
     - [`/delivery`](/delivery): Shipping rates, transit timelines across Canada, and customs policies.
     - [`/faq`](/faq): Interactive customer service FAQ with live category filtering and search.
     - [`/contact`](/contact): Concierge inquiry form and Montreal / Toronto boutique coordinates.
   - Non-intrusive floating **Cookie Consent Banner** with local persistence.

4. **Seamless Supabase Integration (Ready to Connect)**:
   - **Zero code refactoring needed**: Works out-of-the-box using luxury mock data.
   - Automatically detects when `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are provided in `.env.local` and switches seamlessly to live database queries.
   - Complete database schema covering:
     - `products`, `categories`, `collections`
     - `profiles`, `cart_items`, `wishlists`
     - `orders`, `order_items`
     - `discount_coupons`, `product_reviews`
     - `analytics_events` (telemetry for `page_view`, `add_to_cart`, `purchase`, etc.)
     - `system_logs` (audit logs and error telemetry)
     - `newsletter_subscribers`

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. The application will start immediately with complete mock data.

---

## 🔌 Connecting Supabase (When Ready)

When you are ready to switch from mock data to your live Supabase database, follow these simple steps:

### Step 1: Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Under **Project Settings > API**, copy your:
   - Project URL
   - `anon` public API key
   - `service_role` secret key (for server operations)

### Step 2: Configure Environment Variables
Copy the example environment file:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your actual Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Step 3: Run Migrations & Seed Data
In your Supabase project dashboard, navigate to the **SQL Editor** and run:
1. `supabase/schema.sql` (Creates all tables, Row Level Security (RLS) policies, indexes, and automated triggers).
2. `supabase/seed.sql` (Inserts initial Canadian gift products, categories, collections, and active coupons).

Once the credentials are saved in `.env.local`, restart your Next.js server (`npm run dev`). The application will automatically detect the connection and query your live Supabase database without any manual code changes!

---

## 📁 Project Architecture

```
giftshop/
├── public/                 # Static assets, logos, and product photography
├── src/
│   ├── app/                # Next.js 15 App Router pages
│   │   ├── layout.tsx      # Root layout with fonts, metadata, and ClientProviders
│   │   ├── page.tsx        # Luxury Homepage
│   │   ├── privacy/        # Privacy Policy (GDPR & PIPEDA)
│   │   ├── terms-of-sale/  # Terms of Sale (CAD pricing, taxes, shipping)
│   │   ├── terms/          # Terms of Use
│   │   ├── cookies/        # Cookie Policy & preferences reset
│   │   ├── legal/          # Legal Notice / Impressum
│   │   ├── returns/        # Returns & Refunds (Canada Post guidelines)
│   │   ├── delivery/       # Shipping & Delivery timelines
│   │   ├── faq/            # Interactive FAQ
│   │   └── contact/        # Concierge contact form
│   ├── components/         # Reusable luxury UI components
│   │   ├── ClientProviders.tsx # Universal provider (Cart, QuickView, Cookies)
│   │   ├── CookieConsent.tsx   # Floating GDPR cookie consent banner
│   │   ├── LegalLayout.tsx     # Standardized luxury layout for legal pages
│   │   ├── Header.tsx          # Sticky navigation with announcement bar
│   │   ├── Footer.tsx          # Reassurance footer with real compliance links
│   │   ├── CartDrawer.tsx      # Slide-out cart drawer with free shipping progress
│   │   ├── QuickViewModal.tsx  # Product quick-preview modal
│   │   └── ...
│   ├── config/             # Site configuration (Brand identity, phone, address)
│   ├── context/            # React Contexts (CartContext, QuickViewContext)
│   ├── data/               # Luxury mock product catalog & collections
│   ├── lib/                # Supabase client, API abstractions & analytics
│   │   ├── supabase.ts     # Supabase client instantiation
│   │   ├── api.ts          # Resilient data fetching (Supabase + fallback)
│   │   └── analytics.ts    # Telemetry tracking for e-commerce events
│   └── types/              # Database & application TypeScript definitions
├── supabase/
│   ├── schema.sql          # Complete Supabase Postgres schema & RLS rules
│   ├── seed.sql            # Initial sample catalog data
│   └── migrations/         # Timestamped SQL migrations
├── .env.example            # Documented environment variables template
└── .gitignore              # Git ignore rules protecting local secrets
```

---

## 🛡️ License
Private & Proprietary. All rights reserved.
