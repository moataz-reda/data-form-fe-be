'use client'

import { useId } from 'react'
import { useTheme } from 'next-themes'
import ReactSelect, { type StylesConfig, type SingleValue } from 'react-select'
import { getCountries } from 'react-phone-number-input'
import labels from 'react-phone-number-input/locale/en.json'

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
    <span className="text-sm">{label}</span>
  </span>
)

function buildStyles(dark: boolean, error: boolean): StylesConfig<CountryOption, false> {
  const bg = dark ? '#1f2937' : '#ffffff'          // gray-800 / white
  const bgMenu = dark ? '#1f2937' : '#ffffff'
  const border = error ? '#f87171' : dark ? '#4b5563' : '#d1d5db'
  const borderHover = dark ? '#6b7280' : '#9ca3af'
  const borderFocus = error ? '#f87171' : '#6366f1'
  const shadow = error ? '0 0 0 2px #f87171' : '0 0 0 2px #6366f1'
  const text = dark ? '#f3f4f6' : '#111827'
  const placeholder = dark ? '#6b7280' : '#9ca3af'
  const optionFocusBg = dark ? '#312e81' : '#eef2ff'
  const menuBorder = dark ? '#374151' : '#e5e7eb'

  return {
    control: (base, state) => ({
      ...base,
      minHeight: '42px',
      borderRadius: '0.75rem',
      borderColor: state.isFocused ? 'transparent' : border,
      boxShadow: state.isFocused ? shadow : 'none',
      backgroundColor: bg,
      paddingLeft: '4px',
      cursor: 'pointer',
      '&:hover': { borderColor: state.isFocused ? 'transparent' : borderHover },
      transition: 'all 150ms',
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '0.75rem',
      boxShadow: dark
        ? '0 10px 40px -8px rgba(0,0,0,0.6)'
        : '0 10px 40px -8px rgba(0,0,0,0.15)',
      border: `1px solid ${menuBorder}`,
      backgroundColor: bgMenu,
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
        ? optionFocusBg
        : 'transparent',
      color: state.isSelected ? '#fff' : text,
      cursor: 'pointer',
      padding: '8px 10px',
    }),
    placeholder: (base) => ({
      ...base,
      color: placeholder,
      fontSize: '0.875rem',
    }),
    singleValue: (base) => ({
      ...base,
      color: text,
    }),
    input: (base) => ({
      ...base,
      fontSize: '0.875rem',
      color: text,
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.isFocused ? borderFocus : placeholder,
      '&:hover': { color: borderFocus },
      transition: 'color 150ms',
    }),
    clearIndicator: (base) => ({
      ...base,
      color: placeholder,
      '&:hover': { color: '#ef4444' },
    }),
  }
}

interface CountrySelectProps {
  value?: string
  onChange: (value: string) => void
  error?: string
  id?: string
}

export function CountrySelect({ value, onChange, error, id }: CountrySelectProps) {
  const instanceId = useId()
  const { resolvedTheme } = useTheme()
  const dark = resolvedTheme === 'dark'
  const selected = ALL_COUNTRIES.find((c) => c.value === value) ?? null

  return (
    <ReactSelect<CountryOption>
      instanceId={instanceId}
      inputId={id}
      options={ALL_COUNTRIES}
      value={selected}
      onChange={(opt: SingleValue<CountryOption>) => onChange(opt?.value ?? '')}
      formatOptionLabel={formatOptionLabel}
      styles={buildStyles(dark, !!error)}
      placeholder="Search country..."
      isClearable
      isSearchable
      classNamePrefix="country-select"
    />
  )
}
