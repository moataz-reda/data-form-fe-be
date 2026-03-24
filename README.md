# DataForm — User Registration & Admin Portal

A full-stack web application for collecting user registration data and visualizing it through a protected admin dashboard.

---

## Features

### Public Registration Form (`/`)
- Clean, responsive form with real-time validation
- Fields: First name, Last name, Email, Mobile number, Gender, Age range, Country
- Client-side validation (React Hook Form + Zod) and server-side re-validation
- Success confirmation with option to submit another response
- Form fields reset automatically after successful submission

### Admin Portal (`/admin`)
- Secure login with email and password (Supabase Auth)
- Protected dashboard — unauthenticated access redirects to login
- **Data table** — all submissions in reverse chronological order
- **3 charts:**
  - Gender breakdown (Donut pie chart)
  - Age range distribution (Bar chart)
  - Submissions over the last 30 days (Area line chart)
- **Stats cards** — total submissions, unique countries, today's count, this week's count
- One-click sign out

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 |
| State management | Zustand |
| Form handling | React Hook Form + Zod |
| Database | Supabase (PostgreSQL) |
| Authentication | Supabase Auth |
| Charts | Recharts |

---

## Project Structure

```
src/
├── app/
│   ├── (public)/page.tsx          # Registration form (/)
│   └── (admin)/
│       ├── admin/login/page.tsx   # Admin login (/admin/login)
│       └── admin/dashboard/       # Admin dashboard (/admin/dashboard)
├── components/
│   ├── public/                    # Form + success message
│   ├── admin/                     # Login form, table, charts, logout
│   └── ui/                        # Shared primitives (Button, Input, Select, Label)
├── actions/                       # Next.js Server Actions (no API routes)
├── stores/                        # Zustand stores
├── lib/
│   ├── supabase/                  # Browser + server Supabase clients
│   ├── validations/               # Zod schemas
│   └── utils/                     # cn() helper, form option constants
└── types/                         # Shared TypeScript types
middleware.ts                      # Admin route protection
supabase/schema.sql                # Database schema + RLS policies
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Open the **SQL Editor** and run the contents of [`supabase/schema.sql`](supabase/schema.sql)
3. Go to **Authentication → Users → Add user** and create your admin account

### 3. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the registration form.
The admin portal is at [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

---

## Security

- **Row Level Security (RLS)** enforced at the database level:
  - Anonymous users can only `INSERT` (public form)
  - Authenticated users can only `SELECT` (admin dashboard)
- **Middleware** validates the Supabase JWT on every `/admin/*` request
- **Server Actions** re-validate all form data with Zod before writing to the database — client-side validation alone is never trusted
- Supabase credentials are never exposed to the browser

---

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```
