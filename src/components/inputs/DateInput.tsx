import { DatePicker } from "@mantine/dates"
import { ReactElement } from "react"
import { InputLabel } from "./InputLabel"

interface DateInputProps {
  label?: string
  value: Date | null
  onChange: (value: Date | null) => void
  extras?: ReactElement
}

export const DateInput = ({ label, value, onChange, extras }: DateInputProps) => (
  <DatePicker
    label={(label || extras) && <InputLabel label={label} extras={extras} />}
    value={value}
    onChange={onChange}
  />
)
