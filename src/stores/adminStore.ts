import { create } from 'zustand'
import type { DashboardStats, Submission } from '@/types'

interface AdminState {
  submissions: Submission[]
  genderMap: Record<string, number>
  ageMap: Record<string, number>
  dayMap: Record<string, number>
  isLoading: boolean
  error: string | null
  setStats: (stats: DashboardStats) => void
  setLoading: (v: boolean) => void
  setError: (e: string | null) => void
}

export const useAdminStore = create<AdminState>((set) => ({
  submissions: [],
  genderMap: {},
  ageMap: {},
  dayMap: {},
  isLoading: false,
  error: null,

  setStats: (stats) =>
    set({
      submissions: stats.rows,
      genderMap: stats.genderMap,
      ageMap: stats.ageMap,
      dayMap: stats.dayMap,
    }),
  setLoading: (v) => set({ isLoading: v }),
  setError: (e) => set({ error: e }),
}))
