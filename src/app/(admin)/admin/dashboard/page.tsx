import { getDashboardStats } from '@/actions/adminActions'
import { DashboardClient } from '@/components/admin/DashboardClient'
import { LogoutButton } from '@/components/admin/LogoutButton'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export const metadata = {
  title: 'Admin Dashboard',
}

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Top bar */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <span className="text-base font-semibold text-gray-900 dark:text-white">
              Admin Dashboard
            </span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stat summary row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Submissions" value={stats.rows.length} color="indigo" />
          <StatCard label="Unique Countries" value={new Set(stats.rows.map((r) => r.country)).size} color="purple" />
          <StatCard label="Today" value={stats.dayMap[new Date().toISOString().slice(0, 10)] ?? 0} color="emerald" />
          <StatCard label="This Week" value={getThisWeekCount(stats.dayMap)} color="amber" />
        </div>

        <DashboardClient stats={stats} />
      </div>
    </div>
  )
}

function getThisWeekCount(dayMap: Record<string, number>): number {
  let count = 0
  for (let i = 0; i < 7; i++) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    count += dayMap[d.toISOString().slice(0, 10)] ?? 0
  }
  return count
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: 'indigo' | 'purple' | 'emerald' | 'amber'
}) {
  const colors = {
    indigo: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
    purple: 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
    emerald: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
    amber: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
        {label}
      </p>
      <p className={`text-3xl font-bold rounded-lg inline-block px-1 ${colors[color]}`}>
        {value}
      </p>
    </div>
  )
}
