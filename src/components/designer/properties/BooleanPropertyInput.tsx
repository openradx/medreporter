import { Switch } from "@mantine/core"
import { Controller } from "react-hook-form"

interface BooleanPropertyInputProps {
  name: string
  label: string
  required?: boolean
}
export const BooleanPropertyInput = ({ name, label, required }: BooleanPropertyInputProps) => (
  <Controller
    name={name}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <Switch
        label={label}
        checked={value}
        onChange={onChange}
        error={error?.message}
        required={required}
      />
    )}
  />
)
