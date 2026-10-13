import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import ProductDetailClient from './ProductDetailClient';
import { getProductBySlug, getProducts } from '@/lib/api';
import { ExtendedProduct } from '@/types/supabase';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | The Gift Shop',
    };
  }

  return {
    title: `${product.name} | The Gift Shop Canada 🇨🇦`,
    description: (product.description || product.short_description) ?? undefined,
    openGraph: {
      title: `${product.name} - $${product.price.toFixed(2)} CAD`,
      description: (product.short_description || product.description) ?? undefined,
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Related products from same category or collection
  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category_id === product.category_id || p.collection_id === product.collection_id))
    .slice(0, 4);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <ProductDetailClient product={product} relatedProducts={relatedProducts} />
      </main>
      <ReassuranceFooter />
      <Footer />
    </div>
  );
}
