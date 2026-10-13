import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DepartmentView from '@/components/DepartmentView';
import { PRODUCTS } from '@/data/mockData';

interface BrandDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const BRAND_METADATA: Record<string, { name: string; craft: string; desc: string }> = {
  'saint-james': {
    name: 'Saint James',
    craft: 'Master Nautical Knitwear since 1889',
    desc: 'Crafted in Normandy with 100% pure virgin wool and certified Living Heritage Company (EPV) status in France.',
  },
  bernardaud: {
    name: 'Bernardaud',
    craft: 'Limoges Fine Porcelain Manufacture since 1863',
    desc: 'The historic benchmark for French porcelain dining artistry, creating bespoke gilded espresso services.',
  },
  'dammann-freres': {
    name: 'DAMMANN Frères',
    craft: 'Purveyor of Exceptional Teas since 1692',
    desc: 'Artisan tea masters creating custom blends packed in collectible lacquered metal tins.',
  },
  vilac: {
    name: 'VILAC',
    craft: 'Master Wooden Toy Turners in the Jura since 1911',
    desc: 'Handmade architectural puzzles, toys, and building sets crafted from sustainably harvested beechwood.',
  },
  kerzon: {
    name: 'Kerzon Paris',
    craft: 'Master Perfumer & Natural Candle Atelier',
    desc: 'Formulated with natural vegetable waxes and essential oils evoking historic botanical promenades.',
  },
  'the-line': {
    name: 'The Line',
    craft: 'Architectural Laser-Cut Steel Sculptures',
    desc: 'Laser-cut architectural silhouettes of monument skylines crafted from thick steel and finished in matte black.',
  },
  'monnaie-de-paris': {
    name: 'Monnaie de Paris',
    craft: 'Official French Mint since 864 AD',
    desc: 'The oldest institution in France, striking commemorative high-relief summit medals with official seal engraving.',
  },
  'la-sablesienne': {
    name: 'La Sablésienne',
    craft: 'Artisan French Biscuits & Confections',
    desc: 'Traditional pure butter shortbread baked in Sablé-sur-Sarthe and presented in vintage keepsake tins.',
  },
  payote: {
    name: 'Payote',
    craft: 'Authentic French Espadrilles',
    desc: 'Handcrafted rope-sole espadrilles manufactured in Mauléon using natural organic cotton canvas.',
  },
  omy: {
    name: 'OMY',
    craft: 'Creative Giant Discovery Posters & Games',
    desc: 'Playful illustrated Paris and world maps designed for children and families to colour together.',
  },
};

export async function generateStaticParams() {
  return Object.keys(BRAND_METADATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BrandDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = BRAND_METADATA[slug] || {
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    craft: 'Artisan House',
    desc: 'Official boutique collaborations.',
  };

  return {
    title: `${brand.name} | The Gift Shop Canada 🇨🇦`,
    description: brand.desc,
  };
}

export default async function BrandDetailPage({ params }: BrandDetailPageProps) {
  const { slug } = await params;
  const brand = BRAND_METADATA[slug];

  const brandName = brand?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const brandCraft = brand?.craft || 'Master Artisan Craftsmanship';
  const brandDesc = brand?.desc || 'Exceptional craftsmanship by renowned European and Canadian artisans.';

  // Filter products matching this brand
  const keyword = slug.toLowerCase().replace(/-/g, ' ');
  const matched = PRODUCTS.filter((p) => {
    const text = `${p.brand_name || ''} ${p.name} ${p.description}`.toLowerCase();
    return text.includes(keyword) || text.includes(brandName.toLowerCase());
  });

  const displayProducts = matched.length > 0 ? matched : PRODUCTS.slice(0, 6);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <DepartmentView
          title={brandName}
          eyebrow={brandCraft}
          subtitle={brandDesc}
          breadcrumbName={brandName}
          subcategories={[]}
          products={displayProducts}
        />
      </main>
      <ReassuranceFooter />
      <Footer />
    </div>
  );
}
