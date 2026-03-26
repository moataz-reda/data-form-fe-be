'use server'

import { createClient } from '@/lib/supabase/server'
import type { DashboardStats, Submission } from '@/types'

async function requireAuth() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) throw new Error('Unauthorized')
  return supabase
}

export async function getSubmissions(): Promise<Submission[]> {
  const supabase = await requireAuth()
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error('Failed to fetch submissions')
  return data as Submission[]
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const rows = await getSubmissions()

  const genderMap = rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.gender] = (acc[r.gender] ?? 0) + 1
    return acc
  }, {})

  const ageMap = rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.age_range] = (acc[r.age_range] ?? 0) + 1
    return acc
  }, {})

  const dayMap = rows.reduce<Record<string, number>>((acc, r) => {
    const day = r.created_at.slice(0, 10)
    acc[day] = (acc[day] ?? 0) + 1
    return acc
  }, {})

  return { rows, genderMap, ageMap, dayMap }
}
