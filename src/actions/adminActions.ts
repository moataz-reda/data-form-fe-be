'use server'

import { createClient } from '@/lib/supabase/server'
import type { DashboardStats, Submission } from '@/types'

export async function getSubmissions(): Promise<Submission[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
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

  // Submissions per day for the last 30 days
  const dayMap = rows.reduce<Record<string, number>>((acc, r) => {
    const day = r.created_at.slice(0, 10)
    acc[day] = (acc[day] ?? 0) + 1
    return acc
  }, {})

  return { rows, genderMap, ageMap, dayMap }
}
