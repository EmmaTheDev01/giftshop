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
    name: 'Crafts',
    slug: 'crafts',
    items: [
      { name: 'Laser-Cut Woodcraft', slug: 'laser-cut-woodcraft', count: '16 items' },
      { name: 'Hardwood Wall Art', slug: 'hardwood-wall-art', count: '12 items' },
      { name: 'Artisan Wood Jewelry', slug: 'artisan-jewelry', count: '6 items' },
      { name: 'Engraved Coasters & Sets', slug: 'coasters-sets', count: '8 items' },
      { name: 'Botanical & Wildlife Craft', slug: 'wildlife-craft', count: '14 items' },
      { name: 'Hand-Finished Plaques', slug: 'hand-finished-plaques', count: '10 items' },
    ],
    featured: {
      title: 'Artisan Hardwood Craft',
      desc: 'Precision laser-sculpted Canadian birch and walnut crafted in master ateliers',
      image: '/images/products/laser-cut-wolf-howling-forest-wall-art.jpg',
    },
  },
  {
    name: 'Decorations',
    slug: 'decorations',
    items: [
      { name: 'Wall Sculptures & Art', slug: 'wall-art', count: '18 items' },
      { name: 'Artisan Wall Clocks', slug: 'clocks', count: '6 items' },
      { name: 'Key Organizers & Racks', slug: 'key-holders', count: '8 items' },
      { name: 'LED Night Lights & Signs', slug: 'led-lighting', count: '7 items' },
      { name: 'Geometric Honeycomb Shelves', slug: 'wall-shelves', count: '5 items' },
      { name: 'Rustic Porch & Kitchen Signs', slug: 'rustic-signs', count: '9 items' },
    ],
    featured: {
      title: 'Architectural Wall Accents',
      desc: 'Silent quartz movements and dimensional multi-layer wood sculptures for modern living',
      image: '/images/products/canadian-silhouette-wood-clock.jpg',
    },
  },
  {
    name: 'Souvenirs',
    slug: 'souvenirs',
    items: [
      { name: 'Canadian Maple Leaf Art', slug: 'maple-leaf-art', count: '15 items' },
      { name: 'Mountain Silhouette Keepsakes', slug: 'mountain-silhouettes', count: '12 items' },
      { name: 'Boreal Wildlife Accents', slug: 'wildlife-keepsakes', count: '10 items' },
      { name: 'Vintage Compass & Maps', slug: 'vintage-maps', count: '8 items' },
      { name: 'Celtic Knot & Mandalas', slug: 'celtic-mandala', count: '6 items' },
      { name: 'Pocket Keepsakes & Plaques', slug: 'pocket-keepsakes', count: '14 items' },
    ],
    featured: {
      title: 'Quintessential Canadian Keepsakes',
      desc: 'Heirloom tokens honoring Canadian heritage landscapes, peaks, and boreal forests',
      image: '/images/products/canadian-maple-leaf-wall-sign.jpg',
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
      image: '/images/products/custom-mountain-nursery-led-wooden-sign.jpg',
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
  },
  {
    name: 'Artisans',
    slug: 'brands',
    items: [
      { name: 'Memoriq Master Guild', slug: 'memoriq-atelier' },
      { name: 'Laurentian Woodcraft Studio', slug: 'laurentian-craft' },
      { name: 'Rocky Mountain Metalworks', slug: 'rocky-metalworks' },
      { name: 'Boreal Heritage Workshops', slug: 'boreal-heritage' },
      { name: 'Saint James & Allied Guilds', slug: 'saint-james' },
    ],
  },
];
