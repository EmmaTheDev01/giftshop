import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DepartmentView from '@/components/DepartmentView';
import { PRODUCTS, NAV_MENU } from '@/data/mockData';

export const metadata: Metadata = {
  title: 'Kids & Young Explorers | Official Memoriq Boutique Canada 🇨🇦',
  description:
    'Artisan wooden puzzles by Vilac, illustrated discovery books, and organic apparel for Canadian children in CAD.',
};

export default function KidsPage() {
  const kidsMenu = NAV_MENU.find((m) => m.slug === 'kids');
  const subcategories = kidsMenu?.items || [];

  // Filter products relevant to kids
  const kidsProducts = PRODUCTS.filter((p) => {
    const cat = (p.category_name || '').toLowerCase();
    const name = p.name.toLowerCase();
    return (
      cat.includes('kids') ||
      cat.includes('game') ||
      cat.includes('toy') ||
      cat.includes('puzzle') ||
      name.includes('puzzle') ||
      name.includes('vilac') ||
      name.includes('toy') ||
      name.includes('book')
    );
  });

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <DepartmentView
          title="Kids & Young Explorers"
          eyebrow="Heirloom Wood Toys • Illustrated Tales"
          subtitle="Inspire curiosity and wonder with handcrafted wooden toys from the Jura mountains, architectural puzzles, and timeless keepsakes."
          breadcrumbName="Kids"
          subcategories={subcategories}
          products={kidsProducts.length > 0 ? kidsProducts : PRODUCTS}
        />
      </main>
      <ReassuranceFooter />
      <Footer />
    </div>
  );
}
