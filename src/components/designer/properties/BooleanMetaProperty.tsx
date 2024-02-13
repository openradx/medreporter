import { Switch } from "@mantine/core"
import { Controller } from "react-hook-form"

interface BooleanMetaPropertyProps {
  name: string
  label: string
}
export const BooleanMetaProperty = ({ name, label }: BooleanMetaPropertyProps) => (
  <Controller
    name={name}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <Switch label={label} checked={value} onChange={onChange} error={error?.message} />
    )}
  />
)
