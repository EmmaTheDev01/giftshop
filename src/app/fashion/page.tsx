import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DepartmentView from '@/components/DepartmentView';
import { PRODUCTS, NAV_MENU } from '@/data/mockData';

export const metadata: Metadata = {
  title: 'Fashion & Maritime Knitwear | Official Memoriq Boutique Canada 🇨🇦',
  description:
    'Saint James pure wool marinières, organic cotton heritage tees, artisan silk squares, and linen tote bags priced in CAD.',
};

export default function FashionPage() {
  const fashionMenu = NAV_MENU.find((m) => m.slug === 'fashion');
  const subcategories = fashionMenu?.items || [];

  // Filter products relevant to fashion
  const fashionProducts = PRODUCTS.filter((p) => {
    const cat = (p.category_name || '').toLowerCase();
    const name = p.name.toLowerCase();
    return (
      cat.includes('fashion') ||
      cat.includes('apparel') ||
      cat.includes('knitwear') ||
      cat.includes('silk') ||
      cat.includes('bag') ||
      name.includes('mariniere') ||
      name.includes('t-shirt') ||
      name.includes('tote') ||
      name.includes('scarf') ||
      name.includes('wool')
    );
  });

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <DepartmentView
          title="Fashion & Maritime Heritage"
          eyebrow="Pure Wool • Organic Cotton • Fine Silk"
          subtitle="Timeless style inspired by coastal heritage and Parisian elegance, featuring authentic Saint James knitwear and bespoke accessories."
          breadcrumbName="Fashion"
          subcategories={subcategories}
          products={fashionProducts.length > 0 ? fashionProducts : PRODUCTS}
        />
      </main>
      <ReassuranceFooter />
      <Footer />
    </div>
  );
}
