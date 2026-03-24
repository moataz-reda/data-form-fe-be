'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { submissionSchema, type SubmissionInput } from '@/lib/validations/submission.schema'
import { useSubmissionStore } from '@/stores/submissionStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Label } from '@/components/ui/Label'
import { SuccessMessage } from './SuccessMessage'
import { GENDER_OPTIONS, AGE_OPTIONS, COUNTRY_OPTIONS } from '@/lib/utils/formOptions'

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-500">{message}</p>
}

export function SubmissionForm() {
  const { status, error, submit } = useSubmissionStore()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubmissionInput>({
    resolver: zodResolver(submissionSchema),
    defaultValues: { gender: undefined, age_range: undefined, country: '' },
  })

  async function onSubmit(data: SubmissionInput) {
    await submit(data)
    reset()
  }

  if (status === 'success') return <SuccessMessage />

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="first_name" required>First name</Label>
          <Input
            id="first_name"
            placeholder="John"
            error={errors.first_name?.message}
            {...register('first_name')}
          />
          <FieldError message={errors.first_name?.message} />
        </div>
        <div>
          <Label htmlFor="last_name" required>Last name</Label>
          <Input
            id="last_name"
            placeholder="Doe"
            error={errors.last_name?.message}
            {...register('last_name')}
          />
          <FieldError message={errors.last_name?.message} />
        </div>
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email" required>Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <FieldError message={errors.email?.message} />
      </div>

      {/* Mobile */}
      <div>
        <Label htmlFor="mobile" required>Mobile number</Label>
        <Input
          id="mobile"
          type="tel"
          placeholder="+1 555 000 0000"
          error={errors.mobile?.message}
          {...register('mobile')}
        />
        <FieldError message={errors.mobile?.message} />
      </div>

      {/* Gender & Age row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="gender" required>Gender</Label>
          <Select
            id="gender"
            placeholder="Select gender"
            options={GENDER_OPTIONS}
            error={errors.gender?.message}
            {...register('gender')}
          />
          <FieldError message={errors.gender?.message} />
        </div>
        <div>
          <Label htmlFor="age_range" required>Age range</Label>
          <Select
            id="age_range"
            placeholder="Select age range"
            options={AGE_OPTIONS}
            error={errors.age_range?.message}
            {...register('age_range')}
          />
          <FieldError message={errors.age_range?.message} />
        </div>
      </div>

      {/* Country */}
      <div>
        <Label htmlFor="country" required>Country</Label>
        <Select
          id="country"
          placeholder="Select country"
          options={COUNTRY_OPTIONS}
          error={errors.country?.message}
          {...register('country')}
        />
        <FieldError message={errors.country?.message} />
      </div>

      {/* Server error */}
      {status === 'error' && error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full mt-2"
        loading={status === 'submitting'}
      >
        Submit
      </Button>
    </form>
  )
}
