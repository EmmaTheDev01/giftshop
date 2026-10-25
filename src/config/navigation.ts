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
