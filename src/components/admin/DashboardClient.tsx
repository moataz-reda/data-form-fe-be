'use client'

import { useEffect } from 'react'
import { useAdminStore } from '@/stores/adminStore'
import type { DashboardStats } from '@/types'
import { GenderPieChart } from './charts/GenderPieChart'
import { AgeRangeBarChart } from './charts/AgeRangeBarChart'
import { SubmissionsLineChart } from './charts/SubmissionsLineChart'
import { SubmissionsTable } from './SubmissionsTable'

interface Props {
  stats: DashboardStats
}

function ChartCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">{title}</h3>
      {children}
    </div>
  )
}

export function DashboardClient({ stats }: Props) {
  const setStats = useAdminStore((s) => s.setStats)

  useEffect(() => {
    setStats(stats)
  }, [stats, setStats])

  const { genderMap, ageMap, dayMap } = stats

  return (
    <div className="space-y-6">
      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Gender Breakdown">
          <GenderPieChart data={genderMap} />
        </ChartCard>
        <ChartCard title="Age Range Distribution">
          <AgeRangeBarChart data={ageMap} />
        </ChartCard>
        <ChartCard title="Submissions (Last 30 Days)">
          <SubmissionsLineChart data={dayMap} />
        </ChartCard>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            All Submissions
            <span className="ml-2 rounded-full bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:text-indigo-400">
              {stats.rows.length}
            </span>
          </h3>
        </div>
        <SubmissionsTable />
      </div>
    </div>
  )
}
