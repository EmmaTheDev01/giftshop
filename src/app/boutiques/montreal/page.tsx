import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReassuranceFooter from '@/components/ReassuranceFooter';
import DiamondSeparator from '@/components/DiamondSeparator';
import { SITE_CONFIG } from '@/config/site';
import { MapPin, Clock, Phone, Mail, Award, Gift, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: `Montreal Boutique | Old Montreal (Vieux-Montréal) | ${SITE_CONFIG.name}`,
  description:
    'Visit our historic Old Montreal boutique on Rue Saint-Paul. Discover authentic French and French-Canadian curated gifts, artisanal chocolates, and private tastings.',
};

export default function MontrealBoutiquePage() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      {/* Hero Banner */}
      <section
        style={{
          backgroundColor: '#0c2340',
          color: '#ffffff',
          padding: '72px 20px 60px',
          borderBottom: '2px solid #b47e00',
          position: 'relative',
        }}
      >
        <div className="container-custom" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '16px' }}>
            <Link href="/" style={{ color: '#dda82e' }}>Home</Link>
            <ChevronRight size={13} />
            <Link href="/boutiques" style={{ color: '#dda82e' }}>Our Boutiques</Link>
            <ChevronRight size={13} />
            <span style={{ color: '#ffffff' }}>Montreal Boutique</span>
          </nav>

          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#dda82e',
              backgroundColor: 'rgba(221, 168, 46, 0.12)',
              border: '1px solid rgba(221, 168, 46, 0.3)',
              padding: '4px 10px',
              borderRadius: '2px',
              display: 'inline-block',
              marginBottom: '14px',
            }}
          >
            Vieux-Montréal Heritage Salon
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 600, marginBottom: '16px' }}>
            Montreal Boutique &amp; Salon
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '720px' }}>
            Set among the cobblestone streets of Old Montreal on Rue Saint-Paul, our salon celebrates the profound cultural friendship between France and Quebec with bilingual concierge service.
          </p>
        </div>
      </section>

      {/* Boutique Details & Schedule */}
      <main className="container-custom" style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px 80px', flex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '56px' }}>
          {/* Location & Opening Hours Card */}
          <div
            style={{
              backgroundColor: '#faf8f5',
              border: '1px solid #ebd9c0',
              borderRadius: '6px',
              padding: '36px 30px',
              boxShadow: '0 6px 20px rgba(12, 35, 64, 0.04)',
            }}
          >
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#0c2340', marginBottom: '20px', fontWeight: 600 }}>
              Informations &amp; Horaires
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.92rem' }}>
              <div style={{ display: 'flex', gap: '14px' }}>
                <MapPin size={22} style={{ color: '#b47e00', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#0c2340', display: 'block' }}>Adresse</strong>
                  <span style={{ color: '#475569' }}>242 Rue Saint-Paul Ouest<br />Vieux-Montréal, QC H2Y 1Z9</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <Clock size={22} style={{ color: '#b47e00', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#0c2340', display: 'block' }}>Heures d&apos;ouverture / Hours</strong>
                  <span style={{ color: '#475569' }}>
                    Lundi – Samedi : 10h00 – 19h00 HNE<br />
                    Dimanche : 11h00 – 17h00 HNE
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <Phone size={22} style={{ color: '#b47e00', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#0c2340', display: 'block' }}>Téléphone direct</strong>
                  <a href={`tel:${SITE_CONFIG.contact.phone}`} style={{ color: '#b47e00', fontWeight: 600 }}>
                    {SITE_CONFIG.contact.phone}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <Mail size={22} style={{ color: '#b47e00', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#0c2340', display: 'block' }}>Conciergerie bilingue</strong>
                  <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: '#b47e00' }}>
                    montreal@{SITE_CONFIG.domain}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Boutique Experiences Card */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#0c2340', marginBottom: '16px', fontWeight: 600 }}>
              Services et Expériences en Boutique
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '24px' }}>
              Profitez d&apos;un accueil chaleureux dans un bâtiment historique datant de 1845, avec dégustations privées de thés Dammann Frères et emballages cadeaux artisanaux.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Gift size={18} style={{ color: '#b47e00', marginTop: '3px' }} />
                <div>
                  <strong style={{ color: '#0c2340', fontSize: '0.92rem' }}>Emballage ruban couture :</strong>
                  <span style={{ color: '#64748b', fontSize: '0.88rem' }}> Chaque cadeau est enveloppé dans du papier de soie avec cachet de cire doré sur demande.</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Award size={18} style={{ color: '#b47e00', marginTop: '3px' }} />
                <div>
                  <strong style={{ color: '#0c2340', fontSize: '0.92rem' }}>Dégustation Dammann Frères :</strong>
                  <span style={{ color: '#64748b', fontSize: '0.88rem' }}> Découvrez les mélanges de thés d&apos;exception dans notre salon de thé privé.</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Calendar size={18} style={{ color: '#b47e00', marginTop: '3px' }} />
                <div>
                  <strong style={{ color: '#0c2340', fontSize: '0.92rem' }}>Cueillette express à Montréal :</strong>
                  <span style={{ color: '#64748b', fontSize: '0.88rem' }}> Commandez en ligne en CAD et récupérez votre commande en 2 heures sans frais.</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '28px' }}>
              <Link href="/contact" className="btn-primary" style={{ display: 'inline-block', padding: '12px 24px' }}>
                Prendre rendez-vous avec un conseiller
              </Link>
            </div>
          </div>
        </div>

        <DiamondSeparator />

        {/* Discovery Links */}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#0c2340', marginBottom: '8px' }}>
            Explorez Nos Autres Adresses
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
            Des boutiques pensées pour célébrer l&apos;artisanat d&apos;exception d&apos;un océan à l&apos;autre.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/boutiques/canada" className="btn-secondary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}>
              Boutiques Canada 🇨🇦
            </Link>
            <Link href="/boutiques/usa" className="btn-secondary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}>
              Boutiques USA 🇺🇸
            </Link>
          </div>
        </div>
      </main>

      <ReassuranceFooter />
      <Footer />
    </div>
  );
}
