import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DepartmentView from '@/components/DepartmentView';
import { PRODUCTS } from '@/data/mockData';

interface CollectionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const COLLECTION_METADATA: Record<string, { name: string; tagline: string; desc: string }> = {
  signature: {
    name: 'Signature Collection',
    tagline: 'The Quintessential Gift Collection',
    desc: 'Timeless architectural keepsakes, official collector medals, and scale replica monuments cast in rich bronze.',
  },
  gardens: {
    name: 'Gardens Collection',
    tagline: 'Botanical Allées & Natural Scents',
    desc: 'Botanical aromas, scented candles, organic maple delicacies, and green parkland inspirations.',
  },
  'day-night': {
    name: 'Day & Night Collection',
    tagline: 'Dawn Glow to Nocturnal Brilliance',
    desc: 'Objects celebrating the magical transition from soft morning light to the sparkling midnight panorama.',
  },
  'paris-rooftops': {
    name: 'Heritage Rooftops Collection',
    tagline: 'Zinc Patina, Limoges & Architecture',
    desc: 'Porcelain espresso services and decorative accents paying homage to iconic zinc and copper rooftops.',
  },
  '330-meters': {
    name: 'Monumental 330m Collection',
    tagline: 'Celebrating Structural Ironwork & Height',
    desc: 'Monographs, precision scale replicas, and steel silhouette sculptures celebrating monumental height.',
  },
  'limited-editions': {
    name: 'Limited Collector Editions',
    tagline: 'Numbered Rarity & Certified Provenance',
    desc: 'Historic rivets, numbered bronze statues, and authenticated collector pieces issued in strictly limited quantities.',
  },
  'olympic-collection': {
    name: 'The Heritage Games Collection',
    tagline: 'Sporting Prestige & Centennial Triumphs',
    desc: 'Commemorative medals and sporting heritage apparel celebrating world-class athleticism.',
  },
  'gustave-eiffel': {
    name: 'Architectural Line',
    tagline: 'Engineering Mastery & Pure Latticework',
    desc: 'Structural steel and wooden puzzle models honouring world-famous architectural engineering.',
  },
};

export async function generateStaticParams() {
  return Object.keys(COLLECTION_METADATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const col = COLLECTION_METADATA[slug] || {
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    desc: 'Official boutique collection.',
  };

  return {
    title: `${col.name} | The Gift Shop Canada 🇨🇦`,
    description: col.desc,
  };
}

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const col = COLLECTION_METADATA[slug];

  const colName = col?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const colTagline = col?.tagline || 'Official Heritage Collection';
  const colDesc = col?.desc || 'Curated keepsakes celebrating exquisite craftsmanship.';

  // Filter products by collection name or slug keyword
  const keyword = slug.toLowerCase().replace(/-/g, ' ');
  const matched = PRODUCTS.filter((p) => {
    const text = `${p.collection_name || ''} ${p.name} ${p.description}`.toLowerCase();
    return text.includes(keyword) || text.includes(colName.toLowerCase());
  });

  const displayProducts = matched.length > 0 ? matched : PRODUCTS.slice(0, 8);

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
