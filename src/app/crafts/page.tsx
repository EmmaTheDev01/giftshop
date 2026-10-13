import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DepartmentView from '@/components/DepartmentView';
import { NAV_MENU } from '@/config/navigation';
import { getProducts } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Artisan Woodcraft & Handmade Creations | Memoriq Canada 🇨🇦',
  description:
    'Explore precision laser-cut birch and walnut craft, dimensional wildlife art, engraved coasters, and handcrafted wooden jewelry in Canadian Dollars (CAD).',
};

export default async function CraftsPage() {
  const craftsMenu = NAV_MENU.find((m) => m.slug === 'crafts');
  const subcategories = craftsMenu?.items || [];
  const allProducts = await getProducts();

  // Filter products relevant to crafts and woodworking
  const craftProducts = allProducts.filter((p) => {
    const cat = (p.category_name || '').toLowerCase();
    const name = p.name.toLowerCase();
    const desc = (p.description || '').toLowerCase();
    return (
      cat.includes('craft') ||
      cat.includes('wood') ||
      cat.includes('laser') ||
      name.includes('wood') ||
      name.includes('laser') ||
      name.includes('sculpture') ||
      name.includes('wolf') ||
      name.includes('birch') ||
      name.includes('walnut') ||
      desc.includes('laser') ||
      desc.includes('hardwood')
    );
  });

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <DepartmentView
          title="Handmade Crafts & Woodwork"
          eyebrow="Canadian Hardwood • Precision Laser Art"
          subtitle="Precision laser-sculpted Canadian birch, black walnut, and artisan joinery celebrating the raw beauty of natural timber."
          breadcrumbName="Crafts"
          subcategories={subcategories}
          products={craftProducts.length > 0 ? craftProducts : allProducts}
        />
      </main>
      <ReassuranceFooter />
      <Footer />
    </div>
  );
}
