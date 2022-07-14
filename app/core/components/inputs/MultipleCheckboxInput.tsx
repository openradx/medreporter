import { Checkbox } from "@mantine/core"
import { ReactNode } from "react"
import { FieldOption } from "../fields/fieldTypes"
import { InputLabel } from "./InputLabel"

const DEFAULT_OPTIONS: FieldOption[] = []

interface MultipleCheckboxInputProps {
  label?: string
  options?: FieldOption[]
  value: string[]
  onChange: (value: string[]) => void
  extras?: ReactNode
  disabled?: boolean
}

export const MultipleCheckboxInput = ({
  label,
  options = DEFAULT_OPTIONS,
  value,
  onChange,
  extras,
  disabled,
}: MultipleCheckboxInputProps) => (
  <Checkbox.Group
    label={(label || extras) && <InputLabel label={label} extras={extras} />}
    onChange={onChange}
    value={value}
    orientation="vertical"
    spacing="xs"
  >
    {options.map((option) => (
      <Checkbox key={option.value} value={option.value} label={option.label} disabled={disabled} />
    ))}
  </Checkbox.Group>
)
