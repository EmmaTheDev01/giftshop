import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DepartmentView from '@/components/DepartmentView';
import { getProducts, getCollections } from '@/lib/api';

interface CollectionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const COLLECTION_METADATA: Record<string, { name: string; tagline: string; desc: string }> = {
  signature: {
    name: 'Canadian Signature Collection',
    tagline: 'The Quintessential Gift Collection',
    desc: 'Timeless hardwood wall art, precision laser crafts, and heirloom plaques celebrating Canadian heritage.',
  },
  gardens: {
    name: 'Laurentian Gardens Collection',
    tagline: 'Botanical Sculptures & Natural Timber',
    desc: 'Botanical patterns, floral mandalas, and natural woodcrafts inspired by Canadian flora and forests.',
  },
  'day-night': {
    name: 'Aurora Day & Night Collection',
    tagline: 'Ambient Illumination & Nocturnal Art',
    desc: 'Bespoke LED night lights and dimensional mountain silhouettes capturing the Northern lights.',
  },
  'historic-architecture': {
    name: 'Historic Architecture Collection',
    tagline: 'Geometric Mastery & Modern Living',
    desc: 'Architectural honeycomb wall shelves and geometric wooden wall sculptures for modern living.',
  },
  'limited-editions': {
    name: 'Limited Collector Editions',
    tagline: 'Numbered Rarity & Certified Provenance',
    desc: 'Bespoke hand-finished keepsake plaques and limited run clocks crafted by master Canadian artisans.',
  },
};

export async function generateStaticParams() {
  const dbCollections = await getCollections();
  const dbSlugs = dbCollections.map((c) => ({ slug: c.slug }));
  const metaSlugs = Object.keys(COLLECTION_METADATA).map((slug) => ({ slug }));
  const allSlugs = [...metaSlugs];
  dbSlugs.forEach((s) => {
    if (!allSlugs.some((x) => x.slug === s.slug)) allSlugs.push(s);
  });
  return allSlugs;
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const col = COLLECTION_METADATA[slug] || {
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    desc: 'Official boutique collection.',
  };

  return {
    title: `${col.name} | Memoriq Canada 🇨🇦`,
    description: col.desc,
  };
}

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const col = COLLECTION_METADATA[slug];

  const colName = col?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const colTagline = col?.tagline || 'Official Heritage Collection';
  const colDesc = col?.desc || 'Curated keepsakes celebrating exquisite craftsmanship.';

  const allProducts = await getProducts();

  // Filter products by collection name or slug keyword
  const keyword = slug.toLowerCase().replace(/-/g, ' ');
  const matched = allProducts.filter((p) => {
    const text = `${p.collection_name || ''} ${p.name} ${p.description}`.toLowerCase();
    return text.includes(keyword) || text.includes(colName.toLowerCase());
  });

  const displayProducts = matched.length > 0 ? matched : allProducts.slice(0, 8);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <DepartmentView
          title={colName}
          eyebrow={colTagline}
          subtitle={colDesc}
          breadcrumbName={colName}
          subcategories={[]}
          products={displayProducts}
        />
      </main>
      <ReassuranceFooter />
      <Footer />
    </div>
  );
}
