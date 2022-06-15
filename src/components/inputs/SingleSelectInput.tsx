import { Select } from "@mantine/core"
import { FieldOption } from "../fields/fieldTypes"

const DEFAULT_OPTIONS: FieldOption[] = []

interface SingleSelectInputProps {
  label?: string
  options?: FieldOption[]
  onChange: (value: string | null) => void
  value: string | null
}

export const SingleSelectInput = ({
  label,
  onChange,
  value,
  options = DEFAULT_OPTIONS,
}: SingleSelectInputProps) => (
  <Select
    label={label}
    value={value}
    onChange={(newValue) => onChange(newValue)}
    data={options}
    searchable
  />
)
