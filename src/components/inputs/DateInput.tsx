import { Group } from "@mantine/core"
import { DatePicker } from "@mantine/dates"
import { ReactElement } from "react"

interface DateInputProps {
  label?: string
  value: Date | null
  onChange: (value: Date | null) => void
  extras?: ReactElement
}

export const DateInput = ({ label, value, onChange, extras }: DateInputProps) => (
  <DatePicker
    label={
      <Group sx={{ display: "flex", flexDirection: "row", alignContent: "center" }} spacing={1}>
        {label}
        {extras}
      </Group>
    }
    value={value}
    onChange={onChange}
  />
)
