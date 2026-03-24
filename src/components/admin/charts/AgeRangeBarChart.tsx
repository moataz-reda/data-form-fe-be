'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const AGE_ORDER = ['18-24', '25-34', '35-44', '45-54', '55+']
const COLORS = ['#818cf8', '#6366f1', '#4f46e5', '#4338ca', '#3730a3']

interface Props {
  data: Record<string, number>
}

export function AgeRangeBarChart({ data }: Props) {
  const chartData = AGE_ORDER.map((range) => ({
    range,
    count: data[range] ?? 0,
  }))

  const isEmpty = chartData.every((d) => d.count === 0)

  if (isEmpty) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-400">
        No data yet
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={chartData} barSize={36}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="range"
          tick={{ fontSize: 12, fill: '#6b7280' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 12, fill: '#6b7280' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          cursor={{ fill: '#f9fafb' }}
          contentStyle={{
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            fontSize: '13px',
          }}
        />
        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
