import { DateInput as MantineDateInput } from "@mantine/dates"
import { ReactNode } from "react"
import { InputLabel } from "./InputLabel"

interface DateInputProps {
  label?: string
  extras?: ReactNode
  locale?: string
  value: Date | null
  onChange: (value: Date | null) => void
  disabled?: boolean
  format?: string
}

export const DateInput = ({
  label,
  extras,
  locale,
  value,
  onChange,
  disabled,
  format,
}: DateInputProps) => (
  <MantineDateInput
    label={(label || extras) && <InputLabel label={label} extras={extras} />}
    locale={locale}
    value={value}
    onChange={onChange}
    valueFormat={format || "MM/DD/YYYY"}
    disabled={disabled}
  />
)
