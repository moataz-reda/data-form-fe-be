'use client'

import { useId } from 'react'
import ReactSelect, { type StylesConfig, type SingleValue } from 'react-select'
import { getCountries } from 'react-phone-number-input'
import labels from 'react-phone-number-input/locale/en.json'
import { cn } from '@/lib/utils'

interface CountryOption {
  value: string
  label: string
  flag: string
}

function getFlagEmoji(countryCode: string) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
}

const ALL_COUNTRIES: CountryOption[] = getCountries()
  .map((code) => ({
    value: code,
    label: (labels as Record<string, string>)[code] ?? code,
    flag: getFlagEmoji(code),
  }))
  .sort((a, b) => a.label.localeCompare(b.label))

const formatOptionLabel = ({ flag, label }: CountryOption) => (
  <span className="flex items-center gap-2.5">
    <span className="text-lg leading-none">{flag}</span>
    <span className="text-sm text-gray-900">{label}</span>
  </span>
)

const customStyles: StylesConfig<CountryOption, false> = {
  control: (base, state) => ({
    ...base,
    minHeight: '42px',
    borderRadius: '0.75rem',
    borderColor: state.isFocused ? 'transparent' : '#d1d5db',
    boxShadow: state.isFocused ? '0 0 0 2px #6366f1' : 'none',
    backgroundColor: '#fff',
    paddingLeft: '4px',
    cursor: 'pointer',
    '&:hover': { borderColor: '#9ca3af' },
    transition: 'all 150ms',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '0.75rem',
    boxShadow: '0 10px 40px -8px rgba(0,0,0,0.15)',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
    zIndex: 50,
  }),
  menuList: (base) => ({
    ...base,
    padding: '4px',
    maxHeight: '220px',
  }),
  option: (base, state) => ({
    ...base,
    borderRadius: '0.5rem',
    backgroundColor: state.isSelected
      ? '#6366f1'
      : state.isFocused
      ? '#eef2ff'
      : 'transparent',
    color: state.isSelected ? '#fff' : '#111827',
    cursor: 'pointer',
    padding: '8px 10px',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#9ca3af',
    fontSize: '0.875rem',
  }),
  singleValue: (base) => ({
    ...base,
    color: '#111827',
  }),
  input: (base) => ({
    ...base,
    fontSize: '0.875rem',
    color: '#111827',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? '#6366f1' : '#9ca3af',
    '&:hover': { color: '#6366f1' },
    transition: 'color 150ms',
  }),
  clearIndicator: (base) => ({
    ...base,
    color: '#9ca3af',
    '&:hover': { color: '#ef4444' },
  }),
}

interface CountrySelectProps {
  value?: string
  onChange: (value: string) => void
  error?: string
  id?: string
}

export function CountrySelect({ value, onChange, error, id }: CountrySelectProps) {
  const instanceId = useId()
  const selected = ALL_COUNTRIES.find((c) => c.value === value) ?? null

  const errorStyles: StylesConfig<CountryOption, false> = {
    ...customStyles,
    control: (base, state) => ({
      ...(customStyles.control?.(base, state) ?? base),
      borderColor: state.isFocused ? 'transparent' : '#f87171',
      boxShadow: state.isFocused ? '0 0 0 2px #f87171' : 'none',
    }),
  }

  return (
    <ReactSelect<CountryOption>
      instanceId={instanceId}
      inputId={id}
      options={ALL_COUNTRIES}
      value={selected}
      onChange={(opt: SingleValue<CountryOption>) => onChange(opt?.value ?? '')}
      formatOptionLabel={formatOptionLabel}
      styles={error ? errorStyles : customStyles}
      placeholder="Search country..."
      isClearable
      isSearchable
      classNamePrefix="country-select"
    />
  )
}
