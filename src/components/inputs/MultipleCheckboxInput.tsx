import { Checkbox, Group } from "@mantine/core"
import { ReactElement } from "react"
import { FieldOption } from "../fields/fieldTypes"

const DEFAULT_OPTIONS: FieldOption[] = []

interface MultipleCheckboxInputProps {
  label?: string
  options?: FieldOption[]
  onChange: (value: string[]) => void
  value: string[]
  extras?: ReactElement
}

export const MultipleCheckboxInput = ({
  label,
  options = DEFAULT_OPTIONS,
  onChange,
  value,
  extras,
}: MultipleCheckboxInputProps) => (
  <Checkbox.Group
    label={
      <Group sx={{ display: "flex", flexDirection: "row", alignContent: "center" }} spacing={1}>
        {label}
        {extras}
      </Group>
    }
    onChange={onChange}
    value={value}
    orientation="vertical"
    spacing="xs"
  >
    {options.map((option) => (
      <Checkbox key={option.value} value={option.value} label={option.label} />
    ))}
  </Checkbox.Group>
)
