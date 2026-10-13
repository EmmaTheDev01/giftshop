import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DepartmentView from '@/components/DepartmentView';
import { getBrands, getProducts } from '@/lib/api';

interface BrandDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const BRAND_METADATA: Record<string, { name: string; craft: string; desc: string }> = {
  'memoriq-atelier': {
    name: 'Memoriq Master Guild',
    craft: 'Canadian Laser-Cut Hardwood & Fine Joinery',
    desc: 'Precision laser-sculpted Canadian birch and walnut, hand-finished in our Canadian master ateliers.',
  },
  'laurentian-craft': {
    name: 'Laurentian Woodcraft Studio',
    craft: 'Solid Timber Clocks & Honeycomb Joinery',
    desc: 'Custom quartz movement wall clocks and geometric modular shelving crafted from sustainable Laurentian timber.',
  },
  'rocky-metalworks': {
    name: 'Rocky Mountain Metalworks',
    craft: 'Dimensional Wall Art & Silhouette Sculptures',
    desc: 'Laser-cut mountain silhouettes and wildlife wall sculptures inspired by the Canadian Rockies.',
  },
  'boreal-heritage': {
    name: 'Boreal Heritage Workshops',
    craft: 'Ambient LED Lighting & Maple Keepsakes',
    desc: 'Handcrafted acrylic and walnut night lights, customized name signs, and Canadian maple tokens.',
  },
  'saint-james': {
    name: 'Saint James & Allied Guilds',
    craft: 'Master Canadian & Heritage Craftsmanship',
    desc: 'Bespoke artisan goods crafted by master guilds dedicated to enduring quality and certified provenance.',
  },
};

export async function generateStaticParams() {
  const dbBrands = await getBrands();
  const dbSlugs = dbBrands.map((b) => ({ slug: b.slug }));
  const metaSlugs = Object.keys(BRAND_METADATA).map((slug) => ({ slug }));
  const all = [...metaSlugs];
  dbSlugs.forEach((s) => {
    if (!all.some((x) => x.slug === s.slug)) all.push(s);
  });
  return all;
}

export async function generateMetadata({ params }: BrandDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = BRAND_METADATA[slug] || {
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    craft: 'Artisan House',
    desc: 'Official boutique collaborations.',
  };

  return {
    title: `${brand.name} | Memoriq Canada 🇨🇦`,
    description: brand.desc,
  };
}

export default async function BrandDetailPage({ params }: BrandDetailPageProps) {
  const { slug } = await params;
  const brand = BRAND_METADATA[slug];

  const brandName = brand?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const brandCraft = brand?.craft || 'Master Artisan Craftsmanship';
  const brandDesc = brand?.desc || 'Exceptional craftsmanship by renowned Canadian artisans and guild makers.';

  const allProducts = await getProducts();

  // Filter products matching this brand
  const keyword = slug.toLowerCase().replace(/-/g, ' ');
  const matched = allProducts.filter((p) => {
    const text = `${p.brand_name || ''} ${p.name} ${p.description}`.toLowerCase();
    return text.includes(keyword) || text.includes(brandName.toLowerCase());
  });

  const displayProducts = matched.length > 0 ? matched : allProducts.slice(0, 6);

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
