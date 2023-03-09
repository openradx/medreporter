import { TimeInput as TimePicker } from "@mantine/dates"
import { ReactNode } from "react"
import { InputLabel } from "./InputLabel"

interface TimeInputProps {
  label?: string
  value: Date | null
  onChange: (value: Date | null) => void
  extras?: ReactNode
  disabled?: boolean
  format?: "12" | "24"
}

export const TimeInput = ({ label, value, onChange, extras, disabled, format }: TimeInputProps) => (
  <TimePicker
    label={(label || extras) && <InputLabel label={label} extras={extras} />}
    value={value}
    onChange={onChange}
    disabled={disabled}
    format={format}
  />
)
