import { TextInput } from "@mantine/core"
import { Controller } from "react-hook-form"

interface TextInputPropertyInputProps {
  name: string
  label: string
  required?: boolean
}

export const TextInputPropertyInput = ({ name, label, required }: TextInputPropertyInputProps) => (
  <Controller
    name={name}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <TextInput
        label={label}
        value={value}
        onChange={onChange}
        error={error?.message}
        required={required}
      />
    )}
  />
)
