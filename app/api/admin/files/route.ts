import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { kvGet, kvSet, isKvEnabled } from '@/lib/kv';

export const dynamic = 'force-dynamic';

const ALLOWED_FILES = [
  'tmg_products.json',
  'second_hand_generators.ts',
  'projects.ts',
  'districts_content.json',
  'tmg_pdf_links.json',
  'references.ts',
  'testimonials.ts',
  'partners.json'
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('file');

    if (!fileName || !ALLOWED_FILES.includes(fileName)) {
      return NextResponse.json({ error: 'Geçersiz veya yetkilendirilmemiş dosya adı' }, { status: 400 });
    }

    // Try to load from KV first
    if (isKvEnabled()) {
      const cachedContent = await kvGet(`file:${fileName}`);
      if (cachedContent !== null && cachedContent !== undefined) {
        const contentStr = typeof cachedContent === 'string' 
          ? cachedContent 
          : JSON.stringify(cachedContent, null, 2);
        return NextResponse.json({ fileName, content: contentStr });
      }
    }

    const filePath = path.join(process.cwd(), 'data', fileName);
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 404 });
    }

    const content = fs.readFileSync(filePath, 'utf8');

    // Seed KV if empty
    if (isKvEnabled()) {
      await kvSet(`file:${fileName}`, content);
    }

    return NextResponse.json({ fileName, content });
  } catch (error: any) {
    return NextResponse.json({ error: 'Dosya okunamadı: ' + error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fileName, content } = body;

    if (!fileName || !ALLOWED_FILES.includes(fileName)) {
      return NextResponse.json({ error: 'Geçersiz veya yetkilendirilmemiş dosya adı' }, { status: 400 });
    }

    if (content === undefined || content === null) {
      return NextResponse.json({ error: 'Dosya içeriği boş olamaz' }, { status: 400 });
    }

    // Safety validation for JSON files
    if (fileName.endsWith('.json')) {
      try {
        JSON.parse(content);
      } catch (jsonErr: any) {
        return NextResponse.json({ error: 'Geçersiz JSON formatı: ' + jsonErr.message }, { status: 400 });
      }
    }

    // Save to KV first
    if (isKvEnabled()) {
      await kvSet(`file:${fileName}`, content);
    }

    // Attempt to save to local file
    try {
      const filePath = path.join(process.cwd(), 'data', fileName);
      fs.writeFileSync(filePath, content, 'utf8');
    } catch (writeErr: any) {
      console.warn(`Could not save file ${fileName} locally (read-only):`, writeErr.message);
    }

    return NextResponse.json({ success: true, message: `${fileName} başarıyla kaydedildi.` });
  } catch (error: any) {
    return NextResponse.json({ error: 'Dosya kaydedilemedi: ' + error.message }, { status: 500 });
  }
}
