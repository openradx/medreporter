import { MultiSelect, Group } from "@mantine/core"
import { ReactElement } from "react"
import { FieldOption } from "../fields/fieldTypes"

const DEFAULT_OPTIONS: FieldOption[] = []

interface MultipleSelectInputProps {
  label?: string
  options?: FieldOption[]
  onChange: (value: string[]) => void
  value: string[]
  extras?: ReactElement
}

export const MultipleSelectInput = ({
  label,
  onChange,
  value,
  options = DEFAULT_OPTIONS,
  extras,
}: MultipleSelectInputProps) => (
  <MultiSelect
    label={
      <Group sx={{ display: "flex", flexDirection: "row", alignContent: "center" }} spacing={1}>
        {label}
        {extras}
      </Group>
    }
    value={value}
    onChange={onChange}
    data={options}
    searchable
  />
)
