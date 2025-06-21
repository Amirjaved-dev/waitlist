import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Simple admin authentication (in production, use proper hashing)
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'neural_admin_2025';

    if (username !== adminUsername || password !== adminPassword) {
      return NextResponse.json(
        { error: 'Invalid neural access credentials' },
        { status: 401 }
      );
    }

    // Create simple session token
    const sessionToken = Buffer.from(
      JSON.stringify({
        username,
        timestamp: Date.now(),
        role: 'admin'
      })
    ).toString('base64');

    // Set httpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set('admin-session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    return NextResponse.json({
      success: true,
      message: 'Neural admin access granted',
      user: { username, role: 'admin' }
    });

  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json(
      { error: 'Neural authentication system malfunction' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('admin-session');

    return NextResponse.json({
      success: true,
      message: 'Neural session terminated'
    });

  } catch (error) {
    console.error('Admin logout error:', error);
    return NextResponse.json(
      { error: 'Failed to terminate neural session' },
      { status: 500 }
    );
  }
} 