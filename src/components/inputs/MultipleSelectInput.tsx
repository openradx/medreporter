import { MultiSelect } from "@mantine/core"
import { FieldOption } from "../fields/fieldTypes"

const DEFAULT_OPTIONS: FieldOption[] = []

interface MultipleSelectInputProps {
  label?: string
  options?: FieldOption[]
  onChange: (value: string[]) => void
  value: string[]
}

export const MultipleSelectInput = ({
  label,
  onChange,
  value,
  options = DEFAULT_OPTIONS,
}: MultipleSelectInputProps) => (
  <MultiSelect label={label} value={value} onChange={onChange} data={options} searchable />
)
