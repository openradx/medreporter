import { Select, Radio } from "@mantine/core"
import { FieldOption } from "./fieldTypes"

const DEFAULT_OPTIONS: FieldOption[] = []

interface SingleChoiceFieldProps {
  label: string
  variant?: "checkbox" | "select"
  options?: FieldOption[]
}

export const SingleChoiceField = ({
  label,
  variant = "checkbox",
  options = DEFAULT_OPTIONS,
}: SingleChoiceFieldProps) => {
  if (variant === "select") {
    return <Select label={label} data={options} searchable />
  }
  return (
    <Radio.Group label={label} orientation="vertical" spacing="xs">
      {options.map((option) => (
        <Radio value={option.value} label={option.label} />
      ))}
    </Radio.Group>
  )
}
