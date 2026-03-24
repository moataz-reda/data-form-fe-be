import { create } from 'zustand'
import type { SubmissionInput } from '@/lib/validations/submission.schema'

type Status = 'idle' | 'submitting' | 'success' | 'error'

interface SubmissionState {
  status: Status
  error: string | null
  submit: (data: SubmissionInput) => Promise<void>
  reset: () => void
}

export const useSubmissionStore = create<SubmissionState>((set) => ({
  status: 'idle',
  error: null,

  submit: async (data: SubmissionInput) => {
    set({ status: 'submitting', error: null })
    try {
      const { submitFormAction } = await import('@/actions/submitForm')
      await submitFormAction(data)
      set({ status: 'success' })
    } catch (err) {
      set({
        status: 'error',
        error: err instanceof Error ? err.message : 'Something went wrong',
      })
    }
  },

  reset: () => set({ status: 'idle', error: null }),
}))
