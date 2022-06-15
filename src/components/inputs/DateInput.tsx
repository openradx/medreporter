import { DatePicker } from "@mantine/dates"

interface DateInputProps {
  label?: string
  value: Date | null
  onChange: (x: Date | null) => void
}

export const DateInput = ({ label, value, onChange }: DateInputProps) => (
  <DatePicker label={label} value={value} onChange={(newDate) => onChange(newDate)} />
)
