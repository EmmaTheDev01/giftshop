export interface NavSubItem {
  name: string;
  slug: string;
  count?: string;
}

export interface NavFeatured {
  title: string;
  desc: string;
  image: string;
}

export interface NavSection {
  name: string;
  slug: string;
  items: NavSubItem[];
  featured?: NavFeatured;
}

export const NAV_MENU: NavSection[] = [
  {
    name: 'Catalogue',
    slug: 'catalogue',
    items: [
      { name: 'All Keepsakes & Gifts', slug: 'all-products', count: '48 items' },
      { name: 'Laser-Cut Woodcraft', slug: 'laser-cut-woodcraft', count: '16 items' },
      { name: 'Hardwood Wall Art', slug: 'hardwood-wall-art', count: '12 items' },
      { name: 'Artisan Wall Clocks', slug: 'clocks', count: '6 items' },
      { name: 'Canadian Souvenirs', slug: 'canadian-souvenirs', count: '15 items' },
      { name: 'Numbered Limited Editions', slug: 'limited-editions', count: '8 items' },
    ],
    featured: {
      title: 'Complete Master Catalogue',
      desc: 'Explore every heirloom gift and hand-finished architectural keepsake across Canada & USA',
      image: '/images/cn-tower-hero.jpg',
    },
  },
  {
    name: 'Gifts',
    slug: 'gifts',
    items: [
      { name: 'Exceptional Keepsake Gifts', slug: 'exceptional-gifts', count: '14 items' },
      { name: 'Personalized Name Plaques', slug: 'personalized-plaques', count: '10 items' },
      { name: 'Celebration Cake Toppers', slug: 'cake-toppers', count: '8 items' },
      { name: 'Curated Keepsake Pairings', slug: 'curated-sets', count: '12 items' },
      { name: 'Heirloom Nursery Signs', slug: 'nursery-decor', count: '6 items' },
      { name: 'Milestone Love Plaques', slug: 'milestone-plaques', count: '9 items' },
    ],
    featured: {
      title: 'Curated Artisan Gifting',
      desc: 'Presented in archival Canadian gift packaging with certificates of origin',
      image: '/images/collections/heirloom-packaging.jpg',
    },
  },
  {
    name: 'Lifestyles',
    slug: 'lifestyles',
    items: [
      { name: 'Architectural Wall Accents', slug: 'wall-art', count: '18 items' },
      { name: 'Geometric Honeycomb Shelves', slug: 'wall-shelves', count: '5 items' },
      { name: 'Artisan Wall Clocks', slug: 'clocks', count: '6 items' },
      { name: 'LED Ambient Night Lights', slug: 'led-lighting', count: '7 items' },
      { name: 'Engraved Coaster Sets', slug: 'coasters-sets', count: '8 items' },
      { name: 'Rustic Kitchen & Hearth Decor', slug: 'rustic-signs', count: '9 items' },
    ],
    featured: {
      title: 'Architectural Wall Accents',
      desc: 'Silent quartz movements and dimensional multi-layer wood sculptures for modern living',
      image: '/images/collections/architectural-interior.jpg',
    },
  },
  {
    name: 'Fashion',
    slug: 'fashion',
    items: [
      { name: 'Handcrafted Wooden Jewelry', slug: 'wood-jewelry', count: '8 items' },
      { name: 'Botanical & Leaf Pendants', slug: 'botanical-pendants', count: '6 items' },
      { name: 'Artisan Wooden Brooches', slug: 'artisan-brooches', count: '5 items' },
      { name: 'Brass & Walnut Cufflinks', slug: 'cufflinks', count: '4 items' },
      { name: 'Pocket Talismans & Keepsakes', slug: 'pocket-keepsakes', count: '12 items' },
      { name: 'Artisan Keyrings & Charms', slug: 'keyrings', count: '7 items' },
    ],
    featured: {
      title: 'Wearable Artisan Accents',
      desc: 'Intricate hardwood jewellery, organic botanical motifs and heirloom accessories',
      image: '/images/collections/metalcraft-atelier.jpg',
    },
  },
  {
    name: 'Brands',
    slug: 'brands',
    items: [
      { name: 'Memoriq Master Guild', slug: 'memoriq-atelier' },
      { name: 'Laurentian Woodcraft Studio', slug: 'laurentian-craft' },
      { name: 'Rocky Mountain Metalworks', slug: 'rocky-metalworks' },
      { name: 'Boreal Heritage Workshops', slug: 'boreal-heritage' },
      { name: 'Saint James & Allied Guilds', slug: 'saint-james' },
    ],
    featured: {
      title: 'Master Guild Ateliers',
      desc: 'Collaborations with premier Canadian woodturners, laser artisans and metal fabricators',
      image: '/images/collections/woodcraft-atelier.jpg',
    },
  },
  {
    name: 'Collections',
    slug: 'collections',
    items: [
      { name: 'Canadian Signature Collection', slug: 'signature' },
      { name: 'Laurentian Gardens Collection', slug: 'gardens' },
      { name: 'Aurora Day & Night Collection', slug: 'day-night' },
      { name: 'Historic Architecture Collection', slug: 'historic-architecture' },
      { name: 'Monumental Heights Collection', slug: '330-meters' },
      { name: 'Limited Collector Editions', slug: 'limited-editions' },
    ],
    featured: {
      title: 'Curated Thematic Series',
      desc: 'From historic architecture and mountain valleys to numbered series',
      image: '/images/collections/rocky-mountain-summit.jpg',
    },
  },
  {
    name: 'Events',
    slug: 'events',
    items: [
      { name: 'Canadian Atelier Exhibits', slug: 'gallery-exhibits' },
      { name: 'Artisan Pop-up Markets', slug: 'popups' },
      { name: 'Masterclass Craft Demos', slug: 'masterclass' },
      { name: 'Seasonal Gifting Previews', slug: 'gifting-previews' },
      { name: 'VIP Collector Receptions', slug: 'vip-receptions' },
    ],
    featured: {
      title: 'Atelier & Boutique Events',
      desc: 'Meet our master artisans, preview limited releases, and experience live laser demonstrations',
      image: '/images/statue-of-liberty.jpg',
    },
  },
  {
    name: 'Customize',
    slug: 'customize',
    items: [
      { name: 'Custom Name Plaques', slug: 'custom-names' },
      { name: 'Monogram & Date Inlays', slug: 'monogram-inlays' },
      { name: 'Bespoke Architectural Keepsakes', slug: 'bespoke-architecture' },
      { name: 'Corporate & Guild Honours', slug: 'corporate-honours' },
      { name: 'Wedding & Anniversary Crests', slug: 'wedding-crests' },
    ],
    featured: {
      title: 'Your Own Mark Studio',
      desc: 'Laser-engraved coordinates, names and personalized dates made specially for you',
      image: '/images/collections/heirloom-packaging.jpg',
    },
  },
];
