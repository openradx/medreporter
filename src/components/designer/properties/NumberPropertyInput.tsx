import { Controller } from "react-hook-form"
import { NumberInput } from "~/components/inputs/NumberInput"

interface NumberPropertyInputProps {
  name: string
  label: string
  precision?: number
  min?: number
  max?: number
  required?: boolean
}

export const NumberPropertyInput = ({
  name,
  label,
  precision,
  min,
  max,
  required,
}: NumberPropertyInputProps) => (
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
        required={required}
      />
    )}
  />
)
