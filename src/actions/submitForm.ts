'use server'

import { createClient } from '@/lib/supabase/server'
import {
  submissionSchema,
  type SubmissionInput,
} from '@/lib/validations/submission.schema'

export async function submitFormAction(raw: SubmissionInput): Promise<void> {
  // Re-validate server-side — never trust client data alone
  const data = submissionSchema.parse(raw)

  const supabase = await createClient()
  const { error } = await supabase.from('submissions').insert(data)

  if (error) {
    throw new Error(error.message)
  }
}
