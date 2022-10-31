import { Switch } from "@mantine/core"
import { ReactNode } from "react"
import { InputLabel } from "./InputLabel"

interface BooleanInputProps {
  label?: string
  value: boolean
  onChange: (value: boolean) => void
  extras?: ReactNode
  disabled?: boolean
}

export const BooleanInput = ({ label, value, onChange, extras, disabled }: BooleanInputProps) => (
  <Switch
    label={(label || extras) && <InputLabel label={label} extras={extras} />}
    checked={value}
    onChange={(ev) => {
      onChange(ev.currentTarget.checked)
    }}
    disabled={disabled}
  />
)
