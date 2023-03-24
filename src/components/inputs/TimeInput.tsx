import { TimeInput as TimePicker } from "@mantine/dates"
import { ReactNode } from "react"
import { InputLabel } from "./InputLabel"

interface TimeInputProps {
  label?: string
  value: string
  onChange: (value: string) => void
  extras?: ReactNode
  disabled?: boolean
  // TODO: format?: "12" | "24"
}

export const TimeInput = ({ label, value, onChange, extras, disabled }: TimeInputProps) => (
  <TimePicker
    label={(label || extras) && <InputLabel label={label} extras={extras} />}
    value={value}
    onChange={(event) => onChange(event.target.value)}
    disabled={disabled}
  />
)
