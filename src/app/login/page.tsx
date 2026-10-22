'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DiamondSeparator from '@/components/DiamondSeparator';
import {
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Package,
  Heart,
  RotateCcw,
  Eye,
  EyeOff,
  Loader2,
} from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/my-account';

  const { user, signIn, signUp, isLoading: authLoading } = useAuth();

  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // If already logged in, redirect to destination
  useEffect(() => {
    if (user && !authLoading) {
      router.push(redirectUrl);
    }
  }, [user, authLoading, router, redirectUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setSubmitting(true);

    if (activeTab === 'signin') {
      const res = await signIn(email, password);
      if (res.success) {
        setSuccessMsg('Signed in successfully! Redirecting...');
        setTimeout(() => router.push(redirectUrl), 600);
      } else {
        setErrorMsg(res.error || 'Invalid email or password.');
      }
    } else {
      if (!fullName.trim()) {
        setErrorMsg('Please enter your full name.');
        setSubmitting(false);
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters.');
        setSubmitting(false);
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match. Please verify your password confirmation.');
        setSubmitting(false);
        return;
      }
      const res = await signUp(email, password, fullName);
      if (res.success) {
        setSuccessMsg('Account created successfully! Welcome to Memoriq.');
        setTimeout(() => router.push(redirectUrl), 800);
      } else {
        setErrorMsg(res.error || 'Failed to create account.');
      }
    }
    setSubmitting(false);
  };

  return (
    <div style={{ backgroundColor: '#faf8f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1, padding: '40px 16px 80px' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#b47e00',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              Customer Portal
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: '2rem',
                color: '#0c2340',
                margin: 0,
                fontWeight: 600,
              }}
            >
              {activeTab === 'signin' ? 'Sign In to Your Account' : 'Create Customer Account'}
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '8px' }}>
              Access recent orders, tracking status, saved wishlists, and hassle-free returns in CAD.
            </p>
            <div style={{ marginTop: '20px' }}>
              <DiamondSeparator />
            </div>
          </div>

          {/* Card Container */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 20px rgba(12, 35, 64, 0.06)',
              overflow: 'hidden',
            }}
          >
            {/* Tab switch */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('signin');
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
                style={{
                  flex: 1,
                  padding: '16px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  border: 'none',
                  borderBottom: activeTab === 'signin' ? '2px solid #0c2340' : '2px solid transparent',
                  backgroundColor: activeTab === 'signin' ? '#ffffff' : '#f8fafc',
                  color: activeTab === 'signin' ? '#0c2340' : '#64748b',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('register');
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
                style={{
                  flex: 1,
                  padding: '16px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  border: 'none',
                  borderBottom: activeTab === 'register' ? '2px solid #0c2340' : '2px solid transparent',
                  backgroundColor: activeTab === 'register' ? '#ffffff' : '#f8fafc',
                  color: activeTab === 'register' ? '#0c2340' : '#64748b',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Register
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ padding: '32px 28px' }}>
              {errorMsg && (
                <div
                  style={{
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '6px',
                    padding: '12px 14px',
                    color: '#991b1b',
                    fontSize: '0.85rem',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <AlertCircle size={18} style={{ flexShrink: 0 }} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div
                  style={{
                    backgroundColor: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: '6px',
                    padding: '12px 14px',
                    color: '#166534',
                    fontSize: '0.85rem',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
                  <span>{successMsg}</span>
                </div>
              )}

              {activeTab === 'register' && (
                <div style={{ marginBottom: '18px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#334155',
                      marginBottom: '6px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Full Name
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User
                      size={18}
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#94a3b8',
                      }}
                    />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Geneviève Tremblay"
                      style={{
                        width: '100%',
                        padding: '12px 12px 12px 40px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '4px',
                        fontSize: '0.9rem',
                        outline: 'none',
                        color: '#0f172a',
                      }}
                    />
                  </div>
                </div>
              )}

              <div style={{ marginBottom: '18px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail
                    size={18}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#94a3b8',
                    }}
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.ca"
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 40px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                      outline: 'none',
                      color: '#0f172a',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: activeTab === 'register' ? '18px' : '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#334155',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Password
                  </label>
                  {activeTab === 'signin' && (
                    <Link href="/forgot-password" style={{ fontSize: '0.78rem', color: '#b47e00', textDecoration: 'none', fontWeight: 600 }}>
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock
                    size={18}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#94a3b8',
                    }}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      width: '100%',
                      padding: '12px 42px 12px 40px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                      outline: 'none',
                      color: '#0f172a',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px',
                    }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {activeTab === 'register' && (
                <div style={{ marginBottom: '24px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#334155',
                      marginBottom: '6px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Confirm Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock
                      size={18}
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#94a3b8',
                      }}
                    />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{
                        width: '100%',
                        padding: '12px 42px 12px 40px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '4px',
                        fontSize: '0.9rem',
                        outline: 'none',
                        color: '#0f172a',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '4px',
                      }}
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: '100%',
                  backgroundColor: '#0c2340',
                  color: '#ffffff',
                  padding: '13px',
                  borderRadius: '4px',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  border: 'none',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'background-color 0.2s',
                  boxShadow: '0 2px 8px rgba(12, 35, 64, 0.2)',
                }}
              >
                <span>{submitting ? 'Authenticating...' : activeTab === 'signin' ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight size={16} />
              </button>

              {/* Admin Link shortcut */}
              <div style={{ marginTop: '20px', textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Store staff or administrator? </span>
                <Link href="/admin/login" style={{ fontSize: '0.8rem', color: '#b47e00', fontWeight: 600 }}>
                  Admin Login &rarr;
                </Link>
              </div>
            </form>
          </div>

          {/* Account Benefits */}
          <div
            style={{
              marginTop: '32px',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              textAlign: 'center',
            }}
          >
            <div style={{ padding: '12px', backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <Package size={20} style={{ color: '#0c2340', margin: '0 auto 6px' }} />
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0c2340' }}>Order Tracking</div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Real-time Canada Post status</div>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <Heart size={20} style={{ color: '#b47e00', margin: '0 auto 6px' }} />
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0c2340' }}>Saved Wishlist</div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Curate your keepsakes</div>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <RotateCcw size={20} style={{ color: '#0c2340', margin: '0 auto 6px' }} />
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0c2340' }}>Easy Returns</div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Direct refund requests</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Loader2 size={36} className="animate-spin" style={{ color: '#0c2340' }} />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
