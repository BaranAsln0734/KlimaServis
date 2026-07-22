import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const dbUrl = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;
  
  const envKeys = Object.keys(process.env);
  const matchedKeys = envKeys.filter(k => k.includes('POSTGRES') || k.includes('DATABASE') || k.includes('SUPABASE'));
  
  return NextResponse.json({
    kvEnabled: !!dbUrl, // keep kvEnabled for frontend backward compatibility
    dbEnabled: !!dbUrl,
    urlCensored: dbUrl ? `${dbUrl.substring(0, 25)}...` : "not_found",
    availableKeys: matchedKeys
  });
}
