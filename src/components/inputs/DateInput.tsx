import { DateInput as DatePickerInput } from "@mantine/dates"
import { ReactNode } from "react"
import { InputLabel } from "./InputLabel"

interface DateInputProps {
  label?: string
  extras?: ReactNode
  locale?: string
  value: Date | null
  onChange: (value: Date | null) => void
  disabled?: boolean
}

export const DateInput = ({ label, extras, locale, value, onChange, disabled }: DateInputProps) => (
  <DatePickerInput
    label={(label || extras) && <InputLabel label={label} extras={extras} />}
    locale={locale}
    value={value}
    onChange={onChange}
    disabled={disabled}
  />
)
