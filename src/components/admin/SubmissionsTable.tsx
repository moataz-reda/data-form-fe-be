'use client'

import { useAdminStore } from '@/stores/adminStore'

const GENDER_LABELS: Record<string, string> = {
  male: 'Male',
  female: 'Female',
  'non-binary': 'Non-binary',
  'prefer-not-to-say': 'Prefer not to say',
}

const AGE_LABELS: Record<string, string> = {
  '18-24': '18 – 24',
  '25-34': '25 – 34',
  '35-44': '35 – 44',
  '45-54': '45 – 54',
  '55+': '55+',
}

export function SubmissionsTable() {
  const submissions = useAdminStore((s) => s.submissions)

  if (submissions.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-gray-400">
        No submissions yet
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            {['Name', 'Email', 'Mobile', 'Gender', 'Age Range', 'Country', 'Date'].map(
              (col) => (
                <th
                  key={col}
                  className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {col}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {submissions.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-50/70 transition-colors duration-100"
            >
              <td className="py-3.5 px-4 font-medium text-gray-900 whitespace-nowrap">
                {row.first_name} {row.last_name}
              </td>
              <td className="py-3.5 px-4 text-gray-600">{row.email}</td>
              <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                {row.mobile}
              </td>
              <td className="py-3.5 px-4">
                <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                  {GENDER_LABELS[row.gender] ?? row.gender}
                </span>
              </td>
              <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                {AGE_LABELS[row.age_range] ?? row.age_range}
              </td>
              <td className="py-3.5 px-4 text-gray-600">{row.country}</td>
              <td className="py-3.5 px-4 text-gray-400 whitespace-nowrap text-xs">
                {new Date(row.created_at).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
