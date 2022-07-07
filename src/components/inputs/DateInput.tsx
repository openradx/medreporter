import { DatePicker } from "@mantine/dates"
import { ReactNode } from "react"
import { InputLabel } from "./InputLabel"

interface DateInputProps {
  label?: string
  locale?: string
  value: Date | null
  onChange: (value: Date | null) => void
  extras?: ReactNode
}

export const DateInput = ({ label, locale, value, onChange, extras }: DateInputProps) => (
  <DatePicker
    locale={locale}
    label={(label || extras) && <InputLabel label={label} extras={extras} />}
    value={value}
    onChange={onChange}
    allowFreeInput
  />
)
