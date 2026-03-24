import { z } from 'zod'
import { isValidPhoneNumber } from 'libphonenumber-js'

export const submissionSchema = z.object({
  first_name: z.string().min(1, 'First name is required').max(50),
  last_name: z.string().min(1, 'Last name is required').max(50),
  email: z.email('Please enter a valid email address'),
  mobile: z
    .string()
    .min(1, 'Mobile number is required')
    .refine((val) => isValidPhoneNumber(val), 'Please enter a valid mobile number'),
  gender: z.enum(['male', 'female', 'non-binary', 'prefer-not-to-say'], {
    error: 'Please select a gender',
  }),
  age_range: z.enum(['18-24', '25-34', '35-44', '45-54', '55+'], {
    error: 'Please select an age range',
  }),
  country: z.string().min(1, 'Country is required'),
})

export type SubmissionInput = z.infer<typeof submissionSchema>
