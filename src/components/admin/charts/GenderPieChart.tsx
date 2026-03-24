'use client'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const COLORS = ['#6366f1', '#ec4899', '#8b5cf6', '#94a3b8']

const GENDER_LABELS: Record<string, string> = {
  male: 'Male',
  female: 'Female',
  'non-binary': 'Non-binary',
  'prefer-not-to-say': 'Prefer not to say',
}

interface Props {
  data: Record<string, number>
}

export function GenderPieChart({ data }: Props) {
  const chartData = Object.entries(data).map(([key, value]) => ({
    name: GENDER_LABELS[key] ?? key,
    value,
  }))

  if (chartData.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-400">
        No data yet
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
        >
          {chartData.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            fontSize: '13px',
          }}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(value) => (
            <span className="text-xs text-gray-600">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
