import { DatePicker } from "@mantine/dates"

interface DateInputProps {
  label?: string
  value: Date | null
  onChange: (value: Date | null) => void
}

export const DateInput = ({ label, value, onChange }: DateInputProps) => (
  <DatePicker label={label} value={value} onChange={onChange} />
)
