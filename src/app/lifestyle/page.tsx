import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DepartmentView from '@/components/DepartmentView';
import { NAV_MENU } from '@/config/navigation';
import { getProducts } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Artisan Living & Home Decor | Memoriq Canada 🇨🇦',
  description:
    'Refined handcrafted home accents, wooden wall clocks, entryway organizers, and ambient decor in CAD.',
};

export default async function LifestylePage() {
  const decorMenu = NAV_MENU.find((m) => m.slug === 'decorations');
  const subcategories = decorMenu?.items || [];
  const allProducts = await getProducts();

  const lifestyleProducts = allProducts.filter((p) => {
    const cat = (p.category_name || '').toLowerCase();
    const name = p.name.toLowerCase();
    return (
      cat.includes('decor') ||
      cat.includes('home') ||
      name.includes('clock') ||
      name.includes('shelf') ||
      name.includes('holder') ||
      name.includes('sign')
    );
  });

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <DepartmentView
          title="Artisan Living &amp; Home Accents"
          eyebrow="Crafted Living • Modern Canadian Homes"
          subtitle="Elevate Canadian living spaces with precision-crafted wooden wall decor, silent quartz clocks, and functional entryway organizers."
          breadcrumbName="Lifestyle"
          subcategories={subcategories}
          products={lifestyleProducts.length > 0 ? lifestyleProducts : allProducts}
        />
      </main>
      <ReassuranceFooter />
      <Footer />
    </div>
  );
}
