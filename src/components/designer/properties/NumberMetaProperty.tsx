import { Controller } from "react-hook-form"
import { NumberInput } from "~/components/inputs/NumberInput"

interface NumberMetaPropertyProps {
  name: string
  label: string
  precision?: number
  min?: number
  max?: number
}

export const NumberMetaProperty = ({
  name,
  label,
  precision,
  min,
  max,
}: NumberMetaPropertyProps) => (
  <Controller
    name={name}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <NumberInput
        label={label}
        value={value}
        onChange={onChange}
        error={error?.message}
        precision={precision}
        min={min}
        max={max}
      />
    )}
  />
)
