import { DateInput as MantineDateInput } from "@mantine/dates"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
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
}: DateInputProps) => {
  dayjs.extend(customParseFormat)

  return (
    <MantineDateInput
      label={(label || extras) && <InputLabel label={label} extras={extras} />}
      locale={locale}
      value={value}
      onChange={onChange}
      valueFormat={format}
      disabled={disabled}
    />
  )
}
