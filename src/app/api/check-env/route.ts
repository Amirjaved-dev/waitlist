import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing',
      ADMIN_USERNAME: process.env.ADMIN_USERNAME ? 'Set' : 'Missing',
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? 'Set' : 'Missing',
    },
    timestamp: new Date().toISOString()
  });
} 