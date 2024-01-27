import { NumberInput } from "@mantine/core"
import { Controller } from "react-hook-form"

interface NumberMetaPropertyProps {
  name: string
  label: string
}

export const NumberMetaProperty = ({ name, label }: NumberMetaPropertyProps) => (
  <Controller
    name={name}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <NumberInput label={label} value={value} onChange={onChange} error={error?.message} />
    )}
  />
)
