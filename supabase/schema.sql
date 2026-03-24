-- Run this in your Supabase SQL Editor
-- Project: https://supabase.com/dashboard

-- ============================================================
-- Table: submissions
-- ============================================================
CREATE TABLE public.submissions (
  id          UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name  TEXT          NOT NULL,
  last_name   TEXT          NOT NULL,
  email       TEXT          NOT NULL,
  mobile      TEXT          NOT NULL,
  gender      TEXT          NOT NULL CHECK (gender IN ('male', 'female', 'non-binary', 'prefer-not-to-say')),
  age_range   TEXT          NOT NULL CHECK (age_range IN ('18-24', '25-34', '35-44', '45-54', '55+')),
  country     TEXT          NOT NULL,
  created_at  TIMESTAMPTZ   DEFAULT now() NOT NULL
);

-- Index for the time-series line chart
CREATE INDEX idx_submissions_created_at ON public.submissions (created_at DESC);

-- ============================================================
-- Row Level Security
-- ============================================================
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Anonymous users (public form) can only INSERT
CREATE POLICY "public_insert" ON public.submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users (admins) can SELECT
CREATE POLICY "admin_select" ON public.submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================
-- After running this SQL:
-- 1. Go to Authentication > Users > Add user
-- 2. Enter the email and password for your admin account
-- 3. Copy the project URL, anon key, and service role key into .env.local
-- ============================================================
