import { TextInput } from "@mantine/core"
import { Controller } from "react-hook-form"

interface TextInputPropertyInputProps {
  name: string
  label: string
}

export const TextInputPropertyInput = ({ name, label }: TextInputPropertyInputProps) => (
  <Controller
    name={name}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <TextInput label={label} value={value} onChange={onChange} error={error?.message} />
    )}
  />
)
