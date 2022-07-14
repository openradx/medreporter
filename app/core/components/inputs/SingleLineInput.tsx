import { TextInput } from "@mantine/core"
import { ReactNode } from "react"
import { InputLabel } from "./InputLabel"

interface SingleLineInputProps {
  label?: string
  value: string
  onChange: (value: string) => void
  extras?: ReactNode
  disabled?: boolean
  width?: number
}

export const SingleLineInput = ({
  label,
  value,
  onChange,
  extras,
  disabled,
  width,
}: SingleLineInputProps) => (
  <TextInput
    label={(label || extras) && <InputLabel label={label} extras={extras} />}
    autoComplete="off"
    value={value}
    onChange={(event) => onChange(event.target.value)}
    disabled={disabled}
    styles={{ wrapper: { width } }}
  />
)
