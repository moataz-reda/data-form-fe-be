import Link from 'next/link'
import { SubmissionForm } from '@/components/public/SubmissionForm'

export const metadata = {
  title: 'User Registration',
  description: 'Fill in your details to register',
}

export default function HomePage() {
  return (
    <div className="w-full max-w-xl">
      {/* Admin link */}
      <div className="flex justify-end mb-4">
        <Link
          href="/admin/login"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-md transition-all duration-200"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          Admin Portal
          <svg
            className="h-3.5 w-3.5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100/50 p-8 border border-indigo-50">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg">
            <svg
              className="h-7 w-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Register</h1>
          <p className="mt-1 text-sm text-gray-500">
            Please fill in the form below to complete your registration.
          </p>
        </div>

        <SubmissionForm />
      </div>
    </div>
  )
}
