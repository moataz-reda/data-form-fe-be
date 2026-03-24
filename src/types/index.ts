export interface Submission {
  id: string
  first_name: string
  last_name: string
  email: string
  mobile: string
  gender: 'male' | 'female'
  age_range: '18-24' | '25-34' | '35-44' | '45-54' | '55+'
  country: string
  created_at: string
}

export interface DashboardStats {
  rows: Submission[]
  genderMap: Record<string, number>
  ageMap: Record<string, number>
  dayMap: Record<string, number>
}
