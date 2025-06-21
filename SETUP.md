# SellMyMind Supabase Setup Guide

## 🚀 Quick Setup

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and anon key from Settings > API

### 2. Environment Variables
Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=neural_admin_2025
JWT_SECRET=your_super_secret_jwt_key_for_admin_auth

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Schema
Run this SQL in your Supabase SQL editor:

```sql
-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'contacted', 'converted')),
  notes TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_waitlist_status ON waitlist(status);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (adjust as needed)
CREATE POLICY "Allow all operations on waitlist" 
ON waitlist FOR ALL 
TO authenticated, anon 
USING (true) 
WITH CHECK (true);
```

### 4. Test the Setup

1. Start your development server:
```bash
npm run dev
```

2. Visit `http://localhost:3000` and try signing up for the waitlist

3. Access the admin panel at `http://localhost:3000/admin`
   - Username: `admin`
   - Password: `neural_admin_2025`

### 5. Admin Features

The admin panel includes:
- 📊 **Dashboard Analytics**: Real-time stats and charts
- 👥 **Waitlist Management**: View, edit, and manage all signups
- 📤 **Data Export**: Export waitlist data as CSV
- 🔄 **Real-time Updates**: Live data refresh
- 🎨 **Cyberpunk UI**: Futuristic neural-themed interface

### 6. API Endpoints

- `POST /api/waitlist` - Add new waitlist entry
- `GET /api/waitlist` - Get all waitlist entries (admin only)
- `POST /api/admin/auth` - Admin login
- `DELETE /api/admin/auth` - Admin logout
- `GET /api/admin/stats` - Get dashboard statistics

### 7. Production Deployment

Before deploying to production:

1. **Change default admin credentials** in your environment variables
2. **Set up proper authentication** (consider using Supabase Auth)
3. **Configure CORS** and security headers
4. **Set up email notifications** for new signups
5. **Add monitoring** and error tracking

### 8. Customization

You can customize:
- **Styling**: Edit `src/app/globals.css` for cyberpunk effects
- **Forms**: Modify `CyberForm` component for different fields
- **Analytics**: Add more stats in the admin dashboard
- **Notifications**: Integrate with email services

### 9. Troubleshooting

**Common Issues:**

1. **"Failed to fetch"** - Check your Supabase URL and keys
2. **Database errors** - Ensure your schema is set up correctly
3. **Admin login fails** - Verify environment variables
4. **CORS errors** - Check your Supabase project settings

**Debug Steps:**
1. Check browser console for errors
2. Verify Supabase connection in Network tab
3. Test API endpoints directly
4. Check Supabase logs

---

## 🎉 You're Ready!

Your SellMyMind landing page is now connected to Supabase with a fully functional admin panel. The cyberpunk-themed interface will collect and manage your waitlist with style! 🚀✨ 