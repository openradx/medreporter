import { Checkbox, Stack } from "@mantine/core"
import { ReactNode } from "react"
import { Option } from "~/schemas/structure"
import { InputLabel } from "./InputLabel"

const DEFAULT_OPTIONS: Option[] = []

interface MultipleCheckboxInputProps {
  label?: string
  extras?: ReactNode
  options?: Option[]
  value: string[]
  onChange: (value: string[]) => void
  disabled?: boolean
}

export const MultipleCheckboxInput = ({
  label,
  extras,
  options = DEFAULT_OPTIONS,
  value,
  onChange,
  disabled,
}: MultipleCheckboxInputProps) => (
  <Checkbox.Group
    label={(label || extras) && <InputLabel label={label} extras={extras} />}
    onChange={onChange}
    value={value}
  >
    <Stack spacing="xs">
      {options.map((option) => (
        <Checkbox
          key={option.value}
          value={option.value}
          label={option.label}
          disabled={disabled}
        />
      ))}
    </Stack>
  </Checkbox.Group>
)
