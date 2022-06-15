import { Checkbox } from "@mantine/core"
import { FieldOption } from "../fields/fieldTypes"

const DEFAULT_OPTIONS: FieldOption[] = []

interface MultipleCheckboxInputProps {
  label?: string
  options?: FieldOption[]
  onChange: (value: string[]) => void
  value: string[]
}

export const MultipleCheckboxInput = ({
  label,
  options = DEFAULT_OPTIONS,
  onChange,
  value,
}: MultipleCheckboxInputProps) => (
  <Checkbox.Group
    label={label}
    onChange={(newValue) => onChange(newValue)}
    value={value}
    orientation="vertical"
    spacing="xs"
  >
    {options.map((option) => (
      <Checkbox value={option.value} label={option.label} />
    ))}
  </Checkbox.Group>
)
