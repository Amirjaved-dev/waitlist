import { createClient } from '@supabase/supabase-js';

// Environment variables - you'll need to add these to your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface WaitlistEntry {
  id: string;
  name?: string;
  email: string;
  created_at: string;
  ip_address?: string;
  user_agent?: string;
  source?: string;
  status: 'active' | 'contacted' | 'converted';
  notes?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  created_at: string;
  last_login?: string;
}

// Supabase database functions
export const waitlistService = {
  // Add new waitlist entry
  async addEntry(data: { name?: string; email: string; ip_address?: string; user_agent?: string; source?: string }) {
    const { data: entry, error } = await supabase
      .from('waitlist')
      .insert([
        {
          ...data,
          status: 'active',
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return entry;
  },

  // Get all waitlist entries
  async getEntries(limit = 1000, offset = 0) {
    const { data, error, count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return { data: data || [], count: count || 0 };
  },

  // Update entry status
  async updateEntry(id: string, updates: Partial<WaitlistEntry>) {
    const { data, error } = await supabase
      .from('waitlist')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete entry
  async deleteEntry(id: string) {
    const { error } = await supabase
      .from('waitlist')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Get stats
  async getStats() {
    // Get total count
    const { count: totalCount, error: totalError } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (totalError) {
      console.error('Error fetching total count:', totalError);
    }

    // Get today's count
    const today = new Date().toISOString().split('T')[0];
    const { count: todayCount, error: todayError } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today);

    if (todayError) {
      console.error('Error fetching today count:', todayError);
    }

    // Get this week's count
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { count: weekCount, error: weekError } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', weekAgo);

    if (weekError) {
      console.error('Error fetching week count:', weekError);
    }

    return {
      total: totalCount || 0,
      today: todayCount || 0,
      thisWeek: weekCount || 0
    };
  }
}; 