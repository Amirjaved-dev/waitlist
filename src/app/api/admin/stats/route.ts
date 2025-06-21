import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { waitlistService } from '@/lib/supabase';

// Simple auth check function
async function checkAdminAuth() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin-session');
  
  if (!sessionCookie) {
    return false;
  }

  try {
    const session = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString());
    return session.role === 'admin' && Date.now() - session.timestamp < 7 * 24 * 60 * 60 * 1000; // 7 days
  } catch {
    return false;
  }
}

export async function GET() {
  try {
    // Check authentication
    const isAuthenticated = await checkAdminAuth();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Neural access denied' },
        { status: 401 }
      );
    }

    // Get stats from Supabase
    const stats = await waitlistService.getStats();
    console.log('Stats fetched:', stats);
    
    // Get recent entries for activity feed
    const { data: recentEntries } = await waitlistService.getEntries(5, 0);
    console.log('Recent entries count:', recentEntries.length);

    // Calculate growth rate (mock data for now)
    const growthRate = stats.today > 0 ? Math.round((stats.today / Math.max(stats.thisWeek - stats.today, 1)) * 100) : 0;

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          total: stats.total,
          today: stats.today,
          thisWeek: stats.thisWeek,
          growthRate,
          conversionRate: Math.round(Math.random() * 15 + 5), // Mock conversion rate
          avgDaily: Math.round(stats.thisWeek / 7)
        },
        recentEntries: recentEntries.map(entry => ({
          id: entry.id,
          name: entry.name || 'Anonymous Neural Entity',
          email: entry.email,
          created_at: entry.created_at,
          status: entry.status,
          source: entry.source
        })),
        chartData: {
          // Mock chart data - in production, calculate from actual data
          daily: Array.from({ length: 7 }, (_, i) => ({
            date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            signups: Math.floor(Math.random() * 20) + 5
          })),
          hourly: Array.from({ length: 24 }, (_, i) => ({
            hour: i,
            signups: Math.floor(Math.random() * 5)
          }))
        }
      }
    });

  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json(
      { error: 'Neural network stats unavailable' },
      { status: 500 }
    );
  }
} 