import React from 'react';
import Link from 'next/link';
import { Award, Compass, ShieldCheck, Sparkles } from 'lucide-react';

export default function CommitmentsBar() {
  const pillars = [
    {
      title: 'North American Master Guilds',
      desc: 'Handcrafted across Canada & USA by certified master ateliers',
      icon: Award,
    },
    {
      title: 'Official Heritage Keepsakes',
      desc: 'Authentic landmark tributes & certified limited editions',
      icon: ShieldCheck,
    },
    {
      title: 'Curated Artisan Houses',
      desc: 'In partnership with historic workshops across Canada & the United States',
      icon: Sparkles,
    },
  ];

  return (
    <section
      style={{
        backgroundColor: '#faf8f5',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        padding: '36px 0',
      }}
    >
      <div className="container-custom">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            alignItems: 'center',
            gap: '32px',
          }}
        >
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(180, 126, 0, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#b47e00',
                  }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: '#0c2340',
                      marginBottom: '3px',
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: '#64748b',
                      lineHeight: 1.4,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Learn More Button */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link href="/legal" className="btn-secondary" style={{ width: '100%', maxWidth: '200px' }}>
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
