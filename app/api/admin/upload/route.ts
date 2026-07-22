import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    })
  : null;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Dosya yüklenmedi.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Clean up filename and append timestamp
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const uniqueName = `${Date.now()}_${safeName}`;

    // Try uploading to Supabase Storage first
    if (supabase) {
      try {
        // Ensure bucket exists (fails silently if already exists or blocked)
        await supabase.storage.createBucket('images', {
          public: true
        }).catch(() => {});

        // Upload file to Supabase bucket
        const { data, error } = await supabase.storage
          .from('images')
          .upload(`akanenerji/${uniqueName}`, buffer, {
            contentType: file.type,
            upsert: true
          });

        if (error) {
          throw new Error(error.message);
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(`akanenerji/${uniqueName}`);

        return NextResponse.json({ success: true, url: publicUrl });
      } catch (supabaseErr: any) {
        console.error("Supabase storage upload failed, attempting local fallback:", supabaseErr.message);
      }
    }

    // Local filesystem fallback (works for local development)
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'images', 'akanenerji');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const filePath = path.join(uploadDir, uniqueName);
      fs.writeFileSync(filePath, buffer);

      const relativeUrl = `/images/akanenerji/${uniqueName}`;
      return NextResponse.json({ success: true, url: relativeUrl });
    } catch (fsErr: any) {
      return NextResponse.json({ 
        error: 'Dosya sistemi yazma hatası (Vercel) ve Supabase bulut depolama bağlantısı kurulamadı: ' + fsErr.message 
      }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: 'Yükleme başarısız: ' + error.message }, { status: 500 });
  }
}
