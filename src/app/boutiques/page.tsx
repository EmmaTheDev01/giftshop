import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DiamondSeparator from '@/components/DiamondSeparator';
import { SITE_CONFIG } from '@/config/site';
import { Globe, Award, Package, ShieldCheck, ArrowRight, ChevronRight, Clock, Mail, Phone, Truck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: `The Official Online Boutique | ${SITE_CONFIG.name}`,
  description:
    'Experience our official online boutique. Handcrafted artisan keepsakes, custom laser engraving, and heirloom gifts delivered directly from our studio to your doorstep.',
};

export default function OnlineBoutiquePage() {
  const onlinePillars = [
    {
      icon: Award,
      title: 'Direct Atelier Craftsmanship',
      subtitle: 'Zero Retail Markups',
      description:
        'By operating exclusively online, we bypass traditional retail middlemen and invest directly into master-grade sustainably sourced hardwoods, high-precision laser optics, and artisan hand-finishes.',
    },
    {
      icon: Package,
      title: 'Signature Gift Presentation',
      subtitle: 'Complimentary On Every Order',
      description:
        'Every keepsake arrives encased in our signature gold-embossed presentation box, cushioned with archival protective inserts and accompanied by an official certificate of authenticity.',
    },
    {
      icon: Truck,
      title: 'Tracked Direct Delivery',
      subtitle: 'Expedited & Fully Insured',
      description:
        'Orders are prepared, inspected, and dispatched with precision. Receive live courier tracking and delivery alerts directly to your phone or email every step of the journey.',
    },
    {
      icon: ShieldCheck,
      title: '30-Day In-Home Guarantee',
      subtitle: 'Effortless Confidence',
      description:
        'Experience the rich wood grain, tactile weight, and flawless laser craft in the comfort of your home. If a piece does not completely enchant you, enjoy our 30-day return guarantee.',
    },
  ];

  const orderingSteps = [
    {
      num: '01',
      title: 'Select or Customize',
      desc: 'Explore our master catalogue or use our studio customizer to input personal names, dates, coordinates, and dedications.',
    },
    {
      num: '02',
      title: 'Atelier Laser Crafting',
      desc: 'Our artisans calibrate precision laser systems to engrave your design into select natural hardwoods, finished with organic beeswax.',
    },
    {
      num: '03',
      title: 'Delivered in Luxury',
      desc: 'Carefully packaged in our heirloom gift box with wax-sealed certificates, dispatched promptly to your home or recipient address.',
    },
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      {/* Hero Banner */}
      <section
        style={{
          backgroundColor: '#0c2340',
          color: '#ffffff',
          padding: '80px 20px 68px',
          borderBottom: '2px solid #b47e00',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container-custom" style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          {/* Breadcrumbs */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '18px' }}>
            <Link href="/" style={{ color: '#dda82e', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={13} />
            <span style={{ color: '#ffffff' }}>Online Boutique</span>
          </nav>

          {/* Badge */}
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#dda82e',
              backgroundColor: 'rgba(221, 168, 46, 0.12)',
              border: '1px solid rgba(221, 168, 46, 0.3)',
              padding: '5px 12px',
              borderRadius: '2px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '16px',
            }}
          >
            <Globe size={13} />
            <span>Exclusively Online • Direct From Atelier</span>
          </span>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.3rem, 5vw, 3.5rem)', fontWeight: 600, lineHeight: 1.15, marginBottom: '18px' }}>
            The Official Online Boutique
          </h1>

          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '720px', marginBottom: '28px' }}>
            We operate exclusively as a premier direct-to-patron digital atelier. Every heirloom keepsake, custom laser-cut creation, and commemorative art piece is crafted to order and dispatched directly to your doorstep.
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link
              href="/catalogue"
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 26px',
                fontSize: '0.9rem',
              }}
            >
              <span>Explore Master Catalogue</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/customize"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '12px 24px',
                borderRadius: '2px',
                fontWeight: 600,
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              <span>Personalize a Keepsake</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container-custom" style={{ maxWidth: '1000px', margin: '0 auto', padding: '64px 20px 80px', flex: 1 }}>
        
        {/* Section 1: The Direct Atelier Model */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 52px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b47e00', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Pure Craft • Zero Middlemen
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: '#0c2340', fontWeight: 600, margin: '8px 0 14px' }}>
            Why We Are Exclusively Online
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.98rem', lineHeight: 1.7 }}>
            By maintaining a focused digital atelier rather than traditional storefronts, we pour every resource into finest natural materials, bespoke laser craftsmanship, personalized customer service, and white-glove presentation.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '64px',
          }}
        >
          {onlinePillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: '#faf8f5',
                  border: '1px solid #ebd9c0',
                  borderRadius: '6px',
                  padding: '32px 26px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 16px rgba(12, 35, 64, 0.03)',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(180, 126, 0, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#b47e00',
                    marginBottom: '18px',
                  }}
                >
                  <Icon size={24} />
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#b47e00' }}>
                  {p.subtitle}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#0c2340', margin: '4px 0 10px', fontWeight: 600 }}>
                  {p.title}
                </h3>
                <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.65, margin: 0 }}>
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>

        <DiamondSeparator />

        {/* Section 2: How It Works */}
        <div style={{ margin: '64px 0' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 44px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b47e00', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Seamless Experience
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.1rem', color: '#0c2340', fontWeight: 600, margin: '6px 0 10px' }}>
              From Atelier to Your Door in 3 Steps
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.94rem' }}>
              Ordering your customized heirloom gift is simple, transparent, and backed by live concierge support.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {orderingSteps.map((step) => (
              <div
                key={step.num}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '28px 24px',
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2.4rem',
                    fontWeight: 700,
                    color: '#e2e8f0',
                    lineHeight: 1,
                    display: 'block',
                    marginBottom: '12px',
                  }}
                >
                  {step.num}
                </span>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#0c2340', margin: '0 0 8px', fontWeight: 600 }}>
                  {step.title}
                </h4>
                <p style={{ color: '#64748b', fontSize: '0.86rem', lineHeight: 1.6, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Concierge Help Card */}
        <div
          style={{
            backgroundColor: '#faf8f5',
            border: '1px solid #ebd9c0',
            borderRadius: '6px',
            padding: '36px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div style={{ maxWidth: '580px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#b47e00' }}>
              Dedicated Client Concierge
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#0c2340', margin: '6px 0 10px', fontWeight: 600 }}>
              Need Help Selecting or Customizing a Gift?
            </h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
              Our concierge team is at your disposal for custom font suggestions, coordinate lookups, corporate volume gifting, or order inquiries.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                fontSize: '0.88rem',
              }}
            >
              <Mail size={16} />
              <span>Contact Concierge</span>
            </Link>

            <Link
              href="/faq"
              className="btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                fontSize: '0.88rem',
              }}
            >
              <span>View F.A.Q</span>
            </Link>
          </div>
        </div>
      </main>

      <ReassuranceFooter />
      <Footer />
    </div>
  );
}
