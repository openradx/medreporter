import { TextInput } from "@mantine/core"
import { ReactNode } from "react"
import { InputLabel } from "./InputLabel"

interface SingleLineInputProps {
  label?: string
  extras?: ReactNode
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  width?: number
}

export const SingleLineInput = ({
  label,
  extras,
  value,
  onChange,
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
