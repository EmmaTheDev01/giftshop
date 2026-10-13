import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DepartmentView from '@/components/DepartmentView';
import { NAV_MENU } from '@/config/navigation';
import { getProducts } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Canadian Souvenirs & Heritage Keepsakes | Memoriq Canada 🇨🇦',
  description:
    'Authentic Canadian maple leaf wall art, Rocky Mountain silhouettes, boreal forest plaques, and vintage compass keepsakes priced in CAD.',
};

export default async function SouvenirsPage() {
  const souvenirsMenu = NAV_MENU.find((m) => m.slug === 'souvenirs');
  const subcategories = souvenirsMenu?.items || [];
  const allProducts = await getProducts();

  // Filter products relevant to Canadian souvenirs and keepsakes
  const souvenirProducts = allProducts.filter((p) => {
    const cat = (p.category_name || '').toLowerCase();
    const name = p.name.toLowerCase();
    const desc = (p.description || '').toLowerCase();
    return (
      cat.includes('souvenir') ||
      cat.includes('keepsake') ||
      name.includes('maple') ||
      name.includes('canada') ||
      name.includes('mountain') ||
      name.includes('silhouette') ||
      name.includes('compass') ||
      name.includes('wildlife') ||
      name.includes('mandala') ||
      desc.includes('canada') ||
      desc.includes('souvenir') ||
      desc.includes('keepsake')
    );
  });

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <DepartmentView
          title="Canadian Souvenirs & Keepsakes"
          eyebrow="Heirloom Tokens • Boreal & Alpine Heritage"
          subtitle="Cherish authentic memories of Canada with heirloom maple leaf designs, mountain range silhouettes, and nature-inspired timber keepsakes."
          breadcrumbName="Souvenirs"
          subcategories={subcategories}
          products={souvenirProducts.length > 0 ? souvenirProducts : allProducts}
        />
      </main>
      <ReassuranceFooter />
      <Footer />
    </div>
  );
}
