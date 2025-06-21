# 🧠 SellMyMind - Neural Waitlist Landing Page

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-pink?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

A futuristic, cyberpunk-themed landing page for **SellMyMind** - the platform that lets users create and sell AI agents based on their expertise. Features a complete Supabase backend integration and a professional **Neural Command Center** admin panel.

## 🌟 Live Demo
- **Landing Page**: [View Demo](https://your-demo-url.vercel.app)
- **Admin Panel**: [Admin Demo](https://your-demo-url.vercel.app/admin) (Login: `admin` / `neural_admin_2025`)

## ✨ Features

### 🎨 Frontend
- **Cyberpunk UI**: Neon colors, glitch effects, matrix rain
- **Smooth Animations**: Framer Motion powered interactions
- **Responsive Design**: Mobile-first approach
- **Neural Theming**: Brain-inspired design elements

### 🔧 Backend Integration
- **Supabase Database**: Real-time waitlist storage
- **Admin Panel**: Full dashboard with analytics
- **Data Export**: CSV export functionality
- **Authentication**: Simple admin login system

### 📊 Admin Dashboard
- Real-time signup statistics
- Growth rate tracking
- Recent activity feed
- Data visualization charts
- Export capabilities

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <repository-url>
cd waitlist-landing
npm install
```

### 2. Supabase Setup
1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Run this SQL in your Supabase SQL editor:

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

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations
CREATE POLICY "Allow all operations on waitlist" 
ON waitlist FOR ALL 
TO authenticated, anon 
USING (true) 
WITH CHECK (true);
```

### 3. Environment Variables
Create `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=neural_admin_2025
JWT_SECRET=your_super_secret_jwt_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run the Application
```bash
npm run dev
```

Visit:
- **Landing Page**: `http://localhost:3000`
- **Admin Panel**: `http://localhost:3000/admin`
  - Username: `admin`
  - Password: `neural_admin_2025`

## 🛠 Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Supabase
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **TypeScript**: Full type safety

## 📁 Project Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx          # Admin login
│   │   └── dashboard/
│   │       ├── page.tsx      # Dashboard entry
│   │       └── dashboard.tsx # Dashboard component
│   ├── api/
│   │   ├── waitlist/
│   │   │   └── route.ts      # Waitlist API
│   │   └── admin/
│   │       ├── auth/
│   │       │   └── route.ts  # Admin auth
│   │       └── stats/
│   │           └── route.ts  # Dashboard stats
│   ├── globals.css           # Cyberpunk styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
└── lib/
    └── supabase.ts          # Supabase client
```

## 🎨 Customization

### Styling
Edit `src/app/globals.css` to customize:
- Neon colors
- Glitch effects
- Matrix rain animation
- Neural pulse animations

### Components
- **WaitlistForm**: Main signup form
- **AnimatedBackground**: Matrix rain effect
- **AdminDashboard**: Full analytics dashboard

### API Endpoints
- `POST /api/waitlist` - Add new signup
- `GET /api/waitlist` - Get all signups (admin)
- `POST /api/admin/auth` - Admin login
- `DELETE /api/admin/auth` - Admin logout
- `GET /api/admin/stats` - Dashboard statistics

## 🔐 Security Features

- Input validation and sanitization
- SQL injection protection via Supabase
- Simple session-based admin auth
- CORS protection
- Rate limiting ready

## 📊 Analytics & Monitoring

The admin dashboard provides:
- Total signups counter
- Daily/weekly growth tracking
- Conversion rate monitoring
- Recent activity feed
- Real-time data visualization

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard.

### Other Platforms
- Netlify
- Railway
- AWS Amplify

## 🎯 Production Checklist

Before going live:
- [ ] Change default admin credentials
- [ ] Set up proper authentication
- [ ] Configure email notifications
- [ ] Add monitoring/analytics
- [ ] Set up error tracking
- [ ] Configure CORS properly
- [ ] Add rate limiting
- [ ] Set up SSL/HTTPS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Links

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://framer.com/motion)

---

**Built with ❤️ in Pakistan 🇵🇰**

Ready to turn minds into money! 🧠💰
