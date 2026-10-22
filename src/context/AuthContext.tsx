'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';
import type { Profile } from '@/types/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  isLoading: true,
  isAdmin: false,
  signIn: async () => ({ success: false }),
  signUp: async () => ({ success: false }),
  resetPassword: async () => ({ success: false }),
  updatePassword: async () => ({ success: false }),
  signOut: async () => {},
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user profile from Supabase profiles table, auto-creating if missing
  const fetchProfile = async (userId: string, userEmail?: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!error && data) {
        setProfile(data as Profile);
      } else {
        const cleanName = userEmail?.split('@')[0] || 'Customer';
        const fallbackProfile: Profile = {
          id: userId,
          email: userEmail || '',
          full_name: cleanName,
          role: (userEmail?.includes('admin') ? 'admin' : 'customer') as any,
          avatar_url: null,
          phone: null,
          default_shipping_address: null as any,
          language: 'en-CA',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        // Automatically create in database if missing
        try {
          await supabase.from('profiles').upsert(
            {
              id: userId,
              email: userEmail || '',
              full_name: cleanName,
              role: (userEmail?.includes('admin') ? 'admin' : 'customer') as any,
              language: 'en-CA',
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'id' }
          );
        } catch (upsertErr) {
          console.warn('Auto profile insertion fallback:', upsertErr);
        }

        setProfile(fallbackProfile);
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    // 1. Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email);
      }
      setIsLoading(false);
    });

    // 2. Real-time auth changes listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id, session.user.email);
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }

      if (data.user) {
        await fetchProfile(data.user.id, data.user.email);
      }
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    try {
      // 1. Call server-side registration route (bypasses unhandled auth trigger exceptions and auto-creates profile)
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        // Fallback to client signUp if endpoint had an issue
        if (res.status === 400 && data.error) {
          setIsLoading(false);
          return { success: false, error: data.error };
        }

        // Try direct supabase client signup as backup
        const { data: clientData, error: clientErr } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          },
        });

        if (clientErr) {
          setIsLoading(false);
          return { success: false, error: clientErr.message || data.error || 'Registration failed' };
        }

        if (clientData.user) {
          await fetchProfile(clientData.user.id, clientData.user.email);
        }
      }

      // 2. Automatically sign the user in with their new credentials
      const loginRes = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!loginRes.error && loginRes.data.user) {
        await fetchProfile(loginRes.data.user.id, loginRes.data.user.email);
      }

      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Registration failed' };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/reset-password`,
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('memoriq_cart');
        localStorage.removeItem('memoriq_wishlist');
        localStorage.removeItem('giftshop_cart');
        localStorage.removeItem('giftshop_wishlist');
        window.dispatchEvent(new Event('cart_reset'));
      } catch {}
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id, user.email);
    }
  };

  const isAdmin = Boolean(profile?.role === 'admin' || profile?.role === 'staff');

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isLoading,
        isAdmin,
        signIn,
        signUp,
        resetPassword,
        updatePassword,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
