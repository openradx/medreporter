import { TextInput } from "@mantine/core"
import { Controller } from "react-hook-form"

interface TextInputMetaPropertyProps {
  name: string
  label: string
}

export const TextInputMetaProperty = ({ name, label }: TextInputMetaPropertyProps) => (
  <Controller
    name={name}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <TextInput label={label} value={value} onChange={onChange} error={error?.message} />
    )}
  />
)
