import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DepartmentView from '@/components/DepartmentView';
import { NAV_MENU } from '@/config/navigation';
import { getProducts, getCategories } from '@/lib/api';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Collect all known category and subcategory slugs from navigation
const NAV_CATEGORY_SLUGS: { slug: string; name: string; parentMenu?: string }[] = [];

NAV_MENU.forEach((menu) => {
  NAV_CATEGORY_SLUGS.push({ slug: menu.slug, name: menu.name });
  if (menu.items) {
    menu.items.forEach((item) => {
      NAV_CATEGORY_SLUGS.push({ slug: item.slug, name: item.name, parentMenu: menu.name });
    });
  }
});

export async function generateStaticParams() {
  const dbCategories = await getCategories();
  const dbSlugs = dbCategories.map((c) => ({ slug: c.slug }));
  const navSlugs = NAV_CATEGORY_SLUGS.map((c) => ({ slug: c.slug }));
  const all = [...navSlugs];
  dbSlugs.forEach((s) => {
    if (!all.some((x) => x.slug === s.slug)) all.push(s);
  });
  return all;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = NAV_CATEGORY_SLUGS.find((c) => c.slug === slug);
  const title = match?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${title} | Memoriq Canada 🇨🇦`,
    description: `Shop authentic ${title} in Canadian Dollars (CAD). Certified quality with expedited Canada Post delivery across Canada.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const match = NAV_CATEGORY_SLUGS.find((c) => c.slug === slug);

  const categoryName = match?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const parentMenuName = match?.parentMenu || 'Catalogue';

  // Find parent menu items for subcategory pills
  const parentMenu = NAV_MENU.find((m) => m.slug === slug || m.name === parentMenuName);
  const subcategories = parentMenu?.items || [];

  const allProducts = await getProducts();

  // Filter products by slug keyword
  const keyword = slug.toLowerCase().replace(/-/g, ' ');
  const singleWords = keyword.split(' ').filter((w) => w.length > 2);

  const matchedProducts = allProducts.filter((p) => {
    const text = `${p.name} ${p.category_name} ${p.description} ${p.collection_name} ${p.brand_name}`.toLowerCase();
    if (text.includes(keyword)) return true;
    return singleWords.some((w) => text.includes(w));
  });

  const displayProducts = matchedProducts.length > 0 ? matchedProducts : allProducts;

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <DepartmentView
          title={categoryName}
          eyebrow={`Official Collection • ${parentMenuName}`}
          subtitle={`Discover authentic artisan keepsakes, fine craftsmanship, and Canadian gifts within our ${categoryName} curation.`}
          breadcrumbName={categoryName}
          subcategories={subcategories}
          products={displayProducts}
        />
      </main>
      <ReassuranceFooter />
      <Footer />
    </div>
  );
}
