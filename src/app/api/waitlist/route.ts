import { NextRequest, NextResponse } from 'next/server';
import { waitlistService } from '@/lib/supabase';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

    // Validate input
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get client info
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || '';
    const forwardedFor = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip');
    const ip = forwardedFor?.split(',')[0] || realIp || 'unknown';

    // Add to waitlist
    const entry = await waitlistService.addEntry({
      name: name || null,
      email,
      ip_address: ip,
      user_agent: userAgent,
      source: 'website'
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully added to neural network',
      data: {
        id: entry.id,
        email: entry.email,
        created_at: entry.created_at
      }
    });

  } catch (error: any) {
    console.error('Waitlist signup error:', error);
    
    // Handle duplicate email
    if (error.message?.includes('duplicate') || error.code === '23505') {
      return NextResponse.json(
        { error: 'This consciousness is already in our neural network' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Neural network connection failed. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    const result = await waitlistService.getEntries(limit, offset);
    
    return NextResponse.json({
      success: true,
      data: result.data,
      count: result.count
    });

  } catch (error) {
    console.error('Get waitlist error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch neural network data' },
      { status: 500 }
    );
  }
} 