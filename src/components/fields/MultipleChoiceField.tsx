import { MultiSelect, Checkbox } from "@mantine/core"
import { FieldOption } from "./fieldTypes"

const DEFAULT_OPTIONS: FieldOption[] = []

interface MultipleChoiceFieldProps {
  label: string
  variant?: "checkbox" | "select"
  options?: FieldOption[]
}

export const MultipleChoiceField = ({
  label,
  variant = "checkbox",
  options = DEFAULT_OPTIONS,
}: MultipleChoiceFieldProps) => {
  if (variant === "select") {
    return <MultiSelect label={label} data={options} searchable />
  }
  return (
    <Checkbox.Group label={label} orientation="vertical" spacing="xs">
      {options.map((option) => (
        <Checkbox value={option.value} label={option.label} />
      ))}
    </Checkbox.Group>
  )
}
