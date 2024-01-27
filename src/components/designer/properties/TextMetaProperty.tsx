import { TextInput } from "@mantine/core"
import { Controller } from "react-hook-form"

interface TextMetaPropertyProps {
  name: string
  label: string
}

export const TextMetaProperty = ({ name, label }: TextMetaPropertyProps) => (
  <Controller
    name={name}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <TextInput label={label} value={value} onChange={onChange} error={error?.message} />
    )}
  />
)
