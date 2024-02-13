import { Textarea } from "@mantine/core"
import { ReactNode } from "react"
import { InputLabel } from "./InputLabel"

interface MultiLineInputProps {
  label?: string
  extras?: ReactNode
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  grow?: boolean
  rows?: number
  minRows?: number
  maxRows?: number
}

export const MultiLineInput = ({
  label,
  extras,
  value,
  onChange,
  disabled,
  grow,
  rows,
  minRows,
  maxRows,
}: MultiLineInputProps) => (
  <Textarea
    label={(label || extras) && <InputLabel label={label} extras={extras} />}
    autosize
    autoComplete="off"
    value={value}
    onChange={(event) => onChange(event.target.value)}
    disabled={disabled}
    minRows={grow ? minRows : rows}
    maxRows={grow ? maxRows : rows}
  />
)
