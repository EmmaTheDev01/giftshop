'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/Logo';
import DiamondSeparator from '@/components/DiamondSeparator';
import { Lock, Mail, ShieldAlert, ArrowRight, ShieldCheck, KeyRound, Loader2 } from 'lucide-react';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/admin';

  const { user, profile, isAdmin, signIn, isLoading: authLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (user && !authLoading) {
      if (isAdmin) {
        router.push(redirectUrl);
      } else {
        setErrorMsg('Access Denied: Your account does not possess store administration privileges.');
      }
    }
  }, [user, isAdmin, authLoading, router, redirectUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    const res = await signIn(email, password);
    if (!res.success) {
      setErrorMsg(res.error || 'Invalid administrator credentials.');
      setSubmitting(false);
      return;
    }

    // Auth succeeded, redirection handled in useEffect once profile is populated
    setSubmitting(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#071626',
        backgroundImage: 'radial-gradient(circle at 50% 20%, #0f2c4d 0%, #071626 75%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        color: '#f8fafc',
      }}
    >
      <div style={{ maxWidth: '440px', width: '100%' }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'inline-block', marginBottom: '16px' }}>
            <Logo />
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(221, 168, 46, 0.15)',
              border: '1px solid rgba(221, 168, 46, 0.35)',
              padding: '4px 12px',
              borderRadius: '20px',
              color: '#dda82e',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            <KeyRound size={12} />
            <span>Store Operations Portal</span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: '1.75rem',
              fontWeight: 600,
              color: '#ffffff',
              margin: '0 0 6px',
            }}
          >
            Administrator Login
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
            Sign in to manage Canadian inventory, orders, revenue, and audit telemetry.
          </p>
        </div>

        {/* Login Box */}
        <div
          style={{
            backgroundColor: '#0c2340',
            border: '1px solid rgba(221, 168, 46, 0.25)',
            borderRadius: '8px',
            padding: '32px 28px',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.45)',
          }}
        >
          {errorMsg && (
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid #ef4444',
                color: '#fca5a5',
                borderRadius: '6px',
                padding: '12px 14px',
                fontSize: '0.85rem',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <ShieldAlert size={18} style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '18px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#cbd5e1',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '6px',
                }}
              >
                Admin Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#64748b',
                  }}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@memoriq.ca"
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 40px',
                    backgroundColor: '#071626',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '4px',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#cbd5e1',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '6px',
                }}
              >
                Administrator Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#64748b',
                  }}
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 40px',
                    backgroundColor: '#071626',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '4px',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                backgroundColor: '#dda82e',
                color: '#071626',
                border: 'none',
                padding: '12px',
                borderRadius: '4px',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: submitting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'opacity 0.2s',
              }}
            >
              <span>{submitting ? 'Verifying Credentials...' : 'Authenticate as Administrator'}</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              onClick={() => {
                setEmail('admin@memoriq.ca');
                setPassword('Admin123456!');
              }}
              style={{
                width: '100%',
                marginTop: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: '#dda82e',
                border: '1px dashed rgba(221, 168, 46, 0.4)',
                padding: '9px 14px',
                borderRadius: '4px',
                fontWeight: 600,
                fontSize: '0.78rem',
                cursor: 'pointer',
              }}
            >
              Autofill Admin Credentials (admin@memoriq.ca)
            </button>
          </form>

          <div
            style={{
              marginTop: '22px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'center',
            }}
          >
            <Link href="/" style={{ color: '#94a3b8', fontSize: '0.8rem', textDecoration: 'none' }}>
              &larr; Return to Public Boutique
            </Link>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.75rem', color: '#64748b' }}>
          Protected by Supabase Row Level Security & TLS 1.3 encryption.
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '100vh', backgroundColor: '#071626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Loader2 size={36} className="animate-spin" style={{ color: '#dda82e' }} />
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
