import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DepartmentView from '@/components/DepartmentView';
import { NAV_MENU } from '@/config/navigation';
import { getProducts } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Home Decorations & Wall Sculptures | Memoriq Canada 🇨🇦',
  description:
    'Discover artisan wall clocks, geometric honeycomb shelves, entryway key racks, rustic signs, and ambient LED wall decor priced in CAD.',
};

export default async function DecorationsPage() {
  const decorMenu = NAV_MENU.find((m) => m.slug === 'decorations');
  const subcategories = decorMenu?.items || [];
  const allProducts = await getProducts();

  // Filter products relevant to decorations
  const decorProducts = allProducts.filter((p) => {
    const cat = (p.category_name || '').toLowerCase();
    const name = p.name.toLowerCase();
    const desc = (p.description || '').toLowerCase();
    return (
      cat.includes('decor') ||
      cat.includes('wall') ||
      cat.includes('clock') ||
      name.includes('clock') ||
      name.includes('shelf') ||
      name.includes('shelves') ||
      name.includes('holder') ||
      name.includes('rack') ||
      name.includes('wall') ||
      name.includes('sign') ||
      name.includes('light') ||
      name.includes('led') ||
      desc.includes('wall') ||
      desc.includes('decor')
    );
  });

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <DepartmentView
          title="Artisan Home Decorations"
          eyebrow="Architectural Accents • Functional Elegance"
          subtitle="Transform Canadian living spaces with silent sweep quartz wall clocks, magnetic key organizers, geometric display shelving, and warm LED signs."
          breadcrumbName="Decorations"
          subcategories={subcategories}
          products={decorProducts.length > 0 ? decorProducts : allProducts}
        />
      </main>
      <ReassuranceFooter />
      <Footer />
    </div>
  );
}
