import { Textarea } from "@mantine/core"
import { Controller } from "react-hook-form"

interface TextareaPropertyInputProps {
  name: string
  label: string
}

export const TextareaPropertyInput = ({ name, label }: TextareaPropertyInputProps) => (
  <Controller
    name={name}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <Textarea label={label} value={value} onChange={onChange} error={error?.message} />
    )}
  />
)
