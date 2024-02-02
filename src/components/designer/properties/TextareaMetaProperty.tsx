import { Textarea } from "@mantine/core"
import { Controller } from "react-hook-form"

interface TextareaMetaPropertyProps {
  name: string
  label: string
}

export const TextareaMetaProperty = ({ name, label }: TextareaMetaPropertyProps) => (
  <Controller
    name={name}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <Textarea label={label} value={value} onChange={onChange} error={error?.message} />
    )}
  />
)
