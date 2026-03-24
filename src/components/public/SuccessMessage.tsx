'use client'

import { Button } from '@/components/ui/Button'
import { useSubmissionStore } from '@/stores/submissionStore'

export function SuccessMessage() {
  const reset = useSubmissionStore((s) => s.reset)

  return (
    <div className="text-center py-10">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
        <svg
          className="h-10 w-10 text-green-600 dark:text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Thank you for submitting!
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Your information has been recorded successfully.
      </p>
      <Button variant="secondary" onClick={reset}>
        Submit another response
      </Button>
    </div>
  )
}
