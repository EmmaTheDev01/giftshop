-- ==============================================================================
-- The Gift Shop - Complete Database Seed Script (seed.sql)
-- Run this in your Supabase SQL Editor after running schema.sql
-- ==============================================================================

-- 1. SEED CATEGORIES
INSERT INTO public.categories (id, slug, name, description, order_position) VALUES
('a0000001-0000-0000-0000-000000000001', 'gifts', 'Gifts', 'Curated gifts and timeless keepsakes', 1),
('a0000001-0000-0000-0000-000000000002', 'lifestyle', 'Lifestyle', 'Decorative objects, tableware, stationery and home fragrances', 2),
('a0000001-0000-0000-0000-000000000003', 'fashion', 'Fashion', 'Artisan textiles, silk scarves, jewelry and leather goods', 3),
('a0000001-0000-0000-0000-000000000004', 'kids', 'Kids', 'Children toys, wooden games, books and plush keepsakes', 4),
('a0000001-0000-0000-0000-000000000005', 'collections-exclusives', 'Collections', 'Exclusive thematic seasonal collections', 5),
('a0000001-0000-0000-0000-000000000006', 'artisans', 'Artisans & Brands', 'Celebrated artisan partners and master craft workshops', 6)
ON CONFLICT (slug) DO NOTHING;

-- 2. SEED BRANDS / ARTISAN HOUSES
INSERT INTO public.brands (id, slug, name, description, country) VALUES
('b0000001-0000-0000-0000-000000000001', 'saint-james', 'Saint James', 'Purveyor of authentic nautical knitwear and 100% pure wool garments since 1889.', 'France'),
('b0000001-0000-0000-0000-000000000002', 'bernardaud', 'Bernardaud', 'Limoges porcelain manufacture of worldwide prestige and fine dining artistry since 1863.', 'France'),
('b0000001-0000-0000-0000-000000000003', 'dammann-freres', 'DAMMANN Frères', 'Renowned French gourmet tea house since 1692 creating exceptional artisan blends.', 'France'),
('b0000001-0000-0000-0000-000000000004', 'vilac', 'VILAC', 'Master woodcraft toys crafted in the Jura mountains with non-toxic lacquers since 1911.', 'France'),
('b0000001-0000-0000-0000-000000000005', 'kerzon', 'Kerzon Paris', 'Natural scented candles and home aromas made with organic vegetable waxes in Paris.', 'France'),
('b0000001-0000-0000-0000-000000000006', 'the-line', 'The Line', 'Laser-cut architectural steel wall sculptures of iconic skylines.', 'France'),
('b0000001-0000-0000-0000-000000000007', 'monnaie-de-paris', 'Monnaie de Paris', 'Historic official French mint founded 864 AD striking commemorative medals.', 'France'),
('b0000001-0000-0000-0000-000000000008', 'memoriq-atelier', 'Memoriq Atelier', 'Artisan Canadian and European collaboration keepsakes.', 'Canada')
ON CONFLICT (slug) DO NOTHING;

-- 3. SEED COLLECTIONS
INSERT INTO public.collections (id, slug, name, subtitle, description, is_featured, order_position) VALUES
('c0000001-0000-0000-0000-000000000001', 'signature', 'Signature Collection', 'The timeless classics', 'Our quintessential boutique keepsakes, crafted to stand the test of time.', true, 1),
('c0000001-0000-0000-0000-000000000002', 'limited-editions', 'Limited Collector Editions', 'Numbered collector pieces', 'Strictly numbered, rare artisan creations authenticated with certificates.', true, 2),
('c0000001-0000-0000-0000-000000000003', 'gardens', 'Gardens Collection', 'Botanical elegance', 'Floral scents, botanical porcelain, and spring tea blends.', true, 3),
('c0000001-0000-0000-0000-000000000004', 'day-night', 'Day & Night Collection', 'Radiance through twilight', 'Refined decorative pieces capturing the transition of golden hours.', false, 4),
('c0000001-0000-0000-0000-000000000005', 'paris-rooftops', 'Heritage Rooftops', 'Zinc patina & porcelain', 'Limoges porcelain espresso sets and copper tones.', false, 5),
('c0000001-0000-0000-0000-000000000006', '330-meters', 'Monumental 330m', 'Architectural height & steel', 'Commemorating monumentality with precision monographs and scale replicas.', false, 6)
ON CONFLICT (slug) DO NOTHING;

-- 4. SEED DISCOUNT COUPONS
INSERT INTO public.discount_coupons (code, description, discount_type, discount_value, min_order_amount, is_active) VALUES
('WELCOME10', 'Welcome 10% off for new Canadian subscribers', 'percentage', 10.00, 50.00, true),
('CANADA95', '$15 off orders over $150 CAD', 'fixed_amount', 15.00, 150.00, true),
('VIPGIFT', '15% off limited edition collectors items', 'percentage', 15.00, 100.00, true)
ON CONFLICT (code) DO NOTHING;

-- 5. SEED COMPLETE CANADIAN E-COMMERCE CATALOGUE (15 Products in CAD)
INSERT INTO public.products (slug, name, sku, price, original_price, currency, stock, is_featured, is_limited_edition, badge, rating, reviews_count, images, description, short_description, dimensions, material, made_in) VALUES
(
  'monnaie-de-paris-summit-medal',
  'Monnaie de Paris Commemorative Summit Medal',
  'MDP-SUMMIT-01',
  5.50,
  NULL,
  'CAD',
  120,
  true,
  false,
  'Iconic',
  4.9,
  64,
  ARRAY['https://shop.toureiffel.paris/1175-medium_default/monnaie-de-paris-eiffel-tower-summit-medal.jpg', 'https://shop.toureiffel.paris/1171-medium_default/monnaie-de-paris-eiffel-tower-1st-floor-medal.jpg'],
  'Official souvenir medal minted by the historic Monnaie de Paris (Paris Mint). Features the high-relief silhouette of the tower summit with French artisan engraving.',
  'Official collector medal minted in Paris.',
  '34 mm diameter',
  'Cupro-nickel gold-tone',
  'France'
),
(
  'monument-bronze-19-cm-signature-collection',
  'Architectural Monument Bronze 19 cm - SIGNATURE COLLECTION',
  'TE-BRONZE-19',
  29.99,
  NULL,
  'CAD',
  85,
  true,
  false,
  'Bestseller',
  5.0,
  142,
  ARRAY['https://shop.toureiffel.paris/879-medium_default/eiffel-tower-bronze-19-cm-signature-collection.jpg', 'https://shop.toureiffel.paris/882-medium_default/eiffel-tower-bronze-35-cm-signature-collection.jpg'],
  'Official scale replica statue in rich warm bronze finish. Cast from high-precision architectural models with authentic latticework detail and solid pedestal.',
  '19 cm authentic bronze replica miniature.',
  '19 cm x 8 cm x 8 cm',
  'Die-cast zinc alloy & bronze patina',
  'France'
),
(
  'authentic-rivet-monument-heritage-edition',
  'Authentic Heritage Structural Rivet - LIMITED NUMBERED EDITION',
  'TE-RIVET-LTD',
  115.00,
  NULL,
  'CAD',
  18,
  true,
  true,
  'Numbered',
  5.0,
  29,
  ARRAY['https://shop.toureiffel.paris/img/cms/homepage/packshot_produit/HP_Printemps_bandeau_rivet_2026%20(1).png'],
  'Exclusive authentic commemorative steel rivet, forged according to original 1889 specifications. Individually numbered with certificate of provenance and custom collector wooden presentation case.',
  'Individually numbered forged steel rivet.',
  '12 cm x 4 cm x 4 cm',
  'Hot-forged carbon steel with antique wax',
  'France'
),
(
  'organic-cotton-tshirt-heritage-crest-navy',
  'Organic Cotton T-Shirt Heritage Crest - Midnight Navy',
  'TE-TSHIRT-NVY',
  38.00,
  NULL,
  'CAD',
  60,
  true,
  false,
  'Essential',
  4.8,
  53,
  ARRAY['https://shop.toureiffel.paris/720-medium_default/men-t-shirt-paris-monument-white.jpg'],
  '100% GOTS certified heavyweight organic cotton tee. Embroidered gold insignia on the chest, tailored rib collar, and double-needle stitching crafted in Portugal.',
  '100% organic cotton embroidered tee.',
  'Available in S, M, L, XL',
  '100% Organic combed cotton (220 gsm)',
  'Portugal'
),
(
  'dammann-freres-heritage-tea-metal-tin',
  'DAMMANN Frères Prestige Black Tea Blend (100g Metal Tin)',
  'DAM-TEA-100',
  24.50,
  NULL,
  'CAD',
  90,
  true,
  false,
  'Gourmet',
  4.9,
  77,
  ARRAY['https://shop.toureiffel.paris/img/cms/homepage/encart_marque/INSITU_3259920027056_1.png'],
  'Exceptional flavored black tea blend created exclusively by historic French tea purveyor DAMMANN Frères (established 1692). Infused with notes of bergamot, orange blossom, and vanilla.',
  '100g luxury loose leaf tea in collectible tin.',
  '100g metal tin',
  'Loose-leaf tea blend',
  'France'
),
(
  'bernardaud-porcelain-espresso-cup-saucer',
  'Bernardaud Limoges Porcelain Espresso Cup & Saucer',
  'BER-PORC-ESP',
  65.00,
  NULL,
  'CAD',
  35,
  true,
  false,
  'Prestige',
  5.0,
  38,
  ARRAY['https://shop.toureiffel.paris/img/cms/homepage/encart_marque/ensemble_bernardaud_1.webp'],
  'Exquisite fine Limoges porcelain manufactured by Bernardaud (founded 1863). Features delicate 24-carat gold filigree inspired by monumental architectural geometry.',
  'Fine Limoges porcelain with 24K gold accents.',
  'Cup: 80ml, Saucer: 12cm',
  'Authentic Limoges Porcelain & 24K Gold',
  'France'
),
(
  'saint-james-pure-wool-striped-mariniere',
  'Saint James Pure Virgin Wool Striped Marinière',
  'STJ-MARIN-01',
  165.00,
  NULL,
  'CAD',
  24,
  true,
  false,
  'Heritage',
  4.9,
  46,
  ARRAY['https://shop.toureiffel.paris/img/cms/homepage/encart_marque/INSITU_J00158783_1.png'],
  'Authentic French nautical sweater knitted in Normandy by Saint James (Living Heritage Company since 1889). Tight-knit pure wool offering wind resistance, shoulder button placket, and navy stripes.',
  'Authentic nautical pure wool sweater.',
  'Sizes XS to XXL',
  '100% Pure Virgin Wool',
  'France'
),
(
  'vilac-wooden-architectural-puzzle-model',
  'VILAC Wooden Architectural Construction Model',
  'VIL-WOOD-PZL',
  45.00,
  NULL,
  'CAD',
  40,
  true,
  false,
  'Kids Toy',
  4.8,
  31,
  ARRAY['https://shop.toureiffel.paris/img/cms/homepage/encart_marque/INSITU_3048700024053_1.png'],
  'Handcrafted wooden building set manufactured by Vilac in the Jura mountains (since 1911). Made from sustainably harvested French beechwood and finished with safe water-based natural lacquers.',
  'Handmade beechwood construction puzzle.',
  '30 cm x 20 cm x 8 cm box',
  'French Beechwood & Non-toxic Lacquers',
  'France'
),
(
  'scented-candle-candied-chestnut-bourbon-vanilla',
  'Kerzon Paris Botanical Scented Candle - Park Promenade',
  'KER-CNDL-PARK',
  42.00,
  NULL,
  'CAD',
  55,
  true,
  false,
  'Art de Vivre',
  4.9,
  62,
  ARRAY['https://shop.toureiffel.paris/img/cms/homepage/encart_marque/encart_collection_jardins_1.png'],
  'Poured in Paris using 100% natural biodegradable vegetable and coconut waxes with pure cotton wick. Delicate scent notes of linden blossoms, cut grass, and chestnut.',
  '185g natural wax botanical candle (45h burn).',
  '185g glass tumbler',
  'Natural vegetable wax, cotton wick',
  'France'
),
(
  'architectural-monograph-fine-art-book',
  'The Monument Architecture - Deluxe Hardcover Monograph',
  'EDP-BOOK-MONO',
  48.00,
  NULL,
  'CAD',
  30,
  false,
  false,
  'Bookshop',
  5.0,
  24,
  ARRAY['https://shop.toureiffel.paris/img/cms/homepage/encart_marque/encart_collection_330m.png'],
  'Comprehensive photographic and historical survey featuring archival blueprints, historical photography, and construction notes. Printed on 170gsm heavyweight art paper with cloth-bound spine.',
  'Hardcover 240-page art monograph.',
  '28 cm x 24 cm, 240 pages',
  'Hardcover, Linen cloth spine, Gilded edges',
  'France'
),
(
  'linen-canvas-tote-bag-gold-insignia',
  'Heavyweight Canvas Tote Bag with Gilt Screenprint',
  'MEM-TOTE-GILT',
  28.00,
  NULL,
  'CAD',
  110,
  false,
  false,
  'Essential',
  4.7,
  95,
  ARRAY['https://shop.toureiffel.paris/828-medium_default/shopping-bag-navy-blue-saint-james-x-tour-eiffel.jpg'],
  'Sturdy 340gsm natural cotton canvas tote with deep interior pocket and reinforced cross-stitched handles. Screen-printed with gold architectural filigree.',
  'Eco-certified 340gsm cotton tote bag.',
  '42 cm x 38 cm x 10 cm base',
  '100% Heavyweight Cotton Canvas',
  'Canada'
),
(
  'monument-silhouette-steel-wall-sculpture',
  'The Line - Laser-Cut Steel Architectural Skyline 50cm',
  'LIN-STEL-50',
  75.00,
  NULL,
  'CAD',
  25,
  true,
  false,
  'Design Art',
  4.9,
  41,
  ARRAY['https://shop.toureiffel.paris/img/cms/homepage/encart_marque/encart_collection_toitsdeparis.png'],
  'Minimalist 50cm wall sculpture precision laser-cut from 1.5mm thick solid steel. Features the silhouette viewed from the Champ de Mars, finished in textured matte black powder-coat.',
  '50cm architectural steel wall sculpture.',
  '50 cm length x 1.5 mm thickness',
  'Powder-coated laser-cut steel',
  'France'
),
(
  'organic-maple-syrup-whiskey-barrel-aged',
  'Quebec Artisan Maple Syrup - Bourbon Barrel Aged 250ml',
  'QBC-MAPLE-250',
  22.00,
  NULL,
  'CAD',
  70,
  false,
  false,
  'Gourmet',
  5.0,
  83,
  ARRAY['https://shop.toureiffel.paris/img/cms/homepage/encart_marque/encart_collection_signature.png'],
  'Pure Grade A Amber Quebec maple syrup aged for six months in charred oak American whiskey barrels. Imparts rich undertones of oak, vanilla, and smoke.',
  '250ml artisanal barrel-aged maple syrup.',
  '250 ml glass bottle',
  '100% Pure Quebec Maple Syrup',
  'Canada'
),
(
  'artisan-silk-square-scarf-canadiana-botanical',
  'Silk Twill Square Scarf 70x70 cm - Botanical Edition',
  'MEM-SILK-70',
  85.00,
  NULL,
  'CAD',
  22,
  true,
  false,
  'Luxury Silk',
  4.9,
  27,
  ARRAY['https://shop.toureiffel.paris/img/cms/homepage/encart_marque/encart_collection_journuit.png'],
  'Hand-rolled 100% mulberry silk twill square scarf. Vibrant archival pigments depicting floral gardens intertwined with architectural motifs.',
  '100% Mulberry silk square with hand-rolled edges.',
  '70 cm x 70 cm',
  '100% Mulberry Silk Twill (14 momme)',
  'France'
),
(
  'leather-travel-journal-gilt-edges',
  'Handbound Leather Travel Journal with Gilt Edges',
  'MEM-JRNL-LTHR',
  35.00,
  NULL,
  'CAD',
  45,
  false,
  false,
  'Stationery',
  4.8,
  36,
  ARRAY['https://shop.toureiffel.paris/img/cms/homepage/encart_marque/encart_collection_toitsdeparis.png'],
  'Full-grain supple calfskin leather journal containing 192 pages of fountain-pen-friendly 100gsm acid-free cream paper with shimmering gold gilt page edges.',
  'Full-grain leather bound journal (192 pages).',
  '21 cm x 14.5 cm (A5 format)',
  'Full-grain leather & 100gsm acid-free paper',
  'Canada'
)
ON CONFLICT (slug) DO UPDATE
SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  currency = EXCLUDED.currency,
  stock = EXCLUDED.stock,
  images = EXCLUDED.images,
  description = EXCLUDED.description,
  updated_at = NOW();

-- 6. SEED INITIAL SYSTEM AUDIT LOG
INSERT INTO public.system_logs (level, category, message, payload)
VALUES (
  'info',
  'database_initialization',
  'The Gift Shop database schema and seed catalogue populated successfully.',
  jsonb_build_object('total_products', 15, 'currency', 'CAD', 'environment', 'production')
);

-- 7. INITIAL ADMIN NOTIFICATION
INSERT INTO public.admin_notifications (title, message, notification_type, link_url)
VALUES (
  'Store Initialized in CAD',
  'The catalogue is populated with 15 Canadian gift products, active coupons, and RLS security policies.',
  'system_event',
  '/admin'
);

-- ==============================================================================
-- ADMIN CREATION TIP:
-- To grant a registered user admin privileges, run:
-- SELECT public.set_user_as_admin('your-email@example.com');
-- ==============================================================================
