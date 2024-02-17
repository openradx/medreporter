import { Switch } from "@mantine/core"
import { Controller } from "react-hook-form"

interface BooleanPropertyInputProps {
  name: string
  label: string
}
export const BooleanPropertyInput = ({ name, label }: BooleanPropertyInputProps) => (
  <Controller
    name={name}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <Switch label={label} checked={value} onChange={onChange} error={error?.message} />
    )}
  />
)
