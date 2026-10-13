import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DepartmentView from '@/components/DepartmentView';
import { NAV_MENU } from '@/config/navigation';
import { getProducts } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Artisan Gifts & Commemorative Tokens | Memoriq Canada 🇨🇦',
  description:
    'Curated Canadian woodcraft gift sets, personalized plaques, celebratory cake toppers, and bespoke keepsakes priced in CAD.',
};

export default async function GiftsPage() {
  const giftsMenu = NAV_MENU.find((m) => m.slug === 'gifts');
  const subcategories = giftsMenu?.items || [];
  const allProducts = await getProducts();

  // Filter products relevant to gifts
  const giftProducts = allProducts.filter((p) => {
    const cat = (p.category_name || '').toLowerCase();
    const name = p.name.toLowerCase();
    return (
      cat.includes('gift') ||
      cat.includes('keepsake') ||
      name.includes('nursery') ||
      name.includes('sign') ||
      name.includes('holder') ||
      name.includes('plaque') ||
      p.is_limited_edition ||
      p.badge === 'Bestseller' ||
      p.badge === 'Featured'
    );
  });

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <DepartmentView
          title="The Gifts Department"
          eyebrow="Curated Keepsakes &amp; Heirloom Tokens"
          subtitle="From personalized LED signs to laser-sculpted hardwood art, discover exceptional Canadian gifts presented in archival packaging."
          breadcrumbName="Gifts"
          subcategories={subcategories}
          products={giftProducts.length > 0 ? giftProducts : allProducts}
        />
      </main>
      <ReassuranceFooter />
      <Footer />
    </div>
  );
}
