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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updateData = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required.' }, { status: 400 });
    }

    // Clean up fields to avoid updating non-existent or generated columns
    const allowedFields = [
      'name',
      'slug',
      'sku',
      'price',
      'original_price',
      'stock',
      'category_id',
      'collection_id',
      'brand_id',
      'images',
      'badge',
      'material',
      'dimensions',
      'short_description',
      'description',
      'is_featured',
      'is_limited_edition',
      'currency',
      'made_in',
    ];

    const cleanPayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    for (const key of allowedFields) {
      if (key in updateData) {
        cleanPayload[key] = updateData[key];
      }
    }

    const { data, error } = await supabaseAdmin
      .from('products')
      .update(cleanPayload)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      console.error('[admin product PATCH error]:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, product: data });
  } catch (err: any) {
    console.error('[admin product PATCH unexpected error]:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to update product.' },
      { status: 500 }
    );
  }
}
