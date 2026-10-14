import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DepartmentView from '@/components/DepartmentView';
import { getProducts, getCollections } from '@/lib/api';

export const dynamic = 'force-dynamic';

interface CollectionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const COLLECTION_METADATA: Record<string, { name: string; tagline: string; desc: string }> = {
  signature: {
    name: 'North American Signature Keepsakes',
    tagline: 'The Quintessential Gift Collection',
    desc: 'Timeless hardwood wall art, precision laser crafts, and heirloom plaques celebrating Canadian heritage.',
  },
  gardens: {
    name: 'Laurentian Woodcraft & Forest Art',
    tagline: 'Botanical Sculptures & Natural Timber',
    desc: 'Botanical patterns, floral mandalas, and natural woodcrafts inspired by Canadian flora and forests.',
  },
  'day-night': {
    name: 'Artisan Living & Architectural Clocks',
    tagline: 'From Morning Dawn to Northern Lights',
    desc: 'Bespoke LED night lights, precision pendulum clocks, and dimensional mountain silhouettes capturing the Northern lights.',
  },
  'historic-architecture': {
    name: 'Architectural Metal & Script Art',
    tagline: 'Geometric Mastery & Modern Living',
    desc: 'Architectural skyline silhouettes, cursive script accents, and precision laser-cut steel wall sculptures.',
  },
  '330-meters': {
    name: 'Monumental Heights & Mountain Summits',
    tagline: 'Architectural Height & Rocky Mountain Summits',
    desc: 'Commemorating the monumental summits of Canadian engineering and Rocky mountain peaks with precision monographs.',
  },
  'limited-editions': {
    name: 'Limited Collector Editions',
    tagline: 'Numbered Rarity & Certified Provenance',
    desc: 'Bespoke hand-finished keepsake plaques, crystal monoliths, and limited run clocks crafted by master Canadian artisans.',
  },
  'olympic-collection': {
    name: 'Heirloom Gifting & Commemorative Relics',
    tagline: 'Sporting Prestige & Winter Triumphs',
    desc: 'Commemorating Canadian winter triumphs and celebration heirlooms with handcrafted keepsakes, guestbooks, and boards.',
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

  // Directly fetch products assigned to this collection slug
  const collectionProducts = await getProducts({ collectionSlug: slug });
  console.log('DEBUG CollectionDetailPage:', { slug, colCount: collectionProducts.length });

  let displayProducts = collectionProducts;
  if (displayProducts.length === 0) {
    const allProducts = await getProducts();
    const keyword = slug.toLowerCase().replace(/-/g, ' ');
    const matched = allProducts.filter((p) => {
      const text = `${p.collection_name || ''} ${p.name} ${p.description}`.toLowerCase();
      return text.includes(keyword) || text.includes(colName.toLowerCase());
    });
    displayProducts = matched.length > 0 ? matched : allProducts.slice(0, 12);
  }

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
