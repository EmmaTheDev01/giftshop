import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DepartmentView from '@/components/DepartmentView';
import { NAV_MENU } from '@/config/navigation';
import { getProducts } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Your Own Mark • Custom Keepsakes & Personalization Studio | Memoriq 🇨🇦 🇺🇸',
  description:
    'Design custom engraved keepsakes, personalized name plaques, bespoke coordinates, and heirloom tokens crafted just for you.',
};

export default async function CustomizePage() {
  const customizeMenu = NAV_MENU.find((m) => m.slug === 'customize');
  const subcategories = customizeMenu?.items || [];
  const allProducts = await getProducts();

  // Filter products relevant to personalization and customization
  const customProducts = allProducts.filter((p) => {
    const cat = (p.category_name || '').toLowerCase();
    const name = p.name.toLowerCase();
    const desc = (p.description || '').toLowerCase();
    return (
      name.includes('sign') ||
      name.includes('plaque') ||
      name.includes('wood') ||
      name.includes('holder') ||
      name.includes('coasters') ||
      desc.includes('engraved') ||
      desc.includes('personal') ||
      p.is_limited_edition ||
      cat.includes('craft')
    );
  });

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <DepartmentView
          title="Your Own Mark Studio"
          eyebrow="Designed Just for You"
          subtitle="Choose a gift, add your details, and create something they won't forget. Laser-engraved with names, dates, coordinates and personal dedications in master Canadian hardwood."
          breadcrumbName="Customize"
          subcategories={subcategories}
          products={customProducts.length > 0 ? customProducts : allProducts}
        />
      </main>
      <ReassuranceFooter />
      <Footer />
    </div>
  );
}
