import { z } from 'zod'

export const submissionSchema = z.object({
  first_name: z.string().min(1, 'First name is required').max(50),
  last_name: z.string().min(1, 'Last name is required').max(50),
  email: z.string().email('Please enter a valid email address'),
  mobile: z
    .string()
    .regex(/^\+?[1-9]\d{6,14}$/, 'Please enter a valid mobile number'),
  gender: z.enum(['male', 'female', 'non-binary', 'prefer-not-to-say'], {
    error: 'Please select a gender',
  }),
  age_range: z.enum(['18-24', '25-34', '35-44', '45-54', '55+'], {
    error: 'Please select an age range',
  }),
  country: z.string().min(1, 'Country is required'),
})

export type SubmissionInput = z.infer<typeof submissionSchema>
