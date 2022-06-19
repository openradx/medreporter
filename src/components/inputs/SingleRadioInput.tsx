import { Radio } from "@mantine/core"
import { FieldOption } from "../fields/fieldTypes"

const DEFAULT_OPTIONS: FieldOption[] = []

interface SingleRadioInputProps {
  label?: string
  options?: FieldOption[]
  onChange: (value: string) => void
  value: string | null
}

export const SingleRadioInput = ({
  label,
  value,
  onChange,
  options = DEFAULT_OPTIONS,
}: SingleRadioInputProps) => (
  <Radio.Group
    label={label}
    onChange={onChange}
    value={value ?? undefined}
    orientation="vertical"
    spacing="xs"
  >
    {options.map((option) => (
      <Radio key={option.value} value={option.value} label={option.label} />
    ))}
  </Radio.Group>
)
