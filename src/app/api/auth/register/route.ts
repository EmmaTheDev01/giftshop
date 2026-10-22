import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export async function POST(request: Request) {
  try {
    const { email, password, fullName } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = (fullName || cleanEmail.split('@')[0] || 'Customer').trim();

    // 1. Create user via Supabase Admin (auto-confirms email and bypasses client confirmation block)
    let userId: string | null = null;
    let createError: any = null;

    const { data: createData, error: adminErr } = await supabaseAdmin.auth.admin.createUser({
      email: cleanEmail,
      password: password,
      email_confirm: true,
      user_metadata: {
        full_name: cleanName,
      },
    });

    if (adminErr) {
      createError = adminErr;
      console.error('[register API] admin.createUser failed:', adminErr.message, adminErr);
      if (
        adminErr.message?.toLowerCase().includes('already') ||
        adminErr.message?.toLowerCase().includes('registered') ||
        adminErr.message?.toLowerCase().includes('exists')
      ) {
        return NextResponse.json(
          { error: 'An account with this email address already exists. Please sign in.' },
          { status: 400 }
        );
      }
    } else if (createData?.user) {
      userId = createData.user.id;
    }

    // Fallback: If admin.createUser failed, try standard signUp
    if (!userId) {
      const anonClient = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
      const { data: anonData, error: anonErr } = await anonClient.auth.signUp({
        email: cleanEmail,
        password: password,
        options: {
          data: {
            full_name: cleanName,
          },
        },
      });

      if (anonErr) {
        console.error('[register API] anon.signUp failed:', anonErr.message, anonErr);
        let msg = anonErr.message || createError?.message || 'Failed to create user account.';
        if (msg.toLowerCase().includes('already') || msg.toLowerCase().includes('registered') || msg.toLowerCase().includes('exists')) {
          msg = 'An account with this email address already exists. Please sign in.';
        } else if (msg.toLowerCase().includes('database error')) {
          msg = 'Database error creating new user: the Supabase trigger on auth.users failed. Please execute the updated handle_new_user() SQL script in your Supabase SQL Editor.';
        }
        return NextResponse.json({ error: msg, details: anonErr.message }, { status: 400 });
      }

      userId = anonData?.user?.id || null;
    }

    // 2. Automatically create customer profile in public.profiles
    if (userId) {
      try {
        await supabaseAdmin.from('profiles').upsert(
          {
            id: userId,
            email: cleanEmail,
            full_name: cleanName,
            role: 'customer',
            language: 'en-CA',
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        );
      } catch (profErr) {
        console.warn('Profile automatic creation notice:', profErr);
      }
    }

    return NextResponse.json({
      success: true,
      userId,
      message: 'Account created successfully and profile initialized.',
    });
  } catch (err: any) {
    console.error('Registration route error:', err);
    return NextResponse.json(
      { error: err.message || 'An unexpected error occurred during registration.' },
      { status: 500 }
    );
  }
}
