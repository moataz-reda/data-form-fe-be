'use client'

import { forwardRef } from 'react'
import PhoneInputPrimitive, { type Country } from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'
import 'react-phone-number-input/style.css'
import { cn } from '@/lib/utils'

interface PhoneInputProps {
  value?: string
  onChange: (value: string | undefined) => void
  defaultCountry?: Country
  error?: string
  id?: string
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, defaultCountry = 'US', error, id }, _ref) => {
    return (
      <PhoneInputPrimitive
        international
        flags={flags}
        defaultCountry={defaultCountry}
        value={value}
        onChange={onChange}
        inputComponent={CustomInput}
        countryCallingCodeEditable={false}
        id={id}
        className={cn(
          'phone-input-container flex items-center gap-2 w-full rounded-xl border bg-white dark:bg-gray-800 px-3 py-2.5 transition-colors duration-150',
          error
            ? 'border-red-400 focus-within:ring-2 focus-within:ring-red-400'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent'
        )}
      />
    )
  }
)

const CustomInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'flex-1 min-w-0 bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none',
        className
      )}
      {...props}
    />
  )
)

CustomInput.displayName = 'CustomInput'
PhoneInput.displayName = 'PhoneInput'

export { PhoneInput }
