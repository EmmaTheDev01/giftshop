-- ==============================================================================
-- COMPATIBILITY PATCHES: Ensure all required columns exist on existing tables
-- and ensure Row Level Security (RLS) is enabled across all tables.
-- ==============================================================================
ALTER TABLE public.brands ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;
ALTER TABLE public.brands ADD COLUMN IF NOT EXISTS order_position INT DEFAULT 0;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS created_by UUID;
ALTER TABLE public.collections ADD COLUMN IF NOT EXISTS badge TEXT;
ALTER TABLE public.collections ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;
ALTER TABLE public.collections ADD COLUMN IF NOT EXISTS order_position INT DEFAULT 0;
ALTER TABLE public.product_reviews ADD COLUMN IF NOT EXISTS author_email TEXT;
ALTER TABLE public.product_reviews ADD COLUMN IF NOT EXISTS is_verified_purchase BOOLEAN DEFAULT FALSE;

-- Ensure RLS is active on all tables
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
  ('signature', 'North American Signature Keepsakes', 'Quintessential Heritage Keepsakes', 'The definitive collection of official medallions, architectural keepsakes, and iconic symbols created with Canadian workshops.', 'Core Heritage', '/images/cn-tower-portrait.jpg', true, 1),
  ('gardens', 'Laurentian Woodcraft & Forest Art', 'Botanical Allées & Natural Living', 'Inspired by Canadian parklands and boreal forests, featuring cedar scents, organic maple confections, and botanical jewelry.', 'Art de Vivre', '/images/collections/woodcraft-atelier.jpg', true, 2),
  ('day-night', 'Artisan Living & Architectural Clocks', 'From Morning Dawn to Northern Lights', 'Refined lifestyle accents capturing the contrast between soft golden dawn across Moraine Lake and nocturnal auroral illuminations.', 'Nocturne', '/images/collections/architectural-interior.jpg', true, 3),
  ('historic-architecture', 'Architectural Metal & Script Art', 'Copper Patina & Modern Horizons', 'A tribute to historical Canadian copper rooftops, precision blueprints, and modern laser-cut metal home accents.', 'Architecture', '/images/collections/metalcraft-atelier.jpg', false, 4),
  ('330-meters', 'Monumental Heights & Mountain Summits', 'Architectural Height & Rocky Mountain Summits', 'Commemorating the monumental summits of Canadian engineering and Rocky mountain peaks with precision monographs.', 'Engineering', '/images/collections/rocky-mountain-summit.jpg', false, 5),
  ('limited-editions', 'Limited Collector Editions', 'Numbered Pieces & Authentic Provenance', 'Numbered pieces, certified Canadian Centennial rivets, and limited runs accompanied by official certificates of provenance.', 'Numbered & Rare', '/images/statue-of-liberty.jpg', true, 6),
  ('olympic-collection', 'Heirloom Gifting & Commemorative Relics', 'Sporting Prestige & Winter Triumphs', 'Commemorating Montreal 1976, Calgary 1988, and Vancouver 2010 winter triumphs with commemorative keepsakes.', 'Heritage Games', '/images/collections/heirloom-packaging.jpg', false, 7)
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
