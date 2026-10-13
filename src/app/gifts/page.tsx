import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DepartmentView from '@/components/DepartmentView';
import { PRODUCTS, NAV_MENU } from '@/data/mockData';

export const metadata: Metadata = {
  title: 'Gifts & Keepsakes | Official Memoriq Boutique Canada 🇨🇦',
  description:
    'Explore curated gift sets, numbered summit medals, limited-edition keepsakes, and collector treasures for Canadians in CAD.',
};

export default function GiftsPage() {
  const giftsMenu = NAV_MENU.find((m) => m.slug === 'gifts');
  const subcategories = giftsMenu?.items || [];

  // Filter products relevant to gifts
  const giftProducts = PRODUCTS.filter((p) => {
    const cat = (p.category_name || '').toLowerCase();
    const name = p.name.toLowerCase();
    return (
      cat.includes('medal') ||
      cat.includes('keepsake') ||
      cat.includes('statue') ||
      cat.includes('miniature') ||
      cat.includes('confection') ||
      name.includes('medal') ||
      name.includes('rivet') ||
      name.includes('bronze') ||
      name.includes('syrup') ||
      p.is_limited_edition ||
      p.badge === 'Iconic' ||
      p.badge === 'Collector'
    );
  });

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <DepartmentView
          title="The Gifts Department"
          eyebrow="Curated Keepsakes & Collector Sets"
          subtitle="From official summit medals to authentic monument bronze statues, discover exceptional Canadian and Parisian gift treasures."
          breadcrumbName="Gifts"
          subcategories={subcategories}
          products={giftProducts.length > 0 ? giftProducts : PRODUCTS}
        />
      </main>
      <ReassuranceFooter />
      <Footer />
    </div>
  );
}
