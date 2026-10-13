import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DepartmentView from '@/components/DepartmentView';
import { PRODUCTS, NAV_MENU } from '@/data/mockData';

export const metadata: Metadata = {
  title: 'Lifestyle & Art de Vivre | Official Memoriq Boutique Canada 🇨🇦',
  description:
    'Refined home accents, Limoges porcelain tableware, scented candles by Kerzon, fine art prints, and gourmet treats in CAD.',
};

export default function LifestylePage() {
  const lifestyleMenu = NAV_MENU.find((m) => m.slug === 'lifestyle');
  const subcategories = lifestyleMenu?.items || [];

  // Filter products relevant to lifestyle
  const lifestyleProducts = PRODUCTS.filter((p) => {
    const cat = (p.category_name || '').toLowerCase();
    const name = p.name.toLowerCase();
    return (
      cat.includes('home') ||
      cat.includes('fragrance') ||
      cat.includes('tableware') ||
      cat.includes('porcelain') ||
      cat.includes('decorative') ||
      cat.includes('book') ||
      cat.includes('stationery') ||
      cat.includes('tea') ||
      cat.includes('gourmet') ||
      name.includes('candle') ||
      name.includes('tea') ||
      name.includes('cup') ||
      name.includes('monograph') ||
      name.includes('journal') ||
      name.includes('sculpture')
    );
  });

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <DepartmentView
          title="Lifestyle & Art de Vivre"
          eyebrow="Art of Living • Refined Accents"
          subtitle="Elevate Canadian living with Limoges porcelain, Parisian natural fragrances, gourmet teas, and curated art monographs."
          breadcrumbName="Lifestyle"
          subcategories={subcategories}
          products={lifestyleProducts.length > 0 ? lifestyleProducts : PRODUCTS}
        />
      </main>
      <ReassuranceFooter />
      <Footer />
    </div>
  );
}
