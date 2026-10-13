import React from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import CommitmentsBar from '@/components/CommitmentsBar';
import ProductCarousel from '@/components/ProductCarousel';
import SpotlightRivet from '@/components/SpotlightRivet';
import CuratedLookbook from '@/components/CuratedLookbook';
import BrandManifesto from '@/components/BrandManifesto';
import CollaborationsGrid from '@/components/CollaborationsGrid';
import CollectionsSlider from '@/components/CollectionsSlider';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Navigation & Header */}
      <Header />

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        {/* 1. Hero Section: Diamond Light */}
        <HeroBanner />

        {/* 2. Official Guarantees / Commitments Bar */}
        <CommitmentsBar />

        {/* 3. Official Keepsakes Carousel */}
        <ProductCarousel />

        {/* 4. Limited Edition Feature: The 2025 Rivet */}
        <SpotlightRivet />

        {/* 5. Curated Lookbook & Summer Souvenirs */}
        <CuratedLookbook />

        {/* 6. Brand Heritage Manifesto */}
        <BrandManifesto />

        {/* 7. Official Collaborations (Maison Partenaires) */}
        <CollaborationsGrid />

        {/* 8. Parisian Collections Slider */}
        <CollectionsSlider />

        {/* 9. Buyer Protection & Newsletter Registration */}
        <ReassuranceFooter />
      </main>

      {/* Official Footer */}
      <Footer />
    </div>
  );
}
