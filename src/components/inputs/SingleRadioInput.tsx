import { Radio } from "@mantine/core"
import { ReactNode } from "react"
import { FieldOption } from "../fields/fieldTypes"
import { InputLabel } from "./InputLabel"

const DEFAULT_OPTIONS: FieldOption[] = []

interface SingleRadioInputProps {
  label?: string
  options?: FieldOption[]
  value: string | null
  onChange: (value: string | null) => void
  extras?: ReactNode
  disabled?: boolean
}

export const SingleRadioInput = ({
  label,
  options = DEFAULT_OPTIONS,
  value,
  onChange,
  extras,
  disabled,
}: SingleRadioInputProps) => (
  <Radio.Group
    label={(label || extras) && <InputLabel label={label} extras={extras} />}
    onChange={onChange}
    value={value ?? undefined}
    orientation="vertical"
    spacing="xs"
  >
    {options.map((option) => (
      <Radio
        key={option.value}
        value={option.value}
        label={option.label}
        onClick={() => {
          if (value === option.value) {
            onChange(null)
          }
        }}
        disabled={disabled}
      />
    ))}
  </Radio.Group>
)
